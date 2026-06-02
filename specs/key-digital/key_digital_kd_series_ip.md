---
spec_id: admin/key-digital-kd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital KD Series Control Spec"
manufacturer: "Key Digital"
model_family: KD-4x4CSA
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
  models:
    - KD-4x4CSA
    - KD-8x8CSA
  firmware: "\"1.02\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
source_urls:
  - https://keydigital.com/Downloads/KD-4x4_8x8CSA/KD-4x4_8x8CSA_Manual.pdf
retrieved_at: 2026-05-08T15:21:29.666Z
last_checked_at: 2026-06-02T17:22:44.388Z
generated_at: 2026-06-02T17:22:44.388Z
firmware_coverage: "\"1.02\""
protocol_coverage: []
known_gaps:
  - "source documents no unsolicited / asynchronous notifications."
  - "source documents no multi-step macro sequences."
  - "source documents no electrical safety warnings, interlocks, or power-on"
  - "firmware compatibility range — source only shows F/W 1.02 in the help/status examples."
  - "response payloads for every command except H and STA. Source says \"If a new command is received, a prompt should be sent back\" but does not document per-command ACK/NAK strings or error codes."
  - "behavior when an invalid command is sent — no error string syntax documented."
  - "exact System Address prefix syntax (position, separator, whether prefix consumes the leading 'SP' of mnemonics)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:44.388Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions matched literally in source; transport fully verified; bidirectional coverage of source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Key Digital KD Series Control Spec

## Summary
Control spec for the Key Digital KD-4x4CSA and KD-8x8CSA HDMI matrix switchers (CSA series). Devices accept an ASCII command protocol over either RS-232 or TCP/IP (Telnet). Commands are not case-sensitive, must omit interior spaces, and must be terminated with carriage return + line feed.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  host: "192.168.0.239"  # factory default IP per source
  port: 23               # factory default TCP port per source
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
framing:
  terminator: "\r\n"  # source: "Carriage return and line feed is required at the end of each string"
  case_sensitive: false  # source: "Commands are not case-sensitive"
  strip_spaces: true     # source: "Spaces are shown for clarity; commands should NOT have any spaces"
```

## Traits
```yaml
- powerable   # inferred from PN / PF commands
- routable    # inferred from SPOxxSIyy input-to-output routing command
- queryable   # inferred from STA / H query commands
```

## Actions
```yaml
- id: help
  label: Help
  kind: query
  command: "H"
  params: []
  notes: "Returns entire API in readable format."

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

- id: status_query
  label: Show Global System Status
  kind: query
  command: "STA"
  params: []
  notes: "Returns power, RS-232 settings, front panel state, network settings, per-input EDID/LINK, per-output routing/state, per-audio-output enable flags."

- id: set_output_input
  label: Set Output to Video Input
  kind: action
  command: "SPO{output}SI{input}"
  params:
    - name: output
      type: string
      description: "Output selector: 01-04 (KD-4x4CSA) or 01-08 (KD-8x8CSA), or A=all"
    - name: input
      type: string
      description: "Input selector: 01-04 (KD-4x4CSA) or 01-08 (KD-8x8CSA), or U=up, D=down"

- id: set_output_state
  label: Set Output On/Off
  kind: action
  command: "SPO{output}{state}"
  params:
    - name: output
      type: string
      description: "Output selector: 01-04/01-08, or A=all"
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_output_debug
  label: Set Output Debug Mode On/Off
  kind: action
  command: "SPO{output}DBG{state}"
  params:
    - name: output
      type: string
      description: "Output selector: 01-04/01-08, or A=all"
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_output_video_format
  label: Set Output Video Format
  kind: action
  command: "SPO{output}HFM{mode}"
  params:
    - name: output
      type: string
      description: "Output selector: 01-04/01-08, or A=all"
    - name: mode
      type: enum
      values: [A, D, H]
      description: "A=Auto, D=Forced DVI, H=Bypass (HDMI)"

- id: copy_edid_from_output
  label: Copy EDID from Output to Input
  kind: action
  command: "SPCEDID{input}H{output}"
  params:
    - name: input
      type: string
      description: "Target input: 01-04 or A=all"
    - name: output
      type: string
      description: "Source output: 01-04"

- id: copy_edid_from_default
  label: Copy EDID from Default Preset to Input
  kind: action
  command: "SPCEDID{input}D{preset}"
  params:
    - name: input
      type: string
      description: "Target input: 01-04 or A=all"
    - name: preset
      type: string
      description: "Default EDID preset: 01-15 (see EDID preset reference)"

