---
spec_id: admin/atlona-at-hdvs-200-rx
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HDVS-200-RX Control Spec"
manufacturer: Atlona
model_family: AT-HDVS-200-RX
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HDVS-200-RX
  firmware: "\"2.0.36\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDVS-200-RX_API.pdf
retrieved_at: 2026-05-14T11:03:31.159Z
last_checked_at: 2026-06-02T17:21:22.969Z
generated_at: 2026-06-02T17:21:22.969Z
firmware_coverage: "\"2.0.36\""
protocol_coverage: []
known_gaps:
  - "default baud rate for RS-232 2 (CSpara) control port not stated in source"
  - "VOUT sta query argument behavior not explicitly documented (doc says \"execute VOUT without arguments\" to display current value)"
  - "default not stated; configurable to 2400/4800/9600/19200/38400/57600/115200 via CSpara"
  - "default not stated; configurable to 7 or 8 via CSpara"
  - "default not stated; configurable to None/Odd/Even via CSpara"
  - "default not stated; configurable to 1 or 2 via CSpara"
  - "not stated in source"
  - "no standalone settable variables documented separately from action commands."
  - "source documents no unsolicited event messages; all feedback is in direct response to commands."
  - "no multi-step macros described in source."
  - "source documents no power-sequencing or hardware interlock requirements."
  - "default RS-232 2 (CSpara) baud/data/parity/stop values not stated"
  - "timing between commands / minimum inter-command delay not stated"
  - "behaviour when Telnet session limit exceeded not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:22.969Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions matched literally to source commands; transport parameters verified; source coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Atlona AT-HDVS-200-RX Control Spec

## Summary
The AT-HDVS-200-RX is an HDBaseT scaler receiver with HDMI/VGA inputs, output scaling, audio (bass/treble/volume), picture controls, and dual relay outputs for display/screen automation. This spec covers the ASCII command protocol exposed over Telnet (TCP/IP) and the RS-232 2 control port; each command is terminated with CR (0x0d) and feedback is terminated with CR+LF (0x0a).

<!-- UNRESOLVED: default baud rate for RS-232 2 (CSpara) control port not stated in source -->
<!-- UNRESOLVED: VOUT sta query argument behavior not explicitly documented (doc says "execute VOUT without arguments" to display current value) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # documented in IPCFG and System sta feedback as default Telnet port
serial:
  baud_rate: null  # UNRESOLVED: default not stated; configurable to 2400/4800/9600/19200/38400/57600/115200 via CSpara
  data_bits: null  # UNRESOLVED: default not stated; configurable to 7 or 8 via CSpara
  parity: null    # UNRESOLVED: default not stated; configurable to None/Odd/Even via CSpara
  stop_bits: null # UNRESOLVED: default not stated; configurable to 1 or 2 via CSpara
  flow_control: null # UNRESOLVED: not stated in source
framing:
  command_terminator: "\r"     # CR (0x0d) per source
  response_terminator: "\r\n"  # CR+LF (0x0a) per source
auth:
  type: none  # inferred: IPLogin default off per source; can be enabled via IPLogin on with username/password
```

## Traits
```yaml
- routable    # inferred from Input command (HDMI1/HDMI2/VGA switching)
- queryable   # inferred from pervasive `sta` query argument across commands
- levelable   # inferred from BASS, BRT, CTRST, HUE, SATRT, SHARP, TREBLE, VOUT level controls
- mutable     # inferred from VOUTMute, HDMIAUD enable/disable commands
```

## Actions
```yaml
- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  command: "Aspect {value}"
  params:
    - name: value
      type: integer
      description: 0=Full, 1=16:9, 2=16:10, 3=4:3, 4=Keep Ratio, 5=Letterbox Top

- id: bass_set
  label: Set Bass Level
  kind: action
  command: "BASS1 {value}"
  params:
    - name: value
      type: string
      description: Integer -15..12, or "+" / "-" to step, or "sta" to query

