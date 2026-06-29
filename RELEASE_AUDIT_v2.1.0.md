# ADIAT Capability Audit — `main` (2.0.3) → `dev` (2.1.0 Beta 1)

**Purpose:** Inventory of everything added/changed since the last production release, organized so you can pick Release Notes highlights.

**Scope of comparison**
- **Baseline:** `origin/main` @ `5e59822` (matches the `adiat_main` checkout) — last production release, app version `2.0.3_BETA`.
- **Current:** `dev` @ `7a7259b` — app version now **`2.1.0 Beta 1`**.
- **Diff size:** 104 commits, 627 files changed.
- **Method:** Capabilities below were verified against the actual code on `dev` (not just commit messages). Each entry notes its **headline potential** (⭐ High / ◐ Medium / · Low) as a suggestion only.

> ⚠️ **Version label note:** the version-bump commit set `2.1.0 Alpha`, but `app/__main__.py` HEAD currently reads `2.1.0 Beta 1`. Pick the label you intend to ship.

---

## ⭐ Marquee features (suggested headliners)

These are the biggest, most user-visible, most novel additions — the strongest candidates for the top of the release notes:

1. **Flight Viewer — live WebRTC drone feeds.** A brand-new real-time operational mode: watch live, low-latency video from field tablets, with telemetry, a detection map, and an aggregated detection gallery.
2. **AI Person Detector.** Neural-network (ONNX) person detection, available both as an image-analysis algorithm and as a live-streaming algorithm.
3. **Temperature Residual Anomaly.** A new thermal algorithm that finds people standing out from their *local* surroundings rather than a whole-image average.
4. **Terrain / DEM integration.** Real elevation data (USGS 3DEP local GeoTIFF or online) drives terrain-corrected AOI GPS coordinates and terrain-conforming field-of-view boxes.
5. **Person Size Reference + Shadow Height Estimation.** Photogrammetry tools to judge whether a detection could be a person — perspective-correct silhouette overlay and shadow-based height measurement.
6. **Batch Processing + headless CLI.** Analyze every subfolder as its own run, with timeouts/ETAs/resume, scriptable from the command line, auto-linked into a Search Coordinator project.
7. **Team Planning.** Assign detections to named field teams on a map and export field-ready per-team PDF packets.
8. **Platform maturity:** in-app auto-update and multi-language support (English, Italian, Spanish, Dutch).

---

## 1. Live Operations — Flight Viewer (live WebRTC drone feeds) — *new subsystem*

A completely new window for watching live drone video streamed peer-to-peer from ADIAT Mobile tablets in the field. Launched from the startup Selection dialog and from menus in the Image Analysis and Streaming windows.

### ⭐ Live WebRTC drone video feeds
- **Type:** New feature
- **What it does:** Watch live, low-latency video streamed peer-to-peer (WebRTC) from one or more paired field tablets — over the internet, cellular included, with no LAN or HDMI capture needed. Multiple feeds run side-by-side, each in its own resizable tile inside an MDI workspace.
- **Where:** New **Flight Viewer** window (drone icon in the startup Selection dialog; also in Image Analysis and Streaming menus).
- **Key files:** `app/core/controllers/flight/FlightViewerController.py`, `app/core/views/flight/FlightViewerWindow.py`, `WebRTCStreamService.py` · commit `c6ea452`

### ⭐ Pairing-code connection
- **Type:** New feature
- **What it does:** Click "Add Feed" and type the 6-character code shown on the tablet. The desktop looks it up on the signaling service, negotiates the connection, and the dialog dismisses itself the moment video starts. Plain-language status and actionable failures replace WebRTC jargon; a viewer-cap message appears when a drone already has the maximum number of viewers.
- **Where:** Flight Viewer → "Add Feed" pairing dialog.
- **Key files:** `app/core/views/flight/FlightPairingDialog.py`, `signaling/pairing.py` · commits `c6ea452`, `b1d1055`

### ⭐ Session continuity — auto-resume after disconnect
- **Type:** New feature
- **What it does:** If the connection drops or the app is closed, the next launch restores that drone's prior detections (thumbnails + map pins) from a local SQLite store and, if the tablet is still waiting, silently re-pairs with the same code — no retyping. If the tablet has started a new flight under the same code, the operator is prompted to archive or discard the old session. Brief blips recover on their own via reconnect-with-backoff and ICE-restart.
- **Where:** Flight Viewer (automatic on launch).
- **Key files:** `FlightSessionStore.py`, `FlightViewerController._try_auto_resume` · commit `b1d1055`

