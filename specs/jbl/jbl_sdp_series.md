---
spec_id: admin/jbl-sdp-75
schema_version: ai4av-public-spec-v1
revision: 1
title: "JBL SDP-75 Processor Automation Protocol"
manufacturer: JBL
model_family: SDP-75
aliases: []
compatible_with:
  manufacturers:
    - JBL
  models:
    - SDP-75
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - jblsynthesis.com
source_urls:
  - "https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw45d0257f/pdfs/JBL%20Synthesis%20SDP-75_Automation%20Protocol%20Guide.pdf"
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw07c644ac/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-05-12T19:04:37.910Z
last_checked_at: 2026-06-02T01:48:16.561Z
generated_at: 2026-06-02T01:48:16.561Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this document is labeled \"SDP Series\" in the family record but the source only describes the SDP-75. Other SDP models (e.g. SDP-40, SDP-25) are not covered."
  - "flow control not stated in source"
  - "WoL magic-packet payload format not described in this source"
  - "trigger is a hardware signal, not a protocol command"
  - "source does not list variable ranges or step sizes - all"
  - "no device-defined multi-step macros documented in source."
  - "source contains no electrical-safety, thermal, or"
  - "- Firmware compatibility range for this protocol not stated (source example shows versions 4.0.0 and 3.8.7 in welcome banners but no published min/max)."
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:16.561Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literally in source; transport parameters verified; bidirectional coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# JBL SDP-75 Processor Automation Protocol

## Summary
Remote control spec for the JBL Synthesis SDP-75 surround processor. Supports both TCP/IP (port 44100) and RS-232 serial control using a simple ASCII line protocol, with the processor echoing state-change messages back to connected clients.

<!-- UNRESOLVED: this document is labeled "SDP Series" in the family record but the source only describes the SDP-75. Other SDP models (e.g. SDP-40, SDP-25) are not covered. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 44100
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: source explicitly states TCP `id` is identification only, not authentication; RS-232 has no login
```

## Traits
```yaml
# - powerable       # inferred from `power off SECURED FHZMCH48FE`, Wake-on-LAN, and trigger-input power-on
# - routable        # inferred from `profile <source>` and `tac preset <source>` source-selection commands
# - queryable       # inferred from `get current preset`, `get label`, `get all label`, `get current profile`, `get profile name`
# - levelable       # inferred from `volume`, `dvolume`, `volume_ramp`, `mute`, `dim`, `bypass` commands
```

## Actions
```yaml
# TCP identification - must be sent after connect before any other command is processed.
# Not present over RS-232.
- id: identify
  label: Identify Client (TCP)
  kind: action
  command: "id <client_name>"
  params:
    - name: client_name
      type: string
      description: Free-form client identifier string
  notes: |
    TCP only. Not authentication. Source example: `id my_automation_system`.

# Volume / level
- id: volume_set
  label: Set Main Volume
  kind: action
  command: "volume <volume>"
  params:
    - name: volume
      type: number
      description: Main volume in dB
- id: volume_delta
  label: Adjust Volume (Delta)
  kind: action
  command: "dvolume <delta>"
  params:
    - name: delta
      type: number
      description: Delta in dB to add to current main volume (may be negative)
- id: volume_ramp
  label: Volume Ramp
  kind: action
  command: "volume_ramp <target> <duration>"
  params:
    - name: target
      type: number
      description: Target volume in dB
    - name: duration
      type: integer
      description: Ramp duration in milliseconds

# Mute / dim / bypass (each accepts 0=off, 1=on, 2=toggle)
- id: mute
  label: Mute
  kind: action
  command: "mute <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable mute, 1=enable mute, 2=invert current state
- id: dim
  label: Dim
  kind: action
  command: "dim <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable dim, 1=enable dim, 2=invert current state
- id: bypass
  label: Bypass
  kind: action
  command: "bypass <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable bypass, 1=enable bypass, 2=invert current state
