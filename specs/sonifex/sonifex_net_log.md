---
spec_id: admin/sonifex-netlog
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonifex Net-Log Control Spec"
manufacturer: Sonifex
model_family: "Net-Log Audio Logger"
aliases: []
compatible_with:
  manufacturers:
    - Sonifex
  models:
    - "Net-Log Audio Logger"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sonifex.com
source_urls:
  - https://www.sonifex.com/company/logos-images/handbooks/netlog.pdf
  - https://www.sonifex.com/technical/software/netlog/sonifex-netlog-crestron-demo-program.zip
  - https://www.sonifex.com/loggers/netlog/index.shtml
  - https://www.sonifex.com/technical/software/netlog/versions.shtml
retrieved_at: 2026-04-29T18:59:32.574Z
last_checked_at: 2026-07-22T07:46:34.238Z
generated_at: 2026-07-22T07:46:34.238Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "COM2 supports only one interface mode at a time (selected in Options → Control tab); source does not state whether mode switching requires a reboot or takes effect immediately. UNRESOLVED: IP/network control not available on this device (COM1 network config is for setup only, not external control)."
  - "source states \"Net-Log responds to 7 of the serial commands issued"
  - "no settable parameters documented as discrete Variables - all settable"
  - "no unsolicited event messages documented - device only responds to commands."
  - "no multi-step macro sequences documented."
  - "no safety warnings or interlock procedures stated in source."
  - "error codes for TIME/DATE query commands not specified in source."
  - "Televic CE2500 reply format not documented (source says \"responds\" but gives no reply bytes)."
  - "whether COM2 mode switch requires device reboot not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:46:34.238Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions (5 AMX/Crestron + 7 Televic) matched literal source commands; transport verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Sonifex Net-Log Control Spec

## Summary
Broadcast audio logger with two RS-232 serial ports. COM1 is for firmware updates and network config (fixed 115200/8/N/1, not for control). COM2 is the Serial Control Interface and is operator-selectable between two protocol modes via the Options screen: Televic CE2500 (conference mic-driven auto-record) or AMX/Crestron (simple record control + monitoring). This spec covers both COM2 interface modes at 19200/8/N/1.

<!-- UNRESOLVED: COM2 supports only one interface mode at a time (selected in Options → Control tab); source does not state whether mode switching requires a reboot or takes effect immediately. UNRESOLVED: IP/network control not available on this device (COM1 network config is for setup only, not external control). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # RTS asserted when valid chars to transmit; DCD/DTR not used
addressing:
  port: null  # N/A: serial-only device; no TCP port
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # START/STOP record commands present
- queryable      # STATUS/TIME/DATE query commands present
```

## Actions
```yaml
# ---------------------------------------------------------------------------
# AMX/Crestron interface commands (COM2, mode = AMX/Crestron)
# Frame: CMD DATA NL CR  (NL=0x0A, CR=0x0D). Commands are case-sensitive.
# ---------------------------------------------------------------------------

- id: start_recording
  label: Start Recording
  kind: action
  command: "START:ch\n\r"
  params:
    - name: channel
      type: string
      description: Channel identifier - "1,3" for stereo pair, "1,2,3,4" for mono channels
  description: Begins recording on specified channel(s). Reply is ACK or ERR:ee.
  example: "START:ch\r"  # ch = 1,3 or 1,2,3,4

- id: stop_recording
  label: Stop Recording
  kind: action
  command: "STOP:ch\n\r"
  params:
    - name: channel
      type: string
      description: Channel identifier - "1,3" for stereo pair, "1,2,3,4" for mono channels
  description: Stops recording on specified channel(s). Reply is ACK or ERR:ee.
  example: "STOP:ch\r"

- id: get_status
  label: Get Status
  kind: query
  command: "STATUS\n\r"
  params: []
  description: Returns STATE string with record channel status and archive alarm status.
  example: "STATUS\r"
  reply_example: "STATE:s1,s2,s3,s4,a1,a2,a3,a4,da\r"

- id: get_time
  label: Get Time
  kind: query
  command: "TIME:ch\n\r"
  params:
    - name: channel
      type: string
      description: Channel - "1,3" for stereo, "1,2,3,4" for mono
  description: Returns recording length and time-to-overwrite for specified channel.
  example: "TIME:ch\r"
  reply_example: "TIME:ch,t1,t2\r"  # t1=dd.hh.mm.ss length, t2=dd.hh.mm.ss to overwrite

