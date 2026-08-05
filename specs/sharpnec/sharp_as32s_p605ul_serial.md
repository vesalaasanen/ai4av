---
spec_id: admin/sharp-nec-as32s-p605ul
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC As32S P605Ul Control Spec"
manufacturer: Sharp/NEC
model_family: "As32S P605Ul"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "As32S P605Ul"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:57:26.576Z
last_checked_at: 2026-07-22T00:46:48.478Z
generated_at: 2026-07-22T00:46:48.478Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not name specific model \"As32S P605Ul\" — it is a generic projector command reference. Model compatibility inferred from entity assignment."
  - "firmware version compatibility not stated in source"
  - "many parameter value ranges reference \"Appendix: Supplementary Information by Command\" which is not included in the refined source document"
  - "aspect values not in refined source - referenced appendix not included.\""
  - "eco mode values not in refined source - referenced appendix not included.\""
  - "input terminal values not in refined source - referenced appendix not included.\""
  - "eco mode enum values not in refined source"
  - "exact min/max range not stated in refined source"
  - "no explicit power-on sequencing procedure documented in source"
  - "input terminal value list not in refined source (referenced appendix)"
  - "aspect value list not in refined source (referenced appendix)"
  - "eco mode value list not in refined source (referenced appendix)"
  - "base model type values not in refined source (referenced appendix)"
  - "sub input setting values for PIP/PBP not in refined source (referenced appendix)"
  - "exact gain adjustment ranges (min/max/default) require runtime query via 060-1 GAIN PARAMETER REQUEST"
  - "protocol version number not stated"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:46:48.478Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source hex sequences; transport parameters verified; source command catalogue fully represented. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC As32S P605Ul Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and TCP/IP LAN control. Binary hex command protocol with checksum. Supports power control, input switching, picture/volume adjustment, lens control, lens memory, status queries, and system information requests. Source document is "Projector Control Command Reference Manual" (BDT140013 Revision 7.1), a generic reference covering multiple Sharp/NEC projector models.

<!-- UNRESOLVED: source document does not name specific model "As32S P605Ul" — it is a generic projector command reference. Model compatibility inferred from entity assignment. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: many parameter value ranges reference "Appendix: Supplementary Information by Command" which is not included in the refined source document -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200/38400/19200/9600/4800  # source lists all five as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware  # inferred: RTS/CTS pins cross-connected in D-SUB 9P pin assignment table
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWER ON / POWER OFF commands present
  - queryable  # inferred: extensive status query commands present
  - levelable  # inferred: volume, brightness, contrast, color, hue, sharpness adjustment commands
  - routable  # inferred: INPUT SW CHANGE command present
```

## Actions
```yaml
# All commands use binary hex payloads. Last byte of each fixed command is the
# checksum (sum of all preceding bytes, low-order 8 bits). For parameterized
# commands, the checksum must be computed from the actual byte values.
# Response formats: 2Xh prefix = success, AXh prefix = error (with ERR1/ERR2).
# ID1 = control ID, ID2 = model code - projector fills these in responses.

