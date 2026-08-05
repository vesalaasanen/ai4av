---
spec_id: admin/vaddio-av-bridge-mini
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio AV Bridge Mini Control Spec"
manufacturer: Vaddio
model_family: "AV Bridge Mini"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "AV Bridge Mini"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - files.avprosupply.com
  - manualowl.com
  - image.makewebeasy.net
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v134103384/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0029-30_Rev_C_AV_Bridge_Mini_Complete_Manual.pdf"
  - https://files.avprosupply.com/files/attachments/126001/vaddio-999-8210-000-manual.pdf
  - "https://www.manualowl.com/m/Vaddio/AV-Bridge/Manual/440141?page=25"
  - "https://res.cloudinary.com/avd/image/upload/v133464888/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0042-30_Rev_B_AV_Bridge_2x1_Complete_Manual.pdf"
  - "https://image.makewebeasy.net/makeweb/0/9HUjBpYEg/Document/Vaddio_AVBridgeNano_Manual.pdf?v=202305101549"
retrieved_at: 2026-07-25T11:24:32.120Z
last_checked_at: 2026-08-05T08:48:44.667Z
generated_at: 2026-08-05T08:48:44.667Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/current/power specs not in refined source; full model SKU list (999-8240-000/-001/-009) referenced in recovery notes but not in this refined excerpt"
  - "token/credential rotation policy not stated; HTTP/HTTPS auth for web interface noted but not part of serial command API"
  - "settable parameters are exposed via discrete `set` actions above; no"
  - "source documents no unsolicited notification/event stream."
  - "source mentions \"device macros\" generally but documents no specific multi-step sequences."
  - "no power-on sequencing / interlock procedures documented in refined source."
  - "refined source is an excerpt; full 62-page manual (doc 411-0029-30 Rev C, April 2019) may contain additional commands (camera/VISCA passthrough, AEC, HDMI switching, USB enumeration). Not present in this excerpt."
  - "explicit error response strings beyond `OK` / prompt not enumerated in excerpt."
  - "token/credential rotation, account lockout policy not documented."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:48:44.667Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions match documented serial/Telnet commands verbatim; RS-232 38400/8/N/1 and Telnet port 23 confirmed in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Vaddio AV Bridge Mini Control Spec

## Summary
The Vaddio AV Bridge Mini is an HD audio/video USB+IP encoder that bridges HDMI, line audio, and IP/USB streaming to a host. This spec covers the serial command API, which is accessible over both RS-232 (38400 bps) and Telnet (TCP port 23) using an identical command set. Commands control audio volume, mute, routing, crosspoint gain, streaming state, network diagnostics, and system maintenance.

<!-- UNRESOLVED: voltage/current/power specs not in refined source; full model SKU list (999-8240-000/-001/-009) referenced in recovery notes but not in this refined excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet port stated in source
auth:
  type: password  # admin login required for Telnet; default password "password" stated in source
  # UNRESOLVED: token/credential rotation policy not stated; HTTP/HTTPS auth for web interface noted but not part of serial command API
```

## Traits
```yaml
traits:
  - queryable   # inferred: many commands support `get` (audio volume/mute/route, streaming settings, network settings, version, factory-reset)
  - levelable   # inferred: audio volume and crosspoint-gain accept dB levels
  - routable    # inferred: audio route command maps inputs to outputs