- id: get_date
  label: Get Date
  kind: query
  command: "DATE\n\r"
  params: []
  description: Returns current date and time in GMT.
  example: "DATE\r"
  reply_example: "DATE:dd/mm/yyyy hh.mm.ss\r"

# ---------------------------------------------------------------------------
# Televic CE2500 interface commands (COM2, mode = Televic CE2500)
# Frame: STX ID DATA CRC ETX  (STX='%'=0x25, ETX=0x0D).
# CRC = 16-bit sum of ASCII chars STX + ID + DATA, rendered as 4 hex digits.
# Source: "Net-Log responds to 7 of the serial commands issued by the CE2500
# unit." Net-Log is the receiver; these arrive from a Televic CE2500 controller.
# ---------------------------------------------------------------------------

- id: televic_system_sync
  label: Televic System Synchronisation
  kind: action
  command: "%S{mic_state}{crc}\r"
  params:
    - name: mic_state
      type: string
      description: 4-char mic bitmap; e.g. "00010002" = mics 1 and 2 active, "0000" = none active
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'S' + mic_state
  description: Televic CE2500 system synchronisation. Reports active microphone bitmap.
  example: "%S0001000201D6\r"

- id: televic_president_mic_activate
  label: Televic President Microphone Activation
  kind: action
  command: "%P{mic_num}{speaker_name}{crc}\r"
  params:
    - name: mic_num
      type: string
      description: 4-digit microphone number, e.g. "0001"
    - name: speaker_name
      type: string
      description: Speaker name text (variable length)
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'P' + mic_num + speaker_name
  description: President microphone activation event from Televic CE2500. Triggers auto-record.
  example: "%P0001Mr John Smith05A4\r"

- id: televic_president_mic_deactivate
  label: Televic President Microphone Deactivation
  kind: action
  command: "%p{mic_num}{crc}\r"
  params:
    - name: mic_num
      type: string
      description: 4-digit microphone number, e.g. "0001"
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'p' + mic_num
  description: President microphone deactivation event from Televic CE2500.
  example: "%p00010131\r"

- id: televic_delegate_mic_activate
  label: Televic Delegate Microphone Activation
  kind: action
  command: "%M{mic_num}{speaker_name}{crc}\r"
  params:
    - name: mic_num
      type: string
      description: 4-digit microphone number, e.g. "0002"
    - name: speaker_name
      type: string
      description: Speaker name text (variable length)
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'M' + mic_num + speaker_name
  description: Delegate microphone activation event from Televic CE2500. Triggers auto-record.
  example: "%M0002Mr Joe Bloggs058D\r"

- id: televic_delegate_mic_deactivate
  label: Televic Delegate Microphone Deactivation
  kind: action
  command: "%m{mic_num}{crc}\r"
  params:
    - name: mic_num
      type: string
      description: 4-digit microphone number, e.g. "0002"
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'm' + mic_num
  description: Delegate microphone deactivation event from Televic CE2500.
  example: "%m0002012F\r"

- id: televic_deactivate_all_mics
  label: Televic Deactivate All Microphones
  kind: action
  command: "%V0000{crc}\r"
  params:
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'V' + '0000'
  description: Deactivate all Televic CE2500 microphones (mic_state fixed to "0000").
  example: "%V00000116F\r"

- id: televic_system_reset
  label: Televic System Reset
  kind: action
  command: "%R{crc}\r"
  params:
    - name: crc
      type: string
      description: 4-hex-digit 16-bit sum of ASCII of '%' + 'R'
  description: Televic CE2500 system reset (deactivate all microphones). No DATA field.
  example: "%R0052\r"
```

## Feedbacks
```yaml
# --- AMX/Crestron replies ---

- id: ack
  type: enum
  values: ["ACK"]
  description: Positive acknowledgement returned after valid START or STOP command.

- id: command_error
  type: enum
  values:
    - "1"  # invalid channel
    - "2"  # disabled channel
    - "3"  # illegal channel
    - "4"  # channel already in requested state
  description: Error reply format is ERR:ee where ee is a numeric error code. Applies to START and STOP commands only.

