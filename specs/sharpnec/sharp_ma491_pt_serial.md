---
spec_id: admin/sharp-nec-ma491-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma491 Pt Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Ma491 Pt"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Ma491 Pt"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:29:07.996Z
last_checked_at: 2026-06-18T08:27:10.796Z
generated_at: 2026-06-18T08:27:10.796Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "wireless LAN settings (data rate, standard) not in source - see operation manual of wireless LAN unit"
  - "no asynchronous event/notification mechanism described in source."
  - "none described in source."
  - "source does not document a separate confirmation handshake or"
  - "wireless LAN standard/data rate not in source (deferred to wireless LAN unit operation manual)."
  - "model-specific values for input terminal, aspect, eco mode, and base model type codes referenced as \"see Appendix Supplementary Information by Command\" - appendix not present in refined source excerpt."
  - "control ID (ID1) default value not stated in source."
  - "model code (ID2) value for Ma491 Pt not stated in source."
  - "voltage / power / lamp wattage specs not present in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:27:10.796Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Ma491 Pt Control Spec

## Summary
Sharp/NEC Ma491 Pt projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. Binary protocol with hex byte payloads terminated by a one-byte additive checksum (low-order 8 bits of the sum of preceding bytes). Source documents 53 distinct command-bearing operations across power, mute, picture/audio adjustment, input switching, lens control, status queries, eco mode, PIP/PbP, edge blending, and system information.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: wireless LAN settings (data rate, standard) not in source - see operation manual of wireless LAN unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as supported values
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source lists "Full duplex" communication mode; flow_control not explicitly stated
addressing:
  port: 7142  # TCP port per source
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport: Baud rate is configurable across 5 values (115200/38400/19200/9600/4800); 115200 listed first. Serial cable is D-SUB 9P cross cable on PC CONTROL port. Pinout documented in source (2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS).

## Traits
```yaml
traits:
  - powerable     # inferred from POWER ON / POWER OFF commands
  - queryable     # inferred from many query/status request commands
  - routable      # inferred from INPUT SW CHANGE command
  - levelable     # inferred from PICTURE ADJUST / VOLUME ADJUST / GAIN commands
  - muteable      # inferred from picture/sound/onscreen mute commands
```