### ⭐ Mission Gallery — aggregated detection list
- **Type:** New feature
- **What it does:** A dock that collects every detection from all feeds into one newest-first list — thumbnail, class, confidence, GPS (DD/DM/MGRS per preference), timestamp, source drone, plus "View" and "Copy GPS". Filter by feed, detector type, and minimum score; a moving target stays a single row. The whole gallery can be exported to ADIAT's standard image-results folder so it reopens in the Image Analysis window.
- **Where:** Flight Viewer → "Mission Gallery" dock.
- **Key files:** `MissionGalleryController.py`, `MissionGalleryDock.py`, `DetectionRowWidget.py` · commits `c6ea452`, `c2f0ce9`, `b1d1055`

### ◐ Live detection overlays on the video
- **Type:** New feature
- **What it does:** Detector bounding boxes are drawn on the live video, time-locked to the exact frame they were computed from (box stays on the moving target) and space-locked to the letterboxed video area. Boxes clear within ~0.5 s of the target leaving the frame, so a lingering box reliably means "still tracking."
- **Where:** Flight Viewer — each feed tile.
- **Key files:** `DetectionOverlayWidget.py` · commits `c6ea452`, `c2f0ce9`, `1dca7d4`

### ◐ Telemetry HUD on each feed
- **Type:** New feature
- **What it does:** A compact strip per tile shows the drone's live state at ~4 Hz: GPS lat/lon, altitude (MSL/AGL), heading with compass cardinal, horizontal/vertical speed, color-coded battery chip, and flight mode. Units follow the Meters/Feet preference; dims with a "stale Ns" badge if telemetry stops.
- **Where:** Flight Viewer — bottom overlay of each tile.
- **Key files:** `TelemetryHud.py`, `TelemetryFeedService.py` · commit `c6ea452`

### ◐ Interactive detection map
- **Type:** New feature
- **What it does:** Plots every GPS-tagged detection as a color-matched pin. Switch Road/Satellite/Hybrid basemaps; clicking a gallery row centers the map, clicking a pin highlights the row. Degrades gracefully when offline / no mapping engine.
- **Where:** Flight Viewer — "Map" dock.
- **Key files:** `MapDock.py` · commits `c6ea452`, `c2f0ce9`

### ◐ Desktop-side thumbnail cropping (cellular data saver)
- **Type:** Enhancement
- **What it does:** Detection thumbnails are cropped on the desktop from the live video instead of sent over the network by the tablet, cutting cellular data use substantially (~300–750 KB/s) with visually identical results. Crops persist across tile reopen and app restart.
- **Where:** Flight Viewer — Mission Gallery (behind the scenes).
- **Key files:** `DetectionThumbCropper.py` · commit `c2f0ce9`

### · Per-feed tools: rename, record, mute, maximize, layout save
- **Type:** New feature
- **What it does:** Right-click a tile to rename the drone (nickname persists across sessions via aircraft serial; propagates everywhere), start/stop MP4 recording, mute a feed's detections, maximize the tile, reconnect, and save/restore the window layout.
- **Where:** Flight Viewer — tile context menu / toolbar.
- **Key files:** `FlightTile.py`, `FlightViewerController.save_layout` · commits `c6ea452`, `c2f0ce9`, `b1d1055`

### · Operator-friendly network status + device-trust hints
- **Type:** Enhancement
- **What it does:** Per-feed strip translates raw WebRTC states into plain labels (Initializing / Connecting / Connected / Disconnected / Failed) with live resolution, FPS, bitrate, latency. On pairing, the desktop remembers each tablet's security fingerprint (trust-on-first-use) and flags "known device" vs a changed fingerprint, warning of a possible different/spoofed controller.
- **Where:** Flight Viewer — status strip + pairing dialog.
- **Key files:** `FingerprintStore.py`, `FlightTile._friendly_ice_state` · commits `7f8bb04`, `c6ea452`, `b1d1055`

---

## 2. Live Operations — Streaming Detection (HDMI / RTSP / capture-device viewer)

The existing Streaming viewer was substantially upgraded.

### ⭐ AI Person Detector — live person detection
- **Type:** New feature
- **What it does:** An ONNX-based AI person detector selectable as a live-streaming algorithm. Automatically detects and highlights people in each frame, with a confidence slider, GPU acceleration (DirectML) + CPU fallback, and a higher-quality 1024 model option. Built for SAR: defaults to tiled, aspect-preserving inference so small/distant targets aren't lost to whole-frame downscaling, with auto-fallback to single-pass if tiling is slow. Optional aspect-ratio filtering and temporal voting reduce false positives.
- **Where:** Streaming viewer — selectable streaming algorithm.
- **Key files:** `app/algorithms/streaming/AIPersonDetector/**`, model files `ai_person_model_V3_{640,1024}.onnx` · commits `51dfff7`, `0e674da`

### ◐ Unified controls across all live algorithms
- **Type:** Enhancement
- **What it does:** All live algorithms (AI Person Detector, Color Detection, Color Anomaly & Motion) now share the same control tabs and produce detections in one normalized format, so the viewer renders every algorithm consistently. Inapplicable controls auto-hide per algorithm.
- **Where:** Streaming viewer — algorithm control panel.
- **Key files:** `streaming/contracts.py`, `StreamAlgorithmService.py`, `StreamAnalyzeService.py`, `adapters.py` · commit `0e674da`