- id: send_volume_state
  label: Request Volume State
  kind: action
  command: "send_volume"
  notes: Asks the SDP-75 to emit current VOLUME / MUTE / DIM / BYPASS messages.

# Processing / correction modes
- id: remapping_mode
  label: Set Remapping Mode
  kind: action
  command: "remapping_mode <mode>"
  params:
    - name: mode
      type: enum
      values: [none, 2D, 3D, autoroute, manual]
      description: Remapping mode to enable
- id: use_acoustics_correction
  label: Acoustic Correction
  kind: action
  command: "use_acoustics_correction <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable, 1=enable, 2=invert
- id: use_level_alignment
  label: Level Alignment
  kind: action
  command: "use_level_alignment <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable, 1=enable, 2=invert
- id: use_time_alignment
  label: Time Alignment
  kind: action
  command: "use_time_alignment <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable, 1=enable, 2=invert
- id: quick_optimized
  label: Quick Optimization
  kind: action
  command: "quick_optimized <action>"
  params:
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=disable, 1=enable, 2=invert

# GUI navigation
- id: change_page
  label: Change GUI Page
  kind: action
  command: "change_page <delta>"
  params:
    - name: delta
      type: integer
      description: Number of pages to advance (positive=next, negative=previous)

# Preset / profile
- id: loadp
  label: Load Preset
  kind: action
  command: "loadp <preset>"
  params:
    - name: preset
      type: string
      description: |
        Preset number (1..N for user presets; 0 = built-in preset) OR a
        filename of the form `Config_<n>.xml` for legacy compatibility.
        Note the capital C in `Config` - command lines are case sensitive.
- id: get_current_preset
  label: Get Current Preset
  kind: query
  command: "get_current_preset"
- id: get_label
  label: Get Preset Label
  kind: query
  command: "get_label <n>"
  params:
    - name: n
      type: integer
      description: Preset number
- id: get_all_label
  label: Get All Preset Labels
  kind: query
  command: "get_all_label"
- id: profile
  label: Select Source / Profile
  kind: action
  command: "profile <source>"
  params:
    - name: source
      type: integer
      description: Source number (first source is 0)
- id: tac_preset
  label: Select Source (alias of profile)
  kind: action
  command: "tac_preset <source>"
  params:
    - name: source
      type: integer
      description: Source number (first source is 0)
  notes: Old alias of `profile`. Retained for backward compatibility.
- id: upmixer
  label: Set / Step Upmixer Mode
  kind: action
  command: "upmixer <mode>"
  params:
    - name: mode
      type: string
      description: |
        Upmixer mode. Empty = query current. `+` or `1` = next mode.
        `-` or `0` = previous mode. Named values: auro3d, dts, dolby,
        auto, native, legacy, upmix_on_native.
- id: fav_light
  label: Favorites / Light Button
  kind: action
  command: "fav_light"
  notes: Equivalent of the Light button on the remote control.
- id: get_current_profile
  label: Get Current Source / Profile
  kind: query
  command: "get_current_profile"
- id: get_profile_name
  label: Get Source Name
  kind: query
  command: "get_profile_name <n>"
  params:
    - name: n
      type: integer
      description: Source number

# Connection / power
- id: bye
  label: Close Connection
  kind: action
  command: "bye"
  notes: |
    Aliases: `exit`, `quit`. Server replies `BYE` and closes the socket.
    Must NOT be used on RS-232.
- id: power_off
  label: Power Off
  kind: action
  command: "power_off SECURED FHZMCH48FE"
  notes: |
    Switches off the SDP-75. The token `SECURED FHZMCH48FE` is part of
    the literal command string and must be sent verbatim. Powering
    back on is only possible via Wake-on-LAN or the trigger input
    (5-12 V), not via this protocol.

