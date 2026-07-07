---
spec_id: admin/rotel-q5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel Q5 Control Spec"
manufacturer: Rotel
model_family: Q5
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - Q5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/Q5%20Protocol.pdf"
retrieved_at: 2026-06-30T16:11:28.375Z
last_checked_at: 2026-07-07T12:32:41.408Z
generated_at: 2026-07-07T12:32:41.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "whether feedback-request commands (power?, source?, etc.) also require the `!` terminator is ambiguous in the source — see Notes"
  - "none applicable"
  - "no multi-step sequences described in source"
  - "source contains no explicit safety warnings, interlock"
  - "whether feedback-request commands require the `!` terminator"
  - "exact valid range/format of track number response (source shows (#)# placeholder)"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:32:41.408Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions matched verbatim in source; full bidirectional command coverage with matching transport parameters. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel Q5 Control Spec

## Summary
The Rotel Q5 is a CD player / digital source component that supports an ASCII-based control protocol over both RS-232 (serial) and TCP/IP. Commands are ASCII strings terminated with `!`; responses are terminated with `$` (fixed-length) or `$$` (variable-length). This spec covers power, source selection, CD/PC-USB transport, dimmer, RS-232 feedback-mode control, and a full set of status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: whether feedback-request commands (power?, source?, etc.) also require the `!` terminator is ambiguous in the source — see Notes -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9596
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: power_on/power_off/power_toggle commands present
  - routable   # inferred: source selection commands present (cd/coax/opt/pcusb)
  - queryable  # inferred: extensive status query command set present
  - levelable  # inferred: dimmer level set commands (dimmer_0 .. dimmer_4) present
