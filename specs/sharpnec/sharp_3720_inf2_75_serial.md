---
spec_id: admin/sharp-nec-3720-inf2-75
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 3720 Inf2 75 Control Spec"
manufacturer: Sharp/NEC
model_family: "3720 Inf2 75"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "3720 Inf2 75"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:32:30.114Z
last_checked_at: 2026-06-17T19:31:29.476Z
generated_at: 2026-06-17T19:31:29.476Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value map referenced in Appendix \"Supplementary Information by Command\" but not included in source text"
  - "aspect value map referenced in Appendix but not included in source text"
  - "eco mode value map referenced in Appendix but not included in source text"
  - "sub input setting value map referenced in Appendix but not included in source text"
  - "base model type values referenced in Appendix but not included in source text"
  - "RTS/CTS pins wired in cable pinout but flow control mode not explicitly stated in source"
  - "source documents all controls as discrete commands (actions/queries),"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step command sequences."
  - "source reports interlock switch status but does not document"
  - "flow_control not explicitly stated (RTS/CTS pins wired but mode undocumented)"
  - "input terminal value map not in source (referenced Appendix excluded)"
  - "aspect value map not in source (referenced Appendix excluded)"
  - "eco mode value map not in source (referenced Appendix excluded)"
  - "sub input setting value map not in source (referenced Appendix excluded)"
  - "base model type values not in source (referenced Appendix excluded)"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:31:29.476Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source with exact command hex sequences and transport parameters. One-to-one coverage, no gaps, no drift. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC 3720 Inf2 75 Control Spec

## Summary
Sharp/NEC 3720 Inf2 75 is a projector controllable via RS-232C serial and TCP/IP LAN (port 7142). The protocol uses binary hex command frames with a checksum byte. This spec covers all 53 documented commands including power control, input switching, mute control, picture/volume adjustment, lens control, lens memory, status queries, eco mode, PIP/PbP, edge blending, and system information requests.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value map referenced in Appendix "Supplementary Information by Command" but not included in source text -->
<!-- UNRESOLVED: aspect value map referenced in Appendix but not included in source text -->
<!-- UNRESOLVED: eco mode value map referenced in Appendix but not included in source text -->
<!-- UNRESOLVED: sub input setting value map referenced in Appendix but not included in source text -->
<!-- UNRESOLVED: base model type values referenced in Appendix but not included in source text -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired in cable pinout but flow control mode not explicitly stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from power on/off commands (015, 016)
  - queryable       # inferred from numerous status query commands (009, 037, 078, etc.)
  - levelable       # inferred from volume/picture/gain adjust commands (030-1, 030-2, 030-15)
