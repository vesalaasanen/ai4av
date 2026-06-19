---
spec_id: admin/sharp-nec-led-fe009i2-165in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE009I2 165in Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE009I2 165in"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE009I2 165in"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:23:02.951Z
last_checked_at: 2026-06-18T08:04:52.762Z
generated_at: 2026-06-18T08:04:52.762Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for this specific model not stated in source — varies by model in use"
  - "input terminal value map referenced in \"Supplementary Information by Command\" appendix not included in this document"
  - "eco mode value map referenced in appendix not included in this document"
  - "firmware version compatibility not stated in source"
  - "flow control not stated; full-duplex mode stated"
  - "appendix not in source."
  - "other axis values not listed in source."
  - "axis selector value map not in source body."
  - "other axis values not listed."
  - "device does not document unsolicited async notifications; all responses are command-triggered."
  - "specific value for FE009I2 not stated."
  - "source documents no unsolicited notifications; all responses are solicited by a command. Populate from source if async events are documented elsewhere."
  - "source documents no multi-step command sequences. Remove if not applicable."
  - "no explicit power-on sequencing procedure or safety interlock procedure stated beyond the power-state command acceptance restrictions above. Do not infer additional safety procedures."
  - "appendix \"Supplementary Information by Command\" referenced multiple times for input terminal values, eco mode values, base model type values, and sub input values — not present in this source document."
  - "default baud rate not stated (source lists 5 supported rates, no default marked)."
  - "serial flow control not explicitly stated (full-duplex mode stated only)."
  - "ID2 model code value for this specific model not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:04:52.762Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE009I2 165in Control Spec

## Summary
Sharp/NEC LED FE009I2 165in projector control spec (manual BDT140013 Rev 7.1). Device supports RS-232C serial control and wired/wireless LAN (TCP port 7142). Commands use a binary frame format with checksum; catalog covers power, input switching, mute, lens control, picture/volume/aspect adjust, and a large set of status/information queries.

<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source — varies by model in use -->
<!-- UNRESOLVED: input terminal value map referenced in "Supplementary Information by Command" appendix not included in this document -->
<!-- UNRESOLVED: eco mode value map referenced in appendix not included in this document -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps (auto/configurable); default value not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex mode stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from 015 POWER ON / 016 POWER OFF commands
  - routable        # inferred from 018 INPUT SW CHANGE command
  - queryable       # inferred from numerous REQUEST commands (009, 037 family, 078 family, 097 family, 305 family)
  - levelable       # inferred from 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