```

## Actions
```yaml
actions:
  # === POWER COMMANDS ===
  - id: power_on
    label: Power On
    kind: action
    command: "power_on!"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "power_off!"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "power_toggle!"
    params: []

  # === SOURCE SELECTION COMMANDS ===
  - id: select_source_cd
    label: Source CD
    kind: action
    command: "cd!"
    params: []

  - id: select_source_coax
    label: Source Coax
    kind: action
    command: "coax!"
    params: []

  - id: select_source_opt
    label: Source Optical
    kind: action
    command: "opt!"
    params: []

  - id: select_source_pcusb
    label: Source PC-USB
    kind: action
    command: "pcusb!"
    params: []

  # === CD TRANSPORT COMMANDS ===
  - id: play
    label: Play
    kind: action
    command: "play!"
    params: []

  - id: stop
    label: Stop
    kind: action
    command: "stop!"
    params: []

  - id: pause
    label: Pause Toggle
    kind: action
    command: "pause!"
    params: []

  - id: track_forward
    label: Track Forward
    kind: action
    command: "trkf!"
    params: []

  - id: track_backward
    label: Track Backward
    kind: action
    command: "trkb!"
    params: []

  - id: fast_forward
    label: Fast Forward
    kind: action
    command: "ff!"
    params: []

  - id: fast_backward
    label: Fast Backward
    kind: action
    command: "fb!"
    params: []

  - id: random_toggle
    label: Random Play Mode Toggle
    kind: action
    command: "rnd!"
    params: []

  - id: repeat_toggle
    label: Repeat Play Mode Toggle
    kind: action
    command: "rpt!"
    params: []

  - id: toggle_cd_time_display
    label: Toggle CD Time Display
    kind: action
    command: "time!"
    params: []

  # === NUMBER KEYS ===
  - id: number_key_1
    label: Number Key 1
    kind: action
    command: "1!"
    params: []

  - id: number_key_2
    label: Number Key 2
    kind: action
    command: "2!"
    params: []

  - id: number_key_3
    label: Number Key 3
    kind: action
    command: "3!"
    params: []

  - id: number_key_4
    label: Number Key 4
    kind: action
    command: "4!"
    params: []

  - id: number_key_5
    label: Number Key 5
    kind: action
    command: "5!"
    params: []

  - id: number_key_6
    label: Number Key 6
    kind: action
    command: "6!"
    params: []

  - id: number_key_7
    label: Number Key 7
    kind: action
    command: "7!"
    params: []

  - id: number_key_8
    label: Number Key 8
    kind: action
    command: "8!"
    params: []

  - id: number_key_9
    label: Number Key 9
    kind: action
    command: "9!"
    params: []

  - id: number_key_0
    label: Number Key 0
    kind: action
    command: "0!"
    params: []

  # === DIMMER COMMANDS ===
  - id: dimmer_toggle
    label: Toggle Display Dimmer
    kind: action
    command: "dimmer!"
    params: []

  - id: dimmer_0
    label: Set Display To Brightest
    kind: action
    command: "dimmer_0!"
    params: []

  - id: dimmer_1
    label: Set Display To Dimmer Level 1
    kind: action
    command: "dimmer_1!"
    params: []

  - id: dimmer_2
    label: Set Display To Dimmer Level 2
    kind: action
    command: "dimmer_2!"
    params: []

  - id: dimmer_3
    label: Set Display To Dimmer Level 3
    kind: action
    command: "dimmer_3!"
    params: []

  - id: dimmer_4
    label: Set Display To Dimmest
    kind: action
    command: "dimmer_4!"
    params: []

  # === RS232 FEEDBACK MODE COMMANDS ===
  - id: rs232_update_on
    label: Set RS232 Update To Auto (On)
    kind: action
    command: "rs232_update_on!"
    params: []

  - id: rs232_update_off
    label: Set RS232 Update To Manual (Off)
    kind: action
    command: "rs232_update_off!"
    params: []

  # === FEEDBACK REQUEST (QUERY) COMMANDS ===
  - id: power_status_query
    label: Power Status Query
    kind: query
    command: "power?"
    params: []

  - id: source_status_query
    label: Source Status Query
    kind: query
    command: "source?"
    params: []

  - id: play_status_query
    label: CD Play Status Query
    kind: query
    command: "status?"
    params: []

  - id: track_query
    label: Current CD Track Number Query
    kind: query
    command: "track?"
    params: []

  - id: track_name_query
    label: Current CD Track Name Query
    kind: query
    command: "track_name?"
    params: []

  - id: random_mode_query
    label: Random Play Mode Query
    kind: query
    command: "rnd?"
    params: []

  - id: repeat_mode_query
    label: Repeat Play Mode Query
    kind: query
    command: "rpt?"
    params: []

  - id: time_query
    label: Current CD Track Time Query
    kind: query
    command: "time?"
    params: []

  - id: disc_name_query
    label: Current CD Name Query
    kind: query
    command: "disc_name?"
    params: []

  - id: disc_type_query
    label: Loaded CD Type Query
    kind: query
    command: "disc_type?"
    params: []

  - id: freq_query
    label: Current Frequency Query
    kind: query
    command: "freq?"
    params: []

  - id: dimmer_query
    label: Front Display Dimmer Level Query
    kind: query
    command: "dimmer?"
    params: []

  - id: version_query
    label: Software Version Query
    kind: query
    command: "version?"
    params: []

  - id: ip_query
    label: IP Address Query
    kind: query
    command: "ip?"
    params: []

  - id: mac_query
    label: MAC Address Query
    kind: query
    command: "mac?"
    params: []

  - id: model_query
    label: Model Number Query
    kind: query
    command: "model?"
    params: []

  - id: discover_query
    label: Device Identification Query
    kind: query
    command: "discover?"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, standby]

  - id: source_state
    type: enum
    values: [cd, coax, opt, pcusb]

  - id: play_status
    type: enum
    values: [play, stop, pause]

  - id: track_number
    type: integer
    # response: track=(#)#$ (1-2 digit track number)

  - id: track_name
    type: string
    # response: track_name=text$$ (UTF-8 encoded)

  - id: random_mode
    type: enum
    values: [on, off]

  - id: repeat_mode
    type: enum
    values: [track, disc, off]

  - id: cd_time
    type: string
    # response: time=#:##:##$$ (track/disc time elapsed or remaining)

  - id: cd_name
    type: string
    # response: cd_name=text$$ (UTF-8 encoded)

  - id: disc_type
    type: enum
    values: [None, CD-DA]

  - id: frequency
    type: enum
    values: ["none", "44.1k", "48k", "88.2k", "96k", "176.4k", "192k", "352.8k", "384", "2.8m", "5.6m", "11.2m"]  # all quoted to preserve string labels

  - id: dimmer_level
    type: integer
    # response: dimmer=#$ (0-4)

  - id: software_version
    type: string
    # response: version=#.##$

  - id: ip_address
    type: string
    # response: ip=###.###.###.###$

  - id: mac_address
    type: string
    # response: mac=############$ (uppercase characters)

  - id: model_number
    type: string
    # response: model=text$

  - id: update_mode
    type: enum
    values: [auto, manual]

  - id: discover_info
    type: string
    # response: discover=ip=###.###.###.###port=#### mac=############$
