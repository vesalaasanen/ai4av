---
spec_id: admin/ezcoo-mx44-has2-4x4-hdmi-matrix
schema_version: ai4av-public-spec-v1
revision: 2
title: "EZCOO MX44-HAS2 4x4 HDMI Matrix Control Spec"
manufacturer: EZCOO
model_family: "EZCOO MX44-HAS2 4x4 HDMI Matrix"
aliases: []
compatible_with:
  manufacturers:
    - EZCOO
  models:
    - "EZCOO MX44-HAS2 4x4 HDMI Matrix"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.plus
  - manualslib.com
  - github.com
source_urls:
  - https://manuals.plus/ezcoo/ez-mx44has2-hdr-coaxial-audio-breakout-manual
  - https://www.manualslib.com/manual/2832920/Ezcoo-Ez-Mx44ha.html
  - https://github.com/bitfocus/companion-module-ezcoo-matrix
retrieved_at: 2026-06-12T14:53:53.689Z
last_checked_at: 2026-09-14T22:16:19.411Z
generated_at: 2026-09-14T22:16:19.411Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "raw TCP/Telnet port number not stated in source (IP control via browser described)"
  - "serial baud rate, data bits, parity, stop bits not stated in source"
  - "no response/feedback format documented beyond \"show\" commands"
  - "TCP port not stated in source"
  - "baud rate not stated in source"
  - "not stated in source"
  - "source does not document response formats for query commands"
  - "no settable parameters beyond discrete actions documented in source"
  - "no unsolicited notification mechanism documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "serial configuration (baud rate, data bits, parity, stop bits, flow control) not stated"
  - "TCP port for programmatic IP control not stated — only browser access described"
  - "response format for query commands (EZSTA, EZG HIP) not documented"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-09-14T22:16:19.411Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec commands appear verbatim in the source command table; transport http base_url is supported; no extra source commands. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-14
---

# EZCOO MX44-HAS2 4x4 HDMI Matrix Control Spec

## Summary

4x4 HDMI matrix switcher with RS-232 and IP (browser/HTTP) control. Supports input-to-output routing, external audio enable/disable per output, stream control, EDID management, and factory reset. Commands are ASCII strings terminated with Enter.

<!-- UNRESOLVED: raw TCP/Telnet port number not stated in source (IP control via browser described) -->
<!-- UNRESOLVED: serial baud rate, data bits, parity, stop bits not stated in source -->
<!-- UNRESOLVED: no response/feedback format documented beyond "show" commands -->

## Transport
```yaml
protocols:
  - serial
  - tcp   # inferred: "IP control" mentioned; only browser access documented, no raw TCP port stated
  - http  # browser-based control documented in source ("begin with http://")
addressing:
  base_url: "http://{ip_address}"  # source: type device IP in browser, begin with http:// (IP obtained via EZG HIP)
  port: null  # UNRESOLVED: TCP port not stated in source
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable       # inferred: input/output routing commands present
  - queryable      # inferred: status query and IP query commands present
```

