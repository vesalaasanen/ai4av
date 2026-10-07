---
spec_id: admin/knox-video-technologies-rs16x16hb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Knox Video Technologies RS16x16HB Control Spec"
manufacturer: "Knox Video Technologies"
model_family: RS16x16HB
aliases: []
compatible_with:
  manufacturers:
    - "Knox Video Technologies"
  models:
    - RS16x16HB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - markertek.com
  - kipdf.com
  - manualslib.com
source_urls:
  - https://www.markertek.com/Attachments/Specifications/Knox/RS16X16HB-Specifications.pdf
  - https://kipdf.com/rs16x16hb-operation-and-technical-manual-limited-warranty_5b159c817f8b9a17738b4601.html
  - https://www.manualslib.com/manual/1518127/Knox-Video-RS16x16HB.html
retrieved_at: 2026-09-12T16:10:20.343Z
last_checked_at: 2026-10-07T10:33:16.119Z
generated_at: 2026-10-07T10:33:16.119Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "lamp test command payload not extractable from source (only picture placeholder present)."
  - "source describes the lamp test command but the payload is a picture placeholder, not extractable text"
  - "source describes no unsolicited notifications beyond command acknowledgements (DONE / ERROR / routing map)."
  - "source describes no multi-step macro sequences authored by the user. The TAKE pattern (E/F/G queue then B/V/A final, or EE) is an execution primitive, not a stored macro."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing procedures beyond the note that rear DIP switches are only read at power-up (cycling power required for switch changes to take effect)."
  - "lamp test command payload missing from source (picture placeholder only)."
verification:
  verdict: verified
  checked_at: 2026-10-07T10:33:16.119Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 action units map one-to-one to source commands (lamp_test matched semantically; source payload is a picture placeholder), and the transport values are supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Knox Video Technologies RS16x16HB Control Spec

## Summary
This spec covers RS-232C control of the Knox Video Technologies RS16x16HB, a 16x16 audio/video matrix routing switcher. The device accepts a simple ASCII command protocol terminated by Carriage Return (0x0D, no Line Feed), with four configurable baud rates (1200, 2400, 9600, 19200) at 8N1. Commands support crosspoint routing, salvo routing, deferred TAKE execution, cross-connect, pattern storage and recall, status query, and a timed sequencer.

<!-- UNRESOLVED: lamp test command payload not extractable from source (only picture placeholder present). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; configurable via rear-panel DIP switch positions 1-2 (9600, 19200, 2400, 1200)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "No handshaking is required"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- routable  # inferred from extensive routing command set (B/V/A/E/F/G/X/Y/Z/J/K/L)
- queryable  # inferred from D status query command
```

## Actions
```yaml
- id: route_video_audio
  label: Route Video and Audio (Immediate)
  kind: action
  command: "B{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16; 00 turns off the crosspoint)

- id: route_video_only
  label: Route Video Only (Immediate)
  kind: action
  command: "V{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16; 00 turns off the crosspoint)

- id: route_audio_only
  label: Route Audio Only (Immediate)
  kind: action
  command: "A{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16; 00 turns off the crosspoint)

- id: route_dual_audio_video
  label: Route Video and Audio from Different Inputs (Immediate)
  kind: action
  command: "B{output}{video_input}{audio_input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: video_input
      type: integer
      description: Video input number (01-16)
    - name: audio_input
      type: integer
      description: Audio input number (01-16)

- id: route_salvo_av
  label: Salvo Route Video and Audio Across Output Range
  kind: action
  command: "X{first_output}{last_output}{input}"
  params:
    - name: first_output
      type: integer
      description: First output number in range (01-16)
    - name: last_output
      type: integer
      description: Last output number in range (01-16)
    - name: input
      type: integer
      description: Input number (00-16)

- id: route_salvo_video
  label: Salvo Route Video Only Across Output Range
  kind: action
  command: "Y{first_output}{last_output}{input}"
  params:
    - name: first_output
      type: integer
      description: First output number in range (01-16)
    - name: last_output
      type: integer
      description: Last output number in range (01-16)
    - name: input
      type: integer
      description: Input number (00-16)

- id: route_salvo_audio
  label: Salvo Route Audio Only Across Output Range
  kind: action
  command: "Z{first_output}{last_output}{input}"
  params:
    - name: first_output
      type: integer
      description: First output number in range (01-16)
    - name: last_output
      type: integer
      description: Last output number in range (01-16)
    - name: input
      type: integer
      description: Input number (00-16)

- id: hold_route_av
  label: Hold Route Video and Audio (Pending TAKE)
  kind: action
  command: "E{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16)

- id: hold_route_video
  label: Hold Route Video Only (Pending TAKE)
  kind: action
  command: "F{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16)

- id: hold_route_audio
  label: Hold Route Audio Only (Pending TAKE)
  kind: action
  command: "G{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16)

- id: take_pending_routes
  label: Execute TAKE on Pending Routes
  kind: action
  command: "EE"
  params: []

- id: cross_connect_av
  label: Cross-Connect Video and Audio (Teleconference)
  kind: action
  command: "J{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16)