```

## Variables
```yaml
# No continuously-settable parameter separate from the discrete dimmer actions.
# Dimmer is controlled via discrete level actions (dimmer_0 .. dimmer_4).
# UNRESOLVED: none applicable
```

## Events
```yaml
events:
  # When rs232_update_on (auto mode) is active, the device sends unsolicited
  # status updates whenever the front display changes. In manual mode
  # (rs232_update_off) basic status still auto-sends; full display refresh
  # must be requested.
  - id: auto_status_update
    description: >-
      Unsolicited status line(s) sent automatically when update_mode is auto
      and the display changes (e.g. power, source, track, time, metadata).
    # Format identical to query responses, terminated with $ or $$
  - id: front_usb_metadata_update
    description: >-
      Variable-length metadata strings (track_name, cd_name, time) sent in
      auto mode for Front USB source; terminated with $$.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock
# procedures, or power-on sequencing requirements. (The source notes the
# RS232 hardware lacks flow control; that is a communication-reliability
# note, not a safety interlock - see Notes.)
```

## Notes
- All commands sent to the device must be terminated with a `!` character. No spaces, no carriage return, no line feed — only the `!`. Example: `power_on!`.
- Responses from the device are terminated with `$` for fixed-length options, and `$$` for variable-length strings (e.g. CD disc/track metadata, time strings).
- The RS232 hardware does **not** support flow control. The source warns that care must be taken when sending/receiving data to avoid packet loss.
- IP control (TCP port 9596) requires the product be connected to a local network with a valid IP address. Command and response format is identical to the serial commands. Responses are sent back on the same port (9596).
- The CD transport commands (`play!`, `stop!`, `pause!`, `trkf!`, `trkb!`) also apply in PC-USB source mode; the source lists them separately under a "PC-USB TRANSPORT COMMANDS" section with `n/a` responses. They are represented here as single actions per mnemonic (identical command payload), not duplicated.
- **Terminator ambiguity for queries:** The source's general rule states all commands must terminate with `!`, but the feedback-request commands (Section 2) are documented as `power?`, `source?`, etc. without a trailing `!`. This spec records the query commands verbatim as shown in the source (`power?`). An implementer should verify whether queries require an appended `!` (e.g. `power?!`) against a real device.
- The Q5 ASCII controller spec is dated 10/29/2024, version 1.00 (original specification).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: whether feedback-request commands require the `!` terminator -->
<!-- UNRESOLVED: exact valid range/format of track number response (source shows (#)# placeholder) -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/Q5%20Protocol.pdf"
retrieved_at: 2026-06-30T16:11:28.375Z
last_checked_at: 2026-07-07T12:32:41.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:32:41.408Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions matched verbatim in source; full bidirectional command coverage with matching transport parameters. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "whether feedback-request commands (power?, source?, etc.) also require the `!` terminator is ambiguous in the source — see Notes"
- "none applicable"
- "no multi-step sequences described in source"
- "source contains no explicit safety warnings, interlock"
- "whether feedback-request commands require the `!` terminator"
- "exact valid range/format of track number response (source shows (#)# placeholder)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