```

## Actions
```yaml
actions:
  - id: error_status_request_009
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: Returns DATA01-DATA12 error status bitmaps (cover/fan/temp/power/lamp errors across 3 status bytes plus extended status). See source section 3.1 for bit definitions.

  - id: power_on_015
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While turning on power, no other command accepted.

  - id: power_off_016
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off power (including cooling time), no other command accepted.

  - id: input_sw_change_018
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal value (e.g. 06h = video port). Full value map in appendix "Supplementary Information by Command" - # UNRESOLVED: appendix not in source.
    notes: Example for video port (DATA01=06h): "02h 03h 00h 00h 02h 01h 06h 0Eh". Response DATA01=FFh means ended with error (no signal switch).

  - id: picture_mute_on_020
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Picture mute turned off by input terminal switch or video signal switch.

  - id: picture_mute_off_021
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on_022
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: Sound mute turned off by input terminal switch, video signal switch, or volume adjustment.

  - id: sound_mute_off_023
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on_024
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: Onscreen mute turned off by input terminal switch or video signal switch.

  - id: onscreen_mute_off_025
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust_030_1
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness.
      - name: DATA02
        type: byte
        description: Adjustment mode - 00h absolute, 01h relative.
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits).
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits).
    notes: Example set brightness to 10: "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h". Response DATA01-DATA02 = 0000h success, other = error.

  - id: volume_adjust_030_2
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment mode - 00h absolute, 01h relative.
      - name: DATA02
        type: byte
        description: Adjustment value (low-order 8 bits).
      - name: DATA03
        type: byte
        description: Adjustment value (high-order 8 bits).
    notes: Example set volume to 10: "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h". Response DATA01-DATA02 = 0000h success.

  - id: aspect_adjust_030_12
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Aspect value. Full value map in appendix - # UNRESOLVED: appendix not in source.
    notes: Response DATA01-DATA02 = 0000h success.

  - id: other_adjust_030_15
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target high byte - 96h for LAMP ADJUST / LIGHT ADJUST.
      - name: DATA02
        type: byte
        description: Adjustment target low byte - FFh for LAMP/LIGHT ADJUST.
      - name: DATA03
        type: byte
        description: Adjustment mode - 00h absolute, 01h relative.
      - name: DATA04
        type: byte
        description: Adjustment value (low-order 8 bits).
      - name: DATA05
        type: byte
        description: Adjustment value (high-order 8 bits).
    notes: Response DATA01-DATA02 = 0000h success.

  - id: information_request_037
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns DATA01-49 projector name (NUL terminated), DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Usage time updated at 1-minute intervals.

  - id: filter_usage_information_request_037_3
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds). -1 if undefined.

  - id: lamp_information_request_3_037_4
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lamp selector - 00h Lamp 1, 01h Lamp 2 (two-lamp models only).
      - name: DATA02
        type: byte
        description: Content - 01h lamp usage time (seconds), 04h lamp remaining life (%).
    notes: Example get lamp 1 usage time: "03h 96h 00h 00h 02h 00h 01h 9Ch". Returns DATA03-06 obtained info. Eco mode reflects in values. Negative remaining life if replacement deadline exceeded.

  - id: carbon_savings_information_request_037_6
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Content - 00h Total Carbon Savings, 01h Carbon Savings during operation.
    notes: Returns DATA02-05 kg (max 99999 kg), DATA06-09 mg (max 999999 mg).

  - id: remote_key_code_050
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Key code low byte (WORD type, see key code list).
      - name: DATA02
        type: byte
        description: Key code high byte.
    notes: Key code list (key=D1 D2 name): 2=02h00h POWER ON, 3=03h00h POWER OFF, 5=05h00h AUTO, 6=06h00h MENU, 7=07h00h UP, 8=08h00h DOWN, 9=09h00h RIGHT, 10=0Ah00h LEFT, 11=0Bh00h ENTER, 12=0Ch00h EXIT, 13=0Dh00h HELP, 15=0Fh00h MAGNIFY UP, 16=10h00h MAGNIFY DOWN, 19=13h00h MUTE, 41=29h00h PICTURE, 75=4Bh00h COMPUTER1, 76=4Ch00h COMPUTER2, 79=4Fh00h VIDEO1, 81=51h00h S-VIDEO1, 132=84h00h VOLUME UP, 133=85h00h VOLUME DOWN, 138=8Ah00h FREEZE, 163=A3h00h ASPECT, 215=D7h00h SOURCE, 238=EEh00h LAMP MODE/ECO. Example AUTO: "02h 0Fh 00h 00h 02h 05h 00h 18h". Response DATA01=FFh means error.

  - id: shutter_close_051
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open_052
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control_053
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lens axis - 06h Periphery Focus. # UNRESOLVED: other axis values not listed in source.
      - name: DATA02
        type: byte
        description: Content - 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +, 81h drive -, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s.
    notes: After 7Fh/81h, send 00h to stop. Lens can be controlled without stop while driving by re-issuing same command.

  - id: lens_control_request_053_1
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lens axis selector. # UNRESOLVED: axis selector value map not in source body.
    notes: Returns DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit signed).

  - id: lens_control_2_053_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lens axis - FFh Stop. # UNRESOLVED: other axis values not listed.
      - name: DATA02
        type: byte
        description: Adjustment mode - 00h absolute, 02h relative (ignored if DATA01=FFh Stop).
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits).
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits).

  - id: lens_memory_control_053_3
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Operation - 00h MOVE, 01h STORE, 02h RESET.
    notes: For reference lens memory use 053-4. Response DATA01=FFh means error.

  - id: reference_lens_memory_control_053_4
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Operation - 00h MOVE, 01h STORE, 02h RESET.
    notes: Controls profile number specified by 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request_053_5
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE.
    notes: Returns DATA02 setting value - 00h OFF, 01h ON.

  - id: lens_memory_option_set_053_6
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE.
      - name: DATA02
        type: byte
        description: Setting value - 00h OFF, 01h ON.

  - id: lens_information_request_053_7
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns DATA01 bitmap - Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0=Stop, 1=During operation); Bits 5-7 reserved.

  - id: lens_profile_set_053_10
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Profile number - 00h Profile 1, 01h Profile 2.

  - id: lens_profile_request_053_11
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: Returns DATA01 profile number (00h Profile 1, 01h Profile 2); DATA02 reserved.

  - id: gain_parameter_request_3_060_1
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjusted value name - 00h PICTURE/BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST.
    notes: Example brightness request: "03h 05h 00h 00h 03h 00h 00h 00h 0Bh". Returns DATA01 status (00h display not possible, 01h adjust not possible, 02h possible, FFh no such gain), DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 default, DATA08-09 current, DATA10-11 wide step, DATA12-13 narrow step, DATA14 default valid flag.

  - id: setting_request_078_1
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns DATA01-03 base model type, DATA04 sound function (00h not avail, 01h avail), DATA05 profile (00h none, 01h clock, 02h sleep timer, 03h clock+sleep). Base model type values in appendix - # UNRESOLVED.

  - id: running_status_request_078_2
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns DATA03 power status (00h Standby, 01h Power On, FFh not supported), DATA04 cooling (00h not exec, 01h during), DATA05 power on/off (00h not exec, 01h during), DATA06 operation status (00h Standby/Sleep, 04h Power on, 05h Cooling, 06h Standby/error, 0Fh Standby/Power saving, 10h Network standby).

  - id: input_status_request_078_3
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns DATA01 signal switch (00h not exec, 01h during), DATA02 signal list number-1, DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)), DATA05 signal list type, DATA06 test pattern, DATA09 content displayed.

  - id: mute_status_request_078_4
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off, 01h on for each).

  - id: model_name_request_078_5
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: Returns DATA01-32 model name (NUL terminated).

  - id: cover_status_request_078_6
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: Returns DATA01 - 00h Normal (cover opened), 01h Cover closed.

  - id: freeze_control_079
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Freeze state - 01h On, 02h Off.

  - id: information_string_request_084
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Information type - 03h Horizontal sync frequency, 04h Vertical sync frequency.
    notes: Returns DATA02 string length, DATA03-?? label/information string (NUL terminated).

  - id: eco_mode_request_097_8
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns DATA01 eco mode value. Returns "Light mode" or "Lamp mode" depending on projector. Value map in appendix - # UNRESOLVED.

  - id: lan_projector_name_request_097_45
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: Returns DATA01-17 projector name (NUL terminated).

  - id: lan_mac_address_request_097_155
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: Returns DATA01-06 MAC address (6 bytes).

  - id: pip_pbp_request_097_198
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Content - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3.
    notes: Returns DATA02 setting value. MODE values: 00h PIP, 01h PICTURE BY PICTURE. START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT. Sub input values in appendix - # UNRESOLVED.

  - id: edge_blending_mode_request_097_243_1
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: Returns DATA01 - 00h OFF, 01h ON.

  - id: eco_mode_set_098_8
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Eco mode value. Value map in appendix - # UNRESOLVED.
    notes: Sets "Light mode" or "Lamp mode" depending on projector.

  - id: lan_projector_name_set_098_45
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01-16
        type: bytes
        description: Projector name (up to 16 bytes), NUL-padded.
    notes: Response echoes DATA01.

  - id: pip_pbp_set_098_198
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Content - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3.
      - name: DATA02
        type: byte
        description: Setting value. MODE: 00h PIP, 01h PBP. START POSITION: 00h TL, 01h TR, 02h BL, 03h BR. Sub input values in appendix - # UNRESOLVED.

  - id: edge_blending_mode_set_098_243_1
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Setting value - 00h OFF, 01h ON.

  - id: base_model_type_request_305_1
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: Returns DATA01-02 base model type, DATA03-11 model name (NUL terminated), DATA12-13 base model type. Value map in appendix - # UNRESOLVED.

  - id: serial_number_request_305_2
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: Returns DATA01-16 serial number (NUL terminated).

  - id: basic_information_request_305_3
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Returns DATA01 operation status (00h Standby/Sleep, 04h Power on, 05h Cooling, 06h Standby/error, 0Fh Standby/Power saving, 10h Network standby), DATA02 content displayed, DATA03-04 selection signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status.

  - id: audio_select_set_319_10
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal. Value map in appendix - # UNRESOLVED.
      - name: DATA02
        type: byte
        description: Setting value - 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER.
    notes: Response DATA02 - 00h success, 01h error.
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_ack
    type: raw
    description: >
      Success response shape per command class. Prefix byte indicates class:
      20h/A0h = class-00 commands, 21h/A1h = class-01, 22h/A2h = class-02,
      23h/A3h = class-03. Success responses carry ID1 ID2, LEN, optional DATA,
      CKS. Format: "<prefix> <CMD> <ID1> <ID2> <LEN> [<DATA...>] <CKS>".
  - id: command_error_response
    type: raw
    description: >
      Error response: "A<h> <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>".
      ERR1/ERR2 code map (source section 2.4): 00h00h unrecognized, 00h01h not
      supported by model, 01h00h invalid value, 01h01h invalid input terminal,
      01h02h invalid language, 02h00h memory allocation error, 02h02h memory in
      use, 02h03h value cannot be set, 02h04h forced onscreen mute on, 02h06h
      viewer error, 02h07h no signal, 02h08h test pattern/filter displayed,
      02h09h no PC card inserted, 02h0Ah memory operation error, 02h0Ch entry
      list displayed, 02h0Dh command not accepted (power off), 02h0Eh execution
      failed, 02h0Fh no authority, 03h00h incorrect gain number, 03h01h invalid
      gain, 03h02h adjustment failed.
  - id: error_status_bitmap
    type: raw
    description: 12-byte error bitmap returned by command 009 (see action notes for bit definitions).
