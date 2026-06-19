---
spec_id: admin/sharp-nec-led-fe015i2-137in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE015I2 137in Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE015I2 137in"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE015I2 137in"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:26:28.828Z
last_checked_at: 2026-06-18T08:06:06.562Z
generated_at: 2026-06-18T08:06:06.562Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control ID (ID1) and model code (ID2) default values not stated in source."
  - "input terminal value enumeration table referenced in Appendix \"Supplementary Information by Command\" not present in source text."
  - "aspect, eco mode, sub-input setting value tables referenced in Appendix not present in source text."
  - "communication mode stated \"Full duplex\" but flow_control value not explicit"
  - "appendix not in source).\""
  - "no unsolicited async event notifications documented in source."
  - "source documents no unsolicited event notifications. All responses are direct command acknowledgements / data replies."
  - "source documents no named multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "control ID (ID1) and model code (ID2) default values not in source."
  - "appendix tables for input terminal / aspect / eco mode / sub input / base model type values not in source text."
  - "default baud rate not stated (5 options listed)."
  - "firmware version compatibility not stated."
  - "flow control explicit value not stated (only \"Full duplex\" communication mode)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:06:06.562Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE015I2 137in Control Spec

## Summary
Sharp/NEC LED FE015I2 137in projector (RS-232C and TCP/IP LAN control). Binary framed command protocol with hexadecimal byte payloads; each command has a fixed header, variable data bytes, and a trailing one-byte checksum. This spec covers all 53 commands documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: control ID (ID1) and model code (ID2) default values not stated in source. -->
<!-- UNRESOLVED: input terminal value enumeration table referenced in Appendix "Supplementary Information by Command" not present in source text. -->
<!-- UNRESOLVED: aspect, eco mode, sub-input setting value tables referenced in Appendix not present in source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: communication mode stated "Full duplex" but flow_control value not explicit
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from documented command examples in source
- powerable    # 015/016 POWER ON/OFF present
- routable     # 018 INPUT SW CHANGE present
- queryable    # many status/request commands present
- levelable    # 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
- shutterable  # 051/052 SHUTTER CLOSE/OPEN present
```

## Actions
```yaml
# Checksum (CKS) computation: source states - "Add all preceding bytes of data.
# Use the low-order one byte (eight bits) of the addition result as the checksum."
# Example given: 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h.
# Each action below shows the fixed payload verbatim from the source, with
# <ID1>, <ID2>, <CKS> and variable DATA?? placeholders preserved as in source.
# ID1 = Control ID (projector-set), ID2 = Model code (model-dependent).
#
# Payload format convention: "Cmd" = command bytes sent to projector,
# "Ack (ok)" = success response, "Ack (err)" = error response with ERR1/ERR2.

- id: error_status_request
  label: 009 ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>..<DATA12> <CKS>. DATA1..12 = error info bits (0=normal, 1=error). See error information list in source."

- id: power_on
  label: 015 POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "Ack (ok): 22h 00h <ID1> <ID2> 00h <CKS>. Ack (err): A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. No other command accepted while power turning on."

- id: power_off
  label: 016 POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "Ack (ok): 22h 01h <ID1> <ID2> 00h <CKS>. No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: 018 INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full enumeration in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
  notes: "Example from source: switching to video port = 02h 03h 00h 00h 02h 01h 06h 0Eh. Ack (ok): 22h 03h <ID1> <ID2> 01h <DATA01> <CKS> (FFh = ended with error)."

- id: picture_mute_on
  label: 020 PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Picture mute turned off automatically on input/video signal switch."

- id: picture_mute_off
  label: 021 PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022 SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Sound mute turned off on input/video switch or volume adjust."

- id: sound_mute_off
  label: 023 SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024 ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025 ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1 PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>..<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target - 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode - 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Ack (ok): 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)."

- id: volume_adjust
  label: 030-2 VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01>..<DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode - 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: 030-12 ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - enumeration in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."

- id: other_adjust_lamp_light
  label: 030-15 OTHER ADJUST (LAMP/LIGHT ADJUST)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03>..<DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target - 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "DATA02 = FFh for LAMP/LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode - 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: 037 INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: 23h 8Ah <ID1> <ID2> 62h <DATA01>..<DATA98> <CKS>. DATA01-49 = projector name, DATA83-86 = lamp usage seconds, DATA87-90 = filter usage seconds."

- id: filter_usage_information_request
  label: 037-3 FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 = filter usage seconds, DATA05-08 = filter alarm start time seconds. Returns -1 if undefined."

