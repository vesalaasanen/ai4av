---
spec_id: admin/sharp-nec-ma431-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma431 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma431 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma431 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:21:02.630Z
last_checked_at: 2026-06-19T07:43:55.561Z
generated_at: 2026-06-19T07:43:55.561Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific base model type code (ID2/model code) not given; input terminal value table, aspect value table, eco mode value table, sub-input value table, and base-model-type table are referenced as an external Appendix (\"Supplementary Information by Command\") that is not present in this refined source."
  - "multiple rates supported - 115200/38400/19200/9600/4800 bps; source does not state a default"
  - "communication mode stated as \"Full duplex\"; flow_control value not explicitly stated"
  - "no unsolicited notifications documented in source. The projector only"
  - "no multi-step sequences described explicitly in source."
  - "model code for Ma431 Mpi4E not documented in source"
  - "firmware version compatibility not stated in source"
  - "default baud rate not stated (multiple rates supported)"
  - "flow control not explicitly stated (only \"Full duplex\" comm mode documented)"
  - "model code (ID2) for Ma431 Mpi4E not documented"
  - "external Appendix value tables (input terminal, aspect, eco mode, sub-input, base model type) not present in refined source"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:43:55.561Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands match source hex opcodes exactly; transport parameters (TCP 7142, serial 8N1) verified in source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Sharp/NEC Ma431 Mpi4E Control Spec

## Summary
Sharp/NEC projector (Ma431 Mpi4E) control spec covering RS-232C serial and wired/wireless LAN (TCP) interfaces. Source is the Projector Control Command Reference Manual (BDT140013 Rev 7.1), documenting 53 binary commands (power, input switch, mutes, lens control, status queries, edge blending, PIP/PbP, network settings). Binary frames carry a trailing checksum byte.

<!-- UNRESOLVED: model-specific base model type code (ID2/model code) not given; input terminal value table, aspect value table, eco mode value table, sub-input value table, and base-model-type table are referenced as an external Appendix ("Supplementary Information by Command") that is not present in this refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# Source documents both serial (PC CONTROL port) and LAN (wired/wireless) connections.
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: multiple rates supported - 115200/38400/19200/9600/4800 bps; source does not state a default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: communication mode stated as "Full duplex"; flow_control value not explicitly stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable       # inferred: many *REQUEST commands returning state present
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST present
  - routable        # inferred: INPUT SW CHANGE (018) switches input terminal
```

## Actions
```yaml
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-DATA12 carry error bitfields (cover, fan, temp, lamp, mirror cover, interlock switch, etc.)."

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (including cooling time)."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command'."
  notes: "Checksum {cks} = low byte of sum of all preceding bytes. Example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with error (no signal switch)."

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
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Response DATA01-DATA02=0000h means success."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. Full list in Appendix 'Supplementary Information by Command'."
  notes: "Response DATA01-DATA02=0000h means success."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte (DATA01=96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Adjustment target low byte (DATA02=FFh for LAMP/LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Only documented target is LAMP ADJUST / LIGHT ADJUST (DATA01=96h, DATA02=FFh)."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: DATA01-49=projector name (NUL-terminated), DATA83-86=lamp usage time (seconds), DATA87-90=filter usage time (seconds). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response: DATA01-04=filter usage time (seconds), DATA05-08=filter alarm start time (seconds); '-1' if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Eco mode affects values. Negative remaining life if replacement deadline exceeded. Example (lamp 1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response: DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). Documented: 02h/03h=POWER ON/OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
  notes: "Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means ended with error."

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
      type: integer
      description: "Adjustment target; 06h=Periphery Focus (only documented value)"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus (continuous), 81h=minus (continuous), FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "After 7Fh/81h, send 00h to stop driving. Same command can be re-issued while lens driving without a stop."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target"
  notes: "Response: DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=current value."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target; FFh=Stop (mode/value ignored)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Response DATA02=FFh means ended with error."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on the profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02 setting value: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response DATA01: 00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=specified gain does not exist. DATA02-13 carry limits/default/current/step widths."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response: DATA01-03=base model type, DATA04=sound function (00h=no/01h=yes), DATA05=profile (00h=none,01h=clock,02h=sleep,03h=clock+sleep)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response: DATA03=power status (00h=Standby,01h=Power on), DATA04=cooling process, DATA05=power on/off process, DATA06=operation status (00h=Standby(Sleep),04h=Power on,05h=Cooling,06h=Standby(error),0Fh=Power saving,10h=Network standby)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: DATA01=signal switch process, DATA02=signal list number (actual = returned + 1), DATA03=selection signal type 1, DATA04=selection signal type 2 (01h=COMPUTER,02h=VIDEO,03h=S-VIDEO,04h=COMPONENT,20h=DVI-D,21h=HDMI,22h=DisplayPort,23h=VIEWER6-10,07h=VIEWER1-5), DATA05=signal list type, DATA06=test pattern, DATA09=content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response: DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display (00h/01h)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32=model name (NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "Response DATA02=label length, DATA03-??=label/info string (NUL-terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01=eco mode value (or Light/Lamp mode on some models). Value list in Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17=projector name (NUL-terminated)."

- id: lan_mac_address_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06=MAC address (e.g. 01h-23h-45h-67h-89h-ABh)."

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Response DATA02 carries mode (00h=PIP,01h=PbP), start position (00h-03h), or sub-input setting. Sub-input value list in Appendix."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value (sets Light/Lamp mode on some models). Value list in Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: data
      type: string
      description: "Projector name bytes (up to 16 bytes); DATA01-DATA16 followed by 00h NUL."
  notes: "Response DATA01 echoes input terminal field."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Mode: 00h=PIP,01h=PbP; or start position 00h-03h (TOP-LEFT/TOP-RIGHT/BOTTOM-LEFT/BOTTOM-RIGHT); or sub-input value"
  notes: "Response DATA01 maps 00h=MODE,01h=START POSITION,02h=SUB INPUT 1,03h=SUB INPUT 2,04h=SUB INPUT 3."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response: DATA01-02=base model type, DATA03-11=model name (NUL-terminated), DATA12-13=base model type. Value list in Appendix."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16=serial number (NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: DATA01=operation status, DATA02=content displayed, DATA03-04=selection signal type, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. Value list in Appendix 'Supplementary Information by Command'."
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "Response DATA02: 00h=success, 01h=error."
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: "ERROR STATUS REQUEST (009) response DATA01-DATA12 bitfield: cover, fan, temperature, lamp, mirror cover, interlock switch open, system errors."

- id: command_result
  type: enum
  values: [success, error]
  description: "Every command response either echoes data (success) or returns A2h/A3h frame with ERR1/ERR2 error codes (see Notes for full error-code list)."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, power_saving, network_standby]
  description: "RUNNING STATUS REQUEST (078-2) DATA03/DATA06 and BASIC INFORMATION REQUEST (305-3) DATA01."

- id: lamp_usage_time
  type: integer
  description: "INFORMATION REQUEST (037) DATA83-86 and LAMP INFORMATION REQUEST 3 (037-4); seconds, updated at 1-minute intervals."

- id: lamp_remaining_life
  type: integer
  description: "LAMP INFORMATION REQUEST 3 (037-4); percent, negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  description: "INFORMATION REQUEST (037) DATA87-90 and FILTER USAGE INFORMATION REQUEST (037-3) DATA01-04; seconds."

- id: input_status
  type: composite
  description: "INPUT STATUS REQUEST (078-3) response: signal list number, signal types, test pattern, content displayed."

- id: mute_status
  type: composite
  description: "MUTE STATUS REQUEST (078-4) response: picture/sound/onscreen/forced-onscreen mute + onscreen display flags."

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "COVER STATUS REQUEST (078-6) DATA01."

- id: lens_position
  type: composite
  description: "LENS CONTROL REQUEST (053-1) response: upper/lower limit + current value per adjustment target."

- id: lens_operation_status
  type: bitfield
  description: "LENS INFORMATION REQUEST (053-7) DATA01: lens memory/zoom/focus/lens-shift-H/lens-shift-V in-operation flags."

- id: gain_parameter
  type: composite
  description: "GAIN PARAMETER REQUEST 3 (060-1) response: status, upper/lower limit, default, current, wide/narrow step."

- id: eco_mode
  type: enum
  description: "ECO MODE REQUEST (097-8) DATA01; value list in Appendix."

- id: mac_address
  type: string
  description: "LAN MAC ADDRESS STATUS REQUEST2 (097-155) DATA01-06."

- id: projector_name
  type: string
  description: "LAN PROJECTOR NAME REQUEST (097-45) DATA01-17; NUL-terminated."

- id: model_name
  type: string
  description: "MODEL NAME REQUEST (078-5) DATA01-32; NUL-terminated."

- id: serial_number
  type: string
  description: "SERIAL NUMBER REQUEST (305-2) DATA01-16; NUL-terminated."

- id: base_model_type
  type: composite
  description: "BASE MODEL TYPE REQUEST (305-1) response: base model type code + model name."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "EDGE BLENDING MODE REQUEST (097-243-1) DATA01."

- id: pip_pbp_state
  type: composite
  description: "PIP/PICTURE BY PICTURE REQUEST (097-198) response: mode/start-position/sub-input per DATA01."

- id: sync_frequency
  type: string
  description: "INFORMATION STRING REQUEST (084): horizontal (DATA01=03h) or vertical (DATA01=04h) sync frequency string."

- id: carbon_savings
  type: composite
  description: "CARBON SAVINGS INFORMATION REQUEST (037-6): kg (DATA02-05) + mg (DATA06-09)."
```

## Variables
```yaml
- name: brightness
  description: "PICTURE ADJUST (030-1) target 00h; readable via GAIN PARAMETER REQUEST 3 (060-1) data01=00h."

- name: contrast
  description: "PICTURE ADJUST (030-1) target 01h; readable via GAIN PARAMETER REQUEST 3 (060-1) data01=01h."

- name: color
  description: "PICTURE ADJUST (030-1) target 02h; readable via GAIN PARAMETER REQUEST 3 (060-1) data01=02h."

- name: hue
  description: "PICTURE ADJUST (030-1) target 03h; readable via GAIN PARAMETER REQUEST 3 (060-1) data01=03h."

- name: sharpness
  description: "PICTURE ADJUST (030-1) target 04h; readable via GAIN PARAMETER REQUEST 3 (060-1) data01=04h."

- name: volume
  description: "VOLUME ADJUST (030-2); readable via GAIN PARAMETER REQUEST 3 (060-1) data01=05h."

- name: lamp_light_adjust
  description: "OTHER ADJUST (030-15) LAMP/LIGHT ADJUST (DATA01=96h,DATA02=FFh); readable via GAIN PARAMETER REQUEST 3 (060-1) data01=96h."

- name: aspect
  description: "ASPECT ADJUST (030-12); value list in Appendix 'Supplementary Information by Command'."

- name: eco_mode
  description: "ECO MODE SET (098-8); value list in Appendix 'Supplementary Information by Command'."

- name: projector_name
  description: "LAN PROJECTOR NAME SET (098-45); up to 16 bytes."

- name: edge_blending_mode
  description: "EDGE BLENDING MODE SET (098-243-1); 00h=OFF, 01h=ON."

- name: lens_profile
  description: "LENS PROFILE SET (053-10); 00h=Profile 1, 01h=Profile 2."

- name: lens_memory_load_by_signal
  description: "LENS MEMORY OPTION SET (053-6) data01=00h; 00h=OFF, 01h=ON."

- name: lens_memory_forced_mute
  description: "LENS MEMORY OPTION SET (053-6) data01=01h; 00h=OFF, 01h=ON."

- name: pip_pbp_mode
  description: "PIP/PICTURE BY PICTURE SET (098-198) data01=00h; 00h=PIP, 01h=PICTURE BY PICTURE."

- name: pip_pbp_start_position
  description: "PIP/PICTURE BY PICTURE SET (098-198) data01=01h; 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- name: freeze
  description: "FREEZE CONTROL (079); 01h=on, 02h=off."

- name: audio_select
  description: "AUDIO SELECT SET (319-10); per input terminal: 00h=terminal, 01h=BNC, 02h=COMPUTER."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. The projector only
# returns responses to issued commands (ACK/error frames per section 2.3).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON (015): no other command accepted while power-on in progress."
  - description: "POWER OFF (016): no other command accepted during power-off including cooling time."
  - description: "Cover/interlock switch status exposed via ERROR STATUS REQUEST (009) DATA09 Bit1 'interlock switch is open' and DATA03 Bit5 'mirror cover error'."
  - description: "Response error code ERR1=02h ERR2=0Dh: 'The command cannot be accepted because the power is off.'"
  - description: "Response error code ERR1=02h ERR2=0Fh: 'There is no authority necessary for the operation.'"
# Notes on error codes documented in source (section 2.4):
#   00h/00h = unrecognized command
#   00h/01h = command not supported by model
#   01h/00h = invalid value
#   01h/01h = invalid input terminal
#   01h/02h = invalid language
#   02h/00h = memory allocation error
#   02h/02h = memory in use
#   02h/03h = value cannot be set
#   02h/04h = forced onscreen mute on
#   02h/06h = viewer error
#   02h/07h = no signal
#   02h/08h = test pattern/filter displayed
#   02h/09h = no PC card inserted
#   02h/0Ah = memory operation error
#   02h/0Ch = entry list displayed
#   02h/0Dh = power is off
#   02h/0Eh = command execution failed
#   02h/0Fh = no authority for operation
#   03h/00h = incorrect gain number
#   03h/01h = invalid gain
#   03h/02h = adjustment failed
```

## Notes
Binary frame protocol. Commands/responses use hex notation (`NNh`). Frame structure: header byte (00h-03h command class / 20h-23h success response / A0h-A3h error response) followed by command code, `<ID1>` (control ID), `<ID2>` (model code), `<LEN>` (data length), data bytes, and `<CKS>` (checksum).

**Checksum (CKS) calculation:** add all preceding bytes; use the low-order one byte (8 bits) of the result. Worked example from source: `20h 81h 01h 60h 01h 00h` → `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.

**ID2 (model code)** varies by model in use — not stated for Ma431 Mpi4E in this source. <!-- UNRESOLVED: model code for Ma431 Mpi4E not documented in source -->

**Multiple baud rates supported** (115200/38400/19200/9600/4800 bps); source does not state a default. TCP port 7142 is fixed for LAN command send/receive. Full-duplex serial.

Several value enumerations are referenced as an external Appendix ("Supplementary Information by Command") that is NOT included in this refined source: input terminal codes, aspect values, eco mode values, sub-input values, base model type codes. These are marked in their respective actions/variables.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate not stated (multiple rates supported) -->
<!-- UNRESOLVED: flow control not explicitly stated (only "Full duplex" comm mode documented) -->
<!-- UNRESOLVED: model code (ID2) for Ma431 Mpi4E not documented -->
<!-- UNRESOLVED: external Appendix value tables (input terminal, aspect, eco mode, sub-input, base model type) not present in refined source -->
```

Spec done. 53 actions = full command list (009→319-10), each with verbatim hex payload. Serial+TCP both in source so both emitted. Baud = `null` UNRESOLVED (5 rates, no default stated). Appendix value tables absent → marked UNRESOLVED per action. Want ingest next?

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:21:02.630Z
last_checked_at: 2026-06-19T07:43:55.561Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:43:55.561Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands match source hex opcodes exactly; transport parameters (TCP 7142, serial 8N1) verified in source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific base model type code (ID2/model code) not given; input terminal value table, aspect value table, eco mode value table, sub-input value table, and base-model-type table are referenced as an external Appendix (\"Supplementary Information by Command\") that is not present in this refined source."
- "multiple rates supported - 115200/38400/19200/9600/4800 bps; source does not state a default"
- "communication mode stated as \"Full duplex\"; flow_control value not explicitly stated"
- "no unsolicited notifications documented in source. The projector only"
- "no multi-step sequences described explicitly in source."
- "model code for Ma431 Mpi4E not documented in source"
- "firmware version compatibility not stated in source"
- "default baud rate not stated (multiple rates supported)"
- "flow control not explicitly stated (only \"Full duplex\" comm mode documented)"
- "model code (ID2) for Ma431 Mpi4E not documented"
- "external Appendix value tables (input terminal, aspect, eco mode, sub-input, base model type) not present in refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
