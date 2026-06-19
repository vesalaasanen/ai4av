---
spec_id: admin/sharp-nec-pn-la752
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn La752 Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn La752"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn La752"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:52:12.681Z
last_checked_at: 2026-06-18T09:09:27.194Z
generated_at: 2026-06-18T09:09:27.194Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default baud rate not stated (5 rates supported); flow control not specified; input-terminal value table, aspect value table, eco-mode value table, sub-input value table and base-model-type table referenced as \"Appendix: Supplementary Information by Command\" but not present in the refined source text."
  - "source lists 5 supported rates but states no default"
  - "not specified (RTS/CTS pins present on D-SUB 9P but flow-control mode not documented)"
  - "appendix not present in refined source.\""
  - "appendix not present.\""
  - "value set referenced to appendix not present in source"
  - "bounds obtainable only at runtime via 060-1 GAIN PARAMETER REQUEST 3"
  - "aspect value table referenced to appendix not present"
  - "eco-mode value table referenced to appendix not present"
  - "source documents no unsolicited notifications; all responses are"
  - "source documents no multi-step command sequences. Populate if a"
  - "source contains no explicit safety warnings or interlock"
  - "default baud rate (5 supported, none marked default)."
  - "serial flow-control mode."
  - "firmware version compatibility."
  - "Appendix value tables (input terminal, aspect, eco mode, sub input, base model type, selection signal type)."
  - "exact model code (ID2) value for Pn La752."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:09:27.194Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pn La752 Control Spec

## Summary
Control spec for the Sharp/NEC Pn La752 projector, derived from the vendor "Projector Control Command Reference Manual" (document BDT140013, revision 7.1). The device supports RS-232C serial control and TCP/IP LAN control (wired/wireless). Commands use a binary frame format with hex opcodes, an ID1/ID2/model-code header (on responses), variable-length DATA fields, and a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). This revision enumerates all 53 commands documented in the source: power, mute, input switching, picture/volume/aspect/gain adjust, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a large set of status/information queries.

<!-- UNRESOLVED: default baud rate not stated (5 rates supported); flow control not specified; input-terminal value table, aspect value table, eco-mode value table, sub-input value table and base-model-type table referenced as "Appendix: Supplementary Information by Command" but not present in the refined source text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: null  # UNRESOLVED: source lists 5 supported rates but states no default
  supported_baud_rates: [4800, 9600, 19200, 38400, 115200]  # verbatim from source comm-conditions table
  data_bits: 8
  parity: none
  stop_bits: 1
  communication_mode: full_duplex  # stated in source
  flow_control: null  # UNRESOLVED: not specified (RTS/CTS pins present on D-SUB 9P but flow-control mode not documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred: large set of status/information request commands
  - levelable    # inferred: PICTURE/VOLUME/ASPECT/GAIN adjust commands (030-1, 030-2, 030-12, 030-15)
  - routable     # inferred: INPUT SW CHANGE and AUDIO SELECT SET commands (018, 319-10)
```

## Actions
```yaml
# Command frame (from source §2.1): hex bytes with trailing checksum (CKS).
# CKS = low-order 8 bits of the sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# Enum/parameter value tables referenced as "Appendix: Supplementary Information
# by Command" are not present in the refined source - marked UNRESOLVED where
# a documented value set is missing.

- id: cmd_009_error_status_request
  label: "009. Error Status Request"
  kind: query
  command: "00 88 00 00 00 88"
  params: []
  notes: "Returns DATA01-DATA12 error bitmaps (cover, fan, temp, lamp, formatter, FPG, mirror cover, interlock, system errors). See source §3.1 for the full error-information bit list."

- id: cmd_015_power_on
  label: "015. Power On"
  kind: action
  command: "02 00 00 00 00 02"
  params: []
  notes: "While turning on, no other command accepted."

- id: cmd_016_power_off
  label: "016. Power Off"
  kind: action
  command: "02 01 00 00 00 03"
  params: []
  notes: "During power-off (including cooling time), no other command accepted."

