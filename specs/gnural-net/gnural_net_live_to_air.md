---
spec_id: admin/gnural_net-live_to_air
schema_version: ai4av-public-spec-v1
revision: 1
title: "Gnural Net Live To Air Control Spec"
manufacturer: "Gnural Net"
model_family: LiveToAir
aliases: []
compatible_with:
  manufacturers:
    - "Gnural Net"
  models:
    - LiveToAir
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - gnuralnetdatastorage.s3.amazonaws.com
source_urls:
  - "https://gnuralnetdatastorage.s3.amazonaws.com/Gnural-Documentation/LiveToAir%20Macro%20Documentation.pdf"
retrieved_at: 2026-04-30T04:41:19.155Z
last_checked_at: 2026-06-02T22:07:22.414Z
generated_at: 2026-06-02T22:07:22.414Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical control interface (front panel, dedicated hardware) not documented"
  - "/State endpoint structure not documented in source"
  - "no discrete settable parameters documented outside of commands"
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step macro definitions in source"
  - "no safety warnings or interlock procedures in source"
  - "physical RS-232 / serial control — not mentioned in source"
  - "firmware version compatibility — not stated in source"
  - "/State response format — not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:22.414Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Gnural Net Live To Air Control Spec

## Summary
The Gnural Net Live To Air is a call-in manager and audio mixing system for broadcast production. Control is provided via an HTTP REST API running on port 56000, with endpoints for issuing commands and querying system state. No authentication is required.

<!-- UNRESOLVED: physical control interface (front panel, dedicated hardware) not documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 56000
  base_url: http://localhost:56000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # inferred: SelectChannel, SelectCallInQueue, SelectNextGuestInCallInQueue, SelectPreviousGuestInCallInQueue
- levelable   # inferred: SetChannelAudioOutputVolume, SetChannelAudioReturnVolume, SetOperatorSpeakersVolume, SetOperatorMicrophoneVolume
- queryable   # inferred: /State endpoint returns system state
```

## Actions
```yaml
- id: none
  label: No Operation
  kind: action
  params: []

- id: call_or_on_air_channel
  label: Call Or On Air Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: mute_channel_audio_output
  label: Mute Channel Audio Output
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: mute_channel_audio_return
  label: Mute Channel Audio Return
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: mute_operator_microphone
  label: Mute Operator Microphone
  kind: action
  params: []

- id: mute_operator_speakers
  label: Mute Operator Speakers
  kind: action
  params: []

- id: off_air_all_channels
  label: Off Air All Channels
  kind: action
  params: []

- id: off_air_channel
  label: Off Air Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: off_air_drop_or_clear_channel
  label: Off Air Drop Or Clear Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: on_air_all_channels
  label: On Air All Channels
  kind: action
  params: []

- id: on_air_channel
  label: On Air Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: select_channel
  label: Select Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number to select

- id: toggle_mute_channel_audio_output
  label: Toggle Mute Channel Audio Output
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: toggle_mute_channel_audio_return
  label: Toggle Mute Channel Audio Return
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: toggle_mute_operator_microphone
  label: Toggle Mute Operator Microphone
  kind: action
  params: []

- id: toggle_mute_operator_speakers
  label: Toggle Mute Operator Speakers
  kind: action
  params: []

- id: toggle_ptt_all
  label: Toggle PTT All
  kind: action
  params: []

- id: toggle_ptt_group
  label: Toggle PTT Group
  kind: action
  params: []

- id: toggle_ptt_single
  label: Toggle PTT Single
  kind: action
  params: []

- id: unmute_channel_audio_output
  label: Unmute Channel Audio Output
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: unmute_channel_audio_return
  label: Unmute Channel Audio Return
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)

- id: unmute_operator_microphone
  label: Unmute Operator Microphone
  kind: action
  params: []

- id: unmute_operator_speakers
  label: Unmute Operator Speakers
  kind: action
  params: []

- id: set_channel_audio_output_volume
  label: Set Channel Audio Output Volume
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)
    - name: volume
      type: number
      description: Volume level between 0.00 (none) and 1.00 (maximum)

- id: set_channel_audio_return_volume
  label: Set Channel Audio Return Volume
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (0 = selected channel, 1-N = specific channel)
    - name: volume
      type: number
      description: Volume level between 0.00 (none) and 1.00 (maximum)

- id: set_operator_speakers_volume
  label: Set Operator Speakers Volume
  kind: action
  params:
    - name: volume
      type: number
      description: Volume level between 0.00 (none) and 1.00 (maximum)

- id: set_operator_microphone_volume
  label: Set Operator Microphone Volume
  kind: action
  params:
    - name: volume
      type: number
      description: Volume level between 0.00 (none) and 1.00 (maximum)

- id: select_call_in_queue
  label: Select Call In Queue
  kind: action
  params:
    - name: queue
      type: string
      description: Queue name - one of Inbound, Studio, or Completed

- id: select_first_guest_in_call_in_queue
  label: Select First Guest In Call In Queue
  kind: action
  params: []

- id: select_next_guest_in_call_in_queue
  label: Select Next Guest In Call In Queue
  kind: action
  params: []

- id: select_previous_guest_in_call_in_queue
  label: Select Previous Guest In Call In Queue
  kind: action
  params: []

- id: move_selected_guest_in_call_in_queue
  label: Move Selected Guest In Call In Queue
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: /State endpoint structure not documented in source
# The /State endpoint returns system state but payload format is not specified
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented outside of commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro definitions in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
The Live To Air HTTP API uses query parameters `Command` and `Payload` on the `/Macro/` endpoint. Volume parameters use a normalized scale of 0.00–1.00 (not dB). Channel selection uses 0 to refer to the currently selected channel, or an explicit channel number (1-based). Call-in queue management supports three queues: Inbound, Studio, and Completed.

<!-- UNRESOLVED: physical RS-232 / serial control — not mentioned in source -->
<!-- UNRESOLVED: firmware version compatibility — not stated in source -->
<!-- UNRESOLVED: /State response format — not documented in source -->

## Provenance

```yaml
source_domains:
  - gnuralnetdatastorage.s3.amazonaws.com
source_urls:
  - "https://gnuralnetdatastorage.s3.amazonaws.com/Gnural-Documentation/LiveToAir%20Macro%20Documentation.pdf"
retrieved_at: 2026-04-30T04:41:19.155Z
last_checked_at: 2026-06-02T22:07:22.414Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:22.414Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical control interface (front panel, dedicated hardware) not documented"
- "/State endpoint structure not documented in source"
- "no discrete settable parameters documented outside of commands"
- "no unsolicited event notifications described in source"
- "no explicit multi-step macro definitions in source"
- "no safety warnings or interlock procedures in source"
- "physical RS-232 / serial control — not mentioned in source"
- "firmware version compatibility — not stated in source"
- "/State response format — not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
