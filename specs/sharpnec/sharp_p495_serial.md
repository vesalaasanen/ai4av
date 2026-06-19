---
spec_id: admin/sharp-nec-p495
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P495 Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC P495"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC P495"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:50:35.527Z
last_checked_at: 2026-06-18T09:02:49.367Z
generated_at: 2026-06-18T09:02:49.367Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state exact P495 model code (ID2) value; it varies by model and must be obtained from the device. Input-terminal enum values, aspect values, eco-mode values, and base-model-type values are referenced as \"see Appendix Supplementary Information by Command\" but that appendix is not present in the refined source excerpt."
  - "source describes no unsolicited notifications; all responses are command acknowledgements."
  - "source documents no named multi-step sequences."
  - "source states no explicit confirmation/interlock procedures beyond"
  - "ID2 model code for P495 not stated in source."
  - "Appendix \"Supplementary Information by Command\" (input terminal, aspect, eco-mode, base-model-type, sub-input enums) not present in refined source excerpt."
  - "firmware version compatibility not stated in source."
  - "protocol version not stated in source."
  - "power/voltage/current specifications not stated in this control-protocol source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:02:49.367Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P495 Control Spec

## Summary
The Sharp/NEC P495 is a large-format professional LCD projector. This spec covers its external control interface over RS-232C serial and wired/wireless LAN (TCP), using a binary frame protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: source does not state exact P495 model code (ID2) value; it varies by model and must be obtained from the device. Input-terminal enum values, aspect values, eco-mode values, and base-model-type values are referenced as "see Appendix Supplementary Information by Command" but that appendix is not present in the refined source excerpt. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists supported rates: 115200/38400/19200/9600/4800 bps; device-selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; no hardware flow-control field stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON / POWER OFF commands
  - queryable  # inferred from many status/information request commands
  - levelable  # inferred from PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST, LENS CONTROL
  - routable  # inferred from INPUT SW CHANGE (input terminal switching)
```

## Actions
```yaml
# Binary frame format (hex bytes, space-separated as in source):
#   <STX-like lead> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# CKS = checksum = low-order byte of sum of all preceding bytes.
# Literal commands below are taken VERBATIM from source. Where a command is
# parameterized, the variable DATA bytes are shown as placeholders.
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
    notes: "While turning on, no other command can be accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (including cooling time), no other command can be accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal byte. Example: 06h = video port. Full enum in Appendix 'Supplementary Information by Command' (not present in source)."
      - name: cks
        type: string
        description: "Checksum byte (computed: low byte of sum of all preceding bytes)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."

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
    notes: "Cleared by input terminal switch, video signal switch, or volume adjustment."

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
    notes: "Cleared by input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Example setting brightness to 10: '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Example setting volume to 10: '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value. Enum in Appendix 'Supplementary Information by Command' (not present in source)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte (with data02): 96h + FFh = LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: string
        description: "Adjustment target low byte (96h/FFh pair => LAMP/LIGHT ADJUST)."
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04 seconds) and filter alarm start time (DATA05-08 seconds); -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Eco mode values reflect eco setting. Negative remaining-life % if replacement deadline exceeded. Example query for lamp usage: '03h 96h 00h 00h 02h 00h 01h 9Ch'."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Returns kilograms (DATA02-05, max 99999 kg) and milligrams (DATA06-09, max 999999 mg)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD type). See key code list: e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
      - name: data02
        type: string
        description: "Key code high byte (00h for all listed codes)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Example sending 'AUTO': '02h 0Fh 00h 00h 02h 05h 00h 18h'."

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target: 06h=Periphery Focus (per source table; full target enum not exhaustively listed)."
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive + continuous, 81h=drive - continuous, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Send 00h after 7Fh/81h to stop. Same command reissued during drive controls lens without a stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (e.g. 06h=Periphery Focus)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Returns upper/lower adjustment limits and current value (DATA02-07)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target; FFh=Stop (adjustment mode/value ignored when FFh)."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Operates on the profile number set via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Returns option (DATA01) and setting value (DATA02: 00h=OFF, 01h=ON)."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected reference lens memory profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Returns status, upper/lower limits, default, current, wide/narrow adjustment widths (DATA01-14). Example for brightness: '03h 05h 00h 00h 03h 00h 00h 00h 0Bh'."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=Off / 01h=On or Not displayed/Displayed)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name NUL-terminated string (DATA01-32)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Returns label/information string length (DATA02) and NUL-terminated string (DATA03+)."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value (DATA01). Value enum in Appendix (not present in source). May correspond to 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name NUL-terminated string (DATA01-17)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input enum in Appendix (not present in source)."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns edge blending setting: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco mode value. Enum in Appendix (not present in source)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
    notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data16} 00h {cks}"
    params:
      - name: data01_to_data16
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: string
        description: "MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values per Appendix (not present in source)."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: string
        description: "Checksum byte (computed)."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name NUL string (DATA03-11), base model type (DATA12-13). Values per Appendix (not present in source)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number NUL-terminated string (DATA01-16)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal. Values per Appendix (not present in source)."
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
      - name: cks
        type: string
        description: "Checksum byte (computed)."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: enum
    description: "Per-command acknowledgement frame returned after every command. Lead byte 2Xh echoes command op; success carries no data part; failure carries ERR1/ERR2."
    values: [success, error]
  - id: error_status_bitfield
    type: bitfield
    description: "009 ERROR STATUS REQUEST response: 12 data bytes (DATA01-12) reporting cover/fan/temperature/power/lamp/formatter/mirror-cover/iris/lens/interlock errors. Bit=0 normal, Bit=1 error."
  - id: power_status
    type: enum
    description: "From 078-2 RUNNING STATUS REQUEST DATA03."
    values: [standby, power_on]
  - id: operation_status
    type: enum
    description: "From 078-2 RUNNING STATUS REQUEST DATA06."
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  - id: cover_status
    type: enum
    description: "From 078-6 COVER STATUS REQUEST."
    values: [normal_opened, cover_closed]
  - id: edge_blending_mode
    type: enum
    description: "From 097-243-1 EDGE BLENDING MODE REQUEST."
    values: [off, on]