actions:
  # --- Error / status queries ---
  - id: error_status_request
    label: "009. Error Status Request"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 with bitfield error information. A0h response prefix."

  # --- Power control ---
  - id: power_on
    label: "015. Power On"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted."

  - id: power_off
    label: "016. Power Off"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (including cooling time), no other command accepted."

  # --- Input switching ---
  - id: input_sw_change
    label: "018. Input SW Change"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Input terminal value. Example: 06h = video port. Full list in Appendix 'Supplementary Information by Command'."
    notes: "Response DATA01=FFh means error (no signal switch made). Example with video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

  # --- Picture mute ---
  - id: picture_mute_on
    label: "020. Picture Mute On"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Turned off by input terminal switch or video signal switch."

  - id: picture_mute_off
    label: "021. Picture Mute Off"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- Sound mute ---
  - id: sound_mute_on
    label: "022. Sound Mute On"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Turned off by input switch, video signal switch, or volume adjustment."

  - id: sound_mute_off
    label: "023. Sound Mute Off"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- Onscreen mute ---
  - id: onscreen_mute_on
    label: "024. Onscreen Mute On"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Turned off by input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. Onscreen Mute Off"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- Picture / volume / aspect / gain adjustments ---
  - id: picture_adjust
    label: "030-1. Picture Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: hex
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA03
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example setting brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: volume_adjust
    label: "030-2. Volume Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA02
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example setting volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: "030-12. Aspect Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Value set for the aspect. Full list in Appendix 'Supplementary Information by Command'."
    notes: "UNRESOLVED: aspect values not in refined source - referenced appendix not included."

  - id: other_adjust
    label: "030-15. Other Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: hex
        description: "Adjustment target low byte: FFh (paired with 96h)"
      - name: DATA03
        type: hex
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA04
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: hex
        description: "Adjustment value (high-order 8 bits)"

  # --- Information queries ---
  - id: information_request
    label: "037. Information Request"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. Filter Usage Information Request"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 returned if no time defined."

  - id: lamp_information_request_3
    label: "037-4. Lamp Information Request 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: hex
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: "Eco mode values reflected when enabled. Negative remaining life if replacement deadline exceeded. Example getting lamp 1 usage: 03h 96h 00h 00h 02h 00h 01h 9Ch"

  - id: carbon_savings_information_request
    label: "037-6. Carbon Savings Information Request"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  # --- Remote key code ---
  - id: remote_key_code
    label: "050. Remote Key Code"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Key code low byte. See key code list."
      - name: DATA02
        type: hex
        description: "Key code high byte. See key code list."
    notes: >
      Key code list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU,
      07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER,
      0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN,
      13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2,
      4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN,
      8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO.
      Example AUTO key: 02h 0Fh 00h 00h 02h 05h 00h 18h

  # --- Shutter ---
  - id: shutter_close
    label: "051. Shutter Close"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. Shutter Open"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- Lens control ---
  - id: lens_control
    label: "053. Lens Control"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Target: 06h=Periphery Focus"
      - name: DATA02
        type: hex
        description: >
          Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus,
          03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus
          (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus,
          FFh=drive 1s minus
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Lens can be re-controlled without stop while driving."

  - id: lens_control_request
    label: "053-1. Lens Control Request"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Target (same as 053 LENS CONTROL)"
    notes: "Returns upper limit, lower limit, and current value of adjustment range."

  - id: lens_control_2
    label: "053-2. Lens Control 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Target: FFh=Stop"
      - name: DATA02
        type: hex
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: DATA03
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=FFh (Stop), adjustment mode and value are not referenced."

  - id: lens_memory_control
    label: "053-3. Lens Memory Control"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. Reference Lens Memory Control"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number specified by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. Lens Memory Option Request"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns setting value: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. Lens Memory Option Set"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: hex
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. Lens Information Request"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. Lens Profile Set"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. Lens Profile Request"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile number: 00h=Profile 1, 01h=Profile 2."

  # --- Gain parameter request ---
  - id: gain_parameter_request_3
    label: "060-1. Gain Parameter Request 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: hex
        description: >
          Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR,
          03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST
    notes: >
      Returns DATA01=status (00h=display not possible, 01h=adjust not possible,
      02h=adjust possible, FFh=gain not exist), DATA02-13=limits/default/current/wide/narrow
      widths, DATA14=default validity.

  # --- Status queries (078 series) ---
  - id: setting_request
    label: "078-1. Setting Request"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile features (DATA05)."

  - id: running_status_request
    label: "078-2. Running Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: >
      Returns DATA03=power status (00h=Standby, 01h=Power on),
      DATA04=cooling process, DATA05=power on/off process,
      DATA06=operation status (00h=Standby/Sleep, 04h=Power on, 05h=Cooling, 06h=Standby/error, 0Fh=Standby/Power saving, 10h=Network standby).

  - id: input_status_request
    label: "078-3. Input Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: >
      Returns signal switch process (DATA01), signal list number (DATA02, practical = returned + 1),
      selection signal type 1 (DATA03), selection signal type 2 (DATA04: 01h=COMPUTER, 02h=VIDEO,
      03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort), signal list type (DATA05),
      test pattern (DATA06), content displayed (DATA09).

  - id: mute_status_request
    label: "078-4. Mute Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: >
      Returns DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute,
      DATA04=forced onscreen mute, DATA05=onscreen display. Each 00h=Off, 01h=On.

  - id: model_name_request
    label: "078-5. Model Name Request"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name string (DATA01-32, NUL-terminated)."

  - id: cover_status_request
    label: "078-6. Cover Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  # --- Freeze ---
  - id: freeze_control
    label: "079. Freeze Control"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "01h=freeze on, 02h=freeze off"

  # --- Information string ---
  - id: information_string_request
    label: "084. Information String Request"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
    notes: "Returns label/info string (NUL-terminated)."

  # --- Eco mode ---
  - id: eco_mode_request
    label: "097-8. Eco Mode Request"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value. Depending on projector, returns 'Light mode' or 'Lamp mode'. Values in Appendix."

  - id: eco_mode_set
    label: "098-8. Eco Mode Set"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Value set for the eco mode. Full list in Appendix 'Supplementary Information by Command'."
    notes: "UNRESOLVED: eco mode values not in refined source - referenced appendix not included."

  # --- LAN projector name ---
  - id: lan_projector_name_request
    label: "097-45. LAN Projector Name Request"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: lan_projector_name_set
    label: "098-45. LAN Projector Name Set"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: DATA01-16
        type: string
        description: "Projector name (up to 16 bytes)"
    notes: "Response echoes 2Ch and DATA01."

  # --- LAN MAC address ---
  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC Address Status Request 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  # --- PIP / Picture by Picture ---
  - id: pip_pbp_request
    label: "097-198. PIP/Picture by Picture Request"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: >
          Content: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1,
          09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    notes: >
      Returns DATA02 setting value. MODE: 00h=PIP, 01h=PBP.
      START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT.
      Sub input values in Appendix.

  - id: pip_pbp_set
    label: "098-198. PIP/Picture by Picture Set"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: >
          Content: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1,
          09h=SUB INPUT 2, 0Ah=SUB INPUT 3
      - name: DATA02
        type: hex
        description: >
          Setting value. MODE: 00h=PIP, 01h=PBP.
          START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT.
          Sub input values in Appendix.

  # --- Edge blending ---
  - id: edge_blending_mode_request
    label: "097-243-1. Edge Blending Mode Request"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: edge_blending_mode_set
    label: "098-243-1. Edge Blending Mode Set"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Setting value: 00h=OFF, 01h=ON"

  # --- Base model / serial / basic info (305 series) ---
  - id: base_model_type_request
    label: "305-1. Base Model Type Request"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name string (DATA03-11)."

  - id: serial_number_request
    label: "305-2. Serial Number Request"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number string (DATA01-16, NUL-terminated)."

  - id: basic_information_request
    label: "305-3. Basic Information Request"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: >
      Returns operation status (DATA01), content displayed (DATA02),
      signal type 1 (DATA03), signal type 2 (DATA04), display signal type (DATA05),
      video mute (DATA06), sound mute (DATA07), onscreen mute (DATA08), freeze status (DATA09).

  # --- Audio select ---
  - id: audio_select_set
    label: "319-10. Audio Select Set"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: hex
        description: "Input terminal. Full list in Appendix 'Supplementary Information by Command'."
      - name: DATA02
        type: hex
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    notes: "UNRESOLVED: input terminal values not in refined source - referenced appendix not included."
```

## Feedbacks
```yaml
# Response structures documented per-command in Actions above.
# Key observable states queryable via the binary protocol:
feedbacks:
  - id: error_status
    type: bitfield
    description: "009 ERROR STATUS REQUEST response. 12 bytes of error flags (cover, fan, temp, lamp, etc.). DATA09 Bit1 = interlock switch open."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling]
    description: "078-2 RUNNING STATUS REQUEST DATA03/DATA06."

  - id: input_signal_status
    type: composite
    description: "078-3 INPUT STATUS REQUEST response. Signal type, list number, content displayed."

  - id: mute_status
    type: composite
    description: "078-4 MUTE STATUS REQUEST response. Picture/sound/onscreen/forced mute states."

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "078-6 COVER STATUS REQUEST response."

  - id: lens_operation_status
    type: bitfield
    description: "053-7 LENS INFORMATION REQUEST response. Lens memory, zoom, focus, lens shift H/V operation states."

  - id: eco_mode
    type: enum
    description: "097-8 ECO MODE REQUEST response. Values in Appendix."
    # UNRESOLVED: eco mode enum values not in refined source

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "097-243-1 EDGE BLENDING MODE REQUEST response."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "037-4 LAMP INFORMATION REQUEST 3 response (DATA03-06). Updated at 1-min intervals."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "037-4 LAMP INFORMATION REQUEST 3 response. Negative if replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "037-3 FILTER USAGE INFORMATION REQUEST response (DATA01-04)."
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: "030-2 VOLUME ADJUST. Absolute or relative. Range from 060-1 GAIN PARAMETER REQUEST."
    # UNRESOLVED: exact min/max range not stated in refined source

  - id: brightness
    type: integer
    description: "030-1 PICTURE ADJUST (DATA01=00h). Absolute or relative."

  - id: contrast
    type: integer
    description: "030-1 PICTURE ADJUST (DATA01=01h). Absolute or relative."

  - id: color
    type: integer
    description: "030-1 PICTURE ADJUST (DATA01=02h). Absolute or relative."

  - id: hue
    type: integer
    description: "030-1 PICTURE ADJUST (DATA01=03h). Absolute or relative."

  - id: sharpness
    type: integer
    description: "030-1 PICTURE ADJUST (DATA01=04h). Absolute or relative."

  - id: lamp_light_adjust
    type: integer
    description: "030-15 OTHER ADJUST (DATA01=96h). LAMP ADJUST / LIGHT ADJUST. Absolute or relative."

  - id: projector_name
    type: string
    max_length: 16
    description: "098-45 LAN PROJECTOR NAME SET."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "053-10 LENS PROFILE SET."
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are
# command-driven (query/response pattern).
events: []
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: while turning off (including cooling time), no other command accepted
  - power_on  # source: while turning on power, no other command accepted