### ◐ HDMI capture: automatic device detection
- **Type:** Enhancement
- **What it does:** No more typing a numeric device index. A "Scan" button searches for capture devices in the background (trying Media Foundation / DirectShow / Auto backends) and presents them in a dropdown, improving compatibility with capture hardware that previously failed to open.
- **Where:** Streaming setup wizard — Connection page (HDMI Capture).
- **Key files:** `StreamConnectionPage.py` (`DeviceScanWorker`) · commits `71d70ba`, `5e59822`

### ◐ Live recording statistics
- **Type:** New feature
- **What it does:** While recording, the panel shows live metrics — segment duration, recording FPS, frames written, write-queue size — so operators can confirm a recording is healthy in real time.
- **Where:** Streaming viewer — recording panel.
- **Key files:** `StreamViewerWindow.on_recording_stats_updated` · commit `d8b9b47`

### ◐ Adjustable frame rate while connected + lag reduction
- **Type:** Enhancement
- **What it does:** The processing frame-rate cap can be changed on the fly (no reconnect). New clearer "Source FPS" option follows native cadence; the hard-coded ingest downscale cap was removed so full-res sources process at native resolution; stale buffered frames are dropped to reduce display lag under load.
- **Where:** Streaming viewer — Input & Processing controls.
- **Key files:** `RTMPStreamService.set_fps_limit`, `StreamCoordinator.update_fps_limit` · commits `1d51f1f`, `0e674da`

### · Recording auto-stops on disconnect
- **Type:** Bug fix
- **What it does:** If the stream drops while recording, recording stops automatically instead of leaving a dangling/never-finalized file.
- **Key files:** `StreamCoordinator._on_connection_status_changed` · commit `d8b9b47`

### · Hardened frame pipeline (stability under load)
- **Type:** Bug fix
- **What it does:** Bounded worker backpressure, correct alignment of displayed/recorded/overlay frames, safer thread shutdown on disconnect/reconnect, paused streams release in-flight slots, bounded gallery/thumbnail growth for long sessions.
- **Key files:** `StreamViewerWindow.py`, `FrameProcessingWorker.py`, `StreamCoordinator.py` · commits `1d51f1f`, `d8b9b47`

### · Standalone Motion Detection algorithm retired
- **Type:** Removal/consolidation
- **What it does:** The standalone live "Motion Detection" algorithm was removed; its capability now lives inside "Color Anomaly & Motion Detection." Live algorithms are now Color Detection, Color Anomaly & Motion, and AI Person Detector. *(Note for notes: the old menu entry disappears.)*
- **Key files:** removed `app/algorithms/streaming/MotionDetection/**`; `algorithms.conf` · commit `1d51f1f`

---

## 3. Detection Algorithms (image analysis)

### ⭐ AI Person Detector — image algorithm
- **Type:** New feature
- **What it does:** A neural-network (ONNX) algorithm that detects people directly in still drone imagery, instead of relying on color/temperature heuristics — directly targeting the search objective.
- **Where:** Algorithm selection / wizard when starting a new image analysis. Registered for **Windows and macOS**.
- **Key files:** `algorithms.conf` (`AIPersonDetector`, label "AI Person Detector"), bundled `*.onnx` V3 640 & 1024 models. *(Shares the model family with the streaming variant.)*

### ⭐ Temperature Residual Anomaly — thermal algorithm
- **Type:** New feature
- **What it does:** Finds subtle thermal hot/cold spots that stand out from their *immediate surroundings* rather than a whole-image average — e.g. a person lying in cool grass that absolute-threshold methods miss when ground temps vary across a flight. Analysts choose "Warmer than surroundings," "Cooler," or "Both," and a 1–10 sensitivity. Uses local-background estimation + robust (median/MAD) statistics + rarity weighting.
- **Where:** Algorithm selector / wizard ("Temperature Residual Anomaly"). Requires radiometric thermal imagery; **Windows only**.
- **Key files:** `app/algorithms/images/ThermalResidualAnomaly/**` · commit `cbd0dc6`

### ◐ Detection expansion for MRMap & HSV Color Range
- **Type:** Enhancement
- **What it does:** Optional post-detection growth so faint/partial hits become more prominent. "Hue Expansion" (MRMap + HSV) floods outward through same-colored neighbors (±5 hue, with saturation/value floors) to sweep in the rest of a colored object; "Threshold Expansion" (MRMap only) pulls in nearby almost-anomalous pixels. Off by default; confidence scores still reflect the original detection.
- **Where:** New-analysis parameters panel + wizard for MRMap and HSV Color Range.
- **Key files:** `app/algorithms/DetectionExpansion.py`, `MRMapService.py`, `HSVColorRangeService.py` · commit `1c763dd`