```

## Actions
```yaml
actions:
  # --- ERROR STATUS ---
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns 12 bytes of error bitfield (DATA01-DATA12). Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

  # --- POWER ---
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted. Success response: 22h 00h <ID1> <ID2> 00h <CKS>"

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (including cooling time), no other command accepted. Success response: 22h 01h <ID1> <ID2> 00h <CKS>"

  # --- INPUT ---
  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (e.g. 06h = video port). See Appendix Supplementary Information by Command for full value map."
    notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response FFh in DATA01 = ended with error (no signal switch made)."

  # --- PICTURE MUTE ---
  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Turned off by input terminal switch or video signal switch."

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- SOUND MUTE ---
  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Turned off by input terminal switch, video signal switch, or sound volume adjustment."

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- ONSCREEN MUTE ---
  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Turned off by input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- PICTURE ADJUST ---
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example (brightness=-10): 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  # --- VOLUME ADJUST ---
  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  # --- ASPECT ADJUST ---
  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Value set for the aspect. See Appendix Supplementary Information by Command for value map."
    notes: "Response: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>. 0000h=success, other=error."

  # --- OTHER ADJUST ---
  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target high byte: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "Adjustment target low byte: FFh (for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Response: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>. 0000h=success, other=error."

  # --- INFORMATION REQUEST ---
  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns 98 bytes. DATA01-49=projector name (NUL-terminated), DATA83-86=lamp usage time (seconds), DATA87-90=filter usage time (seconds). Updated at 1-minute intervals."

  # --- FILTER USAGE ---
  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns 8 bytes. DATA01-04=filter usage time (seconds), DATA05-08=filter alarm start time (seconds). -1 returned if undefined."

  # --- LAMP INFORMATION ---
  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lamp number: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. Returns 6 bytes. Negative remaining life if replacement deadline exceeded."

  # --- CARBON SAVINGS ---
  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns 9 bytes. DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

  # --- REMOTE KEY CODE ---
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte. See key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: byte
        description: "Key code high byte (00h for all listed keys)"
    notes: "Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means error."

  # --- SHUTTER ---
  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- LENS CONTROL ---
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens function: 06h=Periphery Focus"
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
    notes: "After 7Fh/81h, send 00h to stop. Can issue same command to control without stop while lens driving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens function to query (e.g. 06h=Periphery Focus)"
    notes: "Returns 8 bytes: upper/lower limits and current value (16-bit each)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens function (FFh=Stop)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=FFh (Stop), adjustment mode and value are not referenced."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number specified by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected profile number (00h=Profile 1, 01h=Profile 2)."

  # --- GAIN PARAMETER ---
  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns 16 bytes: status, upper/lower limits, default, current value, wide/narrow adjustment width (all 16-bit). Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

  # --- SETTING / STATUS REQUESTS ---
  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns 32 bytes. DATA01-03=base model type, DATA04=sound function (00h=not available, 01h=available), DATA05=profile number."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns 16 bytes. DATA03=power status (00h=Standby, 01h=Power on), DATA04=cooling, DATA05=power on/off process, DATA06=operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns 16 bytes. DATA01=signal switch process, DATA02=signal list number (value-1), DATA03=signal type 1, DATA04=signal type 2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort), DATA05=signal list type, DATA06=test pattern, DATA09=content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns 16 bytes. DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display (00h/01h each)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns 32 bytes. DATA01-32=model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 1 byte. DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  # --- FREEZE ---
  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  # --- INFORMATION STRING ---
  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

  # --- ECO MODE ---
  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value. See Appendix Supplementary Information by Command for value map."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Value set for the eco mode. See Appendix Supplementary Information by Command for value map."

  # --- LAN PROJECTOR NAME ---
  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns 17 bytes. DATA01-17=projector name (NUL-terminated)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: DATA01-DATA16
        type: string
        description: "Projector name (up to 16 bytes)"

  # --- LAN MAC ADDRESS ---
  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6 bytes MAC address. Example response for 01h-23h-45h-67h-89h-ABh: 23h B0h <ID1> <ID2> 08h 9Ah 00h 01h 23h 45h 67h 89h ABh <CKS>"

  # --- PIP / PICTURE BY PICTURE ---
  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input: see Appendix."

  # --- EDGE BLENDING ---
  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns 1 byte. DATA01: 00h=OFF, 01h=ON."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  # --- BASE MODEL / SERIAL / BASIC INFO ---
  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns 15 bytes. DATA01-02=base model type, DATA03-11=model name (NUL-terminated), DATA12-13=base model type."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns 16 bytes. DATA01-16=serial number (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns 15 bytes. DATA01=operation status, DATA02=content displayed, DATA03-04=signal type, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."

  # --- AUDIO SELECT ---
  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal. See Appendix Supplementary Information by Command for value map."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_success
    type: ack
    description: >
      Success response format: 2Xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>.
      Leading byte depends on command type: 20h for type-00h commands,
      21h for type-01h, 22h for type-02h, 23h for type-03h.
      When no data requested, LEN=00h and no DATA field.

  - id: command_error
    type: ack
    description: >
      Error response format: AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.
      Leading byte: A0h for type-00h, A1h for type-01h, A2h for type-02h, A3h for type-03h.
      ERR1/ERR2 combinations listed in error_codes feedback.

  - id: error_codes
    type: enum_table
    description: "ERR1/ERR2 error code combinations"
    values:
      "00h 00h": "Command cannot be recognized"
      "00h 01h": "Command not supported by the model in use"
      "01h 00h": "Specified value is invalid"
      "01h 01h": "Specified input terminal is invalid"
      "01h 02h": "Specified language is invalid"
      "02h 00h": "Memory allocation error"
      "02h 02h": "Memory in use"
      "02h 03h": "Specified value cannot be set"
      "02h 04h": "Forced onscreen mute on"
      "02h 06h": "Viewer error"
      "02h 07h": "No signal"
      "02h 08h": "A test pattern or filter is displayed"
      "02h 09h": "No PC card is inserted"
      "02h 0Ah": "Memory operation error"
      "02h 0Ch": "An entry list is displayed"
      "02h 0Dh": "Command cannot be accepted because the power is off"
      "02h 0Eh": "Command execution failed"
      "02h 0Fh": "No authority necessary for the operation"
      "03h 00h": "Specified gain number is incorrect"
      "03h 01h": "Specified gain is invalid"
      "03h 02h": "Adjustment failed"

  - id: error_status_bitfield
    type: bitfield
    description: "Error status bitfield from 009. ERROR STATUS REQUEST (DATA01-DATA12)"
    bits:
      "DATA01 Bit0": "Cover error"
      "DATA01 Bit1": "Temperature error (bi-metallic strip)"
      "DATA01 Bit3": "Fan error"
      "DATA01 Bit4": "Fan error"
      "DATA01 Bit5": "Power error"
      "DATA01 Bit6": "Lamp (or lamp 1) off or backlight off"
      "DATA01 Bit7": "Lamp (or lamp 1) in replacement moratorium"
      "DATA02 Bit0": "Lamp (or lamp 1) usage time exceeded the limit"
      "DATA02 Bit1": "Formatter error"
      "DATA02 Bit2": "Lamp 2 off"
      "DATA03 Bit1": "FPGA error"
      "DATA03 Bit2": "Temperature error (temperature sensor)"
      "DATA03 Bit3": "Lamp (or lamp 1) not present"
      "DATA03 Bit4": "Lamp (or lamp 1) data error"
      "DATA03 Bit5": "Mirror cover error"
      "DATA03 Bit6": "Lamp 2 in replacement moratorium"
      "DATA03 Bit7": "Lamp 2 usage time exceeded the limit"
      "DATA04 Bit0": "Lamp 2 not present"
      "DATA04 Bit1": "Lamp 2 data error"
      "DATA04 Bit2": "Temperature error due to dust"
      "DATA04 Bit3": "Foreign matter sensor error"
      "DATA04 Bit5": "Ballast communication error"
      "DATA04 Bit6": "Iris calibration error"
      "DATA04 Bit7": "Lens not installed properly"
      "DATA09 Bit0": "Portrait cover side is up"
      "DATA09 Bit1": "Interlock switch is open"
      "DATA09 Bit2": "System error (Slave CPU)"
      "DATA09 Bit3": "System error (Formatter)"

  - id: power_status
    type: enum
    description: "Power status from 078-2. RUNNING STATUS REQUEST DATA03"
    values: ["standby", "power_on"]

  - id: mute_status
    type: struct
    description: "Mute status from 078-4. MUTE STATUS REQUEST"
    fields:
      picture_mute: "00h=Off, 01h=On"
      sound_mute: "00h=Off, 01h=On"
      onscreen_mute: "00h=Off, 01h=On"
      forced_onscreen_mute: "00h=Off, 01h=On"
      onscreen_display: "00h=Not displayed, 01h=Displayed"
