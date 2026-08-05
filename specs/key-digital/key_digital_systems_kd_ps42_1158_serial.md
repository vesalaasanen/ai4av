---
spec_id: admin/key-digital-systems-kd-ps42-1158
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-PS42 Control Spec"
manufacturer: "Key Digital"
model_family: KD-PS42
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-PS42
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.org
  - manualslib.com
  - keydigital.com
source_urls:
  - https://www.keydigital.org/web/content/157178/Manual_KD-PS42_v1.0.pdf
  - "https://www.keydigital.org/web/content/6414/KD-PS42%20QSG.pdf"
  - https://www.manualslib.com/manual/2424506/Key-Digital-Kd-Ps42.html
  - https://www.keydigital.com
retrieved_at: 2026-07-13T06:27:13.891Z
last_checked_at: 2026-07-21T23:54:15.993Z
generated_at: 2026-07-21T23:54:15.993Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
  - "source does not expose any settable numeric parameter ranges"
  - "source does not document unsolicited event messages."
  - "source does not document multi-step sequences."
  - "source contains no explicit safety warnings, electrical"
  - "firmware compatibility range, unsolicited event format, multi-step macro catalogue not present in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:54:15.993Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions found in source with matching wire tokens, parameters, and transport settings; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Key Digital Systems KD-PS42 Control Spec

## Summary
The Key Digital Systems KD-PS42 is a presentation switcher with 1x HDBaseT + 3x HDMI inputs and mirrored HDMI + HDBaseT outputs, controllable over RS-232 and TCP/IP. This spec covers the ASCII command protocol exposed on both transports: identical command set, session-based with prompts after each command, requiring a carriage return terminator.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PN/PF commands
- routable        # inferred from SPO SI yy input routing commands
- queryable       # inferred from STA, SPO xx RN, SPC RN queries
```

## Actions
```yaml
- id: help
  label: Help
  kind: query
  command: "H"
  params: []
  notes: Returns entire API in readable format.

- id: power_on
  label: Power On
  kind: action
  command: "PN"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PF"
  params: []

- id: status
  label: Show Global System Status
  kind: query
  command: "STA"
  params: []
  notes: Returns unit status and settings in readable format.

- id: set_output_input
  label: Set Output to Video Input (no output selector)
  kind: action
  command: "SPOSI{input}"
  params:
    - name: input
      type: integer
      description: Video input (01=HDBT, 02=HDMI1, 03=HDMI2, 04=HDMI3)

- id: set_output_input_per_output
  label: Set Output xx to Video Input yy
  kind: action
  command: "SPO{output}SI{input}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: input
      type: integer
      description: Video input (01=HDBT, 02=HDMI1, 03=HDMI2, 04=HDMI3)

- id: set_output_on_off
  label: Set Output On/Off
  kind: action
  command: "SPO{output}{state}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: state
      type: string
      enum: [ON, OFF]

- id: set_output_video_mute
  label: Set Output Video Mute
  kind: action
  command: "SPO{output}VM{state}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: state
      type: string
      enum: [E, D]

- id: set_output_debug
  label: Set Output Debug Mode
  kind: action
  command: "SPO{output}DBG{state}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: state
      type: string
      enum: [ON, OFF]

- id: set_display_tv_on_off
  label: Set Display TV On/Off (CEC)
  kind: action
  command: "SPO{output}TV{state}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: state
      type: string
      enum: [ON, OFF]

- id: set_display_volume
  label: Set Display Volume Up/Down (CEC)
  kind: action
  command: "SPO{output}AV{direction}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: direction
      type: string
      enum: [U, D]

- id: set_display_audio_mute
  label: Set Display Audio Mute (CEC)
  kind: action
  command: "SPO{output}AM{state}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: state
      type: string
      enum: [E, D, T]

- id: set_analog_audio_output
  label: Set External Analog Audio Output
  kind: action
  command: "SPOAA{state}"
  params:
    - name: state
      type: string
      enum: [E, D]