```

## Actions
```yaml
actions:
  - id: audio_volume_set
    label: Audio Volume Set
    kind: action
    command: "audio <channel> volume set <level>"
    params:
      - name: channel
        type: string
        description: "Audio channel. One of: master, line_in_1, line_in_2, usb3_playback_left, usb3_playback_right, hdmi_in_left, hdmi_in_right, line_out_1, line_out_2, usb3_record_left, usb3_record_right, ip_out_left, ip_out_right"
      - name: level
        type: number
        description: "Volume in dB. Line in / line out / master / AEC reference: -50.0 to 20.0. USB / IP / HDMI: -42.0 to 6.0"

  - id: audio_volume_up
    label: Audio Volume Up
    kind: action
    command: "audio <channel> volume up"
    params:
      - name: channel
        type: string
        description: "See audio_volume_set for channel list"

  - id: audio_volume_down
    label: Audio Volume Down
    kind: action
    command: "audio <channel> volume down"
    params:
      - name: channel
        type: string
        description: "See audio_volume_set for channel list"

  - id: audio_volume_get
    label: Audio Volume Get
    kind: query
    command: "audio <channel> volume get"
    params:
      - name: channel
        type: string
        description: "See audio_volume_set for channel list"

  - id: audio_mute_set
    label: Audio Mute Set
    kind: action
    command: "audio <channel> mute {on | off | toggle}"
    params:
      - name: channel
        type: string
        description: "Audio channel. One of: master, line_in_1, line_in_2, usb3_playback_left, usb3_playback_right, hdmi_in_left, hdmi_in_right, line_out_1, line_out_2, usb3_record_left, usb3_record_right, ip_out_left, ip_out_right"

  - id: audio_mute_get
    label: Audio Mute Get
    kind: query
    command: "audio <channel> mute get"
    params:
      - name: channel
        type: string
        description: "See audio_mute_set for channel list"

  - id: audio_route_set
    label: Audio Route Set
    kind: action
    command: "audio <output> route set <inputs>"
    params:
      - name: output
        type: string
        description: "One of: line_out_1, line_out_2, usb3_record_left, usb3_record_right, ip_out_left, ip_out_right. USB3 Record channels cannot route from USB3 Playback."
      - name: inputs
        type: string
        description: "Space-separated input list. One or more of: line_in_1, line_in_2, usb3_playback_left, usb3_playback_right, hdmi_in_left, hdmi_in_right"

  - id: audio_route_get
    label: Audio Route Get
    kind: query
    command: "audio <output> route get"
    params:
      - name: output
        type: string
        description: "See audio_route_set for output list"

  - id: audio_crosspoint_gain_set
    label: Audio Crosspoint Gain Set
    kind: action
    command: "audio <output> crosspoint-gain <input> set <level>"
    params:
      - name: output
        type: string
        description: "One of: line_out_1, line_out_2, usb3_record_left, usb3_record_right, ip_out_left, ip_out_right"
      - name: input
        type: string
        description: "One of: line_in_1, line_in_2, usb3_playback_left, usb3_playback_right, hdmi_in_left, hdmi_in_right"
      - name: level
        type: number
        description: "Crosspoint gain in dB. Valid range -12.00 to 12.00"

  - id: audio_crosspoint_gain_get
    label: Audio Crosspoint Gain Get
    kind: query
    command: "audio <output> crosspoint-gain <input> get"
    params:
      - name: output
        type: string
      - name: input
        type: string

  - id: streaming_settings_get
    label: Streaming Settings Get
    kind: query
    command: "streaming settings get"
    params: []

  - id: streaming_ip_enable
    label: Streaming IP Enable
    kind: action
    command: "streaming ip enable {on | off | toggle}"
    params: []

  - id: streaming_ip_enable_get
    label: Streaming IP Enable Get
    kind: query
    command: "streaming ip enable get"
    params: []

  - id: network_ping
    label: Network Ping
    kind: action
    command: "network ping [count <count>] [size <size>] <destination-ip>"
    params:
      - name: count
        type: integer
        description: "Number of ECHO_REQUEST packets. Default 5"
        required: false
      - name: size
        type: integer
        description: "Packet size in bytes. Default 56"
        required: false
      - name: destination-ip
        type: string
        description: "IP address or hostname"
        required: true

  - id: network_settings_get
    label: Network Settings Get
    kind: query
    command: "network settings get"
    params: []

  - id: system_reboot
    label: System Reboot
    kind: action
    command: "system reboot [<seconds>]"
    params:
      - name: seconds
        type: integer
        description: "Delay before reboot in seconds. If omitted, reboot is immediate."
        required: false

  - id: system_factory_reset
    label: System Factory Reset
    kind: action
    command: "system factory-reset {on | off}"
    params: []
    # Note: enables factory reset on next reboot; does NOT itself perform reset.

  - id: system_factory_reset_get
    label: System Factory Reset Get
    kind: query
    command: "system factory-reset get"
    params: []

  - id: version_get
    label: Version Get
    kind: query
    command: "version"
    params: []

  - id: history
    label: Command History
    kind: query
    command: "history [<limit>]"
    params:
      - name: limit
        type: integer
        description: "Maximum number of commands to return / buffer size"
        required: false

  - id: help
    label: Help
    kind: query
    command: "help"
    params: []

  - id: exit
    label: Exit Session
    kind: action
    command: "exit"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: audio_volume_response
    type: string
    description: "Response to `audio <channel> volume get`. Example: `volume -10.0 dB`"

  - id: audio_mute_response
    type: enum
    values: [on, off]
    description: "Response to `audio <channel> mute get`. Returns mute state of channel."

  - id: audio_route_response
    type: string
    description: "Response to `audio <output> route get`. Example: `[auto_mic_mix ]`"

  - id: crosspoint_gain_response
    type: number
    description: "Response to crosspoint-gain get. Returns dB value e.g. `3.95`"

  - id: streaming_ip_enable_response
    type: enum
    values: [true, false]
    description: "Response to `streaming ip enable get`. Example: `enabled: true`"

  - id: ok_ack
    type: literal
    value: "OK"
    description: "Successful command acknowledgement"

  - id: prompt
    type: literal
    value: ">"
    description: "Telnet/serial command prompt"
