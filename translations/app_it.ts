<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="it_IT">
<context>
    <name>AIPersonDetector</name>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="27"/>
        <source>Confidence threshold for AI person detection.
Controls the minimum confidence level required to report a person detection.</source>
        <translation>Soglia di confidenza per il rilevamento persone AI.
Controlla il livello minimo di confidenza richiesto per segnalare il rilevamento di una persona.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="31"/>
        <source>Confidence Threshold</source>
        <translation>Soglia di Confidenza</translation>
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
        <translation>Regola la soglia di confidenza per il rilevamento delle persone.
• Intervallo: da 0% a 100% (cursore da -1 a 100, -1 visualizzato come 0%)
• Predefinito: 50%
Il modello AI assegna un punteggio di confidenza a ogni rilevamento di persona:
• Valori bassi (0-30%): accetta rilevamenti a bassa confidenza (più rilevamenti, più falsi positivi)
• Valori medi (31-60%): rilevamento bilanciato (consigliato per la maggior parte dei casi)
• Valori alti (61-100%): accetta solo rilevamenti ad alta confidenza (meno rilevamenti, meno falsi positivi)
La confidenza rappresenta la certezza del modello AI che un oggetto rilevato sia una persona.
Inizia con il 50% e regola in base ai tuoi requisiti di precisione.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="81"/>
        <source>Current confidence threshold percentage.
Displays the value selected on the confidence slider (0-100%).
Detections below this confidence level will be filtered out.</source>
        <translation>Percentuale della soglia di confidenza attuale.
Visualizza il valore selezionato sul cursore della confidenza (0-100%).
I rilevamenti al di sotto di questo livello di confidenza verranno filtrati.</translation>
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
        <translation>Informazioni sullo stato e sulla disponibilità della GPU.
Mostra se l&apos;accelerazione GPU è disponibile per il rilevamento persone AI.
• GPU disponibile: il rilevamento AI utilizzerà la GPU per un&apos;elaborazione più rapida
• Solo CPU: il rilevamento AI utilizzerà la CPU (più lento ma comunque funzionale)
L&apos;accelerazione GPU migliora significativamente la velocità di elaborazione per i modelli AI.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetector.ui" line="107"/>
        <source>GPU Label</source>
        <translation>Etichetta GPU</translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorController</name>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorController.py" line="82"/>
        <source>GPU Not Available</source>
        <translation>GPU non disponibile</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorController.py" line="88"/>
        <source>GPU Available</source>
        <translation>GPU disponibile</translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorWizard</name>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetectorWizard.ui" line="40"/>
        <source>How confident should ADIAT be before marking something as a person?</source>
        <translation>Quanto dovrebbe essere sicura ADIAT prima di contrassegnare qualcosa come persona?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/AIPersonDetectorWizard.ui" line="56"/>
        <source>Note: A higher setting may increase false positives.</source>
        <translation>Nota: un&apos;impostazione più alta può aumentare i falsi positivi.</translation>
    </message>
</context>
<context>
    <name>AOICommentDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="27"/>
        <source>AOI Comment</source>
        <translation>Commento AOI</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="38"/>
        <source>Add a comment for this flagged AOI (max 256 characters):</source>
        <translation>Aggiungi un commento per questa AOI contrassegnata (max 256 caratteri):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="44"/>
        <source>Enter your comment here...</source>
        <translation>Inserisci qui il tuo commento...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="57"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICommentDialog.py" line="59"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
</context>
<context>
    <name>AOIController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="434"/>
        <source>Comment saved</source>
        <translation>Commento salvato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="436"/>
        <source>Comment cleared</source>
        <translation>Commento cancellato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="523"/>
        <source>Copy Data</source>
        <translation>Copia Dati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="597"/>
        <source>AOI data copied</source>
        <translation>Dati AOI copiati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="677"/>
        <source>Invalid image index</source>
        <translation>Indice immagine non valido</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="682"/>
        <source>Invalid AOI index</source>
        <translation>Indice AOI non valido</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="745"/>
        <source>Could not calculate AOI location. Diagnostic info copied to clipboard!</source>
        <translation>Impossibile calcolare la posizione dell&apos;AOI. Informazioni diagnostiche copiate negli appunti!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="751"/>
        <source>Could not calculate AOI location</source>
        <translation>Impossibile calcolare la posizione dell&apos;AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1110"/>
        <source>Temperature sorting unavailable (no thermal data)</source>
        <translation>Ordinamento per temperatura non disponibile (nessun dato termico)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1424"/>
        <source>Cannot Delete AOI</source>
        <translation>Impossibile eliminare l&apos;AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1429"/>
        <source>Only manually created AOIs can be deleted. Algorithm-detected AOIs cannot be deleted.</source>
        <translation>Solo le AOI create manualmente possono essere eliminate. Le AOI rilevate dagli algoritmi non possono essere eliminate.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1435"/>
        <source>Delete AOI</source>
        <translation>Elimina AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIController.py" line="1438"/>
        <source>Are you sure you want to delete this AOI? This action cannot be undone.</source>
        <translation>Sei sicuro di voler eliminare questa AOI? Questa azione non può essere annullata.</translation>
    </message>
</context>
<context>
    <name>AOICreationDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="23"/>
        <source>Create AOI</source>
        <translation>Crea AOI</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="31"/>
        <source>Create AOI?</source>
        <translation>Creare AOI?</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="39"/>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOICreationDialog.py" line="43"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
</context>
<context>
    <name>AOIFilterDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="55"/>
        <source>Filter AOIs</source>
        <translation>Filtra AOI</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="64"/>
        <source>Filter Areas of Interest by flagged status, comments, color, and/or pixel area:</source>
        <translation>Filtra le Aree di Interesse per stato contrassegnato, commenti, colore e/o area in pixel:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="69"/>
        <source>Flagged AOIs</source>
        <translation>AOI Contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="72"/>
        <source>Show Only Flagged AOIs</source>
        <translation>Mostra solo AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="76"/>
        <source>Only AOIs marked with a flag will be displayed</source>
        <translation>Verranno visualizzate solo le AOI contrassegnate con una bandierina</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="84"/>
        <source>Comment Filter</source>
        <translation>Filtro Commenti</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="88"/>
        <source>Enable Comment Filter</source>
        <translation>Abilita Filtro Commenti</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="95"/>
        <source>Pattern:</source>
        <translation>Modello:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="98"/>
        <source>e.g., *work* or crack* or *damage</source>
        <translation>es., *lavoro* o crepa* o *danno</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="106"/>
        <source>Use * as wildcard for any characters (case-insensitive)</source>
        <translation>Usa * come carattere jolly per qualsiasi carattere (non sensibile alle maiuscole)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="110"/>
        <source>Only AOIs with non-empty comments matching the pattern will be shown</source>
        <translation>Verranno mostrate solo le AOI con commenti non vuoti che corrispondono al modello</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="118"/>
        <source>Color Filter</source>
        <translation>Filtro Colore</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="122"/>
        <source>Enable Color Filter</source>
        <translation>Abilita Filtro Colore</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="129"/>
        <source>Target Hue:</source>
        <translation>Tonalità Obiettivo:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="131"/>
        <source>Select Color</source>
        <translation>Seleziona Colore</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="143"/>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="362"/>
        <source>No color selected</source>
        <translation>Nessun colore selezionato</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="151"/>
        <source>Hue Range (±):</source>
        <translation>Intervallo Tonalità (±):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="169"/>
        <source>AOIs with hue within ±range of target will be shown</source>
        <translation>Verranno mostrate le AOI con tonalità entro l&apos;intervallo ± dell&apos;obiettivo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="177"/>
        <source>Pixel Area Filter</source>
        <translation>Filtro Area Pixel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="181"/>
        <source>Enable Pixel Area Filter</source>
        <translation>Abilita Filtro Area Pixel</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="188"/>
        <source>Minimum Area (px):</source>
        <translation>Area Minima (px):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="202"/>
        <source>Maximum Area (px):</source>
        <translation>Area Massima (px):</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="218"/>
        <source>Temperature Filter</source>
        <translation>Filtro Temperatura</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="222"/>
        <source>Enable Temperature Filter</source>
        <translation>Abilita Filtro Temperatura</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="276"/>
        <source>Temperature filtering unavailable (no thermal data)</source>
        <translation>Filtro temperatura non disponibile (nessun dato termico)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="291"/>
        <source>Clear All Filters</source>
        <translation>Cancella Tutti i Filtri</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="297"/>
        <source>Apply</source>
        <translation>Applica</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="302"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOIFilterDialog.py" line="337"/>
        <source>Select Target Hue</source>
        <translation>Seleziona Tonalità Obiettivo</translation>
    </message>
</context>
<context>
    <name>AOINeighborGalleryDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="338"/>
        <source>AOI in Neighboring Images</source>
        <translation>AOI nelle immagini vicine</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="389"/>
        <source>Reset View</source>
        <translation>Ripristina Vista</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="392"/>
        <source>Reset zoom and fit all thumbnails in view</source>
        <translation>Ripristina lo zoom e adatta tutte le miniature alla vista</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/AOINeighborGalleryDialog.py" line="399"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
</context>
<context>
    <name>AOINeighborTrackingController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="105"/>
        <source>No AOI Selected</source>
        <translation>Nessuna AOI selezionata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="107"/>
        <source>Please select an AOI first by clicking on it in the thumbnail panel.</source>
        <translation>Seleziona prima un&apos;AOI cliccandoci sopra nel pannello delle miniature.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="130"/>
        <source>Cannot Calculate GPS</source>
        <translation>Impossibile calcolare il GPS</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="135"/>
        <source>Unable to calculate GPS coordinates for this AOI.

This may be due to missing image metadata (GPS, altitude, or camera info).</source>
        <translation>Impossibile calcolare le coordinate GPS per questa AOI.

Ciò potrebbe essere dovuto alla mancanza di metadati dell&apos;immagine (GPS, altitudine o informazioni sulla telecamera).</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="140"/>
        <source>Searching for AOI in neighboring images...</source>
        <translation>Ricerca dell&apos;AOI nelle immagini vicine...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="141"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="145"/>
        <source>Tracking AOI</source>
        <translation>Tracciamento AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="181"/>
        <source>Tracking Error</source>
        <translation>Errore di tracciamento</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="182"/>
        <source>An error occurred while tracking the AOI:
{error}</source>
        <translation>Si è verificato un errore durante il tracciamento dell&apos;AOI:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="207"/>
        <source>No Neighbors Found</source>
        <translation>Nessuna immagine vicina trovata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="209"/>
        <source>The AOI was not found in any neighboring images.</source>
        <translation>L&apos;AOI non è stata trovata in nessuna delle immagini vicine.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="233"/>
        <source>Search Error</source>
        <translation>Errore di ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="234"/>
        <source>An error occurred during the search:
{error}</source>
        <translation>Si è verificato un errore durante la ricerca:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="285"/>
        <source>Display Error</source>
        <translation>Errore di visualizzazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/neighbor/AOINeighborTrackingController.py" line="286"/>
        <source>An error occurred while displaying results:
{error}</source>
        <translation>Si è verificato un errore durante la visualizzazione dei risultati:
{error}</translation>
    </message>
</context>
<context>
    <name>AOIUIComponent</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="251"/>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="334"/>
        <source>AOI Information
Right-click to copy data to clipboard</source>
        <translation>Informazioni AOI
Fai clic destro per copiare i dati negli appunti</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="257"/>
        <source>

Score Type: {type}
Raw Score: {score} ({method})</source>
        <translation>

Tipo Punteggio: {type}
Punteggio Grezzo: {score} ({method})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="307"/>
        <source>Confidence Score: {score:.1f}%</source>
        <translation>Punteggio di Confidenza: {score:.1f}%</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="373"/>
        <source>Unflag AOI</source>
        <translation>Rimuovi contrassegno AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="374"/>
        <source>Flag AOI</source>
        <translation>Contrassegna AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="390"/>
        <source>Comment:
{comment}

Click to edit comment</source>
        <translation>Commento:
{comment}

Clicca per modificare il commento</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="402"/>
        <source>No comment yet.
Click to add a comment for this AOI.

Use comments to note important details, observations,
or actions needed for this detection.</source>
        <translation>Ancora nessun commento.
Clicca per aggiungere un commento per questa AOI.