## Actions
```yaml
actions:
  - id: system_help
    label: System Help
    kind: action
    command: "EZH"
    params: []

  - id: show_system_status
    label: Show System Status
    kind: query
    command: "EZSTA"
    params: []

  - id: factory_reset
    label: Reset to Factory Defaults
    kind: action
    command: "EZS RST"
    params: []

  - id: cascade_mode_enable
    label: Set Cascade Mode Enable (Turn OFF HDCP)
    kind: action
    command: "EZS DEBUG MODE1 EN"
    params: []

  - id: cascade_mode_disable
    label: Set Cascade Mode Disable (Turn ON HDCP)
    kind: action
    command: "EZS DEBUG MODE1 DIS"
    params: []

  - id: route_output_to_input
    label: Set Output x To Input y
    kind: action
    command: "EZS OUT{x} VS IN{y}"
    params:
      - name: x
        type: integer
        description: "Output number (0=ALL, 1-4)"
      - name: y
        type: integer
        description: "Input number (1-4)"

  - id: ex_audio_output_enable
    label: Set Ex-Audio Output Enable
    kind: action
    command: "EZS OUT{x} EXA EN"
    params:
      - name: x
        type: integer
        description: "Output number (0=ALL, 1-4)"

  - id: ex_audio_output_disable
    label: Set Ex-Audio Output Disable
    kind: action
    command: "EZS OUT{x} EXA DIS"
    params:
      - name: x
        type: integer
        description: "Output number (0=ALL, 1-4)"

  - id: output_stream_on
    label: Set Output x Stream ON
    kind: action
    command: "EZS OUT{x} STREAM ON"
    params:
      - name: x
        type: integer
        description: "Output number (0=ALL, 1-4)"

  - id: output_stream_off
    label: Set Output x Stream OFF
    kind: action
    command: "EZS OUT{x} STREAM OFF"
    params:
      - name: x
        type: integer
        description: "Output number (0=ALL, 1-4)"

  - id: set_input_edid
    label: Set Input x EDID
    kind: action
    command: "EZS IN{x} EDID {y}"
    params:
      - name: x
        type: integer
        description: "Input number (0=ALL, 1-4)"
      - name: y
        type: integer
        description: "EDID index (0-32)"

  - id: set_host_ip
    label: Set Host IP Address
    kind: action
    command: "EZS HIP {address}"
    params:
      - name: address
        type: string
        description: "IP address in dotted decimal (xxx.xxx.xxx.xxx)"

  - id: get_host_ip
    label: Get Host IP Address
    kind: query
    command: "EZG HIP"
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document response formats for query commands
# EZSTA returns system status but format not specified
# EZG HIP returns IP address but format not specified
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes

- All commands require Enter (carriage return / newline) terminator.
- IP control accessible via web browser using device IP with http:// prefix (device IP obtained by sending `EZG HIP` over RS232). Actual TCP command port for programmatic control not documented.
- EDID list and additional help available by sending `EZH` to the device.
- Output parameter `0` means ALL outputs in routing, audio, and stream commands.

<!-- UNRESOLVED: serial configuration (baud rate, data bits, parity, stop bits, flow control) not stated -->
<!-- UNRESOLVED: TCP port for programmatic IP control not stated — only browser access described -->
<!-- UNRESOLVED: response format for query commands (EZSTA, EZG HIP) not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
````

Changes vs on-disk: added `http` protocol + `addressing.base_url` (source states browser + `http://`), bumped revision 2, updated Summary/Notes wording. All 13 source commands already covered — none added. Ports/baud still UNRESOLVED (not in source).

## Provenance

```yaml
source_domains:
  - manuals.plus
  - manualslib.com
  - github.com
source_urls:
  - https://manuals.plus/ezcoo/ez-mx44has2-hdr-coaxial-audio-breakout-manual
  - https://www.manualslib.com/manual/2832920/Ezcoo-Ez-Mx44ha.html
  - https://github.com/bitfocus/companion-module-ezcoo-matrix
retrieved_at: 2026-06-12T14:53:53.689Z
last_checked_at: 2026-09-14T22:16:19.411Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:16:19.411Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec commands appear verbatim in the source command table; transport http base_url is supported; no extra source commands. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "raw TCP/Telnet port number not stated in source (IP control via browser described)"
- "serial baud rate, data bits, parity, stop bits not stated in source"
- "no response/feedback format documented beyond \"show\" commands"
- "TCP port not stated in source"
- "baud rate not stated in source"
- "not stated in source"
- "source does not document response formats for query commands"
- "no settable parameters beyond discrete actions documented in source"
- "no unsolicited notification mechanism documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "serial configuration (baud rate, data bits, parity, stop bits, flow control) not stated"
- "TCP port for programmatic IP control not stated — only browser access described"
- "response format for query commands (EZSTA, EZG HIP) not documented"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
