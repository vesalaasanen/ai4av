---
spec_id: admin/sunbrite-sbv449-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "SunBrite SBV449 Series Control Spec"
manufacturer: SunBrite
model_family: "SBV449 Series"
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
  models:
    - "SBV449 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.control4.com
  - help.snapone.com
source_urls:
  - https://docs.control4.com/docs/product/sunbrite-veranda-series-2/ip-control-protocol/english/latest/sunbrite-veranda-series-2-ip-control-protocol-rev-b.pdf
  - "https://help.snapone.com/sb-v4-ig/Content/Topics/IP%20Control%20Guide.htm"
retrieved_at: 2026-06-10T02:05:10.634Z
last_checked_at: 2026-06-10T07:40:07.420Z
generated_at: 2026-06-10T07:40:07.420Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control may exist but is not documented in this source"
  - "response format for queries not documented in source"
  - "exact response string format not documented in source"
  - "source does not document settable variables separately from actions"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "source contains no safety warnings or interlock procedures"
  - "query response string format not documented"
  - "MUTE 1 has no documented MUTE 0 counterpart; AVMT 20/21 may serve as audio unmute"
  - "power state response values not specified"
  - "maximum concurrent TCP connections not documented"
  - "command timing/throttle requirements not documented"
  - "connection keepalive or timeout behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-06-10T07:40:07.420Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec actions matched with exact ASCII command mnemonics and parameters in source; transport (TCP 4352, credentials) verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# SunBrite SBV449 Series Control Spec

## Summary
IP control spec for the SunBrite SBV449 Series (Veranda 4) outdoor TV. Commands are ASCII strings over TCP port 4352, prefixed with `%1`, using 4-character mnemonics, space separator, and `<CR>` terminator. Covers power, input selection (8 sources), volume, channel, picture/sound modes, navigation, mute, and tuner band select.

<!-- UNRESOLVED: RS-232 serial control may exist but is not documented in this source -->
<!-- UNRESOLVED: response format for queries not documented in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4352
auth:
  type: credential
  notes: "Default credentials: sunbrite/sunbrite or sunbritetv/sunbritetv; latest firmware forces password change via local GUI; Veranda 2 models do not require auth"
```

## Traits
```yaml
traits:
  - powerable     # power on/off/toggle commands present
  - routable      # input selection commands for 8 sources present
  - queryable     # power status, volume status, firmware version queries present
  - levelable     # discrete volume set 000-100 present
