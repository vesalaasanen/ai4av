---
spec_id: admin/nec-npxxxs-w-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NPxxxS W Series Control Spec"
manufacturer: NEC
model_family: "NPxxxS W Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NPxxxS W Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:43:21.107Z
last_checked_at: 2026-05-18T16:38:00.056Z
generated_at: 2026-05-18T16:38:00.056Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN control specifics not documented — see operation manual of wireless LAN unit"
  - "multiple rates supported (115200/38400/19200/9600/4800); source lists options, no single default"
  - "no unsolicited event notifications documented"
  - "no explicit multi-step macros documented"
  - "power on/off interlock - no other commands accepted during power transition"
  - "wireless LAN control protocol — not documented; requires wireless LAN unit operation manual"
  - "input terminal numeric codes — referenced as Appendix, not included in source"
  - "aspect ratio values — referenced as Appendix, not included in source"
  - "eco mode values — referenced as Appendix, not included in source"
  - "key code full list — partial list in source, see Table \"Key code list\""
verification:
  verdict: verified
  checked_at: 2026-05-18T16:38:00.056Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands; transport parameters verified against source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NPxxxS W Series Control Spec

## Summary
NEC NPxxxS W Series projector. Supports RS-232C serial and TCP/IP network control. Full duplex communication with checksum-based error detection. No authentication required.

<!-- UNRESOLVED: wireless LAN control specifics not documented — see operation manual of wireless LAN unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port 7142 for LAN commands
serial:
  baud_rate: null  # UNRESOLVED: multiple rates supported (115200/38400/19200/9600/4800); source lists options, no single default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present (015, 016)
- routable        # input switching command present (018)
- queryable       # numerous status/information request commands present
- levelable       # volume adjust, picture adjust, brightness, contrast, hue, etc.
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "Command: 02h 00h 00h 00h 00h 02h. No other command accepted during power-on sequence."

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "Command: 02h 01h 00h 00h 00h 03h. No other command accepted during cooling time."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see Appendix for values)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: "Mute off on input terminal switch or video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: "Mute off on input terminal switch, video signal switch, or sound volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: "Mute off on input terminal switch or video signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed value (low-order then high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed value"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect ratio value (see Appendix)"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: "16-bit signed value"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "2-byte key code (DATA01=DATA01, DATA02=DATA02 from key code table)"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: content
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=Plus 1s, 02h=Plus 0.5s, 03h=Plus 0.25s, 7Fh=Continue Plus, 81h=Continue Minus, FDh=Minus 0.25s, FEh=Minus 0.5s, FFh=Minus 1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: "16-bit position value"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number from LENS PROFILE SET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "Eco mode value (see Appendix)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value depends on target"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value"
    - name: setting
      type: integer
      description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  notes: "Command: 00h 88h 00h 00h 00h 88h. Returns 12 bytes of error bitfield data."

- id: information_request
  label: Information Request
  kind: action
  params: []
  notes: "Returns projector name, lamp usage time, filter usage time."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: action
  params: []
  notes: "Returns filter usage time and alarm start time in seconds."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: "Target lens parameter"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: parameter_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

- id: setting_request
  label: Setting Request
  kind: action
  params: []
  notes: "Returns base model type, sound function, profile number."

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  notes: "Returns power status, cooling process, operation status."

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  notes: "Returns signal switch process, signal list number, signal types."

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute status."

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  notes: "Returns model name string."

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  notes: "Returns mirror cover or lens cover status."

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: information_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: action
  params: []
  notes: "Returns operation status, content displayed, signal types, mute status, freeze status."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []
  notes: "Gets selected profile number."

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params: []
  notes: "Returns lens memory, zoom, focus, lens shift status."
```

## Feedbacks
```yaml
# All commands return a response with ERR1/ERR2 codes.
# ERR1=00h, ERR2=00h: command not recognized
# ERR1=00h, ERR2=01h: command not supported
# ERR1=01h, ERR2=00h: specified value invalid
# ERR1=01h, ERR2=01h: specified input terminal invalid
# ERR1=01h, ERR2=02h: specified language invalid
# ERR1=02h, ERR2=00h: memory allocation error
# ERR1=02h, ERR2=02h: memory in use
# ERR1=02h, ERR2=03h: specified value cannot be set
# ERR1=02h, ERR2=04h: forced onscreen mute on
# ERR1=02h, ERR2=06h: viewer error
# ERR1=02h, ERR2=07h: no signal
# ERR1=02h, ERR2=08h: test pattern or filter displayed
# ERR1=02h, ERR2=09h: no PC card inserted
# ERR1=02h, ERR2=0Ah: memory operation error
# ERR1=02h, ERR2=0Ch: entry list displayed
# ERR1=02h, ERR2=0Dh: command cannot be accepted (power off)
# ERR1=02h, ERR2=0Eh: command execution failed
# ERR1=02h, ERR2=0Fh: no authority for operation
# ERR1=03h, ERR2=00h: specified gain number incorrect
# ERR1=03h, ERR2=01h: specified gain invalid
# ERR1=03h, ERR2=02h: adjustment failed
```

## Variables
```yaml
# Lamp usage time: seconds (updated at 1-minute intervals)
# Filter usage time: seconds (updated at 1-minute intervals)
# Lamp remaining life: percentage (negative if deadline exceeded)
# Carbon Savings: kilograms + milligrams
# Projector name: string (up to 16 bytes, NUL-terminated)
# MAC address: 6 bytes
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: power on/off interlock - no other commands accepted during power transition
# Note: commands 015 and 016 state no other command can be accepted during execution
```

## Notes
Checksum calculated as low-order byte of sum of all preceding bytes. Serial supports 115200/38400/19200/9600/4800 bps — no single stated default; host must match projector setting. LAN uses TCP port 7142. Wireless LAN unit sold separately; control specifics not in this manual.
<!-- UNRESOLVED: wireless LAN control protocol — not documented; requires wireless LAN unit operation manual -->
<!-- UNRESOLVED: input terminal numeric codes — referenced as Appendix, not included in source -->
<!-- UNRESOLVED: aspect ratio values — referenced as Appendix, not included in source -->
<!-- UNRESOLVED: eco mode values — referenced as Appendix, not included in source -->
<!-- UNRESOLVED: key code full list — partial list in source, see Table "Key code list" -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:43:21.107Z
last_checked_at: 2026-05-18T16:38:00.056Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:38:00.056Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands; transport parameters verified against source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN control specifics not documented — see operation manual of wireless LAN unit"
- "multiple rates supported (115200/38400/19200/9600/4800); source lists options, no single default"
- "no unsolicited event notifications documented"
- "no explicit multi-step macros documented"
- "power on/off interlock - no other commands accepted during power transition"
- "wireless LAN control protocol — not documented; requires wireless LAN unit operation manual"
- "input terminal numeric codes — referenced as Appendix, not included in source"
- "aspect ratio values — referenced as Appendix, not included in source"
- "eco mode values — referenced as Appendix, not included in source"
- "key code full list — partial list in source, see Table \"Key code list\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