- id: blink_set
  label: Set DN Button Blink
  kind: action
  command: "Blink {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: broadcast_set
  label: Set Broadcast Mode
  kind: action
  command: "Broadcast {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: brightness_set
  label: Set Picture Brightness
  kind: action
  command: "BRT {value}"
  params:
    - name: value
      type: string
      description: 0..100, or "sta" to query

- id: cspara_set
  label: Set RS-232 2 Serial Params
  kind: action
  command: "CSpara[{baud},{data},{parity},{stop}]"
  params:
    - name: baud
      type: integer
      description: 2400, 4800, 9600, 19200, 38400, 57600, 115200
    - name: data
      type: integer
      description: 7 or 8
    - name: parity
      type: string
      description: None, Odd, Even
    - name: stop
      type: integer
      description: 1 or 2

- id: cspara_query
  label: Query RS-232 2 Serial Params
  kind: query
  command: "CSpara[sta]"
  params: []

- id: contrast_set
  label: Set Picture Contrast
  kind: action
  command: "CTRST {value}"
  params:
    - name: value
      type: string
      description: 0..100, or "sta" to query

- id: hdbt_rs232_set
  label: Set HDBaseT IN Serial Params
  kind: action
  command: "HDBTRS232[{baud},{data},{parity},{stop}]"
  params:
    - name: baud
      type: integer
      description: 2400, 4800, 9600, 19200, 38400, 57600, 115200
    - name: data
      type: integer
      description: 7 or 8
    - name: parity
      type: string
      description: None, Odd, Even
    - name: stop
      type: integer
      description: 1 or 2

- id: hdbt_rs232_query
  label: Query HDBaseT IN Serial Params
  kind: query
  command: "HDBTRS232 sta"
  params: []

- id: hdcp_set
  label: Set HDCP Reporting Mode
  kind: action
  command: "HDCPSet {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: hdmi_audio_set
  label: Enable/Disable HDMI Audio Output
  kind: action
  command: "HDMIAUD {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: help
  label: Display Command Help
  kind: query
  command: "help {name}"
  params:
    - name: name
      type: string
      description: Optional command name; omit for full command list

- id: hue_set
  label: Set Picture Hue
  kind: action
  command: "HUE {value}"
  params:
    - name: value
      type: string
      description: 0..100, or "sta" to query

- id: hzoom_set
  label: Set Horizontal Zoom/Overscan
  kind: action
  command: "HZoom {value}"
  params:
    - name: value
      type: string
      description: 0..50, or "sta" to query

- id: input_select
  label: Select Active Input
  kind: action
  command: "Input {input}"
  params:
    - name: input
      type: string
      description: HDMI1, HDMI2, VGA, or "sta" to query (no space between HDMI and port number)

- id: ip_add_user
  label: Add Telnet User
  kind: action
  command: "IPAddUser {username} {password}"
  params:
    - name: username
      type: string
      description: Max 20 characters
    - name: password
      type: string
      description: Max 20 characters

- id: ip_cfg_query
  label: Query Network Settings
  kind: query
  command: "IPCFG"
  params: []

- id: ip_del_user
  label: Delete Telnet User
  kind: action
  command: "IPDelUser {username}"
  params:
    - name: username
      type: string

- id: ip_dhcp_set
  label: Enable/Disable DHCP
  kind: action
  command: "IPDHCP {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: ip_login_set
  label: Enable/Disable Telnet Login Credentials
  kind: action
  command: "IPLogin {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: ip_port_set
  label: Set Telnet Listening Port
  kind: action
  command: "IPPort {value}"
  params:
    - name: value
      type: string
      description: 0..65535, or "sta" to query

- id: ip_static_set
  label: Set Static IP / Netmask / Gateway
  kind: action
  command: "IPStatic {ip} {netmask} {gateway}"
  params:
    - name: ip
      type: string
      description: Dot-decimal IPv4 address
    - name: netmask
      type: string
      description: Dot-decimal subnet mask
    - name: gateway
      type: string
      description: Dot-decimal gateway address