```

## Variables
```yaml
variables:
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From 037 / 037-4. Updated at 1-minute intervals."
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From 037 / 037-3. -1 if undefined."
  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From 037-4 (DATA02=04h). Negative if replacement deadline exceeded."
  - id: carbon_savings_kg
    type: integer
    unit: kilogram
    description: "From 037-6 (DATA02-05). Max 99999 kg."
  - id: eco_mode
    type: string
    description: "From 097-8. Value enum in Appendix (not present in source)."
  - id: projector_name
    type: string
    description: "From 097-45 (up to 17 bytes) / set via 098-45 (up to 16 bytes)."
  - id: mac_address
    type: string
    description: "From 097-155. 6-byte MAC."
  - id: model_name
    type: string
    description: "From 078-5."
  - id: serial_number
    type: string
    description: "From 305-2."
  - id: reference_lens_profile
    type: enum
    description: "From 053-11. 00h=Profile 1, 01h=Profile 2."
    values: [profile_1, profile_2]
```

## Events
```yaml
events: []  # UNRESOLVED: source describes no unsolicited notifications; all responses are command acknowledgements.
```

## Macros
```yaml
macros: []  # UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on is in progress."
  - "POWER OFF: no other command accepted during power-off (including cooling time)."
  - "Interlock switch open is reported in ERROR STATUS REQUEST DATA09 Bit1."
  - "Lens not installed properly is reported in ERROR STATUS REQUEST DATA04 Bit7."
# UNRESOLVED: source states no explicit confirmation/interlock procedures beyond
# the power command lock-out windows and the error bitfield above.
```

## Notes
- Command/response framing (from §2.1): `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`. Lead bytes distinguish direction/result: `02h/03h/01h` = command from controller; `22h/23h/21h` = successful acknowledgement; `A2h/A3h/A0h/A1h` = error acknowledgement; `20h` = command (info request).
- Checksum (`<CKS>`) = low-order byte (8 bits) of the sum of all preceding bytes. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → checksum `03h`.
- `ID1` = control ID set on the projector; `ID2` = model code, varies by model (must be read from device / operation manual).
- `LEN` = byte length of the DATA part following LEN.
- Error acknowledgement carries ERR1/ERR2 per §2.4 error code table (e.g. `02h 0Dh` = "command cannot be accepted because the power is off"; `02h 0Eh` = "command execution failed").
- Usage-time fields (lamp, filter) are returned in one-second units but refreshed at one-minute intervals.
- P495 specific values (input terminal enum, aspect enum, eco mode enum, base model type, sub-input values) are deferred to the "Supplementary Information by Command" appendix, which is not present in this refined source excerpt.

<!-- UNRESOLVED: ID2 model code for P495 not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal, aspect, eco-mode, base-model-type, sub-input enums) not present in refined source excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version not stated in source. -->
<!-- UNRESOLVED: power/voltage/current specifications not stated in this control-protocol source. -->
````

53 actions enumerated, one per source row. All hex payloads verbatim. Enums missing → appendix absent → marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:50:35.527Z
last_checked_at: 2026-06-18T09:02:49.367Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:02:49.367Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state exact P495 model code (ID2) value; it varies by model and must be obtained from the device. Input-terminal enum values, aspect values, eco-mode values, and base-model-type values are referenced as \"see Appendix Supplementary Information by Command\" but that appendix is not present in the refined source excerpt."
- "source describes no unsolicited notifications; all responses are command acknowledgements."
- "source documents no named multi-step sequences."
- "source states no explicit confirmation/interlock procedures beyond"
- "ID2 model code for P495 not stated in source."
- "Appendix \"Supplementary Information by Command\" (input terminal, aspect, eco-mode, base-model-type, sub-input enums) not present in refined source excerpt."
- "firmware version compatibility not stated in source."
- "protocol version not stated in source."
- "power/voltage/current specifications not stated in this control-protocol source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