### ◐ MRMap detections show their true shape
- **Type:** Bug fix
- **What it does:** MRMap previously filled a bounding box into its detection mask, so "Show POIs" covered the whole region. Now the mask marks only genuinely flagged pixels, so the overlay shows the real anomaly outline, the reported area reflects true pixel count, and confidence isn't diluted — matching every other detector.
- **Where:** Results Viewer — "Show POIs" overlay (MRMap results).
- **Key files:** `MRMapService._build_aois_from_clusters` · commit `2cb2b93`

---

## 4. Measurement & Photogrammetry (image Results Viewer)

### ⭐ Person Size Reference tool
- **Type:** New feature
- **What it does:** Drop a true-to-scale human outline onto a drone image and drag it next to a suspicious blob to judge whether it could be a person. Pick a size class (Large adult → Infant) and pose (Standing / Lying / Sitting); the tool draws the silhouette at the correct perspective scale for that image's exact camera angle and altitude (compact near center, foreshortened toward oblique edges). A rotation control aligns it with elongated objects; an optional sun-cast shadow shows the shadow that person would throw.
- **Where:** Results Viewer — "Person Size Reference" tool (Ctrl+P); non-modal, re-projects when you change images.
- **Key files:** `PersonReferenceDialog.py`, `CameraModel.py`, `PersonModel.py`, `shadow/PersonShadow.py` · commits `fdcb9a8`, `acc9dc9`, `05a73ad`, `0136256`, `7c28c68`

### ⭐ Shadow-based height estimation
- **Type:** New feature
- **What it does:** Measures how tall a vertical object is from its shadow. Click the base, then the shadow tip; the tool computes the sun's elevation/azimuth from capture time + GPS and returns a height with ± uncertainty (e.g. "H ≈ 1.78 m ± 0.21 m") — helping confirm whether a figure is person-height. Self-guards against low/overhead sun, reversed clicks, and missing timezone, with plain-language reasons. Incorporates terrain slope when DEM is available.
- **Where:** Results Viewer — Measure dialog, "Measure Shadow" checkbox (Ctrl+M).
- **Key files:** `shadow/ShadowHeightEstimator.py`, `SolarPosition.py`, `MeasureDialog.py` · commits `58478eb`, `d0c81f6`

### ⭐ Align Image tool (manual FOV alignment → accurate AOI GPS)
- **Type:** New feature
- **What it does:** Manually pin a drone image to satellite/street imagery when the drone's own orientation metadata is unreliable (common with WALDO / bad gimbal data). Rotate the photo and drag four corner handles onto the map, optionally adding tie points. The saved alignment then drives accurate GPS for every detection in that image — independent of the suspect metadata.
- **Where:** Results Viewer — "A" key; modal dialog. Saved into `ADIAT_Data.xml`.
- **Key files:** `AlignImageController.py`, `AlignImageDialog.py`, `AlignImageView.py`, `PhotogrammetryHelper.py` · commit `b9d8f53`

### ◐ Terrain-aware placement for Person Size Reference
- **Type:** Enhancement
- **What it does:** When DEM data covers the image, the reference person and its shadow sit on the actual terrain surface, so the silhouette is sized correctly on rising/falling ground and the shadow lengthens downhill / shortens uphill. Auto-disables when no DEM is available.
- **Key files:** `PersonReferenceDialog.py` · commit `e40d1e2`

### · "Use Anyway" azimuth override
- **Type:** Enhancement
- **What it does:** When a shadow measurement is rejected only because the drawn line doesn't match expected shadow direction, a "Use Anyway" button lets a confident analyst force the estimate (with a warning).
- **Key files:** `MeasureDialog.py`, `ShadowHeightEstimator.py` · commit `08250fd`

### · Actionable diagnostics when projection fails
- **Type:** Bug fix / Enhancement
- **What it does:** Failed projections now explain the specific cause and fix (no GPS in EXIF, no camera profile in drones.csv, no altitude → "Run Tools > WALDO Pre-Pass first", pitch at/above horizon).
- **Key files:** `ShadowHeightEstimator._diagnose_projection_failure` · commit `5c2e746`

### · Accept XMP CreateDate/ModifyDate as sun-time source
- **Type:** Bug fix
- **What it does:** Sun-position math now falls back to XMP CreateDate/ModifyDate when EXIF lacks a UTC offset (which DJI and most cameras omit), so shadow tools work on far more images. Naive timestamps without a timezone are still rejected.
- **Key files:** `SolarPosition.resolve_capture_utc` · commit `d0c81f6`

---

## 5. Terrain & Mapping (DEM, GPS Map, FOV)