```

## Actions
```yaml
actions:
  - id: firmware_version_query
    label: Firmware Version Query
    kind: query
    command: "%1SWVE ?"
    params: []

  - id: power_status_query
    label: Power Status Query
    kind: query
    command: "%1POWR ?"
    params: []

  - id: volume_status_query
    label: Volume Status Query
    kind: query
    command: "%1VOLU ?"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "%1POWR -"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "%1POWR 1"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "%1POWR 0"
    params: []

  - id: input_1_tuner
    label: Input 1 - Tuner
    kind: action
    command: "%1INPT 1"
    params: []

  - id: input_2_video_av
    label: Input 2 - Video (AV)
    kind: action
    command: "%1INPT 2"
    params: []

  - id: input_3_component
    label: Input 3 - Component
    kind: action
    command: "%1INPT 3"
    params: []

  - id: input_4_hdmi_1
    label: Input 4 - HDMI 1
    kind: action
    command: "%1INPT 4"
    params: []

  - id: input_5_hdmi_2
    label: Input 5 - HDMI 2
    kind: action
    command: "%1INPT 5"
    params: []

  - id: input_6_hdmi_3
    label: Input 6 - HDMI 3
    kind: action
    command: "%1INPT 6"
    params: []

  - id: input_7_vga
    label: Input 7 - VGA
    kind: action
    command: "%1INPT 7"
    params: []

  - id: input_8_usb
    label: Input 8 - USB
    kind: action
    command: "%1INPT 8"
    params: []

  - id: source_toggle
    label: Source Toggle
    kind: action
    command: "%1INPT -"
    params: []

  - id: mute
    label: Mute
    kind: action
    command: "%1MUTE 1"
    params: []

  - id: vol_up
    label: Volume Up
    kind: action
    command: "%1VOLA 1"
    params: []

  - id: vol_down
    label: Volume Down
    kind: action
    command: "%1VOLA 0"
    params: []
    # NOTE: source hex column disagrees with ASCII column for this command
    # (hex shows MUDE 0, ASCII shows VOLA 0). Using ASCII per mnemonic pattern.

  - id: channel_up
    label: Channel Up
    kind: action
    command: "%1CHNA 1"
    params: []

  - id: channel_down
    label: Channel Down
    kind: action
    command: "%1CHNA 0"
    params: []

  - id: numb_1
    label: Number Key 1
    kind: action
    command: "%1NUMB 1"
    params: []

  - id: numb_2
    label: Number Key 2
    kind: action
    command: "%1NUMB 2"
    params: []

  - id: numb_3
    label: Number Key 3
    kind: action
    command: "%1NUMB 3"
    params: []

  - id: numb_4
    label: Number Key 4
    kind: action
    command: "%1NUMB 4"
    params: []

  - id: numb_5
    label: Number Key 5
    kind: action
    command: "%1NUMB 5"
    params: []

  - id: numb_6
    label: Number Key 6
    kind: action
    command: "%1NUMB 6"
    params: []

  - id: numb_7
    label: Number Key 7
    kind: action
    command: "%1NUMB 7"
    params: []

  - id: numb_8
    label: Number Key 8
    kind: action
    command: "%1NUMB 8"
    params: []

  - id: numb_9
    label: Number Key 9
    kind: action
    command: "%1NUMB 9"
    params: []

  - id: numb_0
    label: Number Key 0
    kind: action
    command: "%1NUMB 0"
    params: []

  - id: numb_dash
    label: Number Key Dash
    kind: action
    command: "%1NUMB -"
    params: []

  - id: channel_return
    label: Channel Return (Previous Channel)
    kind: action
    command: "%1CHRT 1"
    params: []

  - id: aspect
    label: Aspect Ratio Toggle
    kind: action
    command: "%1ASPE 1"
    params: []

  - id: enter
    label: Enter
    kind: action
    command: "%1ENTR 1"
    params: []

  - id: info
    label: Info
    kind: action
    command: "%1INFO 1"
    params: []

  - id: cc
    label: Closed Caption Toggle
    kind: action
    command: "%1CLCP 1"
    params: []

  - id: sleep
    label: Sleep Timer
    kind: action
    command: "%1SLEP 1"
    params: []

  - id: menu
    label: Menu
    kind: action
    command: "%1MENU 0"
    params: []

  - id: arrow_up
    label: Up Arrow
    kind: action
    command: "%1ARRO 0"
    params: []

  - id: arrow_down
    label: Down Arrow
    kind: action
    command: "%1ARRO 1"
    params: []

  - id: arrow_left
    label: Left Arrow
    kind: action
    command: "%1ARRO 2"
    params: []

  - id: arrow_right
    label: Right Arrow
    kind: action
    command: "%1ARRO 3"
    params: []

  - id: video_mute_on
    label: Video Mute On
    kind: action
    command: "%1AVMT 11"
    params: []

  - id: video_mute_off
    label: Video Mute Off
    kind: action
    command: "%1AVMT 10"
    params: []

  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "%1AVMT 21"
    params: []

  - id: audio_mute_off
    label: Audio Mute Off
    kind: action
    command: "%1AVMT 20"
    params: []

  - id: video_audio_mute_on
    label: Video and Audio Mute On
    kind: action
    command: "%1AVMT 31"
    params: []

  - id: video_audio_mute_off
    label: Video and Audio Mute Off
    kind: action
    command: "%1AVMT 30"
    params: []

  - id: volume_set
    label: Volume Set (Discrete)
    kind: action
    command: "%1VOLU {level}"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Volume level, zero-padded to 3 digits (e.g. 000, 050, 100)"

  - id: tuner_air
    label: Select Tuner Air
    kind: action
    command: "%1ARCB 1"
    params: []

  - id: tuner_cable
    label: Select Tuner Cable
    kind: action
    command: "%1ARCB 2"
    params: []

  - id: channel_set
    label: Discrete Channel Select
    kind: action
    command: "%1CHAN {major}-{minor}"
    params:
      - name: major
        type: integer
        description: "Major channel number (e.g. 004)"
      - name: minor
        type: integer
        description: "Minor/sub-channel number (e.g. 01)"

  - id: discrete_picture_mode
    label: Discrete Picture Mode
    kind: action
    command: "%1PICT {mode}"
    params:
      - name: mode
        type: integer
        description: "Picture mode number (documented values: 1-7)"

  - id: picture_toggle
    label: Picture Mode Toggle
    kind: action
    command: "%1PICT -"
    params: []

  - id: picture_mode_1
    label: Picture Mode 1
    kind: action
    command: "%1PICT 1"
    params: []

  - id: picture_mode_2
    label: Picture Mode 2
    kind: action
    command: "%1PICT 2"
    params: []

  - id: picture_mode_3
    label: Picture Mode 3
    kind: action
    command: "%1PICT 3"
    params: []

  - id: picture_mode_4
    label: Picture Mode 4
    kind: action
    command: "%1PICT 4"
    params: []

  - id: picture_mode_5
    label: Picture Mode 5
    kind: action
    command: "%1PICT 5"
    params: []

  - id: picture_mode_6
    label: Picture Mode 6
    kind: action
    command: "%1PICT 6"
    params: []

  - id: picture_mode_7
    label: Picture Mode 7
    kind: action
    command: "%1PICT 7"
    params: []

  - id: sound_toggle
    label: Sound Mode Toggle
    kind: action
    command: "%1SOUN -"
    params: []

  - id: sound_mode_1
    label: Sound Mode 1
    kind: action
    command: "%1SOUN 1"
    params: []

  - id: sound_mode_2
    label: Sound Mode 2
    kind: action
    command: "%1SOUN 2"
    params: []

  - id: sound_mode_3
    label: Sound Mode 3
    kind: action
    command: "%1SOUN 3"
    params: []

  - id: sound_mode_4
    label: Sound Mode 4
    kind: action
    command: "%1SOUN 4"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off, toggling]
    description: "Response to POWR? query"
    # UNRESOLVED: exact response string format not documented in source

  - id: volume_level
    type: integer
    min: 0
    max: 100
    description: "Response to VOLU? query"
    # UNRESOLVED: exact response string format not documented in source

  - id: firmware_version
    type: string
    description: "Response to SWVE? query"
    # UNRESOLVED: exact response string format not documented in source