- id: set_output_analog_audio
  label: Enable/Disable External Analog Audio Output
  kind: action
  command: "SPO{output}AA{state}"
  params:
    - name: output
      type: string
      description: "Output selector: 01-04 or A=all"
    - name: state
      type: enum
      values: [E, D]
      description: "E=Enable, D=Disable"

- id: set_output_digital_audio
  label: Enable/Disable External Digital Audio Output
  kind: action
  command: "SPO{output}DA{state}"
  params:
    - name: output
      type: string
      description: "Output selector: 01-04 or A=all"
    - name: state
      type: enum
      values: [E, D]
      description: "E=Enable, D=Disable"

- id: set_host_ip_address
  label: Set Host IP Address
  kind: action
  command: "SPCETIPA{ip}"
  params:
    - name: ip
      type: string
      description: "Dotted-quad IPv4 address, each octet 000-255"

- id: set_net_mask
  label: Set Net Mask
  kind: action
  command: "SPCETIPM{mask}"
  params:
    - name: mask
      type: string
      description: "Dotted-quad IPv4 netmask, each octet 000-255"

- id: set_route_ip_address
  label: Set Route IP Address
  kind: action
  command: "SPCETIPR{route}"
  params:
    - name: route
      type: string
      description: "Dotted-quad IPv4 gateway address, each octet 000-255"

- id: set_tcp_port
  label: Set TCP/IP Port
  kind: action
  command: "SPCETIPP{port}"
  params:
    - name: port
      type: string
      description: "TCP port number, 0001-9999 (four-digit zero-padded per source)"

- id: network_reboot_apply
  label: Network Reboot and Apply New Config
  kind: action
  command: "SPCETIPB"
  params: []

- id: set_system_address
  label: Set System Address
  kind: action
  command: "SPCA{address}"
  params:
    - name: address
      type: string
      description: "System address: 00-99 (00 = single-unit mode)"

- id: set_rs232_baud_rate
  label: Set RS-232 Baud Rate
  kind: action
  command: "SPCRSB{rate}"
  params:
    - name: rate
      type: enum
      values: ["0", "1", "2", "3", "4"]
      description: "0=57600, 1=38400, 2=19200, 3=9600, 4=4800"

- id: set_front_panel_buttons
  label: Enable/Disable Front Panel Buttons
  kind: action
  command: "SPCFB{state}"
  params:
    - name: state
      type: enum
      values: [E, D]
      description: "E=Enable, D=Disable"

- id: reset_factory_default_keep_network
  label: Reset to Factory Default (preserve network config)
  kind: action
  command: "SPCDF00"
  params: []

- id: reset_factory_default_all
  label: Reset to Factory Default (all settings)
  kind: action
  command: "SPCDF"
  params: []
```

## Feedbacks
```yaml
# All observable state is returned as a multi-line ASCII block from the STA query.
# The source does not document per-field query opcodes; clients must parse the STA payload.

- id: power_state
  type: enum
  values: [ON, OFF]
  source: "STA -> 'Power : <ON|OFF>'"

- id: rs232_settings
  type: string
  source: "STA -> 'RS232 : Baud Rate=<n>bps, Data=8bit, Parity=None, Stop=1bit'"

- id: front_panel_state
  type: enum
  values: [Enabled, Disabled]
  source: "STA -> 'Front Panel Button : <Enabled|Disabled>'"

- id: mac_address
  type: string
  source: "STA -> 'MAC Address = <xx:xx:xx:xx:xx:xx>'"

- id: host_ip_address
  type: string
  source: "STA -> 'Host IP Address = <ddd.ddd.ddd.ddd>'"

- id: net_mask
  type: string
  source: "STA -> 'Net Mask = <ddd.ddd.ddd.ddd>'"

- id: router_ip_address
  type: string
  source: "STA -> 'Router IP Address = <ddd.ddd.ddd.ddd>'"

- id: tcp_port
  type: integer
  source: "STA -> 'TCP Port = <zzzz>'"

- id: video_input_state
  type: object
  description: "Per-input EDID assignment and HDMI source LINK state"
  source: "STA -> 'Video Input <nn> : EDID = <preset>, LINK = <ON|OFF>'"

- id: video_output_state
  type: object
  description: "Per-output routed input, output enable, sink LINK, debug, video format mode"
  source: "STA -> 'Video Output <nn> : IN = <nn>, OUT = <ON|OFF>, LINK = <ON|OFF>, DBG = <ON|OFF>, <AUTO|DVI|BYPASS>'"

