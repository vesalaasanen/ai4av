---
spec_id: admin/sharpnec-un552vs-tmx9p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC UN552VS TMX9P Control Spec"
manufacturer: Sharp/NEC
model_family: "UN552VS TMX9P"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "UN552VS TMX9P"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:20:03.836Z
last_checked_at: 2026-06-18T09:14:17.353Z
generated_at: 2026-06-18T09:14:17.353Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1); command coverage not verified against UN552VS TMX9P specifically. Input terminal value tables, eco mode values, aspect values, base model type values, and sub-input values are deferred to an \"Appendix: Supplementary Information by Command\" not present in the refined source. ID2 (model code) value for this model not stated. Flow control not stated."
  - "flow control not stated in source (full-duplex mode stated, no HW/SW flow control specified)"
  - "source contains no explicit safety interlock procedures or power-on sequencing"
  - "ID2 model code for UN552VS TMX9P not stated."
  - "input terminal value table (cmd 018, 319-10) not in source."
  - "aspect value table (cmd 030-12) not in source."
  - "eco mode value table (cmd 097-8, 098-8) not in source."
  - "base model type value table (cmd 078-1, 305-1) not in source."
  - "PIP/PbP sub-input value table (cmd 097-198, 098-198) not in source."
  - "serial flow_control not stated."
  - "firmware version compatibility not stated."
  - "whether UN552VS TMX9P supports lamp 2 (two-lamp) fields; source fields conditional on model."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:14:17.353Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC UN552VS TMX9P Control Spec

## Summary
Sharp/NEC display device control spec. Source = "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Device controllable via RS-232C serial (PC CONTROL D-SUB 9P, cross cable) and/or wired/wireless LAN (TCP port 7142). Binary protocol: hex-framed commands with ID1/ID2/LEN/DATA/CKS. Commands span power, input switch, mute, picture/volume/aspect adjust, lens control + memory, info/status queries, eco mode, PIP/PbP, edge blending, audio select, remote key emulation.

<!-- UNRESOLVED: source is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1); command coverage not verified against UN552VS TMX9P specifically. Input terminal value tables, eco mode values, aspect values, base model type values, and sub-input values are deferred to an "Appendix: Supplementary Information by Command" not present in the refined source. ID2 (model code) value for this model not stated. Flow control not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default value not singled out
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex mode stated, no HW/SW flow control specified)
addressing:
  port: 7142  # TCP port per source "Port number" section
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable       # inferred: numerous REQUEST commands return values
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST present
  - routable        # inferred: INPUT SW CHANGE, AUDIO SELECT SET, PIP/PbP sub-input routing present
