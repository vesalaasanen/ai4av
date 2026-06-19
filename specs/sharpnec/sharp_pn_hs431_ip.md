---
spec_id: admin/sharp-nec-pn-hs431
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HS431 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HS431
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HS431
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:47:07.048Z
last_checked_at: 2026-06-18T09:07:07.540Z
generated_at: 2026-06-18T09:07:07.540Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default serial baud rate not stated (multiple rates supported)"
  - "ID2 model code value for PN-HS431 not stated in source"
  - "firmware version compatibility not stated"
  - "full input-terminal code table is in an Appendix (\"Supplementary Information by Command\") not included in this refined source excerpt — aspect/input/audio/eco-mode enum values partially incomplete"
  - "wireless LAN details deferred to separate operation manual"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:07:07.540Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HS431 Control Spec

## Summary
Sharp/NEC projector (document BDT140013 Rev 7.1) controllable over TCP/IP (wired/wireless LAN) and RS-232C serial. Binary protocol with hex-byte command frames, each terminated by a one-byte checksum. Covers power, input switching, mute, picture/volume/aspect/lens adjustment, shutter, freeze, lens memory, eco mode, edge blending, PIP/PbP, and a broad set of status/information queries.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # supported rates; default UNRESOLVED (not stated)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode
auth:
  type: none  # inferred: no auth procedure in source
```

**Command framing:** All commands/responses are hex-byte frames of the form `<hdr> <cmd> <ID1> <ID2> <LEN> <DATA…> <CKS>` where `ID1` = control ID set on projector, `ID2` = model code, `LEN` = byte length of the data part, and `CKS` = checksum = low-order byte of the sum of all preceding bytes. Response frames begin with `2xh` (success), `Axh` (error, with ERR1/ERR2), or `2xh`+data (data responses). Several commands are fully literal (no ID1/ID2/LEN/CKS shown because they are request skeletons); parameterized commands show `<DATA…>` placeholders.

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: numerous status/information request commands
  - routable     # inferred: INPUT SW CHANGE command present
  - levelable    # inferred: picture/volume/lens adjustment commands present
```