- id: ip_timeout_set
  label: Set Telnet Inactivity Timeout
  kind: action
  command: "IPTimeout {seconds}"
  params:
    - name: seconds
      type: integer
      description: 1..60000 seconds

- id: kitmode_query
  label: Query Paired Transmitter Model/IP
  kind: query
  command: "KitMode sta"
  params: []

- id: factory_reset
  label: Factory Reset Unit
  kind: action
  command: "MReset"
  params: []

- id: picture_reset
  label: Reset Picture Settings
  kind: action
  command: "PictureRst"
  params: []

- id: pref_timing_set
  label: Set Preferred HDMI Input Timing
  kind: action
  command: "PrefTimg {value}"
  params:
    - name: value
      type: integer
      description: 0=Native, 1=1280x800, 2=1920x1080, 3=1024x768, 4=1280x720, 5=1920x1200, 6=1366x768, 7=800x600, 8=1600x900, 9=1440x900

- id: relay_act_set
  label: Set Relay State (open/close)
  kind: action
  command: "RelayAct {relay} {state}"
  params:
    - name: relay
      type: integer
      description: 1 or 2
    - name: state
      type: enum
      values: [open, close, sta]

- id: relay_auto_set
  label: Set Relay Auto-Follow Mode
  kind: action
  command: "RelayAuto {value}"
  params:
    - name: value
      type: enum
      values: [on, off, "?"]

- id: relay_pulse_time_set
  label: Set Relay Pulse Time
  kind: action
  command: "RelayPulseTime {value}"
  params:
    - name: value
      type: string
      description: 0..30 seconds, or "sta" to query

- id: relay_type_set
  label: Set Relay Type
  kind: action
  command: "RelayType {value}"
  params:
    - name: value
      type: enum
      values: [pulse, closed, sta]

- id: rs232para_set
  label: Set RS-232 1 (Display) Serial Params
  kind: action
  command: "RS232para[{baud},{data},{parity},{stop}]"
  params:
    - name: baud
      type: integer
      description: 2400, 9600, 19200, 38400, 56000, 57600, 115200
    - name: data
      type: integer
      description: 7 or 8
    - name: parity
      type: string
      description: None, Odd, Even
    - name: stop
      type: integer
      description: 1 or 2

- id: rs232para_query
  label: Query RS-232 1 Serial Params
  kind: query
  command: "RS232para sta"
  params: []

- id: rs232_zone_send
  label: Send Command to Connected Display
  kind: action
  command: "RS232zone[{command}]"
  params:
    - name: command
      type: string
      description: Pass-through command string (no spaces) to send out RS-232 1 to attached display

- id: saturation_set
  label: Set Picture Saturation
  kind: action
  command: "SATRT {value}"
  params:
    - name: value
      type: string
      description: 0..100, or "sta" to query

- id: sharpness_set
  label: Set Picture Sharpness
  kind: action
  command: "SHARP {value}"
  params:
    - name: value
      type: string
      description: 0..100, or "sta" to query

- id: system_query
  label: Query System Information
  kind: query
  command: "System sta"
  params: []

- id: treble_set
  label: Set Treble Level
  kind: action
  command: "TREBLE {value}"
  params:
    - name: value
      type: string
      description: Integer -12..15, or "+" / "-" to step, or "sta" to query

- id: type_query
  label: Query Model Information
  kind: query
  command: "Type"
  params: []

- id: version_query
  label: Query Firmware Version
  kind: query
  command: "Version{target}"
  params:
    - name: target
      type: enum
      values: [MCU, VSRX]

- id: vid_out_res_set
  label: Set Video Output Resolution
  kind: action
  command: "VidOutRes {value}"
  params:
    - name: value
      type: integer
      description: 0..28 (see notes for resolution table); 27=Input, 28=Native; or "sta" to query