interlocks:
  - id: interlock_switch
    type: hardware
    description: "Interlock switch status reported in 009 ERROR STATUS REQUEST DATA09 Bit1 (open=closed). System error if open."
  - id: cover_sensor
    type: hardware
    description: "Mirror cover / lens cover status reported in 078-6 COVER STATUS REQUEST."
  - id: temperature
    type: hardware
    description: "Temperature error (bi-metallic strip and sensor) reported in 009 ERROR STATUS REQUEST DATA01 Bit1/Bit2 and DATA03 Bit2."
# UNRESOLVED: no explicit power-on sequencing procedure documented in source
```

## Notes
- Binary hex protocol. All commands are raw byte sequences with trailing checksum byte. Checksum = low-order 8 bits of sum of all preceding bytes.
- Commands do not include ID1 (control ID) or ID2 (model code) in the payload — these appear only in projector responses, filled by the device.
- Multiple baud rates supported (115200/38400/19200/9600/4800). Must match projector configuration.
- Many parameter value enums (input terminals, aspect values, eco mode values, signal types) reference an "Appendix: Supplementary Information by Command" that is not included in the refined source document.
- Response prefixes: 20h/21h/22h/23h = success response (with data if applicable), A0h/A1h/A2h/A3h = error response (with ERR1/ERR2 codes).
- Error code table documents 20+ error combinations (unrecognized command, unsupported model, invalid value, memory errors, power off, no signal, etc.).
- Lamp remaining life can return negative percentage if replacement deadline exceeded.
- Usage times (lamp/filter) update at 1-minute intervals despite 1-second resolution.
- Key code list (command 050) documents 24 remote control key codes including power, menu, navigation, source selection, volume, and eco mode keys.
<!-- UNRESOLVED: input terminal value list not in refined source (referenced appendix) -->
<!-- UNRESOLVED: aspect value list not in refined source (referenced appendix) -->
<!-- UNRESOLVED: eco mode value list not in refined source (referenced appendix) -->
<!-- UNRESOLVED: base model type values not in refined source (referenced appendix) -->
<!-- UNRESOLVED: sub input setting values for PIP/PBP not in refined source (referenced appendix) -->
<!-- UNRESOLVED: exact gain adjustment ranges (min/max/default) require runtime query via 060-1 GAIN PARAMETER REQUEST -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:57:26.576Z
last_checked_at: 2026-07-22T00:46:48.478Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:46:48.478Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source hex sequences; transport parameters verified; source command catalogue fully represented. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not name specific model \"As32S P605Ul\" — it is a generic projector command reference. Model compatibility inferred from entity assignment."
- "firmware version compatibility not stated in source"
- "many parameter value ranges reference \"Appendix: Supplementary Information by Command\" which is not included in the refined source document"
- "aspect values not in refined source - referenced appendix not included.\""
- "eco mode values not in refined source - referenced appendix not included.\""
- "input terminal values not in refined source - referenced appendix not included.\""
- "eco mode enum values not in refined source"
- "exact min/max range not stated in refined source"
- "no explicit power-on sequencing procedure documented in source"
- "input terminal value list not in refined source (referenced appendix)"
- "aspect value list not in refined source (referenced appendix)"
- "eco mode value list not in refined source (referenced appendix)"
- "base model type values not in refined source (referenced appendix)"
- "sub input setting values for PIP/PBP not in refined source (referenced appendix)"
- "exact gain adjustment ranges (min/max/default) require runtime query via 060-1 GAIN PARAMETER REQUEST"
- "protocol version number not stated"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