# Power-on (out-of-band - listed for completeness even though the regular
# protocol cannot power the unit on)
- id: wake_on_lan
  label: Wake on LAN
  kind: action
  command: ""  # UNRESOLVED: WoL magic-packet payload format not described in this source
  notes: |
    Send a Wake-on-LAN magic packet to the SDP-75's MAC address. The MAC
    is shown on the network information page of the GUI. Both the
    automation server and SDP-75 must be on the same IPv4 subnet.
- id: trigger_power_on
  label: Power On via Trigger Input
  kind: action
  command: ""  # UNRESOLVED: trigger is a hardware signal, not a protocol command
  notes: Apply 5-12 V to the trigger input of the SDP-75.
```

## Feedbacks
```yaml
# State messages emitted by the SDP-75 to all connected clients on
# every state change (not just in response to queries).
- id: volume
  type: number
  description: Main volume in dB (e.g. `VOLUME -12.000000`)
- id: dim
  type: enum
  values: [0, 1]
  description: Dim state (0=disabled, 1=enabled)
- id: mute
  type: enum
  values: [0, 1]
  description: Mute state (0=disabled, 1=enabled)
- id: bypass
  type: enum
  values: [0, 1]
  description: Bypass state (0=disabled, 1=enabled)
- id: meta_preset_loaded
  type: string
  description: Active profile / source, e.g. `META PRESET LOADED <profile>`
- id: srate
  type: number
  description: Current sampling rate, e.g. `SRATE <srate>`
- id: audiosync_status
  type: enum
  values: [0, 1]
  description: Audio-source sync status (1 = synchronized)
- id: audiosync
  type: enum
  values: [Master, Slave]
  description: Current audio sync mode
- id: speaker_info
  type: object
  description: |
    Per-speaker calibration data emitted on preset load:
    `SPEAKER_INFO <spk_number> <r_m> <theta_deg> <phi_deg>`.
    Speaker numbers begin at 0.
- id: label
  type: string
  description: |
    Preset label, e.g. `LABEL <n>: <name>`. Emitted as the answer to
    `get_label` / `get_all_label` requests.
```

## Variables
```yaml
# Settable parameters that are not themselves discrete actions.
# UNRESOLVED: source does not list variable ranges or step sizes - all
# numbers are sent verbatim. Marking as "the raw payload the source
# accepts" rather than fabricating a domain.
- id: main_volume_db
  type: number
  description: Master volume level in dB, set by `volume <vol>` / `dvolume <delta>` / `volume_ramp`.
- id: current_preset
  type: integer
  description: Active preset number; 0 = built-in preset, 1..N = user presets.
- id: current_profile
  type: integer
  description: Active source / profile number (first source is 0).
- id: sampling_rate
  type: number
  description: Current sampling rate as reported via `SRATE` message.
```

## Events
```yaml
# Unsolicited messages from the SDP-75.
- id: start_running
  description: |
    `START_RUNNING` - emitted shortly after a `loadp` command, once the
    SDP-75 is ready to make sound (typically a few tenths of a second).
- id: labels_clear
  description: |
    `LABELS CLEAR` - emitted just before a fresh preset list (e.g.
    after `get_all_label`). Clients maintaining a cached preset list
    should clear it on receipt.
- id: command_ack_ok
  description: `OK` - command succeeded.
- id: command_ack_error
  description: |
    `ERROR` followed by a human-readable description - command failed.
    May arrive before, after, or interleaved with other state messages.
- id: bye
  description: |
    `BYE` - server-side close acknowledgement (only on TCP, in
    response to `bye` / `exit` / `quit`).
- id: welcome
  description: |
    TCP-only. Sent immediately on connect, format:
    `Welcome on Trinnov Optimizer (Version <ver>, ID <id>)`.
    The 32-bit `ID` encodes machine type in the high bits and a serial
    number in the low 20 bits.