- id: vout_set
  label: Set Audio Output Volume
  kind: action
  command: "VOUT {value}"
  params:
    - name: value
      type: string
      description: Integer -80..6, or "+" / "-" to step

- id: vout_mute_set
  label: Mute/Unmute Audio Output
  kind: action
  command: "VOUTMute {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]

- id: vzoom_set
  label: Set Vertical Zoom/Overscan
  kind: action
  command: "VZoom {value}"
  params:
    - name: value
      type: string
      description: 0..50, or "sta" to query

- id: zoom_set
  label: Enable/Disable Overscan
  kind: action
  command: "Zoom {value}"
  params:
    - name: value
      type: enum
      values: [on, off, sta]
```

## Feedbacks
```yaml
- id: aspect_state
  source: aspect_set
  type: integer
  description: Current aspect ratio code (0..5) echoed in Aspect feedback

- id: bass_state
  source: bass_set
  type: integer
  description: Current bass value -15..12

- id: blink_state
  source: blink_set
  type: enum
  values: [on, off]

- id: broadcast_state
  source: broadcast_set
  type: enum
  values: [on, off]

- id: brightness_state
  source: brightness_set
  type: integer
  description: 0..100

- id: cspara_state
  source: cspara_query
  type: string
  description: Echoed as "CSpara[baud,data,parity,stop]"

- id: contrast_state
  source: contrast_set
  type: integer
  description: 0..100

- id: hdbt_rs232_state
  source: hdbt_rs232_query
  type: string
  description: Echoed as "HDBTRS232[baud,data,parity,stop]"

- id: hdcp_state
  source: hdcp_set
  type: enum
  values: [on, off]

- id: hdmi_audio_state
  source: hdmi_audio_set
  type: enum
  values: [on, off]

- id: hue_state
  source: hue_set
  type: integer
  description: 0..100

- id: hzoom_state
  source: hzoom_set
  type: integer
  description: 0..50

- id: input_state
  source: input_select
  type: string
  description: Echoes active input (e.g. "Input HDMI2")

- id: ipcfg_state
  source: ip_cfg_query
  type: string
  description: Multi-line IP Addr / Netmask / Gateway / IP Port

- id: ip_dhcp_state
  source: ip_dhcp_set
  type: enum
  values: [on, off]

- id: ip_login_state
  source: ip_login_set
  type: enum
  values: [on, off]

- id: ip_port_state
  source: ip_port_set
  type: integer
  description: 0..65535

- id: ip_timeout_state
  source: ip_timeout_set
  type: integer
  description: Seconds 1..60000

- id: kitmode_state
  source: kitmode_query
  type: string
  description: Paired transmitter model and IP (e.g. "AT-HDVS-200-TX IP:10.0.1.161")

- id: pref_timing_state
  source: pref_timing_set
  type: integer
  description: 0..9 input timing code

- id: relay_act_state
  source: relay_act_set
  type: enum
  values: [open, close]

- id: relay_auto_state
  source: relay_auto_set
  type: enum
  values: [on, off]

- id: relay_pulse_time_state
  source: relay_pulse_time_set
  type: integer
  description: Seconds 0..30

- id: relay_type_state
  source: relay_type_set
  type: enum
  values: [pulse, closed]

- id: rs232para_state
  source: rs232para_query
  type: string
  description: Echoed as "RS232para[baud,data,parity,stop]"

- id: saturation_state
  source: saturation_set
  type: integer
  description: 0..100

- id: sharpness_state
  source: sharpness_set
  type: integer
  description: 0..100

- id: system_state
  source: system_query
  type: string
  description: Multi-line block (Model, MAC, Address Type, IP, Netmask, Gateway, HTTP Port, Telnet Port, Firmware, Up Time)

- id: treble_state
  source: treble_set
  type: integer
  description: -12..15

- id: type_state
  source: type_query
  type: string
  description: Model string (e.g. "AT-HDVS-200-RX")

- id: version_state
  source: version_query
  type: string
  description: Firmware string (e.g. "V1.1.28")