# UNRESOLVED: device does not document unsolicited async notifications; all responses are command-triggered.
```

## Variables
```yaml
variables:
  - id: control_id_ID1
    type: byte
    description: Control ID set on the projector; used in every command frame as ID1.
  - id: model_code_ID2
    type: byte
    description: Model code; varies by model in use. # UNRESOLVED: specific value for FE009I2 not stated.
  - id: checksum_CKS
    type: byte
    description: >
      Checksum. Algorithm (source section 2.2): sum all preceding bytes of the
      frame, take low-order one byte (8 bits). Example: 20h+81h+01h+60h+01h+00h
      = 103h → CKS = 03h.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are solicited by a command. Populate from source if async events are documented elsewhere.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences. Remove if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On (015): while turning on, no other command accepted."
  - "Power Off (016): while turning off (including cooling time), no other command accepted."
  - "02h 0Dh error: command not accepted because power is off."
  - "DATA09 Bit1 of error status: interlock switch is open."
# UNRESOLVED: no explicit power-on sequencing procedure or safety interlock procedure stated beyond the power-state command acceptance restrictions above. Do not infer additional safety procedures.
```

## Notes
- Manual identifier: BDT140013 Revision 7.1.
- Command frame format (section 2.1): hex byte string with parameters in italic brackets. General query/response: `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`.
- Class prefix convention: command first byte determines class (00h/01h/02h/03h); success response echoes with bit 5 set (20h/21h/22h/23h), error response with bit 5+bit 7 set (A0h/A1h/A2h/A3h).
- Serial cable is a cross cable (null modem) wired to PC CONTROL D-SUB 9P; pins 2/3 crossed, 5=GND, 7/8 crossed (RTS/CTS).
- LAN wired uses RJ-45; auto-switchable 10/100 Mbps (IEEE 802.3, IEEE 802.3u Auto-Negotiation). Wireless LAN via optional wireless LAN unit (see separate manual).
- Usage-time counters (lamp, filter) update at 1-minute intervals despite 1-second resolution.
- Lamp remaining life returns negative value if replacement deadline exceeded.
<!-- UNRESOLVED: appendix "Supplementary Information by Command" referenced multiple times for input terminal values, eco mode values, base model type values, and sub input values — not present in this source document. -->
<!-- UNRESOLVED: default baud rate not stated (source lists 5 supported rates, no default marked). -->
<!-- UNRESOLVED: serial flow control not explicitly stated (full-duplex mode stated only). -->
<!-- UNRESOLVED: ID2 model code value for this specific model not stated. -->
````

Spec above. 53 actions, every hex payload verbatim. Serial default baud + flow control + model code (ID2) + appendix value maps marked UNRESOLVED per policy — not in source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:23:02.951Z
last_checked_at: 2026-06-18T08:04:52.762Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:04:52.762Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for this specific model not stated in source — varies by model in use"
- "input terminal value map referenced in \"Supplementary Information by Command\" appendix not included in this document"
- "eco mode value map referenced in appendix not included in this document"
- "firmware version compatibility not stated in source"
- "flow control not stated; full-duplex mode stated"
- "appendix not in source."
- "other axis values not listed in source."
- "axis selector value map not in source body."
- "other axis values not listed."
- "device does not document unsolicited async notifications; all responses are command-triggered."
- "specific value for FE009I2 not stated."
- "source documents no unsolicited notifications; all responses are solicited by a command. Populate from source if async events are documented elsewhere."
- "source documents no multi-step command sequences. Remove if not applicable."
- "no explicit power-on sequencing procedure or safety interlock procedure stated beyond the power-state command acceptance restrictions above. Do not infer additional safety procedures."
- "appendix \"Supplementary Information by Command\" referenced multiple times for input terminal values, eco mode values, base model type values, and sub input values — not present in this source document."
- "default baud rate not stated (source lists 5 supported rates, no default marked)."
- "serial flow control not explicitly stated (full-duplex mode stated only)."
- "ID2 model code value for this specific model not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