```

## Actions
```yaml
# Commands carry verbatim hex payloads from source. Frames use format:
#   <lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies by model); CKS = low byte of sum of all preceding bytes.
# Query commands marked kind: query.

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>..<DATA12> <CKS>. DATA01-12 carry bit-packed error flags; bit=0 normal, bit=1 error. See error info list in source."

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning power on, no other command accepted. Response ack: 22h 00h <ID1> <ID2> 00h <CKS>."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning power off (incl. cooling time), no other command accepted. Response ack: 22h 01h <ID1> <ID2> 00h <CKS>."

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal selector. Example value 06h = video port. Full value table in Appendix 'Supplementary Information by Command' (not in source)."
  notes: "Source example switches to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with error (no signal switch)."

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Auto turned off on input/video signal switch."

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Auto turned off on input/video signal switch or volume adjustment."

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Auto turned off on input/video signal switch."

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>..<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set brightness +10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example set brightness -10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01>..<DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set volume 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full value table in Appendix 'Supplementary Information by Command' (not in source)."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01>..<DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Must be 96h (LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Must be FFh per source table"
    - name: DATA03
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: 23h 8Ah <ID1> <ID2> 62h <DATA01>..<DATA98> <CKS>. DATA01-49=projector name (NUL-terminated); DATA50-82 reserved; DATA83-86=lamp usage time (sec); DATA87-90=filter usage time (sec); DATA91-98 reserved. Updated at 1-min intervals."

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response: DATA01-04 filter usage time (sec); DATA05-08 filter alarm start time (sec). -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
  notes: "Example: get lamp usage time -> 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life returns negative if replacement deadline exceeded."

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response: DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte. See key code list."
  notes: "Key code list (DATA01 DATA02 = key): 02h 00h=POWER ON; 03h 00h=POWER OFF; 05h 00h=AUTO; 06h 00h=MENU; 07h 00h=UP; 08h 00h=DOWN; 09h 00h=RIGHT; 0Ah 00h=LEFT; 0Bh 00h=ENTER; 0Ch 00h=EXIT; 0Dh 00h=HELP; 0Fh 00h=MAGNIFY UP; 10h 00h=MAGNIFY DOWN; 13h 00h=MUTE; 29h 00h=PICTURE; 4Bh 00h=COMPUTER1; 4Ch 00h=COMPUTER2; 4Fh 00h=VIDEO1; 51h 00h=S-VIDEO1; 84h 00h=VOLUME UP; 85h 00h=VOLUME DOWN; 8Ah 00h=FREEZE; A3h 00h=ASPECT; D7h 00h=SOURCE; EEh 00h=LAMP MODE/ECO. Example send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. 06h = Periphery Focus (only value tabled in source)."
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop; 01h=drive +1s; 02h=drive +0.5s; 03h=drive +0.25s; 7Fh=drive +; 81h=drive -; FDh=drive -0.25s; FEh=drive -0.5s; FFh=drive -1s"
  notes: "After 7Fh/81h, send DATA02=00h to stop. Same command may be reissued while driving for continuous motion."

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target selector (same space as 053 LENS CONTROL DATA01)"
  notes: "Response: DATA02-03 upper limit; DATA04-05 lower limit; DATA06-07 current value."

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01>..<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; FFh = Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number selected via cmd_053_10_lens_profile_set."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02 setting: 00h=OFF, 01h=ON."

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=stop, 1=operating); Bits5-7 reserved."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01 profile: 00h=Profile 1, 01h=Profile 2. DATA02 reserved."

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Response DATA01 status (00h display-not-possible, 01h adjustment-not-possible, 02h adjustment-possible, FFh no such gain); DATA02-03 upper, DATA04-05 lower, DATA06-07 default, DATA08-09 current, DATA10-11 wide step, DATA12-13 narrow step, DATA14 default validity."

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response: DATA01-03 base model type (Appendix ref); DATA04 sound function (00h no, 01h yes); DATA05 profile (00h none, 01h clock, 02h sleep timer, 03h both); DATA06-32 reserved."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response: DATA03 power status (00h standby, 01h power on, FFh unsupported); DATA04 cooling (00h no, 01h during, FFh unsupported); DATA05 power on/off process (00h no, 01h during, FFh unsupported); DATA06 operation status (00h standby-sleep, 04h power on, 05h cooling, 06h standby-error, 0Fh standby-power-saving, 10h network standby, FFh unsupported)."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: DATA01 signal switch (00h no, 01h during, FFh unsupported); DATA02 signal list number - 1 (00h-C7h, FFh unsupported); DATA03 selection signal type 1 (01h-05h); DATA04 selection signal type 2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER1-5, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER6-10, FFh=Not Source Input); DATA05 signal list type (00h default, 01h user, FFh unsupported); DATA06 test pattern (00h no, 01h yes, FFh unsupported); DATA09 content (00h video, 01h no signal, 02h viewer, 03h test pattern, 04h LAN, FFh unsupported)."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display. Each 00h=off, 01h=on."

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name (NUL-terminated)."

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01 status: 00h=normal (cover opened), 01h=cover closed."

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Info type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: "Response: DATA02 label length; DATA03.. string (NUL-terminated)."

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01 eco-mode value (Appendix ref). May reflect 'Light mode' or 'Lamp mode' depending on model."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name (NUL-terminated)."

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address."

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP / Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Field: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Response DATA02: if MODE -> 00h=PIP, 01h=PbP; if START POSITION -> 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; if SUB INPUT -> see Appendix."

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (Appendix ref). Sets 'Light mode' or 'Lamp mode' depending on model."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16). Followed by 00h terminator."

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP / Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Field: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Value (mode/position per request table; sub input per Appendix)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting: 00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 base model type (Appendix ref); DATA03-11 model name (NUL-terminated); DATA12-13 base model type; DATA14-15 reserved."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number (NUL-terminated)."

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: DATA01 operation status (00h standby-sleep, 04h power on, 05h cooling, 06h standby-error, 0Fh standby-power-saving, 10h network-standby); DATA02 content displayed; DATA03 selection signal type 1; DATA04 selection signal type 2; DATA05 display signal type (video formats); DATA06 video mute; DATA07 sound mute; DATA08 onscreen mute; DATA09 freeze status; DATA10-15 reserved."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (Appendix ref)"
    - name: DATA02
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses are command-specific; each action/query above documents its own response frame.
# General response framing:
#   - Success (no data): lead byte 2Xh, no DATA part
#   - Success (with data): lead byte 2Xh, LEN > 0, DATA..., CKS
#   - Failure: lead byte A_Xh with <ERR1> <ERR2> <CKS>
# Error code pairs (ERR1 ERR2):
#   00h 00h = command not recognized
#   00h 01h = command not supported by model
#   01h 00h = specified value invalid
#   01h 01h = specified input terminal invalid
#   01h 02h = specified language invalid
#   02h 00h = memory allocation error
#   02h 02h = memory in use
#   02h 03h = specified value cannot be set
#   02h 04h = forced onscreen mute on
#   02h 06h = viewer error
#   02h 07h = no signal
#   02h 08h = test pattern or filter displayed
#   02h 09h = no PC card inserted
#   02h 0Ah = memory operation error
#   02h 0Ch = entry list displayed
#   02h 0Dh = command not accepted because power is off
#   02h 0Eh = command execution failed
#   02h 0Fh = no authority for operation
#   03h 00h = specified gain number incorrect
#   03h 01h = specified gain invalid
#   03h 02h = adjustment failed
```

## Variables
```yaml
# Settable non-discrete parameters are expressed as Actions with params (PICTURE ADJUST,
# VOLUME ADJUST, OTHER/LAMP ADJUST, LENS CONTROL 2). No additional Variables section
# required beyond those parameterized actions.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are solicited.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015) blocks all other commands while power-on sequence executes."
  - "POWER OFF (016) blocks all other commands during power-off incl. cooling time."
  - "02h 0Dh error: command rejected while projector power is off."