## Actions
```yaml
# Checksum (CKS): low-order 8 bits of sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (model-specific).
# Commands shown as the "Command" frame from source; responses omitted here
# and captured in Feedbacks where they carry observable state.

actions:

  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While power-on in progress, no other command accepted.

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While power-off in progress (incl. cooling), no other command accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (see Appendix "Supplementary Information by Command"; example 06h = video port).
    notes: Example switching to video port → "02h 03h 00h 00h 02h 01h 06h 0Eh".

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Mute turned off by input/video signal switch.

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: Mute turned off by input/video signal switch or volume adjustment.

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: Mute turned off by input/video signal switch.

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits).
    notes: Brightness=+10 → "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h". Brightness=-10 → "03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch".

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits).
    notes: Volume=10 → "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for aspect (see Appendix "Supplementary Information by Command").

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target. Documented: DATA01=96h / DATA02=FFh → LAMP ADJUST / LIGHT ADJUST."
      - name: DATA02
        type: integer
        description: Adjustment target secondary (e.g. FFh).
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits).

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns 98 bytes including projector name, lamp usage time, filter usage time.

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    notes: Lamp usage query → "03h 96h 00h 00h 02h 00h 01h 9Ch". Negative remaining life returned if deadline exceeded.

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (see Key code list in source).
      - name: DATA02
        type: integer
        description: Key code high byte (see Key code list in source).
    notes: "Documented key codes (DATA01 DATA02 / name): 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO. AUTO example → 02h 0Fh 00h 00h 02h 05h 00h 18h."

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

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (documented: 06h=Periphery Focus)."
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: After 7Fh or 81h, send 00h to stop driving. Lens can be re-driven without stop while in motion.

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (same encoding as LENS CONTROL DATA01).

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (FFh=Stop). When Stop, DATA02-DATA04 not referenced."
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits).

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: Controls profile number selected via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Response bitfield - Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation).

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: Brightness query example → "03h 05h 00h 00h 03h 00h 00h 00h 0Bh".

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type, sound function, profile number.

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status, cooling, power on/off process, operation status.

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns signal switch process, signal list number (returned-1), signal types, test pattern, content displayed.

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display states.

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns "Light mode" or "Lamp mode" depending on projector.

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for eco mode (see Appendix "Supplementary Information by Command").

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
    params:
      - name: name_bytes
        type: string
        description: Projector name (up to 16 bytes; DATA01-DATA16).
    notes: Command template shows 16 data bytes + terminator 00h before CKS.

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: integer
        description: "Setting value (varies by DATA01; e.g. for MODE: 00h=PIP, 01h=PICTURE BY PICTURE; for START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Returns operation status, content displayed, signal types, mute/freeze states.

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (see Appendix "Supplementary Information by Command").
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# All command responses use a frame whose first byte identifies direction:
#   A0h/A1h/A2h/A3h = response (ack/error) frame; 20h/21h/22h/23h = data frame
# returned by queries. ERR1/ERR2 carry failure cause (see Notes section).
# Below: observable state shapes from the documented query responses.

feedbacks:
  - id: error_status
    type: bytes
    description: 12-byte error bitfield returned by 009 ERROR STATUS REQUEST (bit=1 means error).

  - id: projector_information
    type: bytes
    description: 98-byte info block from 037 INFORMATION REQUEST. Includes projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90).

  - id: filter_usage_information
    type: bytes
    description: 8-byte block from 037-3. DATA01-04 = filter usage time (seconds), DATA05-08 = filter alarm start time (seconds; -1 if undefined).

  - id: lamp_information
    type: bytes
    description: 6-byte block from 037-4. DATA01=lamp selector, DATA02=content type, DATA03-06=value (usage seconds or remaining life %).

  - id: carbon_savings_information
    type: bytes
    description: 9-byte block from 037-6. DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999).

  - id: lens_position
    type: bytes
    description: 8-byte block from 053-1 LENS CONTROL REQUEST. Upper/lower adjustment range + current value.

  - id: lens_information_bits
    type: bits
    description: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation).

  - id: lens_profile
    type: enum
    description: Returned by 053-11 LENS PROFILE REQUEST.
    values: ["Profile 1", "Profile 2"]

  - id: gain_parameter
    type: bytes
    description: 16-byte block from 060-1. Status, upper/lower/default/current adjustment range, wide/narrow adjustment width, default validity.

  - id: setting_block
    type: bytes
    description: 32-byte block from 078-1 SETTING REQUEST. Base model type, sound function, profile number.

  - id: running_status
    type: enum
    description: Power/cooling/operation status from 078-2 RUNNING STATUS REQUEST.

  - id: input_status
    type: bytes
    description: 16-byte block from 078-3 INPUT STATUS REQUEST.

  - id: mute_status
    type: bytes
    description: Picture/Sound/Onscreen/Forced-onscreen mute + OSD display from 078-4.

  - id: model_name
    type: string
    description: 32-byte NUL-terminated model name string from 078-5.

  - id: cover_status
    type: enum
    description: Returned by 078-6 COVER STATUS REQUEST.
    values: ["Normal (cover opened)", "Cover closed"]

  - id: information_string
    type: string
    description: Variable-length NUL-terminated label/information string from 084 (horizontal or vertical sync frequency).

  - id: eco_mode_value
    type: bytes
    description: Value set for eco/light/lamp mode (097-8).

  - id: lan_projector_name
    type: string
    description: 17-byte NUL-terminated projector name (097-45).

  - id: lan_mac_address
    type: bytes
    description: 6-byte MAC address (097-155).

  - id: pip_pbp_value
    type: bytes
    description: Setting value for MODE / START POSITION / SUB INPUT (097-198).

  - id: edge_blending_mode
    type: enum
    description: Returned by 097-243-1 EDGE BLENDING MODE REQUEST.
    values: ["OFF", "ON"]

  - id: base_model_type
    type: bytes
    description: Base model type + model name from 305-1.

  - id: serial_number
    type: string
    description: 16-byte NUL-terminated serial number (305-2).

  - id: basic_information
    type: bytes
    description: 15-byte block from 305-3 BASIC INFORMATION REQUEST.
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: Picture brightness (adjustable via 030-1 PICTURE ADJUST, DATA01=00h; readable via 060-1 GAIN PARAMETER REQUEST 3, DATA01=00h).

  - id: contrast
    type: integer
    description: Picture contrast (030-1 DATA01=01h; 060-1 DATA01=01h).

  - id: color
    type: integer
    description: Picture color (030-1 DATA01=02h; 060-1 DATA01=02h).

  - id: hue
    type: integer
    description: Picture hue (030-1 DATA01=03h; 060-1 DATA01=03h).

  - id: sharpness
    type: integer
    description: Picture sharpness (030-1 DATA01=04h; 060-1 DATA01=04h).

  - id: volume
    type: integer
    description: Sound volume (030-2 VOLUME ADJUST; 060-1 DATA01=05h).

  - id: lamp_light_adjust
    type: integer
    description: Lamp/Light adjust (030-15 OTHER ADJUST DATA01=96h; 060-1 DATA01=96h).

  - id: aspect
    type: enum
    description: Aspect value (030-12 ASPECT ADJUST).

  - id: eco_mode
    type: bytes
    description: Eco/Light/Lamp mode value (098-8 ECO MODE SET / 097-8 ECO MODE REQUEST).

  - id: lan_projector_name
    type: string
    description: Projector name up to 16 bytes (098-45 LAN PROJECTOR NAME SET / 097-45 LAN PROJECTOR NAME REQUEST).

  - id: lens_profile
    type: enum
    description: Reference lens memory profile (053-10 SET / 053-11 REQUEST).
    values: ["Profile 1", "Profile 2"]
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are direct
# replies to commands. Error responses (A*h frame with ERR1/ERR2) only occur
# after a command was sent.
# UNRESOLVED: no asynchronous event/notification mechanism described in source.
```