## Actions
```yaml
actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off power (including cooling time), no other command accepted."

  # --- Input switching ---
  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal code (e.g. 06h = Video). See Appendix 'Supplementary Information by Command' for full list."
    notes: "Response DATA01 = FFh means ended with error (no signal switch)."

  # --- Mute ---
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- Picture / Volume / Aspect / Other adjust ---
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. See Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target (DATA01): 96h = LAMP ADJUST / LIGHT ADJUST; DATA02 fixed FFh"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  # --- Remote key code ---
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (see key code list)"
      - name: DATA02
        type: byte
        description: "Key code high byte (WORD type). Examples: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"
    notes: "Response DATA01 = FFh means ended with error."

  # --- Shutter ---
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- Lens control ---
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 06h=Periphery Focus"
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "After 7Fh/81h, send 00h to stop. Lens can be re-controlled without stop while driving."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target: FFh=Stop (mode/value ignored)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET. Controls profile set by LENS PROFILE SET."
    notes: "Response DATA02 = FFh means ended with error."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  # --- Freeze ---
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  # --- Eco mode set ---
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Value set for eco mode. See Appendix 'Supplementary Information by Command'."

  # --- LAN projector name set ---
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    params:
      - name: DATA01-DATA16
        type: string
        description: "Projector name (up to 16 bytes)"

  # --- PIP/Picture-by-Picture set ---
  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub input values per Appendix."

  # --- Edge blending mode set ---
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  # --- Audio select set ---
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal. See Appendix 'Supplementary Information by Command'."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

  # === Queries ===
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfield of error info (bit=1 => error)."

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target (e.g. 06h=Periphery Focus)"
    notes: "Returns upper/lower limit and current value of adjustment range."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: lens memory/zoom/focus/lens-shift(V) operation status."

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected reference lens memory profile (00h=Profile1, 01h=Profile2)."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns adjustment range limits, default, current value, widths, and validity."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), OSD (DATA05)."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name string (DATA01-32, NUL-terminated)."

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=normal (cover opened), 01h=cover closed."

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value (Light mode / Lamp mode depending on model)."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: lan_mac_address_status_request2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  - id: pip_pbp_request
    label: PIP/Picture-by-Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number string (DATA01-16, NUL-terminated)."

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on]
    source: "078-2 RUNNING STATUS DATA03 (00h=Standby, 01h=Power On)"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 DATA06 / 305-3 DATA01"

  - id: error_status
    type: bitfield
    source: "009 ERROR STATUS REQUEST DATA01-DATA12"

  - id: mute_status
    type: object
    source: "078-4 MUTE STATUS REQUEST (picture, sound, onscreen, forced onscreen)"

  - id: input_status
    type: object
    source: "078-3 INPUT STATUS REQUEST"

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: "037-4 LAMP INFORMATION REQUEST 3"

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: "037-4 LAMP INFORMATION REQUEST 3"

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: "037-3 / 037"

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source: "078-6 COVER STATUS REQUEST"

  - id: model_name
    type: string
    source: "078-5 MODEL NAME REQUEST"

  - id: serial_number
    type: string
    source: "305-2 SERIAL NUMBER REQUEST"

  - id: projector_name
    type: string
    source: "097-45 LAN PROJECTOR NAME REQUEST"

  - id: mac_address
    type: string
    source: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

  - id: eco_mode
    type: enum
    source: "097-8 ECO MODE REQUEST"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST"

  - id: lens_operation_status
    type: bitfield
    source: "053-7 LENS INFORMATION REQUEST DATA01"

  - id: horizontal_sync_frequency
    type: string
    source: "084 INFORMATION STRING REQUEST (DATA01=03h)"

  - id: vertical_sync_frequency
    type: string
    source: "084 INFORMATION STRING REQUEST (DATA01=04h)"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    set: "030-1 PICTURE ADJUST (DATA01=00h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"

  - id: contrast
    type: integer
    set: "030-1 PICTURE ADJUST (DATA01=01h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=01h)"

  - id: color
    type: integer
    set: "030-1 PICTURE ADJUST (DATA01=02h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=02h)"

  - id: hue
    type: integer
    set: "030-1 PICTURE ADJUST (DATA01=03h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=03h)"

  - id: sharpness
    type: integer
    set: "030-1 PICTURE ADJUST (DATA01=04h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=04h)"

  - id: volume
    type: integer
    set: "030-2 VOLUME ADJUST"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"

  - id: lamp_adjust
    type: integer
    set: "030-15 OTHER ADJUST (DATA01=96h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=96h)"
```

## Events
```yaml
# No unsolicited notifications documented. All data is returned in response to a request.
events: []
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power ON: while turning on, no other command accepted."
  - "Power OFF: during turn-off (incl. cooling time), no other command accepted."
  - "Error response ERR1=02h ERR2=0Dh: 'command cannot be accepted because the power is off.'"
# Source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements beyond the command-acceptance interlocks noted above.
```

## Notes
- Binary protocol over both TCP (port 7142) and RS-232C serial. Serial supports baud 4800/9600/19200/38400/115200; default rate not stated in source.
- Checksum = low-order byte of sum of all preceding bytes in the frame (including header/cmd/ID/LEN/data).
- ID1 (control ID) and ID2 (model code) are inserted into responses by the projector; commands sent to the projector in this manual's skeleton form omit them but a real implementation must populate them per the projector's configured control ID and the model code.
- Lamp usage/filter usage times update at one-minute intervals though reported in one-second units.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- PIP "Lamp 2" (DATA01=01h) effective only on two-lamp projector models.

<!-- UNRESOLVED: default serial baud rate not stated (multiple rates supported) -->
<!-- UNRESOLVED: ID2 model code value for PN-HS431 not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: full input-terminal code table is in an Appendix ("Supplementary Information by Command") not included in this refined source excerpt — aspect/input/audio/eco-mode enum values partially incomplete -->
<!-- UNRESOLVED: wireless LAN details deferred to separate operation manual -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:47:07.048Z
last_checked_at: 2026-06-18T09:07:07.540Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:07:07.540Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default serial baud rate not stated (multiple rates supported)"
- "ID2 model code value for PN-HS431 not stated in source"
- "firmware version compatibility not stated"
- "full input-terminal code table is in an Appendix (\"Supplementary Information by Command\") not included in this refined source excerpt — aspect/input/audio/eco-mode enum values partially incomplete"
- "wireless LAN details deferred to separate operation manual"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
