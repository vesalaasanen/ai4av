---
spec_id: admin/sharp-nec-led-e012i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED E012I Control Spec"
manufacturer: Sharp/NEC
model_family: "LED E012I"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED E012I"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:30:49.774Z
last_checked_at: 2026-06-17T20:10:07.621Z
generated_at: 2026-06-17T20:10:07.621Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact LED E012I firmware compatibility not stated. Some DATA fields reference an Appendix \"Supplementary Information by Command\" not present in refined source (input terminal values, aspect values, eco mode values, base model type values, signal type values)."
  - "none documented."
  - "no multi-step sequences explicitly described in source."
  - "no voltage/current/power specs or explicit interlock procedures beyond above stated in source."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, signal type values, sub input values — not present in refined source."
  - "default baud rate not stated (only the selectable set listed)."
  - "wireless LAN unit details deferred to operation manual."
  - "firmware version compatibility not stated."
  - "voltage/current/power specs not in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:10:07.621Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source with matching hex codes; transport parameters fully supported; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED E012I Control Spec

## Summary
Sharp/NEC LED E012I projector control spec. Binary command protocol over RS-232C serial and TCP/IP (LAN, port 7142). Covers power, input switching, mutes, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, status queries, lamp/filter/carbon info, eco mode, PIP/PbP, edge blending, and audio select. Source: BDT140013 Rev 7.1 Projector Control Command Reference Manual.

<!-- UNRESOLVED: exact LED E012I firmware compatibility not stated. Some DATA fields reference an Appendix "Supplementary Information by Command" not present in refined source (input terminal values, aspect values, eco mode values, base model type values, signal type values). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 selectable; 115200 is first listed
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex; RTS/CTS pins present but flow mode not named as hw flow
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - queryable       # inferred: many status/error/info query commands present
  - levelable       # inferred: picture/volume/gain/lamp adjust commands present
  - routable        # inferred: INPUT SW CHANGE + audio select present
```

## Actions
```yaml
# Commands use hex bytes. Common params embedded in payloads:
#   ID1 = control ID (projector-set); shown as 00h (broadcast) in source literals
#   ID2 = model code (varies by model); shown as 00h in source literals
#   CKS = checksum = low-order byte of sum of all preceding bytes
# Source shows commands with default 00h 00h for ID1/ID2; substitute device values.
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "009. Returns DATA01-DATA12 error bitfield. Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "015. No other command accepted while powering on. Resp: 22h 00h <ID1> <ID2> 00h <CKS>. Err: A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "016. No other command accepted during power-off incl. cooling. Resp: 22h 01h <ID1> <ID2> 00h <CKS>"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal value (e.g. 06h = video port). See Appendix Supplementary Information."
  notes: "018. Example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh. Resp DATA01=FFh means error/no switch."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "020. Auto-off on input/video switch. Resp: 22h 10h <ID1> <ID2> 00h <CKS>"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []
  notes: "021. Resp: 22h 11h <ID1> <ID2> 00h <CKS>"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "022. Auto-off on input/video switch or volume adjust."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []
  notes: "023."

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "024. Auto-off on input/video switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []
  notes: "025."

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "030-1. Ex brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Resp 0000h=ok."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "030-2. Ex volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Aspect value (see Appendix Supplementary Information)"
  notes: "030-12."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: string
      description: "Target: 96h / DATA02 FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "FFh for LAMP/LIGHT ADJUST"
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "030-15."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "037. Resp: DATA01-49=projector name, DATA83-86=lamp usage time (sec), DATA87-90=filter usage time (sec). Updated 1-min intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "037-3. Resp DATA01-04=filter usage time (sec), DATA05-08=filter alarm start time (sec). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
  notes: "037-4. Eco mode reflected. Ex lamp usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "037-6. Resp DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD type). e.g. 02h=POWER ON, 06h=MENU, 4Bh=COMPUTER1, D7h=SOURCE"
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed keys)"
  notes: "050. Full key list (DATA01/DATA02/Name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Ex AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "051. Closes lens shutter."

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "052. Opens lens shutter."

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target. 06h=Periphery Focus (others in Appendix)"
    - name: data02
      type: string
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "053. Send 00h to stop after 7Fh/81h. Can issue same cmd during drive w/o stop."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target. FFh=Stop (mode/value ignored)"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "053-2."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-3. Reference lens memory via 053-4."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-4. Controls profile set via 053-10 LENS PROFILE SET."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "00h=OFF, 01h=ON"
  notes: "053-6."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"
  notes: "053-10. Selects reference lens memory profile."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"
  notes: "079."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Eco mode value (see Appendix Supplementary Information)"
  notes: "098-8. Sets Light mode or Lamp mode depending on projector."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
  params:
    - name: data01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL terminated)"
  notes: "098-45."

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "MODE: 00h=PIP,01h=PbP. START POS: 00h=TL,01h=TR,02h=BL,03h=BR. Sub input values in Appendix."
  notes: "098-198."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"
  notes: "098-243-1."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal (see Appendix Supplementary Information)"
    - name: data02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "319-10. Resp DATA02 00h=ok, 01h=error."