- id: audio_output_state
  type: object
  description: "Per-audio-output analog and digital enable flags"
  source: "STA -> 'Audio Output <nn> : Analog = <Enabled|Disabled>, Digital = <Enabled|Disabled>'"

- id: firmware_version
  type: string
  source: "STA / H header -> 'F/W Version : <v>'"

- id: system_address_state
  type: integer
  source: "STA / H header -> 'System Address = <xx>'"

- id: command_prompt
  type: string
  description: "Device emits a prompt of the form '<MODEL>>' after processing each command."
  source: "H output footer: 'If a new command is received, a prompt should be sent back.'"
```

## Variables
```yaml
# All settable state is driven by the Actions above; the source does not expose
# variables that are not bound to a documented set-command. Section intentionally empty.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited / asynchronous notifications.
# The only device-initiated output described is the post-command prompt (see feedbacks.command_prompt).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents no electrical safety warnings, interlocks, or power-on
# sequencing requirements. Note that SPCDF (reset to factory default all) and SPCETIPB
# (network reboot/apply) are destructive in the sense that they will disrupt control
# sessions; the integrator may wish to confirm these in higher layers, but the source
# itself contains no explicit safety language.
```

## Notes
- Command framing: every command string must be terminated with `\r\n` (carriage return + line feed). The device will not act on an unterminated command.
- Commands are not case-sensitive. The protocol document shows commands with spaces for readability, but **interior spaces must be removed before sending**. Examples: `SPO 01 SI 02` is documented but the wire payload is `SPO01SI02\r\n`; `SPC EDID 01 D 04` is documented but the wire payload is `SPCEDID01D04\r\n`.
- Multi-device addressing: when more than one KD unit shares a control bus, every command may be prefixed with the two-digit System Address `zz=[01-99]`. Address `00` indicates single-unit mode and requires no prefix. The exact prefix syntax is described in source only as "All Commands may have Prefix System Address zz=[01-99]" without a worked example — implementers should verify against a live device.
- TCP/IP control is the same ASCII protocol exposed over a Telnet server (default port 23). After connecting, the device emits a `<MODEL>>` prompt and accepts commands line-by-line.
- Default network settings shipped from factory: IP 192.168.0.239, TCP port 23, baud rate 57600. The `SPCETIPB` command must be issued after changing any network parameter for the new configuration to take effect.
- EDID preset 00 (shown in the EDID Preset Reference Table) copies EDID from HDMI Output 08. Note this preset is referenced in the table but the `SPC EDID xx D zz` command syntax restricts `zz=[01-15]`; preset 00 may only be selectable via a different mechanism or only on the KD-8x8CSA — source is ambiguous.
- The `SPO xx HFM` mode mnemonics (A / D / H) map to Auto / Forced DVI / Bypass per the H help output; the STA status block reports the same field as `AUTO` / `DVI` / `BYPASS` (full words) — clients parsing STA should expect the word form, not the single-letter mnemonic.
<!-- UNRESOLVED: firmware compatibility range — source only shows F/W 1.02 in the help/status examples. -->
<!-- UNRESOLVED: response payloads for every command except H and STA. Source says "If a new command is received, a prompt should be sent back" but does not document per-command ACK/NAK strings or error codes. -->
<!-- UNRESOLVED: behavior when an invalid command is sent — no error string syntax documented. -->
<!-- UNRESOLVED: exact System Address prefix syntax (position, separator, whether prefix consumes the leading 'SP' of mnemonics). -->

## Provenance

```yaml
source_domains:
  - keydigital.com
source_urls:
  - https://keydigital.com/Downloads/KD-4x4_8x8CSA/KD-4x4_8x8CSA_Manual.pdf
retrieved_at: 2026-05-08T15:21:29.666Z
last_checked_at: 2026-06-02T17:22:44.388Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:44.388Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions matched literally in source; transport fully verified; bidirectional coverage of source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents no unsolicited / asynchronous notifications."
- "source documents no multi-step macro sequences."
- "source documents no electrical safety warnings, interlocks, or power-on"
- "firmware compatibility range — source only shows F/W 1.02 in the help/status examples."
- "response payloads for every command except H and STA. Source says \"If a new command is received, a prompt should be sent back\" but does not document per-command ACK/NAK strings or error codes."
- "behavior when an invalid command is sent — no error string syntax documented."
- "exact System Address prefix syntax (position, separator, whether prefix consumes the leading 'SP' of mnemonics)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