- id: record_state
  type: object
  fields:
    s1: integer  # channel 1 status: 0=not recording, 1=recording, 2=unavailable
    s2: integer  # channel 2 status
    s3: integer  # channel 3 status
    s4: integer  # channel 4 status
    a1: integer  # archive channel 1 alarm: 0=no alarm, 1=alarm, 3=unavailable
    a2: integer  # archive channel 2 alarm
    a3: integer  # archive channel 3 alarm
    a4: integer  # archive channel 4 alarm
    da: integer  # disk alarm status
  description: STATE reply from STATUS command. All values are integers.

- id: time_info
  type: object
  fields:
    channel: string  # channel queried
    t1: string      # recording length as dd.hh.mm.ss
    t2: string      # time to data overwrite as dd.hh.mm.ss
  description: TIME reply with recording duration and overwrite countdown.

- id: date_info
  type: string
  description: DATE reply with current system date/time in GMT, format dd/mm/yyyy hh.mm.ss.

# --- Televic CE2500 replies ---
# UNRESOLVED: source states "Net-Log responds to 7 of the serial commands issued
# by the CE2500 unit" but does not document the reply format/contents for any
# Televic command. Reply shape unknown.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented as discrete Variables - all settable
# parameters are accessed via the Options screen UI, not via serial commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages documented - device only responds to commands.
# The source notes the RS232 port has "relatively low priority" suggesting it does not
# emit events unprompted.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Note: source advises care when co-configuring Remote/Serial recording with Manual,
# Program, or Auto record modes - no priority is given between them.
```

## Notes
- Commands are case-sensitive (both AMX/Crestron and Televic: Televic uses case to distinguish president vs delegate and activate vs deactivate — S/s, P/p, M/m, V, R).
- Send one command, wait for response, then send next. Response time varies with recording/archive/play activity.
- RS232 port has low priority to avoid interrupting critical processes.
- Record Tally Outputs on 15-pin D-Type are open-collector driven (pins 12-15).
- REMOTE_I1–I4 inputs (15-pin D-Type pins 8-11) can be set to momentary or latching in Record Remotes Options screen; short-to-ground triggers record on the associated channel.
- COM1 is fixed at 115200/8/N/1 for firmware updates and network config — not used for device control.
- COM2 interface mode is operator-selected in Options → Control tab (Televic CE2500 OR AMX/Crestron); only one mode active at a time.
- Televic CE2500 auto-starts recording on mic activation and stops on deactivation; also extracts mic number + speaker name into cut metadata.
<!-- UNRESOLVED: error codes for TIME/DATE query commands not specified in source. -->
<!-- UNRESOLVED: Televic CE2500 reply format not documented (source says "responds" but gives no reply bytes). -->
<!-- UNRESOLVED: whether COM2 mode switch requires device reboot not stated in source. -->
````

Added 7 Televic CE2500 commands (verbatim payloads + CRC template). Bumped `get_status`/`get_time`/`get_date` `kind: action` → `kind: query`. Added `command:` field to existing AMX/Crestron actions (payload rule). Preserved all existing IDs/shapes. Updated Summary + Notes to cover both COM2 modes.

## Provenance

```yaml
source_domains:
  - sonifex.com
source_urls:
  - https://www.sonifex.com/company/logos-images/handbooks/netlog.pdf
  - https://www.sonifex.com/technical/software/netlog/sonifex-netlog-crestron-demo-program.zip
  - https://www.sonifex.com/loggers/netlog/index.shtml
  - https://www.sonifex.com/technical/software/netlog/versions.shtml
retrieved_at: 2026-04-29T18:59:32.574Z
last_checked_at: 2026-07-22T07:46:34.238Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:46:34.238Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions (5 AMX/Crestron + 7 Televic) matched literal source commands; transport verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "COM2 supports only one interface mode at a time (selected in Options → Control tab); source does not state whether mode switching requires a reboot or takes effect immediately. UNRESOLVED: IP/network control not available on this device (COM1 network config is for setup only, not external control)."
- "source states \"Net-Log responds to 7 of the serial commands issued"
- "no settable parameters documented as discrete Variables - all settable"
- "no unsolicited event messages documented - device only responds to commands."
- "no multi-step macro sequences documented."
- "no safety warnings or interlock procedures stated in source."
- "error codes for TIME/DATE query commands not specified in source."
- "Televic CE2500 reply format not documented (source says \"responds\" but gives no reply bytes)."
- "whether COM2 mode switch requires device reboot not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
