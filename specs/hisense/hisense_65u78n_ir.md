---
spec_id: admin/hisense-65u78n
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 65U78N Control Spec"
manufacturer: Hisense
model_family: 65U78N
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 65U78N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:54:39.218Z
generated_at: 2026-05-04T05:54:39.218Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T05:54:39.218Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 65U78N Control Spec

## Summary
Prosumer commercial TV with discrete IR and RS-232 serial control. Supports power, input routing, picture/sound adjustment, and query commands. Serial config: 9600 baud, 8N1, no flow control, ASCII protocol with MAC-addressed client IDs.

<!-- UNRESOLVED: model-specific IR command support varies by TV — user manual required for full IR compatibility; UNRESOLVED: whether TCP/IP control is available on this model -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # POWR and PWRE commands present
- queryable     # Q-prefixed query commands returning state values
- routable      # INPT input source selection commands
- levelable     # BRIT/CONT/COLR/TINT/SHRP/VOLM/BKLV range commands
```

## Actions
```yaml
- id: power_set
  label: Set Power State
  kind: action
  params:
    - name: state
      type: integer
      description: 0=standby, 1=power on
  command: POWR
  examples:
    - "S[CLIENT_ID]POWR0001[CHECKSUM][CR]  # power on"

- id: power_on_command_enable
  label: Enable/Query RS-232 Remote Power On
  kind: action
  params:
    - name: enable
      type: integer
      description: 0=disable, 1=enable
  command: PWRE
  notes: Allows TV to be turned on via RS-232 while in standby mode

- id: input_select
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: 0=TV, 1=AV, 3=Component, 4=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA
  command: INPT
  examples:
    - "S[CLIENT_ID]INPT0009[CHECKSUM][CR]  # set HDMI1"

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport
  command: PMOD

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  command: BRIT
  examples:
    - "S[CLIENT_ID]BRIT0035[CHECKSUM][CR]  # brightness 35"

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  command: CONT

- id: color_saturation_set
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  command: COLR

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  command: TINT

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 32]
  command: SHRP

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema
  command: ASPT

- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=on, 2=off
  command: OVSN

- id: picture_reset
  label: Reset Picture Settings
  kind: action
  params: []
  command: RSTP

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low
  command: CTEM

- id: backlight_set
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  command: BKLV

- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night
  command: AMOD

- id: audio_reset
  label: Reset Audio Settings
  kind: action
  params: []
  command: RSTA

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  command: VOLM

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=off, 1=on
  command: MUTE

- id: tv_speaker_set
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=off, 2=on
  command: ASPK

- id: tuner_mode_set
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Antenna, 2=Cable
  command: TUNR

- id: channel_step
  label: Channel Step
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=down, 1=up
  command: CHAN

- id: caption_control_set
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=off, 2=on, 3=CC on when mute
  command: CC##
  notes: CC## command uses ## literal in protocol

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  params: []
  command: RSET
  notes: Hard reset — use with caution

- id: osd_language_set
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français
  command: LANG
```

## Feedbacks
```yaml
- id: ack_response
  label: Acknowledgement Response
  type: enum
  values:
    - OKAY
    - EROR
    - WAIT
  description: All commands return ACK before command execution completes

- id: power_state
  type: enum
  values: [0, 1]
  query_command: POWR????
  description: 0=standby, 1=power on

- id: current_input
  type: enum
  values:
    - 0: TV
    - 1: AV
    - 3: Component
    - 4: HDMI1
    - 10: HDMI2
    - 11: HDMI3
    - 12: HDMI4
    - 6: VGA
  query_command: INPT????
  description: Current active input source

- id: current_picture_mode
  type: enum
  values:
    - 0: Standard
    - 2: Vivid
    - 3: EnergySaving
    - 4: Theater
    - 5: Game
    - 6: Sport
  query_command: PMOD????

- id: current_brightness
  type: integer
  range: [0, 100]
  query_command: BRIT????

- id: current_contrast
  type: integer
  range: [0, 100]
  query_command: CONT????

- id: current_color_saturation
  type: integer
  range: [0, 100]
  query_command: COLR????

- id: current_tint
  type: integer
  range: [0, 100]
  query_command: TINT????

- id: current_sharpness
  type: integer
  range: [0, 32]
  query_command: SHRP????

- id: current_aspect_ratio
  type: enum
  values:
    - 0: Auto
    - 2: Normal
    - 3: Zoom
    - 4: Wide
    - 5: Direct
    - 6: 1-to-1 pixel map
    - 7: Panoramic
    - 8: Cinema
  query_command: ASPT????

- id: current_overscan
  type: enum
  values:
    - 0: on
    - 2: off
  query_command: OVSN????

- id: current_color_temp
  type: enum
  values:
    - 0: High
    - 2: Middle
    - 3: Mid-Low
    - 4: Low
  query_command: CTEM????

- id: current_backlight
  type: integer
  range: [0, 100]
  query_command: BKLV????

- id: current_sound_mode
  type: enum
  values:
    - 0: Standard
    - 2: Theater
    - 3: Music
    - 4: Speech
    - 5: Late night
  query_command: AMOD????

- id: current_volume
  type: integer
  range: [0, 100]
  query_command: VOLM????

- id: mute_status
  type: enum
  values:
    - 0: not muted
    - 1: muted
  query_command: MUTE????

- id: tv_speaker_status
  type: enum
  values:
    - 0: off
    - 2: on
  query_command: ASPK????

- id: tuner_mode
  type: enum
  values:
    - 0: Antenna
    - 2: Cable
  query_command: TUNR????

- id: caption_control_status
  type: enum
  values:
    - 0: off
    - 2: on
    - 3: CC on when mute
  query_command: CC##????

- id: osd_language
  type: enum
  values:
    - 0: English
    - 2: Español
    - 3: Français
  query_command: LANG????
```

## Variables
```yaml
# All settable parameters also readable via query commands — see Feedbacks above.
# No standalone variables beyond those represented in Feedbacks.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification structure described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # RSET command — irreversible
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes

**Serial protocol structure:**
- Command frame: `[S|Q][CLIENT_ID(3)][COMMAND(4)][DATA(4)][CHECKSUM(2)][0x0D]`
- ACK frame: `[CLIENT_ID(3)]:[ACK(4)][DATA(4)][CHECKSUM(2)][0x0D]`
- CLIENT_ID: last 3 bytes of Ethernet MAC address for Smart TV; selectable in TV menu for Feature TV; `ALL` for broadcast
- CHECKSUM: 8-bit checksum such that entire frame bytes sum to zero
- ACK values: `OKAY` (success), `EROR` (error), `WAIT` (in progress — poll for OKAY)

**IR discrete codes:** Full hex Pronto CCF codes listed in source table. Model-specific IR support varies — verify against user manual.

**Power-on via RS-232:** Requires `PWRE0001` to be sent first; TV must not be in full standby (some standby modes disable RS-232 entirely).

**Serial connector:** Standard DB9 female chassis-mount. Use null-modem cable for PC connection. USB-to-Serial adapter supported.

<!-- UNRESOLVED: TCP/IP control availability — source documents only RS-232 and IR -->
<!-- UNRESOLVED: firmware version compatibility — doc applies to multiple Hisense series -->
<!-- UNRESOLVED: IR command Pronto CCF hex encoding details beyond hex code table -->
<!-- UNRESOLVED: error code enumeration for EROR responses -->
<!-- UNRESOLVED: Event/unsolicited notification structure if any -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:54:39.218Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T05:54:39.218Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