- id: vid_out_res_state
  source: vid_out_res_set
  type: integer
  description: 0..28 resolution code

- id: vout_state
  source: vout_set
  type: integer
  description: -80..6

- id: vout_mute_state
  source: vout_mute_set
  type: enum
  values: [on, off]

- id: vzoom_state
  source: vzoom_set
  type: integer
  description: 0..50

- id: zoom_state
  source: zoom_set
  type: enum
  values: [on, off]
```

## Variables
```yaml
# Settable parameters covered by Actions[] set/query pairs above.
# UNRESOLVED: no standalone settable variables documented separately from action commands.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event messages; all feedback is in direct response to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset    # Mreset resets unit to factory defaults
  - ip_static_set    # changing IP can disconnect active control session
  - ip_dhcp_set      # disabling DHCP without a configured static IP can disconnect the unit
  - ip_del_user      # removes Telnet credentials
interlocks: []
# UNRESOLVED: source documents no power-sequencing or hardware interlock requirements.
```

## Notes
- Command terminator is CR (0x0d). Response terminator is CR+LF (0x0a).
- Default Telnet port is 23 (per IPCFG and `System sta` example feedback). HTTP port 80 is also reported in `System sta` but no HTTP control API is documented in this manual.
- Default static IP per source: 192.168.1.254 (used only when DHCP is disabled).
- IPLogin defaults to off (`IPLogin of` shown in source) — no credentials required by default; enabling IPLogin requires username/password configured via IPAddUser.
- RS-232 2 port (controlled by `CSpara`) is the local serial control port for the AT-HDVS-200-RX itself.
- RS-232 1 port (controlled by `RS232para`) is a pass-through serial port used to send commands out to a connected display via the `RS232zone[...]` command. It is not a control transport for the AT-HDVS-200-RX itself.
- `HDBTRS232` configures the serial tunneling parameters for the HDBaseT IN link (paired-transmitter side).
- `BASS` command uses literal token `BASS1` in syntax/example, not `BASS`. Preserved verbatim.
- `Version` command takes the argument with no space (e.g. `VersionMCU`, `VersionVSRX`).
- `VidOutRes` integer→resolution mapping (0..28) and `PrefTimg` mapping (0..9) are enumerated in the source; see Actions[] descriptions.
- `RelayAuto` accepts `?` in addition to `on/off/sta` per the syntax table; `sta` and `?` both query.
- VOUT step/query: source documents `+` / `-` step and says executing VOUT with no argument shows the current value; `sta` not explicitly listed for VOUT.

<!-- UNRESOLVED: default RS-232 2 (CSpara) baud/data/parity/stop values not stated -->
<!-- UNRESOLVED: timing between commands / minimum inter-command delay not stated -->
<!-- UNRESOLVED: behaviour when Telnet session limit exceeded not stated -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDVS-200-RX_API.pdf
retrieved_at: 2026-05-14T11:03:31.159Z
last_checked_at: 2026-06-02T17:21:22.969Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:22.969Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions matched literally to source commands; transport parameters verified; source coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default baud rate for RS-232 2 (CSpara) control port not stated in source"
- "VOUT sta query argument behavior not explicitly documented (doc says \"execute VOUT without arguments\" to display current value)"
- "default not stated; configurable to 2400/4800/9600/19200/38400/57600/115200 via CSpara"
- "default not stated; configurable to 7 or 8 via CSpara"
- "default not stated; configurable to None/Odd/Even via CSpara"
- "default not stated; configurable to 1 or 2 via CSpara"
- "not stated in source"
- "no standalone settable variables documented separately from action commands."
- "source documents no unsolicited event messages; all feedback is in direct response to commands."
- "no multi-step macros described in source."
- "source documents no power-sequencing or hardware interlock requirements."
- "default RS-232 2 (CSpara) baud/data/parity/stop values not stated"
- "timing between commands / minimum inter-command delay not stated"
- "behaviour when Telnet session limit exceeded not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