Usa i commenti per annotare dettagli importanti, osservazioni,
o azioni necessarie per questo rilevamento.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="416"/>
        <source>Calculate and show GPS location for this AOI</source>
        <translation>Calcola e mostra la posizione GPS per questa AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="433"/>
        <source>Delete this AOI</source>
        <translation>Elimina questa AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="471"/>
        <source>Area</source>
        <translation>Area</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="472"/>
        <source>Areas</source>
        <translation>Aree</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="473"/>
        <source>{filtered} of {total} {label}</source>
        <translation>{filtered} di {total} {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="483"/>
        <source>Area of Interest</source>
        <translation>Area di Interesse</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="485"/>
        <source>Areas of Interest</source>
        <translation>Aree di Interesse</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="487"/>
        <source>{count} {label}</source>
        <translation>{count} {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="630"/>
        <source>Loading AOIs...</source>
        <translation>Caricamento AOI...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/aoi/AOIUIComponent.py" line="671"/>
        <source>Loading AOIs... ({current}/{total})</source>
        <translation>Caricamento AOI... ({current}/{total})</translation>
    </message>
</context>
<context>
    <name>AlertManager</name>
    <message>
        <location filename="../app/core/services/AlertService.py" line="293"/>
        <source>ADIAT - Color Detection Alerts</source>
        <translation>ADIAT - Avvisi Rilevamento Colore</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="567"/>
        <source>ADIAT - Color Detection Alert</source>
        <translation>ADIAT - Avviso Rilevamento Colore</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="611"/>
        <source>Detected {count} object(s)
Average confidence: {avg_confidence:.2f}
Total area: {area:.0f} pixels
</source>
        <translation>Rilevati {count} oggetti
Confidenza media: {avg_confidence:.2f}
Area totale: {area:.0f} pixel
</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="619"/>
        <source>
Details:
</source>
        <translation>
Dettagli:
</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="623"/>
        <source>  #{index}: ({x},{y}) {w}x{h} conf:{confidence:.2f}
</source>
        <translation>  #{index}: ({x},{y}) {w}x{h} conf:{confidence:.2f}
</translation>
    </message>
    <message>
        <location filename="../app/core/services/AlertService.py" line="642"/>
        <source>ADIAT - Detection Alert</source>
        <translation>ADIAT - Avviso Rilevamento</translation>
    </message>
</context>
<context>
    <name>AlgorithmParametersPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmParametersPage.py" line="164"/>
        <source>{algorithm} Algorithm Settings</source>
        <translation>Impostazioni Algoritmo {algorithm}</translation>
    </message>
</context>
<context>
    <name>AltitudeController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="98"/>
        <source>meters</source>
        <translation>metri</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="100"/>
        <source>feet</source>
        <translation>piedi</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="109"/>
        <source>Negative Altitude Detected</source>
        <translation>Rilevata altitudine negativa</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="113"/>
        <source>WARNING! Relative Altitude is negative. Enter an AGL altitude to be used for GSD calculations (in {unit}):</source>
        <translation>ATTENZIONE! L&apos;altitudine relativa è negativa. Inserisci un&apos;altitudine AGL da utilizzare per i calcoli GSD (in {unit}):</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="130"/>
        <source>Override Altitude</source>
        <translation>Forza Altitudine</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="133"/>
        <source>Enter a custom AGL altitude to be used for GSD calculations for all images (in {unit}):</source>
        <translation>Inserisci un&apos;altitudine AGL personalizzata da utilizzare per i calcoli GSD per tutte le immagini (in {unit}):</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/AltitudeController.py" line="180"/>
        <source>Custom AGL set to {value:.1f} {unit}</source>
        <translation>AGL personalizzata impostata su {value:.1f} {unit}</translation>
    </message>
</context>
<context>
    <name>BearingRecoveryDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="100"/>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="124"/>
        <source>Missing Bearings Detected</source>
        <translation>Rilevati Orientamenti Mancanti</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="135"/>
        <source>Some images are missing bearing/heading information. We can estimate bearings from a flight track file (KML/GPX/CSV) or calculate them automatically from image GPS coordinates.</source>
        <translation>Alcune immagini mancano di informazioni sull&apos;orientamento/prua. Possiamo stimare gli orientamenti da un file di traccia di volo (KML/GPX/CSV) o calcolarli automaticamente dalle coordinate GPS dell&apos;immagine.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="150"/>
        <source>📁 Load Track File (KML/GPX/CSV)</source>
        <translation>📁 Carica File Traccia (KML/GPX/CSV)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="156"/>
        <source>🧭 Auto-Calculate from Image GPS</source>
        <translation>🧭 Calcolo Automatico da GPS Immagine</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="174"/>
        <source>Preparing...</source>
        <translation>Preparazione...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="190"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="195"/>
        <source>Skip</source>
        <translation>Salta</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="259"/>
        <source>Select Track File</source>
        <translation>Seleziona File Traccia</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="262"/>
        <source>Track Files (*.kml *.gpx *.csv);;KML Files (*.kml);;GPX Files (*.gpx);;CSV Files (*.csv);;All Files (*.*)</source>
        <translation>File Traccia (*.kml *.gpx *.csv);;File KML (*.kml);;File GPX (*.gpx);;File CSV (*.csv);;Tutti i File (*.*)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="345"/>
        <source>Bearings set for {count} images ({source})</source>
        <translation>Orientamenti impostati per {count} immagini ({source})</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="350"/>
        <source>, {count} flagged near turns</source>
        <translation>, {count} segnalati vicino alle virate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="352"/>
        <source>, {count} hover estimates</source>
        <translation>, {count} stime di stazionamento</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="354"/>
        <source>, {count} time gaps</source>
        <translation>, {count} intervalli di tempo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="361"/>
        <source>Bearing Calculation Complete</source>
        <translation>Calcolo Orientamento Completato</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="362"/>
        <source>{summary}.</source>
        <translation>{summary}.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="389"/>
        <source>Bearing Calculation Failed</source>
        <translation>Calcolo Orientamento Fallito</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="393"/>
        <source>An error occurred during bearing calculation:

{error}

Please check your input files and try again.</source>
        <translation>Si è verificato un errore durante il calcolo dell&apos;orientamento:

{error}

Controlla i file di input e riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="411"/>
        <source>Cancelled</source>
        <translation>Annullato</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="422"/>
        <source>Cancelling...</source>
        <translation>Annullamento in corso...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="435"/>
        <source>Bearing Recovery Not Needed</source>
        <translation>Recupero Orientamento Non Necessario</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="440"/>
        <source>Bearing recovery requires multiple images to calculate direction of travel.

With only one image, bearing recovery cannot be performed.</source>
        <translation>Il recupero dell&apos;orientamento richiede più immagini per calcolare la direzione di viaggio.

Con una sola immagine, il recupero dell&apos;orientamento non può essere eseguito.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="482"/>
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
&lt;h3&gt;Cos&apos;è il Recupero dell&apos;Orientamento?&lt;/h3&gt;

&lt;p&gt;L&apos;&lt;b&gt;Orientamento&lt;/b&gt; (chiamato anche prua, imbardata o rotta) è la direzione in cui il drone/telecamera
era puntato quando è stata acquisita un&apos;immagine, misurata in gradi in senso orario dal Nord (0-360°).&lt;/p&gt;

&lt;h4&gt;Perché è importante?&lt;/h4&gt;
&lt;p&gt;Gli orientamenti sono essenziali per:&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;Georeferenziazione e mappatura accurate&lt;/li&gt;
&lt;li&gt;Corretto allineamento e cucitura delle immagini&lt;/li&gt;
&lt;li&gt;Comprensione del campo visivo della telecamera&lt;/li&gt;
&lt;li&gt;Analisi degli oggetti rilevati nel contesto geografico&lt;/li&gt;
&lt;/ul&gt;

&lt;h4&gt;Metodi di Recupero:&lt;/h4&gt;

&lt;p&gt;&lt;b&gt;Carica File Traccia (KML/GPX/CSV)&lt;/b&gt;&lt;br/&gt;
Utilizza un log di traccia GPS esterno dal drone o dal controller di volo. La traccia contiene
posizioni con timestamp che consentono un&apos;interpolazione precisa dell&apos;orientamento. Metodo più accurato.&lt;/p&gt;

&lt;p&gt;&lt;b&gt;Calcolo Automatico da GPS Immagine&lt;/b&gt;&lt;br/&gt;
Stima gli orientamenti utilizzando solo le coordinate GPS incorporate nelle immagini. Analizza lo
schema di volo per determinare la direzione di viaggio. Funziona bene per schemi di volo sistematici
come i rilievi a &quot;tagliaerba&quot;.&lt;/p&gt;

&lt;p&gt;&lt;b&gt;Salta&lt;/b&gt;&lt;br/&gt;
Procedi senza il recupero dell&apos;orientamento. Alcune funzioni potrebbero non funzionare correttamente.&lt;/p&gt;
        </translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/BearingRecoveryDialog.py" line="483"/>
        <source>About Bearing Recovery</source>
        <translation>Informazioni sul Recupero dell&apos;Orientamento</translation>
    </message>
</context>
<context>
    <name>CacheLocationDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="35"/>
        <source>Cache Not Found</source>
        <translation>Cache non trovata</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="47"/>
        <source>Cached Data Not Found</source>
        <translation>Dati memorizzati nella cache non trovati</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="57"/>
        <source>The following cached items were not found:
</source>
        <translation>I seguenti elementi memorizzati nella cache non sono stati trovati:
</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="71"/>
        <source>Without cached data, thumbnails and colors will be generated on-demand, which may cause delays when viewing results.

If you have previously processed this dataset and have an ADIAT_Results folder with cached data, you can locate it now to improve performance.</source>
        <translation>Senza i dati memorizzati nella cache, le miniature e i colori verranno generati su richiesta, il che potrebbe causare ritardi durante la visualizzazione dei risultati.

Se hai precedentemente elaborato questo set di dati e hai una cartella ADIAT_Results con i dati memorizzati nella cache, puoi individuarla ora per migliorare le prestazioni.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="80"/>
        <source>Locate Cache Folder...</source>
        <translation>Individua Cartella Cache...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="85"/>
        <source>Skip (Generate On-Demand)</source>
        <translation>Salta (Genera su Richiesta)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="122"/>
        <source>Select ADIAT_Results Folder</source>
        <translation>Seleziona Cartella ADIAT_Results</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="136"/>
        <source>Invalid Cache Folder</source>
        <translation>Cartella Cache Non Valida</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CacheLocationDialog.py" line="143"/>
        <source>The selected folder does not contain thumbnail cache directory.

Expected to find:
  • .thumbnails/

Please select a valid ADIAT_Results folder.</source>
        <translation>La cartella selezionata non contiene la directory della cache delle miniature.

Atteso:
  • .thumbnails/

Seleziona una cartella ADIAT_Results valida.</translation>
    </message>
</context>
<context>
    <name>CalTopoAPIMapDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="42"/>
        <source>Select CalTopo Map</source>
        <translation>Seleziona Mappa CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="68"/>
        <source>Select a CalTopo map:</source>
        <translation>Seleziona una mappa CalTopo:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="77"/>
        <source>Search:</source>
        <translation>Cerca:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="79"/>
        <source>Filter maps by name...</source>
        <translation>Filtra mappe per nome...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="111"/>
        <source>Update Credentials</source>
        <translation>Aggiorna Credenziali</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="117"/>
        <source>Select Map</source>
        <translation>Seleziona Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="121"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="150"/>
        <source>No account data available.</source>
        <translation>Nessun dato dell&apos;account disponibile.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="515"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="540"/>
        <source>Credentials Updated</source>
        <translation>Credenziali Aggiornate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="517"/>
        <source>Credentials have been updated and the map list has been refreshed.</source>
        <translation>Le credenziali sono state aggiornate e l&apos;elenco delle mappe è stato aggiornato.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="521"/>
        <source>Update Failed</source>
        <translation>Aggiornamento Fallito</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="526"/>
        <source>Failed to refresh account data with new credentials.

Please check your credentials and try again.</source>
        <translation>Impossibile aggiornare i dati dell&apos;account con le nuove credenziali.

Controlla le tue credenziali e riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="530"/>
        <source>Update Error</source>
        <translation>Errore di Aggiornamento</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="531"/>
        <source>An error occurred while updating credentials:

{error}</source>
        <translation>Si è verificato un errore durante l&apos;aggiornamento delle credenziali:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="544"/>
        <source>Credentials have been updated. Please close and reopen this dialog to refresh the map list.</source>
        <translation>Le credenziali sono state aggiornate. Chiudi e riapri questa finestra per aggiornare l&apos;elenco delle mappe.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="559"/>
        <source>No Map Selected</source>
        <translation>Nessuna Mappa Selezionata</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAPIMapDialog.py" line="561"/>
        <source>Please select a map from the list.</source>
        <translation>Seleziona una mappa dall&apos;elenco.</translation>
    </message>
</context>
<context>
    <name>CalTopoAuthDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="96"/>
        <source>CalTopo Login &amp; Map Selection</source>
        <translation>Accesso CalTopo &amp; Selezione Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="173"/>
        <source>Current map: Not selected</source>
        <translation>Mappa corrente: Non selezionata</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="177"/>
        <source>(Login → Navigate to your map → Click &apos;I&apos;m Logged In&apos;)</source>
        <translation>(Accedi → Naviga verso la tua mappa → Clicca &apos;Sono connesso&apos;)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="191"/>
        <source>I&apos;m Logged In - Export Data</source>
        <translation>Sono connesso - Esporta Dati</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="193"/>
        <source>Click this after logging in and navigating to your map</source>
        <translation>Clicca qui dopo aver effettuato l&apos;accesso e aver navigato verso la tua mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="196"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="264"/>
        <source>Initialization Error</source>
        <translation>Errore di Inizializzazione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="265"/>
        <source>Failed to initialize CalTopo browser:
{error}</source>
        <translation>Impossibile inizializzare il browser CalTopo:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="308"/>
        <source>Failed to Load</source>
        <translation>Caricamento Fallito</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="312"/>
        <source>Failed to load CalTopo. Please check your internet connection and try again.</source>
        <translation>Impossibile caricare CalTopo. Controlla la tua connessione internet e riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="341"/>
        <source>Current map: {map_id}</source>
        <translation>Mappa corrente: {map_id}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="358"/>
        <source>No Map Selected</source>
        <translation>Nessuna Mappa Selezionata</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="363"/>
        <source>Please navigate to a CalTopo map before capturing the session.

The map URL should contain a map ID (e.g., /m/ABC123 or #id=ABC123).</source>
        <translation>Naviga verso una mappa CalTopo prima di acquisire la sessione.

L&apos;URL della mappa deve contenere un ID mappa (es., /m/ABC123 o #id=ABC123).</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="369"/>
        <source>Browser Not Ready</source>
        <translation>Browser non pronto</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="371"/>
        <source>The CalTopo browser is still loading. Please wait a moment and try again.</source>
        <translation>Il browser CalTopo è ancora in fase di caricamento. Attendi un momento e riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="376"/>
        <source>Starting export...</source>
        <translation>Inizio esportazione...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="394"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="557"/>
        <source>Authentication Failed</source>
        <translation>Autenticazione Fallita</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="396"/>
        <source>Browser not initialized. Please try again.</source>
        <translation>Browser non inizializzato. Riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoAuthDialog.py" line="566"/>
        <source>Could not capture session cookies. Please ensure you are logged in to CalTopo.

Try:
1. Make sure you&apos;re logged in
2. Navigate to a map
3. Wait a few seconds for cookies to be set
4. Click &apos;I&apos;m Logged In&apos; again</source>
        <translation>Impossibile acquisire i cookie della sessione. Assicurati di aver effettuato l&apos;accesso a CalTopo.

Prova:
1. Assicurati di aver effettuato l&apos;accesso
2. Naviga verso una mappa
3. Attendi qualche secondo affinché i cookie vengano impostati
4. Clicca di nuovo su &apos;Sono connesso&apos;</translation>
    </message>
</context>
<context>
    <name>CalTopoCredentialDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="33"/>
        <source>CalTopo API Credentials</source>
        <translation>Credenziali API CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="76"/>
        <source>CalTopo Team API Credentials</source>
        <translation>Credenziali API Team CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="87"/>
        <source>Enter your CalTopo Team API credentials.
These can be found in the Team Admin page under Service Accounts.</source>
        <translation>Inserisci le tue credenziali API Team CalTopo.
Queste possono essere trovate nella pagina Team Admin sotto Service Accounts.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="97"/>
        <source>How to get your API credentials</source>
        <translation>Come ottenere le credenziali API</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="101"/>
        <source>Opens CalTopo API documentation in your browser</source>
        <translation>Apre la documentazione API CalTopo nel browser</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="107"/>
        <source>Change credentials</source>
        <translation>Cambia credenziali</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="114"/>
        <source>Team ID:</source>
        <translation>Team ID:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="116"/>
        <source>6-digit alphanumeric Team ID</source>
        <translation>Team ID alfanumerico di 6 cifre</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="123"/>
        <source>Credential ID:</source>
        <translation>ID Credenziale:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="125"/>
        <source>Credential ID</source>
        <translation>ID Credenziale</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="132"/>
        <source>Credential Secret:</source>
        <translation>Segreto Credenziale:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="134"/>
        <source>Credential Secret (will be encrypted)</source>
        <translation>Segreto Credenziale (sarà crittografato)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="146"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="309"/>
        <source>Test Credentials</source>
        <translation>Testa Credenziali</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="148"/>
        <source>Test the credentials by calling the CalTopo API</source>
        <translation>Testa le credenziali chiamando l&apos;API CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="150"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="154"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="226"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="230"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="234"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="254"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="258"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="262"/>
        <source>Invalid Input</source>
        <translation>Input Non Valido</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="226"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="254"/>
        <source>Please enter a Team ID.</source>
        <translation>Inserisci un ID Team.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="230"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="258"/>
        <source>Please enter a Credential ID.</source>
        <translation>Inserisci un ID Credenziale.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="234"/>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="262"/>
        <source>Please enter a Credential Secret.</source>
        <translation>Inserisci un Segreto Credenziale.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="267"/>
        <source>Testing...</source>
        <translation>Test in corso...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="282"/>
        <source>Credentials Valid</source>
        <translation>Credenziali Valide</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="284"/>
        <source>The credentials are valid and successfully authenticated with CalTopo API.</source>
        <translation>Le credenziali sono valide e l&apos;autenticazione con l&apos;API CalTopo è riuscita.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="288"/>
        <source>Credentials Invalid</source>
        <translation>Credenziali Non Valide</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="297"/>
        <source>The credentials failed to authenticate with CalTopo API.

Please check:
• Team ID is correct
• Credential ID is correct
• Credential Secret is correct (copy it exactly as shown)
• Your service account has the required permissions</source>
        <translation>Impossibile autenticare le credenziali con l&apos;API CalTopo.

Controlla:
• L&apos;ID Team è corretto
• L&apos;ID Credenziale è corretto
• Il Segreto Credenziale è corretto (copialo esattamente come mostrato)
• Il tuo account di servizio ha i permessi richiesti</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="301"/>
        <source>Test Error</source>
        <translation>Errore Test</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoCredentialDialog.py" line="302"/>
        <source>An error occurred while testing credentials:

{error}</source>
        <translation>Si è verificato un errore durante il test delle credenziali:

{error}</translation>
    </message>
</context>
<context>
    <name>CalTopoExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="441"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1507"/>
        <source>Offline Mode Enabled</source>
        <translation>Modalità Offline Abilitata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="448"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1514"/>
        <source>Offline Only is turned on in Preferences:

• Map tiles will not be retrieved.
• CalTopo integration is disabled.

Turn off Offline Only to export to CalTopo.</source>
        <translation>La modalità Solo Offline è attiva nelle Preferenze:

• I tasselli della mappa non verranno recuperati.
• L&apos;integrazione CalTopo è disabilitata.

Disattiva Solo Offline per esportare su CalTopo.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="454"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1520"/>
        <source>Nothing Selected</source>
        <translation>Nessuna Selezione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="458"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1524"/>
        <source>Select at least one data type (flagged AOIs, drone/image locations, or coverage area) to export.</source>
        <translation>Seleziona almeno un tipo di dati (AOI contrassegnate, posizioni drone/immagini o area di copertura) da esportare.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="464"/>
        <source>Preparing Export Data</source>
        <translation>Preparazione Dati Esportazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="467"/>
        <source>Preparing data for export...</source>
        <translation>Preparazione dei dati per l&apos;esportazione...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="468"/>
        <source>Processing images and AOIs...</source>
        <translation>Elaborazione immagini e AOI...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="512"/>
        <source>Preparation Error</source>
        <translation>Errore di Preparazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="515"/>
        <source>An error occurred while preparing export data:

{error}</source>
        <translation>Si è verificato un errore durante la preparazione dei dati di esportazione:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="523"/>
        <source>flagged AOIs</source>
        <translation>AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="525"/>
        <source>image locations</source>
        <translation>posizioni immagini</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="527"/>
        <source>coverage area</source>
        <translation>area di copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="534"/>
        <source>No flagged AOIs, geotagged image locations, or coverage areas are available.
Flag some AOIs with the &apos;F&apos; key or ensure your images have GPS metadata.</source>
        <translation>Non sono disponibili AOI contrassegnate, posizioni di immagini georeferenziate o aree di copertura.
Contrassegna alcune AOI con il tasto &apos;F&apos; o assicurati che le tue immagini abbiano metadati GPS.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="542"/>
        <source>Found {count} flagged AOI(s), but could not extract GPS coordinates.

This usually means:
• The images don&apos;t have GPS data in their EXIF metadata
• The image files have been moved or renamed

Please ensure your images have GPS coordinates embedded.</source>
        <translation>Trovate {count} AOI contrassegnate, ma non è stato possibile estrarre le coordinate GPS.

Questo di solito significa:
• Le immagini non hanno dati GPS nei loro metadati EXIF
• I file immagine sono stati spostati o rinominati

Assicurati che le tue immagini abbiano le coordinate GPS incorporate.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="548"/>
        <source>No geotagged drone/image locations were found.
Ensure your images contain GPS metadata and try again.</source>
        <translation>Non sono state trovate posizioni di droni/immagini georeferenziate.
Assicurati che le tue immagini contengano metadati GPS e riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="557"/>
        <source>No coverage area polygons could be calculated.

This usually means:
• The images don&apos;t have GPS data in their EXIF metadata
• The images are not nadir (gimbal pitch must be between -85° and -95°)
• GSD (ground sample distance) could not be calculated

Please ensure your images have GPS coordinates and are nadir shots.</source>
        <translation>Non è stato possibile calcolare alcun poligono dell&apos;area di copertura.

Questo di solito significa:
• Le immagini non hanno dati GPS nei loro metadati EXIF
• Le immagini non sono nadirali (l&apos;inclinazione del gimbal deve essere compresa tra -85° e -95°)
• Non è stato possibile calcolare la GSD (ground sample distance)

Assicurati che le tue immagini abbiano le coordinate GPS e siano scatti nadirali.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="560"/>
        <source>No {types} are available to export.</source>
        <translation>Nessun {types} disponibile per l&apos;esportazione.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="564"/>
        <source>Nothing to Export</source>
        <translation>Nulla da Esportare</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="585"/>
        <source>No Map Selected</source>
        <translation>Nessuna Mappa Selezionata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="591"/>
        <source>Please navigate to a CalTopo map before clicking &apos;I&apos;m Logged In&apos;.

The map URL should look like:
https://caltopo.com/map.html#...&amp;id=ABC123</source>
        <translation>Naviga verso una mappa CalTopo prima di cliccare su &apos;Sono connesso&apos;.

L&apos;URL della mappa dovrebbe essere simile a:
https://caltopo.com/map.html#...&amp;id=ABC123</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="649"/>
        <source>{count} marker(s)</source>
        <translation>{count} marcatore/i</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="653"/>
        <source>{count} polygon(s)</source>
        <translation>{count} poligono/i</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="656"/>
        <source> and </source>
        <translation> e </translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="661"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1716"/>
        <source>Export Successful</source>
        <translation>Esportazione Riuscita</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="665"/>
        <source>Successfully exported all {items} to CalTopo map {map_id}.

The items should now be visible on your map.</source>
        <translation>Esportati con successo tutti gli {items} sulla mappa CalTopo {map_id}.

Gli elementi dovrebbero ora essere visibili sulla tua mappa.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="670"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1725"/>
        <source>Partial Success</source>
        <translation>Successo Parziale</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="674"/>
        <source>Exported {success} of {total} item(s) ({items}) to CalTopo map {map_id}.

{failed} item(s) failed. Check console for details.</source>
        <translation>Esportati {success} di {total} elementi ({items}) sulla mappa CalTopo {map_id}.

{failed} elementi falliti. Controlla la console per i dettagli.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="686"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1738"/>
        <source>Export Failed</source>
        <translation>Esportazione Fallita</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="691"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1743"/>
        <source>Failed to export items to CalTopo.

Please check the console output for error details.</source>
        <translation>Impossibile esportare gli elementi su CalTopo.

Controlla l&apos;output della console per i dettagli dell&apos;errore.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="698"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1646"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1751"/>
        <source>Export Error</source>
        <translation>Errore di Esportazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="701"/>
        <source>An error occurred during CalTopo export:

{error}</source>
        <translation>Si è verificato un errore durante l&apos;esportazione su CalTopo:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1004"/>
        <source>Coverage area: {sqkm:.3f} km² ({acres:.2f} acres)
Area in square meters: {sqm:.0f} m²
Number of corners: {count}</source>
        <translation>Area di copertura: {sqkm:.3f} km² ({acres:.2f} acri)
Area in metri quadrati: {sqm:.0f} m²
Numero di angoli: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1045"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1329"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1677"/>
        <source>Exporting to CalTopo</source>
        <translation>Esportazione su CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1048"/>
        <source>Exporting markers to CalTopo...</source>
        <translation>Esportazione marcatori su CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1050"/>
        <source>Preparing to export {count} marker(s)...</source>
        <translation>Preparazione all&apos;esportazione di {count} marcatore/i...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1296"/>
        <source>Export complete: {success} of {total} marker(s) exported</source>
        <translation>Esportazione completata: {success} di {total} marcatore/i esportati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1332"/>
        <source>Exporting polygons to CalTopo...</source>
        <translation>Esportazione poligoni su CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1334"/>
        <source>Preparing to export {count} polygon(s)...</source>
        <translation>Preparazione all&apos;esportazione di {count} poligono/i...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1462"/>
        <source>Export complete: {success} of {total} polygon(s) exported</source>
        <translation>Esportazione completata: {success} di {total} poligono/i esportati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1479"/>
        <source>Logged Out</source>
        <translation>Disconnesso</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1481"/>
        <source>Successfully logged out from CalTopo.</source>
        <translation>Disconnessione da CalTopo riuscita.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1545"/>
        <source>Loading CalTopo Maps</source>
        <translation>Caricamento Mappe CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1548"/>
        <source>Connecting to CalTopo...</source>
        <translation>Connessione a CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1549"/>
        <source>Fetching account data and maps...</source>
        <translation>Recupero dati account e mappe...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1587"/>
        <source>Connection Error</source>
        <translation>Errore di Connessione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1590"/>
        <source>An error occurred while connecting to CalTopo API:

{error}</source>
        <translation>Si è verificato un errore durante la connessione all&apos;API CalTopo:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1597"/>
        <source>Authentication Failed</source>
        <translation>Autenticazione Fallita</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1602"/>
        <source>Failed to authenticate with CalTopo API.

Please check your credentials and try again.</source>
        <translation>Impossibile autenticare con l&apos;API CalTopo.

Controlla le tue credenziali e riprova.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1649"/>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1754"/>
        <source>An error occurred during CalTopo API export:

{error}</source>
        <translation>Si è verificato un errore durante l&apos;esportazione tramite API CalTopo:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1680"/>
        <source>Exporting to CalTopo...</source>
        <translation>Esportazione su CalTopo...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1681"/>
        <source>Preparing data and exporting...</source>
        <translation>Preparazione dati ed esportazione...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1720"/>
        <source>Successfully exported all {total} item(s) to CalTopo map.

The items should now be visible on your map.</source>
        <translation>Esportati con successo tutti i {total} elementi sulla mappa CalTopo.

Gli elementi dovrebbero ora essere visibili sulla tua mappa.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CalTopoExportController.py" line="1729"/>
        <source>Exported {success} of {total} item(s) to CalTopo map.

{failed} item(s) failed. Check console for details.</source>
        <translation>Esportati {success} di {total} elementi sulla mappa CalTopo.

{failed} elementi falliti. Controlla la console per i dettagli.</translation>
    </message>
</context>
<context>
    <name>CalTopoMapDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="35"/>
        <source>Select CalTopo Map</source>
        <translation>Seleziona Mappa CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="51"/>
        <source>Select a CalTopo map to export flagged AOIs:</source>
        <translation>Seleziona una mappa CalTopo per esportare le AOI contrassegnate:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="60"/>
        <source>Search:</source>
        <translation>Cerca:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="62"/>
        <source>Filter maps by name...</source>
        <translation>Filtra mappe per nome...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="83"/>
        <source>Select Map</source>
        <translation>Seleziona Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMapDialog.py" line="87"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
</context>
<context>
    <name>CalTopoMethodDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="34"/>
        <source>CalTopo Export Method</source>
        <translation>Metodo di Esportazione CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="52"/>
        <source>Select CalTopo Export Method</source>
        <translation>Seleziona Metodo di Esportazione CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="62"/>
        <source>Choose how you want to authenticate with CalTopo:</source>
        <translation>Scegli come vuoi autenticarti con CalTopo:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="68"/>
        <source>Export Method</source>
        <translation>Metodo di Esportazione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="72"/>
        <source>API (Recommended for CalTopo Team Account)</source>
        <translation>API (Consigliato per Account Team CalTopo)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="77"/>
        <source>Use CalTopo Team API with service account credentials.
Best for Teams accounts with service accounts configured.</source>
        <translation>Usa l&apos;API Team CalTopo con le credenziali dell&apos;account di servizio.
Ideale per gli account Team con account di servizio configurati.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="79"/>
        <source>Browser Login</source>
        <translation>Accesso tramite Browser</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="83"/>
        <source>Use browser-based authentication.
Log in through an embedded browser window.</source>
        <translation>Usa l&apos;autenticazione basata su browser.
Accedi tramite una finestra del browser integrata.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="98"/>
        <source>API method requires Team ID and Credential Secret from your
CalTopo Team Admin page. Browser method uses your regular login.</source>
        <translation>Il metodo API richiede l&apos;ID Team e il Segreto Credenziale dalla tua
pagina Admin Team CalTopo. Il metodo Browser utilizza il tuo normale accesso.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="109"/>
        <source>Continue</source>
        <translation>Continua</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/CalTopoMethodDialog.py" line="113"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
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
Clicca per cambiare colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRowWizardWidget.py" line="71"/>
        <location filename="../app/algorithms/Shared/views/HSVColorRowWizardWidget.py" line="71"/>
        <source>HSV: ({h}, {s}, {v})
Click to change color</source>
        <translation>HSV: ({h}, {s}, {v})
Clicca per cambiare colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/Shared/views/HSVColorRowWidget.py" line="79"/>
        <source>HSV: ({h}°, {s}%, {v}%)
RGB: ({r}, {g}, {b})
Click to change color</source>
        <translation>HSV: ({h}°, {s}%, {v}%)
RGB: ({r}, {g}, {b})
Clicca per cambiare colore</translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionControlWidget</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="52"/>
        <source>Color Anomaly</source>
        <translation>Anomalia Colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="53"/>
        <source>Motion Detection</source>
        <translation>Rilevamento Movimento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="54"/>
        <source>Fusion</source>
        <translation>Fusione</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="59"/>
        <source>Input &amp;&amp; Processing</source>
        <translation>Input &amp;&amp; Elaborazione</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="60"/>
        <source>Frame</source>
        <translation>Frame</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/views/ColorAnomalyAndMotionDetectionControlWidget.py" line="61"/>
        <source>Rendering &amp;&amp; Cleanup</source>
        <translation>Rendering &amp;&amp; Pulizia</translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="12"/>
        <source>Color Anomaly Detection</source>
        <translation>Rilevamento Anomalie Colore</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="16"/>
        <source>Enable Color Anomaly Detection</source>
        <translation>Abilita Rilevamento Anomalie Colore</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="27"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>Quanto aggressivamente dovrebbe ADIAT cercare le anomalie?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="38"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Nota: un&apos;impostazione più alta troverà più potenziali anomalie ma potrebbe anche aumentare i falsi positivi.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="56"/>
        <source>Motion Detection</source>
        <translation>Rilevamento Movimento</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="65"/>
        <source>Do you want to enable motion detection?</source>
        <translation>Vuoi abilitare il rilevamento del movimento?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="73"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorAnomalyAndMotionDetectionWizard.ui" line="79"/>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
</context>
<context>
    <name>ColorDetectionControlWidget</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="66"/>
        <source>Color Selection</source>
        <translation>Selezione Colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="67"/>
        <source>Detection</source>
        <translation>Rilevamento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="68"/>
        <source>Input &amp;&amp; Processing</source>
        <translation>Input &amp;&amp; Elaborazione</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="69"/>
        <source>Frame</source>
        <translation>Frame</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="70"/>
        <source>Rendering &amp;&amp; Cleanup</source>
        <translation>Rendering &amp;&amp; Pulizia</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="79"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="86"/>
        <source>Add a new color range to detect.
Choose from HSV Color Picker, Image, List, or Recent Colors.
You can add multiple color ranges to detect different colors simultaneously.</source>
        <translation>Aggiungi un nuovo intervallo di colori da rilevare.
Scegli tra Selettore Colore HSV, Immagine, Elenco o Colori Recenti.
Puoi aggiungere più intervalli di colori per rilevare diversi colori contemporaneamente.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="102"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="110"/>
        <source>View HSV color ranges for all configured colors.
Opens a viewer dialog for each color range showing
the hue, saturation, and value ranges that will be detected.
Useful for understanding and fine-tuning multi-color detection.</source>
        <translation>Visualizza gli intervalli di colore HSV per tutti i colori configurati.
Apre una finestra di visualizzazione per ogni intervallo di colore mostrando
gli intervalli di tonalità, saturazione e valore che verranno rilevati.
Utile per comprendere e perfezionare il rilevamento multicolore.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="145"/>
        <source>Min Object Area (px):</source>
        <translation>Area Min Oggetto (px):</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="157"/>
        <source>Minimum detection area in pixels (10-50000).
Filters out very small detections (noise, small objects, fragments).
Lower values = detect smaller objects, more detections, more noise.
Higher values = only large objects, fewer detections, less noise.
Recommended: 100 for general use, 50 for small objects, 200-500 for large objects.</source>
        <translation>Area di rilevamento minima in pixel (10-50000).
Filtra i rilevamenti molto piccoli (rumore, piccoli oggetti, frammenti).
Valori più bassi = rileva oggetti più piccoli, più rilevamenti, più rumore.
Valori più alti = solo oggetti grandi, meno rilevamenti, meno rumore.
Consigliato: 100 per uso generale, 50 per piccoli oggetti, 200-500 per grandi oggetti.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="160"/>
        <source>Max Object Area (px):</source>
        <translation>Area Max Oggetto (px):</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="172"/>
        <source>Maximum detection area in pixels (100-500000).
Filters out very large detections (shadows, lighting changes, entire scene).
Lower values = only small/medium objects.
Higher values = allow large objects, may include unwanted large regions.
Recommended: 100000 for general use, 50000 for small objects, 200000+ for large objects.</source>
        <translation>Area di rilevamento massima in pixel (100-500000).
Filtra i rilevamenti molto grandi (ombre, cambiamenti di luce, intera scena).
Valori più bassi = solo oggetti piccoli/medi.
Valori più alti = consente oggetti grandi, può includere grandi regioni indesiderate.
Consigliato: 100000 per uso generale, 50000 per piccoli oggetti, 200000+ per grandi oggetti.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="175"/>
        <source>Confidence Threshold:</source>
        <translation>Soglia di Confidenza:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="191"/>
        <source>Minimum confidence score to accept a detection (0-100%).
Confidence is calculated from:
• Size score: area relative to max area
• Shape score: solidity (how compact/regular the shape is)
• Final: average of both scores

Lower values (0-30%) = accept more detections, including weak/fragmented ones.
Higher values (70-100%) = only high-quality detections, well-formed shapes.
Recommended: 50% for balanced filtering, 30% for more detections, 70% for strict quality.</source>
        <translation>Punteggio di confidenza minimo per accettare un rilevamento (0-100%).
La confidenza è calcolata da:
• Punteggio dimensione: area relativa all&apos;area massima
• Punteggio forma: solidità (quanto è compatta/regolare la forma)
• Finale: media di entrambi i punteggi

Valori più bassi (0-30%) = accetta più rilevamenti, inclusi quelli deboli/frammentati.
Valori più alti (70-100%) = solo rilevamenti di alta qualità, forme ben formate.
Consigliato: 50% per un filtraggio bilanciato, 30% per più rilevamenti, 70% per qualità rigorosa.</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="193"/>
        <source>50%</source>
        <translation>50%</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="318"/>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="371"/>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="406"/>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="660"/>
        <source>Color_{index}</source>
        <translation>Colore_{index}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/views/ColorDetectionControlWidget.py" line="489"/>
        <source>Color Ranges: {count} colors</source>
        <translation>Intervalli Colore: {count} colori</translation>
    </message>
</context>
<context>
    <name>ColorDetectionWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ColorDetectionWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
    </message>
</context>
<context>
    <name>ColorDetectionWizardController</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="52"/>
        <source>No Colors Selected</source>
        <translation>Nessun Colore Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="62"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="244"/>
        <source>Color Ranges: {count} colors</source>
        <translation>Intervalli Colore: {count} colori</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorDetection/controllers/ColorDetectionWizardController.py" line="330"/>
        <source>Please add at least one color to detect.</source>
        <translation>Aggiungi almeno un colore da rilevare.</translation>
    </message>
</context>
<context>
    <name>ColorListDialog</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="30"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="30"/>
        <source>Select Color from List</source>
        <translation>Seleziona Colore dall&apos;Elenco</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="42"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="42"/>
        <source>Search:</source>
        <translation>Cerca:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="44"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="44"/>
        <source>Filter by name or uses…</source>
        <translation>Filtra per nome o utilizzi…</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="61"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="56"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="61"/>
        <source>Name</source>
        <translation>Nome</translation>
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
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="57"/>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="62"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="57"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="62"/>
        <source>Uses</source>
        <translation>Utilizzi</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorListDialog.py" line="73"/>
        <location filename="../app/algorithms/Shared/views/ColorListDialog.py" line="73"/>
        <source>Use Color</source>
        <translation>Usa Colore</translation>
    </message>
</context>
<context>
    <name>ColorPickerDialog</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerDialog.py" line="35"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerDialog.py" line="35"/>
        <source>Select Color from Image</source>
        <translation>Seleziona Colore dall&apos;Immagine</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerDialog.py" line="55"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerDialog.py" line="55"/>
        <source>Use Color</source>
        <translation>Usa Colore</translation>
    </message>
</context>
<context>
    <name>ColorPickerImageViewer</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="97"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="97"/>
        <source>Load Image</source>
        <translation>Carica Immagine</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="102"/>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="290"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="102"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="290"/>
        <source>Color Selector</source>
        <translation>Selettore Colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="159"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="159"/>
        <source>Select Image</source>
        <translation>Seleziona Immagine</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="173"/>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="230"/>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="588"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="173"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="230"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="588"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="174"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="174"/>
        <source>Could not load image: {path}</source>
        <translation>Impossibile caricare l&apos;immagine: {path}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="231"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="231"/>
        <source>Error loading image: {error}</source>
        <translation>Errore durante il caricamento dell&apos;immagine: {error}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="286"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="286"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="358"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="358"/>
        <source>RGB: ({r}, {g}, {b}) {hex} | HSV: ({h}°, {s}%, {v}%)</source>
        <translation>RGB: ({r}, {g}, {b}) {hex} | HSV: ({h}°, {s}%, {v}%)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="446"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="446"/>
        <source>RGB: ({r}, {g}, {b}) {hex} | HSV: {h}°, {s}%, {v}% (hover)</source>
        <translation>RGB: ({r}, {g}, {b}) {hex} | HSV: {h}°, {s}%, {v}% (passaggio mouse)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/ColorPickerImageViewer.py" line="589"/>
        <location filename="../app/algorithms/Shared/views/ColorPickerImageViewer.py" line="589"/>
        <source>Error setting image: {error}</source>
        <translation>Errore durante l&apos;impostazione dell&apos;immagine: {error}</translation>
    </message>
</context>
<context>
    <name>ColorRange</name>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="42"/>
        <source>Add a new color range to detect. Each color can have its own RGB range tolerances.</source>
        <translation>Aggiungi un nuovo intervallo di colori da rilevare. Ogni colore può avere le proprie tolleranze di intervallo RGB.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="45"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
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
        <translation>Apre la finestra Visualizzatore Intervallo per:
- Vedere l&apos;intervallo di colori che verranno cercati nell&apos;analisi dell&apos;immagine.
Usa questo per vedere quali colori verranno rilevati e ottimizzare gli intervalli di colore prima dell&apos;elaborazione.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ColorRange.ui" line="88"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
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
        <translation>Nessun Colore Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeController.py" line="325"/>
        <source>Please add at least one color to detect.</source>
        <translation>Aggiungi almeno un colore da rilevare.</translation>
    </message>
</context>
<context>
    <name>ColorRangeDialog</name>
    <message>
        <location filename="../app/algorithms/Shared/views/ColorRangeDialog.py" line="39"/>
        <source>HSV Color Range Selection</source>
        <translation>Selezione Intervallo Colore HSV</translation>
    </message>
    <message>
        <location filename="../app/algorithms/Shared/views/ColorRangeDialog.py" line="381"/>
        <source>Select Color</source>
        <translation>Seleziona Colore</translation>
    </message>
</context>
<context>
    <name>ColorRangeViewer</name>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="14"/>
        <source>Color Range Viewer</source>
        <translation>Visualizzatore Intervallo Colore</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="37"/>
        <source>Selected images for viewing.
Shows images that you&apos;ve chosen to view in the range viewer.
Click on images below to add or remove them from this section.</source>
        <translation>Immagini selezionate per la visualizzazione.
Mostra le immagini che hai scelto di visualizzare nel visualizzatore di intervalli.
Fai clic sulle immagini sottostanti per aggiungerle o rimuoverle da questa sezione.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="42"/>
        <source>Selected</source>
        <translation>Selezionate</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="76"/>
        <source>Available images for viewing.
Shows all images from the input folder that are available to select.
Click on images to move them to the Selected section above.</source>
        <translation>Immagini disponibili per la visualizzazione.
Mostra tutte le immagini della cartella di input disponibili per la selezione.
Fai clic sulle immagini per spostarle nella sezione Selezionate in alto.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RangeViewer.ui" line="81"/>
        <source>Unselected</source>
        <translation>Non Selezionate</translation>
    </message>
</context>
<context>
    <name>ColorRangeWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ColorRangeWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
    </message>
</context>
<context>
    <name>ColorRangeWizardController</name>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeWizardController.py" line="69"/>
        <source>No Colors Selected</source>
        <translation>Nessun Colore Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeWizardController.py" line="79"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ColorRange/controllers/ColorRangeWizardController.py" line="259"/>
        <source>Please add at least one color to detect.</source>
        <translation>Aggiungi almeno un colore da rilevare.</translation>
    </message>
</context>
<context>
    <name>CoordinateController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="124"/>
        <source>GPS Coordinates: {coords}</source>
        <translation>Coordinate GPS: {coords}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="150"/>
        <source>📋 Copy coordinates</source>
        <translation>📋 Copia coordinate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="154"/>
        <source>🗺️ Open in Google Maps</source>
        <translation>🗺️ Apri in Google Maps</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="158"/>
        <source>🌍 View in Google Earth</source>
        <translation>🌍 Visualizza in Google Earth</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="162"/>
        <source>📱 Send via WhatsApp</source>
        <translation>📱 Invia tramite WhatsApp</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="166"/>
        <source>📨 Send via Telegram</source>
        <translation>📨 Invia tramite Telegram</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="238"/>
        <source>Coordinates copied</source>
        <translation>Coordinate copiate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="248"/>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="262"/>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="325"/>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="345"/>
        <source>Coordinates unavailable</source>
        <translation>Coordinate non disponibili</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="332"/>
        <source>Coordinate: {lat}, {lon} — {maps}</source>
        <translation>Coordinata: {lat}, {lon} — {maps}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="352"/>
        <source>Coordinates: {lat}, {lon}</source>
        <translation>Coordinate: {lat}, {lon}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="392"/>
        <source>No bearing info available</source>
        <translation>Nessuna info sull&apos;orientamento disponibile</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="433"/>
        <source>North-Oriented View (Rotated {angle:.1f}°)</source>
        <translation>Vista orientata a Nord (Ruotata di {angle:.1f}°)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="466"/>
        <source>Original bearing: {bearing:.1f}° | Rotation applied: {rotation:.1f}°</source>
        <translation>Orientamento originale: {bearing:.1f}° | Rotazione applicata: {rotation:.1f}°</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="475"/>
        <source>↑ NORTH</source>
        <translation>↑ NORD</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="484"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/CoordinateController.py" line="495"/>
        <source>Error: {error}</source>
        <translation>Errore: {error}</translation>
    </message>
</context>
<context>
    <name>CoordinatorWindow</name>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="30"/>
        <source>Search Coordinator</source>
        <translation>Coordinatore di Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="49"/>
        <source>Create New Search</source>
        <translation>Crea Nuova Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="54"/>
        <source>Open Existing Search</source>
        <translation>Apri Ricerca Esistente</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="59"/>
        <source>Save Search</source>
        <translation>Salva Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="65"/>
        <source>Add Batches to Search</source>
        <translation>Aggiungi Batch alla Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="70"/>
        <source>Add more batch XML files to the current search project</source>
        <translation>Aggiungi altri file XML batch al progetto di ricerca corrente</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="87"/>
        <source>Dashboard</source>
        <translation>Dashboard</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="91"/>
        <source>Batch Status</source>
        <translation>Stato Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="95"/>
        <source>AOI Analysis</source>
        <translation>Analisi AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="103"/>
        <source>Load Review XML</source>
        <translation>Carica XML di Revisione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="109"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="610"/>
        <source>Export Consolidated Results</source>
        <translation>Esporta Risultati Consolidati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="121"/>
        <source>Project Information</source>
        <translation>Informazioni Progetto</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="126"/>
        <source>No project loaded</source>
        <translation>Nessun progetto caricato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="128"/>
        <source>Project:</source>
        <translation>Progetto:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="133"/>
        <source>Created by:</source>
        <translation>Creato da:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="138"/>
        <source>Date:</source>
        <translation>Data:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="157"/>
        <source>Total Batches</source>
        <translation>Batch Totali</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="158"/>
        <source>Total Images</source>
        <translation>Immagini Totali</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="159"/>
        <source>Total Reviews</source>
        <translation>Revisioni Totali</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="160"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="305"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="337"/>
        <source>Reviewers</source>
        <translation>Revisori</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="170"/>
        <source>Review Progress</source>
        <translation>Progresso Revisione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="175"/>
        <source>Overall Completion:</source>
        <translation>Completamento Totale:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="180"/>
        <source>0%</source>
        <translation>0%</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="194"/>
        <source>Not Reviewed</source>
        <translation>Non Revisionato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="203"/>
        <source>In Progress</source>
        <translation>In Corso</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="212"/>
        <source>Complete</source>
        <translation>Completato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="220"/>
        <source>AOI Summary</source>
        <translation>Riepilogo AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="228"/>
        <source>Total AOIs</source>
        <translation>AOI Totali</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="236"/>
        <source>Flagged AOIs</source>
        <translation>AOI Contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="243"/>
        <source>Active Reviewers</source>
        <translation>Revisori Attivi</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="245"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="666"/>
        <source>No reviewers yet</source>
        <translation>Ancora nessun revisore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="293"/>
        <source>Batch review status and assignments. Load reviewer XMLs to update progress.</source>
        <translation>Stato della revisione batch e assegnazioni. Carica gli XML dei revisori per aggiornare il progresso.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="301"/>
        <source>Batch ID</source>
        <translation>ID Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="302"/>
        <source>Algorithm</source>
        <translation>Algoritmo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="303"/>
        <source>Images</source>
        <translation>Immagini</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="304"/>
        <source>Reviews</source>
        <translation>Revisioni</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="307"/>
        <source>Status</source>
        <translation>Stato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="326"/>
        <source>Consolidated AOI data from all reviews. Shows flag counts and reviewer comments.</source>
        <translation>Dati AOI consolidati da tutte le revisioni. Mostra il numero di contrassegni e i commenti dei revisori.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="334"/>
        <source>Image</source>
        <translation>Immagine</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="335"/>
        <source>Location</source>
        <translation>Posizione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="336"/>
        <source>Flag Count</source>
        <translation>Conteggio Contrassegni</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="339"/>
        <source>Comments</source>
        <translation>Commenti</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="355"/>
        <source>New Search Project</source>
        <translation>Nuovo Progetto di Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="357"/>
        <source>Enter project name:</source>
        <translation>Inserisci il nome del progetto:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="365"/>
        <source>Coordinator Information</source>
        <translation>Informazioni Coordinatore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="367"/>
        <source>Enter your name:</source>
        <translation>Inserisci il tuo nome:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="375"/>
        <source>Select Batch Files</source>
        <translation>Seleziona File Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="376"/>
        <source>Select Initial Batch XML Files</source>
        <translation>Seleziona i File XML Batch Iniziali</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="385"/>
        <source>You can select multiple ADIAT_Data.xml files from different folders.

Tips:
• Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
• You can add more batches later using &apos;Add Batches to Search&apos; button
• Each batch should be a processed ADIAT_Data.xml file</source>
        <translation>Puoi selezionare più file ADIAT_Data.xml da diverse cartelle.

Suggerimenti:
• Tieni premuto Ctrl (Windows/Linux) o Cmd (Mac) per selezionare più file
• Puoi aggiungere altri batch in seguito usando il pulsante &apos;Aggiungi Batch alla Ricerca&apos;
• Ogni batch deve essere un file ADIAT_Data.xml elaborato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="393"/>
        <source>Select Batch ADIAT_Data.xml Files (Hold Ctrl to select multiple)</source>
        <translation>Seleziona i File ADIAT_Data.xml Batch (Tieni premuto Ctrl per selezionarne più di uno)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="396"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="411"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="511"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="558"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="613"/>
        <source>XML Files (*.xml)</source>
        <translation>File XML (*.xml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="408"/>
        <source>Save Search Project</source>
        <translation>Salva Progetto di Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="420"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="453"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="469"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="529"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="593"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="619"/>
        <source>Success</source>
        <translation>Successo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="421"/>
        <source>Search project &apos;{project}&apos; created successfully!</source>
        <translation>Progetto di ricerca &apos;{project}&apos; creato con successo!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="428"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="432"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="459"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="473"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="599"/>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="623"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="430"/>
        <source>Failed to save project file.</source>
        <translation>Impossibile salvare il file di progetto.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="432"/>
        <source>Failed to create project.</source>
        <translation>Impossibile creare il progetto.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="438"/>
        <source>Open Search Project</source>
        <translation>Apri Progetto di Ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="441"/>
        <source>Search Project Files (ADIAT_Search_*.xml);;All XML Files (*.xml)</source>
        <translation>File Progetto di Ricerca (ADIAT_Search_*.xml);;Tutti i File XML (*.xml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="455"/>
        <source>Project loaded successfully!</source>
        <translation>Progetto caricato con successo!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="461"/>
        <source>Failed to load project file.</source>
        <translation>Impossibile caricare il file di progetto.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="471"/>
        <source>Project saved successfully!</source>
        <translation>Progetto salvato con successo!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="473"/>
        <source>Failed to save project.</source>
        <translation>Impossibile salvare il progetto.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="480"/>
        <source>No Project</source>
        <translation>Nessun Progetto</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="482"/>
        <source>Please create or open a project first.</source>
        <translation>Crea o apri prima un progetto.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="488"/>
        <source>Add Batches</source>
        <translation>Aggiungi Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="489"/>
        <source>Add More Batch XML Files</source>
        <translation>Aggiungi Altri File XML Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="499"/>
        <source>Select additional ADIAT_Data.xml batch files to add to this search.

Tips:
• Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
• Files can be in different folders
• Each batch should be a processed ADIAT_Data.xml file
• New batches will be numbered sequentially</source>
        <translation>Seleziona file batch ADIAT_Data.xml aggiuntivi da aggiungere a questa ricerca.

Suggerimenti:
• Tieni premuto Ctrl (Windows/Linux) o Cmd (Mac) per selezionare più file
• I file possono trovarsi in cartelle diverse
• Ogni batch deve essere un file ADIAT_Data.xml elaborato
• I nuovi batch verranno numerati sequenzialmente</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="508"/>
        <source>Select Batch ADIAT_Data.xml Files to Add (Hold Ctrl to select multiple)</source>
        <translation>Seleziona i File ADIAT_Data.xml Batch da Aggiungere (Tieni premuto Ctrl per selezionarne più di uno)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="533"/>
        <source>Successfully added {count} batch(es) to the project!
Total batches: {total}</source>
        <translation>Aggiunti con successo {count} batch al progetto!
Batch totali: {total}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="541"/>
        <source>No Batches Added</source>
        <translation>Nessun Batch Aggiunto</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="545"/>
        <source>No batches were added. Check that the XML files are valid ADIAT_Data.xml files.</source>
        <translation>Nessun batch aggiunto. Controlla che i file XML siano file ADIAT_Data.xml validi.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="555"/>
        <source>Select Reviewer&apos;s ADIAT_Data.xml File</source>
        <translation>Seleziona il file ADIAT_Data.xml del revisore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="568"/>
        <source>No Batches</source>
        <translation>Nessun Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="570"/>
        <source>No batches found in project.</source>
        <translation>Nessun batch trovato nel progetto.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="577"/>
        <source>Select Batch</source>
        <translation>Seleziona Batch</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="578"/>
        <source>Which batch does this review belong to?</source>
        <translation>A quale batch appartiene questa revisione?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="595"/>
        <source>Review data loaded and merged successfully!</source>
        <translation>Dati di revisione caricati e uniti con successo!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="601"/>
        <source>Failed to load review data.</source>
        <translation>Impossibile caricare i dati di revisione.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="620"/>
        <source>Consolidated results exported to:
{path}</source>
        <translation>Risultati consolidati esportati in:
{path}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/coordinator/CoordinatorWindow.py" line="623"/>
        <source>Failed to export results.</source>
        <translation>Impossibile esportare i risultati.</translation>
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
        <translation>Genera KML Estensione Copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="134"/>
        <source>Generate a KML file showing the geographic coverage extent of all images?

This will create polygon(s) representing the area covered by all images. Overlapping image areas will be merged into a single polygon.</source>
        <translation>Generare un file KML che mostri l&apos;estensione della copertura geografica di tutte le immagini?

Questo creerà dei poligoni che rappresentano l&apos;area coperta da tutte le immagini. Le aree delle immagini sovrapposte verranno unite in un unico poligono.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="145"/>
        <source>Save Coverage Extent KML</source>
        <translation>Salva KML Estensione Copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="148"/>
        <source>KML files (*.kml)</source>
        <translation>File KML (*.kml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="156"/>
        <source>Generating Coverage Extent KML</source>
        <translation>Generazione KML Estensione Copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="159"/>
        <source>Calculating coverage extent...</source>
        <translation>Calcolo dell&apos;estensione della copertura...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="202"/>
        <source>Error generating coverage extent KML</source>
        <translation>Errore durante la generazione del file KML dell&apos;estensione della copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="208"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="256"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="209"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="257"/>
        <source>Failed to generate coverage extent KML:
{error}</source>
        <translation>Impossibile generare il file KML dell&apos;estensione della copertura:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="239"/>
        <source>Coverage extent generation cancelled</source>
        <translation>Generazione dell&apos;estensione della copertura annullata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="250"/>
        <source>Error generating coverage extent</source>
        <translation>Errore durante la generazione dell&apos;estensione della copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="263"/>
        <source>No valid images found for coverage extent calculation</source>
        <translation>Nessuna immagine valida trovata per il calcolo dell&apos;estensione della copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="269"/>
        <source>Coverage Extent</source>
        <translation>Estensione della Copertura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="278"/>
        <source>Could not calculate coverage extent.

Images processed: {processed}
Images skipped: {skipped}

Images may be skipped for the following reasons:
  • Missing GPS data in EXIF
  • No valid GSD (missing altitude/focal length)
  • Gimbal not nadir (must be -85° to -95°)</source>
        <translation>Impossibile calcolare l&apos;estensione della copertura.

Immagini elaborate: {processed}
Immagini saltate: {skipped}

Le immagini possono essere saltate per i seguenti motivi:
  • Dati GPS mancanti negli EXIF
  • Nessun GSD valido (altitudine/lunghezza focale mancante)
  • Gimbal non nadirale (deve essere tra -85° e -95°)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="293"/>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="294"/>
        <source>{value:.2f} acres</source>
        <translation>{value:.2f} acri</translation>
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
        <translation>KML dell&apos;estensione della copertura salvato: {area}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="317"/>
        <source>

Images may be skipped for:
  • Missing GPS data
  • No valid GSD
  • Gimbal not nadir</source>
        <translation>

Le immagini possono essere saltate per:
  • Dati GPS mancanti
  • Nessun GSD valido
  • Gimbal non nadirale</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="319"/>
        <source>Coverage Extent KML Generated</source>
        <translation>KML dell&apos;Estensione della Copertura Generato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/CoverageExtentExportController.py" line="327"/>
        <source>Coverage extent KML file created successfully!

File: {file}
Images processed: {processed}
Images skipped: {skipped}
Coverage areas: {areas}
Total area: {area}{skip_info}</source>
        <translation>File KML dell&apos;estensione della copertura creato con successo!

File: {file}
Immagini elaborate: {processed}
Immagini saltate: {skipped}
Aree di copertura: {areas}
Area totale: {area}{skip_info}</translation>
    </message>
</context>
<context>
    <name>DirectoriesPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/DirectoriesPage.py" line="55"/>
        <source>Select Input Directory</source>
        <translation>Seleziona Cartella di Input</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/DirectoriesPage.py" line="72"/>
        <source>Select Output Directory</source>
        <translation>Seleziona Cartella di Output</translation>
    </message>
</context>
<context>
    <name>ExportProgressDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="58"/>
        <source>Processing...</source>
        <translation>Elaborazione in corso...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="72"/>
        <source>Starting...</source>
        <translation>Avvio in corso...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="76"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="103"/>
        <source>Cancelling...</source>
        <translation>Annullamento in corso...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ExportProgressDialog.py" line="104"/>
        <source>Cancellation requested...</source>
        <translation>Annullamento richiesto...</translation>
    </message>
</context>
<context>
    <name>FrameTab</name>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="214"/>
        <source>Invalid Image</source>
        <translation>Immagine Non Valida</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="215"/>
        <source>{error}</source>
        <translation>{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="219"/>
        <source>Could not load the selected image. Please choose a valid image file.</source>
        <translation>Impossibile caricare l&apos;immagine selezionata. Scegli un file immagine valido.</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="226"/>
        <source>Aspect Ratio Mismatch</source>
        <translation>Mancata Corrispondenza Proporzioni</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/FrameTab.py" line="231"/>
        <source>{error}

The mask will be scaled to fit, which may cause distortion.

Do you want to continue?</source>
        <translation>{error}

La maschera verrà scalata per adattarsi, il che potrebbe causare distorsioni.

Vuoi continuare?</translation>
    </message>
</context>
<context>
    <name>GPSMapController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/GPSMapController.py" line="54"/>
        <source>No GPS data found in images</source>
        <translation>Nessun dato GPS trovato nelle immagini</translation>
    </message>
</context>
<context>
    <name>GPSMapDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="39"/>
        <source>GPS Map View</source>
        <translation>Vista Mappa GPS</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="91"/>
        <source>Zoom In (+)</source>
        <translation>Ingrandisci (+)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="95"/>
        <source>Zoom Out (-)</source>
        <translation>Rimpicciolisci (-)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="99"/>
        <source>Fit All (F)</source>
        <translation>Adatta Tutto (F)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="107"/>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="189"/>
        <source>Satellite View</source>
        <translation>Vista Satellitare</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="115"/>
        <source>Click point to select • Drag to pan • Scroll to zoom</source>
        <translation>Clicca su un punto per selezionare • Trascina per scorrere • Scorri per lo zoom</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="186"/>
        <source>Map View</source>
        <translation>Vista Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="223"/>
        <source>⚠ {error}</source>
        <translation>⚠ {error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="233"/>
        <source>Map Tile Loading Issue</source>
        <translation>Problema di Caricamento Tasselli Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/GPSMapDialog.py" line="236"/>
        <source>{error}

The map will continue to work with cached tiles where available.</source>
        <translation>{error}

La mappa continuerà a funzionare con i tasselli memorizzati nella cache, ove disponibili.</translation>
    </message>
</context>
<context>
    <name>GPSMapView</name>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/GPSMapView.py" line="1085"/>
        <source>Copy Data</source>
        <translation>Copia Dati</translation>
    </message>
</context>
<context>
    <name>GalleryUIComponent</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="289"/>
        <source>0 AOIs</source>
        <translation>0 AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="330"/>
        <source>AOI</source>
        <translation>AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="331"/>
        <source>AOIs</source>
        <translation>AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="332"/>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="355"/>
        <source>{count} {label}</source>
        <translation>{count} {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="351"/>
        <source>Area of Interest</source>
        <translation>Area di Interesse</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/gallery/GalleryUIComponent.py" line="353"/>
        <source>Areas of Interest</source>
        <translation>Aree di Interesse</translation>
    </message>
</context>
<context>
    <name>GeneralSettingsPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/GeneralSettingsPage.py" line="122"/>
        <source>Select AOI Highlight Color</source>
        <translation>Seleziona Colore Evidenziazione AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/GeneralSettingsPage.py" line="159"/>
        <source>Benchmark Complete</source>
        <translation>Benchmark Completato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/GeneralSettingsPage.py" line="164"/>
        <source>Detected {count} CPU core(s).

Recommended number of processes: {recommended}

The slider has been set to {recommended} processes.</source>
        <translation>Rilevati {count} core CPU.

Numero consigliato di processi: {recommended}

Il cursore è stato impostato su {recommended} processi.</translation>
    </message>
</context>
<context>
    <name>HSVColorRange</name>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
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
        <translation>Seleziona un colore obiettivo da un&apos;immagine da rilevare.
Apre un selettore di colori che ti consente di:
• Caricare un&apos;immagine dalla cartella di input
• Cliccare sui pixel per campionare i colori
• Calcolare automaticamente i valori HSV
• Impostare gli intervalli di Tonalità, Saturazione e Valore
Il colore selezionato diventa il centro del tuo intervallo di rilevamento HSV.
Regola i valori dell&apos;intervallo +/- per catturare le variazioni di colore.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="37"/>
        <source> Pick Color</source>
        <translation> Scegli Colore</translation>
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
        <translation>Anteprima visiva del colore obiettivo attualmente selezionato.
Mostra il colore centrale del tuo intervallo di rilevamento HSV.
Il rilevamento effettivo corrisponderà ai colori entro gli intervalli +/- specificati attorno a questo colore.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="92"/>
        <source>Hue range tolerance for color detection.
Hue represents the actual color (red, green, blue, etc.) on a 0-179 scale.
Adjust the -/+ values to allow variation in the color hue.</source>
        <translation>Tolleranza dell&apos;intervallo di tonalità per il rilevamento del colore.
La tonalità rappresenta il colore effettivo (rosso, verde, blu, ecc.) su una scala 0-179.
Regola i valori -/+ per consentire variazioni nella tonalità del colore.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="97"/>
        <source>Hue Range</source>
        <translation>Intervallo Tonalità</translation>
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
        <translation>Tolleranza inferiore dell&apos;intervallo di tonalità.
• Intervallo: da 0 a 179
• Predefinito: 20
Sottrae dal valore della tonalità obiettivo per definire il limite inferiore.
Valori più bassi = corrispondenza del colore più rigorosa, valori più alti = maggiore variazione di colore accettata.
Esempio: Tonalità obiettivo 100, meno 20 = rileva tonalità da 80 a 100.</translation>
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
        <translation>Tolleranza superiore dell&apos;intervallo di tonalità.
• Intervallo: da 0 a 179
• Predefinito: 20
Aggiunge al valore della tonalità obiettivo per definire il limite superiore.
Valori più bassi = corrispondenza del colore più rigorosa, valori più alti = maggiore variazione di colore accettata.
Esempio: Tonalità obiettivo 100, più 20 = rileva tonalità da 100 a 120.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="198"/>
        <source>Saturation range tolerance for color detection.
Saturation represents color intensity (0=gray, 255=fully saturated) on a 0-255 scale.
Adjust the -/+ values to allow variation in color intensity.</source>
        <translation>Tolleranza dell&apos;intervallo di saturazione per il rilevamento del colore.
La saturazione rappresenta l&apos;intensità del colore (0=grigio, 255=completamente saturo) su una scala 0-255.
Regola i valori -/+ per consentire variazioni nell&apos;intensità del colore.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="203"/>
        <source>Saturation Range</source>
        <translation>Intervallo Saturazione</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="227"/>
        <source>Lower saturation range tolerance.
• Range: 0 to 255
• Default: 50
Subtracts from the target saturation value to define the lower bound.
Lower values = requires vivid colors, higher values = accepts faded/washed out colors.
Example: Target saturation 150, minus 50 = detects saturations from 100-150.</source>
        <translation>Tolleranza inferiore dell&apos;intervallo di saturazione.
• Intervallo: da 0 a 255
• Predefinito: 50
Sottrae dal valore di saturazione obiettivo per definire il limite inferiore.
Valori più bassi = richiede colori vivaci, valori più alti = accetta colori sbiaditi/lavati.
Esempio: Saturazione obiettivo 150, meno 50 = rileva saturazioni da 100 a 150.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="262"/>
        <source>Upper saturation range tolerance.
• Range: 0 to 255
• Default: 50
Adds to the target saturation value to define the upper bound.
Lower values = requires exact saturation, higher values = accepts more saturated colors.
Example: Target saturation 150, plus 50 = detects saturations from 150-200.</source>
        <translation>Tolleranza superiore dell&apos;intervallo di saturazione.
• Intervallo: da 0 a 255
• Predefinito: 50
Aggiunge al valore di saturazione obiettivo per definire il limite superiore.
Valori più bassi = richiede saturazione esatta, valori più alti = accetta colori più saturi.
Esempio: Saturazione obiettivo 150, più 50 = rileva saturazioni da 150 a 200.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="298"/>
        <source>Value (brightness) range tolerance for color detection.
Value represents brightness (0=black, 255=bright) on a 0-255 scale.
Adjust the -/+ values to allow variation in brightness.</source>
        <translation>Tolleranza dell&apos;intervallo di valore (luminosità) per il rilevamento del colore.
Il valore rappresenta la luminosità (0=nero, 255=luminoso) su una scala 0-255.
Regola i valori -/+ per consentire variazioni nella luminosità.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="303"/>
        <source>Value Range</source>
        <translation>Intervallo Valore</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="327"/>
        <source>Lower value (brightness) range tolerance.
• Range: 0 to 255
• Default: 50
Subtracts from the target brightness value to define the lower bound.
Lower values = requires bright pixels, higher values = accepts darker pixels.
Example: Target value 200, minus 50 = detects brightness from 150-200.</source>
        <translation>Tolleranza inferiore dell&apos;intervallo di valore (luminosità).
• Intervallo: da 0 a 255
• Predefinito: 50
Sottrae dal valore di luminosità obiettivo per definire il limite inferiore.
Valori più bassi = richiede pixel luminosi, valori più alti = accetta pixel più scuri.
Esempio: Valore obiettivo 200, meno 50 = rileva luminosità da 150 a 200.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="362"/>
        <source>Upper value (brightness) range tolerance.
• Range: 0 to 255
• Default: 50
Adds to the target brightness value to define the upper bound.
Lower values = requires exact brightness, higher values = accepts brighter pixels.
Example: Target value 200, plus 50 = detects brightness from 200-250.</source>
        <translation>Tolleranza superiore dell&apos;intervallo di valore (luminosità).
• Intervallo: da 0 a 255
• Predefinito: 50
Aggiunge al valore di luminosità obiettivo per definire il limite superiore.
Valori più bassi = richiede luminosità esatta, valori più alti = accetta pixel più luminosi.
Esempio: Valore obiettivo 200, più 20 = rileva luminosità da 200 a 220.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="410"/>
        <source>Opens the Range Viewer window to:
- See the range of colors that will be searched for in the image analysis.
Use this to see what colors are going to be detected and optimize the color ranges before processing.</source>
        <translation>Apre la finestra Visualizzatore Intervallo per:
- Vedere l&apos;intervallo di colori che verranno cercati nell&apos;analisi dell&apos;immagine.
Usa questo per vedere quali colori verranno rilevati e ottimizzare gli intervalli di colore prima dell&apos;elaborazione.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRange.ui" line="415"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
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
        <translation>Assistente Intervallo Colore HSV - Selezione con Clic</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRangeAssistant.py" line="1503"/>
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
&lt;h2&gt;Assistente Intervallo Colore HSV - Aiuto&lt;/h2&gt;

&lt;p&gt;Questo strumento ti aiuta a scegliere l&apos;intervallo di colori HSV di un colore specifico in una foto.
Clicca sul pulsante SFOGLIA per aprire un&apos;immagine.&lt;/p&gt;

&lt;h3&gt;Navigazione:&lt;/h3&gt;
&lt;p&gt;• Usa la rotellina del mouse per ingrandire/rimpicciolire l&apos;immagine&lt;br&gt;
• Usa il tasto sinistro del mouse per trascinare l&apos;immagine e spostarla&lt;/p&gt;

&lt;h3&gt;Selezione Colore:&lt;/h3&gt;
&lt;p&gt;• Tieni premuto il tasto &lt;b&gt;CTRL/OPTION&lt;/b&gt; mentre fai clic con il tasto sinistro su un colore nell&apos;immagine che desideri selezionare&lt;br&gt;
• Tutti i pixel nell&apos;immagine che condividono quel valore di colore HSV verranno selezionati ed evidenziati in bianco&lt;/p&gt;

&lt;h3&gt;Raggio di Selezione:&lt;/h3&gt;
        &lt;p&gt;Puoi regolare il Raggio di Selezione del cursore del mouse per renderlo più grande o più piccolo.
        Quando fai clic con CTRL, verranno selezionati tutti i colori entro quel raggio dal cursore del mouse.&lt;/p&gt;

&lt;h3&gt;Correzioni:&lt;/h3&gt;
&lt;p&gt;Se commetti un errore, puoi ANNULLARE l&apos;ultima selezione o premere il pulsante RIPRISTINA per ricominciare.&lt;/p&gt;

&lt;h3&gt;Anteprima Maschera:&lt;/h3&gt;
        &lt;p&gt;Sul lato destro, la sezione Anteprima Maschera ti mostrerà quali pixel nell&apos;immagine sono stati selezionati.
        Se vedi pixel al di fuori del tuo oggetto target che stai selezionando, significa che potresti dover
        regolare la Tolleranza Colore o essere più attento con le tue selezioni.&lt;/p&gt;
</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/views/HSVColorRangeAssistant.py" line="1504"/>
        <source>HSV Color Range Assistant - Help</source>
        <translation>Assistente Intervallo Colore HSV - Aiuto</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeController</name>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="95"/>
        <source>No Colors Selected</source>
        <translation>Nessun Colore Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="119"/>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="124"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeController.py" line="428"/>
        <source>Please add at least one color to detect.</source>
        <translation>Aggiungi almeno un colore da rilevare.</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeWizard</name>
    <message>
        <location filename="../resources/views/algorithms/HSVColorRangeWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
    </message>
</context>
<context>
    <name>HSVColorRangeWizardController</name>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeWizardController.py" line="49"/>
        <source>No Colors Selected</source>
        <translation>Nessun Colore Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeWizardController.py" line="59"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/HSVColorRange/controllers/HSVColorRangeWizardController.py" line="344"/>
        <source>Please add at least one color to detect.</source>
        <translation>Aggiungi almeno un colore da rilevare.</translation>
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
        <translation>Aiuto Visualizzatore</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/HelpDialog.py" line="60"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
</context>
<context>
    <name>ImageAdjustmentDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="83"/>
        <source>Image Adjustment</source>
        <translation>Regolazione Immagine</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="96"/>
        <source>Adjustments</source>
        <translation>Regolazioni</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="124"/>
        <source>Exposure:</source>
        <translation>Esposizione:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="127"/>
        <source>Highlights:</source>
        <translation>Luci:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="130"/>
        <source>Shadows:</source>
        <translation>Ombre:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="133"/>
        <source>Clarity:</source>
        <translation>Chiarezza:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="136"/>
        <source>Radius:</source>
        <translation>Raggio:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="146"/>
        <source>Reset</source>
        <translation>Ripristina</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="147"/>
        <source>Apply</source>
        <translation>Applica</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ImageAdjustmentDialog.py" line="148"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
</context>
<context>
    <name>ImageAnalysisGuide</name>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="14"/>
        <source>Image Analysis Guide</source>
        <translation>Guida all&apos;Analisi delle Immagini</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="39"/>
        <source>Welcome to ADIAT</source>
        <translation>Benvenuto in ADIAT</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="67"/>
        <source>Please select the ADIAT_Data.xml file from previous analysis:</source>
        <translation>Seleziona il file ADIAT_Data.xml di un&apos;analisi precedente:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="79"/>
        <source>No file selected</source>
        <translation>Nessun file selezionato</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="94"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="266"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="307"/>
        <source>Browse...</source>
        <translation>Sfoglia...</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="123"/>
        <source>What would you like to do?</source>
        <translation>Cosa vorresti fare?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="160"/>
        <source>Start New Image Analysis</source>
        <translation>Inizia Nuova Analisi Immagini</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="178"/>
        <source>Review Existing Image Analysis</source>
        <translation>Rivedi Analisi Immagini Esistente</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="223"/>
        <source>Select Directories</source>
        <translation>Seleziona Cartelle</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="245"/>
        <source>Where are the images you want to analyze?</source>
        <translation>Dove sono le immagini che vuoi analizzare?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="286"/>
        <source>Where do you want ADIAT to store the output files?</source>
        <translation>Dove vuoi che ADIAT memorizzi i file di output?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="348"/>
        <source>Image Capture Information</source>
        <translation>Informazioni Acquisizione Immagini</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="370"/>
        <source>What drone/camera was used to capture images?</source>
        <translation>Quale drone/telecamera è stata utilizzata per acquisire le immagini?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="400"/>
        <source>At what above ground level (AGL) altitude was the drone flying?</source>
        <translation>A quale altitudine dal livello del suolo (AGL) volava il drone?</translation>
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
        <translation>Distanza di campionamento al suolo (GSD) stimata:</translation>
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
        <translation>Dimensione target di ricerca</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="590"/>
        <source>Approximately how large are the objects you&apos;re wanting to identify?</source>
        <translation>Quanto sono approssimativamente grandi gli oggetti che vuoi identificare?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="621"/>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;More Examples:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 sqft – Hat, Helmet, Plastic Bag &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 sqft – Cat, Daypack &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 sqft – Large Pack, Medium Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 sqft – Sleeping Bag, Large Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 sqft – Small Boat, 2-Person Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 sqft – Car/SUV, Small Pickup Truck, Large Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 sqft – House &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;Altri esempi:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 ft² – Cappello, Casco, Sacchetto di plastica &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 ft² – Gatto, Zaino da giorno &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 ft² – Zaino grande, Cane medio &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 ft² – Sacco a pelo, Cane grande &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 ft² – Barca piccola, Tenda da 2 persone &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 ft² – Auto/SUV, Pickup piccolo, Tenda grande &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 ft² – Casa &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="660"/>
        <source>ALGORITHM SELECTION GUIDE</source>
        <translation>GUIDA ALLA SELEZIONE DELL&apos;ALGORITMO</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="682"/>
        <source>Are you using thermal images?</source>
        <translation>Stai usando immagini termiche?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="727"/>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1114"/>
        <source>Yes</source>
        <translation>Sì</translation>
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
        <translation>Reimposta</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="888"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="147"/>
        <source>Algorithm Parameters</source>
        <translation>Parametri Algoritmo</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="918"/>
        <source>General Settings</source>
        <translation>Impostazioni Generali</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="940"/>
        <source>What color should be used to highlight Areas of Interest (AOIs)?</source>
        <translation>Quale colore dovrebbe essere usato per evidenziare le Aree di Interesse (AOI)?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="960"/>
        <source>Select Color</source>
        <translation>Seleziona Colore</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1009"/>
        <source>How many images should be processed at the same time?</source>
        <translation>Quante immagini devono essere elaborate contemporaneamente?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1033"/>
        <source>Run Benchmark</source>
        <translation>Esegui Benchmark</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1056"/>
        <source>What resolution should images be processed at?</source>
        <translation>A quale risoluzione devono essere elaborate le immagini?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1084"/>
        <source>Were the images captured in different lighting conditions?</source>
        <translation>Le immagini sono state acquisite in condizioni di illuminazione diverse?</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1177"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1189"/>
        <source>Skip this wizard in the future</source>
        <translation>Salta questa procedura guidata in futuro</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1217"/>
        <source>Back</source>
        <translation>Indietro</translation>
    </message>
    <message>
        <location filename="../resources/views/images/ImageAnalysisGuide.ui" line="1229"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="261"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="266"/>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="272"/>
        <source>Continue</source>
        <translation>Continua</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="102"/>
        <source>ADIAT Image Analysis Guide</source>
        <translation>Guida all&apos;analisi immagini ADIAT</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="256"/>
        <source>Load Results</source>
        <translation>Carica Risultati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/ImageAnalysisGuide.py" line="269"/>
        <source>Start Processing</source>
        <translation>Avvia Elaborazione</translation>
    </message>
</context>
<context>
    <name>ImageLoadController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/image/ImageLoadController.py" line="112"/>
        <source>(Image {current} of {total})</source>
        <translation>(Immagine {current} di {total})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/image/ImageLoadController.py" line="352"/>
        <source>Error Loading Image</source>
        <translation>Errore durante il caricamento dell&apos;immagine</translation>
    </message>
</context>
<context>
    <name>LoadingDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/LoadingDialog.py" line="12"/>
        <source>Generating Report</source>
        <translation>Generazione report</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/LoadingDialog.py" line="29"/>
        <source>Report generation in progress...</source>
        <translation>Generazione del report in corso...</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/LoadingDialog.py" line="33"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
</context>
<context>
    <name>MRMap</name>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
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
        <translation>Numero di segmenti in cui dividere ogni immagine per l&apos;analisi MR Map.
Ogni segmento viene elaborato indipendentemente per il rilevamento di caratteristiche multi-risoluzione.
Impatto sulle prestazioni:
• Numero di segmenti più alto: AUMENTA il tempo di elaborazione (più segmenti da analizzare)
• Numero di segmenti più basso: DIMINUISCE il tempo di elaborazione (meno segmenti da analizzare)
• 1 segmento: elaborazione più veloce (analizza l&apos;immagine intera una sola volta)
Un numero più alto di segmenti migliora il rilevamento in immagini con caratteristiche variabili.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="38"/>
        <source>Image Segments:</source>
        <translation>Segmenti Immagine:</translation>
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
        <translation>Seleziona il numero di segmenti in cui dividere ogni immagine.
• Opzioni: 1, 2, 4, 6, 9, 16, 25, 36 segmenti
• Predefinito: 1 (analizza l&apos;immagine intera come un singolo segmento)
L&apos;algoritmo MR Map (Multi-Resolution Map) analizza le caratteristiche a più scale:
• 1 segmento: elabora l&apos;immagine intera (ideale per immagini piccole o contenuto uniforme)
• Più segmenti: analizza regioni locali in modo indipendente (meglio per immagini grandi)
Un numero più alto di segmenti migliora il rilevamento in immagini con caratteristiche variabili nella scena.
Consigliato: 4-9 segmenti per immagini tipiche da drone.</translation>
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
        <translation>Spazio colore:</translation>
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
        <translation>Seleziona lo spazio colore per l&apos;analisi MR Map.
L&apos;algoritmo MR Map analizza le caratteristiche in diverse rappresentazioni del colore:
• LAB: spazio colore percettivamente uniforme (predefinito, migliore per l&apos;analisi delle differenze di colore)
• RGB: spazio colore standard rosso-verde-blu (buono per uso generale)
• HSV: spazio colore Tonalità-Saturazione-Valore (migliore per il rilevamento di caratteristiche basate sul colore)
Spazi colore diversi possono migliorare il rilevamento a seconda del contenuto dell&apos;immagine.
Consigliato: LAB per la maggior parte dei casi, HSV per immagini ricche di colore.</translation>
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
        <translation>Dimensione della finestra per l&apos;analisi multi-risoluzione.
Determina la scala spaziale delle caratteristiche da rilevare.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="202"/>
        <source>Window Size:</source>
        <translation>Dimensione Finestra:</translation>
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
        <translation>Imposta la dimensione della finestra per l&apos;analisi multi-risoluzione.
• Intervallo: da 1 a 10
• Predefinito: 5
L&apos;algoritmo MR Map analizza le caratteristiche a più scale spaziali usando finestre scorrevoli:
• Valori più piccoli (1-3): rilevano dettagli fini e caratteristiche piccole
• Valori medi (4-6): rilevamento bilanciato (consigliato per la maggior parte dei casi)
• Valori più grandi (7-10): rilevano caratteristiche e pattern più grandi
La dimensione della finestra influisce sulla risoluzione spaziale del rilevamento delle caratteristiche.
Finestre più grandi forniscono più contesto ma possono perdere oggetti piccoli.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="254"/>
        <source>Detection threshold for MR Map feature detection.
Controls the sensitivity of feature detection across multiple resolutions.</source>
        <translation>Soglia di rilevamento per il rilevamento delle caratteristiche MR Map.
Controlla la sensibilità del rilevamento delle caratteristiche su più risoluzioni.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="258"/>
        <source>Threshold:</source>
        <translation>Soglia:</translation>
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
        <translation>Regola la soglia di rilevamento per l&apos;algoritmo MR Map.
• Intervallo: da 1 a 200
• Predefinito: 100
• Il cursore è invertito: SINISTRA = soglia più alta, DESTRA = soglia più bassa
L&apos;algoritmo MR Map rileva le caratteristiche a più risoluzioni spaziali:
• Valori più bassi (1-50): molto sensibile, rileva molte caratteristiche (può includere rumore)
• Valori medi (51-150): rilevamento bilanciato (consigliato per la maggior parte dei casi)
• Valori più alti (151-200): meno sensibile, rileva solo caratteristiche evidenti
La soglia controlla quanto una caratteristica deve essere distinta per essere rilevata.
Nota: l&apos;aspetto del cursore è invertito - sposta a sinistra per più rigoroso, a destra per più permissivo.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMap.ui" line="326"/>
        <source>Current threshold value for MR Map feature detection.
Displays the value selected on the threshold slider (1-200).
Lower values = more sensitive detection.</source>
        <translation>Valore soglia corrente per il rilevamento delle caratteristiche MR Map.
Visualizza il valore selezionato sul cursore della soglia (1-200).
Valori più bassi = rilevamento più sensibile.</translation>
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
        <translation>Le tue immagini contengono scene complesse con edifici, veicoli o coperture del terreno artificiali miste?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="41"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="56"/>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="92"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>Quanto aggressivamente dovrebbe ADIAT cercare le anomalie?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MRMapWizard.ui" line="105"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Nota: un&apos;impostazione più alta troverà più potenziali anomalie ma potrebbe anche aumentare i falsi positivi.</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="22"/>
        <source>Automated Drone Image Analysis Tool  v1.2 - Sponsored by TEXSAR</source>
        <translation>Strumento Automatico di Analisi Immagini Drone v1.2 - Sponsorizzato da TEXSAR</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/MainWindow_ui.py" line="486"/>
        <source>Load Results Folder</source>
        <translation>Carica Cartella Risultati</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="52"/>
        <source>Browse for the output folder to save analysis results.
Opens a folder selection dialog.
Choose an empty folder or create a new one to avoid overwriting existing files.</source>
        <translation>Sfoglia per la cartella di output dove salvare i risultati dell&apos;analisi.
Apre una finestra di selezione cartella.
Scegli una cartella vuota o creane una nuova per evitare di sovrascrivere file esistenti.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="57"/>
        <location filename="../resources/views/images/MainWindow.ui" line="133"/>
        <location filename="../resources/views/images/MainWindow.ui" line="597"/>
        <source> Select</source>
        <translation> Seleziona</translation>
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
        <translation>Percorso della cartella di output per salvare i risultati dell&apos;analisi.
Clicca il pulsante Seleziona per scegliere una cartella di destinazione.
I risultati includono:
• Immagini elaborate con oggetti rilevati evidenziati
• File CSV con coordinate di rilevamento e metadati
• File KML per visualizzare i risultati in applicazioni di mappatura
• Ulteriori file di output specifici dell&apos;algoritmo</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="97"/>
        <source>Select the folder containing images to analyze.
Supported formats: JPG, PNG, TIFF, and other common image formats.</source>
        <translation>Seleziona la cartella contenente le immagini da analizzare.
Formati supportati: JPG, PNG, TIFF e altri formati immagine comuni.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="101"/>
        <source>Input Folder:</source>
        <translation>Cartella Input:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="113"/>
        <source>Select the destination folder for analysis results.
Output includes processed images with marked detections and CSV data files.</source>
        <translation>Seleziona la cartella di destinazione per i risultati dell&apos;analisi.
L&apos;output include immagini elaborate con rilevamenti evidenziati e file di dati CSV.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="117"/>
        <source>Output Folder:</source>
        <translation>Cartella Output:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="129"/>
        <source>Browse for the input folder containing images to analyze.
Opens a folder selection dialog.</source>
        <translation>Sfoglia la cartella di input contenente le immagini da analizzare.
Apre una finestra di selezione cartella.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="152"/>
        <source>Path to the input folder containing images for analysis.
Click the Select button to browse for a folder.
All supported image files in this folder will be processed.</source>
        <translation>Percorso della cartella di input contenente le immagini per l&apos;analisi.
Clicca il pulsante Seleziona per scegliere una cartella.
Tutti i file immagine supportati in questa cartella verranno elaborati.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="209"/>
        <source>Minimum object size in pixels for detection filtering.
Objects smaller than this will be ignored.</source>
        <translation>Dimensione minima dell&apos;oggetto in pixel per il filtro di rilevamento.
Gli oggetti più piccoli di questo valore verranno ignorati.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="213"/>
        <source>Min Object Area (px):</source>
        <translation>Area Min Oggetto (px):</translation>
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
        <translation>Imposta l&apos;area minima dell&apos;oggetto in pixel per il filtro di rilevamento.
• Intervallo: da 1 a 999 pixel
• Predefinito: 10 pixel
Gli oggetti più piccoli di questa soglia verranno filtrati e non rilevati.
• Valori più bassi: rilevano oggetti più piccoli (possono aumentare i falsi positivi)
• Valori più alti: rilevano solo oggetti più grandi (riduce il rumore)
Usa per filtrare piccoli artefatti e rumore nei risultati di rilevamento.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="269"/>
        <source>Maximum object size in pixels for detection filtering.
Objects larger than this will be ignored.</source>
        <translation>Dimensione massima dell&apos;oggetto in pixel per il filtro di rilevamento.
Gli oggetti più grandi di questo valore verranno ignorati.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="273"/>
        <source>Max Object Area (px):</source>
        <translation>Area Max Oggetto (px):</translation>
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
        <translation>Imposta l&apos;area massima dell&apos;oggetto in pixel per il filtro di rilevamento.
• Intervallo: da 0 a 99999 pixel
• Predefinito: 0 (Nessuno - nessun filtro massimo applicato)
• Valore speciale: 0 viene visualizzato come &quot;Nessuno&quot;
Gli oggetti più grandi di questa soglia verranno filtrati e non rilevati.
• Valori più bassi: rilevano solo oggetti più piccoli
• Valori più alti: consentono il rilevamento di oggetti più grandi
• Imposta su 0 (Nessuno): nessun filtro di dimensione massima
Usa per escludere falsi positivi molto grandi come ombre o caratteristiche del terreno.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="299"/>
        <source>None</source>
        <translation>Nessuno</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="323"/>
        <source>Disable the maximum size filter and allow detections of any size.</source>
        <translation>Disattiva il filtro di dimensione massima e consente rilevamenti di qualsiasi dimensione.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="326"/>
        <source>No max limit</source>
        <translation>Nessun limite max</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="359"/>
        <source>Color used to mark and identify detected objects in output images.
Click the color button to select a different color.</source>
        <translation>Colore usato per contrassegnare e identificare gli oggetti rilevati nelle immagini di output.
Clicca il pulsante colore per selezionare un colore diverso.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="363"/>
        <source>Object Identifer Color:</source>
        <translation>Colore Identificatore Oggetto:</translation>
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
        <translation>Seleziona il colore usato per contrassegnare gli oggetti rilevati nelle immagini di output.
• Predefinito: Verde (RGB: 0, 255, 0)
Clicca per aprire una finestra di selezione colore e scegliere un colore di marcatura diverso.
Il colore selezionato sarà usato per:
• Disegnare cerchi/rettangoli attorno agli oggetti rilevati
• Evidenziare le posizioni AOI nelle immagini di output
• Creare marcatori visivi nel visualizzatore risultati
Scegli un colore che contrasti bene con il contenuto dell&apos;immagine per una migliore visibilità.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="395"/>
        <source>Maximum number of parallel processes to use for image analysis.
More processes = faster processing but higher CPU/memory usage.</source>
        <translation>Numero massimo di processi paralleli da usare per l&apos;analisi immagini.
Più processi = elaborazione più veloce ma maggiore uso di CPU/memoria.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="399"/>
        <source>Max Processes: </source>
        <translation>Processi Max: </translation>
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
        <translation>Imposta il numero massimo di processi paralleli per l&apos;analisi delle immagini.
• Intervallo: da 1 a 20 processi
• Predefinito: 10 processi
L&apos;applicazione usa il multiprocessing per analizzare più immagini simultaneamente:
• Valori più alti: elaborazione più veloce (usa più core CPU e memoria)
• Valori più bassi: elaborazione più lenta (usa meno risorse di sistema)
• Consigliato: imposta al numero di core CPU o leggermente superiore
• Per sistemi con RAM limitata, riduci questo valore per prevenire problemi di memoria
Ogni processo analizza un&apos;immagine alla volta, quindi più processi = più elaborazione parallela di immagini.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="446"/>
        <source>Resolution at which images are processed.
Lower resolutions = faster processing but may miss small objects.</source>
        <translation>Risoluzione a cui vengono elaborate le immagini.
Risoluzioni più basse = elaborazione più veloce ma possono perdere oggetti piccoli.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="450"/>
        <source>Processing Resolution:</source>
        <translation>Risoluzione Elaborazione:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="72"/>
        <source>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</source>
        <translation>Strumento Automatico di Analisi Immagini Drone v{version} - Sponsorizzato da TEXSAR</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="521"/>
        <source>Please set the input and output directories.</source>
        <translation>Imposta le cartelle di input e output.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="526"/>
        <source>--- Starting image processing ---</source>
        <translation>--- Inizio elaborazione immagini ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="643"/>
        <source>--- Image Processing Completed ---</source>
        <translation>--- Elaborazione Immagini Completata ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="646"/>
        <source>{count} images with areas of interest identified</source>
        <translation>{count} immagini con aree di interesse identificate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="652"/>
        <source>No areas of interest identified</source>
        <translation>Nessuna area di interesse identificata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="671"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1076"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1099"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1115"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1131"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1147"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1023"/>
        <source>Error Loading Results</source>
        <translation>Errore Caricamento Risultati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1024"/>
        <source>Failed to load results file:
{error}</source>
        <translation>Impossibile caricare il file dei risultati:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1077"/>
        <source>Failed to open Streaming Detector:
{error}</source>
        <translation>Impossibile aprire il Rilevatore Streaming:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1100"/>
        <source>Failed to open Search Coordinator:
{error}</source>
        <translation>Impossibile aprire il Coordinatore di Ricerca:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1116"/>
        <source>Failed to open Help documentation:
{error}</source>
        <translation>Impossibile aprire la documentazione di Aiuto:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1132"/>
        <source>Failed to open Community Help:
{error}</source>
        <translation>Impossibile aprire l&apos;Aiuto della Community:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1148"/>
        <source>Failed to open YouTube Channel:
{error}</source>
        <translation>Impossibile aprire il canale YouTube:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="1272"/>
        <source>Invalid Value</source>
        <translation>Valore Non Valido</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="310"/>
        <source>Select AOI Highlight Color</source>
        <translation>Seleziona Colore Evidenziazione AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="323"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="341"/>
        <source>Select Directory</source>
        <translation>Seleziona Cartella</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="358"/>
        <source>Select a Reference Image</source>
        <translation>Seleziona un&apos;Immagine di Riferimento</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="361"/>
        <source>Images (*.png *.jpg)</source>
        <translation>Immagini (*.png *.jpg)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="408"/>
        <location filename="../app/core/controllers/images/MainWindow.py" line="440"/>
        <source>Value Adjusted</source>
        <translation>Valore Regolato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="412"/>
        <source>Maximum area has been adjusted to {value} pixels to maintain valid range.
(Minimum area must be less than maximum area)</source>
        <translation>L&apos;area massima è stata regolata a {value} pixel per mantenere un intervallo valido.
(L&apos;area minima deve essere inferiore all&apos;area massima)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="444"/>
        <source>Minimum area has been adjusted to {value} pixels to maintain valid range.
(Maximum area must be greater than minimum area)</source>
        <translation>L&apos;area minima è stata regolata a {value} pixel per mantenere un intervallo valido.
(L&apos;area massima deve essere maggiore dell&apos;area minima)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="617"/>
        <source>Area of Interest Limit ({limit}) exceeded. Continue?</source>
        <translation>Limite Area di Interesse ({limit}) superato. Continuare?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="619"/>
        <source>Area of Interest Limit Exceeded</source>
        <translation>Limite Area di Interesse Superato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="680"/>
        <source>Select File</source>
        <translation>Seleziona File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="700"/>
        <source>Select Results Folder</source>
        <translation>Seleziona Cartella Risultati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="733"/>
        <source>Failed to scan folder: {error}</source>
        <translation>Impossibile scansionare la cartella: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="755"/>
        <source>No Results Found</source>
        <translation>Nessun Risultato Trovato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="757"/>
        <source>No ADIAT_DATA.XML files were found in the selected folder.</source>
        <translation>Nessun file ADIAT_DATA.XML trovato nella cartella selezionata.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="773"/>
        <source>Failed to display results: {error}</source>
        <translation>Impossibile visualizzare i risultati: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="784"/>
        <source>Scan failed: {error}</source>
        <translation>Scansione fallita: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="827"/>
        <source>Failed to open viewer: {error}</source>
        <translation>Impossibile aprire il visualizzatore: {error}</translation>
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
        <translation>Seleziona la risoluzione di elaborazione come percentuale della dimensione originale dell&apos;immagine:
• 100%: Risoluzione originale (nessun ridimensionamento, massima qualità, più lenta)
• 75%: Alta qualità (~56% dei pixel, ~1,8x più veloce)
• 50%: Qualità bilanciata (25% dei pixel, ~4x più veloce) - CONSIGLIATO
• 33%: Elaborazione veloce (~11% dei pixel, ~9x più veloce)
• 25%: Molto veloce (6% dei pixel, ~16x più veloce)
• 10%: Ultra veloce (1% dei pixel, ~100x più veloce)

Il ridimensionamento percentuale preserva il rapporto d&apos;aspetto originale.
Funziona con qualsiasi dimensione, orientamento o rapporto d&apos;aspetto dell&apos;immagine.

I valori Min/Max Area sono sempre specificati alla risoluzione originale.
Tutti i risultati sono restituiti nelle coordinate della risoluzione originale.</translation>
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
        <translation>Abilita la pre-elaborazione di normalizzazione dell&apos;istogramma sulle immagini prima del rilevamento.
La normalizzazione dell&apos;istogramma regola i colori dell&apos;immagine per corrispondere a un&apos;immagine di riferimento:
• Uniforma le differenze di illuminazione e colore tra le immagini
• Corregge variazioni dovute a angoli del sole, ombre e condizioni atmosferiche
• Standardizza l&apos;aspetto dei colori nell&apos;insieme di immagini
• Migliora la coerenza dei risultati di rilevamento
Quando abilitata, seleziona un&apos;immagine di riferimento con condizioni di illuminazione/colore ideali.
Utile quando si elaborano immagini scattate in momenti diversi o in condizioni variabili.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="540"/>
        <source>Normalize Histograms</source>
        <translation>Normalizza Istogrammi</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="555"/>
        <source>Select the reference image for histogram normalization.
All images will be adjusted to match this image&apos;s color distribution.</source>
        <translation>Seleziona l&apos;immagine di riferimento per la normalizzazione dell&apos;istogramma.
Tutte le immagini verranno regolate per corrispondere alla distribuzione dei colori di questa immagine.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="559"/>
        <source>Reference Image:</source>
        <translation>Immagine di riferimento:</translation>
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
        <translation>Percorso dell&apos;immagine di riferimento per la normalizzazione dell&apos;istogramma.
Clicca il pulsante Seleziona per scegliere un&apos;immagine.
Scegli un&apos;immagine con condizioni ideali di illuminazione e colore:
• Immagine chiara e ben illuminata dal tuo dataset
• Rappresentativa dell&apos;aspetto desiderato
• Condizioni di illuminazione tipiche per la tua missione
Tutte le altre immagini verranno regolate nei colori per corrispondere a questo riferimento.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="592"/>
        <source>Browse for a reference image for histogram normalization.
Opens an image file selection dialog.
Select a representative image with good lighting and typical color conditions.</source>
        <translation>Sfoglia un&apos;immagine di riferimento per la normalizzazione dell&apos;istogramma.
Apre una finestra di selezione file immagine.
Seleziona un&apos;immagine rappresentativa con buona illuminazione e condizioni di colore tipiche.</translation>
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
        <translation>Seleziona l&apos;algoritmo di rilevamento da usare per l&apos;analisi delle immagini.

Ogni algoritmo ha punti di forza e casi d&apos;uso specifici:

• HSV Color Range: migliore per rilevare oggetti di un colore specifico
• Color Range (RGB): rilevamento colore alternativo usando lo spazio colore RGB
• RX Anomaly: rilevamento statistico di oggetti insoliti/anomali
• Thermal Anomaly: rileva anomalie di temperatura nelle immagini termiche
• Thermal Range: rilevamento basato sulla temperatura nelle immagini termiche
• Matched Filter: rilevamento basato su target usando corrispondenza spettrale
• MR Map: rilevamento di caratteristiche multi-risoluzione a diverse scale
• AI Person Detector: machine learning per rilevare persone

Passa il mouse sul menu a discesa degli algoritmi per descrizioni dettagliate di ciascun algoritmo.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="658"/>
        <source>Algorithm:</source>
        <translation>Algoritmo:</translation>
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
        <translation>Seleziona l&apos;algoritmo di rilevamento per la tua attività di analisi immagini.
Ogni algoritmo ha punti di forza unici e casi d&apos;uso ottimali:

═══════════════════════════════════════════════════
HSV COLOR RANGE
═══════════════════════════════════════════════════
Cosa fa: rileva oggetti tramite intervalli di colore specifici usando lo spazio colore HSV
Punti di forza:
• Ideale per rilevare oggetti dai colori vivaci (arancione, giallo, abbigliamento rosso)
• Robusto alle variazioni di illuminazione (HSV separa colore da luminosità)
• Altamente personalizzabile con intervalli per canale
• Strumenti interattivi di selezione colore disponibili
Punti deboli:
• Richiede una regolazione accurata degli intervalli di colore per risultati ottimali
• Può faticare con le variazioni di colore nelle ombre
• Non efficace per oggetti senza colore o mimetizzati
Ideale per: Search &amp; Rescue (abbigliamento colorato, attrezzatura), veicoli colorati, tende, teloni colorati

═══════════════════════════════════════════════════
COLOR RANGE (RGB)
═══════════════════════════════════════════════════
Cosa fa: rileva oggetti tramite intervalli di colore RGB
Punti di forza:
• Specificazione del colore RGB semplice e intuitiva
• Velocità di elaborazione elevata
• Buono per il rilevamento di base basato sul colore
Punti deboli:
• Più sensibile ai cambiamenti di illuminazione rispetto a HSV
• I canali RGB mescolano informazioni di colore e luminosità
• Meno flessibile di HSV per variazioni di colore complesse
Ideale per: situazioni con illuminazione controllata, rilevamento rapido di base del colore, scenari semplici

═══════════════════════════════════════════════════
RX ANOMALY
═══════════════════════════════════════════════════
Cosa fa: rilevamento statistico di anomalie - trova pixel insoliti rispetto allo sfondo
Punti di forza:
• Rileva oggetti che non corrispondono allo sfondo (nessun campione target necessario)
• Eccellente per trovare oggetti mimetizzati o parzialmente nascosti
• Funziona con tutti i tipi di immagini (RGB, termiche, multispettrali)
• Si adatta automaticamente alle caratteristiche della scena
• Buono per rilevare differenze sottili
Punti deboli:
• Può rilevare anomalie naturali (rocce, cambiamenti della vegetazione)
• Richiede la regolazione della sensibilità per bilanciare rilevamento e falsi positivi
• Un numero più alto di segmenti aumenta significativamente il tempo di elaborazione
• Meno efficace in sfondi molto vari o affollati
Ideale per: ricerche di persone scomparse (umano tra la vegetazione), oggetti mimetizzati, target sconosciuti, qualsiasi cosa insolita nella scena

═══════════════════════════════════════════════════
THERMAL ANOMALY
═══════════════════════════════════════════════════
Cosa fa: rileva anomalie di temperatura nelle immagini termiche (punti caldi/freddi)
Punti di forza:
• Trova automaticamente valori di temperatura anomali (non serve una temperatura specifica)
• Eccellente per rilevare fonti di calore (persone, animali, incendi)
• Funziona giorno e notte con camere termiche
• Rileva attraverso vegetazione leggera
• Regolabile per anomalie calde, fredde o entrambe
Punti deboli:
• Richiede immagini termiche (FLIR)
• Può rilevare oggetti riscaldati dal sole (rocce, veicoli)
• I gradienti di temperatura possono causare falsi positivi
• Influenzato dalla temperatura ambiente e dalle condizioni meteo
Ideale per: ricerche notturne, rilevare persone/animali tramite calore corporeo, trovare fonti di calore, rilevamento di punti freddi

═══════════════════════════════════════════════════
THERMAL RANGE
═══════════════════════════════════════════════════
Cosa fa: rilevamento basato sulla temperatura entro un intervallo di temperatura specifico
Punti di forza:
• Rilevamento basato sulla temperatura preciso
• Eccellente per trovare persone (temp. corporea ~35-40°C / 95-104°F)
• Filtra efficacemente le temperature non target
• Funziona giorno e notte con camere termiche
• Molto affidabile quando la temperatura target è nota
Punti deboli:
• Richiede immagini termiche (FLIR) con dati di temperatura
• È necessario conoscere in anticipo l&apos;intervallo di temperatura target
• Le condizioni ambientali influenzano la temperatura target
• Può perdere target in condizioni meteo estreme (casi di ipotermia)
Ideale per: rilevamento persone (temp. corporea nota), target con temperatura specifica, rilevamento incendi (intervalli di temperatura alti)

═══════════════════════════════════════════════════
MATCHED FILTER
═══════════════════════════════════════════════════
Cosa fa: rilevamento basato su target usando la corrispondenza della firma spettrale
Punti di forza:
• Molto preciso quando si dispone di un campione target
• Usa la &quot;firma&quot; spettrale/colore del target per la corrispondenza
• Riduce i falsi positivi abbinando caratteristiche note del target
• Buono per rilevare tipi specifici di oggetti
Punti deboli:
• Richiede un&apos;immagine di riferimento o un campione di colore del target
• Meno efficace se l&apos;aspetto del target varia significativamente
• Differenze di illuminazione possono influenzare l&apos;accuratezza della corrispondenza
• Non adatto per target sconosciuti
Ideale per: trovare oggetti specifici noti (colore specifico del veicolo, abbigliamento specifico), quando si dispone di un campione target da abbinare

═══════════════════════════════════════════════════
MR MAP (Multi-Resolution Map)
═══════════════════════════════════════════════════
Cosa fa: rilevamento di caratteristiche multi-risoluzione a varie scale spaziali
Punti di forza:
• Rileva caratteristiche a più scale contemporaneamente
• Buono per trovare oggetti di dimensioni variabili
• Efficace per l&apos;analisi di scene complesse
• Può rilevare sia caratteristiche grandi che piccole in un unico passaggio
Punti deboli:
• Più intensivo dal punto di vista computazionale
• Richiede un&apos;accurata regolazione dei parametri
• Un numero più alto di segmenti aumenta significativamente il tempo di elaborazione
• Può produrre più falsi positivi richiedendo filtraggio
Ideale per: scene complesse con oggetti di dimensioni variabili, quando la dimensione del target è sconosciuta, mappatura generale di caratteristiche

═══════════════════════════════════════════════════
AI PERSON DETECTOR
═══════════════════════════════════════════════════
Cosa fa: modello AI di deep learning addestrato specificamente per rilevare persone
Punti di forza:
• Estremamente accurato nel rilevare persone in varie pose
• Funziona con visibilità parziale e abbigliamento vario
• Nessun requisito di colore/temperatura - funziona su immagini RGB standard
• Addestrato su milioni di immagini per un rilevamento robusto
• Rileva persone in sfondi complessi
• Richiede minima regolazione dei parametri
Punti deboli:
• Rileva solo persone (non veicoli, attrezzature, ecc.)
• Computazionalmente intensivo - elaborazione più lenta
• Richiede una risoluzione immagine adeguata
• Può faticare con persone molto lontane/piccole
• Meno efficace con occlusione elevata
Ideale per: operazioni di Search &amp; Rescue (persone scomparse), conteggio persone, situazioni in cui è necessario solo il rilevamento di persone

═══════════════════════════════════════════════════
GUIDA ALLA SELEZIONE DELL&apos;ALGORITMO
═══════════════════════════════════════════════════
• Per oggetti colorati (abbigliamento vivace, attrezzatura): HSV Color Range
• Per camere termiche che cercano persone: Thermal Range o Thermal Anomaly
• Per soggetti mimetizzati o nascosti: RX Anomaly
• Per rilevare specificamente persone: AI Person Detector
• Quando hai un campione target: Matched Filter
• Per target sconosciuti che spiccano: RX Anomaly o Thermal Anomaly
• Per l&apos;elaborazione più veloce: Color Range (RGB) o HSV Color Range
• Per il rilevamento persone più accurato: AI Person Detector</translation>
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
        <translation>Avvia l&apos;elaborazione delle immagini con l&apos;algoritmo selezionato.
Requisiti prima di iniziare:
• La cartella di input deve essere selezionata con immagini valide
• La cartella di output deve essere selezionata
• L&apos;algoritmo deve essere selezionato
• Tutti i parametri richiesti dell&apos;algoritmo devono essere configurati
L&apos;elaborazione:
• Analizzerà tutte le immagini nella cartella di input usando l&apos;algoritmo selezionato
• Applicherà filtri globali (area min/max, K-Means, normalizzazione istogramma)
• Salverà i risultati nella cartella di output (immagini marcate, file CSV, KML)
• Visualizzerà avanzamento e risultati nella finestra di output
Clicca Annulla durante l&apos;elaborazione per fermare l&apos;analisi.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="918"/>
        <source>Start</source>
        <translation>Avvia</translation>
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
        <translation>Annulla il processo di analisi immagini attualmente in esecuzione.
Interrompe l&apos;elaborazione immediatamente e termina in modo sicuro tutti i processi worker.
Effetti dell&apos;annullamento:
• Tutti i processi di analisi in esecuzione vengono fermati
• I risultati parziali vengono salvati fino al punto di annullamento
• Le immagini già elaborate avranno file di output nella cartella di output
• L&apos;elaborazione può essere riavviata dopo l&apos;annullamento
• Ritorna allo stato pronto
Usa quando devi fermare l&apos;elaborazione per regolare le impostazioni o correggere problemi.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="963"/>
        <source> Cancel</source>
        <translation> Annulla</translation>
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
        <translation>Apri il Visualizzatore Risultati per rivedere i risultati del rilevamento.
Disponibile dopo il completamento dell&apos;elaborazione.
Il Visualizzatore Risultati offre:
• Navigazione interattiva delle immagini con oggetti rilevati evidenziati
• Confronto affiancato tra immagini originali ed elaborate
• Navigazione attraverso tutte le immagini elaborate
• Dettagli e metadati AOI (Area di Interesse)
• Coordinate GPS per gli oggetti rilevati
• Opzioni di esportazione per i rilevamenti selezionati
• Funzionalità di zoom e panoramica
• Filtri e ordinamento dei risultati di rilevamento
Usa per rivedere, verificare ed esportare i risultati dell&apos;analisi.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1018"/>
        <source> View Results</source>
        <translation> Visualizza Risultati</translation>
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
        <location filename="../resources/views/images/MainWindow.ui" line="1096"/>
        <source>Help</source>
        <translation>Aiuto</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1107"/>
        <source>Image Analysis Wizard</source>
        <translation>Procedura guidata analisi immagini</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1110"/>
        <source>Launch the Image Analysis Guide wizard to configure analysis settings.
Opens a step-by-step wizard to:
• Select input and output directories
• Configure image capture settings (drone, altitude, GSD)
• Set target object size
• Choose detection algorithm
• Configure algorithm-specific parameters
• Set general processing options
The wizard will close this window and open with all settings pre-populated.</source>
        <translation>Avvia la procedura guidata di Analisi Immagini per configurare le impostazioni di analisi.
Apre una procedura guidata passo-passo per:
• Selezionare le cartelle di input e output
• Configurare le impostazioni di acquisizione immagini (drone, altitudine, GSD)
• Impostare la dimensione dell&apos;oggetto target
• Scegliere l&apos;algoritmo di rilevamento
• Configurare i parametri specifici dell&apos;algoritmo
• Impostare opzioni generali di elaborazione
La procedura guidata chiuderà questa finestra e si aprirà con tutte le impostazioni precompilate.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1128"/>
        <source>Load Results File</source>
        <translation>Carica File Risultati</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1131"/>
        <source>Load a previously saved results file for viewing.
Opens a file dialog to select a results file (.pkl format).
Loads the analysis results and opens the Results Viewer.
Use this to review results from previous analysis sessions without reprocessing.</source>
        <translation>Carica un file risultati salvato in precedenza per la visualizzazione.
Apre una finestra di dialogo per selezionare un file risultati (formato .pkl).
Carica i risultati dell&apos;analisi e apre il Visualizzatore Risultati.
Usa questo per rivedere i risultati di sessioni di analisi precedenti senza rielaborare.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1144"/>
        <source>Preferences</source>
        <translation>Preferenze</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1147"/>
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
        <translation>Apri la finestra Preferenze per configurare le impostazioni dell&apos;applicazione.
Regola le impostazioni globali incluse:
• Tema dell&apos;applicazione (Chiaro/Scuro)
• Soglia di avviso max AOI
• Raggio cerchio AOI per clustering
• Formato del sistema di coordinate (Lat/Long, UTM)
• Unità di temperatura (Fahrenheit/Celsius)
• Unità di distanza (Metri/Piedi)
• File di configurazione sensore drone
Tutte le modifiche vengono salvate automaticamente.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1166"/>
        <source>Video Parser</source>
        <translation>Parser Video</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1169"/>
        <source>Open the Video Parser utility to extract frames from video files.
Convert video footage into individual frame images for analysis.
Features:
• Extract frames at specified time intervals
• Optional SRT file support for GPS metadata
• Supports common video formats (MP4, AVI, MOV, etc.)
• Embeds location data into extracted frames
Use to prepare video footage for image-based analysis.</source>
        <translation>Apri l&apos;utilità Parser Video per estrarre fotogrammi da file video.
Converte le riprese video in singole immagini di fotogrammi per l&apos;analisi.
Funzionalità:
• Estrae fotogrammi a intervalli di tempo specificati
• Supporto opzionale file SRT per metadati GPS
• Supporta formati video comuni (MP4, AVI, MOV, ecc.)
• Incorpora dati di posizione nei fotogrammi estratti
Usa per preparare le riprese video per l&apos;analisi basata su immagini.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1186"/>
        <source>Streaming Detector</source>
        <translation>Rilevatore Streaming</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1189"/>
        <source>Switch to the Streaming Detector</source>
        <translation>Passa al Rilevatore Streaming</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1199"/>
        <source>Real-Time Anomaly Detection</source>
        <translation>Rilevamento Anomalie in Tempo Reale</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1202"/>
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
        <translation>Apri la finestra Rilevamento Anomalie in Tempo Reale per analisi avanzate dal vivo.
Combina più algoritmi di rilevamento per un rilevamento completo di anomalie in tempo reale.
Funzionalità:
• Rilevamento del movimento con sottrazione dello sfondo
• Rilevamento anomalie con quantizzazione del colore
• Elaborazione avanzata di video in streaming
• Fusione dei rilevamenti e filtraggio temporale
• Ottimizzazione delle prestazioni in tempo reale
• Elaborazione multi-thread per migliori prestazioni
• Maggiore accuratezza di rilevamento grazie alla combinazione di algoritmi
Progettato per rilevare oggetti insoliti, movimento e colori nei flussi video in tempo reale.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1222"/>
        <source>Search Coordinator</source>
        <translation>Coordinatore di Ricerca</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1225"/>
        <source>Open the Search Coordinator window for managing multi-batch review projects.
Features:
• Create and manage search projects with multiple batches
• Track reviewer progress across multiple image sets
• Consolidate review results from multiple reviewers
• View dashboard with search status and metrics
• Export consolidated results
• Manage batch assignments and reviewer coordination
Ideal for large-scale searches with multiple reviewers and image batches.</source>
        <translation>Apri la finestra Coordinatore di Ricerca per gestire progetti di revisione multi-batch.
Funzionalità:
• Crea e gestisce progetti di ricerca con più batch
• Traccia l&apos;avanzamento dei revisori su più set di immagini
• Consolida i risultati di revisione di più revisori
• Visualizza un dashboard con stato e metriche della ricerca
• Esporta risultati consolidati
• Gestisce assegnazioni dei batch e coordinamento dei revisori
Ideale per ricerche su larga scala con più revisori e batch di immagini.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1241"/>
        <source>Ctrl+Shift+C</source>
        <translation>Ctrl+Shift+C</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1246"/>
        <source>Manual</source>
        <translation>Manuale</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1249"/>
        <source>Open the online help documentation in your web browser.
Access comprehensive documentation, tutorials, and user guides.
Provides detailed information on all features and algorithms.</source>
        <translation>Apri la documentazione di aiuto online nel browser.
Accedi a documentazione completa, tutorial e guide utente.
Fornisce informazioni dettagliate su tutte le funzionalità e gli algoritmi.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1261"/>
        <source>Community Forum</source>
        <translation>Forum della Comunità</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1264"/>
        <source>Join the community Discord server for support and discussions.
Connect with other users, share experiences, and get help.
Ask questions, report issues, and suggest new features.</source>
        <translation>Unisciti al server Discord della comunità per supporto e discussioni.
Connettiti con altri utenti, condividi esperienze e ottieni aiuto.
Fai domande, segnala problemi e suggerisci nuove funzionalità.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/MainWindow.ui" line="1276"/>
        <source>YouTube Channel</source>
        <translation>Canale YouTube</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="268"/>
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
        <translation>Seleziona l&apos;algoritmo di rilevamento per la tua attività di analisi immagini:

HSV COLOR RANGE: rileva oggetti dai colori vivaci (abbigliamento, veicoli, tende)
  • Ideale per: oggetti colorati in condizioni di illuminazione variabili
  • Limitazione: richiede regolazione del colore, non per oggetti mimetizzati

COLOR RANGE (RGB): rilevamento colore RGB semplice, elaborazione veloce
  • Ideale per: rilevamento colore di base con illuminazione controllata
  • Limitazione: sensibile ai cambiamenti di illuminazione

RX ANOMALY: trova oggetti che non corrispondono allo sfondo (nessun campione necessario)
  • Ideale per: soggetti mimetizzati/nascosti, target sconosciuti
  • Limitazione: può rilevare anomalie naturali, più lento con più segmenti

THERMAL ANOMALY: rileva punti caldi/freddi nelle immagini termiche
  • Ideale per: ricerche notturne, rilevare persone/animali tramite calore corporeo
  • Limitazione: richiede camera termica, può rilevare oggetti riscaldati dal sole

THERMAL RANGE: rilevamento basato sulla temperatura (es. 35-40°C per umani)
  • Ideale per: rilevamento persone con camera termica (temp. corporea nota)
  • Limitazione: richiede camera termica, deve conoscere la temperatura target

MATCHED FILTER: abbina i target usando la firma colore da un campione
  • Ideale per: oggetti specifici noti quando hai un campione target
  • Limitazione: richiede immagine di riferimento, non per target sconosciuti

MR MAP: rilevamento multi-risoluzione per oggetti di dimensioni variabili
  • Ideale per: scene complesse con dimensioni target sconosciute
  • Limitazione: elaborazione più lenta, più falsi positivi

AI PERSON DETECTOR: modello di deep learning per un rilevamento accurato delle persone
  • Ideale per: Search &amp; Rescue, trovare persone con qualsiasi abbigliamento/posa
  • Limitazione: rileva solo persone, elaborazione più lenta</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/MainWindow.py" line="594"/>
        <source>Could not parse XML file. Check file paths in &quot;{file_name}&quot;</source>
        <translation>Impossibile analizzare il file XML. Controlla i percorsi dei file in &quot;{file_name}&quot;</translation>
    </message>
</context>
<context>
    <name>MapExportDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="34"/>
        <source>Map Export Options</source>
        <translation>Opzioni Esportazione Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="45"/>
        <source>Configure Map Export</source>
        <translation>Configura Esportazione Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="53"/>
        <source>Export Type</source>
        <translation>Tipo di Esportazione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="56"/>
        <source>KML File</source>
        <translation>File KML</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="58"/>
        <source>Export to a KML file for use in Google Earth, etc.</source>
        <translation>Esporta in un file KML per l&apos;uso in Google Earth, ecc.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="60"/>
        <source>CalTopo</source>
        <translation>CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="61"/>
        <source>Export directly to a CalTopo map</source>
        <translation>Esporta direttamente su una mappa CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="73"/>
        <source>Data to Include</source>
        <translation>Dati da Includere</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="76"/>
        <source>Drone/Image Locations</source>
        <translation>Posizioni Drone/Immagini</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="78"/>
        <source>Include markers for each drone image location</source>
        <translation>Includi indicatori per ogni posizione immagine del drone</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="80"/>
        <source>Flagged Areas of Interest</source>
        <translation>Aree di Interesse Contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="82"/>
        <source>Include markers for flagged AOIs</source>
        <translation>Includi indicatori per le AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="84"/>
        <source>Coverage Area</source>
        <translation>Area di Copertura</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="86"/>
        <source>Include polygon(s) showing the geographic coverage extent</source>
        <translation>Includi poligono/i che mostrano l&apos;estensione della copertura geografica</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="88"/>
        <source>Include images without flagged AOIs</source>
        <translation>Includi immagini senza AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="90"/>
        <source>If unchecked, only export locations for images that have flagged AOIs</source>
        <translation>Se deselezionato, esporta solo le posizioni delle immagini che hanno AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="101"/>
        <source>CalTopo Options</source>
        <translation>Opzioni CalTopo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="104"/>
        <source>Include Images</source>
        <translation>Includi Immagini</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="106"/>
        <source>Upload photos to CalTopo markers (CalTopo only)</source>
        <translation>Carica foto sui marker CalTopo (solo CalTopo)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="126"/>
        <source>Export</source>
        <translation>Esporta</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MapExportDialog.py" line="130"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
</context>
<context>
    <name>MatchedFilter</name>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="42"/>
        <source>Add a new color signature for matched filter detection. Each color can have its own threshold value.</source>
        <translation>Aggiungi una nuova firma colore per il rilevamento con filtro matched. Ogni colore può avere il proprio valore di soglia.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="45"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
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
        <translation>Apre la finestra Visualizzatore Intervallo per:
- Vedere l&apos;intervallo di colori che verranno cercati nell&apos;analisi delle immagini.
Usalo per vedere quali colori verranno rilevati e ottimizzare le soglie prima dell&apos;elaborazione.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilter.ui" line="88"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
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
        <translation>Nessun Colore Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterController.py" line="300"/>
        <source>Please add at least one color to detect.</source>
        <translation>Aggiungi almeno un colore da rilevare.</translation>
    </message>
</context>
<context>
    <name>MatchedFilterWizard</name>
    <message>
        <location filename="../resources/views/algorithms/MatchedFilterWizard.ui" line="16"/>
        <source>Add Color</source>
        <translation>Aggiungi Colore</translation>
    </message>
</context>
<context>
    <name>MatchedFilterWizardController</name>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterWizardController.py" line="47"/>
        <source>No Targets Selected</source>
        <translation>Nessun Obiettivo Selezionato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterWizardController.py" line="57"/>
        <source>View Range</source>
        <translation>Visualizza Intervallo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MatchedFilter/controllers/MatchedFilterWizardController.py" line="219"/>
        <source>Please add at least one target color to detect.</source>
        <translation>Aggiungi almeno un colore obiettivo da rilevare.</translation>
    </message>
</context>
<context>
    <name>MeasureDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="62"/>
        <source>Measure Distance</source>
        <translation>Misura Distanza</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="75"/>
        <source>Ground Sample Distance</source>
        <translation>Distanza di Campionamento al Suolo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="78"/>
        <source>GSD:</source>
        <translation>GSD:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="80"/>
        <source>Enter GSD value</source>
        <translation>Inserisci valore GSD</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="84"/>
        <source>cm/px</source>
        <translation>cm/px</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="92"/>
        <source>Measurement</source>
        <translation>Misurazione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="95"/>
        <source>Distance:</source>
        <translation>Distanza:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="96"/>
        <source>--</source>
        <translation>--</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="109"/>
        <source>Click on the image to place the first point,
then click again to place the second point.</source>
        <translation>Clicca sull&apos;immagine per posizionare il primo punto,
poi clicca di nuovo per posizionare il secondo punto.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="115"/>
        <source>Clear</source>
        <translation>Cancella</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="117"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/MeasureDialog.py" line="269"/>
        <source>No GSD value</source>
        <translation>Nessun valore GSD</translation>
    </message>
</context>
<context>
    <name>MediaSelector</name>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="14"/>
        <source>Automated Drone Image Analysis Tool (ADIAT)</source>
        <translation>Strumento Automatico di Analisi Immagini Drone (ADIAT)</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="31"/>
        <source>What type of media are you working with?</source>
        <translation>Con quale tipo di media stai lavorando?</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="86"/>
        <source>Images</source>
        <translation>Immagini</translation>
    </message>
    <message>
        <location filename="../resources/views/SelectionDialog.ui" line="163"/>
        <source>RTMP, Video Files, HDMI Capture</source>
        <translation>RTMP, File Video, Acquisizione HDMI</translation>
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
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="65"/>
        <source>Detection Mode</source>
        <translation>Modalità di Rilevamento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="70"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="74"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="296"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="317"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="71"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="318"/>
        <source>Static Camera</source>
        <translation>Camera Statica</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="73"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="319"/>
        <source>Moving Camera</source>
        <translation>Camera in Movimento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="76"/>
        <source>Mode:</source>
        <translation>Modalità:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="79"/>
        <source>Auto Mode: Detecting...</source>
        <translation>Modalità Auto: rilevamento...</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="85"/>
        <source>Algorithm</source>
        <translation>Algoritmo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="90"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="334"/>
        <source>Frame Difference</source>
        <translation>Differenza di Frame</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="91"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="96"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="335"/>
        <source>MOG2 Background</source>
        <translation>Sfondo MOG2</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="92"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="336"/>
        <source>KNN Background</source>
        <translation>Sfondo KNN</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="93"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="337"/>
        <source>Optical Flow</source>
        <translation>Flusso Ottico</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="95"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="338"/>
        <source>Feature Matching</source>
        <translation>Corrispondenza Caratteristiche</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="98"/>
        <source>Algorithm:</source>
        <translation>Algoritmo:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="104"/>
        <source>Detection Parameters</source>
        <translation>Parametri di Rilevamento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="109"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="348"/>
        <source>Sensitivity: {value}%</source>
        <translation>Sensibilità: {value}%</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="120"/>
        <source>Min Area:</source>
        <translation>Area Min:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="130"/>
        <source>Max Area:</source>
        <translation>Area Max:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="140"/>
        <source>Threshold:</source>
        <translation>Soglia:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="150"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="376"/>
        <source>Compensation: {value}%</source>
        <translation>Compensazione: {value}%</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="162"/>
        <source>Visualization</source>
        <translation>Visualizzazione</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="165"/>
        <source>Show Motion Vectors</source>
        <translation>Mostra Vettori di Movimento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="170"/>
        <source>Show Camera Motion</source>
        <translation>Mostra Movimento della Camera</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="178"/>
        <source>Detection Statistics</source>
        <translation>Statistiche di Rilevamento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="181"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="448"/>
        <source>Detections: 0</source>
        <translation>Rilevamenti: 0</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="184"/>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="274"/>
        <source>Camera Motion: None</source>
        <translation>Movimento Camera: Nessuno</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="187"/>
        <source>FPS: 0.0</source>
        <translation>FPS: 0.0</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="190"/>
        <source>Processing: 0.0ms</source>
        <translation>Elaborazione: 0.0ms</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="236"/>
        <source>Motion</source>
        <translation>Movimento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="256"/>
        <source>Detections: {count} | Total Area: {total} | Avg: {avg}</source>
        <translation>Rilevamenti: {count} | Area Totale: {total} | Media: {avg}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="267"/>
        <source>Camera Motion: ({x}, {y}) Confidence: {confidence}</source>
        <translation>Movimento Camera: ({x}, {y}) Confidenza: {confidence}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="286"/>
        <source> (GPU)</source>
        <translation> (GPU)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="287"/>
        <source> (CPU)</source>
        <translation> (CPU)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="288"/>
        <source>FPS: {fps:.1f}{gpu}</source>
        <translation>FPS: {fps:.1f}{gpu}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="291"/>
        <source>Processing: {time:.1f}ms</source>
        <translation>Elaborazione: {time:.1f}ms</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="297"/>
        <source>Auto Mode: {mode} ({confidence:.0%})</source>
        <translation>Modalità Auto: {mode} ({confidence:.0%})</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="308"/>
        <source>Auto Mode: {mode}</source>
        <translation>Modalità Auto: {mode}</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="432"/>
        <source>Total Detections</source>
        <translation>Rilevamenti Totali</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="433"/>
        <source>Last Detection</source>
        <translation>Ultimo Rilevamento</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="440"/>
        <source>{seconds:.1f}s ago</source>
        <translation>{seconds:.1f}s fa</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionController.py" line="443"/>
        <source>Never</source>
        <translation>Mai</translation>
    </message>
</context>
<context>
    <name>MotionDetectionWizard</name>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="12"/>
        <source>Detection Mode</source>
        <translation>Modalità Rilevamento</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="16"/>
        <source>Mode:</source>
        <translation>Modalità:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="22"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="25"/>
        <source>Static Camera</source>
        <translation>Telecamera Statica</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="28"/>
        <source>Moving Camera</source>
        <translation>Telecamera in Movimento</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="37"/>
        <source>Algorithm</source>
        <translation>Algoritmo</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="41"/>
        <source>Algorithm:</source>
        <translation>Algoritmo:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="47"/>
        <source>Frame Difference</source>
        <translation>Differenza Frame</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="50"/>
        <source>MOG2 Background</source>
        <translation>Sfondo MOG2</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="53"/>
        <source>KNN Background</source>
        <translation>Sfondo KNN</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="56"/>
        <source>Optical Flow</source>
        <translation>Flusso Ottico</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="59"/>
        <source>Feature Matching</source>
        <translation>Corrispondenza Caratteristiche</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="68"/>
        <source>Detection Parameters</source>
        <translation>Parametri Rilevamento</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="72"/>
        <source>Sensitivity: 50%</source>
        <translation>Sensibilità: 50%</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="87"/>
        <source>Min Area:</source>
        <translation>Area Min:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/MotionDetectionWizard.ui" line="103"/>
        <source>Max Area:</source>
        <translation>Area Max:</translation>
    </message>
</context>
<context>
    <name>MotionDetectionWizardController</name>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionWizardController.py" line="36"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionWizardController.py" line="37"/>
        <source>MOG2 Background</source>
        <translation>Sfondo MOG2</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/MotionDetection/controllers/MotionDetectionWizardController.py" line="48"/>
        <source>Sensitivity: {value}%</source>
        <translation>Sensibilità: {value}%</translation>
    </message>
</context>
<context>
    <name>PDFExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="150"/>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="159"/>
        <source>No Images to Export</source>
        <translation>Nessuna Immagine da Esportare</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="155"/>
        <source>There are no images available to include in the PDF report.

All images may be hidden or there are no images in the dataset.</source>
        <translation>Non ci sono immagini disponibili da includere nel report PDF.

Tutte le immagini potrebbero essere nascoste oppure non ci sono immagini nel dataset.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="165"/>
        <source>There are no images with flagged AOIs to include in the PDF report.

Please flag at least one AOI, or check &apos;Include images without flagged AOIs&apos; to include all images in the report.</source>
        <translation>Non ci sono immagini con AOI contrassegnate da includere nel report PDF.

Contrassegna almeno una AOI oppure seleziona &apos;Includi immagini senza AOI contrassegnate&apos; per includere tutte le immagini nel report.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="171"/>
        <source>Save PDF File</source>
        <translation>Salva File PDF</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="174"/>
        <source>PDF files (*.pdf)</source>
        <translation>File PDF (*.pdf)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="214"/>
        <source>Generating PDF Report</source>
        <translation>Generazione Report PDF</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="217"/>
        <source>Generating PDF Report...</source>
        <translation>Generazione Report PDF...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="258"/>
        <source>Failed to generate PDF file: {error}</source>
        <translation>Impossibile generare il file PDF: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="274"/>
        <source>Success</source>
        <translation>Successo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="276"/>
        <source>PDF report generated successfully!</source>
        <translation>Report PDF generato con successo!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="292"/>
        <source>PDF generation failed: {error}</source>
        <translation>Generazione PDF non riuscita: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/PDFExportController.py" line="306"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
</context>
<context>
    <name>PDFExportDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="27"/>
        <source>PDF Export Settings</source>
        <translation>Impostazioni Esportazione PDF</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="35"/>
        <source>Enter the following information for the PDF report:</source>
        <translation>Inserisci le seguenti informazioni per il report PDF:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="44"/>
        <source>Enter organization name</source>
        <translation>Inserisci nome organizzazione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="45"/>
        <source>Organization:</source>
        <translation>Organizzazione:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="49"/>
        <source>Enter search name</source>
        <translation>Inserisci nome ricerca</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="50"/>
        <source>Search Name:</source>
        <translation>Nome Ricerca:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="55"/>
        <source>Export Options:</source>
        <translation>Opzioni di Esportazione:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="60"/>
        <source>Include images without flagged AOIs</source>
        <translation>Includi immagini senza AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="64"/>
        <source>When checked, all images will be included in the PDF report, even if they don&apos;t have any flagged AOIs. When unchecked, only images with flagged AOIs will be included.</source>
        <translation>Quando selezionato, tutte le immagini saranno incluse nel report PDF, anche se non hanno AOI contrassegnate. Quando deselezionato, verranno incluse solo le immagini con AOI contrassegnate.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="69"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/PDFExportDialog.py" line="71"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
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
  ... e altri {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="95"/>
        <source>{count} source image(s) not found at expected locations:

{files}

Please select the folder containing the source images.</source>
        <translation>{count} immagine/i sorgente non trovata/e nelle posizioni previste:

{files}

Seleziona la cartella contenente le immagini sorgente.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="100"/>
        <source>Source Images Not Found</source>
        <translation>Immagini Sorgente Non Trovate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="111"/>
        <source>Select Source Images Folder</source>
        <translation>Seleziona Cartella Immagini Sorgente</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="143"/>
        <source>Some Images Still Missing</source>
        <translation>Alcune Immagini Mancano Ancora</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="147"/>
        <source>Found {found} of {total} images.

Still missing:
{missing}</source>
        <translation>Trovate {found} di {total} immagini.

Ancora mancanti:
{missing}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="178"/>
        <source>{count} detection mask(s) not found at expected locations:

{files}

Please select the folder containing the mask files.</source>
        <translation>{count} maschera/e di rilevamento non trovata/e nelle posizioni previste:

{files}

Seleziona la cartella contenente i file delle maschere.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="183"/>
        <source>Detection Masks Not Found</source>
        <translation>Maschere di Rilevamento Non Trovate</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="194"/>
        <source>Select Masks Folder</source>
        <translation>Seleziona Cartella Maschere</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="226"/>
        <source>Some Masks Still Missing</source>
        <translation>Alcune Maschere Mancano Ancora</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/path/PathValidationController.py" line="230"/>
        <source>Found {found} of {total} masks.

Still missing:
{missing}</source>
        <translation>Trovate {found} di {total} maschere.

Ancora mancanti:
{missing}</translation>
    </message>
</context>
<context>
    <name>Preferences</name>
    <message>
        <location filename="../resources/views/Preferences.ui" line="14"/>
        <source>Preferences</source>
        <translation>Preferenze</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="48"/>
        <source>Select the application theme appearance.
Changes the overall color scheme and visual style.</source>
        <translation>Seleziona l&apos;aspetto del tema dell&apos;applicazione.
Cambia lo schema colori generale e lo stile visivo.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="52"/>
        <source>Theme:</source>
        <translation>Tema:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="64"/>
        <source>Choose the application theme:
• Light: Bright theme with light backgrounds and dark text
• Dark: Dark theme with dark backgrounds and light text
Changes apply immediately to all windows.</source>
        <translation>Scegli il tema dell&apos;applicazione:
• Chiaro: Tema luminoso con sfondi chiari e testo scuro
• Scuro: Tema scuro con sfondi scuri e testo chiaro
Le modifiche si applicano immediatamente a tutte le finestre.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="71"/>
        <source>Light</source>
        <translation>Chiaro</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="76"/>
        <source>Dark</source>
        <translation>Scuro</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="99"/>
        <location filename="../app/core/controllers/Perferences.py" line="252"/>
        <source>{version}_{date}</source>
        <translation>{version}_{date}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="183"/>
        <source>{tiles} tiles ({size_mb:.1f} MB)</source>
        <translation>{tiles} tasselli ({size_mb:.1f} MB)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="189"/>
        <source>Not available</source>
        <translation>Non disponibile</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="191"/>
        <location filename="../app/core/controllers/Perferences.py" line="199"/>
        <location filename="../app/core/controllers/Perferences.py" line="227"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="201"/>
        <source>Terrain service not available.</source>
        <translation>Servizio terreno non disponibile.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="206"/>
        <source>Clear Terrain Cache</source>
        <translation>Cancella Cache Terreno</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="210"/>
        <source>Are you sure you want to clear all cached terrain elevation data?

This will require re-downloading tiles when terrain elevation is used.</source>
        <translation>Sei sicuro di voler cancellare tutti i dati di elevazione del terreno memorizzati nella cache?

Ciò richiederà il nuovo download dei tasselli quando verrà utilizzata l&apos;elevazione del terreno.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="221"/>
        <source>Cache Cleared</source>
        <translation>Cache Cancellata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="222"/>
        <source>Cleared {count} cached terrain tiles.</source>
        <translation>Cancellati {count} tasselli di terreno dalla cache.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="228"/>
        <source>Failed to clear cache: {error}</source>
        <translation>Impossibile cancellare la cache: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="238"/>
        <source>Select a Drone Sensor File</source>
        <translation>Seleziona un File Sensore Drone</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="241"/>
        <source>Pickle Files (*.pkl)</source>
        <translation>File Pickle (*.pkl)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="51"/>
        <source>Language:</source>
        <translation>Lingua:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="267"/>
        <source>Restart Required</source>
        <translation>Riavvio Richiesto</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/Perferences.py" line="269"/>
        <source>Please restart the application for language changes to take effect.</source>
        <translation>Riavvia l&apos;applicazione affinché le modifiche alla lingua abbiano effetto.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="111"/>
        <source>Max Areas of Interest: </source>
        <translation>Aree di Interesse Massime: </translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="158"/>
        <source>Area of Interest Circle Radius(px):</source>
        <translation>Raggio Cerchio Area di Interesse (px):</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="206"/>
        <source>Coordinate System:</source>
        <translation>Sistema di Coordinate:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="259"/>
        <source>Temperature Unit:</source>
        <translation>Unità di Temperatura:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="308"/>
        <source>Distance Unit:</source>
        <translation>Unità di Distanza:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="359"/>
        <source>Offline Only Mode:</source>
        <translation>Modalità Solo Offline:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="397"/>
        <source>Use Terrain Elevation:</source>
        <translation>Usa Elevazione Terreno:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="437"/>
        <source>Terrain Cache:</source>
        <translation>Cache Terreno:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="514"/>
        <source>Drone Sensor File Version:</source>
        <translation>Versione File Sensore Drone:</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="581"/>
        <source>Replace</source>
        <translation>Sostituisci</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="478"/>
        <source>Clear Cache</source>
        <translation>Cancella Cache</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="107"/>
        <source>Warning threshold for total AOIs detected across all images.
Prompts user when this limit is reached during processing.</source>
        <translation>Soglia di avviso per il totale di AOI rilevate in tutte le immagini.
Avvisa l&apos;utente quando questo limite viene raggiunto durante l&apos;elaborazione.</translation>
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
        <translation>Imposta la soglia di avviso per il totale di AOI rilevate durante l&apos;elaborazione.
• Intervallo: da 0 a 1000
• Predefinito: 100
Quando questo numero di AOI è rilevato su tutte le immagini:
• L&apos;interfaccia mostra un messaggio di avviso
• L&apos;utente può annullare l&apos;elaborazione, regolare le impostazioni e rieseguire
• Se non viene intrapresa alcuna azione, il rilevamento continua automaticamente
Usa valori più bassi per individuare presto conteggi elevati di rilevamenti.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="154"/>
        <source>Radius for combining neighboring AOIs into single detections.
AOIs within this distance are merged together.</source>
        <translation>Raggio per combinare AOI vicine in singoli rilevamenti.
Le AOI entro questa distanza vengono unite.</translation>
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
        <translation>Imposta il raggio per combinare AOI vicine durante il rilevamento.
• Intervallo: da 0 a 100 pixel
• Predefinito: 25 pixel
Quando le AOI sono entro questo raggio l&apos;una dall&apos;altra:
• Vengono combinate in una singola AOI
• Il processo si ripete finché non restano vicini entro il raggio
• Valori più grandi: combina rilevamenti più distanti (meno AOI totali)
• Valori più piccoli: mantiene i rilevamenti separati (più AOI individuali)
Usa per consolidare rilevamenti raggruppati in singoli oggetti.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="202"/>
        <source>Format for displaying geographic coordinates throughout the application.
Affects how GPS locations are shown in the viewer and exports.</source>
        <translation>Formato per visualizzare le coordinate geografiche in tutta l&apos;applicazione.
Influisce su come le posizioni GPS sono mostrate nel visualizzatore e nelle esportazioni.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="218"/>
        <source>Select the geographic coordinate display format:
• Lat/Long - Decimal Degrees: 34.123456, -118.987654 (most common, easy to use)
• Lat/Long - Degrees, Minutes, Seconds: 34° 7&apos; 24.4416&quot; N, 118° 59&apos; 15.5424&quot; W (traditional navigation)
• UTM: Universal Transverse Mercator grid system with zone, easting, northing (military, surveying)
This setting affects coordinate display in the viewer, exports, and overlays.</source>
        <translation>Seleziona il formato di visualizzazione delle coordinate geografiche:
• Lat/Long - Gradi Decimali: 34.123456, -118.987654 (più comune, facile da usare)
• Lat/Long - Gradi, Minuti, Secondi: 34° 7&apos; 24.4416&quot; N, 118° 59&apos; 15.5424&quot; W (navigazione tradizionale)
• UTM: sistema di griglia Universal Transverse Mercator con zona, est, nord (militare, topografia)
Questa impostazione influisce sulla visualizzazione delle coordinate nel visualizzatore, nelle esportazioni e nelle sovrapposizioni.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="226"/>
        <source>Lat/Long - Decimal Degrees</source>
        <translation>Lat/Long - Gradi Decimali</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="231"/>
        <source>Lat/Long - Degrees, Minutes, Seconds</source>
        <translation>Lat/Long - Gradi, Minuti, Secondi</translation>
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
        <translation>Unità per visualizzare le misure di temperatura da immagini termiche.
Usata quando si analizzano immagini termiche da camere termiche.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="271"/>
        <source>Select the temperature unit for thermal image analysis:
• Fahrenheit (°F): Imperial temperature scale (US standard)
  - Water freezes at 32°F, boils at 212°F
• Celsius (°C): Metric temperature scale (international standard)
  - Water freezes at 0°C, boils at 100°C
Applies to thermal camera data display and analysis results.</source>
        <translation>Seleziona l&apos;unità di temperatura per l&apos;analisi di immagini termiche:
• Fahrenheit (°F): scala imperiale della temperatura (standard USA)
  - L&apos;acqua congela a 32°F, bolle a 212°F
• Celsius (°C): scala metrica della temperatura (standard internazionale)
  - L&apos;acqua congela a 0°C, bolle a 100°C
Si applica alla visualizzazione dei dati della camera termica e ai risultati di analisi.</translation>
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
        <translation>Unità per visualizzare misure di distanza e altitudine.
Usata per altitudine del drone, distanze degli oggetti e calcoli spaziali.</translation>
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
        <translation>Seleziona l&apos;unità di distanza per le misurazioni:
• Metri (m): unità di distanza metrica (standard internazionale)
  - 1 metro = 3.281 piedi
  - Usato per altitudine, GSD e calcoli di distanza
• Piedi (ft): unità di distanza imperiale (standard USA)
  - 1 piede = 0.3048 metri
  - Comune in aviazione e topografia USA
Si applica alle visualizzazioni dell&apos;altitudine, ai calcoli GSD e alle misurazioni delle distanze.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="331"/>
        <source>Meters</source>
        <translation>Metri</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="336"/>
        <source>Feet</source>
        <translation>Piedi</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="355"/>
        <source>Toggle Offline Only mode.
When enabled, the app skips any network calls (map tiles, CalTopo exports) and works with cached data only.</source>
        <translation>Attiva/disattiva la modalità Solo Offline.
Quando abilitata, l&apos;app salta tutte le chiamate di rete (tessere mappa, esportazioni CalTopo) e lavora solo con dati in cache.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="371"/>
        <source>Disable online functionality (tile downloads, CalTopo integration) and work entirely offline.</source>
        <translation>Disabilita le funzionalità online (download tessere, integrazione CalTopo) e lavora completamente offline.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="374"/>
        <location filename="../resources/views/Preferences.ui" line="415"/>
        <source>Enable</source>
        <translation>Abilita</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="392"/>
        <source>Use terrain elevation data (DTM/DSM) for more accurate AOI GPS coordinate calculations.
When enabled, uses online elevation data to account for terrain variations.
When disabled, assumes flat terrain at takeoff altitude.</source>
        <translation>Usa i dati di elevazione del terreno (DTM/DSM) per calcoli più accurati delle coordinate GPS delle AOI.
Quando abilitato, usa dati di elevazione online per tenere conto delle variazioni del terreno.
Quando disabilitato, assume terreno piatto all&apos;altitudine di decollo.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="409"/>
        <source>Enable terrain-corrected AOI positioning using DTM/DSM elevation data.
• When enabled: Downloads and caches elevation tiles for accurate positioning
• When disabled: Uses flat terrain assumption (faster, works offline)
Terrain data is cached locally and works offline after first download.</source>
        <translation>Abilita il posizionamento AOI corretto per il terreno usando dati di elevazione DTM/DSM.
• Quando abilitato: scarica e memorizza in cache i tasselli di elevazione per un posizionamento accurato
• Quando disabilitato: usa l&apos;assunzione di terreno piatto (più veloce, funziona offline)
I dati del terreno vengono memorizzati localmente e funzionano offline dopo il primo download.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="433"/>
        <source>Manage the terrain elevation data cache.
Terrain tiles are downloaded and stored locally for offline use.</source>
        <translation>Gestisci la cache dei dati di elevazione del terreno.
I tasselli del terreno vengono scaricati e memorizzati localmente per l&apos;uso offline.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="449"/>
        <source>0 tiles (0 MB)</source>
        <translation>0 tasselli (0 MB)</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="474"/>
        <source>Clear all cached terrain elevation tiles.
This will require re-downloading tiles when terrain elevation is used.</source>
        <translation>Cancella tutti i tasselli di elevazione del terreno memorizzati nella cache.
Ciò richiederà il nuovo download dei tasselli quando verrà utilizzata l&apos;elevazione del terreno.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="510"/>
        <source>Version of the current drone sensor configuration file.
Contains camera specifications, sensor dimensions, and focal length data for different drone models.</source>
        <translation>Versione del file di configurazione del sensore drone corrente.
Contiene specifiche della camera, dimensioni del sensore e dati sulla lunghezza focale per diversi modelli di drone.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="539"/>
        <source>Currently loaded drone sensor file version number.
The sensor file defines camera parameters for accurate GSD and AOI calculations.</source>
        <translation>Numero di versione del file sensore drone attualmente caricato.
Il file sensore definisce i parametri della camera per calcoli accurati di GSD e AOI.</translation>
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
        <translation>Sostituisci il file di configurazione del sensore drone corrente.
Consente di aggiornare a una versione più recente o a specifiche sensore personalizzate.
Formato file richiesto: JSON con modelli di drone, sensori, lunghezze focali e dimensioni.
Usa questo quando:
• Sono disponibili nuovi modelli di drone
• Le specifiche del sensore devono essere aggiornate
• Sono necessarie configurazioni personalizzate della camera
Esegui un backup del file esistente prima di sostituirlo.</translation>
    </message>
    <message>
        <location filename="../resources/views/Preferences.ui" line="601"/>
        <source>Close the Preferences window.
All changes are saved automatically when modified.</source>
        <translation>Chiudi la finestra Preferenze.
Tutte le modifiche vengono salvate automaticamente quando vengono modificate.</translation>
    </message>
</context>
<context>
    <name>QtImageViewer</name>
    <message>
        <location filename="../app/core/views/images/viewer/widgets/QtImageViewer.py" line="313"/>
        <source>Open image</source>
        <translation>Apri immagine</translation>
    </message>
</context>
<context>
    <name>RXAnomaly</name>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
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
        <translation>Numero di segmenti in cui dividere ogni immagine per l&apos;analisi.
L&apos;algoritmo RX analizza ogni segmento indipendentemente per rilevare anomalie locali.
Impatto sulle prestazioni:
• Numero di segmenti più alto: AUMENTA il tempo di elaborazione (più segmenti da analizzare)
• Numero di segmenti più basso: DIMINUISCE il tempo di elaborazione (meno segmenti da analizzare)
• 1 segmento: elaborazione più veloce (analizza l&apos;immagine intera una sola volta)
Un numero più alto di segmenti migliora il rilevamento in immagini con sfondi variabili.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="38"/>
        <source>Image Segments:</source>
        <translation>Segmenti Immagine:</translation>
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
        <translation>Seleziona il numero di segmenti in cui dividere ogni immagine.
• Opzioni: 1, 2, 4, 6, 9, 16, 25, 36 segmenti
• Predefinito: 1 (analizza l&apos;immagine intera come un singolo segmento)
L&apos;algoritmo RX Anomaly usa analisi statistica per rilevare pixel insoliti:
• 1 segmento: analizza l&apos;intera immagine in una sola volta (ideale per immagini piccole)
• Più segmenti: analizza regioni locali indipendentemente (meglio per immagini grandi)
Un numero più alto di segmenti migliora il rilevamento in immagini con sfondi variabili.
Consigliato: 4-9 segmenti per immagini tipiche da drone.</translation>
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
        <translation>Sensibilità di rilevamento per l&apos;individuazione di anomalie.
• Intervallo: da 1 a 10
• Predefinito: 5
Controlla quanto un pixel deve essere statisticamente diverso dallo sfondo per essere rilevato:
• Valori più bassi (1-3): DIMINUISCONO i rilevamenti - meno sensibile, rileva solo anomalie marcate
• Valori più alti (7-10): AUMENTANO i rilevamenti - più sensibile, rileva anomalie sottili
Una sensibilità più alta trova più potenziali target ma può includere rumore/falsi positivi.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="146"/>
        <source>Sensitivity:</source>
        <translation>Sensibilità:</translation>
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
        <translation>Regola la sensibilità di rilevamento per l&apos;individuazione di anomalie.
• Intervallo: da 1 a 10
• Predefinito: 5
L&apos;algoritmo RX usa analisi statistica per trovare pixel che differiscono dallo sfondo:
• Valori più bassi (1-3): meno sensibile, rileva solo anomalie marcate (meno falsi positivi)
• Valori medi (4-6): rilevamento bilanciato (consigliato per la maggior parte dei casi)
• Valori più alti (7-10): più sensibile, rileva anomalie sottili (più rilevamenti, può includere rumore)
Le anomalie sono pixel statisticamente diversi dallo sfondo circostante.
Usa sensibilità più bassa per immagini pulite, più alta per trovare target sottili.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomaly.ui" line="205"/>
        <source>Current sensitivity level for anomaly detection.
Displays the value selected on the sensitivity slider (1-10).</source>
        <translation>Livello di sensibilità corrente per il rilevamento di anomalie.
Visualizza il valore selezionato sul cursore di sensibilità (1-10).</translation>
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
        <translation>Le tue immagini contengono scene complesse con edifici, veicoli o coperture del terreno artificiali miste?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="49"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="64"/>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="100"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>Quanto aggressivamente dovrebbe ADIAT cercare le anomalie?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/RXAnomalyWizard.ui" line="113"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Nota: un&apos;impostazione più alta troverà più potenziali anomalie ma potrebbe anche aumentare i falsi positivi.</translation>
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
        <translation>&lt;br&gt;&lt;b&gt;Soglia:&lt;/b&gt; {value}</translation>
    </message>
</context>
<context>
    <name>RecentColorsDialog</name>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="151"/>
        <source>Recent Colors</source>
        <translation>Colori Recenti</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="162"/>
        <source>Select a recently used color:</source>
        <translation>Seleziona un colore usato di recente:</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/Shared/views/RecentColorsDialog.py" line="178"/>
        <source>No recent colors found</source>
        <translation>Nessun colore recente trovato</translation>
    </message>
</context>
<context>
    <name>ResultsFolderDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="115"/>
        <source>Load Results Folder</source>
        <translation>Carica Cartella Risultati</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="124"/>
        <source>Found {count} result(s)</source>
        <translation>Trovati {count} risultati</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="132"/>
        <source>Folder</source>
        <translation>Cartella</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="132"/>
        <source>Algorithm</source>
        <translation>Algoritmo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="132"/>
        <source>Images</source>
        <translation>Immagini</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>Missing</source>
        <translation>Mancanti</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>AOIs</source>
        <translation>AOI</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="133"/>
        <source>Map</source>
        <translation>Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="134"/>
        <source>View</source>
        <translation>Visualizza</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="170"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="216"/>
        <source>Open in Google Maps</source>
        <translation>Apri in Google Maps</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="226"/>
        <source>No images available - cannot get GPS location</source>
        <translation>Nessuna immagine disponibile - impossibile ottenere la posizione GPS</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="228"/>
        <source>No GPS coordinates found in images</source>
        <translation>Nessuna coordinata GPS trovata nelle immagini</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="248"/>
        <source>Open in Results Viewer</source>
        <translation>Apri nel Visualizzatore Risultati</translation>
    </message>
</context>
<context>
    <name>ReviewOrNewPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="70"/>
        <source>No file selected</source>
        <translation>Nessun file selezionato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="114"/>
        <source>Select ADIAT Results File</source>
        <translation>Seleziona File Risultati ADIAT</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="117"/>
        <source>XML Files (*.xml);;All Files (*)</source>
        <translation>File XML (*.xml);;Tutti i File (*)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="125"/>
        <source>File Name Warning</source>
        <translation>Avviso Nome File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/ReviewOrNewPage.py" line="129"/>
        <source>The selected file does not appear to be an ADIAT_Data.xml file.

Do you want to continue with this file?</source>
        <translation>Il file selezionato non sembra essere un file ADIAT_Data.xml.

Vuoi continuare con questo file?</translation>
    </message>
</context>
<context>
    <name>ReviewerNameDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="25"/>
        <source>Reviewer Name</source>
        <translation>Nome Revisore</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="45"/>
        <source>Review Tracking</source>
        <translation>Tracciamento Revisione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="53"/>
        <source>Enter your name to track your review activity.
This helps coordinate reviews across multiple reviewers.</source>
        <translation>Inserisci il tuo nome per tracciare la tua attività di revisione.
Questo aiuta a coordinare le revisioni tra più revisori.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="60"/>
        <source>Your Name:</source>
        <translation>Il tuo nome:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="64"/>
        <source>Enter your name</source>
        <translation>Inserisci il tuo nome</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="65"/>
        <source>Enter your full name or identifier for review tracking</source>
        <translation>Inserisci il tuo nome completo o un identificativo per il tracciamento della revisione</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="71"/>
        <source>Remember my name</source>
        <translation>Ricorda il mio nome</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="76"/>
        <source>Save your name for future review sessions.
You can change it later in Preferences or by clicking the reviewer name in the viewer.</source>
        <translation>Salva il tuo nome per future sessioni di revisione.
Puoi cambiarlo più avanti nelle Preferenze o cliccando il nome del revisore nel visualizzatore.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="86"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="91"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="123"/>
        <source>Name Required</source>
        <translation>Nome Richiesto</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ReviewerNameDialog.py" line="125"/>
        <source>Please enter your name to continue.</source>
        <translation>Inserisci il tuo nome per continuare.</translation>
    </message>
</context>
<context>
    <name>ScanProgressDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ResultsFolderDialog.py" line="51"/>
        <source>Scanning for Results</source>
        <translation>Scansione dei Risultati</translation>
    </message>
</context>
<context>
    <name>StatusController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="44"/>
        <source>GPS Coordinates</source>
        <translation>Coordinate GPS</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="45"/>
        <source>Relative Altitude</source>
        <translation>Altitudine Relativa</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="46"/>
        <source>Gimbal Orientation</source>
        <translation>Orientamento Gimbal</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="47"/>
        <source>Estimated Average GSD</source>
        <translation>GSD Medio Stimato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="48"/>
        <source>Temperature</source>
        <translation>Temperatura</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="49"/>
        <source>Color Values</source>
        <translation>Valori Colore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="50"/>
        <source>Drone Orientation</source>
        <translation>Orientamento Drone</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="115"/>
        <source>Error Loading Images</source>
        <translation>Errore nel Caricamento delle Immagini</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="121"/>
        <source>No active images available.</source>
        <translation>Nessuna immagine attiva disponibile.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/status/StatusController.py" line="125"/>
        <source>No other images available.</source>
        <translation>Nessun&apos;altra immagine disponibile.</translation>
    </message>
</context>
<context>
    <name>StreamAlgorithmPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="87"/>
        <source>Are you looking for specific colors?</source>
        <translation>Stai cercando colori specifici?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="159"/>
        <source>Color Detection</source>
        <translation>Rilevamento Colore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="162"/>
        <source>Color Anomaly &amp; Motion Detection</source>
        <translation>Rilevamento Anomalie Colore &amp; Movimento</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmPage.py" line="164"/>
        <source>Selected Algorithm: {algorithm}</source>
        <translation>Algoritmo Selezionato: {algorithm}</translation>
    </message>
</context>
<context>
    <name>StreamAlgorithmParametersPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="181"/>
        <source>Color Detection</source>
        <translation>Rilevamento Colore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="184"/>
        <source>Color Anomaly &amp; Motion Detection</source>
        <translation>Rilevamento Anomalie Colore &amp; Movimento</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="184"/>
        <source>Algorithm</source>
        <translation>Algoritmo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamAlgorithmParametersPage.py" line="186"/>
        <source>{algorithm} Parameters</source>
        <translation>Parametri {algorithm}</translation>
    </message>
</context>
<context>
    <name>StreamConnectionPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="25"/>
        <source>Click Scan to find devices...</source>
        <translation>Clicca Scansiona per trovare i dispositivi...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="41"/>
        <source>480p</source>
        <translation>480p</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="42"/>
        <source>720p</source>
        <translation>720p</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="43"/>
        <source>1080p</source>
        <translation>1080p</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="44"/>
        <source>4K</source>
        <translation>4K</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="157"/>
        <source>Choose the video file you want to analyze. Use Browse to pick a file from disk.</source>
        <translation>Scegli il file video che vuoi analizzare. Usa Sfoglia per scegliere un file dal disco.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="158"/>
        <source>Video File:</source>
        <translation>File Video:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="159"/>
        <source>Click Browse to select a video file...</source>
        <translation>Clicca Sfoglia per selezionare un file video...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="166"/>
        <source>Enter the capture device index (0, 1, 2, ...) for your HDMI input.</source>
        <translation>Inserisci l&apos;indice del dispositivo di acquisizione (0, 1, 2, ...) per il tuo ingresso HDMI.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="167"/>
        <source>Device Index:</source>
        <translation>Indice Dispositivo:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="168"/>
        <source>0</source>
        <translation>0</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="175"/>
        <source>Enter the RTMP URL provided by your streaming server (rtmp://server:port/app/key).</source>
        <translation>Inserisci l&apos;URL RTMP fornito dal tuo server di streaming (rtmp://server:port/app/key).</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="176"/>
        <source>Stream URL:</source>
        <translation>URL Stream:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="177"/>
        <source>rtmp://server:port/app/streamKey</source>
        <translation>rtmp://server:port/app/streamKey</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="190"/>
        <source>OpenCV not available; enter index manually.</source>
        <translation>OpenCV non disponibile; inserisci l&apos;indice manualmente.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="203"/>
        <source>Device {index}</source>
        <translation>Dispositivo {index}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="212"/>
        <source>No capture devices found.</source>
        <translation>Nessun dispositivo di acquisizione trovato.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="253"/>
        <source>Select Video File</source>
        <translation>Seleziona File Video</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamConnectionPage.py" line="257"/>
        <source>Video Files (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm);;All Files (*)</source>
        <translation>File Video (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm);;Tutti i File (*)</translation>
    </message>
</context>
<context>
    <name>StreamControlWidget</name>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="706"/>
        <source>Stream Connection</source>
        <translation>Connessione Stream</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="709"/>
        <source>Configure and connect to video source (file, HDMI capture, or RTMP stream)</source>
        <translation>Configura e connettiti alla sorgente video (file, acquisizione HDMI o stream RTMP)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="713"/>
        <source>Stream Type:</source>
        <translation>Tipo Stream:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="715"/>
        <source>File</source>
        <translation>File</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="716"/>
        <source>HDMI Capture</source>
        <translation>Acquisizione HDMI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="717"/>
        <source>RTMP Stream</source>
        <translation>Stream RTMP</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="725"/>
        <source>Select the type of video source:
• File: Pre-recorded video file with timeline controls
• HDMI Capture: Live capture from HDMI capture device
• RTMP Stream: Real-time streaming from RTMP/HTTP source</source>
        <translation>Seleziona il tipo di sorgente video:
• File: File video preregistrato con controlli timeline
• Acquisizione HDMI: Acquisizione dal vivo da dispositivo di acquisizione HDMI
• Stream RTMP: Streaming in tempo reale da sorgente RTMP/HTTP</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="729"/>
        <source>Stream URL/Path:</source>
        <translation>URL/Percorso Stream:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="736"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="937"/>
        <source>Click to browse for video file...</source>
        <translation>Clicca per sfogliare il file video...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="744"/>
        <source>Enter or browse for the video source:
• File: Click to browse for video file (MP4, AVI, MOV, etc.)
• RTMP Stream: Enter RTMP URL (rtmp://server:port/app/stream)</source>
        <translation>Inserisci o sfoglia per la sorgente video:
• File: Clicca per sfogliare il file video (MP4, AVI, MOV, ecc.)
• Stream RTMP: Inserisci l&apos;URL RTMP (rtmp://server:port/app/stream)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="749"/>
        <source>Select HDMI capture device</source>
        <translation>Seleziona dispositivo di acquisizione HDMI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="751"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1081"/>
        <source>Scanning for devices...</source>
        <translation>Scansione dispositivi...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="755"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="887"/>
        <source>Browse...</source>
        <translation>Sfoglia...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="762"/>
        <source>Open file browser to select a video file for analysis.
Supported formats: MP4, AVI, MOV, MKV, FLV, WMV, M4V, 3GP, WebM</source>
        <translation>Apri il browser dei file per selezionare un file video per l&apos;analisi.
Formati supportati: MP4, AVI, MOV, MKV, FLV, WMV, M4V, 3GP, WebM</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="766"/>
        <source>Scan...</source>
        <translation>Scansiona...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="768"/>
        <source>Scan for available HDMI capture devices</source>
        <translation>Scansiona i dispositivi di acquisizione HDMI disponibili</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="775"/>
        <source>Connect</source>
        <translation>Connetti</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="779"/>
        <source>Connect to the specified video source and begin processing.</source>
        <translation>Connettiti alla sorgente video specificata e inizia l&apos;elaborazione.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="780"/>
        <source>Disconnect</source>
        <translation>Disconnetti</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="785"/>
        <source>Disconnect from the current video source and stop processing.</source>
        <translation>Disconnettiti dalla sorgente video corrente e interrompi l&apos;elaborazione.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="791"/>
        <source>Status: Disconnected</source>
        <translation>Stato: Disconnesso</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="793"/>
        <source>Current connection status</source>
        <translation>Stato della connessione corrente</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="796"/>
        <source>Performance</source>
        <translation>Prestazioni</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="797"/>
        <source>Real-time performance metrics</source>
        <translation>Metriche di prestazioni in tempo reale</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="801"/>
        <source>Video: --</source>
        <translation>Video: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="802"/>
        <source>Original video resolution</source>
        <translation>Risoluzione video originale</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="803"/>
        <source>Processing: --</source>
        <translation>Elaborazione: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="806"/>
        <source>Resolution used for detection processing</source>
        <translation>Risoluzione usata per l&apos;elaborazione del rilevamento</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="809"/>
        <source>Video FPS: --</source>
        <translation>FPS Video: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="810"/>
        <source>Native frame rate of the video source</source>
        <translation>Frequenza fotogrammi nativa della sorgente video</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="811"/>
        <source>Proc FPS: --</source>
        <translation>FPS Elaborazione: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="814"/>
        <source>Actual frames per second being processed</source>
        <translation>Fotogrammi al secondo effettivamente elaborati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="817"/>
        <source>Time: -- ms</source>
        <translation>Tempo: -- ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="820"/>
        <source>Time in milliseconds to process each frame</source>
        <translation>Tempo in millisecondi per elaborare ogni fotogramma</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="821"/>
        <source>Latency: -- ms</source>
        <translation>Latenza: -- ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="824"/>
        <source>End-to-end latency from frame capture to display</source>
        <translation>Latenza end-to-end dalla cattura del fotogramma alla visualizzazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="827"/>
        <source>Frames: --</source>
        <translation>Fotogrammi: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="828"/>
        <source>Total number of frames processed</source>
        <translation>Numero totale di fotogrammi elaborati</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="829"/>
        <source>Detections: --</source>
        <translation>Rilevamenti: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="830"/>
        <source>Number of detections in current frame</source>
        <translation>Numero di rilevamenti nel fotogramma corrente</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="844"/>
        <source>Recording</source>
        <translation>Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="849"/>
        <source>Start Recording</source>
        <translation>Avvia Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="853"/>
        <source>Start recording the video stream with detection overlays.</source>
        <translation>Avvia la registrazione dello stream video con sovrapposizioni di rilevamento.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="854"/>
        <source>Stop Recording</source>
        <translation>Interrompi Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="858"/>
        <source>Stop the current recording and save to file.</source>
        <translation>Interrompi la registrazione corrente e salva su file.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="864"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1037"/>
        <source>Status: Not Recording</source>
        <translation>Stato: Non in Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="868"/>
        <source>Current recording status and output file path</source>
        <translation>Stato di registrazione corrente e percorso del file di output</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="871"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1044"/>
        <source>Duration: --</source>
        <translation>Durata: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="874"/>
        <source>Recording statistics: Duration, FPS, Frames</source>
        <translation>Statistiche registrazione: Durata, FPS, Fotogrammi</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="882"/>
        <source>Save to:</source>
        <translation>Salva in:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="886"/>
        <source>Directory where video recordings will be saved.</source>
        <translation>Cartella in cui verranno salvate le registrazioni video.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="890"/>
        <source>Choose a folder to store recordings.</source>
        <translation>Scegli una cartella per salvare le registrazioni.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="945"/>
        <source>rtmp://server:port/app/stream</source>
        <translation>rtmp://server:port/app/stream</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="961"/>
        <source>Invalid Device</source>
        <translation>Dispositivo Non Valido</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="963"/>
        <source>Please select a valid HDMI capture device.</source>
        <translation>Seleziona un dispositivo di acquisizione HDMI valido.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="972"/>
        <source>Invalid URL</source>
        <translation>URL Non Valido</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="974"/>
        <source>Please enter a valid stream URL.</source>
        <translation>Inserisci un URL stream valido.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="990"/>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="997"/>
        <source>Status: {message}</source>
        <translation>Stato: {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1025"/>
        <source>Status: Recording</source>
        <translation>Stato: Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1029"/>
        <source>Output: {value}</source>
        <translation>Output: {value}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1041"/>
        <source>Duration: {value}</source>
        <translation>Durata: {value}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1070"/>
        <source>Select Recording Directory</source>
        <translation>Seleziona Cartella Registrazioni</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1090"/>
        <source>Device {index}</source>
        <translation>Dispositivo {index}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1099"/>
        <source>No capture devices found</source>
        <translation>Nessun dispositivo di acquisizione trovato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1109"/>
        <source>Error scanning devices: {error}</source>
        <translation>Errore durante la scansione dei dispositivi: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1136"/>
        <source>Video: {width}x{height}</source>
        <translation>Video: {width}x{height}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1143"/>
        <source>Processing: {width}x{height}</source>
        <translation>Elaborazione: {width}x{height}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1157"/>
        <source>Video FPS: {fps:.1f}</source>
        <translation>FPS Video: {fps:.1f}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1160"/>
        <source>Proc FPS: {fps:.1f}</source>
        <translation>FPS Elaborazione: {fps:.1f}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1168"/>
        <source>Time: {time:.1f} ms</source>
        <translation>Tempo: {time:.1f} ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1171"/>
        <source>Latency: {latency:.1f} ms</source>
        <translation>Latenza: {latency:.1f} ms</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1179"/>
        <source>Frames: {count}</source>
        <translation>Fotogrammi: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1182"/>
        <source>Detections: {count}</source>
        <translation>Rilevamenti: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1189"/>
        <source>Select Video File</source>
        <translation>Seleziona File Video</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="1194"/>
        <source>Video Files (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm *.mpg *.mpeg *.ts *.mts *.m2ts);;All Files (*)</source>
        <translation>File Video (*.mp4 *.avi *.mov *.mkv *.flv *.wmv *.m4v *.3gp *.webm *.mpg *.mpeg *.ts *.mts *.m2ts);;Tutti i File (*)</translation>
    </message>
</context>
<context>
    <name>StreamGeneralPage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamGeneralPage.py" line="55"/>
        <source>Select Recording Folder</source>
        <translation>Seleziona Cartella Registrazioni</translation>
    </message>
</context>
<context>
    <name>StreamTargetSizePage</name>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="79"/>
        <source>Hat, Helmet, Plastic Bag</source>
        <translation>Cappello, Casco, Sacchetto di plastica</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="80"/>
        <source>Cat, Daypack</source>
        <translation>Gatto, Zaino da giorno</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="81"/>
        <source>Large Pack, Medium Dog</source>
        <translation>Zaino grande, Cane medio</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="82"/>
        <source>Sleeping Bag, Large Dog</source>
        <translation>Sacco a pelo, Cane grande</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="83"/>
        <source>Small Boat, 2-Person Tent</source>
        <translation>Barca piccola, Tenda da 2 persone</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="84"/>
        <source>Car/SUV, Small Pickup Truck, Large Tent</source>
        <translation>Auto/SUV, Pickup piccolo, Tenda grande</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="85"/>
        <source>House</source>
        <translation>Casa</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="90"/>
        <source>More Examples:</source>
        <translation>Altri esempi:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="104"/>
        <source>sqm</source>
        <translation>sqm</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/guidePages/StreamTargetSizePage.py" line="108"/>
        <source>sqft</source>
        <translation>sqft</translation>
    </message>
</context>
<context>
    <name>StreamViewerWindow</name>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="87"/>
        <source>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</source>
        <translation>Strumento Automatico di Analisi Immagini Drone v{version} - Sponsorizzato da TEXSAR</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="175"/>
        <source>Live View</source>
        <translation>Vista Live</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="180"/>
        <source>Gallery</source>
        <translation>Galleria</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="221"/>
        <source>Menu</source>
        <translation>Menu</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="222"/>
        <source>Streaming Analysis Wizard</source>
        <translation>Procedura guidata Analisi Streaming</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="223"/>
        <source>Image Analysis</source>
        <translation>Analisi Immagini</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="224"/>
        <source>Preferences</source>
        <translation>Preferenze</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="231"/>
        <source>Help</source>
        <translation>Aiuto</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="232"/>
        <source>Manual</source>
        <translation>Manuale</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="233"/>
        <source>Community Forum</source>
        <translation>Forum della Comunità</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="234"/>
        <source>YouTube Channel</source>
        <translation>Canale YouTube</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="257"/>
        <source>Start Recording</source>
        <translation>Avvia Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="261"/>
        <source>Start recording the video stream with detection overlays.</source>
        <translation>Avvia la registrazione dello stream video con sovrapposizioni di rilevamento.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="262"/>
        <source>Stop Recording</source>
        <translation>Interrompi Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="266"/>
        <source>Stop the current recording and save to file.</source>
        <translation>Interrompi la registrazione corrente e salva su file.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="272"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1653"/>
        <source>Status: Not Recording</source>
        <translation>Stato: Non in Registrazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="276"/>
        <source>Current recording status and output file path</source>
        <translation>Stato di registrazione corrente e percorso del file di output</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="279"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1655"/>
        <source>Duration: --</source>
        <translation>Durata: --</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="282"/>
        <source>Recording statistics: Duration, FPS, Frames</source>
        <translation>Statistiche registrazione: Durata, FPS, Fotogrammi</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="286"/>
        <source>Save to:</source>
        <translation>Salva in:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="291"/>
        <source>Directory where video recordings will be saved.</source>
        <translation>Cartella in cui verranno salvate le registrazioni video.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="292"/>
        <source>Browse...</source>
        <translation>Sfoglia...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="295"/>
        <source>Choose a folder to store recordings.</source>
        <translation>Scegli una cartella per salvare le registrazioni.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="345"/>
        <source>Select Recording Directory</source>
        <translation>Seleziona Cartella Registrazioni</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="365"/>
        <source>Algorithm:</source>
        <translation>Algoritmo:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="368"/>
        <source>Select which streaming detection algorithm to use</source>
        <translation>Seleziona quale algoritmo di rilevamento in streaming utilizzare</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="377"/>
        <source>Choose which streaming detection algorithm to run.
• Color Anomaly &amp; Motion Detection: fused anomaly detectors
• Color Detection: color-based highlighting</source>
        <translation>Scegli quale algoritmo di rilevamento in streaming eseguire.
• Rilevamento Anomalie Colore &amp; Movimento: rilevatori di anomalie combinati
• Rilevamento Colore: evidenziazione basata sul colore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="416"/>
        <source>Gallery Threshold:</source>
        <translation>Soglia Galleria:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="421"/>
        <source>Number of frames a detection must be seen before appearing in the Gallery tab</source>
        <translation>Numero di fotogrammi in cui un rilevamento deve essere visto prima di apparire nella scheda Galleria</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="426"/>
        <source> frames</source>
        <translation> fotogrammi</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="433"/>
        <source>Detections must be seen for this many consecutive frames
before appearing in the Gallery. Higher values reduce
false positives but delay detection appearance.</source>
        <translation>I rilevamenti devono essere visti per questo numero di fotogrammi consecutivi
prima di apparire nella Galleria. Valori più alti riducono
i falsi positivi ma ritardano la comparsa del rilevamento.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="626"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="645"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="658"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="672"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="686"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="700"/>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1669"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="627"/>
        <source>Failed to open Streaming Analysis Guide:
{error}</source>
        <translation>Impossibile aprire la Guida Analisi Streaming:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="646"/>
        <source>Failed to open Image Analysis:
{error}</source>
        <translation>Impossibile aprire Analisi Immagini:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="659"/>
        <source>Failed to open Preferences:
{error}</source>
        <translation>Impossibile aprire Preferenze:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="673"/>
        <source>Failed to open Help documentation:
{error}</source>
        <translation>Impossibile aprire la documentazione di aiuto:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="687"/>
        <source>Failed to open Community Forum:
{error}</source>
        <translation>Impossibile aprire il Forum della Comunità:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="701"/>
        <source>Failed to open YouTube Channel:
{error}</source>
        <translation>Impossibile aprire il Canale YouTube:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="803"/>
        <source>Loaded: {algorithm}</source>
        <translation>Caricato: {algorithm}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="819"/>
        <source>Error loading algorithm: {error}</source>
        <translation>Errore nel caricamento dell&apos;algoritmo: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="823"/>
        <source>Algorithm Load Error</source>
        <translation>Errore Caricamento Algoritmo</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1282"/>
        <source>Algorithm switched to {label}</source>
        <translation>Algoritmo cambiato in {label}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1307"/>
        <source>{state} - {message}</source>
        <translation>{state} - {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1308"/>
        <source>Connected</source>
        <translation>Connesso</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1308"/>
        <source>Disconnected</source>
        <translation>Disconnesso</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1318"/>
        <source>✓ Connected: {message}</source>
        <translation>✓ Connesso: {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1345"/>
        <source>✗ Disconnected: {message}</source>
        <translation>✗ Disconnesso: {message}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1552"/>
        <source>No detections found.</source>
        <translation>Nessun rilevamento trovato.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1556"/>
        <source>Detection Results ({count} found):</source>
        <translation>Risultati Rilevamento ({count} trovati):</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1569"/>
        <source>#{index}: Type({cls}) Pos({x},{y}) Size({w}x{h})</source>
        <translation>#{index}: Tipo({cls}) Pos({x},{y}) Dim({w}x{h})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1578"/>
        <source>#{index}: Type({cls})</source>
        <translation>#{index}: Tipo({cls})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1583"/>
        <source> Conf({confidence:.2f})</source>
        <translation> Conf({confidence:.2f})</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1628"/>
        <source>Recording started: {path}</source>
        <translation>Registrazione avviata: {path}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1635"/>
        <source>Recording stopped</source>
        <translation>Registrazione interrotta</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1649"/>
        <source>Status: Recording to {path}</source>
        <translation>Stato: Registrazione su {path}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1667"/>
        <source>✗ Error: {error}</source>
        <translation>✗ Errore: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1731"/>
        <source>Live Stream</source>
        <translation>Stream Live</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamViewerWindow.py" line="1735"/>
        <source>Cannot seek in live stream.

Detection was first seen at frame {frame}.</source>
        <translation>Impossibile spostarsi nello stream live.

Il rilevamento è stato visto per la prima volta al fotogramma {frame}.</translation>
    </message>
</context>
<context>
    <name>StreamingGuide</name>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="14"/>
        <source>Streaming Setup Guide</source>
        <translation>Guida Configurazione Streaming</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="51"/>
        <source>Connect to Your Stream</source>
        <translation>Connettiti al tuo stream</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="115"/>
        <source>Pre-recorded video file with playback controls</source>
        <translation>File video preregistrato con controlli di riproduzione</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="122"/>
        <source>File</source>
        <translation>File</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="161"/>
        <source>Live HDMI capture device (enter device index)</source>
        <translation>Dispositivo di acquisizione HDMI live (inserisci indice dispositivo)</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="168"/>
        <source>HDMI</source>
        <translation>HDMI</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="204"/>
        <source>Network stream via RTMP URL</source>
        <translation>Stream di rete tramite URL RTMP</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="211"/>
        <source>RTMP</source>
        <translation>RTMP</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="254"/>
        <source>File: Use local video files (MP4, MOV, etc.) with timeline controls.</source>
        <translation>File: usa file video locali (MP4, MOV, ecc.) con controlli timeline.</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="269"/>
        <source>HDMI: Connect to a live HDMI capture device.</source>
        <translation>HDMI: connettiti a un dispositivo di acquisizione HDMI live.</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="284"/>
        <source>RTMP: Connect to a live network stream (rtmp://server:port/app/key).</source>
        <translation>RTMP: connettiti a uno stream di rete live (rtmp://server:port/app/key).</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="328"/>
        <source>Connection Details</source>
        <translation>Dettagli Connessione</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="347"/>
        <source>Provide the path or URL for your selected stream type. You can optionally auto-connect when the guide is finished.</source>
        <translation>Fornisci il percorso o l&apos;URL per il tipo di stream selezionato. Puoi opzionalmente connetterti automaticamente quando la guida è finita.</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="364"/>
        <source>Stream URL/Path:</source>
        <translation>URL/Percorso Stream:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="373"/>
        <source>Click Browse to select a file or enter a URL...</source>
        <translation>Clicca Sfoglia per selezionare un file o inserire un URL...</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="385"/>
        <source>Browse...</source>
        <translation>Sfoglia...</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="399"/>
        <source>Auto Connect:</source>
        <translation>Connessione Automatica:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="411"/>
        <source>Connect as soon as the guide finishes</source>
        <translation>Connetti non appena la guida termina</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="423"/>
        <source>Capture Devices:</source>
        <translation>Dispositivi di Acquisizione:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="444"/>
        <source>Scan...</source>
        <translation>Scansiona...</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="484"/>
        <source>Processing Resolution:</source>
        <translation>Risoluzione Elaborazione:</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="532"/>
        <source>Image Capture Information</source>
        <translation>Informazioni Acquisizione Immagini</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="554"/>
        <source>What drone/camera was used to capture images?</source>
        <translation>Quale drone/telecamera è stata utilizzata per acquisire le immagini?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="584"/>
        <source>At what above ground level (AGL) altitude was the drone flying?</source>
        <translation>A quale altitudine dal livello del suolo (AGL) volava il drone?</translation>
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
        <translation>Distanza di campionamento al suolo (GSD) stimata:</translation>
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
        <translation>Dimensione target di ricerca</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="774"/>
        <source>Approximately how large are the objects you&apos;re wanting to identify?</source>
        <translation>Quanto sono approssimativamente grandi gli oggetti che vuoi identificare?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="805"/>
        <source>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;More Examples:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 sqft – Hat, Helmet, Plastic Bag &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 sqft – Cat, Daypack &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 sqft – Large Pack, Medium Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 sqft – Sleeping Bag, Large Dog &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 sqft – Small Boat, 2-Person Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 sqft – Car/SUV, Small Pickup Truck, Large Tent &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 sqft – House &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</source>
        <translation>&lt;html&gt;&lt;head/&gt;&lt;body&gt;&lt;p&gt;&lt;span style=&quot; font-weight:700;&quot;&gt;Altri esempi:&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1 ft² – Cappello, Casco, Sacchetto di plastica &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;3 ft² – Gatto, Zaino da giorno &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;6 ft² – Zaino grande, Cane medio &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;12 ft² – Sacco a pelo, Cane grande &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;50 ft² – Barca piccola, Tenda da 2 persone &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;200 ft² – Auto/SUV, Pickup piccolo, Tenda grande &lt;/li&gt;&lt;li&gt;&amp;nbsp;&amp;nbsp;1000 ft² – Casa &lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="847"/>
        <source>Detection &amp; Processing</source>
        <translation>Rilevamento e Elaborazione</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="869"/>
        <source>Are you looking for specific colors?</source>
        <translation>Stai cercando colori specifici?</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="914"/>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="945"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1018"/>
        <source>Reset</source>
        <translation>Reimposta</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1091"/>
        <source>Algorithm Parameters</source>
        <translation>Parametri Algoritmo</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1126"/>
        <source>Close</source>
        <translation>Chiudi</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1138"/>
        <source>Skip this streaming guide next time</source>
        <translation>Salta questa guida streaming la prossima volta</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1166"/>
        <source>Back</source>
        <translation>Indietro</translation>
    </message>
    <message>
        <location filename="../resources/views/streaming/StreamingGuide.ui" line="1178"/>
        <location filename="../app/core/controllers/streaming/StreamingGuide.py" line="138"/>
        <source>Continue</source>
        <translation>Continua</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamingGuide.py" line="84"/>
        <source>ADIAT Streaming Setup Guide</source>
        <translation>Guida Configurazione Streaming ADIAT</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/streaming/StreamingGuide.py" line="136"/>
        <source>Open Stream Viewer</source>
        <translation>Apri Visualizzatore Stream</translation>
    </message>
</context>
<context>
    <name>TargetSizePage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="79"/>
        <source>Hat, Helmet, Plastic Bag</source>
        <translation>Cappello, Casco, Sacchetto di plastica</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="80"/>
        <source>Cat, Daypack</source>
        <translation>Gatto, Zaino da giorno</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="81"/>
        <source>Large Pack, Medium Dog</source>
        <translation>Zaino grande, Cane medio</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="82"/>
        <source>Sleeping Bag, Large Dog</source>
        <translation>Sacco a pelo, Cane grande</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="83"/>
        <source>Small Boat, 2-Person Tent</source>
        <translation>Barca piccola, Tenda da 2 persone</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="84"/>
        <source>Car/SUV, Small Pickup Truck, Large Tent</source>
        <translation>Auto/SUV, Pickup piccolo, Tenda grande</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="85"/>
        <source>House</source>
        <translation>Casa</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="90"/>
        <source>More Examples:</source>
        <translation>Altri esempi:</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="104"/>
        <source>sqm</source>
        <translation>sqm</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/TargetSizePage.py" line="108"/>
        <source>sqft</source>
        <translation>sqft</translation>
    </message>
</context>
<context>
    <name>ThermalAnomaly</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="29"/>
        <source>Type of thermal anomaly to detect in thermal imagery.
Determines whether to find hot spots, cold spots, or both.</source>
        <translation>Tipo di anomalia termica da rilevare nelle immagini termiche.
Determina se trovare punti caldi, punti freddi o entrambi.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="33"/>
        <source>Anomaly Type:</source>
        <translation>Tipo di Anomalia:</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="45"/>
        <source>Select the type of thermal anomaly to detect:
• Above or Below Mean: Detects both hot and cold anomalies (default)
• Above Mean: Only detects hot spots (temperatures above average)
• Below Mean: Only detects cold spots (temperatures below average)
The algorithm compares each pixel&apos;s temperature to the mean temperature of its segment.
Use &quot;Above Mean&quot; for finding heat sources, &quot;Below Mean&quot; for cold objects.</source>
        <translation>Seleziona il tipo di anomalia termica da rilevare:
• Sopra o Sotto la Media: rileva sia anomalie calde che fredde (predefinito)
• Sopra la Media: rileva solo punti caldi (temperature sopra la media)
• Sotto la Media: rileva solo punti freddi (temperature sotto la media)
L&apos;algoritmo confronta la temperatura di ogni pixel con la temperatura media del suo segmento.
Usa &quot;Sopra la Media&quot; per trovare fonti di calore, &quot;Sotto la Media&quot; per oggetti freddi.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="54"/>
        <source>Above or Below Mean</source>
        <translation>Sopra o Sotto la Media</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="59"/>
        <source>Above Mean</source>
        <translation>Sopra la Media</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="64"/>
        <source>Below Mean</source>
        <translation>Sotto la Media</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="77"/>
        <source>Temperature threshold for detecting thermal anomalies.
Measured in standard deviations from the mean temperature.</source>
        <translation>Soglia di temperatura per rilevare anomalie termiche.
Misurata in deviazioni standard dalla temperatura media.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="81"/>
        <source>Anomaly Threshold:</source>
        <translation>Soglia Anomalia:</translation>
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
        <translation>Imposta la soglia di rilevamento delle anomalie in deviazioni standard.
• Intervallo: da 0 a 7 deviazioni standard
• Predefinito: 4
Definisce quanto una temperatura deve differire dalla media per essere rilevata:
• Valori più bassi (1-2): molto sensibile, rileva sottili differenze di temperatura (più rilevamenti)
• Valori medi (3-5): rilevamento bilanciato (consigliato per la maggior parte dei casi)
• Valori più alti (6-7): rileva solo differenze di temperatura estreme (meno rilevamenti)
Esempio: valore 4 rileva pixel 4 deviazioni standard sopra/sotto la temperatura media.</translation>
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
        <translation>Numero di segmenti in cui dividere ogni immagine termica per l&apos;analisi.
Ogni segmento viene analizzato indipendentemente per anomalie termiche locali.
Impatto sulle prestazioni:
• Numero di segmenti più alto: AUMENTA il tempo di elaborazione (più segmenti da analizzare)
• Numero di segmenti più basso: DIMINUISCE il tempo di elaborazione (meno segmenti da analizzare)
• 1 segmento: elaborazione più veloce (analizza l&apos;immagine intera una sola volta)
Un numero più alto di segmenti migliora il rilevamento in scene con gradienti di temperatura.</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomaly.ui" line="122"/>
        <source>Image Segments:</source>
        <translation>Segmenti Immagine:</translation>
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
        <translation>Seleziona il numero di segmenti in cui dividere ogni immagine termica.
• Opzioni: 1, 2, 4, 6, 9, 16, 25, 36 segmenti
• Predefinito: 1 (analizza l&apos;immagine intera come un singolo segmento)
L&apos;algoritmo calcola la temperatura media per ogni segmento in modo indipendente:
• 1 segmento: analisi della temperatura globale (ideale per scene uniformi)
• Più segmenti: analisi della temperatura locale (meglio per sfondi variabili)
Un numero più alto di segmenti migliora il rilevamento in scene con gradienti di temperatura.
Consigliato: 4-9 segmenti per immagini termiche tipiche da drone.</translation>
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
        <translation>Le tue immagini contengono scene complesse con edifici, veicoli o coperture del terreno artificiali miste?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="57"/>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="72"/>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="105"/>
        <source>What type of anomalies are you looking for?</source>
        <translation>Che tipo di anomalie stai cercando?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="122"/>
        <source>Warmer than surroundings</source>
        <translation>Più caldo dell&apos;ambiente circostante</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="134"/>
        <source>Cooler than surroundings</source>
        <translation>Più freddo dell&apos;ambiente circostante</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="146"/>
        <source>Both</source>
        <translation>Entrambi</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="185"/>
        <source>How aggressively should ADIAT be searching for anomalies?</source>
        <translation>Quanto aggressivamente dovrebbe ADIAT cercare le anomalie?</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalAnomalyWizard.ui" line="198"/>
        <source>Note: A higher setting will find more potential anomalies but may also increase false positives.</source>
        <translation>Nota: un&apos;impostazione più alta troverà più potenziali anomalie ma potrebbe anche aumentare i falsi positivi.</translation>
    </message>
</context>
<context>
    <name>ThermalRange</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="14"/>
        <source>Form</source>
        <translation>Modulo</translation>
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
        <translation>Soglia di temperatura minima per il rilevamento nelle immagini termiche.
• Intervallo: da -30°C a 50°C
• Predefinito: 35°C
Definisce il limite inferiore dell&apos;intervallo di rilevamento della temperatura:
• Valori più bassi: AUMENTANO i rilevamenti - accetta oggetti più freddi
• Valori più alti: DIMINUISCONO i rilevamenti - rileva solo oggetti più caldi
Combinata con Temperatura Massima per creare un intervallo di rilevamento (es. 35-40°C per la temperatura corporea umana).</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="38"/>
        <source>Minimum Temp (°C)</source>
        <translation>Temperatura Minima (°C)</translation>
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
        <translation>Imposta la temperatura minima per il rilevamento in Celsius.
• Intervallo: da -30°C a 50°C
• Predefinito: 35°C
I pixel con temperature uguali o superiori a questa soglia verranno rilevati.
• Valori più bassi: rilevano oggetti più freddi (più rilevamenti)
• Valori più alti: rilevano solo oggetti più caldi (meno rilevamenti)
Nota: la temperatura è visualizzata in Celsius, convertita in base alle Preferenze.
Usa per trovare oggetti entro un intervallo di temperatura specifico (es. persone 35-40°C).</translation>
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
        <translation>Soglia di temperatura massima per il rilevamento nelle immagini termiche.
• Intervallo: da -30°C a 93°C
• Predefinito: 40°C
Definisce il limite superiore dell&apos;intervallo di rilevamento della temperatura:
• Valori più bassi: DIMINUISCONO i rilevamenti - rileva solo oggetti più freddi
• Valori più alti: AUMENTANO i rilevamenti - accetta oggetti più caldi
Combinata con Temperatura Minima per creare un intervallo di rilevamento (es. 35-40°C per la temperatura corporea umana).</translation>
    </message>
    <message>
        <location filename="../resources/views/algorithms/ThermalRange.ui" line="103"/>
        <source>Maximum Temp (°C)</source>
        <translation>Temperatura Massima (°C)</translation>
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
        <translation>Imposta la temperatura massima per il rilevamento in Celsius.
• Intervallo: da -30°C a 93°C
• Predefinito: 40°C
I pixel con temperature uguali o inferiori a questa soglia verranno rilevati.
• Valori più bassi: rilevano solo oggetti più freddi (meno rilevamenti)
• Valori più alti: rilevano oggetti più caldi (più rilevamenti)
Nota: la temperatura è visualizzata in Celsius, convertita in base alle Preferenze.
Il rilevamento avviene per i pixel compresi tra la temperatura minima e massima (inclusi).</translation>
    </message>
</context>
<context>
    <name>ThermalRangeController</name>
    <message>
        <location filename="../app/algorithms/images/ThermalRange/controllers/ThermalRangeController.py" line="108"/>
        <source>Minimum Temp ({degree} F)</source>
        <translation>Temperatura Minima ({degree} F)</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalRange/controllers/ThermalRangeController.py" line="114"/>
        <source>Maximum Temp ({degree} F)</source>
        <translation>Temperatura Massima ({degree} F)</translation>
    </message>
</context>
<context>
    <name>ThermalRangeWizard</name>
    <message>
        <location filename="../resources/views/algorithms/ThermalRangeWizard.ui" line="34"/>
        <source>What range of temperatures should ADIAT look for?</source>
        <translation>Quale intervallo di temperature dovrebbe cercare ADIAT?</translation>
    </message>
</context>
<context>
    <name>TrackGalleryWidget</name>
    <message>
        <location filename="../app/core/views/streaming/components/TrackGalleryWidget.py" line="144"/>
        <source>1 detection</source>
        <translation>1 rilevamento</translation>
    </message>
    <message>
        <location filename="../app/core/views/streaming/components/TrackGalleryWidget.py" line="146"/>
        <source>{count} detections</source>
        <translation>{count} rilevamenti</translation>
    </message>
</context>
<context>
    <name>UnifiedMapExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="382"/>
        <source>No Data Selected</source>
        <translation>Nessun Dato Selezionato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="384"/>
        <source>Please select at least one type of data to export.</source>
        <translation>Seleziona almeno un tipo di dato da esportare.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="408"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="509"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="543"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="577"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="622"/>
        <source>Export Error</source>
        <translation>Errore di Esportazione</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="409"/>
        <source>An error occurred during export:
{error}</source>
        <translation>Si è verificato un errore durante l&apos;esportazione:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="426"/>
        <source>Save Map Export</source>
        <translation>Salva Esportazione Mappa</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="429"/>
        <source>KML files (*.kml)</source>
        <translation>File KML (*.kml)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="510"/>
        <source>Failed to export to KML:
{error}</source>
        <translation>Impossibile esportare in KML:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="544"/>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="578"/>
        <source>Failed to export to CalTopo:
{error}</source>
        <translation>Impossibile esportare su CalTopo:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="594"/>
        <source>Map export completed successfully!</source>
        <translation>Esportazione mappa completata con successo!</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="609"/>
        <source>Map export cancelled</source>
        <translation>Esportazione mappa annullata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/UnifiedMapExportController.py" line="623"/>
        <source>Map export failed:
{error}</source>
        <translation>Esportazione mappa non riuscita:
{error}</translation>
    </message>
</context>
<context>
    <name>UpscaleDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="187"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="359"/>
        <source>Upscaled View - {level}x</source>
        <translation>Vista Upscalata - {level}x</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="229"/>
        <source>Upscale Method:</source>
        <translation>Metodo di Upscale:</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="264"/>
        <source>Upres Again</source>
        <translation>Aumenta Risoluzione di Nuovo</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="267"/>
        <source>Upscale the currently visible portion by {factor}x</source>
        <translation>Effettua l&apos;upscale della porzione visibile corrente di {factor}x</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="271"/>
        <source>Quit</source>
        <translation>Esci</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="274"/>
        <source>Close this upscale window</source>
        <translation>Chiudi questa finestra di upscale</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="367"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="379"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="459"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="524"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="556"/>
        <source>Upscale Error</source>
        <translation>Errore di Upscale</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="368"/>
        <source>Error during initial upscale: {error}</source>
        <translation>Errore durante l&apos;upscale iniziale: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="381"/>
        <source>Unable to extract visible image portion.</source>
        <translation>Impossibile estrarre la porzione visibile dell&apos;immagine.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="389"/>
        <source>Maximum Upscale Reached</source>
        <translation>Upscale Massimo Raggiunto</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="393"/>
        <source>Maximum upscale level of {level}x has been reached.
Further upscaling is not allowed to prevent memory issues.</source>
        <translation>È stato raggiunto il livello massimo di upscale di {level}x.
Ulteriori upscaling non sono consentiti per prevenire problemi di memoria.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="405"/>
        <source>Image Too Large</source>
        <translation>Immagine Troppo Grande</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="410"/>
        <source>Upscaling would result in an image of {width}×{height} pixels.
Maximum allowed dimension is {max_dim} pixels.

Try zooming in to a smaller area before upscaling.</source>
        <translation>L&apos;upscale produrrebbe un&apos;immagine di {width}×{height} pixel.
La dimensione massima consentita è {max_dim} pixel.

Prova a ingrandire una zona più piccola prima di effettuare l&apos;upscale.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="418"/>
        <source>Image Too Small</source>
        <translation>Immagine Troppo Piccola</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="422"/>
        <source>Visible portion is too small ({width}×{height} pixels).
Please zoom in to a larger area before upscaling.</source>
        <translation>La porzione visibile è troppo piccola ({width}×{height} pixel).
Per favore ingrandisci un&apos;area più grande prima di effettuare l&apos;upscale.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="460"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="557"/>
        <source>An error occurred during upscaling:
{error}</source>
        <translation>Si è verificato un errore durante l&apos;upscale:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="482"/>
        <source>Upscaling image with AI enhancement...
From {width}×{height} to {new_width}×{new_height} pixels
This may take a few seconds.</source>
        <translation>Upscale dell&apos;immagine con miglioramento AI...
Da {width}×{height} a {new_width}×{new_height} pixel
Potrebbe richiedere alcuni secondi.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="491"/>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="752"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="496"/>
        <source>Upscaling (OpenCV EDSR)</source>
        <translation>Upscale (OpenCV EDSR)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="525"/>
        <source>Failed to start upscaling:
{error}</source>
        <translation>Impossibile avviare l&apos;upscale:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="595"/>
        <source>Method Not Available</source>
        <translation>Metodo Non Disponibile</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="599"/>
        <source>Real-ESRGAN is not yet implemented.
Falling back to Lanczos interpolation.</source>
        <translation>Real-ESRGAN non è ancora implementato.
Si torna all&apos;interpolazione Lanczos.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/UpscaleDialog.py" line="751"/>
        <source>Downloading {model_name} model...</source>
        <translation>Download del modello {model_name}...</translation>
    </message>
</context>
<context>
    <name>VideoDisplayWidget</name>
    <message>
        <location filename="../app/core/controllers/streaming/shared_widgets.py" line="652"/>
        <source>No Stream Connected</source>
        <translation>Nessuno Stream Connesso</translation>
    </message>
</context>
<context>
    <name>VideoParser</name>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="14"/>
        <source>Video Parser</source>
        <translation>Parser Video</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="45"/>
        <source>Path to the video file to extract frames from.
Supported formats: MP4, AVI, MOV, MKV, and other common video formats.
Click the Select button to browse for a video file.</source>
        <translation>Percorso del file video da cui estrarre i fotogrammi.
Formati supportati: MP4, AVI, MOV, MKV e altri formati video comuni.
Clicca il pulsante Seleziona per cercare un file video.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="62"/>
        <source>SRT subtitle file containing GPS telemetry and timestamp data.
Optional: Provides location information for extracted frames.
Without SRT file, frames will have no GPS metadata.</source>
        <translation>File sottotitoli SRT contenente telemetria GPS e dati temporali.
Opzionale: fornisce informazioni di posizione per i fotogrammi estratti.
Senza file SRT, i fotogrammi non avranno metadati GPS.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="67"/>
        <source>The SRT file contains timestamped information about the video file.  It is optional, but without it output images won&apos;t include location information.</source>
        <translation>Il file SRT contiene informazioni temporali sul file video. È opzionale, ma senza di esso le immagini di output non includeranno informazioni sulla posizione.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="70"/>
        <source>SRT File (optional): </source>
        <translation>File SRT (opzionale): </translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="82"/>
        <source>Destination folder where extracted frame images will be saved.
Each frame is saved as a separate image file with timestamp information.</source>
        <translation>Cartella di destinazione dove verranno salvate le immagini dei fotogrammi estratti.
Ogni fotogramma viene salvato come file immagine separato con informazioni di timestamp.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="86"/>
        <source>Output Folder:</source>
        <translation>Cartella Output:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="98"/>
        <source>Path to the output folder for extracted frame images.
All frames will be saved in this directory with sequential naming.
Click the Select button to choose a different folder.</source>
        <translation>Percorso della cartella di output per le immagini dei fotogrammi estratti.
Tutti i fotogrammi saranno salvati in questa directory con nomi sequenziali.
Clicca il pulsante Seleziona per scegliere una cartella diversa.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="115"/>
        <source>Browse for output folder to save extracted frames.
Opens a folder selection dialog.</source>
        <translation>Sfoglia la cartella di output per salvare i fotogrammi estratti.
Apre una finestra di selezione cartella.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="119"/>
        <location filename="../resources/views/images/VideoParser.ui" line="161"/>
        <location filename="../resources/views/images/VideoParser.ui" line="199"/>
        <source>Select</source>
        <translation>Seleziona</translation>
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
        <translation>Seleziona il file video sorgente da analizzare.
Il video verrà diviso in singole immagini di fotogrammi.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="145"/>
        <source>Video File:</source>
        <translation>File Video:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="157"/>
        <source>Browse for video file to extract frames from.
Opens a file selection dialog for video files (MP4, AVI, MOV, etc.).</source>
        <translation>Sfoglia un file video da cui estrarre i fotogrammi.
Apre una finestra di selezione file per video (MP4, AVI, MOV, ecc.).</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="176"/>
        <source>Path to the optional SRT subtitle file with GPS telemetry data.
SRT files contain timestamp and location information for video frames.
If provided, extracted frames will include GPS metadata (latitude, longitude, altitude).
Can be left empty if location data is not needed.</source>
        <translation>Percorso del file sottotitoli SRT opzionale con dati di telemetria GPS.
I file SRT contengono informazioni di timestamp e posizione per i fotogrammi video.
Se fornito, i fotogrammi estratti includeranno metadati GPS (latitudine, longitudine, altitudine).
Può essere lasciato vuoto se i dati di posizione non sono necessari.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="194"/>
        <source>Browse for optional SRT subtitle file containing GPS telemetry.
SRT files are commonly created by DJI drones and other video recording devices.
Opens a file selection dialog for SRT files.</source>
        <translation>Sfoglia un file sottotitoli SRT opzionale contenente telemetria GPS.
I file SRT sono comunemente creati dai droni DJI e da altri dispositivi di registrazione video.
Apre una finestra di selezione file per file SRT.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="218"/>
        <source>Time interval between extracted frames.
Determines how frequently frames are captured from the video.
Smaller intervals = More frames extracted (larger output)</source>
        <translation>Intervallo di tempo tra i fotogrammi estratti.
Determina la frequenza con cui i fotogrammi vengono catturati dal video.
Intervalli più piccoli = più fotogrammi estratti (output più grande)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="223"/>
        <source>Time Interval (seconds):</source>
        <translation>Intervallo di Tempo (secondi):</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="235"/>
        <source>Set the time interval in seconds between frame extractions.
• Range: 0.1 to unlimited seconds
• Default: 5.0 seconds (extracts 1 frame every 5 seconds)
• Lower values: More frames extracted (e.g., 0.5s = 2 frames per second)
• Higher values: Fewer frames extracted (e.g., 10s = 1 frame every 10 seconds)
Recommendation: 3-5 seconds for most drone footage analysis</source>
        <translation>Imposta l&apos;intervallo di tempo in secondi tra le estrazioni dei fotogrammi.
• Intervallo: da 0.1 a illimitati secondi
• Predefinito: 5.0 secondi (estrae 1 fotogramma ogni 5 secondi)
• Valori più bassi: più fotogrammi estratti (es. 0.5s = 2 fotogrammi al secondo)
• Valori più alti: meno fotogrammi estratti (es. 10s = 1 fotogramma ogni 10 secondi)
Consigliato: 3-5 secondi per la maggior parte delle analisi di filmati da drone</translation>
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
        <translation>Avvia l&apos;estrazione dei fotogrammi dal file video.
Requisiti:
• Il file video deve essere selezionato
• La cartella di output deve essere selezionata
• L&apos;intervallo di tempo deve essere impostato (predefinito: 5 secondi)
Il processo estrarrà i fotogrammi all&apos;intervallo specificato e li salverà come immagini.
Se viene fornito il file SRT, i metadati GPS verranno incorporati nei fotogrammi estratti.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="319"/>
        <source>Start</source>
        <translation>Avvia</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="350"/>
        <source>Cancel the frame extraction process.
Stops the operation immediately and returns to the ready state.
Any frames already extracted will be saved in the output folder.
Click to abort the current parsing operation.</source>
        <translation>Annulla il processo di estrazione dei fotogrammi.
Interrompe l&apos;operazione immediatamente e torna allo stato pronto.
I fotogrammi già estratti verranno salvati nella cartella di output.
Clicca per interrompere l&apos;operazione di parsing corrente.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/VideoParser.ui" line="359"/>
        <source> Cancel</source>
        <translation> Annulla</translation>
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
        <translation>Finestra di output di avanzamento e stato.
Mostra informazioni in tempo reale durante l&apos;estrazione dei fotogrammi:
• Fotogramma corrente in elaborazione
• Timestamp e numeri dei fotogrammi
• Coordinate GPS (se il file SRT è fornito)
• Percentuale di avanzamento e stato di completamento
• Eventuali errori o avvisi riscontrati
Mostra il totale dei fotogrammi estratti al termine.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="58"/>
        <source>Select a Video File</source>
        <translation>Seleziona un File Video</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="72"/>
        <source>Select a SRT file</source>
        <translation>Seleziona un file SRT</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="74"/>
        <source>SRT (*.srt)</source>
        <translation>SRT (*.srt)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="90"/>
        <source>Select Directory</source>
        <translation>Seleziona Cartella</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="111"/>
        <source>Please set the video file and output directory.</source>
        <translation>Imposta il file video e la cartella di output.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="115"/>
        <source>--- Starting video processing ---</source>
        <translation>--- Avvio elaborazione video ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="164"/>
        <source>Confirmation</source>
        <translation>Conferma</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="165"/>
        <source>Are you sure you want to cancel the video processing in progress?</source>
        <translation>Sei sicuro di voler annullare l&apos;elaborazione video in corso?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="201"/>
        <source>--- Video Processing Completed ---</source>
        <translation>--- Elaborazione video completata ---</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="203"/>
        <source>{count} images created</source>
        <translation>{count} immagini create</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/VideoParser.py" line="256"/>
        <source>Error Starting Processing</source>
        <translation>Errore Avvio Elaborazione</translation>
    </message>
</context>
<context>
    <name>Viewer</name>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="14"/>
        <source>Automated Drone Image Analysis Tool :: Viewer - Sponsored by TEXSAR</source>
        <translation>Strumento Automatico di Analisi Immagini Drone :: Visualizzatore - Sponsorizzato da TEXSAR</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="112"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="133"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="886"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="1057"/>
        <source>TextLabel</source>
        <translation>TextLabel</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="161"/>
        <source>View keyboard shortcuts and help</source>
        <translation>Visualizza scorciatoie da tastiera e aiuto</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="199"/>
        <source>Toggle the detection overlay on the image.
When enabled, shows processed image with detected objects highlighted.
When disabled, shows the original unprocessed image.
Use to compare original image with detection results.</source>
        <translation>Attiva/disattiva l&apos;overlay di rilevamento sull&apos;immagine.
Quando abilitato, mostra l&apos;immagine elaborata con gli oggetti rilevati evidenziati.
Quando disabilitato, mostra l&apos;immagine originale non elaborata.
Usa per confrontare l&apos;immagine originale con i risultati del rilevamento.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="205"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="350"/>
        <source>Show Overlay</source>
        <translation>Mostra Overlay</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="225"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="844"/>
        <source>Toggle Gallery Mode (G)
Shows all AOIs from all images in a grid view</source>
        <translation>Attiva/disattiva modalità Galleria (G)
Mostra tutte le AOI di tutte le immagini in una vista a griglia</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="255"/>
        <source>Highlight Pixels of Interest(H)</source>
        <translation>Evidenzia Pixel di Interesse (H)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="277"/>
        <source>Show AOIs</source>
        <translation>Mostra AOI</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="306"/>
        <source>Map with Image Locations (M)</source>
        <translation>Mappa con Posizioni Immagini (M)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="322"/>
        <source>North-Oriented View of Image (R)</source>
        <translation>Vista dell&apos;immagine orientata a Nord (R)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="338"/>
        <source>Adjust Image (Ctrl+H)</source>
        <translation>Regola Immagine (Ctrl+H)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="341"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="369"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="406"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="450"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="487"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="529"/>
        <source>...</source>
        <translation>...</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="354"/>
        <source>adjustments.png</source>
        <translation>adjustments.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="366"/>
        <source>Measure Distance (Ctrl+M)</source>
        <translation>Misura Distanza (Ctrl+M)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="382"/>
        <source>ruler.png</source>
        <translation>ruler.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="389"/>
        <source>Toggle Magnifying Glass (Middle Mouse)</source>
        <translation>Attiva/disattiva lente di ingrandimento (tasto centrale)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="419"/>
        <source>magnify.png</source>
        <translation>magnify.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="433"/>
        <source>Map Export (KML / CalTopo)</source>
        <translation>Esportazione Mappa (KML / CalTopo)</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="463"/>
        <source>map.png</source>
        <translation>map.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="470"/>
        <source>Generate PDF Report</source>
        <translation>Genera Report PDF</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="500"/>
        <source>pdf.png</source>
        <translation>pdf.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="512"/>
        <source>Generate Zip Bundle</source>
        <translation>Genera Pacchetto Zip</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="542"/>
        <source>zip.png</source>
        <translation>zip.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="567"/>
        <source>Skip hidden images when navigating.
When enabled, Previous/Next buttons will skip over images marked as hidden.
Use to focus on images that haven&apos;t been reviewed or marked for exclusion.
Keyboard shortcut: H to hide/unhide current image</source>
        <translation>Salta le immagini nascoste durante la navigazione.
Quando abilitato, i pulsanti Precedente/Successivo saltano le immagini contrassegnate come nascoste.
Usa per concentrarti su immagini non ancora revisionate o contrassegnate per l&apos;esclusione.
Scorciatoia da tastiera: H per nascondere/mostrare l&apos;immagine corrente</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="573"/>
        <source>Skip Hidden</source>
        <translation>Salta Nascoste</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="612"/>
        <source>Mark current image as hidden.
Hidden images can be excluded from reports, exports, and navigation.
Use to remove images with false positives or no relevant detections.
When &quot;Skip Hidden&quot; is enabled, hidden images are skipped during navigation.
Keyboard shortcut: H</source>
        <translation>Contrassegna l&apos;immagine corrente come nascosta.
Le immagini nascoste possono essere escluse da report, esportazioni e navigazione.
Usa per rimuovere immagini con falsi positivi o senza rilevamenti rilevanti.
Quando &quot;Salta Nascoste&quot; è abilitato, le immagini nascoste vengono saltate durante la navigazione.
Scorciatoia da tastiera: H</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="619"/>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="639"/>
        <source>Hide Image</source>
        <translation>Nascondi Immagine</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="631"/>
        <source>Displays the name of the currently hidden image.
When an image is marked as hidden, its filename appears here.
Hidden images are excluded from navigation when &quot;Skip Hidden&quot; is enabled.</source>
        <translation>Visualizza il nome dell&apos;immagine attualmente nascosta.
Quando un&apos;immagine è contrassegnata come nascosta, il suo nome file appare qui.
Le immagini nascoste sono escluse dalla navigazione quando &quot;Salta Nascoste&quot; è abilitato.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="667"/>
        <source>Jump directly to a specific image number.
Enter an image number and press Enter to navigate instantly.
Useful for reviewing specific images or returning to a noted location.</source>
        <translation>Salta direttamente a un numero immagine specifico.
Inserisci un numero immagine e premi Invio per navigare istantaneamente.
Utile per rivedere immagini specifiche o tornare a una posizione annotata.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="672"/>
        <source>Jump To:</source>
        <translation>Vai a:</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="697"/>
        <source>Enter an image number (1 to total) and press Enter.
Quickly navigate to any image in the analysis results.
Example: Type &quot;25&quot; and press Enter to jump to image #25</source>
        <translation>Inserisci un numero immagine (da 1 al totale) e premi Invio.
Naviga rapidamente a qualsiasi immagine nei risultati dell&apos;analisi.
Esempio: digita &quot;25&quot; e premi Invio per andare all&apos;immagine n. 25</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="711"/>
        <source>Previous Image</source>
        <translation>Immagine Precedente</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="718"/>
        <source>previous.png</source>
        <translation>previous.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="733"/>
        <source>Next Image</source>
        <translation>Immagine Successiva</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="740"/>
        <source>next.png</source>
        <translation>next.png</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="896"/>
        <source>Filter AOIs by color and pixel area</source>
        <translation>Filtra AOI per colore e area in pixel</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="968"/>
        <source>Sort By</source>
        <translation>Ordina per</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="980"/>
        <source>Sort Areas of Interest (AOIs) in the list.
Choose how to order the detected objects:
• Pixel Area: Sort by size (largest to smallest)
• Distance: Sort by distance from image center or reference point
• Color: Group by similar colors
• Detection Order: Original order from analysis
Sorting helps prioritize review of larger or closer objects.</source>
        <translation>Ordina le Aree di Interesse (AOI) nell&apos;elenco.
Scegli come ordinare gli oggetti rilevati:
• Area in pixel: ordina per dimensione (dal più grande al più piccolo)
• Distanza: ordina per distanza dal centro dell&apos;immagine o punto di riferimento
• Colore: raggruppa per colori simili
• Ordine di rilevamento: ordine originale dall&apos;analisi
L&apos;ordinamento aiuta a dare priorità alla revisione di oggetti più grandi o più vicini.</translation>
    </message>
    <message>
        <location filename="../resources/views/images/viewer/Viewer.ui" line="1068"/>
        <source>Open</source>
        <translation>Apri</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="114"/>
        <source>Automated Drone Image Analysis Tool v{version} - Sponsored by TEXSAR</source>
        <translation>Strumento Automatico di Analisi Immagini Drone v{version} - Sponsorizzato da TEXSAR</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="133"/>
        <source>Load Results Failed</source>
        <translation>Caricamento Risultati Non Riuscito</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="138"/>
        <source>Cannot load results without valid image and mask locations.

The viewer will now close.</source>
        <translation>Impossibile caricare i risultati senza posizioni valide di immagini e maschere.

Il visualizzatore verrà chiuso.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="151"/>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1030"/>
        <source>Skip Hidden ({count}) </source>
        <translation>Salta Nascoste ({count}) </translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="216"/>
        <source>Image metadata and information.
Click on GPS Coordinates to copy, share, or open in mapping applications.</source>
        <translation>Metadati e informazioni dell&apos;immagine.
Clicca su Coordinate GPS per copiare, condividere o aprire in applicazioni di mappatura.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="456"/>
        <source>No Dataset</source>
        <translation>Nessun Dataset</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="458"/>
        <source>No dataset is currently loaded.</source>
        <translation>Nessun dataset è attualmente caricato.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="464"/>
        <source>Generate Cache</source>
        <translation>Genera Cache</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="469"/>
        <source>This will regenerate thumbnail and color caches for all AOIs in this dataset.

This may take a few minutes depending on the dataset size.

Continue?</source>
        <translation>Questo rigenererà la cache delle miniature e dei colori per tutte le AOI in questo dataset.

Questo potrebbe richiedere alcuni minuti a seconda della dimensione del dataset.

Continuare?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="479"/>
        <source>Initializing cache generation...</source>
        <translation>Inizializzazione generazione cache...</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="480"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="485"/>
        <source>Generating Cache</source>
        <translation>Generazione Cache</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="522"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="523"/>
        <source>Failed to start cache generation:
{error}</source>
        <translation>Impossibile avviare la generazione della cache:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="541"/>
        <source>Cache Generated</source>
        <translation>Cache Generata</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="546"/>
        <source>Cache generation complete!

Processed {images} images with {aois} AOIs.

The viewer will now load thumbnails and colors much faster.</source>
        <translation>Generazione cache completata!

Elaborate {images} immagini con {aois} AOI.

Il visualizzatore ora caricherà miniature e colori molto più velocemente.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="574"/>
        <source>Cache Generation Error</source>
        <translation>Errore Generazione Cache</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="577"/>
        <source>An error occurred during cache generation:

{error}</source>
        <translation>Si è verificato un errore durante la generazione della cache:

{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="744"/>
        <source>AOI Not Visible</source>
        <translation>AOI Non Visibile</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="750"/>
        <source>The AOI at the cursor position cannot be selected because it is currently hidden due to active filters.

To select this AOI, please clear or adjust your filters.</source>
        <translation>L&apos;AOI alla posizione del cursore non può essere selezionata perché attualmente è nascosta a causa dei filtri attivi.

Per selezionare questa AOI, cancella o regola i tuoi filtri.</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="853"/>
        <source>Show Pixels of Interest (H or Ctrl+I)</source>
        <translation>Mostra Pixel di Interesse (H o Ctrl+I)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="860"/>
        <source>Toggle AOI Circles</source>
        <translation>Attiva/disattiva Cerchi AOI</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1202"/>
        <source>Missing Dependency</source>
        <translation>Dipendenza Mancante</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1207"/>
        <source>The qimage2ndarray module is required for the upscale feature.
Please install it using: pip install qimage2ndarray</source>
        <translation>Il modulo qimage2ndarray è richiesto per la funzione di upscale.
Installalo usando: pip install qimage2ndarray</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1213"/>
        <source>Upscale Error</source>
        <translation>Errore di Upscale</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1216"/>
        <source>An error occurred while opening the upscale dialog:
{error}</source>
        <translation>Si è verificato un errore durante l&apos;apertura della finestra di upscale:
{error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1456"/>
        <source>Unknown Reviewer</source>
        <translation>Revisore Sconosciuto</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/Viewer.py" line="1516"/>
        <source>Loading gallery...</source>
        <translation>Caricamento galleria...</translation>
    </message>
</context>
<context>
    <name>ZipExportController</name>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="133"/>
        <source>Save Zip File</source>
        <translation>Salva File Zip</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="136"/>
        <source>Zip files (*.zip)</source>
        <translation>File Zip (*.zip)</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="166"/>
        <source>No images to export</source>
        <translation>Nessuna immagine da esportare</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="401"/>
        <source>ZIP file created</source>
        <translation>File ZIP creato</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="407"/>
        <source>Failed to generate Zip file: {error}</source>
        <translation>Impossibile generare il file Zip: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/viewer/exports/ZipExportController.py" line="428"/>
        <source>Error</source>
        <translation>Errore</translation>
    </message>
</context>
<context>
    <name>ZipExportDialog</name>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="18"/>
        <source>ZIP Export Options</source>
        <translation>Opzioni Esportazione ZIP</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="30"/>
        <source>Choose what to export:

- Native: Original images, TIFF masks, and XML (paths made portable).
- Augmented: What you see in the viewer (AOIs/POIs), keeps EXIF/XMP.</source>
        <translation>Scegli cosa esportare:

- Nativo: immagini originali, maschere TIFF e XML (percorsi resi portabili).
- Aumentato: ciò che vedi nel visualizzatore (AOI/POI), mantiene EXIF/XMP.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="34"/>
        <source>Export Native data (original files + XML)</source>
        <translation>Esporta dati nativi (file originali + XML)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="35"/>
        <source>Export Augmented images (viewer overlays + metadata)</source>
        <translation>Esporta immagini aumentate (overlay visualizzatore + metadati)</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="50"/>
        <source>Include images without flagged AOIs</source>
        <translation>Includi immagini senza AOI contrassegnate</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="55"/>
        <source>When unchecked, only images with at least one flagged AOI will be exported.
When checked, all images will be exported regardless of flagged AOI status.</source>
        <translation>Quando deselezionato, verranno esportate solo le immagini con almeno una AOI contrassegnata.
Quando selezionato, verranno esportate tutte le immagini indipendentemente dallo stato delle AOI contrassegnate.</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="59"/>
        <source>OK</source>
        <translation>OK</translation>
    </message>
    <message>
        <location filename="../app/core/views/images/viewer/dialogs/ZipExportDialog.py" line="60"/>
        <source>Cancel</source>
        <translation>Annulla</translation>
    </message>
</context>
<context>
    <name>AlgorithmSelectionPage</name>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="90"/>
        <source>Are you using thermal images?</source>
        <translation>Stai usando immagini termiche?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="155"/>
        <source>Are you looking for anomalies within a specific temperature range?</source>
        <translation>Stai cercando anomalie entro un intervallo di temperatura specifico?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="158"/>
        <source>Do you specifically want to detect people?</source>
        <translation>Vuoi rilevare specificamente persone?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="175"/>
        <source>Are you trying to find a specific color?</source>
        <translation>Stai cercando un colore specifico?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="180"/>
        <source>Do you want to manually adjust the color range?</source>
        <translation>Vuoi regolare manualmente l&apos;intervallo di colore?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="189"/>
        <source>Do your images contain complex backgrounds or structures?</source>
        <translation>Le tue immagini contengono sfondi o strutture complesse?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="197"/>
        <source>Do your images include shadows or areas with uneven lighting?</source>
        <translation>Le tue immagini includono ombre o aree con illuminazione non uniforme?</translation>
    </message>
    <message>
        <location filename="../app/core/controllers/images/guidePages/AlgorithmSelectionPage.py" line="216"/>
        <source>Selected Algorithm: {algorithm}</source>
        <translation>Algoritmo selezionato: {algorithm}</translation>
    </message>
</context>
<context>
    <name>RangeSlider</name>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="21"/>
        <source>Small
Article
(1 sqft)</source>
        <translation>Piccolo
Oggetto
(1 sqft)</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="22"/>
        <source>Small
Dog
(3 sqft)</source>
        <translation>Cane
Piccolo
(3 sqft)</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="23"/>
        <source>Person
Standing
(6 sqft)</source>
        <translation>Persona
In piedi
(6 sqft)</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="24"/>
        <source>Person
Recumbent
(12 sqft)</source>
        <translation>Persona
Distesa
(12 sqft)</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="25"/>
        <source>ATV
(50 sqft)</source>
        <translation>ATV
(50 sqft)</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="26"/>
        <source>Car
(200 sqft)</source>
        <translation>Auto
(200 sqft)</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/RangeSlider.py" line="27"/>
        <source>Medium
Building
(1000 sqft)</source>
        <translation>Edificio
Medio
(1000 sqft)</translation>
    </message>
</context>
<context>
    <name>AIPersonDetectorWizardController</name>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="32"/>
        <source>Very 
Confident</source>
        <translation>Molto 
Sicuro</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="33"/>
        <source>Confident</source>
        <translation>Sicuro</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="34"/>
        <source>Balanced</source>
        <translation>Bilanciato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="35"/>
        <source>Permissive</source>
        <translation>Permissivo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/AIPersonDetector/controllers/AIPersonDetectorWizardController.py" line="36"/>
        <source>Very 
Permissive</source>
        <translation>Molto 
Permissivo</translation>
    </message>
</context>
<context>
    <name>ColorAnomalyAndMotionDetectionWizardController</name>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="47"/>
        <source>Very 
Conservative</source>
        <translation>Molto 
Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="48"/>
        <source>Conservative</source>
        <translation>Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="49"/>
        <source>Moderate</source>
        <translation>Moderato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="50"/>
        <source>Aggressive</source>
        <translation>Aggressivo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/streaming/ColorAnomalyAndMotionDetection/controllers/ColorAnomalyAndMotionDetectionWizardController.py" line="51"/>
        <source>Very 
Aggressive</source>
        <translation>Molto 
Aggressivo</translation>
    </message>
</context>
<context>
    <name>MRMapWizardController</name>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="36"/>
        <source>Very 
Conservative</source>
        <translation>Molto 
Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="37"/>
        <source>Conservative</source>
        <translation>Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="38"/>
        <source>Moderate</source>
        <translation>Moderato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="39"/>
        <source>Aggressive</source>
        <translation>Aggressivo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/MRMap/controllers/MRMapWizardController.py" line="40"/>
        <source>Very 
Aggressive</source>
        <translation>Molto 
Aggressivo</translation>
    </message>
</context>
<context>
    <name>RXAnomalyWizardController</name>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="49"/>
        <source>Very 
Conservative</source>
        <translation>Molto 
Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="50"/>
        <source>Conservative</source>
        <translation>Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="51"/>
        <source>Moderate</source>
        <translation>Moderato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="52"/>
        <source>Aggressive</source>
        <translation>Aggressivo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/RXAnomaly/controllers/RXAnomalyWizardController.py" line="53"/>
        <source>Very 
Aggressive</source>
        <translation>Molto 
Aggressivo</translation>
    </message>
</context>
<context>
    <name>ThermalAnomalyWizardController</name>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="45"/>
        <source>Very 
Conservative</source>
        <translation>Molto 
Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="46"/>
        <source>Conservative</source>
        <translation>Conservativo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="47"/>
        <source>Moderate</source>
        <translation>Moderato</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="48"/>
        <source>Aggressive</source>
        <translation>Aggressivo</translation>
    </message>
    <message>
        <location filename="../app/algorithms/images/ThermalAnomaly/controllers/ThermalAnomalyWizardController.py" line="49"/>
        <source>Very 
Aggressive</source>
        <translation>Molto 
Aggressivo</translation>
    </message>
</context>
<context>
    <name>AnalyzeService</name>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="129"/>
        <source>Processing {count} files</source>
        <translation>Elaborazione di {count} file</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="169"/>
        <source>Skipping {file} :: File is not an image</source>
        <translation>Saltato {file} :: Il file non è un&apos;immagine</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="172"/>
        <source>All {count} images queued, processing started...</source>
        <translation>Tutte le {count} immagini in coda, elaborazione avviata...</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="191"/>
        <source>{images} images with {aois} areas of interest identified</source>
        <translation>{images} immagini con {aois} aree di interesse identificate</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="192"/>
        <source>Total Processing Time: {seconds} seconds</source>
        <translation>Tempo totale di elaborazione: {seconds} secondi</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="193"/>
        <source>Total Images Processed: {count}</source>
        <translation>Totale immagini elaborate: {count}</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="324"/>
        <source>Unable to process {file} :: {error}</source>
        <translation>Impossibile elaborare {file} :: {error}</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="342"/>
        <source>{count} areas of interest identified in {file} ({percent}%)</source>
        <translation>{count} aree di interesse identificate in {file} ({percent}%)</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="353"/>
        <source>No areas of interest identified in {file} ({percent}%)</source>
        <translation>Nessuna area di interesse identificata in {file} ({percent}%)</translation>
    </message>
    <message>
        <location filename="../app/core/services/AnalyzeService.py" line="362"/>
        <source>--- Cancelling Image Processing ---</source>
        <translation>--- Annullamento elaborazione immagini ---</translation>
    </message>
</context>
<context>
    <name>TextLabeledSlider</name>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="238"/>
        <source>Very Conservative</source>
        <translation>Molto Conservativo</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="239"/>
        <source>Conservative</source>
        <translation>Conservativo</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="240"/>
        <source>Moderate</source>
        <translation>Moderato</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="241"/>
        <source>Aggressive</source>
        <translation>Aggressivo</translation>
    </message>
    <message>
        <location filename="../app/core/views/components/LabeledSlider.py" line="242"/>
        <source>Very Aggressive</source>
        <translation>Molto Aggressivo</translation>
    </message>
</context>
</TS>