### ⭐ Pluggable terrain elevation source (USGS 3DEP + Terrarium)
- **Type:** New feature
- **What it does:** A configurable terrain-elevation backend used throughout AOI/FOV math. Two providers ship: **AWS Terrarium** (online ~30 m global, auto-downloaded and cached for offline reuse) and **USGS 3DEP 1 m local GeoTIFFs** (high-res, fully offline via a `dem_manifest.csv` + spatial index). Falls back to Terrarium if 3DEP is unset or fails.
- **Where:** Preferences → new "Terrain Elevation Source" group. Used invisibly by all AOI/FOV calculations.
- **Key files:** `app/core/services/terrain/**`, `Preferences.py` · commits `0074024`, `9bf541f`

### ⭐ Terrain-corrected AOI GPS coordinates
- **Type:** New feature
- **What it does:** Replaces flat-ground projection with a 3D camera raycast that intersects real terrain, giving much more accurate GPS for detections on sloped/variable ground. Iteratively refines the position, applies geoid (EGM96) correction, and recovers usable altitude when the drone's reported relative altitude is unreliable. Falls back to flat-terrain when no DEM. The AOI label/tooltip shows the source (🏔️ terrain-corrected vs ⬜ flat) and feeds KML/PDF/CalTopo/map exports.
- **Where:** Results Viewer — AOI selection, labels, exports.
- **Key files:** `AOIService.estimate_aoi_gps` · commit `0074024`

### ⭐ Terrain-aware field-of-view (FOV) footprint box
- **Type:** New feature
- **What it does:** Draws a blue polygon on the GPS Map showing the actual ground footprint of the current image — raycasting each edge through the 3D camera model and refining against the DEM so the box follows terrain contours (handles oblique imagery and fixed-wing gimbal roll). Tooltip reports pixel dims, ground coverage, GSD, bearing, terrain elevation, effective AGL.
- **Where:** GPS Map View (from Results Viewer).
- **Key files:** `GPSMapView.update_fov_box` · commits `64c8b82`, `a55ee33`

### ◐ Live zoom FOV box (visible-portion footprint)
- **Type:** New feature
- **What it does:** A second, red box on the GPS map shows exactly which patch of ground you're currently looking at in the image viewer, updating in real time as you pan/zoom.
- **Where:** GPS Map View.
- **Key files:** `GPSMapView.update_zoom_fov_box` · commit `64c8b82`

### ◐ Right-click map navigation to a coordinate
- **Type:** New feature
- **What it does:** Right-click anywhere on the GPS map to jump the image viewer to that point — finds which image actually contains the coordinate (current first, then 10 nearest), switches if needed, and centers/zooms (terrain-adjusted). Toast if no image covers the point.
- **Where:** GPS Map View.
- **Key files:** `GPSMapController.on_map_gps_clicked` · commit `64c8b82`

### · Windows stability: suppress benign Qt COM traces
- **Type:** Bug fix
- **What it does:** Disables faulthandler on Windows so harmless internal Qt COM exceptions no longer spew crash-style tracebacks. Crash diagnostics stay enabled elsewhere.
- **Key files:** `app/__main__.py` · commit `a55ee33`

---

## 6. Results Viewer & Review Tools

### ⭐ Team Planning ("Plan Verification") with per-team PDF packets
- **Type:** New feature
- **What it does:** Divide flagged detections among named field teams on an interactive map (single-click, Ctrl-click, or rectangle select), with live per-team and "Unassigned" counts, then export field-ready PDFs — one packet per team plus a master summary. Each team packet has a cover page, a team overview map with legend, and detail pages for assigned AOIs. Definitions/assignments persist in `ADIAT_Data.xml`.
- **Where:** Results Viewer — "Plan Verification (T)" toolbar button / "T" shortcut.
- **Key files:** `TeamPlanningController.py`, `TeamPlanningDialog.py`, `TeamPlanningMapView.py`, `export/TeamPdfExportService.py` · commit `3a1f99b`

### ⭐ Color Histogram with hue isolation
- **Type:** New feature
- **What it does:** Shows a hue distribution chart for any color photo, with an "AOIs Only" overlay of which colors fall inside detections. Hovering a bar highlights every pixel of that color in cyan. A circular hue-wheel with two draggable handles isolates a color band (blacking out everything else) to hunt for a red jacket / blue tarp / orange vest. Preview-only; doesn't alter files.
- **Where:** Results Viewer — histogram toolbar button; non-modal "Hue Histogram" pop-up.
- **Key files:** `ColorHistogramService.py`, `ColorHistogramController.py`, `HueWheelRangeSelector.py` · commit `da8e8ed`

### ⭐ Thermal Histogram viewer with temperature-band highlighting
- **Type:** New feature
- **What it does:** For thermal analyses, an interactive temperature histogram (all pixels gray, AOI pixels orange) shows where detections sit on the temperature scale. A two-handle range slider isolates a temperature band; hovering a bin highlights those temperatures in cyan.
- **Where:** Results Viewer — histogram button (thermal datasets only).
- **Key files:** `ThermalHistogramService.py`, `ThermalHistogramController.py`, `ThermalRangeSlider.py` · commit `8a3c8dd`