```

## Macros
```yaml
# Source section 8 contains a worked telnet session. Not part of the
# protocol surface; do not treat as built-in macros.
# UNRESOLVED: no device-defined multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # destructive, ends protocol control of the unit until WoL/trigger power-on
interlocks: []
# UNRESOLVED: source contains no electrical-safety, thermal, or
# interlock procedure text beyond the trigger-input voltage range
# (5-12 V) and the 12 V trigger-output voltage mentioned in section 7.
# No fault-recovery or error-clear sequences are described.
```

## Notes
- All command and message lines are ASCII, terminated with `\n` (0x0A), `\r` (0x0D), or `\r\n` (0x0D 0x0A). Both Unix, Mac, and Windows line endings are accepted.
- Commands and arguments are case sensitive (`profile` and `PROFILE` are different).
- Every command is answered with `OK` on success or `ERROR <description>` on failure. The SDP-75 also emits state-change messages (e.g. `VOLUME`, `MUTE`) on any state change regardless of what caused the change.
- The stream is continuously bidirectional, not a strict request/response model. Clients should not poll by repeated connect/disconnect cycles; the SDP-75 pushes all relevant state to connected clients.
- The protocol was authored by Trinnov Audio (the underlying Altitude32 platform) and is re-used verbatim by JBL's SDP-75; the welcome banner reads `Welcome on Trinnov Optimizer (...)`. Support contact in the source: `csupport@harman.com`.
- The TCP `id` command is identification only, not authentication. The SDP-75 will not process any further commands until `id` is received on a new TCP connection. RS-232 has no equivalent step.
- Wake-on-LAN is the standard way to power the unit on; the regular TCP / RS-232 protocol cannot power on a unit that is off. Power-off via the protocol requires the literal token `SECURED FHZMCH48FE` after `power_off` — drop it and the command will not work.
- The `tac_preset` command is an old alias of `profile`, retained for compatibility; new integrations should use `profile`.
- The `bye` / `exit` / `quit` commands only affect the client/server connection; they do not affect the SDP-75 itself. The source explicitly forbids using `bye` over RS-232.

<!-- UNRESOLVED:
- Firmware compatibility range for this protocol not stated (source example shows versions 4.0.0 and 3.8.7 in welcome banners but no published min/max).
- The `tac_preset` syntax in the source is ambiguous — listed once as `tac preset <source>` with a space and once inline alongside `profile`; the exact token may be `tac_preset` or `tac preset` (verifier should treat this as suspicious).
- Some `upmixer` argument values (`auro3d`, `dts`, `dolby`, `auto`, `native`, `legacy`, `upmix_on_native`) appear in the source but the parser list is broken across lines in the source markdown; if downstream behaviour matters, re-check against the original PDF.
- No per-channel, per-zone, or per-preset sub-command enumeration beyond what is listed; deeper DSP control (room correction settings, individual speaker trims) is not exposed by this protocol.
- This source covers the SDP-75 only. The "SDP Series" family record may contain other models (e.g. SDP-40) that are not described here.
-->

## Provenance

```yaml
source_domains:
  - jblsynthesis.com
source_urls:
  - "https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw45d0257f/pdfs/JBL%20Synthesis%20SDP-75_Automation%20Protocol%20Guide.pdf"
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw07c644ac/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-05-12T19:04:37.910Z
last_checked_at: 2026-06-02T01:48:16.561Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:16.561Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literally in source; transport parameters verified; bidirectional coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this document is labeled \"SDP Series\" in the family record but the source only describes the SDP-75. Other SDP models (e.g. SDP-40, SDP-25) are not covered."
- "flow control not stated in source"
- "WoL magic-packet payload format not described in this source"
- "trigger is a hardware signal, not a protocol command"
- "source does not list variable ranges or step sizes - all"
- "no device-defined multi-step macros documented in source."
- "source contains no electrical-safety, thermal, or"
- "- Firmware compatibility range for this protocol not stated (source example shows versions 4.0.0 and 3.8.7 in welcome banners but no published min/max)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