- id: cmd_018_input_sw_change
  label: "018. Input SW Change"
  kind: action
  command: "02 03 00 00 02 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (hex). Source example uses 06h = video port. Full value table is in the Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not present in refined source."
  notes: "Example from source: 02 03 00 00 02 01 06 0E (switch to video port). Response DATA01=FFh means ended with error (no switch)."

- id: cmd_020_picture_mute_on
  label: "020. Picture Mute On"
  kind: action
  command: "02 10 00 00 00 12"
  params: []
  notes: "Cleared by input/video-signal switch."

- id: cmd_021_picture_mute_off
  label: "021. Picture Mute Off"
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: cmd_022_sound_mute_on
  label: "022. Sound Mute On"
  kind: action
  command: "02 12 00 00 00 14"
  params: []
  notes: "Cleared by input/video-signal switch or volume adjustment."

- id: cmd_023_sound_mute_off
  label: "023. Sound Mute Off"
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: cmd_024_onscreen_mute_on
  label: "024. Onscreen Mute On"
  kind: action
  command: "02 14 00 00 00 16"
  params: []
  notes: "Cleared by input/video-signal switch."

- id: cmd_025_onscreen_mute_off
  label: "025. Onscreen Mute Off"
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: cmd_030_1_picture_adjust
  label: "030-1. Picture Adjust"
  kind: action
  command: "03 10 00 00 05 {data01} FF {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)."
    - name: data02
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)."
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "Source example: brightness=10 → 03 10 00 00 05 00 FF 00 0A 00 21. Response DATA01-DATA02 = 0000h means success."

- id: cmd_030_2_volume_adjust
  label: "030-2. Volume Adjust"
  kind: action
  command: "03 10 00 00 05 05 00 {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)."
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "Source example: volume=10 → 03 10 00 00 05 05 00 00 0A 00 27."

- id: cmd_030_12_aspect_adjust
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03 10 00 00 05 18 00 00 {data01} 00 {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value byte. Value table is in the Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not present in refined source."

- id: cmd_030_15_other_adjust
  label: "030-15. Other Adjust"
  kind: action
  command: "03 10 00 00 05 {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte. Source documents DATA01=96h / DATA02=FFh = LAMP ADJUST / LIGHT ADJUST."
    - name: data02
      type: string
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)."
    - name: data03
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)."
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: cmd_037_information_request
  label: "037. Information Request"
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03 95 00 00 00 98"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. Returns -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03 96 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only on two-lamp models)."
    - name: data02
      type: string
      description: "Content (01h=lamp usage time seconds, 04h=lamp remaining life %)."
  notes: "Eco-mode values reflect eco mode when enabled. Remaining life goes negative past replacement deadline."

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03 9A 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Content (00h=Total Carbon Savings, 01h=Carbon Savings during operation)."
  notes: "DATA02-05 = kilograms (max 99999), DATA06-09 = milligrams (max 999999)."

- id: cmd_050_remote_key_code
  label: "050. Remote Key Code"
  kind: action
  command: "02 0F 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD key code)."
    - name: data02
      type: string
      description: "Key code high byte."
  notes: "Sends a remote-control key code. Documented key codes (key, DATA01, DATA02): 2=02 00 POWER ON; 3=03 00 POWER OFF; 5=05 00 AUTO; 6=06 00 MENU; 7=07 00 UP; 8=08 00 DOWN; 9=09 00 RIGHT; 10=0A 00 LEFT; 11=0B 00 ENTER; 12=0C 00 EXIT; 13=0D 00 HELP; 15=0F 00 MAGNIFY UP; 16=10 00 MAGNIFY DOWN; 19=13 00 MUTE; 41=29 00 PICTURE; 75=4B 00 COMPUTER1; 76=4C 00 COMPUTER2; 79=4F 00 VIDEO1; 81=51 00 S-VIDEO1; 132=84 00 VOLUME UP; 133=85 00 VOLUME DOWN; 138=8A 00 FREEZE; 163=A3 00 ASPECT; 215=D7 00 SOURCE; 238=EE 00 LAMP MODE/ECO. AUTO example: 02 0F 00 00 02 05 00 18."

