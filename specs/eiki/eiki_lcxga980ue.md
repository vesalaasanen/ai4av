---
spec_id: admin/eiki-lcxga980ue
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki LC-XGA980UE Control Spec"
manufacturer: Eiki
model_family: LC-XGA980U/E
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - LC-XGA980U/E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/lc-xga980ue-rs-232-basic-serial-commands/?wpdmdl=4549&ind=68b9e2b3df1dc&refresh=19ad092c&filename=LC-XGA980UE-RS-232-basic-serial-commands.pdf"
  - https://www.eiki.com/download/lc-xga980ue-rs-232-basic-serial-commands/
  - https://www.eiki.com/download/lc-xga980ue-owners-manual/
  - https://www.eiki.com/download/lc-xga980ue-supplement/
retrieved_at: 2026-09-02T20:09:08.031Z
last_checked_at: 2026-09-07T22:16:35.844Z
generated_at: 2026-09-07T22:16:35.844Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not document voltage, current, power draw, or fault recovery"
  - "digit grouping/meaning"
  - "no settable parameter variables documented in source - commands"
  - "no unsolicited notification messages documented in source"
  - "no multi-step sequences documented in source"
  - "source does not document safety warnings, interlocks, or power-on sequencing"
  - "C44 (Freeze OFF) is documented for older models (col 2 only) but not the LC-XGA980U/E — omitted per spec coverage rule. C8B \"No Show\" has no hex listed in source and is not applicable to LC-XGA980U/E."
verification:
  verdict: verified
  checked_at: 2026-09-07T22:16:35.844Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec action-units (38 actions + 4 queries) match literals in the LC-XGA980U/E column of the source command table; transport (19200 8N1, CR LF) is verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Eiki LC-XGA980UE Control Spec

## Summary
RS-232 serial control spec for the Eiki LC-XGA980U/E projector. Commands are ASCII framed by CR LF, with hex equivalents documented in the source. Status queries return hex-coded replies.

<!-- UNRESOLVED: source does not document voltage, current, power draw, or fault recovery -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power on/off commands present
- routable   # inferred: input select commands present
- queryable  # inferred: query commands returning state present
- levelable  # inferred: volume up/down commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "C00\r\n"
  params: []

- id: power_off_compulsory
  label: Power Off (Compulsory)
  kind: action
  command: "C01\r\n"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "C02\r\n"
  params: []

- id: input_computer_1
  label: Mode Computer 1
  kind: action
  command: "C05\r\n"
  params: []

- id: input_computer_2
  label: Mode Computer 2
  kind: action
  command: "C06\r\n"
  params: []

- id: input_video
  label: Mode Video
  kind: action
  command: "C07\r\n"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "C09\r\n"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "C0A\r\n"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "C0B\r\n"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "C0C\r\n"
  params: []

- id: video_mute_on
  label: Video Mute On
  kind: action
  command: "C0D\r\n"
  params: []

- id: video_mute_off
  label: Video Mute Off
  kind: action
  command: "C0E\r\n"
  params: []

- id: aspect_4_3
  label: Regular Video (4:3)
  kind: action
  command: "C0F\r\n"
  params: []

- id: aspect_16_9
  label: Wide Video (16:9)
  kind: action
  command: "C10\r\n"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "C1C\r\n"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D\r\n"
  params: []

- id: clear_display
  label: Clear Display
  kind: action
  command: "C1E\r\n"
  params: []

- id: normal
  label: Normal
  kind: action
  command: "C1F\r\n"
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A\r\n"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B\r\n"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C\r\n"
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D\r\n"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "C3F\r\n"
  params: []

- id: system
  label: System
  kind: action
  command: "C42\r\n"
  params: []

- id: freeze_on_off
  label: Freeze On/Off
  kind: action
  command: "C43\r\n"
  params: []

- id: zoom_down
  label: Zoom Down
  kind: action
  command: "C46\r\n"
  params: []

- id: zoom_up
  label: Zoom Up
  kind: action
  command: "C47\r\n"
  params: []

- id: fine_sync_plus
  label: Fine Sync +
  kind: action
  command: "C49\r\n"
  params: []

- id: focus_down
  label: Focus Down
  kind: action
  command: "C4A\r\n"
  params: []