- id: set_digital_audio_output
  label: Set External PCM/Digital Audio Output
  kind: action
  command: "SPODA{state}"
  params:
    - name: state
      type: string
      enum: [E, D]

- id: set_amp220_mode
  label: Set AMP220 Control Mode
  kind: action
  command: "SPOAMP{state}"
  params:
    - name: state
      type: string
      enum: [ON, OFF]

- id: set_amp220_mic_mode
  label: Set AMP220 MIC Mode
  kind: action
  command: "SPOMIC{state}"
  params:
    - name: state
      type: string
      enum: [ON, OFF]

- id: set_hdbt_control
  label: Set Control of HDBT Input
  kind: action
  command: "SPI{input}HBC{ctrl}"
  params:
    - name: input
      type: string
      enum: [01, A]
    - name: ctrl
      type: integer
      description: Control type (1=IR, 2=RS232)

- id: write_input_name
  label: Write Input Name
  kind: action
  command: "SPI{input}WN{name}"
  params:
    - name: input
      type: string
      enum: [01-04]
    - name: name
      type: string
      description: Up to 16 characters

- id: read_input_name
  label: Read Input Name
  kind: query
  command: "SPI{input}RN"
  params:
    - name: input
      type: string
      enum: [01-04]

- id: write_output_name
  label: Write Output Name
  kind: action
  command: "SPO{output}WN{name}"
  params:
    - name: output
      type: string
      enum: [01, 02, A]
    - name: name
      type: string
      description: Up to 16 characters

- id: read_output_name
  label: Read Output Name
  kind: query
  command: "SPO{output}RN"
  params:
    - name: output
      type: string
      enum: [01, 02, A]

- id: write_device_name
  label: Write Device Name
  kind: action
  command: "SPCWN{name}"
  params:
    - name: name
      type: string
      description: Up to 16 characters

- id: read_device_name
  label: Read Device Name
  kind: query
  command: "SPCRN"
  params: []

- id: set_host_ip
  label: Set Host IP Address
  kind: action
  command: "SPCETIPA{ip}"
  params:
    - name: ip
      type: string
      description: Dotted quad, each octet 000-255

- id: set_netmask
  label: Set Net Mask
  kind: action
  command: "SPCETIPM{mask}"
  params:
    - name: mask
      type: string
      description: Dotted quad

- id: set_route_ip
  label: Set Route IP Address
  kind: action
  command: "SPCETIPR{ip}"
  params:
    - name: ip
      type: string
      description: Dotted quad

- id: set_tcp_port
  label: Set TCP/IP Port
  kind: action
  command: "SPCETIPP{port}"
  params:
    - name: port
      type: integer
      description: Port number 0001-9999

- id: apply_network_config
  label: Apply New Network Config
  kind: action
  command: "SPCETIPB"
  params: []

- id: set_system_address
  label: Set System Address
  kind: action
  command: "SPCA{addr}"
  params:
    - name: addr
      type: string
      description: System address 00-99; 00 = single-unit mode

- id: set_auto_sense
  label: Set Auto Sense Mode
  kind: action
  command: "SPCAS{mode}"
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=AUTO, 2=FORCED ON

- id: set_front_panel_buttons
  label: Enable/Disable Front Panel Buttons
  kind: action
  command: "SPCFB{state}"
  params:
    - name: state
      type: string
      enum: [E, D]

- id: set_camusb_mode
  label: Set CAMUSB Control Mode
  kind: action
  command: "SPCCAM{mode}"
  params:
    - name: mode
      type: integer
      description: 0-7

- id: set_rs232_baud
  label: Set RS232 Baud Rate
  kind: action
  command: "SPCRSB{idx}"
  params:
    - name: idx
      type: integer
      description: 0=57600, 1=38400, 2=19200, 3=9600, 4=4800

