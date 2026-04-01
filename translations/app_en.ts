<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="en_US">
<context>
    <name>AIPersonDetector</name>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="27"/>
        <source>Confidence threshold for AI person detection.
Controls the minimum confidence level required to report a person detection.</source>
        <translation>Confidence threshold for AI person detection.
Controls the minimum confidence level required to report a person detection.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="31"/>
        <source>Confidence Threshold</source>
        <translation>Confidence Threshold</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="44"/>
        <source>Adjust the confidence threshold for person detection.
• Range: 0% to 100% (slider -1 to 100, -1 displays as 0%)
• Default: 50%
The AI model assigns a confidence score to each person detection:
• Lower values (0-30%): Accept low-confidence detections (more detections, more false positives)
• Medium values (31-60%): Balanced detection (recommended for most cases)
• Higher values (61-100%): Only accept high-confidence detections (fewer detections, fewer false positives)
Confidence represents the AI model&apos;s certainty that a detected object is a person.
Start with 50% and adjust based on your accuracy requirements.</source>
        <translation>Adjust the confidence threshold for person detection.
• Range: 0% to 100% (slider -1 to 100, -1 displays as 0%)
• Default: 50%
The AI model assigns a confidence score to each person detection:
• Lower values (0-30%): Accept low-confidence detections (more detections, more false positives)
• Medium values (31-60%): Balanced detection (recommended for most cases)
• Higher values (61-100%): Only accept high-confidence detections (fewer detections, fewer false positives)
Confidence represents the AI model&apos;s certainty that a detected object is a person.
Start with 50% and adjust based on your accuracy requirements.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="81"/>
        <source>Current confidence threshold percentage.
Displays the value selected on the confidence slider (0-100%).
Detections below this confidence level will be filtered out.</source>
        <translation>Current confidence threshold percentage.
Displays the value selected on the confidence slider (0-100%).
Detections below this confidence level will be filtered out.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="86"/>
        <source>50</source>
        <translation>50</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="100"/>
        <source>GPU status and availability information.
Shows whether GPU acceleration is available for AI person detection.
• GPU Available: AI detection will use GPU for faster processing
• CPU Only: AI detection will use CPU (slower but still functional)
GPU acceleration significantly improves processing speed for AI models.</source>
        <translation>GPU status and availability information.
Shows whether GPU acceleration is available for AI person detection.
• GPU Available: AI detection will use GPU for faster processing
• CPU Only: AI detection will use CPU (slower but still functional)
GPU acceleration significantly improves processing speed for AI models.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="107"/>
        <source>GPU Label</source>
        <translation>GPU Label</translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorControlWidget</name>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="54"/>
        <source>Person Detection</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="55"/>
        <source>Input &amp;&amp; Processing</source>
        <translation type="unfinished">Input &amp;&amp; Processing</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="56"/>
        <source>Frame</source>
        <translation type="unfinished">Frame</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="57"/>
        <source>Rendering &amp;&amp; Cleanup</source>
        <translation type="unfinished">Rendering &amp;&amp; Cleanup</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="78"/>
        <source>Model</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="80"/>
        <source>Force CPU (disable DirectML)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="81"/>
        <source>Use 1024 model (higher quality, slower)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="86"/>
        <source>Detection</source>
        <translation type="unfinished">Detection</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/views/AIPersonDetectorControlWidget.py" line="91"/>
        <source>Confidence Threshold:</source>
        <translation type="unfinished">Confidence Threshold:</translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorController</name>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorController.py" line="81"/>
        <source>GPU Not Available</source>
        <translation>GPU Not Available</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorController.py" line="87"/>
        <source>GPU Available</source>
        <translation>GPU Available</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/controllers/AIPersonDetectorController.py" line="88"/>
        <source>FPS: {fps} | Processing: {ms}ms</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/AIPersonDetector/controllers/AIPersonDetectorController.py" line="93"/>
        <source>{status} | Tile fallback active</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorWizard</name>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetectorWizard.ui" line="40"/>
        <source>How confident should ADIAT be before marking something as a person?</source>
        <translation>How confident should ADIAT be before marking something as a person?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetectorWizard.ui" line="56"/>
        <source>Note: A higher setting may increase false positives.</source>
        <translation>Note: A higher setting may increase false positives.</translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorWizardController</name>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="33"/>
        <source>Very 
Confident</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="34"/>
        <source>Confident</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="35"/>
        <source>Balanced</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="36"/>
        <source>Permissive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="37"/>
        <source>Very 
Permissive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>AOICommentDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="27"/>
        <source>AOI Comment</source>
        <translation>AOI Comment</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="37"/>
        <source>Add a comment for this flagged AOI (max 256 characters):</source>
        <translation>Add a comment for this flagged AOI (max 256 characters):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="44"/>
        <source>Enter your comment here...</source>
        <translation>Enter your comment here...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="57"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="59"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>AOIController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="434"/>
        <source>Comment saved</source>
        <translation>Comment saved</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="436"/>
        <source>Comment cleared</source>
        <translation>Comment cleared</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="523"/>
        <source>Copy Data</source>
        <translation>Copy Data</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="597"/>
        <source>AOI data copied</source>
        <translation>AOI data copied</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="677"/>
        <source>Invalid image index</source>
        <translation>Invalid image index</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="682"/>
        <source>Invalid AOI index</source>
        <translation>Invalid AOI index</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="745"/>
        <source>Could not calculate AOI location. Diagnostic info copied to clipboard!</source>
        <translation>Could not calculate AOI location. Diagnostic info copied to clipboard!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="751"/>
        <source>Could not calculate AOI location</source>
        <translation>Could not calculate AOI location</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1109"/>
        <source>Temperature sorting unavailable (no thermal data)</source>
        <translation>Temperature sorting unavailable (no thermal data)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1424"/>
        <source>Cannot Delete AOI</source>
        <translation>Cannot Delete AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1426"/>
        <source>Only manually created AOIs can be deleted. Algorithm-detected AOIs cannot be deleted.</source>
        <translation>Only manually created AOIs can be deleted. Algorithm-detected AOIs cannot be deleted.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1435"/>
        <source>Delete AOI</source>
        <translation>Delete AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1437"/>
        <source>Are you sure you want to delete this AOI? This action cannot be undone.</source>
        <translation>Are you sure you want to delete this AOI? This action cannot be undone.</translation>
    </message>
</context>
<context>
    <name>AOICreationDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="23"/>
        <source>Create AOI</source>
        <translation>Create AOI</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="31"/>
        <source>Create AOI?</source>
        <translation>Create AOI?</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="39"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="43"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>AOIFilterDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="55"/>
        <source>Filter AOIs</source>
        <translation>Filter AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="64"/>
        <source>Filter Areas of Interest by flagged status, comments, color, and/or pixel area:</source>
        <translation>Filter Areas of Interest by flagged status, comments, color, and/or pixel area:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="69"/>
        <source>Flagged AOIs</source>
        <translation>Flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="72"/>
        <source>Show Only Flagged AOIs</source>
        <translation>Show Only Flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="76"/>
        <source>Only AOIs marked with a flag will be displayed</source>
        <translation>Only AOIs marked with a flag will be displayed</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="84"/>
        <source>Comment Filter</source>
        <translation>Comment Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="88"/>
        <source>Enable Comment Filter</source>
        <translation>Enable Comment Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="95"/>
        <source>Pattern:</source>
        <translation>Pattern:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="98"/>
        <source>e.g., *work* or crack* or *damage</source>
        <translation>e.g., *work* or crack* or *damage</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="106"/>
        <source>Use * as wildcard for any characters (case-insensitive)</source>
        <translation>Use * as wildcard for any characters (case-insensitive)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="110"/>
        <source>Only AOIs with non-empty comments matching the pattern will be shown</source>
        <translation>Only AOIs with non-empty comments matching the pattern will be shown</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="118"/>
        <source>Color Filter</source>
        <translation>Color Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="122"/>
        <source>Enable Color Filter</source>
        <translation>Enable Color Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="129"/>
        <source>Target Hue:</source>
        <translation>Target Hue:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="131"/>
        <source>Select Color</source>
        <translation>Select Color</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="143"/>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="362"/>
        <source>No color selected</source>
        <translation>No color selected</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="151"/>
        <source>Hue Range (±):</source>
        <translation>Hue Range (±):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="169"/>
        <source>AOIs with hue within ±range of target will be shown</source>
        <translation>AOIs with hue within ±range of target will be shown</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="177"/>
        <source>Pixel Area Filter</source>
        <translation>Pixel Area Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="181"/>
        <source>Enable Pixel Area Filter</source>
        <translation>Enable Pixel Area Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="188"/>
        <source>Minimum Area (px):</source>
        <translation>Minimum Area (px):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="202"/>
        <source>Maximum Area (px):</source>
        <translation>Maximum Area (px):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="218"/>
        <source>Temperature Filter</source>
        <translation>Temperature Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="222"/>
        <source>Enable Temperature Filter</source>
        <translation>Enable Temperature Filter</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="276"/>
        <source>Temperature filtering unavailable (no thermal data)</source>
        <translation>Temperature filtering unavailable (no thermal data)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="291"/>
        <source>Clear All Filters</source>
        <translation>Clear All Filters</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="297"/>
        <source>Apply</source>
        <translation>Apply</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="302"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="337"/>
        <source>Select Target Hue</source>
        <translation>Select Target Hue</translation>
    </message>
</context>
<context>
    <name>AOINeighborGalleryDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="338"/>
        <source>AOI in Neighboring Images</source>
        <translation>AOI in Neighboring Images</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="389"/>
        <source>Reset View</source>
        <translation>Reset View</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="392"/>
        <source>Reset zoom and fit all thumbnails in view</source>
        <translation>Reset zoom and fit all thumbnails in view</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="399"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
</context>
<context>
    <name>AOINeighborTrackingController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="105"/>
        <source>No AOI Selected</source>
        <translation>No AOI Selected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="106"/>
        <source>Please select an AOI first by clicking on it in the thumbnail panel.</source>
        <translation>Please select an AOI first by clicking on it in the thumbnail panel.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="130"/>
        <source>Cannot Calculate GPS</source>
        <translation>Cannot Calculate GPS</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="132"/>
        <source>Unable to calculate GPS coordinates for this AOI.

This may be due to missing image metadata (GPS, altitude, or camera info).</source>
        <translation>Unable to calculate GPS coordinates for this AOI.

This may be due to missing image metadata (GPS, altitude, or camera info).</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="140"/>
        <source>Searching for AOI in neighboring images...</source>
        <translation>Searching for AOI in neighboring images...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="141"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="145"/>
        <source>Tracking AOI</source>
        <translation>Tracking AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="181"/>
        <source>Tracking Error</source>
        <translation>Tracking Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="182"/>
        <source>An error occurred while tracking the AOI:
{error}</source>
        <translation>An error occurred while tracking the AOI:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="207"/>
        <source>No Neighbors Found</source>
        <translation>No Neighbors Found</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="208"/>
        <source>The AOI was not found in any neighboring images.</source>
        <translation>The AOI was not found in any neighboring images.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="233"/>
        <source>Search Error</source>
        <translation>Search Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="234"/>
        <source>An error occurred during the search:
{error}</source>
        <translation>An error occurred during the search:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="285"/>
        <source>Display Error</source>
        <translation>Display Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="286"/>
        <source>An error occurred while displaying results:
{error}</source>
        <translation>An error occurred while displaying results:
{error}</translation>
    </message>
</context>
<context>
    <name>AOIUIComponent</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="250"/>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="333"/>
        <source>AOI Information
Right-click to copy data to clipboard</source>
        <translation>AOI Information
Right-click to copy data to clipboard</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="256"/>
        <source>

Score Type: {type}
Raw Score: {score} ({method})</source>
        <translation>

Score Type: {type}
Raw Score: {score} ({method})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="307"/>
        <source>Confidence Score: {score:.1f}%</source>
        <translation>Confidence Score: {score:.1f}%</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="373"/>
        <source>Unflag AOI</source>
        <translation>Unflag AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="373"/>
        <source>Flag AOI</source>
        <translation>Flag AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="390"/>
        <source>Comment:
{comment}

Click to edit comment</source>
        <translation>Comment:
{comment}

Click to edit comment</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="398"/>
        <source>No comment yet.
Click to add a comment for this AOI.

Use comments to note important details, observations,
or actions needed for this detection.</source>
        <translation>No comment yet.
Click to add a comment for this AOI.