- id: focus_up
  label: Focus Up
  kind: action
  command: "C4B\r\n"
  params: []

- id: fine_sync_minus
  label: Fine Sync -
  kind: action
  command: "C4D\r\n"
  params: []

- id: zoom_mode
  label: Zoom Mode
  kind: action
  command: "C80\r\n"
  params: []

- id: focus_mode
  label: Focus Mode
  kind: action
  command: "C87\r\n"
  params: []

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "C88\r\n"
  params: []

- id: auto_image
  label: Auto Image
  kind: action
  command: "C89\r\n"
  params: []

- id: presentation_timer
  label: Presentation Timer
  kind: action
  command: "C8A\r\n"
  params: []

- id: keystone_plus
  label: Keystone +
  kind: action
  command: "C8E\r\n"
  params: []

- id: keystone_minus
  label: Keystone -
  kind: action
  command: "C8F\r\n"
  params: []

- id: projector_condition_query
  label: Projector Condition?
  kind: query
  command: "CR0\r\n"
  params: []

- id: active_input_mode_query
  label: Active Input Mode?
  kind: query
  command: "CR1\r\n"
  params: []

- id: lamp_time_query
  label: Lamp Time?
  kind: query
  command: "CR3\r\n"
  params: []

- id: image_orientation_query
  label: Image Orientation?
  kind: query
  command: "CR4\r\n"
  params: []
```

## Feedbacks
```yaml
- id: projector_condition
  type: enum
  values:
    - power_on
    - stand_by
    - count_down
    - cool_down
    - power_abnormality
    - temperature_abnormality
    - key_input_prohibition
  # Reply hex codes: 00ACK / 80ACK / 40ACK / 20ACK / 10ACK / 88ACK+28ACK / 02ACK (terminator 06h)

- id: active_input_mode
  type: enum
  values:
    - computer_1
    - computer_2
    - video
  # Reply hex codes: 1ACK / 2ACK / 3ACK (terminator 06h)

- id: lamp_time
  type: string
  # 4-digit decimal followed by ACK terminator (06h); UNRESOLVED: digit grouping/meaning

- id: image_orientation
  type: enum
  values:
    - normal
    - top_bottom_reversal
    - left_right_reversal
    - top_bottom_and_left_right
  # Reply hex codes: 11ACK / 10ACK / 01ACK / 00ACK
```

## Variables
```yaml
# UNRESOLVED: no settable parameter variables documented in source - commands
# are discrete action codes. Section kept empty.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification messages documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing
```

## Notes
Source documents 40 ms delay between commands. All commands and replies are framed by CR LF (0Dh 0Ah). Reply payloads end with ACK terminator 06h.

<!-- UNRESOLVED: C44 (Freeze OFF) is documented for older models (col 2 only) but not the LC-XGA980U/E — omitted per spec coverage rule. C8B "No Show" has no hex listed in source and is not applicable to LC-XGA980U/E. -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/lc-xga980ue-rs-232-basic-serial-commands/?wpdmdl=4549&ind=68b9e2b3df1dc&refresh=19ad092c&filename=LC-XGA980UE-RS-232-basic-serial-commands.pdf"
  - https://www.eiki.com/download/lc-xga980ue-rs-232-basic-serial-commands/
  - https://www.eiki.com/download/lc-xga980ue-owners-manual/
  - https://www.eiki.com/download/lc-xga980ue-supplement/
retrieved_at: 2026-09-02T20:09:08.031Z
last_checked_at: 2026-09-07T22:16:35.844Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-07T22:16:35.844Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec action-units (38 actions + 4 queries) match literals in the LC-XGA980U/E column of the source command table; transport (19200 8N1, CR LF) is verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not document voltage, current, power draw, or fault recovery"
- "digit grouping/meaning"
- "no settable parameter variables documented in source - commands"
- "no unsolicited notification messages documented in source"
- "no multi-step sequences documented in source"
- "source does not document safety warnings, interlocks, or power-on sequencing"
- "C44 (Freeze OFF) is documented for older models (col 2 only) but not the LC-XGA980U/E — omitted per spec coverage rule. C8B \"No Show\" has no hex listed in source and is not applicable to LC-XGA980U/E."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