- id: lamp_information_request_3
  label: 037-4 LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select - 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 effective only for two-lamp models)"
    - name: DATA02
      type: integer
      description: "Content - 01h=lamp usage seconds, 04h=lamp remaining life %"
  notes: "Response DATA03-06 = obtained info. Negative remaining life returned if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: 037-6 CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999)."

- id: remote_key_code
  label: 050 REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte - see source key code list (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD type). All listed key codes have DATA02=00h."
  notes: "Ack (ok): 22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS> (FFh = ended with error)."

- id: shutter_close
  label: 051 SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052 SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053 LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "06h = Periphery Focus"
    - name: DATA02
      type: integer
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive + continuous, 81h=drive - continuous, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "After 7Fh/81h, send 00h to stop. Lens may be re-controlled without stop by reissuing same command during drive."

- id: lens_control_request
  label: 053-1 LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens control target (same as 053 DATA01)
  notes: "Response DATA02-07 = upper/lower limits and current value (16-bit LE pairs)."

- id: lens_control_2
  label: 053-2 LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01>..<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh = Stop (then DATA02-04 ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode - 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: 053-3 LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: 053-4 REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: 053-5 LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6 LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value - 00h=OFF, 01h=ON"

- id: lens_information_request
  label: 053-7 LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield - Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: 053-10 LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number - 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: 053-11 LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1 GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name - 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"

- id: setting_request
  label: 078-1 SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03 = base model type, DATA04 = sound function (00h/01h), DATA05 = profile/clock/sleep."

- id: running_status_request
  label: 078-2 RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 = power status (00h=Standby, 01h=Power on), DATA06 = operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Standby power saving, 10h=Network standby)."

- id: input_status_request
  label: 078-3 INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (returned = practical - 1), selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: 078-4 MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (00h=off, 01h=on)."

- id: model_name_request
  label: 078-5 MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6 COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01 - 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: 079 FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: 084 INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type - 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: 097-8 ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: 097-45 LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155 LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198 PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1 EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8 ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value - enumeration in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."

- id: lan_projector_name_set
  label: 098-45 LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16), NUL-terminated."

- id: pip_picture_by_picture_set
  label: 098-198 PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value - MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values per Appendix (UNRESOLVED)."

- id: edge_blending_mode_set
  label: 098-243-1 EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value - 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: 305-1 BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 = base model type, DATA03-11 = model name (NUL-terminated)."

- id: serial_number_request
  label: 305-2 SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3 BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "DATA01 = operation status (00h/04h/05h/06h/0Fh/10h), DATA02 = content displayed, DATA03-05 = signal type, DATA06-09 = video/sound/onscreen/freeze mute."

- id: audio_select_set
  label: 319-10 AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal - values per Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
    - name: DATA02
      type: integer
      description: "Setting value - 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "Error info from 009 ERROR STATUS REQUEST. DATA1-12 bitfield: cover, fan, temperature, lamp, formatter, mirror cover, iris calibration, lens install, interlock switch, portrait orientation, system errors. 0=normal, 1=error."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 DATA06 / 305-3 DATA01."

- id: input_signal_status
  type: object
  description: "From 078-3 - signal switch process, list number, signal type, test pattern state, content displayed."

- id: mute_status
  type: object
  description: "From 078-4 - picture/sound/onscreen/forced-onscreen mute + OSD display state."

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "From 078-6 DATA01."

- id: lens_operation_status
  type: bitmask
  description: "From 053-7 DATA01 - lens memory / zoom / focus / lens shift H/V operation state."

- id: gain_adjusted_value
  type: object
  description: "From 060-1 - upper/lower/default/current adjustment range + wide/narrow width for selected gain."

- id: command_response
  type: enum
  values: [success, error]
  description: "Each action returns 22h/23h ACK (success) or A2h/A3h with ERR1/ERR2 (error). See error code list."

# UNRESOLVED: no unsolicited async event notifications documented in source.
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "PICTURE / BRIGHTNESS - set via 030-1 (DATA01=00h), read via 060-1."

- id: contrast
  type: integer
  description: "PICTURE / CONTRAST - set via 030-1 (DATA01=01h), read via 060-1."

- id: color
  type: integer
  description: "PICTURE / COLOR - set via 030-1 (DATA01=02h), read via 060-1."

- id: hue
  type: integer
  description: "PICTURE / HUE - set via 030-1 (DATA01=03h), read via 060-1."