Use comments to note important details, observations,
or actions needed for this detection.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="415"/>
        <source>Calculate and show GPS location for this AOI</source>
        <translation>Calculate and show GPS location for this AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="433"/>
        <source>Delete this AOI</source>
        <translation>Delete this AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="471"/>
        <source>Area</source>
        <translation>Area</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="471"/>
        <source>Areas</source>
        <translation>Areas</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="473"/>
        <source>{filtered} of {total} {label}</source>
        <translation>{filtered} of {total} {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="482"/>
        <source>Area of Interest</source>
        <translation>Area of Interest</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="484"/>
        <source>Areas of Interest</source>
        <translation>Areas of Interest</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="487"/>
        <source>{count} {label}</source>
        <translation>{count} {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="630"/>
        <source>Loading AOIs...</source>
        <translation>Loading AOIs...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="671"/>
        <source>Loading AOIs... ({current}/{total})</source>
        <translation>Loading AOIs... ({current}/{total})</translation>
    </message>
</context>
<context>
    <name>AlertManager</name>
    <message>
        <location filename="../app/core/services/AlertService.py" line="292"/>
        <source>ADIAT - Color Detection Alerts</source>
        <translation>ADIAT - Color Detection Alerts</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="567"/>
        <source>ADIAT - Color Detection Alert</source>
        <translation>ADIAT - Color Detection Alert</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="608"/>
        <source>Detected {count} object(s)
Average confidence: {avg_confidence:.2f}
Total area: {area:.0f} pixels
</source>
        <translation>Detected {count} object(s)
Average confidence: {avg_confidence:.2f}
Total area: {area:.0f} pixels
</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="618"/>
        <source>
Details:
</source>
        <translation>
Details:
</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="622"/>
        <source>  #{index}: ({x},{y}) {w}x{h} conf:{confidence:.2f}
</source>
        <translation>  #{index}: ({x},{y}) {w}x{h} conf:{confidence:.2f}
</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="642"/>
        <source>ADIAT - Detection Alert</source>
        <translation>ADIAT - Detection Alert</translation>
    </message>
</context>
<context>
    <name>AlgorithmParametersPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmParametersPage.py" line="166"/>
        <source>{algorithm} Algorithm Settings</source>
        <translation>{algorithm} Algorithm Settings</translation>
    </message>
</context>
<context>
    <name>AlgorithmSelectionPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="92"/>
        <source>Are you using thermal images?</source>
        <translation type="unfinished">Are you using thermal images?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="156"/>
        <source>Are you looking for anomalies within a specific temperature range?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="159"/>
        <source>Do you specifically want to detect people?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="168"/>
        <source>Do you want to detect anomalies relative to local surroundings?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="185"/>
        <source>Are you trying to find a specific color?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="190"/>
        <source>Do you want to manually adjust the color range?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="193"/>
        <source>Do your images contain complex backgrounds or structures?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="200"/>
        <source>Do your images include shadows or areas with uneven lighting?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="226"/>
        <source>Selected Algorithm: {algorithm}</source>
        <translation type="unfinished">Selected Algorithm: {algorithm}</translation>
    </message>
</context>
<context>
    <name>AltitudeController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="98"/>
        <source>meters</source>
        <translation>meters</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="98"/>
        <source>feet</source>
        <translation>feet</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="109"/>
        <source>Negative Altitude Detected</source>
        <translation>Negative Altitude Detected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="111"/>
        <source>WARNING! Relative Altitude is negative. Enter an AGL altitude to be used for GSD calculations (in {unit}):</source>
        <translation>WARNING! Relative Altitude is negative. Enter an AGL altitude to be used for GSD calculations (in {unit}):</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="130"/>
        <source>Override Altitude</source>
        <translation>Override Altitude</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="132"/>
        <source>Enter a custom AGL altitude to be used for GSD calculations for all images (in {unit}):</source>
        <translation>Enter a custom AGL altitude to be used for GSD calculations for all images (in {unit}):</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="180"/>
        <source>Custom AGL set to {value:.1f} {unit}</source>
        <translation>Custom AGL set to {value:.1f} {unit}</translation>
    </message>
</context>
<context>
    <name>AnalyzeService</name>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="125"/>
        <source>Processing {count} files</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="167"/>
        <source>Skipping {file} :: File is not an image</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="172"/>
        <source>All {count} images queued, processing started...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="193"/>
        <source>{images} images with {aois} areas of interest identified</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="199"/>
        <source>Total Processing Time: {seconds} seconds</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="202"/>
        <source>Total Images Processed: {count}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="382"/>
        <source>Unable to process {file} :: {error}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="405"/>
        <source>{count} areas of interest identified in {file} ({percent}%)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="422"/>
        <source>No areas of interest identified in {file} ({percent}%)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="435"/>
        <source>--- Cancelling Image Processing ---</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>BearingRecoveryDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="100"/>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="124"/>
        <source>Missing Bearings Detected</source>
        <translation>Missing Bearings Detected</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="132"/>
        <source>Some images are missing bearing/heading information. We can estimate bearings from a flight track file (KML/GPX/CSV) or calculate them automatically from image GPS coordinates.</source>
        <translation>Some images are missing bearing/heading information. We can estimate bearings from a flight track file (KML/GPX/CSV) or calculate them automatically from image GPS coordinates.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="150"/>
        <source>📁 Load Track File (KML/GPX/CSV)</source>
        <translation>📁 Load Track File (KML/GPX/CSV)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="156"/>
        <source>🧭 Auto-Calculate from Image GPS</source>
        <translation>🧭 Auto-Calculate from Image GPS</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="174"/>
        <source>Preparing...</source>
        <translation>Preparing...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="190"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="195"/>
        <source>Skip</source>
        <translation>Skip</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="259"/>
        <source>Select Track File</source>
        <translation>Select Track File</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="261"/>
        <source>Track Files (*.kml *.gpx *.csv);;KML Files (*.kml);;GPX Files (*.gpx);;CSV Files (*.csv);;All Files (*.*)</source>
        <translation>Track Files (*.kml *.gpx *.csv);;KML Files (*.kml);;GPX Files (*.gpx);;CSV Files (*.csv);;All Files (*.*)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="345"/>
        <source>Bearings set for {count} images ({source})</source>
        <translation>Bearings set for {count} images ({source})</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="350"/>
        <source>, {count} flagged near turns</source>
        <translation>, {count} flagged near turns</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="352"/>
        <source>, {count} hover estimates</source>
        <translation>, {count} hover estimates</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="354"/>
        <source>, {count} time gaps</source>
        <translation>, {count} time gaps</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="361"/>
        <source>Bearing Calculation Complete</source>
        <translation>Bearing Calculation Complete</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="362"/>
        <source>{summary}.</source>
        <translation>{summary}.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="389"/>
        <source>Bearing Calculation Failed</source>
        <translation>Bearing Calculation Failed</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="391"/>
        <source>An error occurred during bearing calculation:

{error}

Please check your input files and try again.</source>
        <translation>An error occurred during bearing calculation:

{error}

Please check your input files and try again.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="411"/>
        <source>Cancelled</source>
        <translation>Cancelled</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="422"/>
        <source>Cancelling...</source>
        <translation>Cancelling...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="435"/>
        <source>Bearing Recovery Not Needed</source>
        <translation>Bearing Recovery Not Needed</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="437"/>
        <source>Bearing recovery requires multiple images to calculate direction of travel.

With only one image, bearing recovery cannot be performed.</source>
        <translation>Bearing recovery requires multiple images to calculate direction of travel.

With only one image, bearing recovery cannot be performed.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="452"/>
        <source>
&lt;h3&gt;What is Bearing Recovery?&lt;/h3&gt;

&lt;p&gt;&lt;b&gt;Bearing&lt;/b&gt; (also called heading, yaw, or course) is the direction the drone/camera
was pointing when an image was captured, measured in degrees clockwise from North (0-360°).&lt;/p&gt;

&lt;h4&gt;Why is it important?&lt;/h4&gt;
&lt;p&gt;Bearings are essential for:&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;Accurate georeferencing and mapping&lt;/li&gt;
&lt;li&gt;Proper image alignment and stitching&lt;/li&gt;
&lt;li&gt;Understanding camera field of view&lt;/li&gt;
&lt;li&gt;Analysis of detected objects in geographic context&lt;/li&gt;
&lt;/ul&gt;

&lt;h4&gt;Recovery Methods:&lt;/h4&gt;

&lt;p&gt;&lt;b&gt;Load Track File (KML/GPX/CSV)&lt;/b&gt;&lt;br/&gt;
Uses an external GPS track log from your drone or flight controller. The track contains
timestamped positions that allow precise bearing interpolation. Most accurate method.&lt;/p&gt;

&lt;p&gt;&lt;b&gt;Auto-Calculate from Image GPS&lt;/b&gt;&lt;br/&gt;
Estimates bearings using only the GPS coordinates embedded in your images. Analyzes the
flight pattern to determine direction of travel. Works well for systematic flight patterns
like lawn-mower surveys.&lt;/p&gt;

&lt;p&gt;&lt;b&gt;Skip&lt;/b&gt;&lt;br/&gt;
Proceed without bearing recovery. Some features may not work correctly.&lt;/p&gt;
        </source>
        <translation>
&lt;h3&gt;What is Bearing Recovery?&lt;/h3&gt;

&lt;p&gt;&lt;b&gt;Bearing&lt;/b&gt; (also called heading, yaw, or course) is the direction the drone/camera
was pointing when an image was captured, measured in degrees clockwise from North (0-360°).&lt;/p&gt;

&lt;h4&gt;Why is it important?&lt;/h4&gt;
&lt;p&gt;Bearings are essential for:&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;Accurate georeferencing and mapping&lt;/li&gt;
&lt;li&gt;Proper image alignment and stitching&lt;/li&gt;
&lt;li&gt;Understanding camera field of view&lt;/li&gt;
&lt;li&gt;Analysis of detected objects in geographic context&lt;/li&gt;
&lt;/ul&gt;

&lt;h4&gt;Recovery Methods:&lt;/h4&gt;

&lt;p&gt;&lt;b&gt;Load Track File (KML/GPX/CSV)&lt;/b&gt;&lt;br/&gt;
Uses an external GPS track log from your drone or flight controller. The track contains
timestamped positions that allow precise bearing interpolation. Most accurate method.&lt;/p&gt;

&lt;p&gt;&lt;b&gt;Auto-Calculate from Image GPS&lt;/b&gt;&lt;br/&gt;
Estimates bearings using only the GPS coordinates embedded in your images. Analyzes the
flight pattern to determine direction of travel. Works well for systematic flight patterns
like lawn-mower surveys.&lt;/p&gt;

&lt;p&gt;&lt;b&gt;Skip&lt;/b&gt;&lt;br/&gt;
Proceed without bearing recovery. Some features may not work correctly.&lt;/p&gt;
        </translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="483"/>
        <source>About Bearing Recovery</source>
        <translation>About Bearing Recovery</translation>
    </message>
</context>
<context>
    <name>CacheLocationDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="35"/>
        <source>Cache Not Found</source>
        <translation>Cache Not Found</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="47"/>
        <source>Cached Data Not Found</source>
        <translation>Cached Data Not Found</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="56"/>
        <source>The following cached items were not found:
</source>
        <translation>The following cached items were not found:
</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="66"/>
        <source>Without cached data, thumbnails and colors will be generated on-demand, which may cause delays when viewing results.

If you have previously processed this dataset and have an ADIAT_Results folder with cached data, you can locate it now to improve performance.</source>
        <translation>Without cached data, thumbnails and colors will be generated on-demand, which may cause delays when viewing results.

If you have previously processed this dataset and have an ADIAT_Results folder with cached data, you can locate it now to improve performance.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="80"/>
        <source>Locate Cache Folder...</source>
        <translation>Locate Cache Folder...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="85"/>
        <source>Skip (Generate On-Demand)</source>
        <translation>Skip (Generate On-Demand)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="122"/>
        <source>Select ADIAT_Results Folder</source>
        <translation>Select ADIAT_Results Folder</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="136"/>
        <source>Invalid Cache Folder</source>
        <translation>Invalid Cache Folder</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="138"/>
        <source>The selected folder does not contain thumbnail cache directory.

Expected to find:
  • .thumbnails/

Please select a valid ADIAT_Results folder.</source>
        <translation>The selected folder does not contain thumbnail cache directory.

Expected to find:
  • .thumbnails/

Please select a valid ADIAT_Results folder.</translation>
    </message>
</context>
<context>
    <name>CalTopoAPIMapDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="42"/>
        <source>Select CalTopo Map</source>
        <translation>Select CalTopo Map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="68"/>
        <source>Select a CalTopo map:</source>
        <translation>Select a CalTopo map:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="77"/>
        <source>Search:</source>
        <translation>Search:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="79"/>
        <source>Filter maps by name...</source>
        <translation>Filter maps by name...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="111"/>
        <source>Update Credentials</source>
        <translation>Update Credentials</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="117"/>
        <source>Select Map</source>
        <translation>Select Map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="121"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="150"/>
        <source>No account data available.</source>
        <translation>No account data available.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="515"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="540"/>
        <source>Credentials Updated</source>
        <translation>Credentials Updated</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="516"/>
        <source>Credentials have been updated and the map list has been refreshed.</source>
        <translation>Credentials have been updated and the map list has been refreshed.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="521"/>
        <source>Update Failed</source>
        <translation>Update Failed</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="523"/>
        <source>Failed to refresh account data with new credentials.

Please check your credentials and try again.</source>
        <translation>Failed to refresh account data with new credentials.

Please check your credentials and try again.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="530"/>
        <source>Update Error</source>
        <translation>Update Error</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="531"/>
        <source>An error occurred while updating credentials:

{error}</source>
        <translation>An error occurred while updating credentials:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="542"/>
        <source>Credentials have been updated. Please close and reopen this dialog to refresh the map list.</source>
        <translation>Credentials have been updated. Please close and reopen this dialog to refresh the map list.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="559"/>
        <source>No Map Selected</source>
        <translation>No Map Selected</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="560"/>
        <source>Please select a map from the list.</source>
        <translation>Please select a map from the list.</translation>
    </message>
</context>
<context>
    <name>CalTopoAuthDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="96"/>
        <source>CalTopo Login &amp; Map Selection</source>
        <translation>CalTopo Login &amp; Map Selection</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="173"/>
        <source>Current map: Not selected</source>
        <translation>Current map: Not selected</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="177"/>
        <source>(Login → Navigate to your map → Click &apos;I&apos;m Logged In&apos;)</source>
        <translation>(Login → Navigate to your map → Click &apos;I&apos;m Logged In&apos;)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="191"/>
        <source>I&apos;m Logged In - Export Data</source>
        <translation>I&apos;m Logged In - Export Data</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="193"/>
        <source>Click this after logging in and navigating to your map</source>
        <translation>Click this after logging in and navigating to your map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="196"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="264"/>
        <source>Initialization Error</source>
        <translation>Initialization Error</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="265"/>
        <source>Failed to initialize CalTopo browser:
{error}</source>
        <translation>Failed to initialize CalTopo browser:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="308"/>
        <source>Failed to Load</source>
        <translation>Failed to Load</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="310"/>
        <source>Failed to load CalTopo. Please check your internet connection and try again.</source>
        <translation>Failed to load CalTopo. Please check your internet connection and try again.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="341"/>
        <source>Current map: {map_id}</source>
        <translation>Current map: {map_id}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="358"/>
        <source>No Map Selected</source>
        <translation>No Map Selected</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="360"/>
        <source>Please navigate to a CalTopo map before capturing the session.

The map URL should contain a map ID (e.g., /m/ABC123 or #id=ABC123).</source>
        <translation>Please navigate to a CalTopo map before capturing the session.

The map URL should contain a map ID (e.g., /m/ABC123 or #id=ABC123).</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="369"/>
        <source>Browser Not Ready</source>
        <translation>Browser Not Ready</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="370"/>
        <source>The CalTopo browser is still loading. Please wait a moment and try again.</source>
        <translation>The CalTopo browser is still loading. Please wait a moment and try again.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="376"/>
        <source>Starting export...</source>
        <translation>Starting export...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="394"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="557"/>
        <source>Authentication Failed</source>
        <translation>Authentication Failed</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="395"/>
        <source>Browser not initialized. Please try again.</source>
        <translation>Browser not initialized. Please try again.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="559"/>
        <source>Could not capture session cookies. Please ensure you are logged in to CalTopo.

Try:
1. Make sure you&apos;re logged in
2. Navigate to a map
3. Wait a few seconds for cookies to be set
4. Click &apos;I&apos;m Logged In&apos; again</source>
        <translation>Could not capture session cookies. Please ensure you are logged in to CalTopo.

Try:
1. Make sure you&apos;re logged in
2. Navigate to a map
3. Wait a few seconds for cookies to be set
4. Click &apos;I&apos;m Logged In&apos; again</translation>
    </message>
</context>
<context>
    <name>CalTopoCredentialDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="33"/>
        <source>CalTopo API Credentials</source>
        <translation>CalTopo API Credentials</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="76"/>
        <source>CalTopo Team API Credentials</source>
        <translation>CalTopo Team API Credentials</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="85"/>
        <source>Enter your CalTopo Team API credentials.
These can be found in the Team Admin page under Service Accounts.</source>
        <translation>Enter your CalTopo Team API credentials.
These can be found in the Team Admin page under Service Accounts.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="97"/>
        <source>How to get your API credentials</source>
        <translation>How to get your API credentials</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="101"/>
        <source>Opens CalTopo API documentation in your browser</source>
        <translation>Opens CalTopo API documentation in your browser</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="107"/>
        <source>Change credentials</source>
        <translation>Change credentials</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="114"/>
        <source>Team ID:</source>
        <translation>Team ID:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="116"/>
        <source>6-digit alphanumeric Team ID</source>
        <translation>6-digit alphanumeric Team ID</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="123"/>
        <source>Credential ID:</source>
        <translation>Credential ID:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="125"/>
        <source>Credential ID</source>
        <translation>Credential ID</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="132"/>
        <source>Credential Secret:</source>
        <translation>Credential Secret:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="134"/>
        <source>Credential Secret (will be encrypted)</source>
        <translation>Credential Secret (will be encrypted)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="146"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="309"/>
        <source>Test Credentials</source>
        <translation>Test Credentials</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="148"/>
        <source>Test the credentials by calling the CalTopo API</source>
        <translation>Test the credentials by calling the CalTopo API</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="150"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="154"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="226"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="230"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="234"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="254"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="258"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="262"/>
        <source>Invalid Input</source>
        <translation>Invalid Input</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="226"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="254"/>
        <source>Please enter a Team ID.</source>
        <translation>Please enter a Team ID.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="230"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="258"/>
        <source>Please enter a Credential ID.</source>
        <translation>Please enter a Credential ID.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="234"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="262"/>
        <source>Please enter a Credential Secret.</source>
        <translation>Please enter a Credential Secret.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="267"/>
        <source>Testing...</source>
        <translation>Testing...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="282"/>
        <source>Credentials Valid</source>
        <translation>Credentials Valid</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="283"/>
        <source>The credentials are valid and successfully authenticated with CalTopo API.</source>
        <translation>The credentials are valid and successfully authenticated with CalTopo API.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="288"/>
        <source>Credentials Invalid</source>
        <translation>Credentials Invalid</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="290"/>
        <source>The credentials failed to authenticate with CalTopo API.

Please check:
• Team ID is correct
• Credential ID is correct
• Credential Secret is correct (copy it exactly as shown)
• Your service account has the required permissions</source>
        <translation>The credentials failed to authenticate with CalTopo API.

Please check:
• Team ID is correct
• Credential ID is correct
• Credential Secret is correct (copy it exactly as shown)
• Your service account has the required permissions</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="301"/>
        <source>Test Error</source>
        <translation>Test Error</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="302"/>
        <source>An error occurred while testing credentials:

{error}</source>
        <translation>An error occurred while testing credentials:

{error}</translation>
    </message>
</context>
<context>
    <name>CalTopoExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="441"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1507"/>
        <source>Offline Mode Enabled</source>
        <translation>Offline Mode Enabled</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="443"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1509"/>
        <source>Offline Only is turned on in Preferences:

• Map tiles will not be retrieved.
• CalTopo integration is disabled.

Turn off Offline Only to export to CalTopo.</source>
        <translation>Offline Only is turned on in Preferences:

• Map tiles will not be retrieved.
• CalTopo integration is disabled.

Turn off Offline Only to export to CalTopo.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="454"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1520"/>
        <source>Nothing Selected</source>
        <translation>Nothing Selected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="456"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1522"/>
        <source>Select at least one data type (flagged AOIs, drone/image locations, or coverage area) to export.</source>
        <translation>Select at least one data type (flagged AOIs, drone/image locations, or coverage area) to export.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="464"/>
        <source>Preparing Export Data</source>
        <translation>Preparing Export Data</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="467"/>
        <source>Preparing data for export...</source>
        <translation>Preparing data for export...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="468"/>
        <source>Processing images and AOIs...</source>
        <translation>Processing images and AOIs...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="512"/>
        <source>Preparation Error</source>
        <translation>Preparation Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="514"/>
        <source>An error occurred while preparing export data:

{error}</source>
        <translation>An error occurred while preparing export data:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="523"/>
        <source>flagged AOIs</source>
        <translation>flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="525"/>
        <source>image locations</source>
        <translation>image locations</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="527"/>
        <source>coverage area</source>
        <translation>coverage area</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="531"/>
        <source>No flagged AOIs, geotagged image locations, or coverage areas are available.
Flag some AOIs with the &apos;F&apos; key or ensure your images have GPS metadata.</source>
        <translation>No flagged AOIs, geotagged image locations, or coverage areas are available.
Flag some AOIs with the &apos;F&apos; key or ensure your images have GPS metadata.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="537"/>
        <source>Found {count} flagged AOI(s), but could not extract GPS coordinates.

This usually means:
• The images don&apos;t have GPS data in their EXIF metadata
• The image files have been moved or renamed

Please ensure your images have GPS coordinates embedded.</source>
        <translation>Found {count} flagged AOI(s), but could not extract GPS coordinates.

This usually means:
• The images don&apos;t have GPS data in their EXIF metadata
• The image files have been moved or renamed

Please ensure your images have GPS coordinates embedded.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="545"/>
        <source>No geotagged drone/image locations were found.
Ensure your images contain GPS metadata and try again.</source>
        <translation>No geotagged drone/image locations were found.
Ensure your images contain GPS metadata and try again.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="550"/>
        <source>No coverage area polygons could be calculated.

This usually means:
• The images don&apos;t have GPS data in their EXIF metadata
• The images are not nadir (gimbal pitch must be between -85° and -95°)
• GSD (ground sample distance) could not be calculated

Please ensure your images have GPS coordinates and are nadir shots.</source>
        <translation>No coverage area polygons could be calculated.

This usually means:
• The images don&apos;t have GPS data in their EXIF metadata
• The images are not nadir (gimbal pitch must be between -85° and -95°)
• GSD (ground sample distance) could not be calculated

Please ensure your images have GPS coordinates and are nadir shots.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="559"/>
        <source>No {types} are available to export.</source>
        <translation>No {types} are available to export.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="564"/>
        <source>Nothing to Export</source>
        <translation>Nothing to Export</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="585"/>
        <source>No Map Selected</source>
        <translation>No Map Selected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="587"/>
        <source>Please navigate to a CalTopo map before clicking &apos;I&apos;m Logged In&apos;.

The map URL should look like:
https://caltopo.com/map.html#...&amp;id=ABC123</source>
        <translation>Please navigate to a CalTopo map before clicking &apos;I&apos;m Logged In&apos;.

The map URL should look like:
https://caltopo.com/map.html#...&amp;id=ABC123</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="649"/>
        <source>{count} marker(s)</source>
        <translation>{count} marker(s)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="653"/>
        <source>{count} polygon(s)</source>
        <translation>{count} polygon(s)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="656"/>
        <source> and </source>
        <translation> and </translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="661"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1716"/>
        <source>Export Successful</source>
        <translation>Export Successful</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="663"/>
        <source>Successfully exported all {items} to CalTopo map {map_id}.

The items should now be visible on your map.</source>
        <translation>Successfully exported all {items} to CalTopo map {map_id}.

The items should now be visible on your map.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="670"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1725"/>
        <source>Partial Success</source>
        <translation>Partial Success</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="672"/>
        <source>Exported {success} of {total} item(s) ({items}) to CalTopo map {map_id}.

{failed} item(s) failed. Check console for details.</source>
        <translation>Exported {success} of {total} item(s) ({items}) to CalTopo map {map_id}.

{failed} item(s) failed. Check console for details.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="686"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1738"/>
        <source>Export Failed</source>
        <translation>Export Failed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="688"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1740"/>
        <source>Failed to export items to CalTopo.

Please check the console output for error details.</source>
        <translation>Failed to export items to CalTopo.

Please check the console output for error details.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="698"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1646"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1751"/>
        <source>Export Error</source>
        <translation>Export Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="700"/>
        <source>An error occurred during CalTopo export:

{error}</source>
        <translation>An error occurred during CalTopo export:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1001"/>
        <source>Coverage area: {sqkm:.3f} km² ({acres:.2f} acres)
Area in square meters: {sqm:.0f} m²
Number of corners: {count}</source>
        <translation>Coverage area: {sqkm:.3f} km² ({acres:.2f} acres)
Area in square meters: {sqm:.0f} m²
Number of corners: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1045"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1329"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1677"/>
        <source>Exporting to CalTopo</source>
        <translation>Exporting to CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1048"/>
        <source>Exporting markers to CalTopo...</source>
        <translation>Exporting markers to CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1050"/>
        <source>Preparing to export {count} marker(s)...</source>
        <translation>Preparing to export {count} marker(s)...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1295"/>
        <source>Export complete: {success} of {total} marker(s) exported</source>
        <translation>Export complete: {success} of {total} marker(s) exported</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1332"/>
        <source>Exporting polygons to CalTopo...</source>
        <translation>Exporting polygons to CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1334"/>
        <source>Preparing to export {count} polygon(s)...</source>
        <translation>Preparing to export {count} polygon(s)...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1461"/>
        <source>Export complete: {success} of {total} polygon(s) exported</source>
        <translation>Export complete: {success} of {total} polygon(s) exported</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1479"/>
        <source>Logged Out</source>
        <translation>Logged Out</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1480"/>
        <source>Successfully logged out from CalTopo.</source>
        <translation>Successfully logged out from CalTopo.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1545"/>
        <source>Loading CalTopo Maps</source>
        <translation>Loading CalTopo Maps</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1548"/>
        <source>Connecting to CalTopo...</source>
        <translation>Connecting to CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1549"/>
        <source>Fetching account data and maps...</source>
        <translation>Fetching account data and maps...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1587"/>
        <source>Connection Error</source>
        <translation>Connection Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1589"/>
        <source>An error occurred while connecting to CalTopo API:

{error}</source>
        <translation>An error occurred while connecting to CalTopo API:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1597"/>
        <source>Authentication Failed</source>
        <translation>Authentication Failed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1599"/>
        <source>Failed to authenticate with CalTopo API.

Please check your credentials and try again.</source>
        <translation>Failed to authenticate with CalTopo API.

Please check your credentials and try again.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1648"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1753"/>
        <source>An error occurred during CalTopo API export:

{error}</source>
        <translation>An error occurred during CalTopo API export:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1680"/>
        <source>Exporting to CalTopo...</source>
        <translation>Exporting to CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1681"/>
        <source>Preparing data and exporting...</source>
        <translation>Preparing data and exporting...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1718"/>
        <source>Successfully exported all {total} item(s) to CalTopo map.

The items should now be visible on your map.</source>
        <translation>Successfully exported all {total} item(s) to CalTopo map.

The items should now be visible on your map.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1727"/>
        <source>Exported {success} of {total} item(s) to CalTopo map.

{failed} item(s) failed. Check console for details.</source>
        <translation>Exported {success} of {total} item(s) to CalTopo map.

{failed} item(s) failed. Check console for details.</translation>
    </message>
</context>
<context>
    <name>CalTopoMapDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="35"/>
        <source>Select CalTopo Map</source>
        <translation>Select CalTopo Map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="51"/>
        <source>Select a CalTopo map to export flagged AOIs:</source>
        <translation>Select a CalTopo map to export flagged AOIs:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="60"/>
        <source>Search:</source>
        <translation>Search:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="62"/>
        <source>Filter maps by name...</source>
        <translation>Filter maps by name...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="83"/>
        <source>Select Map</source>
        <translation>Select Map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="87"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>CalTopoMethodDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="34"/>
        <source>CalTopo Export Method</source>
        <translation>CalTopo Export Method</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="52"/>
        <source>Select CalTopo Export Method</source>
        <translation>Select CalTopo Export Method</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="61"/>
        <source>Choose how you want to authenticate with CalTopo:</source>
        <translation>Choose how you want to authenticate with CalTopo:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="68"/>
        <source>Export Method</source>
        <translation>Export Method</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="72"/>
        <source>API (Recommended for CalTopo Team Account)</source>
        <translation>API (Recommended for CalTopo Team Account)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="75"/>
        <source>Use CalTopo Team API with service account credentials.
Best for Teams accounts with service accounts configured.</source>
        <translation>Use CalTopo Team API with service account credentials.
Best for Teams accounts with service accounts configured.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="79"/>
        <source>Browser Login</source>
        <translation>Browser Login</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="81"/>
        <source>Use browser-based authentication.
Log in through an embedded browser window.</source>
        <translation>Use browser-based authentication.
Log in through an embedded browser window.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="96"/>
        <source>API method requires Team ID and Credential Secret from your
CalTopo Team Admin page. Browser method uses your regular login.</source>
        <translation>API method requires Team ID and Credential Secret from your
CalTopo Team Admin page. Browser method uses your regular login.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="109"/>
        <source>Continue</source>
        <translation>Continue</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="113"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>ClickableColorSwatch</name>
    <message>
        <location filename="../app/algorithms/images/ColorRange/views/ColorRowWidget.py" line="55"/>
        <location filename="../app/algorithms/images/ColorRange/views/ColorRowWizardWidget.py" line="64"/>
        <location filename="../app/algorithms/Shared/views/HSVColorRowWidget.py" line="83"/>
        <source>RGB: ({r}, {g}, {b})
Click to change color</source>
        <translation>RGB: ({r}, {g}, {b})
Click to change color</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRowWizardWidget.py" line="71"/>
        <location filename="../app/algorithms/Shared/views/HSVColorRowWizardWidget.py" line="71"/>
        <source>HSV: ({h}, {s}, {v})
Click to change color</source>
        <translation>HSV: ({h}, {s}, {v})
Click to change color</translation>
    </message>
    <message>
        <location filename="../app/algorithms/Shared/views/HSVColorRowWidget.py" line="78"/>
        <source>HSV: ({h}°, {s}%, {v}%)
RGB: ({r}, {g}, {b})
Click to change color</source>
        <translation>HSV: ({h}°, {s}%, {v}%)
RGB: ({r}, {g}, {b})
Click to change color</translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionControlWidget</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="67"/>
        <source>Color Anomaly</source>
        <translation>Color Anomaly</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="68"/>
        <source>Motion Detection</source>
        <translation>Motion Detection</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="69"/>
        <source>Fusion</source>
        <translation>Fusion</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="77"/>
        <source>Input &amp;&amp; Processing</source>
        <translation>Input &amp;&amp; Processing</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="78"/>
        <source>Frame</source>
        <translation>Frame</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="79"/>
        <source>Rendering &amp;&amp; Cleanup</source>
        <translation>Rendering &amp;&amp; Cleanup</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="398"/>
        <source>4 bits</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="442"/>
        <source>Find Contours</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="443"/>
        <source>Connected Components</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="540"/>
        <source>±5 (~10°)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="697"/>
        <source>{value} bits</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="710"/>
        <source>±{value} (~{degrees}°)</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionController</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionController.py" line="142"/>
        <source>FPS: {fps} | Processing: {time}ms</source>
        <translation>FPS: {fps} | Processing: {time}ms</translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="12"/>
        <source>Color Anomaly Detection</source>
        <translation>Color Anomaly Detection</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="16"/>
        <source>Enable Color Anomaly Detection</source>
        <translation>Enable Color Anomaly Detection</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="27"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>How aggressively should ADIAT be searching for anomalies?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="38"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Note: A higher setting will find more potential anomalies but may also increase false positives.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="56"/>
        <source>Motion Detection</source>
        <translation>Motion Detection</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="65"/>
        <source>Do you want to enable motion detection?</source>
        <translation>Do you want to enable motion detection?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="73"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="79"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionWizardController</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="48"/>
        <source>Very 
Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="49"/>
        <source>Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="50"/>
        <source>Moderate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="51"/>
        <source>Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="52"/>
        <source>Very 
Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ColorDetectionControlWidget</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="76"/>
        <source>Color Selection</source>
        <translation>Color Selection</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="77"/>
        <source>Detection</source>
        <translation>Detection</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="78"/>
        <source>Input &amp;&amp; Processing</source>
        <translation>Input &amp;&amp; Processing</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="79"/>
        <source>Frame</source>
        <translation>Frame</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="80"/>
        <source>Rendering &amp;&amp; Cleanup</source>
        <translation>Rendering &amp;&amp; Cleanup</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="108"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="111"/>
        <source>Add a new color range to detect.
Choose from HSV Color Picker, Image, List, or Recent Colors.
You can add multiple color ranges to detect different colors simultaneously.</source>
        <translation>Add a new color range to detect.
Choose from HSV Color Picker, Image, List, or Recent Colors.
You can add multiple color ranges to detect different colors simultaneously.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="131"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="134"/>
        <source>View HSV color ranges for all configured colors.
Opens a viewer dialog for each color range showing
the hue, saturation, and value ranges that will be detected.
Useful for understanding and fine-tuning multi-color detection.</source>
        <translation>View HSV color ranges for all configured colors.
Opens a viewer dialog for each color range showing
the hue, saturation, and value ranges that will be detected.
Useful for understanding and fine-tuning multi-color detection.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="157"/>
        <source>No colors configured. Add at least one color to start detection.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="178"/>
        <source>Min Object Area (px):</source>
        <translation>Min Object Area (px):</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="184"/>
        <source>Minimum detection area in pixels (10-50000).
Filters out very small detections (noise, small objects, fragments).
Lower values = detect smaller objects, more detections, more noise.
Higher values = only large objects, fewer detections, less noise.
Recommended: 100 for general use, 50 for small objects, 200-500 for large objects.</source>
        <translation>Minimum detection area in pixels (10-50000).
Filters out very small detections (noise, small objects, fragments).
Lower values = detect smaller objects, more detections, more noise.
Higher values = only large objects, fewer detections, less noise.
Recommended: 100 for general use, 50 for small objects, 200-500 for large objects.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="193"/>
        <source>Max Object Area (px):</source>
        <translation>Max Object Area (px):</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="199"/>
        <source>Maximum detection area in pixels (100-500000).
Filters out very large detections (shadows, lighting changes, entire scene).
Lower values = only small/medium objects.
Higher values = allow large objects, may include unwanted large regions.
Recommended: 100000 for general use, 50000 for small objects, 200000+ for large objects.</source>
        <translation>Maximum detection area in pixels (100-500000).
Filters out very large detections (shadows, lighting changes, entire scene).
Lower values = only small/medium objects.
Higher values = allow large objects, may include unwanted large regions.
Recommended: 100000 for general use, 50000 for small objects, 200000+ for large objects.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="208"/>
        <source>Confidence Threshold:</source>
        <translation>Confidence Threshold:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="215"/>
        <source>Minimum confidence score to accept a detection (0-100%).
Confidence is calculated from:
• Size score: area relative to max area
• Shape score: solidity (how compact/regular the shape is)
• Final: average of both scores

Lower values (0-30%) = accept more detections, including weak/fragmented ones.
Higher values (70-100%) = only high-quality detections, well-formed shapes.
Recommended: 50% for balanced filtering, 30% for more detections, 70% for strict quality.</source>
        <translation>Minimum confidence score to accept a detection (0-100%).
Confidence is calculated from:
• Size score: area relative to max area
• Shape score: solidity (how compact/regular the shape is)
• Final: average of both scores

Lower values (0-30%) = accept more detections, including weak/fragmented ones.
Higher values (70-100%) = only high-quality detections, well-formed shapes.
Recommended: 50% for balanced filtering, 30% for more detections, 70% for strict quality.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="226"/>
        <source>50%</source>
        <translation>50%</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="342"/>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="395"/>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="430"/>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="665"/>
        <source>Color_{index}</source>
        <translation>Color_{index}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="513"/>
        <source>Color Ranges: {count} colors</source>
        <translation>Color Ranges: {count} colors</translation>
    </message>
</context>
<context>
    <name>ColorDetectionController</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionController.py" line="134"/>
        <source>FPS: {fps} | Processing: {time}ms</source>
        <translation>FPS: {fps} | Processing: {time}ms</translation>
    </message>
</context>
<context>
    <name>ColorDetectionWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ColorDetectionWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
</context>
<context>
    <name>ColorDetectionWizardController</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="52"/>
        <source>No Colors Selected</source>
        <translation>No Colors Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="62"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="244"/>
        <source>Color Ranges: {count} colors</source>
        <translation>Color Ranges: {count} colors</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="329"/>
        <source>Please add at least one color to detect.</source>
        <translation>Please add at least one color to detect.</translation>
    </message>
</context>
<context>
    <name>ColorHistogramController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/ColorHistogramController.py" line="41"/>
        <source>Hue Histogram Unavailable</source>
        <translation>Hue Histogram Unavailable</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/ColorHistogramController.py" line="43"/>
        <source>No color image data is available for the current image.</source>
        <translation>No color image data is available for the current image.</translation>
    </message>
</context>
<context>
    <name>ColorHistogramDialog</name>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="14"/>
        <source>Hue Histogram</source>
        <translation>Hue Histogram</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="23"/>
        <source>Hue distribution of all pixels vs. AOI pixels. Hovering the chart highlights matching pixels in the image.</source>
        <translation>Hue distribution of all pixels vs. AOI pixels. Hovering the chart highlights matching pixels in the image.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="32"/>
        <source>AOIs Only</source>
        <translation>AOIs Only</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="52"/>
        <source>Reset Zoom</source>
        <translation>Reset Zoom</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="61"/>
        <source>Drag on the histogram or use the mouse wheel to zoom. Double-click or use Reset Zoom to return to the full range.</source>
        <translation>Drag on the histogram or use the mouse wheel to zoom. Double-click or use Reset Zoom to return to the full range.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="74"/>
        <source>Visible Hue Range</source>
        <translation>Visible Hue Range</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="127"/>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="62"/>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="146"/>
        <source>Hover over the histogram to inspect a hue band.</source>
        <translation>Hover over the histogram to inspect a hue band.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="85"/>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="59"/>
        <source>Minimum: --</source>
        <translation>Minimum: --</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="92"/>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="60"/>
        <source>Maximum: --</source>
        <translation>Maximum: --</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ColorHistogramDialog.ui" line="115"/>
        <source>Reset Range</source>
        <translation>Reset Range</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="30"/>
        <source>No hue histogram data available</source>
        <translation>No hue histogram data available</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="152"/>
        <source>Hover hue: {value}°</source>
        <translation>Hover hue: {value}°</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="160"/>
        <source>Minimum: {minimum}°</source>
        <translation>Minimum: {minimum}°</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ColorHistogramDialog.py" line="165"/>
        <source>Maximum: {maximum}°</source>
        <translation>Maximum: {maximum}°</translation>
    </message>
</context>
<context>
    <name>ColorListDialog</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="30"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="30"/>
        <source>Select Color from List</source>
        <translation>Select Color from List</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="42"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="42"/>
        <source>Search:</source>
        <translation>Search:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="44"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="44"/>
        <source>Filter by name or uses…</source>
        <translation>Filter by name or uses…</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="61"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="61"/>
        <source>Name</source>
        <translation>Name</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="61"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="61"/>
        <source>RGB</source>
        <translation>RGB</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="56"/>
        <source>HSV</source>
        <translation>HSV</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="61"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="61"/>
        <source>Uses</source>
        <translation>Uses</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="73"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="73"/>
        <source>Use Color</source>
        <translation>Use Color</translation>
    </message>
</context>
<context>
    <name>ColorPickerDialog</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerDialog.py" line="35"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerDialog.py" line="35"/>
        <source>Select Color from Image</source>
        <translation>Select Color from Image</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerDialog.py" line="55"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerDialog.py" line="55"/>
        <source>Use Color</source>
        <translation>Use Color</translation>
    </message>
</context>
<context>
    <name>ColorPickerImageViewer</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="97"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="97"/>
        <source>Load Image</source>
        <translation>Load Image</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="102"/>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="290"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="102"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="290"/>
        <source>Color Selector</source>
        <translation>Color Selector</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="159"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="159"/>
        <source>Select Image</source>
        <translation>Select Image</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="173"/>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="230"/>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="588"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="173"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="230"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="588"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="174"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="174"/>
        <source>Could not load image: {path}</source>
        <translation>Could not load image: {path}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="231"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="231"/>
        <source>Error loading image: {error}</source>
        <translation>Error loading image: {error}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="286"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="286"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="358"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="358"/>
        <source>RGB: ({r}, {g}, {b}) {hex} | HSV: ({h}°, {s}%, {v}%)</source>
        <translation>RGB: ({r}, {g}, {b}) {hex} | HSV: ({h}°, {s}%, {v}%)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="445"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="445"/>
        <source>RGB: ({r}, {g}, {b}) {hex} | HSV: {h}°, {s}%, {v}% (hover)</source>
        <translation>RGB: ({r}, {g}, {b}) {hex} | HSV: {h}°, {s}%, {v}% (hover)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="589"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="589"/>
        <source>Error setting image: {error}</source>
        <translation>Error setting image: {error}</translation>
    </message>
</context>
<context>
    <name>ColorRange</name>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="42"/>
        <source>Add a new color range to detect. Each color can have its own RGB range tolerances.</source>
        <translation>Add a new color range to detect. Each color can have its own RGB range tolerances.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="45"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="52"/>
        <source>color.png</source>
        <translation>color.png</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="83"/>
        <source>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the color ranges before processing.</source>
        <translation>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the color ranges before processing.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="88"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="95"/>
        <source>eye.png</source>
        <translation>eye.png</translation>
    </message>
</context>
<context>
    <name>ColorRangeController</name>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeController.py" line="43"/>
        <source>No Colors Selected</source>
        <translation>No Colors Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeController.py" line="324"/>
        <source>Please add at least one color to detect.</source>
        <translation>Please add at least one color to detect.</translation>
    </message>
</context>
<context>
    <name>ColorRangeDialog</name>
    <message>
        <location filename="../app/algorithms/Shared/views/ColorRangeDialog.py" line="39"/>
        <source>HSV Color Range Selection</source>
        <translation>HSV Color Range Selection</translation>
    </message>
    <message>
        <location filename="../app/algorithms/Shared/views/ColorRangeDialog.py" line="381"/>
        <source>Select Color</source>
        <translation>Select Color</translation>
    </message>
</context>
<context>
    <name>ColorRangeViewer</name>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="14"/>
        <source>Color Range Viewer</source>
        <translation>Color Range Viewer</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="37"/>
        <source>Selected images for viewing.
Shows images that you&apos;ve chosen to view in the range viewer.
Click on images below to add or remove them from this section.</source>
        <translation>Selected images for viewing.
Shows images that you&apos;ve chosen to view in the range viewer.
Click on images below to add or remove them from this section.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="42"/>
        <source>Selected</source>
        <translation>Selected</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="76"/>
        <source>Available images for viewing.
Shows all images from the input folder that are available to select.
Click on images to move them to the Selected section above.</source>
        <translation>Available images for viewing.
Shows all images from the input folder that are available to select.
Click on images to move them to the Selected section above.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="81"/>
        <source>Unselected</source>
        <translation>Unselected</translation>
    </message>
</context>
<context>
    <name>ColorRangeWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ColorRangeWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
</context>
<context>
    <name>ColorRangeWizardController</name>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeWizardController.py" line="69"/>
        <source>No Colors Selected</source>
        <translation>No Colors Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeWizardController.py" line="79"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeWizardController.py" line="258"/>
        <source>Please add at least one color to detect.</source>
        <translation>Please add at least one color to detect.</translation>
    </message>
</context>
<context>
    <name>CoordinateController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="124"/>
        <source>GPS Coordinates: {coords}</source>
        <translation>GPS Coordinates: {coords}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="150"/>
        <source>📋 Copy coordinates</source>
        <translation>📋 Copy coordinates</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="154"/>
        <source>🗺️ Open in Google Maps</source>
        <translation>🗺️ Open in Google Maps</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="158"/>
        <source>🌍 View in Google Earth</source>
        <translation>🌍 View in Google Earth</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="162"/>
        <source>📱 Send via WhatsApp</source>
        <translation>📱 Send via WhatsApp</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="166"/>
        <source>📨 Send via Telegram</source>
        <translation>📨 Send via Telegram</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="238"/>
        <source>Coordinates copied</source>
        <translation>Coordinates copied</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="248"/>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="262"/>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="325"/>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="345"/>
        <source>Coordinates unavailable</source>
        <translation>Coordinates unavailable</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="332"/>
        <source>Coordinate: {lat}, {lon} — {maps}</source>
        <translation>Coordinate: {lat}, {lon} — {maps}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="352"/>
        <source>Coordinates: {lat}, {lon}</source>
        <translation>Coordinates: {lat}, {lon}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="392"/>
        <source>No bearing info available</source>
        <translation>No bearing info available</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="433"/>
        <source>North-Oriented View (Rotated {angle:.1f}°)</source>
        <translation>North-Oriented View (Rotated {angle:.1f}°)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="465"/>
        <source>Original bearing: {bearing:.1f}° | Rotation applied: {rotation:.1f}°</source>
        <translation>Original bearing: {bearing:.1f}° | Rotation applied: {rotation:.1f}°</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="475"/>
        <source>↑ NORTH</source>
        <translation>↑ NORTH</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="484"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="495"/>
        <source>Error: {error}</source>
        <translation>Error: {error}</translation>
    </message>
</context>
<context>
    <name>CoordinatorWindow</name>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="30"/>
        <source>Search Coordinator</source>
        <translation>Search Coordinator</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="49"/>
        <source>Create New Search</source>
        <translation>Create New Search</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="54"/>
        <source>Open Existing Search</source>
        <translation>Open Existing Search</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="59"/>
        <source>Save Search</source>
        <translation>Save Search</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="65"/>
        <source>Add Batches to Search</source>
        <translation>Add Batches to Search</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="69"/>
        <source>Add more batch XML files to the current search project</source>
        <translation>Add more batch XML files to the current search project</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="87"/>
        <source>Dashboard</source>
        <translation>Dashboard</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="91"/>
        <source>Batch Status</source>
        <translation>Batch Status</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="95"/>
        <source>AOI Analysis</source>
        <translation>AOI Analysis</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="103"/>
        <source>Load Review XML</source>
        <translation>Load Review XML</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="109"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="610"/>
        <source>Export Consolidated Results</source>
        <translation>Export Consolidated Results</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="121"/>
        <source>Project Information</source>
        <translation>Project Information</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="126"/>
        <source>No project loaded</source>
        <translation>No project loaded</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="128"/>
        <source>Project:</source>
        <translation>Project:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="133"/>
        <source>Created by:</source>
        <translation>Created by:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="138"/>
        <source>Date:</source>
        <translation>Date:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="157"/>
        <source>Total Batches</source>
        <translation>Total Batches</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="158"/>
        <source>Total Images</source>
        <translation>Total Images</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="159"/>
        <source>Total Reviews</source>
        <translation>Total Reviews</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="160"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="305"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="337"/>
        <source>Reviewers</source>
        <translation>Reviewers</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="170"/>
        <source>Review Progress</source>
        <translation>Review Progress</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="175"/>
        <source>Overall Completion:</source>
        <translation>Overall Completion:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="180"/>
        <source>0%</source>
        <translation>0%</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="194"/>
        <source>Not Reviewed</source>
        <translation>Not Reviewed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="203"/>
        <source>In Progress</source>
        <translation>In Progress</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="212"/>
        <source>Complete</source>
        <translation>Complete</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="220"/>
        <source>AOI Summary</source>
        <translation>AOI Summary</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="228"/>
        <source>Total AOIs</source>
        <translation>Total AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="236"/>
        <source>Flagged AOIs</source>
        <translation>Flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="243"/>
        <source>Active Reviewers</source>
        <translation>Active Reviewers</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="245"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="666"/>
        <source>No reviewers yet</source>
        <translation>No reviewers yet</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="292"/>
        <source>Batch review status and assignments. Load reviewer XMLs to update progress.</source>
        <translation>Batch review status and assignments. Load reviewer XMLs to update progress.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="301"/>
        <source>Batch ID</source>
        <translation>Batch ID</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="302"/>
        <source>Algorithm</source>
        <translation>Algorithm</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="303"/>
        <source>Images</source>
        <translation>Images</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="304"/>
        <source>Reviews</source>
        <translation>Reviews</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="306"/>
        <source>Status</source>
        <translation>Status</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="325"/>
        <source>Consolidated AOI data from all reviews. Shows flag counts and reviewer comments.</source>
        <translation>Consolidated AOI data from all reviews. Shows flag counts and reviewer comments.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="334"/>
        <source>Image</source>
        <translation>Image</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="335"/>
        <source>Location</source>
        <translation>Location</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="336"/>
        <source>Flag Count</source>
        <translation>Flag Count</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="338"/>
        <source>Comments</source>
        <translation>Comments</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="355"/>
        <source>New Search Project</source>
        <translation>New Search Project</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="356"/>
        <source>Enter project name:</source>
        <translation>Enter project name:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="365"/>
        <source>Coordinator Information</source>
        <translation>Coordinator Information</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="366"/>
        <source>Enter your name:</source>
        <translation>Enter your name:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="375"/>
        <source>Select Batch Files</source>
        <translation>Select Batch Files</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="376"/>
        <source>Select Initial Batch XML Files</source>
        <translation>Select Initial Batch XML Files</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="379"/>
        <source>You can select multiple ADIAT_Data.xml files from different folders.

Tips:
• Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
• You can add more batches later using &apos;Add Batches to Search&apos; button
• Each batch should be a processed ADIAT_Data.xml file</source>
        <translation>You can select multiple ADIAT_Data.xml files from different folders.

Tips:
• Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
• You can add more batches later using &apos;Add Batches to Search&apos; button
• Each batch should be a processed ADIAT_Data.xml file</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="393"/>
        <source>Select Batch ADIAT_Data.xml Files (Hold Ctrl to select multiple)</source>
        <translation>Select Batch ADIAT_Data.xml Files (Hold Ctrl to select multiple)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="395"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="410"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="510"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="557"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="612"/>
        <source>XML Files (*.xml)</source>
        <translation>XML Files (*.xml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="408"/>
        <source>Save Search Project</source>
        <translation>Save Search Project</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="420"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="453"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="469"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="529"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="593"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="619"/>
        <source>Success</source>
        <translation>Success</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="421"/>
        <source>Search project &apos;{project}&apos; created successfully!</source>
        <translation>Search project &apos;{project}&apos; created successfully!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="428"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="432"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="459"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="473"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="599"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="623"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="429"/>
        <source>Failed to save project file.</source>
        <translation>Failed to save project file.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="432"/>
        <source>Failed to create project.</source>
        <translation>Failed to create project.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="438"/>
        <source>Open Search Project</source>
        <translation>Open Search Project</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="440"/>
        <source>Search Project Files (ADIAT_Search_*.xml);;All XML Files (*.xml)</source>
        <translation>Search Project Files (ADIAT_Search_*.xml);;All XML Files (*.xml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="454"/>
        <source>Project loaded successfully!</source>
        <translation>Project loaded successfully!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="460"/>
        <source>Failed to load project file.</source>
        <translation>Failed to load project file.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="470"/>
        <source>Project saved successfully!</source>
        <translation>Project saved successfully!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="473"/>
        <source>Failed to save project.</source>
        <translation>Failed to save project.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="480"/>
        <source>No Project</source>
        <translation>No Project</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="481"/>
        <source>Please create or open a project first.</source>
        <translation>Please create or open a project first.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="488"/>
        <source>Add Batches</source>
        <translation>Add Batches</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="489"/>
        <source>Add More Batch XML Files</source>
        <translation>Add More Batch XML Files</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="492"/>
        <source>Select additional ADIAT_Data.xml batch files to add to this search.

Tips:
• Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
• Files can be in different folders
• Each batch should be a processed ADIAT_Data.xml file
• New batches will be numbered sequentially</source>
        <translation>Select additional ADIAT_Data.xml batch files to add to this search.

Tips:
• Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
• Files can be in different folders
• Each batch should be a processed ADIAT_Data.xml file
• New batches will be numbered sequentially</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="508"/>
        <source>Select Batch ADIAT_Data.xml Files to Add (Hold Ctrl to select multiple)</source>
        <translation>Select Batch ADIAT_Data.xml Files to Add (Hold Ctrl to select multiple)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="531"/>
        <source>Successfully added {count} batch(es) to the project!
Total batches: {total}</source>
        <translation>Successfully added {count} batch(es) to the project!
Total batches: {total}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="541"/>
        <source>No Batches Added</source>
        <translation>No Batches Added</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="543"/>
        <source>No batches were added. Check that the XML files are valid ADIAT_Data.xml files.</source>
        <translation>No batches were added. Check that the XML files are valid ADIAT_Data.xml files.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="555"/>
        <source>Select Reviewer&apos;s ADIAT_Data.xml File</source>
        <translation>Select Reviewer&apos;s ADIAT_Data.xml File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="568"/>
        <source>No Batches</source>
        <translation>No Batches</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="569"/>
        <source>No batches found in project.</source>
        <translation>No batches found in project.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="577"/>
        <source>Select Batch</source>
        <translation>Select Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="578"/>
        <source>Which batch does this review belong to?</source>
        <translation>Which batch does this review belong to?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="594"/>
        <source>Review data loaded and merged successfully!</source>
        <translation>Review data loaded and merged successfully!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="600"/>
        <source>Failed to load review data.</source>
        <translation>Failed to load review data.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="620"/>
        <source>Consolidated results exported to:
{path}</source>
        <translation>Consolidated results exported to:
{path}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="623"/>
        <source>Failed to export results.</source>
        <translation>Failed to export results.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="649"/>
        <source>{value}%</source>
        <translation>{value}%</translation>
    </message>
</context>
<context>
    <name>CoverageExtentExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="129"/>
        <source>Generate Coverage Extent KML</source>
        <translation>Generate Coverage Extent KML</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="131"/>
        <source>Generate a KML file showing the geographic coverage extent of all images?

This will create polygon(s) representing the area covered by all images. Overlapping image areas will be merged into a single polygon.</source>
        <translation>Generate a KML file showing the geographic coverage extent of all images?

This will create polygon(s) representing the area covered by all images. Overlapping image areas will be merged into a single polygon.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="145"/>
        <source>Save Coverage Extent KML</source>
        <translation>Save Coverage Extent KML</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="147"/>
        <source>KML files (*.kml)</source>
        <translation>KML files (*.kml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="156"/>
        <source>Generating Coverage Extent KML</source>
        <translation>Generating Coverage Extent KML</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="159"/>
        <source>Calculating coverage extent...</source>
        <translation>Calculating coverage extent...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="202"/>
        <source>Error generating coverage extent KML</source>
        <translation>Error generating coverage extent KML</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="208"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="256"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="209"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="257"/>
        <source>Failed to generate coverage extent KML:
{error}</source>
        <translation>Failed to generate coverage extent KML:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="239"/>
        <source>Coverage extent generation cancelled</source>
        <translation>Coverage extent generation cancelled</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="250"/>
        <source>Error generating coverage extent</source>
        <translation>Error generating coverage extent</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="263"/>
        <source>No valid images found for coverage extent calculation</source>
        <translation>No valid images found for coverage extent calculation</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="269"/>
        <source>Coverage Extent</source>
        <translation>Coverage Extent</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="271"/>
        <source>Could not calculate coverage extent.

Images processed: {processed}
Images skipped: {skipped}

Images may be skipped for the following reasons:
  • Missing GPS data in EXIF
  • No valid GSD (missing altitude/focal length)
  • Gimbal not nadir (must be -85° to -95°)</source>
        <translation>Could not calculate coverage extent.

Images processed: {processed}
Images skipped: {skipped}

Images may be skipped for the following reasons:
  • Missing GPS data in EXIF
  • No valid GSD (missing altitude/focal length)
  • Gimbal not nadir (must be -85° to -95°)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="293"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="294"/>
        <source>{value:.2f} acres</source>
        <translation>{value:.2f} acres</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="298"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="299"/>
        <source>{value:.3f} km²</source>
        <translation>{value:.3f} km²</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="302"/>
        <source>Coverage extent KML saved: {area}</source>
        <translation>Coverage extent KML saved: {area}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="311"/>
        <source>

Images may be skipped for:
  • Missing GPS data
  • No valid GSD
  • Gimbal not nadir</source>
        <translation>

Images may be skipped for:
  • Missing GPS data
  • No valid GSD
  • Gimbal not nadir</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="319"/>
        <source>Coverage Extent KML Generated</source>
        <translation>Coverage Extent KML Generated</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="321"/>
        <source>Coverage extent KML file created successfully!

File: {file}
Images processed: {processed}
Images skipped: {skipped}
Coverage areas: {areas}
Total area: {area}{skip_info}</source>
        <translation>Coverage extent KML file created successfully!

File: {file}
Images processed: {processed}
Images skipped: {skipped}
Coverage areas: {areas}
Total area: {area}{skip_info}</translation>
    </message>
</context>
<context>
    <name>DirectoriesPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/DirectoriesPage.py" line="55"/>
        <source>Select Input Directory</source>
        <translation>Select Input Directory</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/DirectoriesPage.py" line="72"/>
        <source>Select Output Directory</source>
        <translation>Select Output Directory</translation>
    </message>
</context>
<context>
    <name>ExportProgressDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="58"/>
        <source>Processing...</source>
        <translation>Processing...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="72"/>
        <source>Starting...</source>
        <translation>Starting...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="76"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="103"/>
        <source>Cancelling...</source>
        <translation>Cancelling...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="104"/>
        <source>Cancellation requested...</source>
        <translation>Cancellation requested...</translation>
    </message>
</context>
<context>
    <name>FrameTab</name>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="226"/>
        <source>Invalid Image</source>
        <translation>Invalid Image</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="227"/>
        <source>{error}</source>
        <translation>{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="229"/>
        <source>Could not load the selected image. Please choose a valid image file.</source>
        <translation>Could not load the selected image. Please choose a valid image file.</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="238"/>
        <source>Aspect Ratio Mismatch</source>
        <translation>Aspect Ratio Mismatch</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="240"/>
        <source>{error}

The mask will be scaled to fit, which may cause distortion.

Do you want to continue?</source>
        <translation>{error}

The mask will be scaled to fit, which may cause distortion.

Do you want to continue?</translation>
    </message>
</context>
<context>
    <name>GPSMapController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/GPSMapController.py" line="54"/>
        <source>No GPS data found in images</source>
        <translation>No GPS data found in images</translation>
    </message>
</context>
<context>
    <name>GPSMapDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="39"/>
        <source>GPS Map View</source>
        <translation>GPS Map View</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="91"/>
        <source>Zoom In (+)</source>
        <translation>Zoom In (+)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="95"/>
        <source>Zoom Out (-)</source>
        <translation>Zoom Out (-)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="99"/>
        <source>Fit All (F)</source>
        <translation>Fit All (F)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="107"/>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="189"/>
        <source>Satellite View</source>
        <translation>Satellite View</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="115"/>
        <source>Click point to select • Drag to pan • Scroll to zoom</source>
        <translation>Click point to select • Drag to pan • Scroll to zoom</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="186"/>
        <source>Map View</source>
        <translation>Map View</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="223"/>
        <source>⚠ {error}</source>
        <translation>⚠ {error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="233"/>
        <source>Map Tile Loading Issue</source>
        <translation>Map Tile Loading Issue</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="235"/>
        <source>{error}

The map will continue to work with cached tiles where available.</source>
        <translation>{error}

The map will continue to work with cached tiles where available.</translation>
    </message>
</context>
<context>
    <name>GPSMapView</name>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/GPSMapView.py" line="1085"/>
        <source>Copy Data</source>
        <translation>Copy Data</translation>
    </message>
</context>
<context>
    <name>GalleryUIComponent</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="289"/>
        <source>0 AOIs</source>
        <translation>0 AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="330"/>
        <source>AOI</source>
        <translation>AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="330"/>
        <source>AOIs</source>
        <translation>AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="332"/>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="355"/>
        <source>{count} {label}</source>
        <translation>{count} {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="350"/>
        <source>Area of Interest</source>
        <translation>Area of Interest</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="352"/>
        <source>Areas of Interest</source>
        <translation>Areas of Interest</translation>
    </message>
</context>
<context>
    <name>GeneralSettingsPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/GeneralSettingsPage.py" line="121"/>
        <source>Select AOI Highlight Color</source>
        <translation>Select AOI Highlight Color</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/GeneralSettingsPage.py" line="159"/>
        <source>Benchmark Complete</source>
        <translation>Benchmark Complete</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/GeneralSettingsPage.py" line="161"/>
        <source>Detected {count} CPU core(s).

Recommended number of processes: {recommended}

The slider has been set to {recommended} processes.</source>
        <translation>Detected {count} CPU core(s).

Recommended number of processes: {recommended}

The slider has been set to {recommended} processes.</translation>
    </message>
</context>
<context>
    <name>HSVColorRange</name>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="27"/>
        <source>Select a target color from an image to detect.
Opens a color picker that allows you to:
• Load an image from the input folder
• Click on pixels to sample colors
• Automatically calculates HSV values
• Sets Hue, Saturation, and Value ranges
The selected color becomes the center of your HSV detection range.
Adjust the +/- range values to capture color variations.</source>
        <translation>Select a target color from an image to detect.
Opens a color picker that allows you to:
• Load an image from the input folder
• Click on pixels to sample colors
• Automatically calculates HSV values
• Sets Hue, Saturation, and Value ranges
The selected color becomes the center of your HSV detection range.
Adjust the +/- range values to capture color variations.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="37"/>
        <source> Pick Color</source>
        <translation> Pick Color</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="44"/>
        <source>color.png</source>
        <translation>color.png</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="57"/>
        <source>Visual preview of the currently selected target color.
Shows the center color of your HSV detection range.
The actual detection will match colors within the specified +/- ranges around this color.</source>
        <translation>Visual preview of the currently selected target color.
Shows the center color of your HSV detection range.
The actual detection will match colors within the specified +/- ranges around this color.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="92"/>
        <source>Hue range tolerance for color detection.
Hue represents the actual color (red, green, blue, etc.) on a 0-179 scale.
Adjust the -/+ values to allow variation in the color hue.</source>
        <translation>Hue range tolerance for color detection.
Hue represents the actual color (red, green, blue, etc.) on a 0-179 scale.
Adjust the -/+ values to allow variation in the color hue.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="97"/>
        <source>Hue Range</source>
        <translation>Hue Range</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="109"/>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="215"/>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="315"/>
        <source>-</source>
        <translation>-</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="121"/>
        <source>Lower hue range tolerance.
• Range: 0 to 179
• Default: 20
Subtracts from the target hue value to define the lower bound.
Lower values = stricter color matching, higher values = more color variation accepted.
Example: Target hue 100, minus 20 = detects hues from 80-100.</source>
        <translation>Lower hue range tolerance.
• Range: 0 to 179
• Default: 20
Subtracts from the target hue value to define the lower bound.
Lower values = stricter color matching, higher values = more color variation accepted.
Example: Target hue 100, minus 20 = detects hues from 80-100.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="147"/>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="250"/>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="350"/>
        <source>+</source>
        <translation>+</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="159"/>
        <source>Upper hue range tolerance.
• Range: 0 to 179
• Default: 20
Adds to the target hue value to define the upper bound.
Lower values = stricter color matching, higher values = more color variation accepted.
Example: Target hue 100, plus 20 = detects hues from 100-120.</source>
        <translation>Upper hue range tolerance.
• Range: 0 to 179
• Default: 20
Adds to the target hue value to define the upper bound.
Lower values = stricter color matching, higher values = more color variation accepted.
Example: Target hue 100, plus 20 = detects hues from 100-120.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="198"/>
        <source>Saturation range tolerance for color detection.
Saturation represents color intensity (0=gray, 255=fully saturated) on a 0-255 scale.
Adjust the -/+ values to allow variation in color intensity.</source>
        <translation>Saturation range tolerance for color detection.
Saturation represents color intensity (0=gray, 255=fully saturated) on a 0-255 scale.
Adjust the -/+ values to allow variation in color intensity.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="203"/>
        <source>Saturation Range</source>
        <translation>Saturation Range</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="227"/>
        <source>Lower saturation range tolerance.
• Range: 0 to 255
• Default: 50
Subtracts from the target saturation value to define the lower bound.
Lower values = requires vivid colors, higher values = accepts faded/washed out colors.
Example: Target saturation 150, minus 50 = detects saturations from 100-150.</source>
        <translation>Lower saturation range tolerance.
• Range: 0 to 255
• Default: 50
Subtracts from the target saturation value to define the lower bound.
Lower values = requires vivid colors, higher values = accepts faded/washed out colors.
Example: Target saturation 150, minus 50 = detects saturations from 100-150.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="262"/>
        <source>Upper saturation range tolerance.
• Range: 0 to 255
• Default: 50
Adds to the target saturation value to define the upper bound.
Lower values = requires exact saturation, higher values = accepts more saturated colors.
Example: Target saturation 150, plus 50 = detects saturations from 150-200.</source>
        <translation>Upper saturation range tolerance.
• Range: 0 to 255
• Default: 50
Adds to the target saturation value to define the upper bound.
Lower values = requires exact saturation, higher values = accepts more saturated colors.
Example: Target saturation 150, plus 50 = detects saturations from 150-200.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="298"/>
        <source>Value (brightness) range tolerance for color detection.
Value represents brightness (0=black, 255=bright) on a 0-255 scale.
Adjust the -/+ values to allow variation in brightness.</source>
        <translation>Value (brightness) range tolerance for color detection.
Value represents brightness (0=black, 255=bright) on a 0-255 scale.
Adjust the -/+ values to allow variation in brightness.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="303"/>
        <source>Value Range</source>
        <translation>Value Range</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="327"/>
        <source>Lower value (brightness) range tolerance.
• Range: 0 to 255
• Default: 50
Subtracts from the target brightness value to define the lower bound.
Lower values = requires bright pixels, higher values = accepts darker pixels.
Example: Target value 200, minus 50 = detects brightness from 150-200.</source>
        <translation>Lower value (brightness) range tolerance.
• Range: 0 to 255
• Default: 50
Subtracts from the target brightness value to define the lower bound.
Lower values = requires bright pixels, higher values = accepts darker pixels.
Example: Target value 200, minus 50 = detects brightness from 150-200.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="362"/>
        <source>Upper value (brightness) range tolerance.
• Range: 0 to 255
• Default: 50
Adds to the target brightness value to define the upper bound.
Lower values = requires exact brightness, higher values = accepts brighter pixels.
Example: Target value 200, plus 50 = detects brightness from 200-250.</source>
        <translation>Upper value (brightness) range tolerance.
• Range: 0 to 255
• Default: 50
Adds to the target brightness value to define the upper bound.
Lower values = requires exact brightness, higher values = accepts brighter pixels.
Example: Target value 200, plus 50 = detects brightness from 200-250.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="410"/>
        <source>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the color ranges before processing.</source>
        <translation>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the color ranges before processing.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="415"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="422"/>
        <source>eye.png</source>
        <translation>eye.png</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeAssistant</name>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRangeAssistant.py" line="661"/>
        <source>HSV Color Range Assistant - Click Selection</source>
        <translation>HSV Color Range Assistant - Click Selection</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRangeAssistant.py" line="1476"/>
        <source>
&lt;h2&gt;HSV Color Range Assistant - Help&lt;/h2&gt;

&lt;p&gt;This tool helps you pick the HSV color range of a specific color in a photo.
Click on the BROWSE button to open an image.&lt;/p&gt;

&lt;h3&gt;Navigation:&lt;/h3&gt;
&lt;p&gt;• Use the mouse scroll wheel to zoom in/out of the image&lt;br&gt;
• Use the left mouse button to drag the image around and pan it&lt;/p&gt;

&lt;h3&gt;Color Selection:&lt;/h3&gt;
&lt;p&gt;• Hold the &lt;b&gt;CTRL/OPTION key&lt;/b&gt; while left clicking on a color in the image that you want to select&lt;br&gt;
• All pixels in the image that share that HSV color value will be selected and highlighted in white&lt;/p&gt;

&lt;h3&gt;Selection Radius:&lt;/h3&gt;
        &lt;p&gt;You can adjust the Selection Radius of the mouse cursor to be larger or smaller.
        When you CTRL click it will select all colors within that radius of the mouse cursor.&lt;/p&gt;

&lt;h3&gt;Corrections:&lt;/h3&gt;
&lt;p&gt;If you make a mistake you can UNDO the last selection or you can press the RESET button to start over.&lt;/p&gt;

&lt;h3&gt;Mask Preview:&lt;/h3&gt;
        &lt;p&gt;On the right side the Mask Preview section will show you what pixels in the image were selected.
        If you see pixels outside of your target object that you are selecting that means you may need to
        adjust the Color Tolerance or be more careful with your selections.&lt;/p&gt;
</source>
        <translation>
&lt;h2&gt;HSV Color Range Assistant - Help&lt;/h2&gt;

&lt;p&gt;This tool helps you pick the HSV color range of a specific color in a photo.
Click on the BROWSE button to open an image.&lt;/p&gt;

&lt;h3&gt;Navigation:&lt;/h3&gt;
&lt;p&gt;• Use the mouse scroll wheel to zoom in/out of the image&lt;br&gt;
• Use the left mouse button to drag the image around and pan it&lt;/p&gt;

&lt;h3&gt;Color Selection:&lt;/h3&gt;
&lt;p&gt;• Hold the &lt;b&gt;CTRL/OPTION key&lt;/b&gt; while left clicking on a color in the image that you want to select&lt;br&gt;
• All pixels in the image that share that HSV color value will be selected and highlighted in white&lt;/p&gt;

&lt;h3&gt;Selection Radius:&lt;/h3&gt;
        &lt;p&gt;You can adjust the Selection Radius of the mouse cursor to be larger or smaller.
        When you CTRL click it will select all colors within that radius of the mouse cursor.&lt;/p&gt;

&lt;h3&gt;Corrections:&lt;/h3&gt;
&lt;p&gt;If you make a mistake you can UNDO the last selection or you can press the RESET button to start over.&lt;/p&gt;

&lt;h3&gt;Mask Preview:&lt;/h3&gt;
        &lt;p&gt;On the right side the Mask Preview section will show you what pixels in the image were selected.
        If you see pixels outside of your target object that you are selecting that means you may need to
        adjust the Color Tolerance or be more careful with your selections.&lt;/p&gt;
</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRangeAssistant.py" line="1504"/>
        <source>HSV Color Range Assistant - Help</source>
        <translation>HSV Color Range Assistant - Help</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeController</name>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="95"/>
        <source>No Colors Selected</source>
        <translation>No Colors Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="118"/>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="123"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="427"/>
        <source>Please add at least one color to detect.</source>
        <translation>Please add at least one color to detect.</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeWizard</name>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRangeWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeWizardController</name>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeWizardController.py" line="49"/>
        <source>No Colors Selected</source>
        <translation>No Colors Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeWizardController.py" line="59"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeWizardController.py" line="343"/>
        <source>Please add at least one color to detect.</source>
        <translation>Please add at least one color to detect.</translation>
    </message>
</context>
<context>
    <name>HSVColorRowWizardWidget</name>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRowWizardWidget.py" line="392"/>
        <location filename="../app/algorithms/Shared/views/HSVColorRowWizardWidget.py" line="392"/>
        <source>H: {h_min}-{h_max}°, S: {s_min}-{s_max}, V: {v_min}-{v_max}</source>
        <translation>H: {h_min}-{h_max}°, S: {s_min}-{s_max}, V: {v_min}-{v_max}</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/HelpDialog.py" line="25"/>
        <source>Viewer Help</source>
        <translation>Viewer Help</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/HelpDialog.py" line="60"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
</context>
<context>
    <name>ImageAdjustmentDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="83"/>
        <source>Image Adjustment</source>
        <translation>Image Adjustment</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="96"/>
        <source>Adjustments</source>
        <translation>Adjustments</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="124"/>
        <source>Exposure:</source>
        <translation>Exposure:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="127"/>
        <source>Highlights:</source>
        <translation>Highlights:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="130"/>
        <source>Shadows:</source>
        <translation>Shadows:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="133"/>
        <source>Clarity:</source>
        <translation>Clarity:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="136"/>
        <source>Radius:</source>
        <translation>Radius:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="146"/>
        <source>Reset</source>
        <translation>Reset</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="147"/>
        <source>Apply</source>
        <translation>Apply</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="148"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
</context>
<context>
    <name>ImageAnalysisGuide</name>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="14"/>
        <source>Image Analysis Guide</source>
        <translation>Image Analysis Guide</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="39"/>
        <source>Welcome to ADIAT</source>
        <translation>Welcome to ADIAT</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="67"/>
        <source>Please select the ADIAT_Data.xml file from previous analysis:</source>
        <translation>Please select the ADIAT_Data.xml file from previous analysis:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="79"/>
        <source>No file selected</source>
        <translation>No file selected</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="94"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="266"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="307"/>
        <source>Browse...</source>
        <translation>Browse...</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="123"/>
        <source>What would you like to do?</source>
        <translation>What would you like to do?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="160"/>
        <source>Start New Image Analysis</source>
        <translation>Start New Image Analysis</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="178"/>
        <source>Review Existing Image Analysis</source>
        <translation>Review Existing Image Analysis</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="223"/>
        <source>Select Directories</source>
        <translation>Select Directories</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="245"/>
        <source>Where are the images you want to analyze?</source>
        <translation>Where are the images you want to analyze?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="286"/>
        <source>Where do you want ADIAT to store the output files?</source>
        <translation>Where do you want ADIAT to store the output files?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="348"/>
        <source>Image Capture Information</source>
        <translation>Image Capture Information</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="370"/>
        <source>What drone/camera was used to capture images?</source>
        <translation>What drone/camera was used to capture images?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="400"/>
        <source>At what above ground level (AGL) altitude was the drone flying?</source>
        <translation>At what above ground level (AGL) altitude was the drone flying?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="452"/>
        <source>ft</source>
        <translation>ft</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="457"/>
        <source>m</source>
        <translation>m</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="495"/>
        <source>Estimated Ground Sampling Distance (GSD):</source>
        <translation>Estimated Ground Sampling Distance (GSD):</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="516"/>
        <source>&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0//EN&quot; &quot;http://www.w3.org/TR/REC-html40/strict.dtd&quot;&gt;
&lt;html&gt;&lt;head&gt;&lt;meta name=&quot;qrichtext&quot; content=&quot;1&quot; /&gt;&lt;meta charset=&quot;utf-8&quot; /&gt;&lt;style type=&quot;text/css&quot;&gt;
p, li { white-space: pre-wrap; }
hr { height: 1px; border-width: 0; }
li.unchecked::marker { content: &quot;\2610&quot;; }
li.checked::marker { content: &quot;\2612&quot;; }
&lt;/style&gt;&lt;/head&gt;&lt;body style=&quot; font-family:&apos;Segoe UI&apos;; font-size:11pt; font-weight:400; font-style:normal;&quot;&gt;
&lt;p style=&quot;-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px; font-family:&apos;MS Shell Dlg 2&apos;; font-size:9pt;&quot;&gt;&lt;br /&gt;&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0//EN&quot; &quot;http://www.w3.org/TR/REC-html40/strict.dtd&quot;&gt;
&lt;html&gt;&lt;head&gt;&lt;meta name=&quot;qrichtext&quot; content=&quot;1&quot; /&gt;&lt;meta charset=&quot;utf-8&quot; /&gt;&lt;style type=&quot;text/css&quot;&gt;
p, li { white-space: pre-wrap; }
hr { height: 1px; border-width: 0; }
li.unchecked::marker { content: &quot;\2610&quot;; }
li.checked::marker { content: &quot;\2612&quot;; }
&lt;/style&gt;&lt;/head&gt;&lt;body style=&quot; font-family:&apos;Segoe UI&apos;; font-size:11pt; font-weight:400; font-style:normal;&quot;&gt;
&lt;p style=&quot;-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px; font-family:&apos;MS Shell Dlg 2&apos;; font-size:9pt;&quot;&gt;&lt;br /&gt;&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="526"/>
        <source>--</source>
        <translation>--</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="565"/>
        <source>Search Target Size</source>
        <translation>Search Target Size</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="590"/>
        <source>Approximately how large are the objects you&apos;re wanting to identify?</source>
        <translation>Approximately how large are the objects you&apos;re wanting to identify?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="621"/>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;More Examples:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 sqft – Hat, Helmet, Plastic Bag &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 sqft – Cat, Daypack &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 sqft – Large Pack, Medium Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 sqft – Sleeping Bag, Large Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 sqft – Small Boat, 2-Person Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 sqft – Car/SUV, Small Pickup Truck, Large Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 sqft – House &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;More Examples:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 sqft – Hat, Helmet, Plastic Bag &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 sqft – Cat, Daypack &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 sqft – Large Pack, Medium Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 sqft – Sleeping Bag, Large Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 sqft – Small Boat, 2-Person Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 sqft – Car/SUV, Small Pickup Truck, Large Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 sqft – House &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="660"/>
        <source>ALGORITHM SELECTION GUIDE</source>
        <translation>ALGORITHM SELECTION GUIDE</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="682"/>
        <source>Are you using thermal images?</source>
        <translation>Are you using thermal images?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="727"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1114"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="758"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1099"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="831"/>
        <source>Reset</source>
        <translation>Reset</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="888"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="147"/>
        <source>Algorithm Parameters</source>
        <translation>Algorithm Parameters</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="918"/>
        <source>General Settings</source>
        <translation>General Settings</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="940"/>
        <source>What color should be used to highlight Areas of Interest (AOIs)?</source>
        <translation>What color should be used to highlight Areas of Interest (AOIs)?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="960"/>
        <source>Select Color</source>
        <translation>Select Color</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1009"/>
        <source>How many images should be processed at the same time?</source>
        <translation>How many images should be processed at the same time?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1033"/>
        <source>Run Benchmark</source>
        <translation>Run Benchmark</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1056"/>
        <source>What resolution should images be processed at?</source>
        <translation>What resolution should images be processed at?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1084"/>
        <source>Were the images captured in different lighting conditions?</source>
        <translation>Were the images captured in different lighting conditions?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1177"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1189"/>
        <source>Skip this wizard in the future</source>
        <translation>Skip this wizard in the future</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1217"/>
        <source>Back</source>
        <translation>Back</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1229"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="261"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="266"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="272"/>
        <source>Continue</source>
        <translation>Continue</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="102"/>
        <source>ADIAT Image Analysis Guide</source>
        <translation>ADIAT Image Analysis Guide</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="256"/>
        <source>Load Results</source>
        <translation>Load Results</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="269"/>
        <source>Start Processing</source>
        <translation>Start Processing</translation>
    </message>
</context>
<context>
    <name>ImageLoadController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/image/ImageLoadController.py" line="112"/>
        <source>(Image {current} of {total})</source>
        <translation>(Image {current} of {total})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/image/ImageLoadController.py" line="422"/>
        <source>Error Loading Image</source>
        <translation>Error Loading Image</translation>
    </message>
</context>
<context>
    <name>LoadingDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/LoadingDialog.py" line="12"/>
        <source>Generating Report</source>
        <translation>Generating Report</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/LoadingDialog.py" line="29"/>
        <source>Report generation in progress...</source>
        <translation>Report generation in progress...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/LoadingDialog.py" line="33"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>MRMap</name>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="29"/>
        <source>Number of segments to divide each image into for MR Map analysis.
Each segment is processed independently for multi-resolution feature detection.
Performance impact:
• Higher number of segments: INCREASES processing time (more segments to analyze)
• Lower number of segments: DECREASES processing time (fewer segments to analyze)
• 1 segment: Fastest processing (analyzes whole image once)
Higher segment counts improve detection in images with varying features.</source>
        <translation>Number of segments to divide each image into for MR Map analysis.
Each segment is processed independently for multi-resolution feature detection.
Performance impact:
• Higher number of segments: INCREASES processing time (more segments to analyze)
• Lower number of segments: DECREASES processing time (fewer segments to analyze)
• 1 segment: Fastest processing (analyzes whole image once)
Higher segment counts improve detection in images with varying features.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="38"/>
        <source>Image Segments:</source>
        <translation>Image Segments:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="56"/>
        <source>Select the number of segments to divide each image into.
• Options: 1, 2, 4, 6, 9, 16, 25, 36 segments
• Default: 1 (analyze entire image as one segment)
The MR Map (Multi-Resolution Map) algorithm analyzes features at multiple scales:
• 1 segment: Process whole image (best for small images or uniform content)
• More segments: Analyze local regions independently (better for large images)
Higher segment counts improve detection in images with varying features across the scene.
Recommended: 4-9 segments for typical drone imagery.</source>
        <translation>Select the number of segments to divide each image into.
• Options: 1, 2, 4, 6, 9, 16, 25, 36 segments
• Default: 1 (analyze entire image as one segment)
The MR Map (Multi-Resolution Map) algorithm analyzes features at multiple scales:
• 1 segment: Process whole image (best for small images or uniform content)
• More segments: Analyze local regions independently (better for large images)
Higher segment counts improve detection in images with varying features across the scene.
Recommended: 4-9 segments for typical drone imagery.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="67"/>
        <source>1</source>
        <translation>1</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="72"/>
        <source>2</source>
        <translation>2</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="77"/>
        <source>4</source>
        <translation>4</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="82"/>
        <source>6</source>
        <translation>6</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="87"/>
        <source>9</source>
        <translation>9</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="92"/>
        <source>16</source>
        <translation>16</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="97"/>
        <source>25</source>
        <translation>25</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="102"/>
        <source>36</source>
        <translation>36</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="131"/>
        <source>Color Space:</source>
        <translation>Color Space:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="149"/>
        <source>Select the color space for MR Map analysis.
The MR Map algorithm analyzes features in different color representations:
• LAB: Perceptually uniform color space (default, better for color difference analysis)
• RGB: Standard red-green-blue color space (good for general use)
• HSV: Hue-Saturation-Value color space (better for color-based feature detection)
Different color spaces can improve detection depending on the image content.
Recommended: LAB for most cases, HSV for color-rich imagery.</source>
        <translation>Select the color space for MR Map analysis.
The MR Map algorithm analyzes features in different color representations:
• LAB: Perceptually uniform color space (default, better for color difference analysis)
• RGB: Standard red-green-blue color space (good for general use)
• HSV: Hue-Saturation-Value color space (better for color-based feature detection)
Different color spaces can improve detection depending on the image content.
Recommended: LAB for most cases, HSV for color-rich imagery.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="159"/>
        <source>LAB</source>
        <translation>LAB</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="164"/>
        <source>RGB</source>
        <translation>RGB</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="169"/>
        <source>HSV</source>
        <translation>HSV</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="198"/>
        <source>Window size for multi-resolution analysis.
Determines the spatial scale of features to detect.</source>
        <translation>Window size for multi-resolution analysis.
Determines the spatial scale of features to detect.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="202"/>
        <source>Window Size:</source>
        <translation>Window Size:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="209"/>
        <source>Set the window size for multi-resolution analysis.
• Range: 1 to 10
• Default: 5
The MR Map algorithm analyzes features at multiple spatial scales using sliding windows:
• Smaller values (1-3): Detect fine details and small features
• Medium values (4-6): Balanced detection (recommended for most cases)
• Larger values (7-10): Detect larger features and patterns
Window size affects the spatial resolution of feature detection.
Larger windows provide more context but may miss small objects.</source>
        <translation>Set the window size for multi-resolution analysis.
• Range: 1 to 10
• Default: 5
The MR Map algorithm analyzes features at multiple spatial scales using sliding windows:
• Smaller values (1-3): Detect fine details and small features
• Medium values (4-6): Balanced detection (recommended for most cases)
• Larger values (7-10): Detect larger features and patterns
Window size affects the spatial resolution of feature detection.
Larger windows provide more context but may miss small objects.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="254"/>
        <source>Detection threshold for MR Map feature detection.
Controls the sensitivity of feature detection across multiple resolutions.</source>
        <translation>Detection threshold for MR Map feature detection.
Controls the sensitivity of feature detection across multiple resolutions.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="258"/>
        <source>Threshold:</source>
        <translation>Threshold:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="271"/>
        <source>Adjust the detection threshold for MR Map algorithm.
• Range: 1 to 200
• Default: 100
• Slider is inverted: LEFT = higher threshold, RIGHT = lower threshold
The MR Map algorithm detects features at multiple spatial resolutions:
• Lower values (1-50): Very sensitive, detects many features (may include noise)
• Medium values (51-150): Balanced detection (recommended for most cases)
• Higher values (151-200): Less sensitive, only detects prominent features
Threshold controls how distinct a feature must be to be detected.
Note: Slider appearance is inverted - move left for stricter, right for more lenient.</source>
        <translation>Adjust the detection threshold for MR Map algorithm.
• Range: 1 to 200
• Default: 100
• Slider is inverted: LEFT = higher threshold, RIGHT = lower threshold
The MR Map algorithm detects features at multiple spatial resolutions:
• Lower values (1-50): Very sensitive, detects many features (may include noise)
• Medium values (51-150): Balanced detection (recommended for most cases)
• Higher values (151-200): Less sensitive, only detects prominent features
Threshold controls how distinct a feature must be to be detected.
Note: Slider appearance is inverted - move left for stricter, right for more lenient.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="326"/>
        <source>Current threshold value for MR Map feature detection.
Displays the value selected on the threshold slider (1-200).
Lower values = more sensitive detection.</source>
        <translation>Current threshold value for MR Map feature detection.
Displays the value selected on the threshold slider (1-200).
Lower values = more sensitive detection.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="331"/>
        <source>100</source>
        <translation>100</translation>
    </message>
</context>
<context>
    <name>MRMapWizard</name>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="21"/>
        <source>Do your images contain complex scenes with buildings, vehicles, or mixed manmade ground cover?</source>
        <translation>Do your images contain complex scenes with buildings, vehicles, or mixed manmade ground cover?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="41"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="56"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="92"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>How aggressively should ADIAT be searching for anomalies?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="105"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Note: A higher setting will find more potential anomalies but may also increase false positives.</translation>
    </message>
</context>
<context>
    <name>MRMapWizardController</name>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="37"/>
        <source>Very 
Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="38"/>
        <source>Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="39"/>
        <source>Moderate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="40"/>
        <source>Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="41"/>
        <source>Very 
Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="22"/>
        <source>Automated Drone Image Analysis Tool  v1.2 - Sponsored by TEXSAR</source>
        <translation>Automated Drone Image Analysis Tool  v1.2 - Sponsored by TEXSAR</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="52"/>
        <source>Browse for the output folder to save analysis results.
Opens a folder selection dialog.
Choose an empty folder or create a new one to avoid overwriting existing files.</source>
        <translation>Browse for the output folder to save analysis results.
Opens a folder selection dialog.
Choose an empty folder or create a new one to avoid overwriting existing files.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="57"/>
        <location filename="../resources/views/images/MainWindow.ui" line="133"/>
        <location filename="../resources/views/images/MainWindow.ui" line="597"/>
        <source> Select</source>
        <translation> Select</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="64"/>
        <location filename="../resources/views/images/MainWindow.ui" line="140"/>
        <source>folder.png</source>
        <translation>folder.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="76"/>
        <source>Path to the output folder for saving analysis results.
Click the Select button to browse for a destination folder.
Results include:
• Processed images with detected objects marked
• CSV file with detection coordinates and metadata
• KML file for viewing results in mapping applications
• Additional algorithm-specific output files</source>
        <translation>Path to the output folder for saving analysis results.
Click the Select button to browse for a destination folder.
Results include:
• Processed images with detected objects marked
• CSV file with detection coordinates and metadata
• KML file for viewing results in mapping applications
• Additional algorithm-specific output files</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="97"/>
        <source>Select the folder containing images to analyze.
Supported formats: JPG, PNG, TIFF, and other common image formats.</source>
        <translation>Select the folder containing images to analyze.
Supported formats: JPG, PNG, TIFF, and other common image formats.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="101"/>
        <source>Input Folder:</source>
        <translation>Input Folder:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="113"/>
        <source>Select the destination folder for analysis results.
Output includes processed images with marked detections and CSV data files.</source>
        <translation>Select the destination folder for analysis results.
Output includes processed images with marked detections and CSV data files.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="117"/>
        <source>Output Folder:</source>
        <translation>Output Folder:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="129"/>
        <source>Browse for the input folder containing images to analyze.
Opens a folder selection dialog.</source>
        <translation>Browse for the input folder containing images to analyze.
Opens a folder selection dialog.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="152"/>
        <source>Path to the input folder containing images for analysis.
Click the Select button to browse for a folder.
All supported image files in this folder will be processed.</source>
        <translation>Path to the input folder containing images for analysis.
Click the Select button to browse for a folder.
All supported image files in this folder will be processed.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="209"/>
        <source>Minimum object size in pixels for detection filtering.
Objects smaller than this will be ignored.</source>
        <translation>Minimum object size in pixels for detection filtering.
Objects smaller than this will be ignored.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="213"/>
        <source>Min Object Area (px):</source>
        <translation>Min Object Area (px):</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="225"/>
        <source>Set the minimum object area in pixels for detection filtering.
• Range: 1 to 999 pixels
• Default: 10 pixels
Objects smaller than this threshold will be filtered out and not detected.
• Lower values: Detect smaller objects (may increase false positives)
• Higher values: Only detect larger objects (reduces noise)
Use to filter out small artifacts and noise in detection results.</source>
        <translation>Set the minimum object area in pixels for detection filtering.
• Range: 1 to 999 pixels
• Default: 10 pixels
Objects smaller than this threshold will be filtered out and not detected.
• Lower values: Detect smaller objects (may increase false positives)
• Higher values: Only detect larger objects (reduces noise)
Use to filter out small artifacts and noise in detection results.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="269"/>
        <source>Maximum object size in pixels for detection filtering.
Objects larger than this will be ignored.</source>
        <translation>Maximum object size in pixels for detection filtering.
Objects larger than this will be ignored.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="273"/>
        <source>Max Object Area (px):</source>
        <translation>Max Object Area (px):</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="288"/>
        <source>Set the maximum object area in pixels for detection filtering.
• Range: 0 to 99999 pixels
• Default: 0 (None - no maximum filter applied)
• Special value: 0 displays as &quot;None&quot;
Objects larger than this threshold will be filtered out and not detected.
• Lower values: Only detect smaller objects
• Higher values: Allow detection of larger objects
• Set to 0 (None): No maximum size filtering
Use to exclude very large false positive detections like shadows or terrain features.</source>
        <translation>Set the maximum object area in pixels for detection filtering.
• Range: 0 to 99999 pixels
• Default: 0 (None - no maximum filter applied)
• Special value: 0 displays as &quot;None&quot;
Objects larger than this threshold will be filtered out and not detected.
• Lower values: Only detect smaller objects
• Higher values: Allow detection of larger objects
• Set to 0 (None): No maximum size filtering
Use to exclude very large false positive detections like shadows or terrain features.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="299"/>
        <source>None</source>
        <translation>None</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="323"/>
        <source>Disable the maximum size filter and allow detections of any size.</source>
        <translation>Disable the maximum size filter and allow detections of any size.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="326"/>
        <source>No max limit</source>
        <translation>No max limit</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="359"/>
        <source>Color used to mark and identify detected objects in output images.
Click the color button to select a different color.</source>
        <translation>Color used to mark and identify detected objects in output images.
Click the color button to select a different color.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="363"/>
        <source>Object Identifer Color:</source>
        <translation>Object Identifer Color:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="370"/>
        <source>Select the color used to mark detected objects in output images.
• Default: Green (RGB: 0, 255, 0)
Click to open a color picker dialog and choose a different marker color.
The selected color will be used for:
• Drawing circles/rectangles around detected objects
• Highlighting AOI locations on output images
• Creating visual markers in the results viewer
Choose a color that contrasts well with your image content for best visibility.</source>
        <translation>Select the color used to mark detected objects in output images.
• Default: Green (RGB: 0, 255, 0)
Click to open a color picker dialog and choose a different marker color.
The selected color will be used for:
• Drawing circles/rectangles around detected objects
• Highlighting AOI locations on output images
• Creating visual markers in the results viewer
Choose a color that contrasts well with your image content for best visibility.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="395"/>
        <source>Maximum number of parallel processes to use for image analysis.
More processes = faster processing but higher CPU/memory usage.</source>
        <translation>Maximum number of parallel processes to use for image analysis.
More processes = faster processing but higher CPU/memory usage.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="399"/>
        <source>Max Processes: </source>
        <translation>Max Processes: </translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="417"/>
        <source>Set the maximum number of parallel processes for image analysis.
• Range: 1 to 20 processes
• Default: 10 processes
The application uses multiprocessing to analyze multiple images simultaneously:
• Higher values: Faster processing (uses more CPU cores and memory)
• Lower values: Slower processing (uses fewer system resources)
• Recommended: Set to number of CPU cores or slightly higher
• For systems with limited RAM, reduce this value to prevent memory issues
Each process analyzes one image at a time, so more processes = more parallel image processing.</source>
        <translation>Set the maximum number of parallel processes for image analysis.
• Range: 1 to 20 processes
• Default: 10 processes
The application uses multiprocessing to analyze multiple images simultaneously:
• Higher values: Faster processing (uses more CPU cores and memory)
• Lower values: Slower processing (uses fewer system resources)
• Recommended: Set to number of CPU cores or slightly higher
• For systems with limited RAM, reduce this value to prevent memory issues
Each process analyzes one image at a time, so more processes = more parallel image processing.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="446"/>
        <source>Resolution at which images are processed.
Lower resolutions = faster processing but may miss small objects.</source>
        <translation>Resolution at which images are processed.
Lower resolutions = faster processing but may miss small objects.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="450"/>
        <source>Processing Resolution:</source>
        <translation>Processing Resolution:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="468"/>
        <source>Select processing resolution as percentage of original image size:
• 100%: Original resolution (no scaling, highest quality, slowest)
• 75%: High quality (~56% of pixels, ~1.8x faster)
• 50%: Balanced quality (25% of pixels, ~4x faster) - RECOMMENDED
• 33%: Fast processing (~11% of pixels, ~9x faster)
• 25%: Very fast (6% of pixels, ~16x faster)
• 10%: Ultra fast (1% of pixels, ~100x faster)

Percentage scaling preserves original aspect ratio.
Works with any image size, orientation, or aspect ratio.

Min/Max Area values are always specified in original resolution.
All results are returned in original resolution coordinates.</source>
        <translation>Select processing resolution as percentage of original image size:
• 100%: Original resolution (no scaling, highest quality, slowest)
• 75%: High quality (~56% of pixels, ~1.8x faster)
• 50%: Balanced quality (25% of pixels, ~4x faster) - RECOMMENDED
• 33%: Fast processing (~11% of pixels, ~9x faster)
• 25%: Very fast (6% of pixels, ~16x faster)
• 10%: Ultra fast (1% of pixels, ~100x faster)

Percentage scaling preserves original aspect ratio.
Works with any image size, orientation, or aspect ratio.

Min/Max Area values are always specified in original resolution.
All results are returned in original resolution coordinates.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="530"/>
        <source>Enable histogram normalization preprocessing on images before detection.
Histogram normalization adjusts image colors to match a reference image:
• Equalizes lighting and color differences across images
• Corrects for varying sun angles, shadows, and atmospheric conditions
• Standardizes color appearance across image set
• Improves consistency of detection results
When enabled, select a reference image with ideal lighting/color conditions.
Useful when processing images taken at different times or under varying conditions.</source>
        <translation>Enable histogram normalization preprocessing on images before detection.
Histogram normalization adjusts image colors to match a reference image:
• Equalizes lighting and color differences across images
• Corrects for varying sun angles, shadows, and atmospheric conditions
• Standardizes color appearance across image set
• Improves consistency of detection results
When enabled, select a reference image with ideal lighting/color conditions.
Useful when processing images taken at different times or under varying conditions.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="540"/>
        <source>Normalize Histograms</source>
        <translation>Normalize Histograms</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="555"/>
        <source>Select the reference image for histogram normalization.
All images will be adjusted to match this image&apos;s color distribution.</source>
        <translation>Select the reference image for histogram normalization.
All images will be adjusted to match this image&apos;s color distribution.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="559"/>
        <source>Reference Image:</source>
        <translation>Reference Image:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="571"/>
        <source>Path to the reference image for histogram normalization.
Click the Select button to choose an image.
Choose an image with ideal lighting and color conditions:
• Clear, well-lit image from your dataset
• Representative of the desired appearance
• Typical lighting conditions for your mission
All other images will be color-adjusted to match this reference.</source>
        <translation>Path to the reference image for histogram normalization.
Click the Select button to choose an image.
Choose an image with ideal lighting and color conditions:
• Clear, well-lit image from your dataset
• Representative of the desired appearance
• Typical lighting conditions for your mission
All other images will be color-adjusted to match this reference.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="592"/>
        <source>Browse for a reference image for histogram normalization.
Opens an image file selection dialog.
Select a representative image with good lighting and typical color conditions.</source>
        <translation>Browse for a reference image for histogram normalization.
Opens an image file selection dialog.
Select a representative image with good lighting and typical color conditions.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="604"/>
        <source>image.png</source>
        <translation>image.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="642"/>
        <source>Select the detection algorithm to use for image analysis.

Each algorithm has specific strengths and use cases:

• HSV Color Range: Best for detecting specific colored objects
• Color Range (RGB): Alternative color detection using RGB color space
• RX Anomaly: Statistical detection for unusual/anomalous objects
• Thermal Anomaly: Detects temperature anomalies in thermal imagery
• Thermal Range: Temperature-based detection in thermal images
• Matched Filter: Target-based detection using spectral matching
• MR Map: Multi-resolution feature detection at various scales
• AI Person Detector: Machine learning for detecting people

Hover over the algorithm dropdown for detailed descriptions of each algorithm.</source>
        <translation>Select the detection algorithm to use for image analysis.

Each algorithm has specific strengths and use cases:

• HSV Color Range: Best for detecting specific colored objects
• Color Range (RGB): Alternative color detection using RGB color space
• RX Anomaly: Statistical detection for unusual/anomalous objects
• Thermal Anomaly: Detects temperature anomalies in thermal imagery
• Thermal Range: Temperature-based detection in thermal images
• Matched Filter: Target-based detection using spectral matching
• MR Map: Multi-resolution feature detection at various scales
• AI Person Detector: Machine learning for detecting people

Hover over the algorithm dropdown for detailed descriptions of each algorithm.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="658"/>
        <source>Algorithm:</source>
        <translation>Algorithm:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="682"/>
        <source>Select the detection algorithm for your image analysis task.
Each algorithm has unique strengths and optimal use cases:

═══════════════════════════════════════════════════
HSV COLOR RANGE
═══════════════════════════════════════════════════
What it does: Detects objects by specific color ranges using HSV color space
Strengths:
• Best for detecting brightly colored objects (orange, yellow, red clothing)
• Robust to lighting variations (HSV separates color from brightness)
• Highly customizable with per-channel ranges
• Interactive color selection tools available
Weaknesses:
• Requires careful color range tuning for optimal results
• May struggle with color variations in shadows
• Not effective for colorless or camouflaged objects
Best for: Search &amp; Rescue (colored clothing, equipment), colored vehicles, tents, colored tarps

═══════════════════════════════════════════════════
COLOR RANGE (RGB)
═══════════════════════════════════════════════════
What it does: Detects objects by RGB color ranges
Strengths:
• Simple and intuitive RGB color specification
• Fast processing speed
• Good for basic color-based detection
Weaknesses:
• More sensitive to lighting changes than HSV
• RGB channels mix color and brightness information
• Less flexible than HSV for complex color variations
Best for: Controlled lighting situations, quick basic color detection, simple scenarios

═══════════════════════════════════════════════════
RX ANOMALY
═══════════════════════════════════════════════════
What it does: Statistical anomaly detection - finds pixels that are unusual compared to background
Strengths:
• Detects objects that don&apos;t match the background (no target sample needed)
• Excellent for finding camouflaged or partially hidden objects
• Works across all image types (RGB, thermal, multispectral)
• Automatically adapts to scene characteristics
• Good for detecting subtle differences
Weaknesses:
• May detect natural anomalies (rocks, vegetation changes)
• Requires tuning sensitivity to balance detection vs false positives
• Higher segment counts significantly increase processing time
• Less effective in highly varied/cluttered backgrounds
Best for: Missing person searches (human among vegetation), camouflaged objects, unknown targets, anything unusual in the scene

═══════════════════════════════════════════════════
THERMAL ANOMALY
═══════════════════════════════════════════════════
What it does: Detects temperature anomalies in thermal imagery (hot/cold spots)
Strengths:
• Finds temperature outliers automatically (no specific temp needed)
• Excellent for detecting heat sources (people, animals, fires)
• Works day or night with thermal cameras
• Detects through light vegetation
• Adjustable for hot, cold, or both types of anomalies
Weaknesses:
• Requires thermal (FLIR) imagery
• May detect sun-heated objects (rocks, vehicles)
• Temperature gradients can cause false positives
• Affected by ambient temperature and weather
Best for: Night searches, detecting people/animals by body heat, finding heat sources, cold spot detection

═══════════════════════════════════════════════════
THERMAL RANGE
═══════════════════════════════════════════════════
What it does: Temperature-based detection within a specific temperature range
Strengths:
• Precise temperature-based detection
• Excellent for finding humans (body temp ~35-40°C / 95-104°F)
• Filters out non-target temperatures effectively
• Works day or night with thermal cameras
• Very reliable when target temperature is known
Weaknesses:
• Requires thermal (FLIR) imagery with temperature data
• Must know target temperature range in advance
• Ambient conditions affect target temperature
• May miss targets in extreme weather (hypothermia cases)
Best for: Human detection (known body temp), specific temperature targets, fire detection (high temp range)

═══════════════════════════════════════════════════
MATCHED FILTER
═══════════════════════════════════════════════════
What it does: Target-based detection using spectral signature matching
Strengths:
• Very precise when you have a target sample
• Uses spectral/color &quot;signature&quot; of target for matching
• Reduces false positives by matching known target characteristics
• Good for detecting specific object types
Weaknesses:
• Requires a reference image or color sample of the target
• Less effective if target appearance varies significantly
• Lighting differences can affect matching accuracy
• Not suitable for unknown targets
Best for: Finding specific known objects (specific vehicle color, specific clothing), when you have a target sample to match

═══════════════════════════════════════════════════
MR MAP (Multi-Resolution Map)
═══════════════════════════════════════════════════
What it does: Multi-resolution feature detection at various spatial scales
Strengths:
• Detects features at multiple scales simultaneously
• Good for finding objects of varying sizes
• Effective for complex scene analysis
• Can detect both large and small features in one pass
Weaknesses:
• More computationally intensive
• Requires careful parameter tuning
• Higher segment counts significantly increase processing time
• May produce more false positives requiring filtering
Best for: Complex scenes with varying object sizes, when target size is unknown, general feature mapping

═══════════════════════════════════════════════════
AI PERSON DETECTOR
═══════════════════════════════════════════════════
What it does: Deep learning AI model trained specifically to detect people
Strengths:
• Extremely accurate for detecting people in various poses
• Works with partial visibility and varied clothing
• No color/temperature requirements - works on regular RGB images
• Trained on millions of images for robust detection
• Detects people in complex backgrounds
• Minimal parameter tuning needed
Weaknesses:
• Only detects people (not vehicles, equipment, etc.)
• Computationally intensive - slower processing
• Requires adequate image resolution
• May struggle with very distant/small people
• Less effective with heavy occlusion
Best for: Search &amp; Rescue operations (missing persons), people counting, situations where only human detection is needed

═══════════════════════════════════════════════════
ALGORITHM SELECTION GUIDE
═══════════════════════════════════════════════════
• For colorful objects (bright clothing, gear): HSV Color Range
• For thermal cameras searching people: Thermal Range or Thermal Anomaly
• For camouflaged or hidden subjects: RX Anomaly
• For detecting people specifically: AI Person Detector
• When you have a target sample: Matched Filter
• For unknown targets that stand out: RX Anomaly or Thermal Anomaly
• For fastest processing: Color Range (RGB) or HSV Color Range
• For most accurate people detection: AI Person Detector</source>
        <translation>Select the detection algorithm for your image analysis task.
Each algorithm has unique strengths and optimal use cases:

═══════════════════════════════════════════════════
HSV COLOR RANGE
═══════════════════════════════════════════════════
What it does: Detects objects by specific color ranges using HSV color space
Strengths:
• Best for detecting brightly colored objects (orange, yellow, red clothing)
• Robust to lighting variations (HSV separates color from brightness)
• Highly customizable with per-channel ranges
• Interactive color selection tools available
Weaknesses:
• Requires careful color range tuning for optimal results
• May struggle with color variations in shadows
• Not effective for colorless or camouflaged objects
Best for: Search &amp; Rescue (colored clothing, equipment), colored vehicles, tents, colored tarps

═══════════════════════════════════════════════════
COLOR RANGE (RGB)
═══════════════════════════════════════════════════
What it does: Detects objects by RGB color ranges
Strengths:
• Simple and intuitive RGB color specification
• Fast processing speed
• Good for basic color-based detection
Weaknesses:
• More sensitive to lighting changes than HSV
• RGB channels mix color and brightness information
• Less flexible than HSV for complex color variations
Best for: Controlled lighting situations, quick basic color detection, simple scenarios

═══════════════════════════════════════════════════
RX ANOMALY
═══════════════════════════════════════════════════
What it does: Statistical anomaly detection - finds pixels that are unusual compared to background
Strengths:
• Detects objects that don&apos;t match the background (no target sample needed)
• Excellent for finding camouflaged or partially hidden objects
• Works across all image types (RGB, thermal, multispectral)
• Automatically adapts to scene characteristics
• Good for detecting subtle differences
Weaknesses:
• May detect natural anomalies (rocks, vegetation changes)
• Requires tuning sensitivity to balance detection vs false positives
• Higher segment counts significantly increase processing time
• Less effective in highly varied/cluttered backgrounds
Best for: Missing person searches (human among vegetation), camouflaged objects, unknown targets, anything unusual in the scene

═══════════════════════════════════════════════════
THERMAL ANOMALY
═══════════════════════════════════════════════════
What it does: Detects temperature anomalies in thermal imagery (hot/cold spots)
Strengths:
• Finds temperature outliers automatically (no specific temp needed)
• Excellent for detecting heat sources (people, animals, fires)
• Works day or night with thermal cameras
• Detects through light vegetation
• Adjustable for hot, cold, or both types of anomalies
Weaknesses:
• Requires thermal (FLIR) imagery
• May detect sun-heated objects (rocks, vehicles)
• Temperature gradients can cause false positives
• Affected by ambient temperature and weather
Best for: Night searches, detecting people/animals by body heat, finding heat sources, cold spot detection

═══════════════════════════════════════════════════
THERMAL RANGE
═══════════════════════════════════════════════════
What it does: Temperature-based detection within a specific temperature range
Strengths:
• Precise temperature-based detection
• Excellent for finding humans (body temp ~35-40°C / 95-104°F)
• Filters out non-target temperatures effectively
• Works day or night with thermal cameras
• Very reliable when target temperature is known
Weaknesses:
• Requires thermal (FLIR) imagery with temperature data
• Must know target temperature range in advance
• Ambient conditions affect target temperature
• May miss targets in extreme weather (hypothermia cases)
Best for: Human detection (known body temp), specific temperature targets, fire detection (high temp range)

═══════════════════════════════════════════════════
MATCHED FILTER
═══════════════════════════════════════════════════
What it does: Target-based detection using spectral signature matching
Strengths:
• Very precise when you have a target sample
• Uses spectral/color &quot;signature&quot; of target for matching
• Reduces false positives by matching known target characteristics
• Good for detecting specific object types
Weaknesses:
• Requires a reference image or color sample of the target
• Less effective if target appearance varies significantly
• Lighting differences can affect matching accuracy
• Not suitable for unknown targets
Best for: Finding specific known objects (specific vehicle color, specific clothing), when you have a target sample to match

═══════════════════════════════════════════════════
MR MAP (Multi-Resolution Map)
═══════════════════════════════════════════════════
What it does: Multi-resolution feature detection at various spatial scales
Strengths:
• Detects features at multiple scales simultaneously
• Good for finding objects of varying sizes
• Effective for complex scene analysis
• Can detect both large and small features in one pass
Weaknesses:
• More computationally intensive
• Requires careful parameter tuning
• Higher segment counts significantly increase processing time
• May produce more false positives requiring filtering
Best for: Complex scenes with varying object sizes, when target size is unknown, general feature mapping

═══════════════════════════════════════════════════
AI PERSON DETECTOR
═══════════════════════════════════════════════════
What it does: Deep learning AI model trained specifically to detect people
Strengths:
• Extremely accurate for detecting people in various poses
• Works with partial visibility and varied clothing
• No color/temperature requirements - works on regular RGB images
• Trained on millions of images for robust detection
• Detects people in complex backgrounds
• Minimal parameter tuning needed
Weaknesses:
• Only detects people (not vehicles, equipment, etc.)
• Computationally intensive - slower processing
• Requires adequate image resolution
• May struggle with very distant/small people
• Less effective with heavy occlusion
Best for: Search &amp; Rescue operations (missing persons), people counting, situations where only human detection is needed

═══════════════════════════════════════════════════
ALGORITHM SELECTION GUIDE
═══════════════════════════════════════════════════
• For colorful objects (bright clothing, gear): HSV Color Range
• For thermal cameras searching people: Thermal Range or Thermal Anomaly
• For camouflaged or hidden subjects: RX Anomaly
• For detecting people specifically: AI Person Detector
• When you have a target sample: Matched Filter
• For unknown targets that stand out: RX Anomaly or Thermal Anomaly
• For fastest processing: Color Range (RGB) or HSV Color Range
• For most accurate people detection: AI Person Detector</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="894"/>
        <source>Start processing images with the selected algorithm.
Requirements before starting:
• Input folder must be selected with valid images
• Output folder must be selected
• Algorithm must be selected
• All required algorithm parameters must be configured
Processing will:
• Analyze all images in the input folder using the selected algorithm
• Apply global filters (min/max area, K-Means, histogram normalization)
• Save results to output folder (marked images, CSV, KML files)
• Display progress and results in the output window
Click Cancel during processing to stop the analysis.</source>
        <translation>Start processing images with the selected algorithm.
Requirements before starting:
• Input folder must be selected with valid images
• Output folder must be selected
• Algorithm must be selected
• All required algorithm parameters must be configured
Processing will:
• Analyze all images in the input folder using the selected algorithm
• Apply global filters (min/max area, K-Means, histogram normalization)
• Save results to output folder (marked images, CSV, KML files)
• Display progress and results in the output window
Click Cancel during processing to stop the analysis.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="918"/>
        <source>Start</source>
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="949"/>
        <source>Cancel the currently running image analysis process.
Stops processing immediately and safely terminates all worker processes.
Effects of canceling:
• All running analysis processes are stopped
• Partial results are saved up to the cancellation point
• Images already processed will have output files in the output folder
• Processing can be restarted after cancellation
• Returns to the ready state
Use when you need to stop processing to adjust settings or fix issues.</source>
        <translation>Cancel the currently running image analysis process.
Stops processing immediately and safely terminates all worker processes.
Effects of canceling:
• All running analysis processes are stopped
• Partial results are saved up to the cancellation point
• Images already processed will have output files in the output folder
• Processing can be restarted after cancellation
• Returns to the ready state
Use when you need to stop processing to adjust settings or fix issues.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="963"/>
        <source> Cancel</source>
        <translation> Cancel</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="970"/>
        <source>cancel.png</source>
        <translation>cancel.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="998"/>
        <source>Open the Results Viewer to review detection results.
Available after processing completes successfully.
The Results Viewer provides:
• Interactive image browsing with detected objects highlighted
• Side-by-side comparison of original and processed images
• Navigation through all processed images
• AOI (Area of Interest) details and metadata
• GPS coordinates for detected objects
• Export options for selected detections
• Zoom and pan capabilities
• Filtering and sorting of detection results
Use to review, verify, and export analysis results.</source>
        <translation>Open the Results Viewer to review detection results.
Available after processing completes successfully.
The Results Viewer provides:
• Interactive image browsing with detected objects highlighted
• Side-by-side comparison of original and processed images
• Navigation through all processed images
• AOI (Area of Interest) details and metadata
• GPS coordinates for detected objects
• Export options for selected detections
• Zoom and pan capabilities
• Filtering and sorting of detection results
Use to review, verify, and export analysis results.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1018"/>
        <source> View Results</source>
        <translation> View Results</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1028"/>
        <source>search</source>
        <translation>search</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1085"/>
        <source>Menu</source>
        <translation>Menu</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1097"/>
        <source>Help</source>
        <translation>Help</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1108"/>
        <source>Image Analysis Wizard</source>
        <translation>Image Analysis Wizard</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1111"/>
        <source>Launch the Image Analysis Guide wizard to configure analysis settings.
Opens a step-by-step wizard to:
• Select input and output directories
• Configure image capture settings (drone, altitude, GSD)
• Set target object size
• Choose detection algorithm
• Configure algorithm-specific parameters
• Set general processing options
The wizard will close this window and open with all settings pre-populated.</source>
        <translation>Launch the Image Analysis Guide wizard to configure analysis settings.
Opens a step-by-step wizard to:
• Select input and output directories
• Configure image capture settings (drone, altitude, GSD)
• Set target object size
• Choose detection algorithm
• Configure algorithm-specific parameters
• Set general processing options
The wizard will close this window and open with all settings pre-populated.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1129"/>
        <source>Load Results File</source>
        <translation>Load Results File</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1132"/>
        <source>Load a previously saved results file for viewing.
Opens a file dialog to select a results file (.pkl format).
Loads the analysis results and opens the Results Viewer.
Use this to review results from previous analysis sessions without reprocessing.</source>
        <translation>Load a previously saved results file for viewing.
Opens a file dialog to select a results file (.pkl format).
Loads the analysis results and opens the Results Viewer.
Use this to review results from previous analysis sessions without reprocessing.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1145"/>
        <source>Load Results Folder</source>
        <translation>Load Results Folder</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1148"/>
        <source>Scan a folder recursively for ADIAT_DATA.XML files.
Displays all found results in a dialog for easy browsing.
Use this to quickly find and open results from multiple analysis sessions.</source>
        <translation>Scan a folder recursively for ADIAT_DATA.XML files.
Displays all found results in a dialog for easy browsing.
Use this to quickly find and open results from multiple analysis sessions.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1160"/>
        <source>Preferences</source>
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1163"/>
        <source>Open the Preferences dialog to configure application settings.
Adjust global settings including:
• Application theme (Light/Dark)
• Max AOI warning threshold
• AOI circle radius for clustering
• Coordinate system format (Lat/Long, UTM)
• Temperature unit (Fahrenheit/Celsius)
• Distance unit (Meters/Feet)
• Drone sensor configuration file
All changes are saved automatically.</source>
        <translation>Open the Preferences dialog to configure application settings.
Adjust global settings including:
• Application theme (Light/Dark)
• Max AOI warning threshold
• AOI circle radius for clustering
• Coordinate system format (Lat/Long, UTM)
• Temperature unit (Fahrenheit/Celsius)
• Distance unit (Meters/Feet)
• Drone sensor configuration file
All changes are saved automatically.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1182"/>
        <source>Video Parser</source>
        <translation>Video Parser</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1185"/>
        <source>Open the Video Parser utility to extract frames from video files.
Convert video footage into individual frame images for analysis.
Features:
• Extract frames at specified time intervals
• Optional SRT file support for GPS metadata
• Supports common video formats (MP4, AVI, MOV, etc.)
• Embeds location data into extracted frames
Use to prepare video footage for image-based analysis.</source>
        <translation>Open the Video Parser utility to extract frames from video files.
Convert video footage into individual frame images for analysis.
Features:
• Extract frames at specified time intervals
• Optional SRT file support for GPS metadata
• Supports common video formats (MP4, AVI, MOV, etc.)
• Embeds location data into extracted frames
Use to prepare video footage for image-based analysis.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1202"/>
        <source>Streaming Detector</source>
        <translation>Streaming Detector</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1205"/>
        <source>Switch to the Streaming Detector</source>
        <translation>Switch to the Streaming Detector</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1215"/>
        <source>Real-Time Anomaly Detection</source>
        <translation>Real-Time Anomaly Detection</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1218"/>
        <source>Open the Real-Time Anomaly Detection window for advanced live analysis.
Combines multiple detection algorithms for comprehensive real-time anomaly detection.
Features:
• Motion detection with background subtraction
• Color quantization anomaly detection
• Advanced streaming video processing
• Detection fusion and temporal filtering
• Real-time performance optimization
• Multi-threaded processing for better performance
• Enhanced detection accuracy through algorithm combination
Designed for detecting unusual objects, movement, and colors in real-time video streams.</source>
        <translation>Open the Real-Time Anomaly Detection window for advanced live analysis.
Combines multiple detection algorithms for comprehensive real-time anomaly detection.
Features:
• Motion detection with background subtraction
• Color quantization anomaly detection
• Advanced streaming video processing
• Detection fusion and temporal filtering
• Real-time performance optimization
• Multi-threaded processing for better performance
• Enhanced detection accuracy through algorithm combination
Designed for detecting unusual objects, movement, and colors in real-time video streams.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1238"/>
        <source>Search Coordinator</source>
        <translation>Search Coordinator</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1241"/>
        <source>Open the Search Coordinator window for managing multi-batch review projects.
Features:
• Create and manage search projects with multiple batches
• Track reviewer progress across multiple image sets
• Consolidate review results from multiple reviewers
• View dashboard with search status and metrics
• Export consolidated results
• Manage batch assignments and reviewer coordination
Ideal for large-scale searches with multiple reviewers and image batches.</source>
        <translation>Open the Search Coordinator window for managing multi-batch review projects.
Features:
• Create and manage search projects with multiple batches
• Track reviewer progress across multiple image sets
• Consolidate review results from multiple reviewers
• View dashboard with search status and metrics
• Export consolidated results
• Manage batch assignments and reviewer coordination
Ideal for large-scale searches with multiple reviewers and image batches.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1257"/>
        <source>Ctrl+Shift+C</source>
        <translation>Ctrl+Shift+C</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1262"/>
        <source>Manual</source>
        <translation>Manual</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1265"/>
        <source>Open the online help documentation in your web browser.
Access comprehensive documentation, tutorials, and user guides.
Provides detailed information on all features and algorithms.</source>
        <translation>Open the online help documentation in your web browser.
Access comprehensive documentation, tutorials, and user guides.
Provides detailed information on all features and algorithms.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1277"/>
        <source>Community Forum</source>
        <translation>Community Forum</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1280"/>
        <source>Join the community Discord server for support and discussions.
Connect with other users, share experiences, and get help.
Ask questions, report issues, and suggest new features.</source>
        <translation>Join the community Discord server for support and discussions.
Connect with other users, share experiences, and get help.
Ask questions, report issues, and suggest new features.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1292"/>
        <source>YouTube Channel</source>
        <translation>YouTube Channel</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="73"/>
        <source>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</source>
        <translation>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</translation>
    </message>
    <message>
        <source>Select the detection algorithm for your image analysis task:

HSV COLOR RANGE: Detects brightly colored objects (clothing, vehicles, tents)
  • Best for: Colored objects in varying lighting conditions
  • Limitation: Requires color tuning, not for camouflaged objects

COLOR RANGE (RGB): Simple RGB color detection, fast processing
  • Best for: Basic color detection in controlled lighting
  • Limitation: Sensitive to lighting changes

RX ANOMALY: Finds objects that don&apos;t match background (no sample needed)
  • Best for: Camouflaged/hidden subjects, unknown targets
  • Limitation: May detect natural anomalies, slower with more segments

THERMAL ANOMALY: Detects hot/cold spots in thermal imagery
  • Best for: Night searches, detecting people/animals by body heat
  • Limitation: Requires thermal camera, may detect sun-heated objects

THERMAL RANGE: Temperature-based detection (e.g., 35-40°C for humans)
  • Best for: Human detection with thermal camera (known body temp)
  • Limitation: Requires thermal camera, must know target temperature

MATCHED FILTER: Matches targets using color signature from sample
  • Best for: Specific known objects when you have a target sample
  • Limitation: Requires reference image, not for unknown targets

MR MAP: Multi-resolution detection for objects of varying sizes
  • Best for: Complex scenes with unknown target sizes
  • Limitation: Slower processing, more false positives

AI PERSON DETECTOR: Deep learning model for accurate people detection
  • Best for: Search &amp; Rescue, finding people in any clothing/pose
  • Limitation: Only detects people, slower processing</source>
        <translation type="vanished">Select the detection algorithm for your image analysis task:

HSV COLOR RANGE: Detects brightly colored objects (clothing, vehicles, tents)
  • Best for: Colored objects in varying lighting conditions
  • Limitation: Requires color tuning, not for camouflaged objects

COLOR RANGE (RGB): Simple RGB color detection, fast processing
  • Best for: Basic color detection in controlled lighting
  • Limitation: Sensitive to lighting changes

RX ANOMALY: Finds objects that don&apos;t match background (no sample needed)
  • Best for: Camouflaged/hidden subjects, unknown targets
  • Limitation: May detect natural anomalies, slower with more segments

THERMAL ANOMALY: Detects hot/cold spots in thermal imagery
  • Best for: Night searches, detecting people/animals by body heat
  • Limitation: Requires thermal camera, may detect sun-heated objects

THERMAL RANGE: Temperature-based detection (e.g., 35-40°C for humans)
  • Best for: Human detection with thermal camera (known body temp)
  • Limitation: Requires thermal camera, must know target temperature

MATCHED FILTER: Matches targets using color signature from sample
  • Best for: Specific known objects when you have a target sample
  • Limitation: Requires reference image, not for unknown targets

MR MAP: Multi-resolution detection for objects of varying sizes
  • Best for: Complex scenes with unknown target sizes
  • Limitation: Slower processing, more false positives

AI PERSON DETECTOR: Deep learning model for accurate people detection
  • Best for: Search &amp; Rescue, finding people in any clothing/pose
  • Limitation: Only detects people, slower processing</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="237"/>
        <source>Select the detection algorithm for your image analysis task:

HSV COLOR RANGE: Detects brightly colored objects (clothing, vehicles, tents)
  • Best for: Colored objects in varying lighting conditions
  • Limitation: Requires color tuning, not for camouflaged objects

COLOR RANGE (RGB): Simple RGB color detection, fast processing
  • Best for: Basic color detection in controlled lighting
  • Limitation: Sensitive to lighting changes

RX ANOMALY: Finds objects that don&apos;t match background (no sample needed)
  • Best for: Camouflaged/hidden subjects, unknown targets
  • Limitation: May detect natural anomalies, slower with more segments

THERMAL ANOMALY: Detects hot/cold spots in thermal imagery
  • Best for: Night searches, detecting people/animals by body heat
  • Limitation: Requires thermal camera, may detect sun-heated objects

TEMPERATURE RESIDUAL ANOMALY: Detects local delta-T outliers using radiometric residuals
  • Best for: Isolating rare hot/cold thermal signatures in mixed backgrounds
  • Limitation: Requires radiometric thermal data, can be sensitive to threshold choice

THERMAL RANGE: Temperature-based detection (e.g., 35-40°C for humans)
  • Best for: Human detection with thermal camera (known body temp)
  • Limitation: Requires thermal camera, must know target temperature

MATCHED FILTER: Matches targets using color signature from sample
  • Best for: Specific known objects when you have a target sample
  • Limitation: Requires reference image, not for unknown targets

MR MAP: Multi-resolution detection for objects of varying sizes
  • Best for: Complex scenes with unknown target sizes
  • Limitation: Slower processing, more false positives

AI PERSON DETECTOR: Deep learning model for accurate people detection
  • Best for: Search &amp; Rescue, finding people in any clothing/pose
  • Limitation: Only detects people, slower processing</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="316"/>
        <source>Select AOI Highlight Color</source>
        <translation>Select AOI Highlight Color</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="330"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="348"/>
        <source>Select Directory</source>
        <translation>Select Directory</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="365"/>
        <source>Select a Reference Image</source>
        <translation>Select a Reference Image</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="367"/>
        <source>Images (*.png *.jpg)</source>
        <translation>Images (*.png *.jpg)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="415"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="447"/>
        <source>Value Adjusted</source>
        <translation>Value Adjusted</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="417"/>
        <source>Maximum area has been adjusted to {value} pixels to maintain valid range.
(Minimum area must be less than maximum area)</source>
        <translation>Maximum area has been adjusted to {value} pixels to maintain valid range.
(Minimum area must be less than maximum area)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="449"/>
        <source>Minimum area has been adjusted to {value} pixels to maintain valid range.
(Maximum area must be greater than minimum area)</source>
        <translation>Minimum area has been adjusted to {value} pixels to maintain valid range.
(Maximum area must be greater than minimum area)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="527"/>
        <source>Please set the input and output directories.</source>
        <translation>Please set the input and output directories.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="533"/>
        <source>--- Starting image processing ---</source>
        <translation>--- Starting image processing ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="600"/>
        <source>Could not parse XML file. Check file paths in &quot;{file_name}&quot;</source>
        <translation>Could not parse XML file. Check file paths in &quot;{file_name}&quot;</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="623"/>
        <source>Area of Interest Limit ({limit}) exceeded. Continue?</source>
        <translation>Area of Interest Limit ({limit}) exceeded. Continue?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="626"/>
        <source>Area of Interest Limit Exceeded</source>
        <translation>Area of Interest Limit Exceeded</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="650"/>
        <source>--- Image Processing Completed ---</source>
        <translation>--- Image Processing Completed ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="653"/>
        <source>{count} images with areas of interest identified</source>
        <translation>{count} images with areas of interest identified</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="659"/>
        <source>No areas of interest identified</source>
        <translation>No areas of interest identified</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="678"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1090"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1113"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1129"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1145"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1161"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="688"/>
        <source>Select File</source>
        <translation>Select File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="688"/>
        <source>XML Files (*.xml);;All Files (*)</source>
        <translation type="unfinished">XML Files (*.xml);;All Files (*)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="709"/>
        <source>Select Results Folder</source>
        <translation>Select Results Folder</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="742"/>
        <source>Failed to scan folder: {error}</source>
        <translation>Failed to scan folder: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="764"/>
        <source>No Results Found</source>
        <translation>No Results Found</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="765"/>
        <source>No ADIAT_DATA.XML files were found in the selected folder.</source>
        <translation>No ADIAT_DATA.XML files were found in the selected folder.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="782"/>
        <source>Failed to display results: {error}</source>
        <translation>Failed to display results: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="793"/>
        <source>Scan failed: {error}</source>
        <translation>Scan failed: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="836"/>
        <source>Failed to open viewer: {error}</source>
        <translation>Failed to open viewer: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="856"/>
        <source>The selected file is not a valid XML file: {path}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1037"/>
        <source>Error Loading Results</source>
        <translation>Error Loading Results</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1038"/>
        <source>Failed to load results file:
{error}</source>
        <translation>Failed to load results file:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1091"/>
        <source>Failed to open Streaming Detector:
{error}</source>
        <translation>Failed to open Streaming Detector:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1114"/>
        <source>Failed to open Search Coordinator:
{error}</source>
        <translation>Failed to open Search Coordinator:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1130"/>
        <source>Failed to open Help documentation:
{error}</source>
        <translation>Failed to open Help documentation:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1146"/>
        <source>Failed to open Community Help:
{error}</source>
        <translation>Failed to open Community Help:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1162"/>
        <source>Failed to open YouTube Channel:
{error}</source>
        <translation>Failed to open YouTube Channel:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1286"/>
        <source>Invalid Value</source>
        <translation>Invalid Value</translation>
    </message>
</context>
<context>
    <name>MapExportDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="34"/>
        <source>Map Export Options</source>
        <translation>Map Export Options</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="45"/>
        <source>Configure Map Export</source>
        <translation>Configure Map Export</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="53"/>
        <source>Export Type</source>
        <translation>Export Type</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="56"/>
        <source>KML File</source>
        <translation>KML File</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="58"/>
        <source>Export to a KML file for use in Google Earth, etc.</source>
        <translation>Export to a KML file for use in Google Earth, etc.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="60"/>
        <source>CalTopo</source>
        <translation>CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="61"/>
        <source>Export directly to a CalTopo map</source>
        <translation>Export directly to a CalTopo map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="73"/>
        <source>Data to Include</source>
        <translation>Data to Include</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="76"/>
        <source>Drone/Image Locations</source>
        <translation>Drone/Image Locations</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="78"/>
        <source>Include markers for each drone image location</source>
        <translation>Include markers for each drone image location</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="80"/>
        <source>Flagged Areas of Interest</source>
        <translation>Flagged Areas of Interest</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="82"/>
        <source>Include markers for flagged AOIs</source>
        <translation>Include markers for flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="84"/>
        <source>Coverage Area</source>
        <translation>Coverage Area</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="86"/>
        <source>Include polygon(s) showing the geographic coverage extent</source>
        <translation>Include polygon(s) showing the geographic coverage extent</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="88"/>
        <source>Include images without flagged AOIs</source>
        <translation>Include images without flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="90"/>
        <source>If unchecked, only export locations for images that have flagged AOIs</source>
        <translation>If unchecked, only export locations for images that have flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="101"/>
        <source>CalTopo Options</source>
        <translation>CalTopo Options</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="104"/>
        <source>Include Images</source>
        <translation>Include Images</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="106"/>
        <source>Upload photos to CalTopo markers (CalTopo only)</source>
        <translation>Upload photos to CalTopo markers (CalTopo only)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="126"/>
        <source>Export</source>
        <translation>Export</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="130"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>MatchedFilter</name>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="42"/>
        <source>Add a new color signature for matched filter detection. Each color can have its own threshold value.</source>
        <translation>Add a new color signature for matched filter detection. Each color can have its own threshold value.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="45"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="52"/>
        <source>color.png</source>
        <translation>color.png</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="83"/>
        <source>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the thresholds before processing.</source>
        <translation>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the thresholds before processing.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="88"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="95"/>
        <source>eye.png</source>
        <translation>eye.png</translation>
    </message>
</context>
<context>
    <name>MatchedFilterController</name>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterController.py" line="42"/>
        <source>No Colors Selected</source>
        <translation>No Colors Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterController.py" line="299"/>
        <source>Please add at least one color to detect.</source>
        <translation>Please add at least one color to detect.</translation>
    </message>
</context>
<context>
    <name>MatchedFilterWizard</name>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilterWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Add Color</translation>
    </message>
</context>
<context>
    <name>MatchedFilterWizardController</name>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterWizardController.py" line="47"/>
        <source>No Targets Selected</source>
        <translation>No Targets Selected</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterWizardController.py" line="57"/>
        <source>View Range</source>
        <translation>View Range</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterWizardController.py" line="218"/>
        <source>Please add at least one target color to detect.</source>
        <translation>Please add at least one target color to detect.</translation>
    </message>
</context>
<context>
    <name>MeasureDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="62"/>
        <source>Measure Distance</source>
        <translation>Measure Distance</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="75"/>
        <source>Ground Sample Distance</source>
        <translation>Ground Sample Distance</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="78"/>
        <source>GSD:</source>
        <translation>GSD:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="80"/>
        <source>Enter GSD value</source>
        <translation>Enter GSD value</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="84"/>
        <source>cm/px</source>
        <translation>cm/px</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="92"/>
        <source>Measurement</source>
        <translation>Measurement</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="95"/>
        <source>Distance:</source>
        <translation>Distance:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="96"/>
        <source>--</source>
        <translation>--</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="107"/>
        <source>Click on the image to place the first point,
then click again to place the second point.</source>
        <translation>Click on the image to place the first point,
then click again to place the second point.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="115"/>
        <source>Clear</source>
        <translation>Clear</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="117"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="269"/>
        <source>No GSD value</source>
        <translation>No GSD value</translation>
    </message>
</context>
<context>
    <name>MediaSelector</name>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="14"/>
        <source>Automated Drone Image Analysis Tool (ADIAT)</source>
        <translation>Automated Drone Image Analysis Tool (ADIAT)</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="31"/>
        <source>What type of media are you working with?</source>
        <translation>What type of media are you working with?</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="86"/>
        <source>Images</source>
        <translation>Images</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="163"/>
        <source>RTMP, Video Files, HDMI Capture</source>
        <translation>RTMP, Video Files, HDMI Capture</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="169"/>
        <source>Streaming</source>
        <translation>Streaming</translation>
    </message>
</context>
<context>
    <name>MotionDetectionController</name>
    <message>
        <source>Detection Mode</source>
        <translation type="vanished">Detection Mode</translation>
    </message>
    <message>
        <source>Auto</source>
        <translation type="vanished">Auto</translation>
    </message>
    <message>
        <source>Static Camera</source>
        <translation type="vanished">Static Camera</translation>
    </message>
    <message>
        <source>Moving Camera</source>
        <translation type="vanished">Moving Camera</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation type="vanished">Mode:</translation>
    </message>
    <message>
        <source>Auto Mode: Detecting...</source>
        <translation type="vanished">Auto Mode: Detecting...</translation>
    </message>
    <message>
        <source>Algorithm</source>
        <translation type="vanished">Algorithm</translation>
    </message>
    <message>
        <source>Frame Difference</source>
        <translation type="vanished">Frame Difference</translation>
    </message>
    <message>
        <source>MOG2 Background</source>
        <translation type="vanished">MOG2 Background</translation>
    </message>
    <message>
        <source>KNN Background</source>
        <translation type="vanished">KNN Background</translation>
    </message>
    <message>
        <source>Optical Flow</source>
        <translation type="vanished">Optical Flow</translation>
    </message>
    <message>
        <source>Feature Matching</source>
        <translation type="vanished">Feature Matching</translation>
    </message>
    <message>
        <source>Algorithm:</source>
        <translation type="vanished">Algorithm:</translation>
    </message>
    <message>
        <source>Detection Parameters</source>
        <translation type="vanished">Detection Parameters</translation>
    </message>
    <message>
        <source>Sensitivity: {value}%</source>
        <translation type="vanished">Sensitivity: {value}%</translation>
    </message>
    <message>
        <source>Min Area:</source>
        <translation type="vanished">Min Area:</translation>
    </message>
    <message>
        <source>Max Area:</source>
        <translation type="vanished">Max Area:</translation>
    </message>
    <message>
        <source>Threshold:</source>
        <translation type="vanished">Threshold:</translation>
    </message>
    <message>
        <source>Compensation: {value}%</source>
        <translation type="vanished">Compensation: {value}%</translation>
    </message>
    <message>
        <source>Visualization</source>
        <translation type="vanished">Visualization</translation>
    </message>
    <message>
        <source>Show Motion Vectors</source>
        <translation type="vanished">Show Motion Vectors</translation>
    </message>
    <message>
        <source>Show Camera Motion</source>
        <translation type="vanished">Show Camera Motion</translation>
    </message>
    <message>
        <source>Detection Statistics</source>
        <translation type="vanished">Detection Statistics</translation>
    </message>
    <message>
        <source>Detections: 0</source>
        <translation type="vanished">Detections: 0</translation>
    </message>
    <message>
        <source>Camera Motion: None</source>
        <translation type="vanished">Camera Motion: None</translation>
    </message>
    <message>
        <source>FPS: 0.0</source>
        <translation type="vanished">FPS: 0.0</translation>
    </message>
    <message>
        <source>Processing: 0.0ms</source>
        <translation type="vanished">Processing: 0.0ms</translation>
    </message>
    <message>
        <source>Motion</source>
        <translation type="vanished">Motion</translation>
    </message>
    <message>
        <source>Detections: {count} | Total Area: {total} | Avg: {avg}</source>
        <translation type="vanished">Detections: {count} | Total Area: {total} | Avg: {avg}</translation>
    </message>
    <message>
        <source>Camera Motion: ({x}, {y}) Confidence: {confidence}</source>
        <translation type="vanished">Camera Motion: ({x}, {y}) Confidence: {confidence}</translation>
    </message>
    <message>
        <source> (GPU)</source>
        <translation type="vanished"> (GPU)</translation>
    </message>
    <message>
        <source> (CPU)</source>
        <translation type="vanished"> (CPU)</translation>
    </message>
    <message>
        <source>FPS: {fps:.1f}{gpu}</source>
        <translation type="vanished">FPS: {fps:.1f}{gpu}</translation>
    </message>
    <message>
        <source>Processing: {time:.1f}ms</source>
        <translation type="vanished">Processing: {time:.1f}ms</translation>
    </message>
    <message>
        <source>Auto Mode: {mode} ({confidence:.0%})</source>
        <translation type="vanished">Auto Mode: {mode} ({confidence:.0%})</translation>
    </message>
    <message>
        <source>Auto Mode: {mode}</source>
        <translation type="vanished">Auto Mode: {mode}</translation>
    </message>
    <message>
        <source>Total Detections</source>
        <translation type="vanished">Total Detections</translation>
    </message>
    <message>
        <source>Last Detection</source>
        <translation type="vanished">Last Detection</translation>
    </message>
    <message>
        <source>{seconds:.1f}s ago</source>
        <translation type="vanished">{seconds:.1f}s ago</translation>
    </message>
    <message>
        <source>Never</source>
        <translation type="vanished">Never</translation>
    </message>
</context>
<context>
    <name>MotionDetectionWizard</name>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="12"/>
        <source>Detection Mode</source>
        <translation>Detection Mode</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="16"/>
        <source>Mode:</source>
        <translation>Mode:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="22"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="25"/>
        <source>Static Camera</source>
        <translation>Static Camera</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="28"/>
        <source>Moving Camera</source>
        <translation>Moving Camera</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="37"/>
        <source>Algorithm</source>
        <translation>Algorithm</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="41"/>
        <source>Algorithm:</source>
        <translation>Algorithm:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="47"/>
        <source>Frame Difference</source>
        <translation>Frame Difference</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="50"/>
        <source>MOG2 Background</source>
        <translation>MOG2 Background</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="53"/>
        <source>KNN Background</source>
        <translation>KNN Background</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="56"/>
        <source>Optical Flow</source>
        <translation>Optical Flow</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="59"/>
        <source>Feature Matching</source>
        <translation>Feature Matching</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="68"/>
        <source>Detection Parameters</source>
        <translation>Detection Parameters</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="72"/>
        <source>Sensitivity: 50%</source>
        <translation>Sensitivity: 50%</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="87"/>
        <source>Min Area:</source>
        <translation>Min Area:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="103"/>
        <source>Max Area:</source>
        <translation>Max Area:</translation>
    </message>
</context>
<context>
    <name>MotionDetectionWizardController</name>
    <message>
        <source>Auto</source>
        <translation type="vanished">Auto</translation>
    </message>
    <message>
        <source>MOG2 Background</source>
        <translation type="vanished">MOG2 Background</translation>
    </message>
    <message>
        <source>Sensitivity: {value}%</source>
        <translation type="vanished">Sensitivity: {value}%</translation>
    </message>
</context>
<context>
    <name>PDFExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="150"/>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="159"/>
        <source>No Images to Export</source>
        <translation>No Images to Export</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="152"/>
        <source>There are no images available to include in the PDF report.

All images may be hidden or there are no images in the dataset.</source>
        <translation>There are no images available to include in the PDF report.

All images may be hidden or there are no images in the dataset.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="161"/>
        <source>There are no images with flagged AOIs to include in the PDF report.

Please flag at least one AOI, or check &apos;Include images without flagged AOIs&apos; to include all images in the report.</source>
        <translation>There are no images with flagged AOIs to include in the PDF report.

Please flag at least one AOI, or check &apos;Include images without flagged AOIs&apos; to include all images in the report.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="171"/>
        <source>Save PDF File</source>
        <translation>Save PDF File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="173"/>
        <source>PDF files (*.pdf)</source>
        <translation>PDF files (*.pdf)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="214"/>
        <source>Generating PDF Report</source>
        <translation>Generating PDF Report</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="217"/>
        <source>Generating PDF Report...</source>
        <translation>Generating PDF Report...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="258"/>
        <source>Failed to generate PDF file: {error}</source>
        <translation>Failed to generate PDF file: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="274"/>
        <source>Success</source>
        <translation>Success</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="275"/>
        <source>PDF report generated successfully!</source>
        <translation>PDF report generated successfully!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="292"/>
        <source>PDF generation failed: {error}</source>
        <translation>PDF generation failed: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="306"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
</context>
<context>
    <name>PDFExportDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="27"/>
        <source>PDF Export Settings</source>
        <translation>PDF Export Settings</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="35"/>
        <source>Enter the following information for the PDF report:</source>
        <translation>Enter the following information for the PDF report:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="44"/>
        <source>Enter organization name</source>
        <translation>Enter organization name</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="45"/>
        <source>Organization:</source>
        <translation>Organization:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="49"/>
        <source>Enter search name</source>
        <translation>Enter search name</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="50"/>
        <source>Search Name:</source>
        <translation>Search Name:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="55"/>
        <source>Export Options:</source>
        <translation>Export Options:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="60"/>
        <source>Include images without flagged AOIs</source>
        <translation>Include images without flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="62"/>
        <source>When checked, all images will be included in the PDF report, even if they don&apos;t have any flagged AOIs. When unchecked, only images with flagged AOIs will be included.</source>
        <translation>When checked, all images will be included in the PDF report, even if they don&apos;t have any flagged AOIs. When unchecked, only images with flagged AOIs will be included.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="69"/>
        <source>Map Tiles:</source>
        <translation>Map Tiles:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="71"/>
        <source>Map</source>
        <translation>Map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="72"/>
        <source>Satellite</source>
        <translation>Satellite</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="73"/>
        <source>Choose the background tiles for the PDF overview map.</source>
        <translation>Choose the background tiles for the PDF overview map.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="69"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="71"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>PathValidationController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="87"/>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="137"/>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="170"/>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="220"/>
        <source>
  ... and {count} more</source>
        <translation>
  ... and {count} more</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="92"/>
        <source>{count} source image(s) not found at expected locations:

{files}

Please select the folder containing the source images.</source>
        <translation>{count} source image(s) not found at expected locations:

{files}

Please select the folder containing the source images.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="100"/>
        <source>Source Images Not Found</source>
        <translation>Source Images Not Found</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="111"/>
        <source>Select Source Images Folder</source>
        <translation>Select Source Images Folder</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="143"/>
        <source>Some Images Still Missing</source>
        <translation>Some Images Still Missing</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="145"/>
        <source>Found {found} of {total} images.

Still missing:
{missing}</source>
        <translation>Found {found} of {total} images.

Still missing:
{missing}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="175"/>
        <source>{count} detection mask(s) not found at expected locations:

{files}

Please select the folder containing the mask files.</source>
        <translation>{count} detection mask(s) not found at expected locations:

{files}

Please select the folder containing the mask files.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="183"/>
        <source>Detection Masks Not Found</source>
        <translation>Detection Masks Not Found</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="194"/>
        <source>Select Masks Folder</source>
        <translation>Select Masks Folder</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="226"/>
        <source>Some Masks Still Missing</source>
        <translation>Some Masks Still Missing</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="228"/>
        <source>Found {found} of {total} masks.

Still missing:
{missing}</source>
        <translation>Found {found} of {total} masks.

Still missing:
{missing}</translation>
    </message>
</context>
<context>
    <name>Preferences</name>
    <message>
        <location filename="../resources/views/Preferences.ui" line="14"/>
        <source>Preferences</source>
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="48"/>
        <source>Select the application theme appearance.
Changes the overall color scheme and visual style.</source>
        <translation>Select the application theme appearance.
Changes the overall color scheme and visual style.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="52"/>
        <source>Theme:</source>
        <translation>Theme:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="64"/>
        <source>Choose the application theme:
• Light: Bright theme with light backgrounds and dark text
• Dark: Dark theme with dark backgrounds and light text
Changes apply immediately to all windows.</source>
        <translation>Choose the application theme:
• Light: Bright theme with light backgrounds and dark text
• Dark: Dark theme with dark backgrounds and light text
Changes apply immediately to all windows.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="71"/>
        <source>Light</source>
        <translation>Light</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="76"/>
        <source>Dark</source>
        <translation>Dark</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="107"/>
        <source>Warning threshold for total AOIs detected across all images.
Prompts user when this limit is reached during processing.</source>
        <translation>Warning threshold for total AOIs detected across all images.
Prompts user when this limit is reached during processing.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="111"/>
        <source>Max Areas of Interest: </source>
        <translation>Max Areas of Interest: </translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="123"/>
        <source>Set the warning threshold for total AOIs detected during processing.
• Range: 0 to 1000
• Default: 100
When this number of AOIs is detected across all images:
• UI displays a warning message
• User can cancel processing, adjust settings, and rerun
• If no action taken, detection continues automatically
Use lower values to catch high detection counts early.</source>
        <translation>Set the warning threshold for total AOIs detected during processing.
• Range: 0 to 1000
• Default: 100
When this number of AOIs is detected across all images:
• UI displays a warning message
• User can cancel processing, adjust settings, and rerun
• If no action taken, detection continues automatically
Use lower values to catch high detection counts early.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="154"/>
        <source>Radius for combining neighboring AOIs into single detections.
AOIs within this distance are merged together.</source>
        <translation>Radius for combining neighboring AOIs into single detections.
AOIs within this distance are merged together.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="158"/>
        <source>Area of Interest Circle Radius(px):</source>
        <translation>Area of Interest Circle Radius(px):</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="170"/>
        <source>Set the radius for combining nearby AOIs during detection.
• Range: 0 to 100 pixels
• Default: 25 pixels
When AOIs are within this radius of each other:
• They are combined into a single AOI
• Process repeats until no neighbors remain within radius
• Larger values: Combines more distant detections (fewer total AOIs)
• Smaller values: Keeps detections separate (more individual AOIs)
Use to consolidate clustered detections into single objects.</source>
        <translation>Set the radius for combining nearby AOIs during detection.
• Range: 0 to 100 pixels
• Default: 25 pixels
When AOIs are within this radius of each other:
• They are combined into a single AOI
• Process repeats until no neighbors remain within radius
• Larger values: Combines more distant detections (fewer total AOIs)
• Smaller values: Keeps detections separate (more individual AOIs)
Use to consolidate clustered detections into single objects.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="202"/>
        <source>Format for displaying geographic coordinates throughout the application.
Affects how GPS locations are shown in the viewer and exports.</source>
        <translation>Format for displaying geographic coordinates throughout the application.
Affects how GPS locations are shown in the viewer and exports.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="206"/>
        <source>Coordinate System:</source>
        <translation>Coordinate System:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="218"/>
        <source>Select the geographic coordinate display format:
• Lat/Long - Decimal Degrees: 34.123456, -118.987654 (most common, easy to use)
• Lat/Long - Degrees, Minutes, Seconds: 34° 7&apos; 24.4416&quot; N, 118° 59&apos; 15.5424&quot; W (traditional navigation)
• UTM: Universal Transverse Mercator grid system with zone, easting, northing (military, surveying)
This setting affects coordinate display in the viewer, exports, and overlays.</source>
        <translation>Select the geographic coordinate display format:
• Lat/Long - Decimal Degrees: 34.123456, -118.987654 (most common, easy to use)
• Lat/Long - Degrees, Minutes, Seconds: 34° 7&apos; 24.4416&quot; N, 118° 59&apos; 15.5424&quot; W (traditional navigation)
• UTM: Universal Transverse Mercator grid system with zone, easting, northing (military, surveying)
This setting affects coordinate display in the viewer, exports, and overlays.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="226"/>
        <source>Lat/Long - Decimal Degrees</source>
        <translation>Lat/Long - Decimal Degrees</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="231"/>
        <source>Lat/Long - Degrees, Minutes, Seconds</source>
        <translation>Lat/Long - Degrees, Minutes, Seconds</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="236"/>
        <source>UTM</source>
        <translation>UTM</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="255"/>
        <source>Unit for displaying temperature measurements from thermal imagery.
Used when analyzing thermal images from thermal cameras.</source>
        <translation>Unit for displaying temperature measurements from thermal imagery.
Used when analyzing thermal images from thermal cameras.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="259"/>
        <source>Temperature Unit:</source>
        <translation>Temperature Unit:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="271"/>
        <source>Select the temperature unit for thermal image analysis:
• Fahrenheit (°F): Imperial temperature scale (US standard)
  - Water freezes at 32°F, boils at 212°F
• Celsius (°C): Metric temperature scale (international standard)
  - Water freezes at 0°C, boils at 100°C
Applies to thermal camera data display and analysis results.</source>
        <translation>Select the temperature unit for thermal image analysis:
• Fahrenheit (°F): Imperial temperature scale (US standard)
  - Water freezes at 32°F, boils at 212°F
• Celsius (°C): Metric temperature scale (international standard)
  - Water freezes at 0°C, boils at 100°C
Applies to thermal camera data display and analysis results.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="280"/>
        <source>Fahrenheit</source>
        <translation>Fahrenheit</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="285"/>
        <source>Celsius</source>
        <translation>Celsius</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="304"/>
        <source>Unit for displaying distance and altitude measurements.
Used for drone altitude, object distances, and spatial calculations.</source>
        <translation>Unit for displaying distance and altitude measurements.
Used for drone altitude, object distances, and spatial calculations.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="308"/>
        <source>Distance Unit:</source>
        <translation>Distance Unit:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="320"/>
        <source>Select the distance unit for measurements:
• Meters (m): Metric distance unit (international standard)
  - 1 meter = 3.281 feet
  - Used for altitude, GSD, and distance calculations
• Feet (ft): Imperial distance unit (US standard)
  - 1 foot = 0.3048 meters
  - Common in US aviation and surveying
Applies to altitude displays, GSD calculations, and distance measurements.</source>
        <translation>Select the distance unit for measurements:
• Meters (m): Metric distance unit (international standard)
  - 1 meter = 3.281 feet
  - Used for altitude, GSD, and distance calculations
• Feet (ft): Imperial distance unit (US standard)
  - 1 foot = 0.3048 meters
  - Common in US aviation and surveying
Applies to altitude displays, GSD calculations, and distance measurements.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="331"/>
        <source>Meters</source>
        <translation>Meters</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="336"/>
        <source>Feet</source>
        <translation>Feet</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="355"/>
        <source>Toggle Offline Only mode.
When enabled, the app skips any network calls (map tiles, CalTopo exports) and works with cached data only.</source>
        <translation>Toggle Offline Only mode.
When enabled, the app skips any network calls (map tiles, CalTopo exports) and works with cached data only.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="359"/>
        <source>Offline Only Mode:</source>
        <translation>Offline Only Mode:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="371"/>
        <source>Disable online functionality (tile downloads, CalTopo integration) and work entirely offline.</source>
        <translation>Disable online functionality (tile downloads, CalTopo integration) and work entirely offline.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="374"/>
        <location filename="../resources/views/Preferences.ui" line="415"/>
        <source>Enable</source>
        <translation>Enable</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="392"/>
        <source>Use terrain elevation data (DTM/DSM) for more accurate AOI GPS coordinate calculations.
When enabled, uses online elevation data to account for terrain variations.
When disabled, assumes flat terrain at takeoff altitude.</source>
        <translation>Use terrain elevation data (DTM/DSM) for more accurate AOI GPS coordinate calculations.
When enabled, uses online elevation data to account for terrain variations.
When disabled, assumes flat terrain at takeoff altitude.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="397"/>
        <source>Use Terrain Elevation:</source>
        <translation>Use Terrain Elevation:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="409"/>
        <source>Enable terrain-corrected AOI positioning using DTM/DSM elevation data.
• When enabled: Downloads and caches elevation tiles for accurate positioning
• When disabled: Uses flat terrain assumption (faster, works offline)
Terrain data is cached locally and works offline after first download.</source>
        <translation>Enable terrain-corrected AOI positioning using DTM/DSM elevation data.
• When enabled: Downloads and caches elevation tiles for accurate positioning
• When disabled: Uses flat terrain assumption (faster, works offline)
Terrain data is cached locally and works offline after first download.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="433"/>
        <source>Manage the terrain elevation data cache.
Terrain tiles are downloaded and stored locally for offline use.</source>
        <translation>Manage the terrain elevation data cache.
Terrain tiles are downloaded and stored locally for offline use.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="437"/>
        <source>Terrain Cache:</source>
        <translation>Terrain Cache:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="449"/>
        <source>0 tiles (0 MB)</source>
        <translation>0 tiles (0 MB)</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="474"/>
        <source>Clear all cached terrain elevation tiles.
This will require re-downloading tiles when terrain elevation is used.</source>
        <translation>Clear all cached terrain elevation tiles.
This will require re-downloading tiles when terrain elevation is used.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="478"/>
        <source>Clear Cache</source>
        <translation>Clear Cache</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="510"/>
        <source>Version of the current drone sensor configuration file.
Contains camera specifications, sensor dimensions, and focal length data for different drone models.</source>
        <translation>Version of the current drone sensor configuration file.
Contains camera specifications, sensor dimensions, and focal length data for different drone models.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="514"/>
        <source>Drone Sensor File Version:</source>
        <translation>Drone Sensor File Version:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="539"/>
        <source>Currently loaded drone sensor file version number.
The sensor file defines camera parameters for accurate GSD and AOI calculations.</source>
        <translation>Currently loaded drone sensor file version number.
The sensor file defines camera parameters for accurate GSD and AOI calculations.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="543"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="571"/>
        <source>Replace the current drone sensor configuration file.
Allows updating to a newer version or custom sensor specifications.
Required file format: JSON with drone models, sensors, focal lengths, and dimensions.
Use this when:
• New drone models are available
• Sensor specifications need updating
• Custom camera configurations are needed
Backup existing file before replacing.</source>
        <translation>Replace the current drone sensor configuration file.
Allows updating to a newer version or custom sensor specifications.
Required file format: JSON with drone models, sensors, focal lengths, and dimensions.
Use this when:
• New drone models are available
• Sensor specifications need updating
• Custom camera configurations are needed
Backup existing file before replacing.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="581"/>
        <source>Replace</source>
        <translation>Replace</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="601"/>
        <source>Close the Preferences window.
All changes are saved automatically when modified.</source>
        <translation>Close the Preferences window.
All changes are saved automatically when modified.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="51"/>
        <source>Language:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="99"/>
        <location filename="../app/core/controllers/Preferences.py" line="252"/>
        <source>{version}_{date}</source>
        <translation>{version}_{date}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="183"/>
        <source>{tiles} tiles ({size_mb:.1f} MB)</source>
        <translation>{tiles} tiles ({size_mb:.1f} MB)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="189"/>
        <source>Not available</source>
        <translation>Not available</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="191"/>
        <location filename="../app/core/controllers/Preferences.py" line="199"/>
        <location filename="../app/core/controllers/Preferences.py" line="227"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="200"/>
        <source>Terrain service not available.</source>
        <translation>Terrain service not available.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="206"/>
        <source>Clear Terrain Cache</source>
        <translation>Clear Terrain Cache</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="208"/>
        <source>Are you sure you want to clear all cached terrain elevation data?

This will require re-downloading tiles when terrain elevation is used.</source>
        <translation>Are you sure you want to clear all cached terrain elevation data?

This will require re-downloading tiles when terrain elevation is used.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="221"/>
        <source>Cache Cleared</source>
        <translation>Cache Cleared</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="222"/>
        <source>Cleared {count} cached terrain tiles.</source>
        <translation>Cleared {count} cached terrain tiles.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="228"/>
        <source>Failed to clear cache: {error}</source>
        <translation>Failed to clear cache: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="238"/>
        <source>Select a Drone Sensor File</source>
        <translation>Select a Drone Sensor File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="240"/>
        <source>Pickle Files (*.pkl)</source>
        <translation>Pickle Files (*.pkl)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="267"/>
        <source>Restart Required</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Preferences.py" line="268"/>
        <source>Please restart the application for language changes to take effect.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>QtImageViewer</name>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/QtImageViewer.py" line="313"/>
        <source>Open image</source>
        <translation>Open image</translation>
    </message>
</context>
<context>
    <name>RXAnomaly</name>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="29"/>
        <source>Number of segments to divide each image into for analysis.
The RX algorithm analyzes each segment independently to detect local anomalies.
Performance impact:
• Higher number of segments: INCREASES processing time (more segments to analyze)
• Lower number of segments: DECREASES processing time (fewer segments to analyze)
• 1 segment: Fastest processing (analyzes whole image once)
Higher segment counts improve detection in images with varying backgrounds.</source>
        <translation>Number of segments to divide each image into for analysis.
The RX algorithm analyzes each segment independently to detect local anomalies.
Performance impact:
• Higher number of segments: INCREASES processing time (more segments to analyze)
• Lower number of segments: DECREASES processing time (fewer segments to analyze)
• 1 segment: Fastest processing (analyzes whole image once)
Higher segment counts improve detection in images with varying backgrounds.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="38"/>
        <source>Image Segments:</source>
        <translation>Image Segments:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="62"/>
        <source>Select the number of segments to divide each image into.
• Options: 1, 2, 4, 6, 9, 16, 25, 36 segments
• Default: 1 (analyze entire image as one segment)
The RX Anomaly algorithm uses statistical analysis to detect unusual pixels:
• 1 segment: Analyzes the whole image at once (best for small images)
• More segments: Analyzes local regions independently (better for large images)
Higher segment counts improve detection in images with varying backgrounds.
Recommended: 4-9 segments for typical drone imagery.</source>
        <translation>Select the number of segments to divide each image into.
• Options: 1, 2, 4, 6, 9, 16, 25, 36 segments
• Default: 1 (analyze entire image as one segment)
The RX Anomaly algorithm uses statistical analysis to detect unusual pixels:
• 1 segment: Analyzes the whole image at once (best for small images)
• More segments: Analyzes local regions independently (better for large images)
Higher segment counts improve detection in images with varying backgrounds.
Recommended: 4-9 segments for typical drone imagery.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="73"/>
        <source>1</source>
        <translation>1</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="78"/>
        <source>2</source>
        <translation>2</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="83"/>
        <source>4</source>
        <translation>4</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="88"/>
        <source>6</source>
        <translation>6</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="93"/>
        <source>9</source>
        <translation>9</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="98"/>
        <source>16</source>
        <translation>16</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="103"/>
        <source>25</source>
        <translation>25</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="108"/>
        <source>36</source>
        <translation>36</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="137"/>
        <source>Detection sensitivity for anomaly detection.
• Range: 1 to 10
• Default: 5
Controls how statistically different a pixel must be from the background to be detected:
• Lower values (1-3): DECREASE detections - less sensitive, only detects strong anomalies
• Higher values (7-10): INCREASE detections - more sensitive, detects subtle anomalies
Higher sensitivity finds more potential targets but may include noise/false positives.</source>
        <translation>Detection sensitivity for anomaly detection.
• Range: 1 to 10
• Default: 5
Controls how statistically different a pixel must be from the background to be detected:
• Lower values (1-3): DECREASE detections - less sensitive, only detects strong anomalies
• Higher values (7-10): INCREASE detections - more sensitive, detects subtle anomalies
Higher sensitivity finds more potential targets but may include noise/false positives.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="146"/>
        <source>Sensitivity:</source>
        <translation>Sensitivity:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="159"/>
        <source>Adjust the detection sensitivity for anomaly detection.
• Range: 1 to 10
• Default: 5
The RX algorithm uses statistical analysis to find pixels that differ from the background:
• Lower values (1-3): Less sensitive, only detects strong anomalies (fewer false positives)
• Medium values (4-6): Balanced detection (recommended for most cases)
• Higher values (7-10): More sensitive, detects subtle anomalies (more detections, may include noise)
Anomalies are pixels that are statistically different from the surrounding background.
Use lower sensitivity for clean images, higher for finding subtle targets.</source>
        <translation>Adjust the detection sensitivity for anomaly detection.
• Range: 1 to 10
• Default: 5
The RX algorithm uses statistical analysis to find pixels that differ from the background:
• Lower values (1-3): Less sensitive, only detects strong anomalies (fewer false positives)
• Medium values (4-6): Balanced detection (recommended for most cases)
• Higher values (7-10): More sensitive, detects subtle anomalies (more detections, may include noise)
Anomalies are pixels that are statistically different from the surrounding background.
Use lower sensitivity for clean images, higher for finding subtle targets.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="205"/>
        <source>Current sensitivity level for anomaly detection.
Displays the value selected on the sensitivity slider (1-10).</source>
        <translation>Current sensitivity level for anomaly detection.
Displays the value selected on the sensitivity slider (1-10).</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="209"/>
        <source>5</source>
        <translation>5</translation>
    </message>
</context>
<context>
    <name>RXAnomalyWizard</name>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="29"/>
        <source>Do your images contain complex scenes with buildings, vehicles, or mixed manmade ground cover?</source>
        <translation>Do your images contain complex scenes with buildings, vehicles, or mixed manmade ground cover?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="49"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="64"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="100"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>How aggressively should ADIAT be searching for anomalies?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="113"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Note: A higher setting will find more potential anomalies but may also increase false positives.</translation>
    </message>
</context>
<context>
    <name>RXAnomalyWizardController</name>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="50"/>
        <source>Very 
Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="51"/>
        <source>Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="52"/>
        <source>Moderate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="53"/>
        <source>Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="54"/>
        <source>Very 
Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>RecentColorWidget</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="68"/>
        <source>&lt;b&gt;RGB:&lt;/b&gt; ({r}, {g}, {b})</source>
        <translation>&lt;b&gt;RGB:&lt;/b&gt; ({r}, {g}, {b})</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="97"/>
        <source>&lt;br&gt;&lt;b&gt;H (°):&lt;/b&gt; {min}-{max}</source>
        <translation>&lt;br&gt;&lt;b&gt;H (°):&lt;/b&gt; {min}-{max}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="100"/>
        <source> &lt;b&gt;S (%):&lt;/b&gt; {min}-{max}</source>
        <translation> &lt;b&gt;S (%):&lt;/b&gt; {min}-{max}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="103"/>
        <source> &lt;b&gt;V (%):&lt;/b&gt; {min}-{max}</source>
        <translation> &lt;b&gt;V (%):&lt;/b&gt; {min}-{max}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="112"/>
        <source>&lt;br&gt;&lt;b&gt;R:&lt;/b&gt; {min}-{max}</source>
        <translation>&lt;br&gt;&lt;b&gt;R:&lt;/b&gt; {min}-{max}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="115"/>
        <source> &lt;b&gt;G:&lt;/b&gt; {min}-{max}</source>
        <translation> &lt;b&gt;G:&lt;/b&gt; {min}-{max}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="118"/>
        <source> &lt;b&gt;B:&lt;/b&gt; {min}-{max}</source>
        <translation> &lt;b&gt;B:&lt;/b&gt; {min}-{max}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="124"/>
        <source>&lt;br&gt;&lt;b&gt;Threshold:&lt;/b&gt; {value}</source>
        <translation>&lt;br&gt;&lt;b&gt;Threshold:&lt;/b&gt; {value}</translation>
    </message>
</context>
<context>
    <name>RecentColorsDialog</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="151"/>
        <source>Recent Colors</source>
        <translation>Recent Colors</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="162"/>
        <source>Select a recently used color:</source>
        <translation>Select a recently used color:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="178"/>
        <source>No recent colors found</source>
        <translation>No recent colors found</translation>
    </message>
</context>
<context>
    <name>ResultsFolderDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="115"/>
        <source>Load Results Folder</source>
        <translation>Load Results Folder</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="124"/>
        <source>Found {count} result(s)</source>
        <translation>Found {count} result(s)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="132"/>
        <source>Folder</source>
        <translation>Folder</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="132"/>
        <source>Algorithm</source>
        <translation>Algorithm</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="132"/>
        <source>Images</source>
        <translation>Images</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>Missing</source>
        <translation>Missing</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>AOIs</source>
        <translation>AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>Map</source>
        <translation>Map</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>View</source>
        <translation>View</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="170"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="216"/>
        <source>Open in Google Maps</source>
        <translation>Open in Google Maps</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="226"/>
        <source>No images available - cannot get GPS location</source>
        <translation>No images available - cannot get GPS location</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="228"/>
        <source>No GPS coordinates found in images</source>
        <translation>No GPS coordinates found in images</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="248"/>
        <source>Open in Results Viewer</source>
        <translation>Open in Results Viewer</translation>
    </message>
</context>
<context>
    <name>ReviewOrNewPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="70"/>
        <source>No file selected</source>
        <translation>No file selected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="114"/>
        <source>Select ADIAT Results File</source>
        <translation>Select ADIAT Results File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="116"/>
        <source>XML Files (*.xml);;All Files (*)</source>
        <translation>XML Files (*.xml);;All Files (*)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="125"/>
        <source>File Name Warning</source>
        <translation>File Name Warning</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="127"/>
        <source>The selected file does not appear to be an ADIAT_Data.xml file.

Do you want to continue with this file?</source>
        <translation>The selected file does not appear to be an ADIAT_Data.xml file.

Do you want to continue with this file?</translation>
    </message>
</context>
<context>
    <name>ReviewerNameDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="25"/>
        <source>Reviewer Name</source>
        <translation>Reviewer Name</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="45"/>
        <source>Review Tracking</source>
        <translation>Review Tracking</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="51"/>
        <source>Enter your name to track your review activity.
This helps coordinate reviews across multiple reviewers.</source>
        <translation>Enter your name to track your review activity.
This helps coordinate reviews across multiple reviewers.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="60"/>
        <source>Your Name:</source>
        <translation>Your Name:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="64"/>
        <source>Enter your name</source>
        <translation>Enter your name</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="65"/>
        <source>Enter your full name or identifier for review tracking</source>
        <translation>Enter your full name or identifier for review tracking</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="71"/>
        <source>Remember my name</source>
        <translation>Remember my name</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="74"/>
        <source>Save your name for future review sessions.
You can change it later in Preferences or by clicking the reviewer name in the viewer.</source>
        <translation>Save your name for future review sessions.
You can change it later in Preferences or by clicking the reviewer name in the viewer.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="86"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="91"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="123"/>
        <source>Name Required</source>
        <translation>Name Required</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="124"/>
        <source>Please enter your name to continue.</source>
        <translation>Please enter your name to continue.</translation>
    </message>
</context>
<context>
    <name>ScanProgressDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="51"/>
        <source>Scanning for Results</source>
        <translation>Scanning for Results</translation>
    </message>
</context>
<context>
    <name>StatusController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="44"/>
        <source>GPS Coordinates</source>
        <translation>GPS Coordinates</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="45"/>
        <source>Relative Altitude</source>
        <translation>Relative Altitude</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="46"/>
        <source>Gimbal Orientation</source>
        <translation>Gimbal Orientation</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="47"/>
        <source>Estimated Average GSD</source>
        <translation>Estimated Average GSD</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="48"/>
        <source>Temperature</source>
        <translation>Temperature</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="49"/>
        <source>Color Values</source>
        <translation>Color Values</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="50"/>
        <source>Drone Orientation</source>
        <translation>Drone Orientation</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="115"/>
        <source>Error Loading Images</source>
        <translation>Error Loading Images</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="121"/>
        <source>No active images available.</source>
        <translation>No active images available.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="125"/>
        <source>No other images available.</source>
        <translation>No other images available.</translation>
    </message>
</context>
<context>
    <name>StreamAlgorithmPage</name>
    <message>
        <source>Are you looking for specific colors?</source>
        <translation type="vanished">Are you looking for specific colors?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="90"/>
        <source>Are you primarily looking for a person?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="156"/>
        <source>Do you know a distinctive target color?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="181"/>
        <source>Color Detection</source>
        <translation>Color Detection</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="182"/>
        <source>Color Anomaly &amp; Motion Detection</source>
        <translation>Color Anomaly &amp; Motion Detection</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="183"/>
        <source>AI Person Detector</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="186"/>
        <source>Selected Algorithm: {algorithm}</source>
        <translation>Selected Algorithm: {algorithm}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="191"/>
        <source>{result}
Secondary Recommendation: {secondary}</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>StreamAlgorithmParametersPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="181"/>
        <source>Color Detection</source>
        <translation>Color Detection</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="182"/>
        <source>Color Anomaly &amp; Motion Detection</source>
        <translation>Color Anomaly &amp; Motion Detection</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="183"/>
        <source>AI Person Detector</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="190"/>
        <source>Algorithm</source>
        <translation>Algorithm</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="192"/>
        <source>{algorithm} Parameters</source>
        <translation>{algorithm} Parameters</translation>
    </message>
</context>
<context>
    <name>StreamConnectionPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="92"/>
        <source>Click Scan to find devices...</source>
        <translation>Click Scan to find devices...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="108"/>
        <source>480p</source>
        <translation>480p</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="109"/>
        <source>720p</source>
        <translation>720p</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="110"/>
        <source>1080p</source>
        <translation>1080p</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="111"/>
        <source>4K</source>
        <translation>4K</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="260"/>
        <source>Choose the video file you want to analyze. Use Browse to pick a file from disk.</source>
        <translation>Choose the video file you want to analyze. Use Browse to pick a file from disk.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="262"/>
        <source>Video File:</source>
        <translation>Video File:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="263"/>
        <source>Click Browse to select a video file...</source>
        <translation>Click Browse to select a video file...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="269"/>
        <source>Click Scan to detect available capture devices, then select one from the dropdown.</source>
        <translation>Click Scan to detect available capture devices, then select one from the dropdown.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="271"/>
        <source>Device:</source>
        <translation>Device:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="272"/>
        <source></source>
        <translation></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="292"/>
        <source>OpenCV not available</source>
        <translation>OpenCV not available</translation>
    </message>
    <message>
        <source>Device {index} ({width}x{height}, {backend})</source>
        <translation type="vanished">Device {index} ({width}x{height}, {backend})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="338"/>
        <source>Device {index} ({backend})</source>
        <translation>Device {index} ({backend})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="331"/>
        <source>No capture devices found</source>
        <translation>No capture devices found</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="278"/>
        <source>Enter the RTMP URL provided by your streaming server (rtmp://server:port/app/key).</source>
        <translation>Enter the RTMP URL provided by your streaming server (rtmp://server:port/app/key).</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="280"/>
        <source>Stream URL:</source>
        <translation>Stream URL:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="281"/>
        <source>rtmp://server:port/app/streamKey</source>
        <translation>rtmp://server:port/app/streamKey</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="298"/>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="301"/>
        <source>Scanning...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="325"/>
        <source>Scan</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="377"/>
        <source>Select Video File</source>
        <translation>Select Video File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="380"/>
        <source>Video Files (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm);;All Files (*)</source>
        <translation>Video Files (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm);;All Files (*)</translation>
    </message>
</context>
<context>
    <name>StreamControlWidget</name>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="815"/>
        <source>Stream Connection</source>
        <translation>Stream Connection</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="817"/>
        <source>Configure and connect to video source (file, HDMI capture, or RTMP stream)</source>
        <translation>Configure and connect to video source (file, HDMI capture, or RTMP stream)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="822"/>
        <source>Stream Type:</source>
        <translation>Stream Type:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="824"/>
        <source>File</source>
        <translation>File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="825"/>
        <source>HDMI Capture</source>
        <translation>HDMI Capture</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="826"/>
        <source>RTMP Stream</source>
        <translation>RTMP Stream</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="829"/>
        <source>Select the type of video source:
• File: Pre-recorded video file with timeline controls
• HDMI Capture: Live capture from HDMI capture device
• RTMP Stream: Real-time streaming from RTMP/HTTP source</source>
        <translation>Select the type of video source:
• File: Pre-recorded video file with timeline controls
• HDMI Capture: Live capture from HDMI capture device
• RTMP Stream: Real-time streaming from RTMP/HTTP source</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="838"/>
        <source>Stream URL/Path:</source>
        <translation>Stream URL/Path:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="845"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1044"/>
        <source>Click to browse for video file...</source>
        <translation>Click to browse for video file...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="849"/>
        <source>Enter or browse for the video source:
• File: Click to browse for video file (MP4, AVI, MOV, etc.)
• RTMP Stream: Enter RTMP URL (rtmp://server:port/app/stream)</source>
        <translation>Enter or browse for the video source:
• File: Click to browse for video file (MP4, AVI, MOV, etc.)
• RTMP Stream: Enter RTMP URL (rtmp://server:port/app/stream)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="858"/>
        <source>Select HDMI capture device</source>
        <translation>Select HDMI capture device</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="860"/>
        <source>Scanning for devices...</source>
        <translation>Scanning for devices...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="864"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="996"/>
        <source>Browse...</source>
        <translation>Browse...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="868"/>
        <source>Open file browser to select a video file for analysis.
Supported formats: MP4, AVI, MOV, MKV, FLV, WMV, M4V, 3GP, WebM</source>
        <translation>Open file browser to select a video file for analysis.
Supported formats: MP4, AVI, MOV, MKV, FLV, WMV, M4V, 3GP, WebM</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="875"/>
        <source>Scan...</source>
        <translation>Scan...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="877"/>
        <source>Scan for available HDMI capture devices</source>
        <translation>Scan for available HDMI capture devices</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="884"/>
        <source>Connect</source>
        <translation>Connect</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="887"/>
        <source>Connect to the specified video source and begin processing.</source>
        <translation>Connect to the specified video source and begin processing.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="889"/>
        <source>Disconnect</source>
        <translation>Disconnect</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="893"/>
        <source>Disconnect from the current video source and stop processing.</source>
        <translation>Disconnect from the current video source and stop processing.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="900"/>
        <source>Status: Disconnected</source>
        <translation>Status: Disconnected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="902"/>
        <source>Current connection status</source>
        <translation>Current connection status</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="905"/>
        <source>Performance</source>
        <translation>Performance</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="906"/>
        <source>Real-time performance metrics</source>
        <translation>Real-time performance metrics</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="910"/>
        <source>Video: --</source>
        <translation>Video: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="911"/>
        <source>Original video resolution</source>
        <translation>Original video resolution</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="912"/>
        <source>Processing: --</source>
        <translation>Processing: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="914"/>
        <source>Resolution used for detection processing</source>
        <translation>Resolution used for detection processing</translation>
    </message>
    <message>
        <source>Video FPS: --</source>
        <translation type="vanished">Video FPS: --</translation>
    </message>
    <message>
        <source>Native frame rate of the video source</source>
        <translation type="vanished">Native frame rate of the video source</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="918"/>
        <source>Source FPS: --</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="919"/>
        <source>Source frame rate and the applied processing cadence</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="920"/>
        <source>Proc FPS: --</source>
        <translation>Proc FPS: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="922"/>
        <source>Actual frames per second being processed</source>
        <translation>Actual frames per second being processed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="926"/>
        <source>Time: -- ms</source>
        <translation>Time: -- ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="928"/>
        <source>Time in milliseconds to process each frame</source>
        <translation>Time in milliseconds to process each frame</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="930"/>
        <source>Latency: -- ms</source>
        <translation>Latency: -- ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="932"/>
        <source>End-to-end latency from frame capture to display</source>
        <translation>End-to-end latency from frame capture to display</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="936"/>
        <source>Frames: --</source>
        <translation>Frames: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="937"/>
        <source>Total number of frames processed</source>
        <translation>Total number of frames processed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="938"/>
        <source>Detections: --</source>
        <translation>Detections: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="939"/>
        <source>Number of detections in current frame</source>
        <translation>Number of detections in current frame</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="953"/>
        <source>Recording</source>
        <translation>Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="958"/>
        <source>Start Recording</source>
        <translation>Start Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="961"/>
        <source>Start recording the video stream with detection overlays.</source>
        <translation>Start recording the video stream with detection overlays.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="963"/>
        <source>Stop Recording</source>
        <translation>Stop Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="966"/>
        <source>Stop the current recording and save to file.</source>
        <translation>Stop the current recording and save to file.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="973"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1161"/>
        <source>Status: Not Recording</source>
        <translation>Status: Not Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="976"/>
        <source>Current recording status and output file path</source>
        <translation>Current recording status and output file path</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="980"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1168"/>
        <source>Duration: --</source>
        <translation>Duration: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="982"/>
        <source>Recording statistics: Duration, FPS, Frames</source>
        <translation>Recording statistics: Duration, FPS, Frames</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="991"/>
        <source>Save to:</source>
        <translation>Save to:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="994"/>
        <source>Directory where video recordings will be saved.</source>
        <translation>Directory where video recordings will be saved.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="998"/>
        <source>Choose a folder to store recordings.</source>
        <translation>Choose a folder to store recordings.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1052"/>
        <source>rtmp://server:port/app/stream</source>
        <translation>rtmp://server:port/app/stream</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1069"/>
        <source>Invalid Device</source>
        <translation>Invalid Device</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1070"/>
        <source>Please select a valid HDMI capture device.</source>
        <translation>Please select a valid HDMI capture device.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1082"/>
        <source>Invalid URL</source>
        <translation>Invalid URL</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1083"/>
        <source>Please enter a valid stream URL.</source>
        <translation>Please enter a valid stream URL.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1100"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1113"/>
        <source>Status: {message}</source>
        <translation>Status: {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1149"/>
        <source>Status: Recording</source>
        <translation>Status: Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1153"/>
        <source>Output: {value}</source>
        <translation>Output: {value}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1165"/>
        <source>Duration: {value}</source>
        <translation>Duration: {value}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1194"/>
        <source>Select Recording Directory</source>
        <translation>Select Recording Directory</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1205"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1208"/>
        <source>Scanning...</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1232"/>
        <source>Scan</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1298"/>
        <source>Source FPS: {source:.1f} (Applied {applied:.1f})</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1305"/>
        <source>Source FPS: {fps:.1f}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <source>Device {index} ({width}x{height}, {backend})</source>
        <translation type="vanished">Device {index} ({width}x{height}, {backend})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1245"/>
        <source>Device {index} ({backend})</source>
        <translation>Device {index} ({backend})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1238"/>
        <source>No capture devices found</source>
        <translation>No capture devices found</translation>
    </message>
    <message>
        <source>Error scanning devices: {error}</source>
        <translation type="vanished">Error scanning devices: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1275"/>
        <source>Video: {width}x{height}</source>
        <translation>Video: {width}x{height}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1282"/>
        <source>Processing: {width}x{height}</source>
        <translation>Processing: {width}x{height}</translation>
    </message>
    <message>
        <source>Video FPS: {fps:.1f}</source>
        <translation type="vanished">Video FPS: {fps:.1f}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1308"/>
        <source>Proc FPS: {fps:.1f}</source>
        <translation>Proc FPS: {fps:.1f}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1316"/>
        <source>Time: {time:.1f} ms</source>
        <translation>Time: {time:.1f} ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1319"/>
        <source>Latency: {latency:.1f} ms</source>
        <translation>Latency: {latency:.1f} ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1327"/>
        <source>Frames: {count}</source>
        <translation>Frames: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1330"/>
        <source>Detections: {count}</source>
        <translation>Detections: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1337"/>
        <source>Select Video File</source>
        <translation>Select Video File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1340"/>
        <source>Video Files (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm *.mpg *.mpeg *.ts *.mts *.m2ts);;All Files (*)</source>
        <translation>Video Files (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm *.mpg *.mpeg *.ts *.mts *.m2ts);;All Files (*)</translation>
    </message>
</context>
<context>
    <name>StreamGeneralPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamGeneralPage.py" line="55"/>
        <source>Select Recording Folder</source>
        <translation>Select Recording Folder</translation>
    </message>
</context>
<context>
    <name>StreamTargetSizePage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="79"/>
        <source>Hat, Helmet, Plastic Bag</source>
        <translation>Hat, Helmet, Plastic Bag</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="80"/>
        <source>Cat, Daypack</source>
        <translation>Cat, Daypack</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="81"/>
        <source>Large Pack, Medium Dog</source>
        <translation>Large Pack, Medium Dog</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="82"/>
        <source>Sleeping Bag, Large Dog</source>
        <translation>Sleeping Bag, Large Dog</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="83"/>
        <source>Small Boat, 2-Person Tent</source>
        <translation>Small Boat, 2-Person Tent</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="84"/>
        <source>Car/SUV, Small Pickup Truck, Large Tent</source>
        <translation>Car/SUV, Small Pickup Truck, Large Tent</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="85"/>
        <source>House</source>
        <translation>House</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="90"/>
        <source>More Examples:</source>
        <translation>More Examples:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="103"/>
        <source>sqm</source>
        <translation>sqm</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="106"/>
        <source>sqft</source>
        <translation>sqft</translation>
    </message>
</context>
<context>
    <name>StreamViewerWindow</name>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="95"/>
        <source>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</source>
        <translation>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="186"/>
        <source>Live View</source>
        <translation>Live View</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="191"/>
        <source>Gallery</source>
        <translation>Gallery</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="232"/>
        <source>Menu</source>
        <translation>Menu</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="233"/>
        <source>Streaming Analysis Wizard</source>
        <translation>Streaming Analysis Wizard</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="234"/>
        <source>Image Analysis</source>
        <translation>Image Analysis</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="235"/>
        <source>Preferences</source>
        <translation>Preferences</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="242"/>
        <source>Help</source>
        <translation>Help</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="243"/>
        <source>Manual</source>
        <translation>Manual</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="244"/>
        <source>Community Forum</source>
        <translation>Community Forum</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="245"/>
        <source>YouTube Channel</source>
        <translation>YouTube Channel</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="268"/>
        <source>Start Recording</source>
        <translation>Start Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="271"/>
        <source>Start recording the video stream with detection overlays.</source>
        <translation>Start recording the video stream with detection overlays.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="273"/>
        <source>Stop Recording</source>
        <translation>Stop Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="276"/>
        <source>Stop the current recording and save to file.</source>
        <translation>Stop the current recording and save to file.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="283"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1777"/>
        <source>Status: Not Recording</source>
        <translation>Status: Not Recording</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="286"/>
        <source>Current recording status and output file path</source>
        <translation>Current recording status and output file path</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="290"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1779"/>
        <source>Duration: --</source>
        <translation>Duration: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="292"/>
        <source>Recording statistics: Duration, FPS, Frames</source>
        <translation>Recording statistics: Duration, FPS, Frames</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="297"/>
        <source>Save to:</source>
        <translation>Save to:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="301"/>
        <source>Directory where video recordings will be saved.</source>
        <translation>Directory where video recordings will be saved.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="303"/>
        <source>Browse...</source>
        <translation>Browse...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="305"/>
        <source>Choose a folder to store recordings.</source>
        <translation>Choose a folder to store recordings.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="356"/>
        <source>Select Recording Directory</source>
        <translation>Select Recording Directory</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="376"/>
        <source>Algorithm:</source>
        <translation>Algorithm:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="378"/>
        <source>Select which streaming detection algorithm to use</source>
        <translation>Select which streaming detection algorithm to use</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="384"/>
        <source>Choose which streaming detection algorithm to run.
• Color Anomaly &amp; Motion Detection: fused anomaly detectors
• Color Detection: color-based highlighting</source>
        <translation>Choose which streaming detection algorithm to run.
• Color Anomaly &amp; Motion Detection: fused anomaly detectors
• Color Detection: color-based highlighting</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="419"/>
        <source>Gallery Threshold:</source>
        <translation>Gallery Threshold:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="422"/>
        <source>Number of frames a detection must be seen before appearing in the Gallery tab</source>
        <translation>Number of frames a detection must be seen before appearing in the Gallery tab</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="429"/>
        <source> frames</source>
        <translation> frames</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="432"/>
        <source>Detections must be seen for this many consecutive frames
before appearing in the Gallery. Higher values reduce
false positives but delay detection appearance.</source>
        <translation>Detections must be seen for this many consecutive frames
before appearing in the Gallery. Higher values reduce
false positives but delay detection appearance.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="492"/>
        <source>Device {index}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="681"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="700"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="713"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="727"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="741"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="755"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1813"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="682"/>
        <source>Failed to open Streaming Analysis Guide:
{error}</source>
        <translation>Failed to open Streaming Analysis Guide:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="701"/>
        <source>Failed to open Image Analysis:
{error}</source>
        <translation>Failed to open Image Analysis:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="714"/>
        <source>Failed to open Preferences:
{error}</source>
        <translation>Failed to open Preferences:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="728"/>
        <source>Failed to open Help documentation:
{error}</source>
        <translation>Failed to open Help documentation:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="742"/>
        <source>Failed to open Community Forum:
{error}</source>
        <translation>Failed to open Community Forum:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="756"/>
        <source>Failed to open YouTube Channel:
{error}</source>
        <translation>Failed to open YouTube Channel:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="867"/>
        <source>Loaded: {algorithm}</source>
        <translation>Loaded: {algorithm}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="883"/>
        <source>Error loading algorithm: {error}</source>
        <translation>Error loading algorithm: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="887"/>
        <source>Algorithm Load Error</source>
        <translation>Algorithm Load Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1382"/>
        <source>Algorithm switched to {label}</source>
        <translation>Algorithm switched to {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1432"/>
        <source>No Stream Connected</source>
        <translation type="unfinished">No Stream Connected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1442"/>
        <source>{state} - {message}</source>
        <translation>{state} - {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1443"/>
        <source>Connected</source>
        <translation>Connected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1443"/>
        <source>Disconnected</source>
        <translation>Disconnected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1455"/>
        <source>✓ Connected: {message}</source>
        <translation>✓ Connected: {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1484"/>
        <source>✗ Disconnected: {message}</source>
        <translation>✗ Disconnected: {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1676"/>
        <source>No detections found.</source>
        <translation>No detections found.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1680"/>
        <source>Detection Results ({count} found):</source>
        <translation>Detection Results ({count} found):</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1692"/>
        <source>#{index}: Type({cls}) Pos({x},{y}) Size({w}x{h})</source>
        <translation>#{index}: Type({cls}) Pos({x},{y}) Size({w}x{h})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1702"/>
        <source>#{index}: Type({cls})</source>
        <translation>#{index}: Type({cls})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1707"/>
        <source> Conf({confidence:.2f})</source>
        <translation> Conf({confidence:.2f})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1752"/>
        <source>Recording started: {path}</source>
        <translation>Recording started: {path}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1759"/>
        <source>Recording stopped</source>
        <translation>Recording stopped</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1773"/>
        <source>Status: Recording to {path}</source>
        <translation>Status: Recording to {path}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1793"/>
        <source>Duration: {duration:.1f}s | FPS: {fps:.1f} | Frames: {frames} | Queue: {queue}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1811"/>
        <source>✗ Error: {error}</source>
        <translation>✗ Error: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1869"/>
        <source>Live Stream</source>
        <translation>Live Stream</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1871"/>
        <source>Cannot seek in live stream.

Detection was first seen at frame {frame}.</source>
        <translation>Cannot seek in live stream.

Detection was first seen at frame {frame}.</translation>
    </message>
</context>
<context>
    <name>StreamingGuide</name>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="14"/>
        <source>Streaming Setup Guide</source>
        <translation>Streaming Setup Guide</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="51"/>
        <source>Connect to Your Stream</source>
        <translation>Connect to Your Stream</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="115"/>
        <source>Pre-recorded video file with playback controls</source>
        <translation>Pre-recorded video file with playback controls</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="122"/>
        <source>File</source>
        <translation>File</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="161"/>
        <source>Live HDMI capture device (enter device index)</source>
        <translation>Live HDMI capture device (enter device index)</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="168"/>
        <source>HDMI</source>
        <translation>HDMI</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="204"/>
        <source>Network stream via RTMP URL</source>
        <translation>Network stream via RTMP URL</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="211"/>
        <source>RTMP</source>
        <translation>RTMP</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="254"/>
        <source>File: Use local video files (MP4, MOV, etc.) with timeline controls.</source>
        <translation>File: Use local video files (MP4, MOV, etc.) with timeline controls.</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="269"/>
        <source>HDMI: Connect to a live HDMI capture device.</source>
        <translation>HDMI: Connect to a live HDMI capture device.</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="284"/>
        <source>RTMP: Connect to a live network stream (rtmp://server:port/app/key).</source>
        <translation>RTMP: Connect to a live network stream (rtmp://server:port/app/key).</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="328"/>
        <source>Connection Details</source>
        <translation>Connection Details</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="347"/>
        <source>Provide the path or URL for your selected stream type. You can optionally auto-connect when the guide is finished.</source>
        <translation>Provide the path or URL for your selected stream type. You can optionally auto-connect when the guide is finished.</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="364"/>
        <source>Stream URL/Path:</source>
        <translation>Stream URL/Path:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="373"/>
        <source>Click Browse to select a file or enter a URL...</source>
        <translation>Click Browse to select a file or enter a URL...</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="385"/>
        <source>Browse...</source>
        <translation>Browse...</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="399"/>
        <source>Auto Connect:</source>
        <translation>Auto Connect:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="411"/>
        <source>Connect as soon as the guide finishes</source>
        <translation>Connect as soon as the guide finishes</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="423"/>
        <source>Capture Devices:</source>
        <translation>Capture Devices:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="444"/>
        <source>Scan...</source>
        <translation>Scan...</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="484"/>
        <source>Processing Resolution:</source>
        <translation>Processing Resolution:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="532"/>
        <source>Image Capture Information</source>
        <translation>Image Capture Information</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="554"/>
        <source>What drone/camera was used to capture images?</source>
        <translation>What drone/camera was used to capture images?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="584"/>
        <source>At what above ground level (AGL) altitude was the drone flying?</source>
        <translation>At what above ground level (AGL) altitude was the drone flying?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="636"/>
        <source>ft</source>
        <translation>ft</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="641"/>
        <source>m</source>
        <translation>m</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="679"/>
        <source>Estimated Ground Sampling Distance (GSD):</source>
        <translation>Estimated Ground Sampling Distance (GSD):</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="700"/>
        <source>&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0//EN&quot; &quot;http://www.w3.org/TR/REC-html40/strict.dtd&quot;&gt;
&lt;html&gt;&lt;head&gt;&lt;meta name=&quot;qrichtext&quot; content=&quot;1&quot; /&gt;&lt;meta charset=&quot;utf-8&quot; /&gt;&lt;style type=&quot;text/css&quot;&gt;
p, li { white-space: pre-wrap; }
hr { height: 1px; border-width: 0; }
li.unchecked::marker { content: &quot;\2610&quot;; }
li.checked::marker { content: &quot;\2612&quot;; }
&lt;/style&gt;&lt;/head&gt;&lt;body style=&quot; font-family:&apos;Segoe UI&apos;; font-size:11pt; font-weight:400; font-style:normal;&quot;&gt;
&lt;p style=&quot;-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px; font-family:&apos;MS Shell Dlg 2&apos;; font-size:9pt;&quot;&gt;&lt;br /&gt;&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0//EN&quot; &quot;http://www.w3.org/TR/REC-html40/strict.dtd&quot;&gt;
&lt;html&gt;&lt;head&gt;&lt;meta name=&quot;qrichtext&quot; content=&quot;1&quot; /&gt;&lt;meta charset=&quot;utf-8&quot; /&gt;&lt;style type=&quot;text/css&quot;&gt;
p, li { white-space: pre-wrap; }
hr { height: 1px; border-width: 0; }
li.unchecked::marker { content: &quot;\2610&quot;; }
li.checked::marker { content: &quot;\2612&quot;; }
&lt;/style&gt;&lt;/head&gt;&lt;body style=&quot; font-family:&apos;Segoe UI&apos;; font-size:11pt; font-weight:400; font-style:normal;&quot;&gt;
&lt;p style=&quot;-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px; font-family:&apos;MS Shell Dlg 2&apos;; font-size:9pt;&quot;&gt;&lt;br /&gt;&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="710"/>
        <source>--</source>
        <translation>--</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="749"/>
        <source>Search Target Size</source>
        <translation>Search Target Size</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="774"/>
        <source>Approximately how large are the objects you&apos;re wanting to identify?</source>
        <translation>Approximately how large are the objects you&apos;re wanting to identify?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="805"/>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;More Examples:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 sqft – Hat, Helmet, Plastic Bag &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 sqft – Cat, Daypack &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 sqft – Large Pack, Medium Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 sqft – Sleeping Bag, Large Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 sqft – Small Boat, 2-Person Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 sqft – Car/SUV, Small Pickup Truck, Large Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 sqft – House &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;More Examples:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 sqft – Hat, Helmet, Plastic Bag &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 sqft – Cat, Daypack &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 sqft – Large Pack, Medium Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 sqft – Sleeping Bag, Large Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 sqft – Small Boat, 2-Person Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 sqft – Car/SUV, Small Pickup Truck, Large Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 sqft – House &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="847"/>
        <source>Detection &amp; Processing</source>
        <translation>Detection &amp; Processing</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="869"/>
        <source>Are you looking for specific colors?</source>
        <translation>Are you looking for specific colors?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="914"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="945"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1018"/>
        <source>Reset</source>
        <translation>Reset</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1091"/>
        <source>Algorithm Parameters</source>
        <translation>Algorithm Parameters</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1126"/>
        <source>Close</source>
        <translation>Close</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1138"/>
        <source>Skip this streaming guide next time</source>
        <translation>Skip this streaming guide next time</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1166"/>
        <source>Back</source>
        <translation>Back</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1178"/>
        <location filename="../app/core/controllers/streaming/StreamingGuide.py" line="138"/>
        <source>Continue</source>
        <translation>Continue</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamingGuide.py" line="84"/>
        <source>ADIAT Streaming Setup Guide</source>
        <translation>ADIAT Streaming Setup Guide</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamingGuide.py" line="136"/>
        <source>Open Stream Viewer</source>
        <translation>Open Stream Viewer</translation>
    </message>
</context>
<context>
    <name>TargetSizePage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="79"/>
        <source>Hat, Helmet, Plastic Bag</source>
        <translation>Hat, Helmet, Plastic Bag</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="80"/>
        <source>Cat, Daypack</source>
        <translation>Cat, Daypack</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="81"/>
        <source>Large Pack, Medium Dog</source>
        <translation>Large Pack, Medium Dog</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="82"/>
        <source>Sleeping Bag, Large Dog</source>
        <translation>Sleeping Bag, Large Dog</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="83"/>
        <source>Small Boat, 2-Person Tent</source>
        <translation>Small Boat, 2-Person Tent</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="84"/>
        <source>Car/SUV, Small Pickup Truck, Large Tent</source>
        <translation>Car/SUV, Small Pickup Truck, Large Tent</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="85"/>
        <source>House</source>
        <translation>House</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="90"/>
        <source>More Examples:</source>
        <translation>More Examples:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="103"/>
        <source>sqm</source>
        <translation>sqm</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="106"/>
        <source>sqft</source>
        <translation>sqft</translation>
    </message>
</context>
<context>
    <name>TextLabeledSlider</name>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="238"/>
        <source>Very Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="239"/>
        <source>Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="240"/>
        <source>Moderate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="241"/>
        <source>Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="242"/>
        <source>Very Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ThermalAnomaly</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="29"/>
        <source>Type of thermal anomaly to detect in thermal imagery.
Determines whether to find hot spots, cold spots, or both.</source>
        <translation>Type of thermal anomaly to detect in thermal imagery.
Determines whether to find hot spots, cold spots, or both.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="33"/>
        <source>Anomaly Type:</source>
        <translation>Anomaly Type:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="45"/>
        <source>Select the type of thermal anomaly to detect:
• Above or Below Mean: Detects both hot and cold anomalies (default)
• Above Mean: Only detects hot spots (temperatures above average)
• Below Mean: Only detects cold spots (temperatures below average)
The algorithm compares each pixel&apos;s temperature to the mean temperature of its segment.
Use &quot;Above Mean&quot; for finding heat sources, &quot;Below Mean&quot; for cold objects.</source>
        <translation>Select the type of thermal anomaly to detect:
• Above or Below Mean: Detects both hot and cold anomalies (default)
• Above Mean: Only detects hot spots (temperatures above average)
• Below Mean: Only detects cold spots (temperatures below average)
The algorithm compares each pixel&apos;s temperature to the mean temperature of its segment.
Use &quot;Above Mean&quot; for finding heat sources, &quot;Below Mean&quot; for cold objects.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="54"/>
        <source>Above or Below Mean</source>
        <translation>Above or Below Mean</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="59"/>
        <source>Above Mean</source>
        <translation>Above Mean</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="64"/>
        <source>Below Mean</source>
        <translation>Below Mean</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="77"/>
        <source>Temperature threshold for detecting thermal anomalies.
Measured in standard deviations from the mean temperature.</source>
        <translation>Temperature threshold for detecting thermal anomalies.
Measured in standard deviations from the mean temperature.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="81"/>
        <source>Anomaly Threshold:</source>
        <translation>Anomaly Threshold:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="88"/>
        <source>Set the anomaly detection threshold in standard deviations.
• Range: 0 to 7 standard deviations
• Default: 4
Defines how different a temperature must be from the mean to be detected:
• Lower values (1-2): Very sensitive, detects subtle temperature differences (more detections)
• Medium values (3-5): Balanced detection (recommended for most cases)
• Higher values (6-7): Only detects extreme temperature differences (fewer detections)
Example: Value of 4 detects pixels 4 standard deviations above/below mean temperature.</source>
        <translation>Set the anomaly detection threshold in standard deviations.
• Range: 0 to 7 standard deviations
• Default: 4
Defines how different a temperature must be from the mean to be detected:
• Lower values (1-2): Very sensitive, detects subtle temperature differences (more detections)
• Medium values (3-5): Balanced detection (recommended for most cases)
• Higher values (6-7): Only detects extreme temperature differences (fewer detections)
Example: Value of 4 detects pixels 4 standard deviations above/below mean temperature.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="113"/>
        <source>Number of segments to divide each thermal image into for analysis.
Each segment is analyzed independently for local thermal anomalies.
Performance impact:
• Higher number of segments: INCREASES processing time (more segments to analyze)
• Lower number of segments: DECREASES processing time (fewer segments to analyze)
• 1 segment: Fastest processing (analyzes whole image once)
Higher segment counts improve detection in scenes with temperature gradients.</source>
        <translation>Number of segments to divide each thermal image into for analysis.
Each segment is analyzed independently for local thermal anomalies.
Performance impact:
• Higher number of segments: INCREASES processing time (more segments to analyze)
• Lower number of segments: DECREASES processing time (fewer segments to analyze)
• 1 segment: Fastest processing (analyzes whole image once)
Higher segment counts improve detection in scenes with temperature gradients.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="122"/>
        <source>Image Segments:</source>
        <translation>Image Segments:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="146"/>
        <source>Select the number of segments to divide each thermal image into.
• Options: 1, 2, 4, 6, 9, 16, 25, 36 segments
• Default: 1 (analyze entire image as one segment)
The algorithm calculates mean temperature for each segment independently:
• 1 segment: Global temperature analysis (best for uniform scenes)
• More segments: Local temperature analysis (better for varying backgrounds)
Higher segment counts improve detection in scenes with temperature gradients.
Recommended: 4-9 segments for typical thermal drone imagery.</source>
        <translation>Select the number of segments to divide each thermal image into.
• Options: 1, 2, 4, 6, 9, 16, 25, 36 segments
• Default: 1 (analyze entire image as one segment)
The algorithm calculates mean temperature for each segment independently:
• 1 segment: Global temperature analysis (best for uniform scenes)
• More segments: Local temperature analysis (better for varying backgrounds)
Higher segment counts improve detection in scenes with temperature gradients.
Recommended: 4-9 segments for typical thermal drone imagery.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="157"/>
        <source>1</source>
        <translation>1</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="162"/>
        <source>2</source>
        <translation>2</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="167"/>
        <source>4</source>
        <translation>4</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="172"/>
        <source>6</source>
        <translation>6</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="177"/>
        <source>9</source>
        <translation>9</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="182"/>
        <source>16</source>
        <translation>16</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="187"/>
        <source>25</source>
        <translation>25</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="192"/>
        <source>36</source>
        <translation>36</translation>
    </message>
</context>
<context>
    <name>ThermalAnomalyWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="37"/>
        <source>Do your images contain complex scenes with buildings, vehicles, or mixed manmade ground cover?</source>
        <translation>Do your images contain complex scenes with buildings, vehicles, or mixed manmade ground cover?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="57"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="72"/>
        <source>Yes</source>
        <translation>Yes</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="105"/>
        <source>What type of anomalies are you looking for?</source>
        <translation>What type of anomalies are you looking for?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="122"/>
        <source>Warmer than surroundings</source>
        <translation>Warmer than surroundings</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="134"/>
        <source>Cooler than surroundings</source>
        <translation>Cooler than surroundings</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="146"/>
        <source>Both</source>
        <translation>Both</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="185"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>How aggressively should ADIAT be searching for anomalies?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="198"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Note: A higher setting will find more potential anomalies but may also increase false positives.</translation>
    </message>
</context>
<context>
    <name>ThermalAnomalyWizardController</name>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="45"/>
        <source>Very 
Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="46"/>
        <source>Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="47"/>
        <source>Moderate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="48"/>
        <source>Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="49"/>
        <source>Very 
Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ThermalHistogramChart</name>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/ThermalHistogramChart.py" line="97"/>
        <source>No histogram data available</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/ThermalHistogramChart.py" line="435"/>
        <source>All Pixels</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/ThermalHistogramChart.py" line="446"/>
        <location filename="../app/core/views/images/viewer/widgets/ThermalHistogramChart.py" line="457"/>
        <source>AOI Pixels</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ThermalHistogramController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/ThermalHistogramController.py" line="32"/>
        <source>Thermal Histogram Unavailable</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/ThermalHistogramController.py" line="33"/>
        <source>No thermal temperature data is available for the current image.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ThermalHistogramDialog</name>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="14"/>
        <source>Thermal Histogram</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="23"/>
        <source>Gray bars show the full temperature distribution, orange bars mark AOI/anomaly bins, and hovering the chart highlights matching pixels in the image.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="32"/>
        <source>Drag on the histogram to zoom. Double-click or use Reset Zoom to return to the full range.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="52"/>
        <source>Reset Zoom</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="64"/>
        <source>Visible Temperature Range</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="75"/>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="59"/>
        <source>Minimum: --</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="82"/>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="60"/>
        <source>Maximum: --</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="105"/>
        <source>Reset Range</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/ThermalHistogramDialog.ui" line="117"/>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="61"/>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="126"/>
        <source>Hover over the histogram to inspect a temperature band.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="30"/>
        <source>No thermal histogram data available</source>
        <translation>No thermal histogram data available</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="131"/>
        <source>Hover band: {lower:.1f} to {upper:.1f} °{unit}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="141"/>
        <source>Minimum: {minimum:.1f} °{unit}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ThermalHistogramDialog.py" line="147"/>
        <source>Maximum: {maximum:.1f} °{unit}</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>ThermalRange</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="14"/>
        <source>Form</source>
        <translation>Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="29"/>
        <source>Minimum temperature threshold for detection in thermal images.
• Range: -30°C to 50°C
• Default: 35°C
Defines the lower bound of the temperature detection range:
• Lower values: INCREASE detections - accepts cooler objects
• Higher values: DECREASE detections - only warmer objects detected
Combined with Maximum Temp to create a detection range (e.g., 35-40°C for human body temperature).</source>
        <translation>Minimum temperature threshold for detection in thermal images.
• Range: -30°C to 50°C
• Default: 35°C
Defines the lower bound of the temperature detection range:
• Lower values: INCREASE detections - accepts cooler objects
• Higher values: DECREASE detections - only warmer objects detected
Combined with Maximum Temp to create a detection range (e.g., 35-40°C for human body temperature).</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="38"/>
        <source>Minimum Temp (°C)</source>
        <translation>Minimum Temp (°C)</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="50"/>
        <source>Set the minimum temperature for detection in Celsius.
• Range: -30°C to 50°C
• Default: 35°C
Pixels with temperatures at or above this threshold will be detected.
• Lower values: Detect cooler objects (more detections)
• Higher values: Only detect warmer objects (fewer detections)
Note: Temperature displayed in Celsius, converted based on Preferences setting.
Use for finding objects within a specific temperature range (e.g., people 35-40°C).</source>
        <translation>Set the minimum temperature for detection in Celsius.
• Range: -30°C to 50°C
• Default: 35°C
Pixels with temperatures at or above this threshold will be detected.
• Lower values: Detect cooler objects (more detections)
• Higher values: Only detect warmer objects (fewer detections)
Note: Temperature displayed in Celsius, converted based on Preferences setting.
Use for finding objects within a specific temperature range (e.g., people 35-40°C).</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="94"/>
        <source>Maximum temperature threshold for detection in thermal images.
• Range: -30°C to 93°C
• Default: 40°C
Defines the upper bound of the temperature detection range:
• Lower values: DECREASE detections - only cooler objects detected
• Higher values: INCREASE detections - accepts warmer objects
Combined with Minimum Temp to create a detection range (e.g., 35-40°C for human body temperature).</source>
        <translation>Maximum temperature threshold for detection in thermal images.
• Range: -30°C to 93°C
• Default: 40°C
Defines the upper bound of the temperature detection range:
• Lower values: DECREASE detections - only cooler objects detected
• Higher values: INCREASE detections - accepts warmer objects
Combined with Minimum Temp to create a detection range (e.g., 35-40°C for human body temperature).</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="103"/>
        <source>Maximum Temp (°C)</source>
        <translation>Maximum Temp (°C)</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="115"/>
        <source>Set the maximum temperature for detection in Celsius.
• Range: -30°C to 93°C
• Default: 40°C
Pixels with temperatures at or below this threshold will be detected.
• Lower values: Only detect cooler objects (fewer detections)
• Higher values: Detect warmer objects (more detections)
Note: Temperature displayed in Celsius, converted based on Preferences setting.
Detection occurs for pixels between minimum and maximum temperatures (inclusive).</source>
        <translation>Set the maximum temperature for detection in Celsius.
• Range: -30°C to 93°C
• Default: 40°C
Pixels with temperatures at or below this threshold will be detected.
• Lower values: Only detect cooler objects (fewer detections)
• Higher values: Detect warmer objects (more detections)
Note: Temperature displayed in Celsius, converted based on Preferences setting.
Detection occurs for pixels between minimum and maximum temperatures (inclusive).</translation>
    </message>
</context>
<context>
    <name>ThermalRangeController</name>
    <message>
        <location filename="../app/algorithms/images/ThermalRange/controllers/ThermalRangeController.py" line="108"/>
        <source>Minimum Temp ({degree} F)</source>
        <translation>Minimum Temp ({degree} F)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalRange/controllers/ThermalRangeController.py" line="114"/>
        <source>Maximum Temp ({degree} F)</source>
        <translation>Maximum Temp ({degree} F)</translation>
    </message>
</context>
<context>
    <name>ThermalRangeWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalRangeWizard.ui" line="34"/>
        <source>What range of temperatures should ADIAT look for?</source>
        <translation>What range of temperatures should ADIAT look for?</translation>
    </message>
</context>
<context>
    <name>ThermalResidualAnomaly</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="14"/>
        <source>Form</source>
        <translation type="unfinished">Form</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="29"/>
        <source>Type of local thermal residual anomaly to detect in radiometric imagery.
Determines whether to find warm anomalies, cool anomalies, or both.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="33"/>
        <source>Anomaly Type:</source>
        <translation type="unfinished">Anomaly Type:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="45"/>
        <source>Select the type of thermal residual anomaly to detect:
• Above or Below Mean: Detects both hot and cold anomalies (default)
• Above Mean: Only detects hot spots (temperatures above average)
• Below Mean: Only detects cold spots (temperatures below average)
The algorithm compares each pixel&apos;s temperature to its local background estimate.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="53"/>
        <source>Above or Below Mean</source>
        <translation type="unfinished">Above or Below Mean</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="58"/>
        <source>Above Mean</source>
        <translation type="unfinished">Above Mean</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="63"/>
        <source>Below Mean</source>
        <translation type="unfinished">Below Mean</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="92"/>
        <source>Detection sensitivity for thermal residual anomalies.
• Range: 1 to 10
• Default: 5
Lower values are more conservative (fewer detections).
Higher values are more aggressive (more detections).</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="99"/>
        <source>Sensitivity:</source>
        <translation type="unfinished">Sensitivity:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="112"/>
        <source>Adjust detection sensitivity for local thermal residual anomalies.
• 1-3: Conservative
• 4-6: Moderate
• 7-10: Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="153"/>
        <source>Current sensitivity level for residual anomaly detection.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomaly.ui" line="156"/>
        <source>5</source>
        <translation type="unfinished">5</translation>
    </message>
</context>
<context>
    <name>ThermalResidualAnomalyWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomalyWizard.ui" line="37"/>
        <source>What type of anomalies are you looking for?</source>
        <translation type="unfinished">What type of anomalies are you looking for?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomalyWizard.ui" line="54"/>
        <source>Warmer than surroundings</source>
        <translation type="unfinished">Warmer than surroundings</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomalyWizard.ui" line="66"/>
        <source>Cooler than surroundings</source>
        <translation type="unfinished">Cooler than surroundings</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomalyWizard.ui" line="78"/>
        <source>Both</source>
        <translation type="unfinished">Both</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomalyWizard.ui" line="117"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation type="unfinished">How aggressively should ADIAT be searching for anomalies?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalResidualAnomalyWizard.ui" line="130"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation type="unfinished">Note: A higher setting will find more potential anomalies but may also increase false positives.</translation>
    </message>
</context>
<context>
    <name>ThermalResidualAnomalyWizardController</name>
    <message>
        <location filename="../app/algorithms/images/ThermalResidualAnomaly/controllers/ThermalResidualAnomalyWizardController.py" line="33"/>
        <source>Very 
Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalResidualAnomaly/controllers/ThermalResidualAnomalyWizardController.py" line="34"/>
        <source>Conservative</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalResidualAnomaly/controllers/ThermalResidualAnomalyWizardController.py" line="35"/>
        <source>Moderate</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalResidualAnomaly/controllers/ThermalResidualAnomalyWizardController.py" line="36"/>
        <source>Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalResidualAnomaly/controllers/ThermalResidualAnomalyWizardController.py" line="37"/>
        <source>Very 
Aggressive</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>TrackGalleryWidget</name>
    <message>
        <location filename="../app/core/views/streaming/components/TrackGalleryWidget.py" line="149"/>
        <source>1 detection</source>
        <translation>1 detection</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/TrackGalleryWidget.py" line="151"/>
        <source>{count} detections</source>
        <translation>{count} detections</translation>
    </message>
</context>
<context>
    <name>UnifiedMapExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="382"/>
        <source>No Data Selected</source>
        <translation>No Data Selected</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="383"/>
        <source>Please select at least one type of data to export.</source>
        <translation>Please select at least one type of data to export.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="408"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="509"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="543"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="577"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="622"/>
        <source>Export Error</source>
        <translation>Export Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="409"/>
        <source>An error occurred during export:
{error}</source>
        <translation>An error occurred during export:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="426"/>
        <source>Save Map Export</source>
        <translation>Save Map Export</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="428"/>
        <source>KML files (*.kml)</source>
        <translation>KML files (*.kml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="510"/>
        <source>Failed to export to KML:
{error}</source>
        <translation>Failed to export to KML:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="544"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="578"/>
        <source>Failed to export to CalTopo:
{error}</source>
        <translation>Failed to export to CalTopo:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="594"/>
        <source>Map export completed successfully!</source>
        <translation>Map export completed successfully!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="609"/>
        <source>Map export cancelled</source>
        <translation>Map export cancelled</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="623"/>
        <source>Map export failed:
{error}</source>
        <translation>Map export failed:
{error}</translation>
    </message>
</context>
<context>
    <name>UpscaleDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="187"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="359"/>
        <source>Upscaled View - {level}x</source>
        <translation>Upscaled View - {level}x</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="229"/>
        <source>Upscale Method:</source>
        <translation>Upscale Method:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="264"/>
        <source>Upres Again</source>
        <translation>Upres Again</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="267"/>
        <source>Upscale the currently visible portion by {factor}x</source>
        <translation>Upscale the currently visible portion by {factor}x</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="271"/>
        <source>Quit</source>
        <translation>Quit</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="274"/>
        <source>Close this upscale window</source>
        <translation>Close this upscale window</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="367"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="379"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="459"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="524"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="556"/>
        <source>Upscale Error</source>
        <translation>Upscale Error</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="368"/>
        <source>Error during initial upscale: {error}</source>
        <translation>Error during initial upscale: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="380"/>
        <source>Unable to extract visible image portion.</source>
        <translation>Unable to extract visible image portion.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="389"/>
        <source>Maximum Upscale Reached</source>
        <translation>Maximum Upscale Reached</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="391"/>
        <source>Maximum upscale level of {level}x has been reached.
Further upscaling is not allowed to prevent memory issues.</source>
        <translation>Maximum upscale level of {level}x has been reached.
Further upscaling is not allowed to prevent memory issues.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="405"/>
        <source>Image Too Large</source>
        <translation>Image Too Large</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="407"/>
        <source>Upscaling would result in an image of {width}×{height} pixels.
Maximum allowed dimension is {max_dim} pixels.

Try zooming in to a smaller area before upscaling.</source>
        <translation>Upscaling would result in an image of {width}×{height} pixels.
Maximum allowed dimension is {max_dim} pixels.

Try zooming in to a smaller area before upscaling.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="418"/>
        <source>Image Too Small</source>
        <translation>Image Too Small</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="420"/>
        <source>Visible portion is too small ({width}×{height} pixels).
Please zoom in to a larger area before upscaling.</source>
        <translation>Visible portion is too small ({width}×{height} pixels).
Please zoom in to a larger area before upscaling.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="460"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="557"/>
        <source>An error occurred during upscaling:
{error}</source>
        <translation>An error occurred during upscaling:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="479"/>
        <source>Upscaling image with AI enhancement...
From {width}×{height} to {new_width}×{new_height} pixels
This may take a few seconds.</source>
        <translation>Upscaling image with AI enhancement...
From {width}×{height} to {new_width}×{new_height} pixels
This may take a few seconds.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="491"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="752"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="496"/>
        <source>Upscaling (OpenCV EDSR)</source>
        <translation>Upscaling (OpenCV EDSR)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="525"/>
        <source>Failed to start upscaling:
{error}</source>
        <translation>Failed to start upscaling:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="595"/>
        <source>Method Not Available</source>
        <translation>Method Not Available</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="597"/>
        <source>Real-ESRGAN is not yet implemented.
Falling back to Lanczos interpolation.</source>
        <translation>Real-ESRGAN is not yet implemented.
Falling back to Lanczos interpolation.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="751"/>
        <source>Downloading {model_name} model...</source>
        <translation>Downloading {model_name} model...</translation>
    </message>
</context>
<context>
    <name>VideoDisplayWidget</name>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="761"/>
        <source>No Stream Connected</source>
        <translation>No Stream Connected</translation>
    </message>
</context>
<context>
    <name>VideoParser</name>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="14"/>
        <source>Video Parser</source>
        <translation>Video Parser</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="45"/>
        <source>Path to the video file to extract frames from.
Supported formats: MP4, AVI, MOV, MKV, and other common video formats.
Click the Select button to browse for a video file.</source>
        <translation>Path to the video file to extract frames from.
Supported formats: MP4, AVI, MOV, MKV, and other common video formats.
Click the Select button to browse for a video file.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="62"/>
        <source>SRT subtitle file containing GPS telemetry and timestamp data.
Optional: Provides location information for extracted frames.
Without SRT file, frames will have no GPS metadata.</source>
        <translation>SRT subtitle file containing GPS telemetry and timestamp data.
Optional: Provides location information for extracted frames.
Without SRT file, frames will have no GPS metadata.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="67"/>
        <source>The SRT file contains timestamped information about the video file.  It is optional, but without it output images won&apos;t include location information.</source>
        <translation>The SRT file contains timestamped information about the video file.  It is optional, but without it output images won&apos;t include location information.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="70"/>
        <source>SRT File (optional): </source>
        <translation>SRT File (optional): </translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="82"/>
        <source>Destination folder where extracted frame images will be saved.
Each frame is saved as a separate image file with timestamp information.</source>
        <translation>Destination folder where extracted frame images will be saved.
Each frame is saved as a separate image file with timestamp information.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="86"/>
        <source>Output Folder:</source>
        <translation>Output Folder:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="98"/>
        <source>Path to the output folder for extracted frame images.
All frames will be saved in this directory with sequential naming.
Click the Select button to choose a different folder.</source>
        <translation>Path to the output folder for extracted frame images.
All frames will be saved in this directory with sequential naming.
Click the Select button to choose a different folder.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="115"/>
        <source>Browse for output folder to save extracted frames.
Opens a folder selection dialog.</source>
        <translation>Browse for output folder to save extracted frames.
Opens a folder selection dialog.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="119"/>
        <location filename="../resources/views/images/VideoParser.ui" line="161"/>
        <location filename="../resources/views/images/VideoParser.ui" line="199"/>
        <source>Select</source>
        <translation>Select</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="129"/>
        <source>folder.png</source>
        <translation>folder.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="141"/>
        <source>Select the source video file to parse.
Video will be split into individual frame images.</source>
        <translation>Select the source video file to parse.
Video will be split into individual frame images.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="145"/>
        <source>Video File:</source>
        <translation>Video File:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="157"/>
        <source>Browse for video file to extract frames from.
Opens a file selection dialog for video files (MP4, AVI, MOV, etc.).</source>
        <translation>Browse for video file to extract frames from.
Opens a file selection dialog for video files (MP4, AVI, MOV, etc.).</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="176"/>
        <source>Path to the optional SRT subtitle file with GPS telemetry data.
SRT files contain timestamp and location information for video frames.
If provided, extracted frames will include GPS metadata (latitude, longitude, altitude).
Can be left empty if location data is not needed.</source>
        <translation>Path to the optional SRT subtitle file with GPS telemetry data.
SRT files contain timestamp and location information for video frames.
If provided, extracted frames will include GPS metadata (latitude, longitude, altitude).
Can be left empty if location data is not needed.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="194"/>
        <source>Browse for optional SRT subtitle file containing GPS telemetry.
SRT files are commonly created by DJI drones and other video recording devices.
Opens a file selection dialog for SRT files.</source>
        <translation>Browse for optional SRT subtitle file containing GPS telemetry.
SRT files are commonly created by DJI drones and other video recording devices.
Opens a file selection dialog for SRT files.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="218"/>
        <source>Time interval between extracted frames.
Determines how frequently frames are captured from the video.
Smaller intervals = More frames extracted (larger output)</source>
        <translation>Time interval between extracted frames.
Determines how frequently frames are captured from the video.
Smaller intervals = More frames extracted (larger output)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="223"/>
        <source>Time Interval (seconds):</source>
        <translation>Time Interval (seconds):</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="235"/>
        <source>Set the time interval in seconds between frame extractions.
• Range: 0.1 to unlimited seconds
• Default: 5.0 seconds (extracts 1 frame every 5 seconds)
• Lower values: More frames extracted (e.g., 0.5s = 2 frames per second)
• Higher values: Fewer frames extracted (e.g., 10s = 1 frame every 10 seconds)
Recommendation: 3-5 seconds for most drone footage analysis</source>
        <translation>Set the time interval in seconds between frame extractions.
• Range: 0.1 to unlimited seconds
• Default: 5.0 seconds (extracts 1 frame every 5 seconds)
• Lower values: More frames extracted (e.g., 0.5s = 2 frames per second)
• Higher values: Fewer frames extracted (e.g., 10s = 1 frame every 10 seconds)
Recommendation: 3-5 seconds for most drone footage analysis</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="300"/>
        <source>Start extracting frames from the video file.
Requirements:
• Video file must be selected
• Output folder must be selected
• Time interval must be set (default: 5 seconds)
The process will extract frames at the specified interval and save them as images.
If SRT file is provided, GPS metadata will be embedded in the extracted frames.</source>
        <translation>Start extracting frames from the video file.
Requirements:
• Video file must be selected
• Output folder must be selected
• Time interval must be set (default: 5 seconds)
The process will extract frames at the specified interval and save them as images.
If SRT file is provided, GPS metadata will be embedded in the extracted frames.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="319"/>
        <source>Start</source>
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="350"/>
        <source>Cancel the frame extraction process.
Stops the operation immediately and returns to the ready state.
Any frames already extracted will be saved in the output folder.
Click to abort the current parsing operation.</source>
        <translation>Cancel the frame extraction process.
Stops the operation immediately and returns to the ready state.
Any frames already extracted will be saved in the output folder.
Click to abort the current parsing operation.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="359"/>
        <source> Cancel</source>
        <translation> Cancel</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="366"/>
        <source>cancel.png</source>
        <translation>cancel.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="396"/>
        <source>Progress and status output window.
Displays real-time information during frame extraction:
• Current frame being processed
• Frame timestamps and numbers
• GPS coordinates (if SRT file is provided)
• Progress percentage and completion status
• Any errors or warnings encountered
Shows total frames extracted when complete.</source>
        <translation>Progress and status output window.
Displays real-time information during frame extraction:
• Current frame being processed
• Frame timestamps and numbers
• GPS coordinates (if SRT file is provided)
• Progress percentage and completion status
• Any errors or warnings encountered
Shows total frames extracted when complete.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="57"/>
        <source>Select a Video File</source>
        <translation>Select a Video File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="72"/>
        <source>Select a SRT file</source>
        <translation>Select a SRT file</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="73"/>
        <source>SRT (*.srt)</source>
        <translation>SRT (*.srt)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="90"/>
        <source>Select Directory</source>
        <translation>Select Directory</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="110"/>
        <source>Please set the video file and output directory.</source>
        <translation>Please set the video file and output directory.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="115"/>
        <source>--- Starting video processing ---</source>
        <translation>--- Starting video processing ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="164"/>
        <source>Confirmation</source>
        <translation>Confirmation</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="165"/>
        <source>Are you sure you want to cancel the video processing in progress?</source>
        <translation>Are you sure you want to cancel the video processing in progress?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="201"/>
        <source>--- Video Processing Completed ---</source>
        <translation>--- Video Processing Completed ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="203"/>
        <source>{count} images created</source>
        <translation>{count} images created</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="256"/>
        <source>Error Starting Processing</source>
        <translation>Error Starting Processing</translation>
    </message>
</context>
<context>
    <name>Viewer</name>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="14"/>
        <source>Automated Drone Image Analysis Tool :: Viewer - Sponsored by TEXSAR</source>
        <translation>Automated Drone Image Analysis Tool :: Viewer - Sponsored by TEXSAR</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="112"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="133"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="902"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="1073"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="161"/>
        <source>View keyboard shortcuts and help</source>
        <translation>View keyboard shortcuts and help</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="199"/>
        <source>Toggle the detection overlay on the image.
When enabled, shows processed image with detected objects highlighted.
When disabled, shows the original unprocessed image.
Use to compare original image with detection results.</source>
        <translation>Toggle the detection overlay on the image.
When enabled, shows processed image with detected objects highlighted.
When disabled, shows the original unprocessed image.
Use to compare original image with detection results.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="205"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="360"/>
        <source>Show Overlay</source>
        <translation>Show Overlay</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="225"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="851"/>
        <source>Toggle Gallery Mode (G)
Shows all AOIs from all images in a grid view</source>
        <translation>Toggle Gallery Mode (G)
Shows all AOIs from all images in a grid view</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="255"/>
        <source>Highlight Pixels of Interest(H)</source>
        <translation>Highlight Pixels of Interest(H)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="277"/>
        <source>Show AOIs</source>
        <translation>Show AOIs</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="299"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="871"/>
        <source>Open Histogram</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="322"/>
        <source>Map with Image Locations (M)</source>
        <translation>Map with Image Locations (M)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="338"/>
        <source>North-Oriented View of Image (R)</source>
        <translation>North-Oriented View of Image (R)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="354"/>
        <source>Adjust Image (Ctrl+H)</source>
        <translation>Adjust Image (Ctrl+H)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="357"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="385"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="422"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="466"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="503"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="545"/>
        <source>...</source>
        <translation>...</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="370"/>
        <source>adjustments.png</source>
        <translation>adjustments.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="382"/>
        <source>Measure Distance (Ctrl+M)</source>
        <translation>Measure Distance (Ctrl+M)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="398"/>
        <source>ruler.png</source>
        <translation>ruler.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="405"/>
        <source>Toggle Magnifying Glass (Middle Mouse)</source>
        <translation>Toggle Magnifying Glass (Middle Mouse)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="435"/>
        <source>magnify.png</source>
        <translation>magnify.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="449"/>
        <source>Map Export (KML / CalTopo)</source>
        <translation>Map Export (KML / CalTopo)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="479"/>
        <source>map.png</source>
        <translation>map.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="486"/>
        <source>Generate PDF Report</source>
        <translation>Generate PDF Report</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="516"/>
        <source>pdf.png</source>
        <translation>pdf.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="528"/>
        <source>Generate Zip Bundle</source>
        <translation>Generate Zip Bundle</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="558"/>
        <source>zip.png</source>
        <translation>zip.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="583"/>
        <source>Skip hidden images when navigating.
When enabled, Previous/Next buttons will skip over images marked as hidden.
Use to focus on images that haven&apos;t been reviewed or marked for exclusion.
Keyboard shortcut: H to hide/unhide current image</source>
        <translation>Skip hidden images when navigating.
When enabled, Previous/Next buttons will skip over images marked as hidden.
Use to focus on images that haven&apos;t been reviewed or marked for exclusion.
Keyboard shortcut: H to hide/unhide current image</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="589"/>
        <source>Skip Hidden</source>
        <translation>Skip Hidden</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="628"/>
        <source>Mark current image as hidden.
Hidden images can be excluded from reports, exports, and navigation.
Use to remove images with false positives or no relevant detections.
When &quot;Skip Hidden&quot; is enabled, hidden images are skipped during navigation.
Keyboard shortcut: H</source>
        <translation>Mark current image as hidden.
Hidden images can be excluded from reports, exports, and navigation.
Use to remove images with false positives or no relevant detections.
When &quot;Skip Hidden&quot; is enabled, hidden images are skipped during navigation.
Keyboard shortcut: H</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="635"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="655"/>
        <source>Hide Image</source>
        <translation>Hide Image</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="647"/>
        <source>Displays the name of the currently hidden image.
When an image is marked as hidden, its filename appears here.
Hidden images are excluded from navigation when &quot;Skip Hidden&quot; is enabled.</source>
        <translation>Displays the name of the currently hidden image.
When an image is marked as hidden, its filename appears here.
Hidden images are excluded from navigation when &quot;Skip Hidden&quot; is enabled.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="683"/>
        <source>Jump directly to a specific image number.
Enter an image number and press Enter to navigate instantly.
Useful for reviewing specific images or returning to a noted location.</source>
        <translation>Jump directly to a specific image number.
Enter an image number and press Enter to navigate instantly.
Useful for reviewing specific images or returning to a noted location.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="688"/>
        <source>Jump To:</source>
        <translation>Jump To:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="713"/>
        <source>Enter an image number (1 to total) and press Enter.
Quickly navigate to any image in the analysis results.
Example: Type &quot;25&quot; and press Enter to jump to image #25</source>
        <translation>Enter an image number (1 to total) and press Enter.
Quickly navigate to any image in the analysis results.
Example: Type &quot;25&quot; and press Enter to jump to image #25</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="727"/>
        <source>Previous Image</source>
        <translation>Previous Image</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="734"/>
        <source>previous.png</source>
        <translation>previous.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="749"/>
        <source>Next Image</source>
        <translation>Next Image</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="756"/>
        <source>next.png</source>
        <translation>next.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="912"/>
        <source>Filter AOIs by color and pixel area</source>
        <translation>Filter AOIs by color and pixel area</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="984"/>
        <source>Sort By</source>
        <translation>Sort By</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="996"/>
        <source>Sort Areas of Interest (AOIs) in the list.
Choose how to order the detected objects:
• Pixel Area: Sort by size (largest to smallest)
• Distance: Sort by distance from image center or reference point
• Color: Group by similar colors
• Detection Order: Original order from analysis
Sorting helps prioritize review of larger or closer objects.</source>
        <translation>Sort Areas of Interest (AOIs) in the list.
Choose how to order the detected objects:
• Pixel Area: Sort by size (largest to smallest)
• Distance: Sort by distance from image center or reference point
• Color: Group by similar colors
• Detection Order: Original order from analysis
Sorting helps prioritize review of larger or closer objects.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="1084"/>
        <source>Open</source>
        <translation>Open</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="115"/>
        <source>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</source>
        <translation>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="135"/>
        <source>Load Results Failed</source>
        <translation>Load Results Failed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="137"/>
        <source>Cannot load results without valid image and mask locations.

The viewer will now close.</source>
        <translation>Cannot load results without valid image and mask locations.

The viewer will now close.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="153"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1047"/>
        <source>Skip Hidden ({count}) </source>
        <translation>Skip Hidden ({count}) </translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="217"/>
        <source>Image metadata and information.
Click on GPS Coordinates to copy, share, or open in mapping applications.</source>
        <translation>Image metadata and information.
Click on GPS Coordinates to copy, share, or open in mapping applications.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="466"/>
        <source>No Dataset</source>
        <translation>No Dataset</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="467"/>
        <source>No dataset is currently loaded.</source>
        <translation>No dataset is currently loaded.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="474"/>
        <source>Generate Cache</source>
        <translation>Generate Cache</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="476"/>
        <source>This will regenerate thumbnail and color caches for all AOIs in this dataset.

This may take a few minutes depending on the dataset size.

Continue?</source>
        <translation>This will regenerate thumbnail and color caches for all AOIs in this dataset.

This may take a few minutes depending on the dataset size.

Continue?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="489"/>
        <source>Initializing cache generation...</source>
        <translation>Initializing cache generation...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="490"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="495"/>
        <source>Generating Cache</source>
        <translation>Generating Cache</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="532"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="533"/>
        <source>Failed to start cache generation:
{error}</source>
        <translation>Failed to start cache generation:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="551"/>
        <source>Cache Generated</source>
        <translation>Cache Generated</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="553"/>
        <source>Cache generation complete!

Processed {images} images with {aois} AOIs.

The viewer will now load thumbnails and colors much faster.</source>
        <translation>Cache generation complete!

Processed {images} images with {aois} AOIs.

The viewer will now load thumbnails and colors much faster.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="584"/>
        <source>Cache Generation Error</source>
        <translation>Cache Generation Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="586"/>
        <source>An error occurred during cache generation:

{error}</source>
        <translation>An error occurred during cache generation:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="754"/>
        <source>AOI Not Visible</source>
        <translation>AOI Not Visible</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="756"/>
        <source>The AOI at the cursor position cannot be selected because it is currently hidden due to active filters.

To select this AOI, please clear or adjust your filters.</source>
        <translation>The AOI at the cursor position cannot be selected because it is currently hidden due to active filters.

To select this AOI, please clear or adjust your filters.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="862"/>
        <source>Show Pixels of Interest (H or Ctrl+I)</source>
        <translation>Show Pixels of Interest (H or Ctrl+I)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="877"/>
        <source>Toggle AOI Circles</source>
        <translation>Toggle AOI Circles</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1219"/>
        <source>Missing Dependency</source>
        <translation>Missing Dependency</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1221"/>
        <source>The qimage2ndarray module is required for the upscale feature.
Please install it using: pip install qimage2ndarray</source>
        <translation>The qimage2ndarray module is required for the upscale feature.
Please install it using: pip install qimage2ndarray</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1230"/>
        <source>Upscale Error</source>
        <translation>Upscale Error</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1232"/>
        <source>An error occurred while opening the upscale dialog:
{error}</source>
        <translation>An error occurred while opening the upscale dialog:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1479"/>
        <source>Unknown Reviewer</source>
        <translation>Unknown Reviewer</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1542"/>
        <source>Loading gallery...</source>
        <translation>Loading gallery...</translation>
    </message>
</context>
<context>
    <name>ZipExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="133"/>
        <source>Save Zip File</source>
        <translation>Save Zip File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="135"/>
        <source>Zip files (*.zip)</source>
        <translation>Zip files (*.zip)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="166"/>
        <source>No images to export</source>
        <translation>No images to export</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="401"/>
        <source>ZIP file created</source>
        <translation>ZIP file created</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="407"/>
        <source>Failed to generate Zip file: {error}</source>
        <translation>Failed to generate Zip file: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="428"/>
        <source>Error</source>
        <translation>Error</translation>
    </message>
</context>
<context>
    <name>ZipExportDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="18"/>
        <source>ZIP Export Options</source>
        <translation>ZIP Export Options</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="26"/>
        <source>Choose what to export:

- Native: Original images, TIFF masks, and XML (paths made portable).
- Augmented: What you see in the viewer (AOIs/POIs), keeps EXIF/XMP.</source>
        <translation>Choose what to export:

- Native: Original images, TIFF masks, and XML (paths made portable).
- Augmented: What you see in the viewer (AOIs/POIs), keeps EXIF/XMP.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="34"/>
        <source>Export Native data (original files + XML)</source>
        <translation>Export Native data (original files + XML)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="35"/>
        <source>Export Augmented images (viewer overlays + metadata)</source>
        <translation>Export Augmented images (viewer overlays + metadata)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="50"/>
        <source>Include images without flagged AOIs</source>
        <translation>Include images without flagged AOIs</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="53"/>
        <source>When unchecked, only images with at least one flagged AOI will be exported.
When checked, all images will be exported regardless of flagged AOI status.</source>
        <translation>When unchecked, only images with at least one flagged AOI will be exported.
When checked, all images will be exported regardless of flagged AOI status.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="59"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="60"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
</context>
<context>
    <name>UpdateController</name>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="45"/>
        <source>Disabled while Offline Only mode is enabled.</source>
        <translation>Disabled while Offline Only mode is enabled.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="49"/>
        <source>Check the update feed for a newer ADIAT installer.</source>
        <translation>Check the update feed for a newer ADIAT installer.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="78"/>
        <source>Updates Disabled</source>
        <translation>Updates Disabled</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="79"/>
        <source>Update checks are disabled while Offline Only mode is enabled.</source>
        <translation>Update checks are disabled while Offline Only mode is enabled.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="94"/>
        <source>Update Check Failed</source>
        <translation>Update Check Failed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="95"/>
        <source>Unable to check for updates:
{error}</source>
        <translation>Unable to check for updates:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="103"/>
        <source>No Updates Available</source>
        <translation>No Updates Available</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="104"/>
        <source>You are already running the latest available version of ADIAT.</source>
        <translation>You are already running the latest available version of ADIAT.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="123"/>
        <source>Installer Launch Failed</source>
        <translation>Installer Launch Failed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="124"/>
        <source>The installer was downloaded but could not be launched:
{error}</source>
        <translation>The installer was downloaded but could not be launched:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="130"/>
        <source>Installer Started</source>
        <translation>Installer Started</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="131"/>
        <source>The installer has been launched. Close ADIAT when you are ready to continue the update.</source>
        <translation>The installer has been launched. Close ADIAT when you are ready to continue the update.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="141"/>
        <source>Update Available</source>
        <translation>Update Available</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="143"/>
        <source>ADIAT {new_version} is available. You are running {current_version}.</source>
        <translation>ADIAT {new_version} is available. You are running {current_version}.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="149"/>
        <source>Do you want to download and launch the installer now?</source>
        <translation>Do you want to download and launch the installer now?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="152"/>
        <source>Download and Install</source>
        <translation>Download and Install</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="161"/>
        <source>Downloading ADIAT {version}...</source>
        <translation>Downloading ADIAT {version}...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="162"/>
        <source>Cancel</source>
        <translation>Cancel</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="167"/>
        <source>Downloading Update</source>
        <translation>Downloading Update</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="184"/>
        <source>Downloading ADIAT {version}...
{downloaded} of {total} bytes</source>
        <translation>Downloading ADIAT {version}...
{downloaded} of {total} bytes</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="187"/>
        <source>unknown</source>
        <translation>unknown</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="192"/>
        <location filename="../app/core/controllers/UpdateController.py" line="198"/>
        <source>Update download canceled.</source>
        <translation>Update download canceled.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="203"/>
        <source>Download Failed</source>
        <translation>Download Failed</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/UpdateController.py" line="204"/>
        <source>Unable to download the update installer:
{error}</source>
        <translation>Unable to download the update installer:
{error}</translation>
    </message>
</context>
<context>
    <name>TeamPlanningDialog</name>
    <message>
        <source>Plan Verification</source>
        <translation>Plan Verification</translation>
    </message>
    <message>
        <source>Teams</source>
        <translation>Teams</translation>
    </message>
    <message>
        <source>+ New</source>
        <translation>+ New</translation>
    </message>
    <message>
        <source>Create a new field team</source>
        <translation>Create a new field team</translation>
    </message>
    <message>
        <source>✕ Remove</source>
        <translation>✕ Remove</translation>
    </message>
    <message>
        <source>Remove the selected team</source>
        <translation>Remove the selected team</translation>
    </message>
    <message>
        <source>Assign Selection ▶</source>
        <translation>Assign Selection ▶</translation>
    </message>
    <message>
        <source>Assign the selected AOIs on the map to the chosen team</source>
        <translation>Assign the selected AOIs on the map to the chosen team</translation>
    </message>
    <message>
        <source>Team AOIs</source>
        <translation>Team AOIs</translation>
    </message>
    <message>
        <source>Export Team PDF</source>
        <translation>Export Team PDF</translation>
    </message>
    <message>
        <source>Generate a PDF report for the selected team only</source>
        <translation>Generate a PDF report for the selected team only</translation>
    </message>
    <message>
        <source>Export All PDFs</source>
        <translation>Export All PDFs</translation>
    </message>
    <message>
        <source>Generate one PDF per team plus a master summary PDF</source>
        <translation>Generate one PDF per team plus a master summary PDF</translation>
    </message>
    <message>
        <source>Zoom In (+)</source>
        <translation>Zoom In (+)</translation>
    </message>
    <message>
        <source>Zoom Out (-)</source>
        <translation>Zoom Out (-)</translation>
    </message>
    <message>
        <source>Fit All (F)</source>
        <translation>Fit All (F)</translation>
    </message>
    <message>
        <source>Rectangle Select</source>
        <translation>Rectangle Select</translation>
    </message>
    <message>
        <source>Draw a rectangle on the map to select multiple AOIs</source>
        <translation>Draw a rectangle on the map to select multiple AOIs</translation>
    </message>
    <message>
        <source>Satellite View</source>
        <translation>Satellite View</translation>
    </message>
    <message>
        <source>Map View</source>
        <translation>Map View</translation>
    </message>
    <message>
        <source>Click to select AOI • Ctrl+Click to multi-select • Use Rectangle Select for area selection • Scroll to zoom</source>
        <translation>Click to select AOI • Ctrl+Click to multi-select • Use Rectangle Select for area selection • Scroll to zoom</translation>
    </message>
    <message>
        <source>Team</source>
        <translation>Team</translation>
    </message>
    <message>
        <source>New Team</source>
        <translation>New Team</translation>
    </message>
    <message>
        <source>Team name:</source>
        <translation>Team name:</translation>
    </message>
    <message>
        <source>Duplicate Name</source>
        <translation>Duplicate Name</translation>
    </message>
    <message>
        <source>A team named '{name}' already exists.</source>
        <translation>A team named '{name}' already exists.</translation>
    </message>
    <message>
        <source>Unassigned</source>
        <translation>Unassigned</translation>
    </message>
    <message>
        <source>No Team Selected</source>
        <translation>No Team Selected</translation>
    </message>
    <message>
        <source>Please select a team to export.</source>
        <translation>Please select a team to export.</translation>
    </message>
    <message>
        <source>No Teams</source>
        <translation>No Teams</translation>
    </message>
    <message>
        <source>Create at least one team before exporting.</source>
        <translation>Create at least one team before exporting.</translation>
    </message>
</context>
<context>
    <name>TeamPlanningController</name>
    <message>
        <source>No Flagged AOIs</source>
        <translation>No Flagged AOIs</translation>
    </message>
    <message>
        <source>There are no flagged AOIs to assign.

Flag at least one AOI in the viewer before using Plan Verification.</source>
        <translation>There are no flagged AOIs to assign.

Flag at least one AOI in the viewer before using Plan Verification.</translation>
    </message>
    <message>
        <source>No Team Selected</source>
        <translation>No Team Selected</translation>
    </message>
    <message>
        <source>Select a target team (or 'Unassigned') in the list first.</source>
        <translation>Select a target team (or 'Unassigned') in the list first.</translation>
    </message>
    <message>
        <source>No AOIs Selected</source>
        <translation>No AOIs Selected</translation>
    </message>
    <message>
        <source>Select one or more AOIs on the map first.
Click on markers, or use Rectangle Select for area selection.</source>
        <translation>Select one or more AOIs on the map first.
Click on markers, or use Rectangle Select for area selection.</translation>
    </message>
    <message>
        <source>No AOIs</source>
        <translation>No AOIs</translation>
    </message>
    <message>
        <source>Team '{name}' has no assigned AOIs.</source>
        <translation>Team '{name}' has no assigned AOIs.</translation>
    </message>
    <message>
        <source>Save Team PDF</source>
        <translation>Save Team PDF</translation>
    </message>
    <message>
        <source>PDF files (*.pdf)</source>
        <translation>PDF files (*.pdf)</translation>
    </message>
    <message>
        <source>Select Export Folder</source>
        <translation>Select Export Folder</translation>
    </message>
    <message>
        <source>Exporting Team PDFs</source>
        <translation>Exporting Team PDFs</translation>
    </message>
    <message>
        <source>Generating PDF for {name}...</source>
        <translation>Generating PDF for {name}...</translation>
    </message>
    <message>
        <source>Generating master summary...</source>
        <translation>Generating master summary...</translation>
    </message>
    <message>
        <source>Export complete</source>
        <translation>Export complete</translation>
    </message>
    <message>
        <source>Generating PDF Report</source>
        <translation>Generating PDF Report</translation>
    </message>
    <message>
        <source>Done</source>
        <translation>Done</translation>
    </message>
    <message>
        <source>Success</source>
        <translation>Success</translation>
    </message>
    <message>
        <source>PDF report generated successfully!</source>
        <translation>PDF report generated successfully!</translation>
    </message>
    <message>
        <source>Export Error</source>
        <translation>Export Error</translation>
    </message>
    <message>
        <source>PDF generation failed: {error}</source>
        <translation>PDF generation failed: {error}</translation>
    </message>
    <message>
        <source>Export Complete</source>
        <translation>Export Complete</translation>
    </message>
    <message>
        <source>Team PDFs saved to:
{folder}</source>
        <translation>Team PDFs saved to:
{folder}</translation>
    </message>
</context>
</TS>