```

## Variables
```yaml
# UNRESOLVED: source documents all controls as discrete commands (actions/queries),
# not as settable variables with continuous ranges. Adjustment ranges are returned
# dynamically via 060-1. GAIN PARAMETER REQUEST 3.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited (command-reply only).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Interlock switch status reported in error status bitfield (DATA09 Bit1: interlock switch is open)"
  - "Power on: no other command accepted during power-on sequence (015)"
  - "Power off: no other command accepted during power-off including cooling time (016)"
# UNRESOLVED: source reports interlock switch status but does not document
# interlock procedures or power-on sequencing requirements in detail.
```

## Notes
- **Command frame format:** `<type> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Type bytes: 00h=request, 01h=control type 1, 02h=control type 2, 03h=set. Response type bytes: 20h/21h/22h/23h=success (matching command type), A0h/A1h/A2h/A3h=error.
- **ID1 (Control ID):** Value set for the projector. Documented commands use 00h as default.
- **ID2 (Model code):** Varies by model. Documented commands use 00h as default.
- **Checksum (CKS):** Sum all preceding bytes, use low-order one byte (8 bits) of result. Example: 20h+81h+01h+60h+01h+00h=103h, checksum=03h.
- **Serial cable:** Cross cable required. PC CONTROL port is D-SUB 9P. Pin 2(RxD)↔TxD, Pin 3(TxD)↔RxD, Pin 5(GND)↔GND, Pin 7(RTS)↔CTS, Pin 8(CTS)↔RTS.
- **LAN:** TCP port 7142. Wired (10/100 Mbps auto) and wireless LAN supported.
- **Usage time updates:** Lamp and filter usage time obtainable in 1-second units but updated at 1-minute intervals.
- **Lamp remaining life:** Negative value returned if replacement deadline exceeded.

<!-- UNRESOLVED: flow_control not explicitly stated (RTS/CTS pins wired but mode undocumented) -->
<!-- UNRESOLVED: input terminal value map not in source (referenced Appendix excluded) -->
<!-- UNRESOLVED: aspect value map not in source (referenced Appendix excluded) -->
<!-- UNRESOLVED: eco mode value map not in source (referenced Appendix excluded) -->
<!-- UNRESOLVED: sub input setting value map not in source (referenced Appendix excluded) -->
<!-- UNRESOLVED: base model type values not in source (referenced Appendix excluded) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:32:30.114Z
last_checked_at: 2026-06-17T19:31:29.476Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:31:29.476Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source with exact command hex sequences and transport parameters. One-to-one coverage, no gaps, no drift. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value map referenced in Appendix \"Supplementary Information by Command\" but not included in source text"
- "aspect value map referenced in Appendix but not included in source text"
- "eco mode value map referenced in Appendix but not included in source text"
- "sub input setting value map referenced in Appendix but not included in source text"
- "base model type values referenced in Appendix but not included in source text"
- "RTS/CTS pins wired in cable pinout but flow control mode not explicitly stated in source"
- "source documents all controls as discrete commands (actions/queries),"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step command sequences."
- "source reports interlock switch status but does not document"
- "flow_control not explicitly stated (RTS/CTS pins wired but mode undocumented)"
- "input terminal value map not in source (referenced Appendix excluded)"
- "aspect value map not in source (referenced Appendix excluded)"
- "eco mode value map not in source (referenced Appendix excluded)"
- "sub input setting value map not in source (referenced Appendix excluded)"
- "base model type values not in source (referenced Appendix excluded)"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