- id: cmd_051_shutter_close
  label: "051. Shutter Close"
  kind: action
  command: "02 16 00 00 00 18"
  params: []
  notes: "Closes the lens shutter."

- id: cmd_052_shutter_open
  label: "052. Shutter Open"
  kind: action
  command: "02 17 00 00 00 19"
  params: []
  notes: "Opens the lens shutter."

- id: cmd_053_lens_control
  label: "053. Lens Control"
  kind: action
  command: "02 18 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target. Source documents 06h=Periphery Focus."
    - name: data02
      type: string
      description: "Content (00h=Stop; 01h=drive 1s plus; 02h=drive 0.5s plus; 03h=drive 0.25s plus; 7Fh=drive plus; 81h=drive minus; FDh=drive 0.25s minus; FEh=drive 0.5s minus; FFh=drive 1s minus)."
  notes: "After 7Fh/81h, send 00h to stop. Same command can be reissued while driving to change direction without an explicit stop."

- id: cmd_053_1_lens_control_request
  label: "053-1. Lens Control Request"
  kind: query
  command: "02 1C 00 00 02 {data01} 00 {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target to query (value set not enumerated in source)."
  notes: "Returns upper/lower adjustment limits and current value (16-bit each)."

- id: cmd_053_2_lens_control_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02 1D 00 00 04 {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (FFh=Stop)."
    - name: data02
      type: string
      description: "Adjustment mode (00h=absolute, 02h=relative)."
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "When DATA01=FFh (Stop), mode and value are ignored."

- id: cmd_053_3_lens_memory_control
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02 1E 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)."

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02 1F 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)."
  notes: "Operates on the profile number set via 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02 20 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)."
  notes: "Returns setting value (00h=OFF, 01h=ON)."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02 21 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)."
    - name: data02
      type: string
      description: "Setting value (00h=OFF, 01h=ON)."

- id: cmd_053_7_lens_information_request
  label: "053-7. Lens Information Request"
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []
  notes: "Returns DATA01 bitmap: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - each 0=Stop / 1=During operation."

- id: cmd_053_10_lens_profile_set
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02 27 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number (00h=Profile 1, 01h=Profile 2)."

- id: cmd_053_11_lens_profile_request
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02 28 00 00 00 2A"
  params: []
  notes: "Returns selected reference-lens-memory profile (00h=Profile 1, 01h=Profile 2)."

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03 05 00 00 03 {data01} 00 00 {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)."
  notes: "Brightness example: 03 05 00 00 03 00 00 00 0B. Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

- id: cmd_078_1_setting_request
  label: "078-1. Setting Request"
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05). Base-model-type values are in the Appendix - UNRESOLVED: appendix not present."

- id: cmd_078_2_running_status_request
  label: "078-2. Running Status Request"
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: cmd_078_3_input_status_request
  label: "078-3. Input Status Request"
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []
  notes: "Returns signal switch process, signal list number (returned value is practical number −1), selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: cmd_078_4_mute_status_request
  label: "078-4. Mute Status Request"
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display flags."

- id: cmd_078_5_model_name_request
  label: "078-5. Model Name Request"
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cmd_078_6_cover_status_request
  label: "078-6. Cover Status Request"
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []
  notes: "Returns mirror/lens cover status (00h=Normal/opened, 01h=Cover closed)."

- id: cmd_079_freeze_control
  label: "079. Freeze Control"
  kind: action
  command: "01 98 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off."

- id: cmd_084_information_string_request
  label: "084. Information String Request"
  kind: query
  command: "00 D0 00 00 03 00 {data01} 01 {cks}"
  params:
    - name: data01
      type: string
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)."
  notes: "Returns label/info string length and NUL-terminated string."