### ◐ Detection density heatmap + spatial filter
- **Type:** New feature
- **What it does:** Builds a density map of where detections land within the frame across the dataset (red = recurring positions), exposing systematic false positives (stuck/hot pixels, lens artifacts, rotor/strut). Filter "Hot Zones" out, or show only them, with an adjustable percentile threshold. Legacy datasets get an automatic image-dimension backfill so it works on older results.
- **Where:** Results Viewer — AOI filter dialog → "View Heatmap".
- **Key files:** `HeatmapService.py`, `HeatmapViewerDialog.py`, `Viewer._backfill_image_dimensions_if_needed` · commits `5f84a2e`, `7a7259b`

### ◐ Run-wide AOI numbers, jump-to-AOI, and on-image ruler
- **Type:** New feature
- **What it does:** Every detection gets a stable unique number (#1, #2, …) shown on thumbnails and tooltips so reviewers can refer to "AOI #147" across sessions. A "Go to AOI #" box jumps to any detection. Selecting an AOI shows its number plus a calibrated real-world ruler (ft/m) with a rotate handle for an instant size estimate. Legacy `ADIAT_Data.xml` files are backfilled on open.
- **Where:** Results Viewer — thumbnails, toolbar jump box, on-image overlay.
- **Key files:** `AOIOverlayController.py`, `AOISelectionOverlay.py`, `AnalyzeService.assign_aoi_numbers` · commit `df5d340`

### ◐ Color and image-mask filtering of detections
- **Type:** New feature
- **What it does:** Two new ways to cut the detection list. **Color filter:** pick a hue + tolerance, then "Show Only This Color" or "Exclude This Color" (e.g. hide vegetation-green false positives). **Image-mask filter:** load a black/white mask and show-only or exclude detections in white regions (e.g. paint roads/water black to drop reflective-water false positives).
- **Where:** Results Viewer — AOI filter dialog.
- **Key files:** `AOIFilterDialog.py`, `AOIController.py` · commits `5f84a2e`, `2a0f554`

### · Keyboard-driven AOI review in the gallery
- **Type:** Enhancement
- **What it does:** Left/Right arrows step through detections one at a time (main image loads and zooms to each, wrapping at ends). Single-key shortcuts (G/Z/C/R/H/M/E/F…) now fire while the gallery has focus.
- **Key files:** `GalleryController.py`, `GalleryUIComponent.py` · commits `fc40a91`, `0b2fed6`

### · Gallery comment icons, right-click copy, substring comment search
- **Type:** Enhancement
- **What it does:** Each thumbnail gets a clickable comment icon (gold = note exists, gray = empty) for reading/adding notes from the grid; right-click offers the same "Copy Data" menu as single-image view; the comment filter now does case-insensitive substring matching ("blue" matches "The cow is blue") while old `*blue*` wildcards still work.
- **Key files:** `GalleryUIComponent.py`, `AOIController.py` · commit `0b2fed6`

### · PDF overview-map tile source (Map vs Satellite)
- **Type:** Enhancement
- **What it does:** A "Map Tiles:" dropdown in PDF export settings chooses the report's overview-map background — OpenStreetMap streets/trails (routing) or ArcGIS satellite (terrain/structures). Remembered between exports.
- **Key files:** `PDFExportDialog.py`, `PdfGeneratorService.py` · commit `a8e6748`

### · GPS Map View: rotate + improved floating
- **Type:** Enhancement
- **What it does:** A "Rotate (R)" button swings the map between north-up and bearing-aligned; the window floats above the viewer without burying unrelated apps or its own modal dialogs.
- **Key files:** `GPSMapDialog.py` · commit `0b2fed6`

### · Results Viewer usability on small screens & large galleries
- **Type:** Enhancement
- **What it does:** AOI filter dialog is now scrollable (reaches all new groups on low-res laptops); toolbar/header lifted above the splitter; tighter margins; gallery mouse-wheel scrolls a full page per notch, snapping to row boundaries.
- **Key files:** `Viewer.py`, `AOIFilterDialog.py`, `GalleryUIComponent.py` · commits `15ffb70`, `5f84a2e`

---

## 7. Batch Processing & Automation

### ⭐ Batch processing (GUI) — analyze every subfolder as its own run
- **Type:** New feature
- **What it does:** Point ADIAT at a parent folder and have it analyze each image-containing subfolder as a separate independent "batch," each writing its own `ADIAT_Results`. If one folder fails the rest still complete. Runs on a background thread with live log and a status-bar progress line.
- **Where:** Images window — new "Batch mode" checkbox below the Input/Output pickers (remembered across sessions).
- **Key files:** `BatchAnalyzeService.py`, `MainWindow._start_batch_processing` · commit `f008bbe`

### ⭐ Headless Batch CLI
- **Type:** New feature
- **What it does:** Run full batch analysis with no GUI: `python app batch --input <parent> --output <root>`. Settings can come from flags, be inherited from a prior run's `ADIAT_Data.xml` (`--config`), or both (per-algorithm `--option NAME=VALUE`). Exit code 0/1 makes it scriptable for overnight processing. Supports `--resume`, `--no-coordinator`, `--project-name`, `--resolution`, etc.
- **Where:** Command line (`python app batch …`).
- **Key files:** `app/core/services/cli/BatchCLI.py`, `app/__main__.py` · commit `f008bbe`

### ⭐ Auto-built Search Coordinator project links all batches
- **Type:** New feature
- **What it does:** When a batch run completes, ADIAT writes a Search Coordinator project (`ADIAT_Search_<name>_<timestamp>.xml`) linking every successful batch into one reviewable project, and offers an "Open Search Coordinator" button. The CLI does this too unless `--no-coordinator`.
- **Where:** Images window completion dialog; CLI output.
- **Key files:** `BatchAnalyzeService._create_search_project`, `SearchProjectService.create_new_project` · commit `f008bbe`

### ◐ Open a batch's results in the Viewer from the Search Coordinator
- **Type:** New feature
- **What it does:** In the Coordinator's Batch Status tab, double-clicking a batch row opens that batch's `ADIAT_Data.xml` directly in the image Viewer (previously there was no way to drill from the overview into the flagged images).
- **Where:** Search Coordinator → Batch Status tab.
- **Key files:** `CoordinatorWindow._open_batch_in_viewer` · commit `f45d560`

### ◐ Batch hardening: per-image timeouts
- **Type:** Enhancement / reliability
- **What it does:** A single corrupt/stalled image can no longer wedge a run — each image has a per-image timeout (300 s); a worker that crashes/stalls is logged as a failed image and skipped, and processing continues. Applies to single-folder and batch runs.
- **Key files:** `AnalyzeService` (`AsyncResult.get(timeout=…)`, `_handle_failed_image`) · commit `8aff94e`

### ◐ Progress ETAs for analysis and batch runs
- **Type:** Enhancement
- **What it does:** Status bar shows live ETA — "Processing image X of Y — about Nm Ns remaining" for a single run, and a combined per-folder + whole-batch estimate for batches (factoring finished folders). Per-batch timing recorded in `batch_summary.txt`.
- **Key files:** `AnalyzeService.sig_progress`, `BatchAnalyzeService._on_inner_progress`, `FormatHelper.format_duration` · commit `8aff94e`

### ◐ Resume an interrupted batch run
- **Type:** New feature
- **What it does:** Restarting a batch on the same folders detects which finished (those with `ADIAT_Data.xml`) and prompts Resume (skip finished) or Restart. Same via CLI `--resume`. Saves re-processing thousands of images after a crash.
- **Key files:** `BatchAnalyzeService.count_completed_batches`, `MainWindow._confirm_batch_resume` · commit `8aff94e`

---

## 8. Data Import & Compatibility

### ⭐ Skydio X10 CSV flight-log import (Video Parser)
- **Type:** New feature
- **What it does:** When extracting frames from drone video, supply a Skydio CSV flight log (alternative to DJI SRT) to embed GPS into frames. Reads the MP4 `creation_time` via ffprobe, matches each frame's UTC timestamp to the nearest CSV row, and writes lat/lon/altitude EXIF (altitude converted ft MSL → m).
- **Where:** Video Parser dialog — metadata picker now accepts SRT and CSV.
- **Key files:** `VideoParserService._parse_csv_flight_log`, `VideoFileHelper.get_video_creation_time` · commit `7b168d7`

### ◐ WALDO airframe metadata pre-pass
- **Type:** New feature
- **What it does:** Auto-detects WALDO survey imagery (twin Canon EOS 5DS R, `0_*`/`1_*` prefixes) when a folder is opened and synthesizes the orientation metadata ADIAT needs (gimbal pitch/yaw/roll, altitude, heading) that these images lack — deriving heading from the GPS track and AGL from terrain/DEM, writing standard `drone-dji` XMP so AOI geolocation works. Runs once per folder.
- **Where:** Automatic during Results Viewer init (modal pre-pass dialog).
- **Key files:** `waldo/WaldoMetadataService.py`, `WaldoPrePassController.py` · commit `a0fec94`

### ◐ Wingtra CSV flight-log import (Results Viewer)
- **Type:** New feature (restored/re-added)
- **What it does:** Load a Wingtra CSV to supply per-image orientation (omega/phi/kappa → bearing/pitch/roll) and compute per-image AGL from terrain; data flows into GPS map rotation, KML export, and coverage extent. Flexible column-alias matching.
- **Where:** Results Viewer — Shift+W.
- **Key files:** `WingtraDataController.py`, `WingtraDataDialog.py`, `scripts/wingtra_csv_to_exif.py` · commit `c1ad87b`

### · Bundled reference data migrated pickle → versioned CSV
- **Type:** Enhancement
- **What it does:** The drone-sensor registry and XMP-namespace mapping moved from binary pickle (`drones.pkl`, `xmp.pkl`) to human-readable, git-diffable CSV (`drones.csv`, `xmp.csv`) with version headers. The app auto-refreshes the local copy when the bundled file is newer, so users aren't stuck on stale data after upgrade. **Backward compat:** changes bundled-data format only — `ADIAT_Data.xml` and option dicts are unaffected; defensive fallback keeps the app starting if files are missing.
- **Where:** Transparent at startup; Preferences shows the drone-sensor file version and allows importing a replacement `drones.csv`.
- **Key files:** `PickleHelper.py`, `app/drones.csv`, `app/xmp.csv`, `__main__.check_and_update_pickle_files` · commits `67ced26`, `d41b2bf`

---

## 9. Platform & Infrastructure

### ⭐ In-app update system (check + auto-update on launch)
- **Type:** New feature
- **What it does:** Checks an online feed (`desktop.adiat.app/version.json`) for a newer installer matching the user's OS/architecture. On launch it checks automatically (once per session) and, if newer, shows an "Update Available" prompt with release notes; "Download and Install" downloads with a progress bar and launches the installer. Also a manual "Check for Updates." Respects an "Offline Only" preference and understands prerelease ordering (Beta 1 → Beta 2).
- **Where:** Auto-check from the startup Selection dialog; manual via Images window "Check for Updates."
- **Key files:** `UpdateService.py`, `UpdateController.py`, `__main__.py` · commit `36881c6`

### ⭐ Multi-language support (English, Italian, Spanish, Dutch)
- **Type:** New feature
- **What it does:** Run the app in English, Italiano, Español, or Nederlands. Pick a language in Preferences; saved and applied on next launch ("Restart Required"). UI strings, tooltips, placeholders, and dialogs are translation-ready via a `tr()` mixin and Qt's translation system, with compiled `.qm` per locale.
- **Where:** Preferences → "Language:" dropdown.
- **Key files:** `Preferences._add_language_selection`, `TranslationMixin.py`, `scripts/extract_translations.py`, `translations/app_{en,es,it,nl}.*` · commits `a777ed4`, `06c27ba`, `0875d64`, `9d851d9`, `b7ac983`

### · Preferences: Offline Only mode + drone-sensor file management
- **Type:** Enhancement
- **What it does:** Preferences gained an "Offline Only" mode (disables online maps/CalTopo and update checks), the language selector, the Terrain Elevation Source section, and a control to view/import the bundled drone-sensor file.
- **Key files:** `Preferences.py`, `resources/views/Preferences.ui`

### · Version bump to 2.1.0 + optional TOML app-config
- **Type:** Enhancement
- **What it does:** Version advanced from `2.0.3_BETA` to the 2.1.0 line (HEAD reads `2.1.0 Beta 1`). A new optional `config.toml` in the app-data dir lets operators override settings (e.g. Flight Viewer signaling base URL) without code changes; missing/malformed file falls back safely. Version comparison now understands prerelease labels and build numbers (release < rc < beta < alpha).
- **Key files:** `__main__.py`, `AppConfig.py` · commit `d8b9b47`

---

## Release-checklist / QA notes (from the audit)

These don't affect the feature list but are worth knowing before you publish:

- **Version label:** confirm whether you ship as `2.1.0 Beta 1` (current HEAD) vs `2.1.0 Alpha` (bump commit). `app/__main__.py:23` currently says `2.1.0 Beta 1`.
- **Test coverage gaps:** Team Planning and the PDF map-tile dropdown shipped without added automated tests (per the auditing pass).
- **i18n gaps:** several newer user-facing features were translated for English/Italian but not yet Spanish/Dutch — worth a translation sweep (`python scripts/extract_translations.py`) before release if multi-language parity matters.
- **Platform availability varies by feature:** Temperature Residual Anomaly is **Windows-only**; AI Person Detector image algorithm is **Windows + macOS**; the streaming AI Person Detector adds **Linux**. Mention platform support where relevant in the notes.
- **Behavior change to call out:** the standalone live **Motion Detection** streaming algorithm was removed (folded into "Color Anomaly & Motion Detection") — existing users will notice the menu entry is gone.
- **Backward compatibility:** `drones.pkl`/`xmp.pkl` → `drones.csv`/`xmp.csv` migration is automatic; user results (`ADIAT_Data.xml`) are unaffected, and legacy result files are backfilled (AOI numbers, image dimensions) on open.

---

*Generated by an automated capability audit comparing `dev` (`7a7259b`) against `origin/main` (`5e59822`). Every entry was verified against the source on `dev`. Headline-potential marks (⭐/◐/·) are suggestions — adjust to taste.*
