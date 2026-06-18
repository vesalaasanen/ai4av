---
spec_id: admin/sharp-nec-ld-fe122
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe122 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe122"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe122"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:09:46.706Z
last_checked_at: 2026-06-17T20:05:35.755Z
generated_at: 2026-06-17T20:05:35.755Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model marketing name and firmware compatibility not stated in this command reference; supplemental appendix (input terminal values, base model type values) referenced but not included in the refined source."
  - "source describes no unsolicited notifications; projector responds only to commands."
  - "source describes no multi-step command sequences."
  - "no explicit safety interlock procedures or power-on sequencing requirements stated beyond the command-lockout notes above."
  - "input terminal value table (appendix \"Supplementary Information by Command\") not included in refined source."
  - "base model type value table not included in refined source."
  - "eco mode value table not included in refined source."
  - "sub input setting value table (PIP/PbP) not included in refined source."
  - "LENS CONTROL (053) DATA01 adjustment-target table truncated in source (only 06h=Periphery Focus shown)."
  - "LENS CONTROL 2 (053-2) DATA01 adjustment-target table truncated in source."
  - "factory-default baud rate not stated (only the selectable list)."
  - "firmware version compatibility not stated."
  - "wireless LAN unit part numbers / supported models not stated (deferred to operation manual)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:05:35.755Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly to source hex payloads; transport parameters fully supported; bidirectional coverage complete. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe122 Control Spec

## Summary
Sharp/NEC projector (Ld Fe122) controlled via RS-232C serial or wired/wireless LAN (TCP). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, edge blending, PIP/PbP, and audio select. Commands are hex-framed with a control ID, model code, data length, and a low-byte additive checksum.

<!-- UNRESOLVED: exact model marketing name and firmware compatibility not stated in this command reference; supplemental appendix (input terminal values, base model type values) referenced but not included in the refined source. -->

## Transport
```yaml
# Source documents BOTH serial (RS-232C) and LAN (TCP) interfaces.
# Commands are identical binary frames over either transport.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex; RTS/CTS wired per pin table but no hw flow control stated
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
# Frame format (from section 2.1 / 2.2):
#   <header> <opcode> <ID1> <ID2> <LEN> <DATA...> <CKS>
# header: 00h=query, 01h=set(type1), 02h=set(type2), 03h=set(type3);
#         response echoes header with 0x20 (ack) or 0x80 (error) added.
# ID1 = control ID set on projector; ID2 = model code.
# CKS = low byte of sum of all preceding bytes.
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many REQUEST commands returning status
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST, OTHER ADJUST
  - routable     # inferred: INPUT SW CHANGE, AUDIO SELECT SET, PIP SUB INPUT set
```

## Actions
```yaml
# All commands are hex bytes. Literal payloads are shown verbatim from the source.
# Default payloads assume ID1=00h, ID2=00h; CKS is the precomputed checksum for that
# default case. When ID1/ID2 differ, recompute CKS = low-byte(sum of preceding bytes).
# Parameterized commands show the variable DATA bytes in braces; CKS recomputed.
actions:
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02 03 00 00 02 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h = video port). See appendix 'Supplementary Information by Command' for full value table."
    notes: "Response DATA01=FFh means ended with error (no signal switch)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02 10 00 00 00 12"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02 11 00 00 00 13"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02 12 00 00 00 14"
    params: []
    notes: "Cleared by input switch, video signal switch, or volume adjustment."

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02 13 00 00 00 15"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02 14 00 00 00 16"
    params: []

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. See appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte (96h for LAMP/LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: "Key code high byte (typically 00h)"

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (e.g. 06h=Periphery Focus; full table truncated in source)"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Lens can be redirected mid-drive by re-issuing same command."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (FFh=Stop; other values truncated in source)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=FFh (Stop), mode and value are not referenced."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls the profile selected via LENS PROFILE SET (053-10)."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01 98 00 00 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. See appendix 'Supplementary Information by Command'."
    notes: "Sets Light mode or Lamp mode depending on projector."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C {DATA01..DATA16} 00 {CKS}"
    params:
      - name: DATA01..DATA16
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POS: 00h=TL,01h=TR,02h=BL,03h=BR; SUB INPUT values in appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal. See appendix 'Supplementary Information by Command'."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

  # --- Query commands (kind: query) ---

  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00 88 00 00 00 88"
    params: []
    notes: "Returns DATA01-DATA12 bitfield error info (cover, fan, temp, lamp, mirror cover, interlock, etc.)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=usage time (sec), 04h=remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (see 053. LENS CONTROL)"
    notes: "Returns upper/lower adjustment range and current value (16-bit each)."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=stop, 1=operating)."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute state and OSD display state."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "Returns 00h=normal (cover opened), 01h=cover closed."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns operation status, content displayed, signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: raw
    description: "Ack response frame: header byte with 0x20 added (e.g. 22h for 02h-class), followed by opcode, ID1, ID2, LEN=00h, CKS."

  - id: command_error
    type: raw
    description: "Error response frame: header byte with 0x80 added (e.g. A2h for 02h-class), followed by opcode, ID1, ID2, LEN=02h, ERR1, ERR2, CKS. See Error code list."

  - id: error_status
    type: bitfield
    description: "DATA01-DATA12 bitfield from ERROR STATUS REQUEST. Bits flag cover/fan/temp/power/lamp/mirror-cover/interlock/system errors."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "From RUNNING STATUS REQUEST DATA06 (operation status)."

  - id: mute_state
    type: object
    description: "From MUTE STATUS REQUEST: picture/sound/onscreen/forced-onscreen mute + OSD display."

  - id: cover_state
    type: enum
    values: [normal_opened, closed]
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    description: "Via PICTURE ADJUST (DATA01=00h). Range from GAIN PARAMETER REQUEST 3."

  - id: picture_contrast
    type: integer
    description: "Via PICTURE ADJUST (DATA01=01h)."

  - id: picture_color
    type: integer
    description: "Via PICTURE ADJUST (DATA01=02h)."

  - id: picture_hue
    type: integer
    description: "Via PICTURE ADJUST (DATA01=03h)."

  - id: picture_sharpness
    type: integer
    description: "Via PICTURE ADJUST (DATA01=04h)."

  - id: volume
    type: integer
    description: "Via VOLUME ADJUST."

  - id: lamp_light_adjust
    type: integer
    description: "Via OTHER ADJUST (DATA01=96h, DATA02=FFh)."

  - id: eco_mode
    type: integer
    description: "Via ECO MODE SET / ECO MODE REQUEST."

  - id: projector_name
    type: string
    description: "Via LAN PROJECTOR NAME SET (up to 16 bytes)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; projector responds only to commands.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "POWER ON / POWER OFF reject all other commands during power transition and cooling time."
  - "Error code 02h/0Dh: 'command cannot be accepted because the power is off'."
  - "Error code 02h/0Fh: 'no authority necessary for the operation'."
  - "Lens continuous drive (053. LENS CONTROL DATA02=7Fh/81h) requires explicit Stop (00h) to halt."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements stated beyond the command-lockout notes above.
```