- id: cmd_097_8_eco_mode_request
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []
  notes: "Returns eco/light/lamp mode value. Value table in the Appendix - UNRESOLVED: appendix not present."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

- id: cmd_097_155_lan_mac_address_status_request_2
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []
  notes: "Returns 6-byte MAC address."

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/Picture By Picture Request"
  kind: query
  command: "03 B0 00 00 02 C5 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)."
  notes: "Sub-input setting values are in the Appendix - UNRESOLVED: appendix not present."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []
  notes: "Returns edge-blending setting (00h=OFF, 01h=ON)."

- id: cmd_098_8_eco_mode_set
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03 B1 00 00 02 07 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco/light/lamp mode value. Value table in the Appendix - UNRESOLVED: appendix not present."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03 B1 00 00 12 2C {data01..data16} 00 {cks}"
  params:
    - name: data01_data16
      type: string
      description: "Projector name, up to 16 bytes."
  notes: "Trailing 00h terminator after the 16-byte name field."

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/Picture By Picture Set"
  kind: action
  command: "03 B1 00 00 03 C5 {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)."
    - name: data02
      type: string
      description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03 B1 00 00 03 DF 00 {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value (00h=OFF, 01h=ON)."

- id: cmd_305_1_base_model_type_request
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11). Base-model-type values in the Appendix - UNRESOLVED: appendix not present."

- id: cmd_305_2_serial_number_request
  label: "305-2. Serial Number Request"
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []
  notes: "Returns serial number (DATA01-16, NUL-terminated)."

- id: cmd_305_3_basic_information_request
  label: "305-3. Basic Information Request"
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []
  notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

- id: cmd_319_10_audio_select_set
  label: "319-10. Audio Select Set"
  kind: action
  command: "03 C9 00 00 03 09 {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte. Value table in the Appendix - UNRESOLVED: appendix not present."
    - name: data02
      type: string
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)."
```

## Feedbacks
```yaml
# All request commands above return device state as a response. Representative
# observable feedback targets (values decoded per source §3):

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST (DATA03, DATA06)"

- id: input_signal
  type: object
  source: "078-3 INPUT STATUS REQUEST (signal list number, selection signal type 1/2)"

- id: mute_state
  type: object
  source: "078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced-onscreen/OSD)"

- id: error_status
  type: object
  source: "009 ERROR STATUS REQUEST (DATA01-12 error bitmaps)"

- id: lamp_usage_time_seconds
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=01h)"

- id: lamp_remaining_life_percent
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=04h); may be negative past deadline"

- id: filter_usage_time_seconds
  type: integer
  source: "037-3 FILTER USAGE INFORMATION REQUEST"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST 2"

- id: projector_name
  type: string
  source: "097-45 LAN PROJECTOR NAME REQUEST"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST"

- id: eco_mode
  type: string  # UNRESOLVED: value set referenced to appendix not present in source
  source: "097-8 ECO MODE REQUEST"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"
```

## Variables
```yaml
# Settable parameters (mirror of the corresponding SET actions). All hex values
# are verbatim from source §3.

- id: volume
  set_via: cmd_030_2_volume_adjust
  range: null  # UNRESOLVED: bounds obtainable only at runtime via 060-1 GAIN PARAMETER REQUEST 3
  mode: [absolute, relative]

- id: picture_brightness
  set_via: cmd_030_1_picture_adjust
  param: data01=00h

- id: picture_contrast
  set_via: cmd_030_1_picture_adjust
  param: data01=01h

- id: picture_color
  set_via: cmd_030_1_picture_adjust
  param: data01=02h

- id: picture_hue
  set_via: cmd_030_1_picture_adjust
  param: data01=03h

- id: picture_sharpness
  set_via: cmd_030_1_picture_adjust
  param: data01=04h

- id: aspect
  set_via: cmd_030_12_aspect_adjust
  values: null  # UNRESOLVED: aspect value table referenced to appendix not present