- id: sharpness
  type: integer
  description: "PICTURE / SHARPNESS - set via 030-1 (DATA01=04h), read via 060-1."

- id: volume
  type: integer
  description: "VOLUME - set via 030-2, read via 060-1 (DATA01=05h)."

- id: lamp_light_adjust
  type: integer
  description: "LAMP ADJUST / LIGHT ADJUST - set via 030-15 (DATA01=96h), read via 060-1 (DATA01=96h)."

- id: aspect
  type: integer
  description: "Set via 030-12. Values per Appendix (UNRESOLVED: appendix not in source)."

- id: eco_mode
  type: integer
  description: "Set via 098-8, read via 097-8. Values per Appendix (UNRESOLVED: appendix not in source)."

- id: projector_name
  type: string
  description: "Set via 098-45, read via 097-45. Up to 16 bytes."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "Set via 098-243-1, read via 097-243-1."

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: "Set/read via 098-198 / 097-198 (DATA01=00h)."

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: "Set/read via 098-198 / 097-198 (DATA01=01h)."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "Set via 053-10, read via 053-11."

- id: freeze_status
  type: enum
  values: [off, on]
  description: "Set via 079, read in 305-3 DATA09."

- id: lamp_usage_seconds
  type: integer
  description: "From 037 (DATA83-86) or 037-4 (DATA01=00h, DATA02=01h). Updated at 1-min intervals."

- id: lamp_remaining_life_pct
  type: integer
  description: "From 037-4 (DATA02=04h). Negative if replacement deadline exceeded."

- id: filter_usage_seconds
  type: integer
  description: "From 037 or 037-3 (DATA01-04)."

- id: filter_alarm_start_seconds
  type: integer
  description: "From 037-3 (DATA05-08). Returns -1 if undefined."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event notifications. All responses are direct command acknowledgements / data replies.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond noting that POWER ON / POWER OFF
# block other commands during execution (incl. cooling time). Mirror/lens cover
# status is queryable via 078-6 but no interlock rule is stated.
```

## Notes
- **Checksum computation** (CKS): sum all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`. CKS is mandatory on every command and response.
- **ID1 (Control ID)**: projector-set value, model-dependent. Not stated as a default in source.
- **ID2 (Model code)**: model-dependent. Not stated in source.
- **Response framing**: `22h/23h` prefix = success acknowledgement (with optional data), `A2h/A3h` prefix = error acknowledgement carrying ERR1/ERR2.
- **Error codes**: 2-byte combination (ERR1, ERR2). Full table in source §2.4 — covers unrecognized command, unsupported command, invalid value, invalid input, memory errors, forced mute, no signal, test pattern displayed, power-off rejection, no authority, gain errors, adjustment failed.
- **Power-on/off blocking**: while POWER ON or POWER OFF (including cooling time) executes, no other command is accepted.
- **Picture/Sound/Onscreen mute auto-clear**: input/video signal switch clears picture+onscreen mute; volume adjustment also clears sound mute.
- **Appendix referenced but not in source**: input terminal values, aspect values, eco mode values, sub-input setting values, base model type values. These appear in an Appendix "Supplementary Information by Command" that was not present in the refined source text.

<!-- UNRESOLVED: control ID (ID1) and model code (ID2) default values not in source. -->
<!-- UNRESOLVED: appendix tables for input terminal / aspect / eco mode / sub input / base model type values not in source text. -->
<!-- UNRESOLVED: default baud rate not stated (5 options listed). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow control explicit value not stated (only "Full duplex" communication mode). -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:26:28.828Z
last_checked_at: 2026-06-18T08:06:06.562Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:06:06.562Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control ID (ID1) and model code (ID2) default values not stated in source."
- "input terminal value enumeration table referenced in Appendix \"Supplementary Information by Command\" not present in source text."
- "aspect, eco mode, sub-input setting value tables referenced in Appendix not present in source text."
- "communication mode stated \"Full duplex\" but flow_control value not explicit"
- "appendix not in source).\""
- "no unsolicited async event notifications documented in source."
- "source documents no unsolicited event notifications. All responses are direct command acknowledgements / data replies."
- "source documents no named multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "control ID (ID1) and model code (ID2) default values not in source."
- "appendix tables for input terminal / aspect / eco mode / sub input / base model type values not in source text."
- "default baud rate not stated (5 options listed)."
- "firmware version compatibility not stated."
- "flow control explicit value not stated (only \"Full duplex\" communication mode)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