## Notes
- Command frame structure: `<header> <opcode> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Header class: 00h=query, 01h/02h/03h=set variants. Response sets header bit 5 (0x20) on success or bit 7 (0x80) on error.
- ID1 = projector control ID; ID2 = model code (varies by model). Default payloads in source assume 00h/00h.
- Checksum = low-order byte of the sum of all preceding bytes (including header, opcode, IDs, LEN, DATA).
- Lamp/filter usage times returned in one-second units but updated at one-minute intervals.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- Baud rate is selectable from {115200, 38400, 19200, 9600, 4800}; spec lists 115200 as the default-shown value but does not state which is factory default.
- Serial cable is cross (null-modem); PC CONTROL port is D-SUB 9P.
- LAN: wired (10/100 auto-sensing RJ-45) or wireless (via separate wireless LAN unit).

<!-- UNRESOLVED: input terminal value table (appendix "Supplementary Information by Command") not included in refined source. -->
<!-- UNRESOLVED: base model type value table not included in refined source. -->
<!-- UNRESOLVED: eco mode value table not included in refined source. -->
<!-- UNRESOLVED: sub input setting value table (PIP/PbP) not included in refined source. -->
<!-- UNRESOLVED: LENS CONTROL (053) DATA01 adjustment-target table truncated in source (only 06h=Periphery Focus shown). -->
<!-- UNRESOLVED: LENS CONTROL 2 (053-2) DATA01 adjustment-target table truncated in source. -->
<!-- UNRESOLVED: factory-default baud rate not stated (only the selectable list). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: wireless LAN unit part numbers / supported models not stated (deferred to operation manual). -->
````

Spec done. 53 actions enumerated — 20 set/action + 33 query. Both serial + TCP transport captured. All hex payloads verbatim. Appendix value tables (input terminal, eco mode, base model type, sub input) flagged UNRESOLVED — refined source truncated them.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:09:46.706Z
last_checked_at: 2026-06-17T20:05:35.755Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:05:35.755Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly to source hex payloads; transport parameters fully supported; bidirectional coverage complete. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model marketing name and firmware compatibility not stated in this command reference; supplemental appendix (input terminal values, base model type values) referenced but not included in the refined source."
- "source describes no unsolicited notifications; projector responds only to commands."
- "source describes no multi-step command sequences."
- "no explicit safety interlock procedures or power-on sequencing requirements stated beyond the command-lockout notes above."
- "input terminal value table (appendix \"Supplementary Information by Command\") not included in refined source."
- "base model type value table not included in refined source."
- "eco mode value table not included in refined source."
- "sub input setting value table (PIP/PbP) not included in refined source."
- "LENS CONTROL (053) DATA01 adjustment-target table truncated in source (only 06h=Periphery Focus shown)."
- "LENS CONTROL 2 (053-2) DATA01 adjustment-target table truncated in source."
- "factory-default baud rate not stated (only the selectable list)."
- "firmware version compatibility not stated."
- "wireless LAN unit part numbers / supported models not stated (deferred to operation manual)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