- id: lamp_light_adjust
  set_via: cmd_030_15_other_adjust
  param: data01=96h, data02=FFh

- id: eco_mode
  set_via: cmd_098_8_eco_mode_set
  values: null  # UNRESOLVED: eco-mode value table referenced to appendix not present

- id: edge_blending
  set_via: cmd_098_243_1_edge_blending_mode_set
  values: [off, on]

- id: lan_projector_name
  set_via: cmd_098_45_lan_projector_name_set
  max_length: 16

- id: lens_profile
  set_via: cmd_053_10_lens_profile_set
  values: [profile_1, profile_2]

- id: freeze
  set_via: cmd_079_freeze_control
  values: [on, off]
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are
# replies to commands. Populate if a separate notification section is found.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences. Populate if a
# macro/workflow section is found.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock
# procedures beyond behavioural notes that certain commands block others while
# running:
#   - POWER ON (015): no other command accepted while power-on in progress.
#   - POWER OFF (016): no other command accepted during power-off incl. cooling.
# These are command-timing constraints, not safety interlocks; not populated
# without explicit source safety text.
```

## Notes
- Manual revision: BDT140013 Revision 7.1.
- Checksum (CKS) = low-order 8 bits of the sum of all preceding bytes in the frame. Worked source example: `20h 81h 01h 60h 01h 00h` sums to `103h` → CKS = `03h`.
- ID1 = control ID configured on the projector; ID2 = model code (varies by model). These appear in response frames; the command bytes shown in the source's per-command "Command" block are the literal outbound payload (with final byte = CKS).
- Signal list number returned by 078-3 is the practical number − 1; add 1 to recover the displayed number.
- Lamp/filter usage times update at 1-minute intervals even though stored in 1-second units.
- Lamp remaining-life percent goes negative once the replacement deadline is exceeded.
- Serial cable is a cross (null-modem) cable on the PC CONTROL D-SUB 9P port; LAN cable type (straight/cross) per network admin.
- "Appendix: Supplementary Information by Command" is referenced repeatedly for input-terminal, aspect, eco-mode, sub-input, selection-signal-type and base-model-type value tables, but that appendix is absent from the refined source. All such value sets are marked UNRESOLVED.

<!-- UNRESOLVED: default baud rate (5 supported, none marked default). -->
<!-- UNRESOLVED: serial flow-control mode. -->
<!-- UNRESOLVED: firmware version compatibility. -->
<!-- UNRESOLVED: Appendix value tables (input terminal, aspect, eco mode, sub input, base model type, selection signal type). -->
<!-- UNRESOLVED: exact model code (ID2) value for Pn La752. -->
````

Spec ready. 53 actions = full source coverage. All hex payloads verbatim. UNRESOLVED markers on: default baud, flow control, firmware, appendix value tables, ID2 model code.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:52:12.681Z
last_checked_at: 2026-06-18T09:09:27.194Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:09:27.194Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default baud rate not stated (5 rates supported); flow control not specified; input-terminal value table, aspect value table, eco-mode value table, sub-input value table and base-model-type table referenced as \"Appendix: Supplementary Information by Command\" but not present in the refined source text."
- "source lists 5 supported rates but states no default"
- "not specified (RTS/CTS pins present on D-SUB 9P but flow-control mode not documented)"
- "appendix not present in refined source.\""
- "appendix not present.\""
- "value set referenced to appendix not present in source"
- "bounds obtainable only at runtime via 060-1 GAIN PARAMETER REQUEST 3"
- "aspect value table referenced to appendix not present"
- "eco-mode value table referenced to appendix not present"
- "source documents no unsolicited notifications; all responses are"
- "source documents no multi-step command sequences. Populate if a"
- "source contains no explicit safety warnings or interlock"
- "default baud rate (5 supported, none marked default)."
- "serial flow-control mode."
- "firmware version compatibility."
- "Appendix value tables (input terminal, aspect, eco mode, sub input, base model type, selection signal type)."
- "exact model code (ID2) value for Pn La752."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