# --- Query commands ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target (see 053 LENS CONTROL targets)"
  notes: "053-1. Resp: upper/lower limit + current value (16-bit)."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "053-5. Resp DATA02: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "053-7. Resp DATA01 bitfield: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=stop,1=operating)."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "053-11. Resp DATA01: 00h=Profile1, 01h=Profile2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "060-1. Resp DATA01 status (00h display N/A,01h adjust N/A,02h adjustable,FFh no gain). Ex brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "078-1. Resp: DATA01-03 base model type, DATA04 sound function, DATA05 profile (clock/sleep timer)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "078-2. Resp DATA03 power (00h standby,01h on), DATA04 cooling, DATA05 power process, DATA06 op status (00h standby sleep,04h on,05h cooling,06h standby error,0Fh power saving,10h network standby)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "078-3. Resp DATA01 signal switch, DATA02 signal list number (practical = returned+1), DATA03 sig type1, DATA04 sig type2 (01h COMPUTER,02h VIDEO,03h S-VIDEO,04h COMPONENT,20h DVI-D,21h HDMI,22h DisplayPort,23h VIEWER6-10,07h VIEWER1-5), DATA05 list type, DATA06 test pattern, DATA09 content."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "078-4. Resp DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD (00h off,01h on)."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "078-5. Resp DATA01-32 model name (NUL terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "078-6. Resp DATA01: 00h normal (cover open), 01h cover closed."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: string
      description: "03h=horizontal sync freq, 04h=vertical sync freq"
  notes: "084. English info strings."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "097-8. Resp DATA01 eco mode value (Light mode or Lamp mode per projector; values in Appendix)."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "097-45. Resp DATA01-17 projector name (NUL terminated)."

- id: lan_mac_address_request_2
  label: LAN MAC Address Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "097-155. Resp DATA01-06 MAC address."

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "097-198. MODE resp: 00h=PIP,01h=PbP. START POS resp: 00h=TL,01h=TR,02h=BL,03h=BR."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "097-243-1. Resp DATA01: 00h=OFF, 01h=ON."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "305-1. Resp DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "305-2. Resp DATA01-16 serial number (NUL terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "305-3. Resp DATA01 op status, DATA02 content displayed, DATA03-04 signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."
```

## Feedbacks
```yaml
# Observable states returned by query commands and responses.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: error_status
  type: bitfield
  description: "12-byte error status from 009. Bits cover cover/fan/temp/power/lamp errors."
  source: "009 DATA01-DATA12"

- id: input_signal_type
  type: enum
  values: [COMPUTER, VIDEO, S_VIDEO, COMPONENT, DVI_D, HDMI, DisplayPort, VIEWER_1_5, VIEWER_6_10]
  source: "078-3 DATA04"

- id: mute_status
  type: composite
  description: "Picture/sound/onscreen/forced-onscreen mute + OSD display flags"
  source: "078-4 DATA01-DATA05"

- id: lens_operation_status
  type: bitfield
  description: "Lens memory/zoom/focus/shift H/shift V operation status"
  source: "053-7 DATA01"

- id: command_ack
  type: enum
  values: [success, error]
  description: "Each command returns A2h/A0h/A1h/A3h error frame with ERR1+ERR2 on failure"
```

## Variables
```yaml
# Settable parameters not covered as discrete actions.
- id: brightness
  range: dynamic  # query 060-1 for limits
  source: "030-1 DATA01=00h / 060-1 DATA01=00h"

- id: contrast
  range: dynamic
  source: "030-1 DATA01=01h / 060-1 DATA01=01h"

- id: color
  range: dynamic
  source: "030-1 DATA01=02h / 060-1 DATA01=02h"

- id: hue
  range: dynamic
  source: "030-1 DATA01=03h / 060-1 DATA01=03h"

- id: sharpness
  range: dynamic
  source: "030-1 DATA01=04h / 060-1 DATA01=04h"

- id: volume
  range: dynamic
  source: "030-2 / 060-1 DATA01=05h"

- id: lamp_adjust
  range: dynamic
  source: "030-15 / 060-1 DATA01=96h"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037 DATA83-86 / 037-4"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037 DATA87-90 / 037-3"
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are command-elicited.
# UNRESOLVED: none documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # projector enters cooling; no commands accepted during cool-down
interlocks:
  - "No other command accepted while POWER ON executing (015)."
  - "No other command accepted while POWER OFF executing incl. cooling time (016)."
  - "Picture/sound/onscreen mute auto-clear on input terminal switch or video signal switch (020/022/024)."
  - "Sound mute auto-clear on volume adjustment (022)."
  - "ERR1=02h ERR2=0Dh: command rejected because power is off."
# UNRESOLVED: no voltage/current/power specs or explicit interlock procedures beyond above stated in source.
```

## Notes
- Protocol = binary hex frames. Command bytes documented verbatim from source with default `00h 00h` for ID1 (control ID) / ID2 (model code). Substituting real device values changes checksum (last byte).
- Checksum = low-order byte of sum of all preceding bytes (see 2.2 example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`).
- Response framing: success uses `2Xh` prefix (20h/21h/22h/23h), error uses `AXh` prefix (A0h/A1h/A2h/A3h) with `<ERR1> <ERR2> <CKS>`.
- Baud rate field: source lists `115200/38400/19200/9600/4800 bps` as selectable. Default value UNRESOLVED — first listed (115200) recorded as primary.
- Serial cable = cross cable to PC CONTROL port (D-SUB 9P). Pins: 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS. Flow control hardware pins present but source names mode only as "Full duplex" — hw flow control not explicitly confirmed.
- Lamp/filter usage updated at 1-minute intervals despite 1-second resolution.
- Two-lamp DATA01=01h (Lamp 2) only valid on two-lamp projector models.
- 050 REMOTE KEY CODE: one parameterized action covering all 24 documented key codes (enumerated in notes) — not 24 separate actions.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model type values, signal type values, sub input values — not present in refined source. -->
<!-- UNRESOLVED: default baud rate not stated (only the selectable set listed). -->
<!-- UNRESOLVED: wireless LAN unit details deferred to operation manual. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: voltage/current/power specs not in source. -->

Spec built. 53 commands, all payloads verbatim. Serial + TCP both (source documents both, port 7142). Want ingest next? Tell me `drafts.jsonl` path or ingest directly.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:30:49.774Z
last_checked_at: 2026-06-17T20:10:07.621Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:10:07.621Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source with matching hex codes; transport parameters fully supported; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact LED E012I firmware compatibility not stated. Some DATA fields reference an Appendix \"Supplementary Information by Command\" not present in refined source (input terminal values, aspect values, eco mode values, base model type values, signal type values)."
- "none documented."
- "no multi-step sequences explicitly described in source."
- "no voltage/current/power specs or explicit interlock procedures beyond above stated in source."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, signal type values, sub input values — not present in refined source."
- "default baud rate not stated (only the selectable set listed)."
- "wireless LAN unit details deferred to operation manual."
- "firmware version compatibility not stated."
- "voltage/current/power specs not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