- id: factory_defaults
  label: Reset to Factory Defaults
  kind: action
  command: "SPCDF"
  params: []
  notes: Resets network config as well.

- id: factory_defaults_keep_network
  label: Reset to Factory Defaults (keep network)
  kind: action
  command: "SPCDF00"
  params: []

- id: video_audio_switch_output01
  label: Legacy Video+Audio Switch (Output 01)
  kind: action
  command: "SPO01SI{input}"
  params:
    - name: input
      type: integer
      description: Input number 01-05 (legacy command set)

- id: prefix_system_address
  label: Prefix System Address
  kind: action
  command: "{addr}{command}"
  params:
    - name: addr
      type: string
      description: Two-digit system address 01-99 prepended to any command
    - name: command
      type: string
      description: Any base command
  notes: All commands may be prefixed with a system address Azz where zz=[01-99].
```

## Feedbacks
```yaml
- id: unit_status
  type: object
  description: STA response includes model, system address, device name, firmware versions (Main/Splitter/CEC), power state, CAMUSB mode, RS232 config, network (MAC, IP, mask, router, port), EDID/forced HPD/auto sense flags, per-input link/video/live/control, per-output input/on/vmute/link/debug, per-display TV/AV mute/audio mute, audio output input/balanced/PCM/AMP220/MIC.
- id: help_text
  type: object
  description: H response lists the full API surface.
```

## Variables
```yaml
# UNRESOLVED: source does not expose any settable numeric parameter ranges
# beyond the enum-bearing actions above (baud index, auto-sense mode,
# CAMUSB mode). Already represented as action params.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event messages.
# After each command the device returns a prompt (KD-PS42>) but no
# asynchronous notification format is described.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
# Note: factory reset can also be triggered by holding HDMI 1 + A/V Mute
# front-panel buttons for 10 seconds (LEDs off, then reboot).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, electrical
# interlocks, or hazardous procedure descriptions for the control protocol.
```

## Notes
- Commands are case-insensitive.
- Command strings shown with spaces for clarity; the actual commands must NOT contain spaces.
- Each command must be terminated with a carriage return (`\r`).
- After each command, the device sends back a prompt (`KD-PS42>`).
- Default IP: 192.168.1.239. Default TCP port: 23. Default RS-232 baud: 57600.
- Activating KD-CamUSB or KD-Amp220 control mode auto-switches RS-232 baud to 9600.
- Legacy `SPO01SIyy` switching command retained for backward compatibility with prior Key Digital matrix integrations.
- Pinout for Unit Control RS-232: Pin 4 = Tx, Pin 5 = Gnd, Pin 6 = Tx (note: source labels pin 6 as "RS-232 Tx Data", likely a typo for Rx; not re-interpreted here).
- Pinout for HDBT pass-thru RS-232: Pin 1 = Tx, Pin 2 = Gnd, Pin 3 = Rx.
<!-- UNRESOLVED: firmware compatibility range, unsolicited event format, multi-step macro catalogue not present in source -->

## Provenance

```yaml
source_domains:
  - keydigital.org
  - manualslib.com
  - keydigital.com
source_urls:
  - https://www.keydigital.org/web/content/157178/Manual_KD-PS42_v1.0.pdf
  - "https://www.keydigital.org/web/content/6414/KD-PS42%20QSG.pdf"
  - https://www.manualslib.com/manual/2424506/Key-Digital-Kd-Ps42.html
  - https://www.keydigital.com
retrieved_at: 2026-07-13T06:27:13.891Z
last_checked_at: 2026-07-21T23:54:15.993Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:54:15.993Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions found in source with matching wire tokens, parameters, and transport settings; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
- "source does not expose any settable numeric parameter ranges"
- "source does not document unsolicited event messages."
- "source does not document multi-step sequences."
- "source contains no explicit safety warnings, electrical"
- "firmware compatibility range, unsolicited event format, multi-step macro catalogue not present in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