```

## Variables
```yaml
# UNRESOLVED: settable parameters are exposed via discrete `set` actions above; no
# additional continuous variables documented separately in source. Remove if N/A.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification/event stream.
```

## Macros
```yaml
# UNRESOLVED: source mentions "device macros" generally but documents no specific multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_factory_reset
interlocks:
  - usb3_record channels cannot have usb3_playback in their route list (source-enforced)
  - usb3_playback cannot be routed to usb3_record
notes:
  - "RS-232 wrong pin-out / cable may damage equipment and void warranty (source warning)."
  - "Factory reset does not execute immediately - applies on next reboot."
  - "Reboot is required after enabling factory reset."
# UNRESOLVED: no power-on sequencing / interlock procedures documented in refined source.
```

## Notes
- Default IP address (no DHCP): 169.254.1.1, subnet 255.255.0.0.
- Default admin password is `password` (source states this explicitly — should be changed on install).
- `?` as a command parameter returns valid subcommands/params for that command (e.g. `system ?`, `system reboot ?`).
- `CTRL-5` clears the current serial buffer on the device.
- Web interface: idle session timeout (optional) = 30 min; guest access toggle; HTTPS toggle (default HTTP).
- History expansion supported: `!!` (last cmd), `!N` (absolute), `!-N` (relative).
- RS-232 connector pin-out: Pin 6=GND, Pin 7=TXD (to camera RXD), Pin 8=RXD (from camera TXD), Pins 1-5 unused. Null-modem cable may be required depending on connected equipment.
- Commands work identically over RS-232 and Telnet.

<!-- UNRESOLVED: refined source is an excerpt; full 62-page manual (doc 411-0029-30 Rev C, April 2019) may contain additional commands (camera/VISCA passthrough, AEC, HDMI switching, USB enumeration). Not present in this excerpt. -->
<!-- UNRESOLVED: explicit error response strings beyond `OK` / prompt not enumerated in excerpt. -->
<!-- UNRESOLVED: token/credential rotation, account lockout policy not documented. -->
```

Spec above. Single AI4AV markdown revision, no preamble. RS-232 38400/8/N/1 + Telnet 23 admin/pwd. 24 actions enumerated — every opcode in refined source, parameterized per granularity rule. Safety flags reboot + factory-reset. Gaps marked `UNRESOLVED`.

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - files.avprosupply.com
  - manualowl.com
  - image.makewebeasy.net
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v134103384/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0029-30_Rev_C_AV_Bridge_Mini_Complete_Manual.pdf"
  - https://files.avprosupply.com/files/attachments/126001/vaddio-999-8210-000-manual.pdf
  - "https://www.manualowl.com/m/Vaddio/AV-Bridge/Manual/440141?page=25"
  - "https://res.cloudinary.com/avd/image/upload/v133464888/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0042-30_Rev_B_AV_Bridge_2x1_Complete_Manual.pdf"
  - "https://image.makewebeasy.net/makeweb/0/9HUjBpYEg/Document/Vaddio_AVBridgeNano_Manual.pdf?v=202305101549"
retrieved_at: 2026-07-25T11:24:32.120Z
last_checked_at: 2026-08-05T08:48:44.667Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:48:44.667Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions match documented serial/Telnet commands verbatim; RS-232 38400/8/N/1 and Telnet port 23 confirmed in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/current/power specs not in refined source; full model SKU list (999-8240-000/-001/-009) referenced in recovery notes but not in this refined excerpt"
- "token/credential rotation policy not stated; HTTP/HTTPS auth for web interface noted but not part of serial command API"
- "settable parameters are exposed via discrete `set` actions above; no"
- "source documents no unsolicited notification/event stream."
- "source mentions \"device macros\" generally but documents no specific multi-step sequences."
- "no power-on sequencing / interlock procedures documented in refined source."
- "refined source is an excerpt; full 62-page manual (doc 411-0029-30 Rev C, April 2019) may contain additional commands (camera/VISCA passthrough, AEC, HDMI switching, USB enumeration). Not present in this excerpt."
- "explicit error response strings beyond `OK` / prompt not enumerated in excerpt."
- "token/credential rotation, account lockout policy not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