```

## Variables
```yaml
# UNRESOLVED: source does not document settable variables separately from actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures
```

## Notes
- All commands use format: `%1` + 4-char mnemonic + space + parameter + `<CR>`. The `<CR>` (0x0D) terminator is required but omitted from command fields above for clarity.
- Device address prefix `%1` appears on all commands; multi-device scenarios not documented.
- Source hex column contains transcription errors (e.g. MUTE hex decodes to `MUDE`, VOLA 0 hex shows `MUDE 0`). ASCII column values used as authoritative.
- AVMT parameter encoding: first digit indicates target (1=video, 2=audio, 3=both), second digit indicates state (0=off, 1=on).
- Input 9 and Input 0 listed as "Not supported" in source with no command payload — excluded from actions.
- Volume discrete parameter is zero-padded to 3 digits (e.g. `000`, `050`, `100`).
- Channel select uses `major-minor` format (e.g. `%1CHAN 004-01`).
- Sound and picture mode names/values (1-4, 1-7) not labeled in source beyond numeric identifiers.

<!-- UNRESOLVED: query response string format not documented -->
<!-- UNRESOLVED: MUTE 1 has no documented MUTE 0 counterpart; AVMT 20/21 may serve as audio unmute -->
<!-- UNRESOLVED: power state response values not specified -->
<!-- UNRESOLVED: maximum concurrent TCP connections not documented -->
<!-- UNRESOLVED: command timing/throttle requirements not documented -->
<!-- UNRESOLVED: connection keepalive or timeout behavior not documented -->

## Provenance

```yaml
source_domains:
  - docs.control4.com
  - help.snapone.com
source_urls:
  - https://docs.control4.com/docs/product/sunbrite-veranda-series-2/ip-control-protocol/english/latest/sunbrite-veranda-series-2-ip-control-protocol-rev-b.pdf
  - "https://help.snapone.com/sb-v4-ig/Content/Topics/IP%20Control%20Guide.htm"
retrieved_at: 2026-06-10T02:05:10.634Z
last_checked_at: 2026-06-10T07:40:07.420Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:40:07.420Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec actions matched with exact ASCII command mnemonics and parameters in source; transport (TCP 4352, credentials) verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control may exist but is not documented in this source"
- "response format for queries not documented in source"
- "exact response string format not documented in source"
- "source does not document settable variables separately from actions"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "source contains no safety warnings or interlock procedures"
- "query response string format not documented"
- "MUTE 1 has no documented MUTE 0 counterpart; AVMT 20/21 may serve as audio unmute"
- "power state response values not specified"
- "maximum concurrent TCP connections not documented"
- "command timing/throttle requirements not documented"
- "connection keepalive or timeout behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