# UNRESOLVED: source contains no explicit safety interlock procedures or power-on sequencing
# requirements beyond the per-command blocking notes above. No voltage/current/power specs stated.
```

## Notes
- Source document title: "Projector Control Command Reference Manual", BDT140013 Revision 7.1. Generic manual — not UN552VS-specific. Many value tables deferred to "Appendix: Supplementary Information by Command" not present in refined source.
- All command/response frames are hexadecimal. Format: `<lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 = projector's control ID; ID2 = model code (model-specific, value for UN552VS not stated).
- Checksum: low-order byte of the sum of all preceding bytes.
- Baud rate selectable from 115200 / 38400 / 19200 / 9600 / 4800 bps; chosen default value not singled out in source.
- LAN mode: wired (10/100 Mbps auto) or wireless (via separate wireless LAN unit). TCP port 7142 for both send/receive.
- Several commands accept value tables referenced but not reproduced here (input terminal, aspect, eco mode, base model type, sub-input). Marked UNRESOLVED where relevant.

<!-- UNRESOLVED: ID2 model code for UN552VS TMX9P not stated. -->
<!-- UNRESOLVED: input terminal value table (cmd 018, 319-10) not in source. -->
<!-- UNRESOLVED: aspect value table (cmd 030-12) not in source. -->
<!-- UNRESOLVED: eco mode value table (cmd 097-8, 098-8) not in source. -->
<!-- UNRESOLVED: base model type value table (cmd 078-1, 305-1) not in source. -->
<!-- UNRESOLVED: PIP/PbP sub-input value table (cmd 097-198, 098-198) not in source. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: whether UN552VS TMX9P supports lamp 2 (two-lamp) fields; source fields conditional on model. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:20:03.836Z
last_checked_at: 2026-06-18T09:14:17.353Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:14:17.353Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1); command coverage not verified against UN552VS TMX9P specifically. Input terminal value tables, eco mode values, aspect values, base model type values, and sub-input values are deferred to an \"Appendix: Supplementary Information by Command\" not present in the refined source. ID2 (model code) value for this model not stated. Flow control not stated."
- "flow control not stated in source (full-duplex mode stated, no HW/SW flow control specified)"
- "source contains no explicit safety interlock procedures or power-on sequencing"
- "ID2 model code for UN552VS TMX9P not stated."
- "input terminal value table (cmd 018, 319-10) not in source."
- "aspect value table (cmd 030-12) not in source."
- "eco mode value table (cmd 097-8, 098-8) not in source."
- "base model type value table (cmd 078-1, 305-1) not in source."
- "PIP/PbP sub-input value table (cmd 097-198, 098-198) not in source."
- "serial flow_control not stated."
- "firmware version compatibility not stated."
- "whether UN552VS TMX9P supports lamp 2 (two-lamp) fields; source fields conditional on model."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