## Macros
```yaml
# Source documents no named multi-step macro sequences.
# UNRESOLVED: none described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling time; no other command accepted while in progress
  - power_on   # power-on sequence; no other command accepted while in progress
interlocks:
  - "While POWER ON is in progress, no other command can be accepted (source, 015)."
  - "While POWER OFF is in progress (including cooling time), no other command can be accepted (source, 016)."
  - "Error DATA09 Bit1: interlock switch open (source, error status list)."
  - "DATA04 Bit3: foreign matter sensor error; Bit7: lens not installed properly (source, error status list)."
# UNRESOLVED: source does not document a separate confirmation handshake or
# power-on sequencing procedure beyond the single-command interlock notes above.
```

## Notes
- Manual revision: BDT140013 Revision 7.1.
- Checksum rule (verbatim from source): ① Add all preceding bytes of data. ② Use the value of the low-order one byte (eight bits) of the addition result obtained in ① as the checksum.
- Worked checksum example from source: `20h 81h 01h 60h 01h 00h → sum=103h → CKS=03h`.
- Command/response frame format (verbatim): `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`.
- `ID1` = control ID set on projector; `ID2` = model code (varies by model).
- Response frame direction bytes: `20h/21h/22h/23h` = success/data response; `A0h/A1h/A2h/A3h` = error response frame carrying `<ERR1> <ERR2> <CKS>`.
- Error codes (ERR1/ERR2) documented in source section 2.4 - covers unrecognized command, unsupported model, invalid value, memory errors, no signal, power-off rejection, etc.
- Lamp usage / filter usage times update at one-minute intervals even though resolution is one-second.
- For INPUT STATUS REQUEST (078-3), signal list number returned is `practical_value - 1`.
- For LAMP INFORMATION REQUEST 3, lamp 2 (DATA01=01h) is effective only on two-lamp projector models.
- Baud rate is selectable among 5 values; 115200 listed first in source.
- Serial cable is cross (null-modem) D-SUB 9P; pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.

<!-- UNRESOLVED: wireless LAN standard/data rate not in source (deferred to wireless LAN unit operation manual). -->
<!-- UNRESOLVED: model-specific values for input terminal, aspect, eco mode, and base model type codes referenced as "see Appendix Supplementary Information by Command" - appendix not present in refined source excerpt. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source. -->
<!-- UNRESOLVED: model code (ID2) value for Ma491 Pt not stated in source. -->
<!-- UNRESOLVED: voltage / power / lamp wattage specs not present in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:29:07.996Z
last_checked_at: 2026-06-18T08:27:10.796Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:27:10.796Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "wireless LAN settings (data rate, standard) not in source - see operation manual of wireless LAN unit"
- "no asynchronous event/notification mechanism described in source."
- "none described in source."
- "source does not document a separate confirmation handshake or"
- "wireless LAN standard/data rate not in source (deferred to wireless LAN unit operation manual)."
- "model-specific values for input terminal, aspect, eco mode, and base model type codes referenced as \"see Appendix Supplementary Information by Command\" - appendix not present in refined source excerpt."
- "control ID (ID1) default value not stated in source."
- "model code (ID2) value for Ma491 Pt not stated in source."
- "voltage / power / lamp wattage specs not present in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