- id: cross_connect_av_split
  label: Cross-Connect Audio to Different Pair
  kind: action
  command: "J{output}{video_input}{audio_input}"
  params:
    - name: output
      type: integer
      description: Output number (xx)
    - name: video_input
      type: integer
      description: Video input number (yy)
    - name: audio_input
      type: integer
      description: Audio input number (zz)

- id: cross_connect_video
  label: Cross-Connect Video Only
  kind: action
  command: "K{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16)

- id: cross_connect_audio
  label: Cross-Connect Audio Only
  kind: action
  command: "L{output}{input}"
  params:
    - name: output
      type: integer
      description: Output number (01-16)
    - name: input
      type: integer
      description: Input number (01-16)

- id: store_pattern
  label: Store Current Crosspoint Pattern
  kind: action
  command: "S{pattern}"
  params:
    - name: pattern
      type: integer
      description: Pattern storage slot (upper bound 16; lower bound UNRESOLVED because the source reads "0l")

- id: recall_pattern
  label: Recall Stored Crosspoint Pattern
  kind: action
  command: "R{pattern}"
  params:
    - name: pattern
      type: integer
      description: Pattern storage slot (upper bound 16; lower bound UNRESOLVED because the source reads "0l")

- id: query_status
  label: Read Crosspoint Status
  kind: query
  command: "D"
  params: []

- id: start_sequencer
  label: Start Timed Sequencer
  kind: action
  command: "T{interval}"
  params:
    - name: interval
      type: integer
      description: Cycle interval in seconds (1-999)

- id: stop_sequencer
  label: Stop Timed Sequencer
  kind: action
  command: "N"
  params: []

- id: lamp_test
  label: Lamp Test
  kind: action
  # UNRESOLVED: source describes the lamp test command but the payload is a picture placeholder, not extractable text
  params: []
```

## Feedbacks
```yaml
- id: status_routing_map
  type: string
  description: In verbose mode, each routing command causes the current routing map to be reported on the RS232 line as a multi-line listing of "OUTPUT {n} Video {in} Audio {in}" rows, followed by the word DONE. The status report does not disturb the existing crosspoint pattern.
- id: ack_done
  type: enum
  values: [done]
  description: In nonverbose mode, only the word DONE is reported after each successful routing command.
- id: ack_error
  type: enum
  values: [error]
  description: In either mode, an incorrect or meaningless command causes the word ERROR to be reported.
```

## Variables
```yaml
# No continuous variable parameters documented. All routing is by discrete crosspoint command.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications beyond command acknowledgements (DONE / ERROR / routing map).
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences authored by the user. The TAKE pattern (E/F/G queue then B/V/A final, or EE) is an execution primitive, not a stored macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing procedures beyond the note that rear DIP switches are only read at power-up (cycling power required for switch changes to take effect).
```

## Notes
- Command terminator is Carriage Return (0x0D). Do not send Line Feed (0x0A).
- Letter case (upper/lower) is accepted for command mnemonics.
- Baud rate is set via rear-panel DIP switch positions 1-2: 19200=ON/ON, 1200=OFF/ON, 2400=ON/OFF, 9600=OFF/OFF. All rates 8N1, no handshaking.
- DIP switch position 3 selects verbose (ON) vs nonverbose (OFF) answerback mode.
- DIP switch position 4 locks out the front panel keypad when ON.
- DIP switch position 5 disables breakaway audio when ON (audio always switches with video).
- DIP switches 6-8 are reserved; must remain OFF.
- Switch changes are read only at power-up; user must cycle power for changes to take effect.
- Input number 00 turns off a crosspoint (e.g., B0100 turns off output 1).
- Routing to input 0 via salvo commands (Xmmnnoo) also turns off the range.

<!-- UNRESOLVED: lamp test command payload missing from source (picture placeholder only). -->

## Provenance

```yaml
source_domains:
  - markertek.com
  - kipdf.com
  - manualslib.com
source_urls:
  - https://www.markertek.com/Attachments/Specifications/Knox/RS16X16HB-Specifications.pdf
  - https://kipdf.com/rs16x16hb-operation-and-technical-manual-limited-warranty_5b159c817f8b9a17738b4601.html
  - https://www.manualslib.com/manual/1518127/Knox-Video-RS16x16HB.html
retrieved_at: 2026-09-12T16:10:20.343Z
last_checked_at: 2026-10-07T10:33:16.119Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:33:16.119Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 action units map one-to-one to source commands (lamp_test matched semantically; source payload is a picture placeholder), and the transport values are supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "lamp test command payload not extractable from source (only picture placeholder present)."
- "source describes the lamp test command but the payload is a picture placeholder, not extractable text"
- "source describes no unsolicited notifications beyond command acknowledgements (DONE / ERROR / routing map)."
- "source describes no multi-step macro sequences authored by the user. The TAKE pattern (E/F/G queue then B/V/A final, or EE) is an execution primitive, not a stored macro."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing procedures beyond the note that rear DIP switches are only read at power-up (cycling power required for switch changes to take effect)."
- "lamp test command payload missing from source (picture placeholder only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
