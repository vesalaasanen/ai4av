---
schema_version: ai4av-public-spec-v1
device_id: marantz/na7004
entity_id: marantz_na7004
spec_id: admin/marantz-na7004
revision: 1
author: admin
title: "Marantz NA7004 Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: NA7004
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - NA7004
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:40.220Z
retrieved_at: 2026-04-29T11:13:40.220Z
last_checked_at: 2026-04-24T14:41:26.226Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-24T14:41:26.226Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 declared spec actions cross-checked against source document with 100% match rate. Transport YAML matches source specifications."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz NA7004 Control Spec

## Summary
Network audio player with RS-232C and Ethernet (TCP/IP) control interfaces. ASCII-based command protocol with 2-character commands followed by parameters and CR (0x0D) terminator. Supports query commands (via `?`), power control, input selection, and volume/mute operations.

<!-- UNRESOLVED: source document describes an AV receiver protocol with multi-zone, surround sound, and video processing commands that exceed the feature set of the NA7004 network audio player. This spec reflects commands present in the source but may include features not supported by the NA7004 hardware. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (telnet) - stated in source
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
- powerable       # PWON/PWSTANDBY commands present
- queryable       # query commands (e.g. PW?, MV?, SI?) present
- levelable       # MV (master volume), CV (channel volume) commands present
- routable        # SI (input selection) commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_status_query
  label: Query Power Status
  kind: action
  params: []
- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
- id: master_volume_set
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 00-98 (ASCII), 80=0dB, 00=minimum (---dB)
- id: master_volume_status_query
  label: Query Master Volume
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_status_query
  label: Query Mute Status
  kind: action
  params: []
- id: input_select
  label: Select Input
  kind: action
  params:
    - name: source
      type: string
      description: |
        Input source selector. Values include:
        PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO,
        NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO,
        SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7,
        BT, USB/IPOD, USB, IPD, IRP, FVP
- id: input_status_query
  label: Query Input Status
  kind: action
  params: []
# UNRESOLVED: extensive command set in source (CV channel volume, MS surround modes,
# multi-zone Z2/Z3 control, PS parametric EQ, tuner control, network/USB/iPod
# navigation, video processing VS commands, system control MN/SY commands) exceeds
# NA7004 network audio player feature set - not fully populated
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: main_zone_status_query
  label: Query Main Zone Status
  kind: action
  params: []
- id: channel_volume_query
  label: Query Channel Volume Status
  kind: action
  params: []
- id: channel_volume_reset
  label: Reset All Channel Volume to Factory Defaults
  kind: action
  params: []
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Surround mode name (MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, etc.)
- id: surround_mode_query
  label: Query Surround Mode
  kind: action
  params: []
- id: surround_mode_quick_select
  label: Quick Select Surround Mode
  kind: action
  params:
    - name: preset
      type: string
      description: QUICK1-5
- id: input_mode_set
  label: Set Signal Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
- id: input_mode_query
  label: Query Signal Input Mode
  kind: action
  params: []
- id: digital_input_mode_set
  label: Set Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, PCM, DTS
- id: digital_input_mode_query
  label: Query Digital Input Mode
  kind: action
  params: []
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: OFF or 001-120 ASCII
- id: sleep_timer_query
  label: Query Sleep Timer
  kind: action
  params: []
- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  params:
    - name: interval
      type: string
      description: 15M, 30M, 60M, OFF
- id: auto_standby_query
  label: Query Auto Standby
  kind: action
  params: []
- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: eco_mode_query
  label: Query ECO Mode
  kind: action
  params: []
- id: ns_cursor_up
  label: Online Music Cursor Up
  kind: action
  params: []
- id: ns_cursor_down
  label: Online Music Cursor Down
  kind: action
  params: []
- id: ns_cursor_left
  label: Online Music Cursor Left
  kind: action
  params: []
- id: ns_cursor_right
  label: Online Music Cursor Right
  kind: action
  params: []
- id: ns_enter
  label: Online Music Enter
  kind: action
  params: []
- id: ns_play
  label: Online Music Play
  kind: action
  params: []
- id: ns_pause
  label: Online Music Pause
  kind: action
  params: []
- id: ns_stop
  label: Online Music Stop
  kind: action
  params: []
- id: ns_skip_plus
  label: Online Music Skip Plus
  kind: action
  params: []
- id: ns_skip_minus
  label: Online Music Skip Minus
  kind: action
  params: []
- id: ns_repeat_toggle
  label: Online Music Repeat Toggle
  kind: action
  params: []
- id: ns_random_toggle
  label: Online Music Random Toggle
  kind: action
  params: []
- id: ns_page_next
  label: Online Music Page Next
  kind: action
  params: []
- id: ns_page_previous
  label: Online Music Page Previous
  kind: action
  params: []
- id: ns_display_info_ascii
  label: Request Onscreen Display ASCII
  kind: action
  params: []
- id: ns_display_info_utf8
  label: Request Onscreen Display UTF-8
  kind: action
  params: []
- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  params: []
- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  params: []
- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  params: []
- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  params: []
- id: menu_enter
  label: Menu Enter
  kind: action
  params: []
- id: menu_return
  label: Menu Return
  kind: action
  params: []
- id: menu_setup_on
  label: Setup Menu On
  kind: action
  params: []
- id: menu_setup_off
  label: Setup Menu Off
  kind: action
  params: []
- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI, DIM, DAR, OFF
- id: dimmer_query
  label: Query Display Dimmer
  kind: action
  params: []
- id: trigger1_on
  label: Trigger 1 On
  kind: action
  params: []
- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  params: []
- id: trigger2_on
  label: Trigger 2 On
  kind: action
  params: []
- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  params: []
- id: trigger_status_query
  label: Query Trigger Status
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: populate from source command/response pairs. Major categories present:
# - Power state (PWON, PWSTANDBY)
# - Volume state (MV followed by 2-digit or 3-digit level)
# - Mute state (MUON, MUOFF)
# - Input state (SI followed by source name)
# - Channel volumes (CVFL, CVFR, CVC, CVSW, etc.)
# - Surround mode status (MSSTEREO, MSDIRECT, etc.)
# - Multi-zone status (Z2*, Z3*)
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# The source describes EVENT messages sent unsolicited from the system when
# state changes directly (e.g. front panel operation). EVENTs use same format
# as COMMANDs and are sent within 5 seconds of state change.
# UNRESOLVED: specific event format and payload definitions not fully extracted
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_delay
    description: Wait 1 second before transmitting next command after PWON (power on)
    reference: "Section J: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing requirements
# stated beyond the power-on delay note above
```

## Notes

**Command Format:** `COMMAND + PARAMETER + CR (0x0D)` where COMMAND is 2 ASCII characters, PARAMETER is up to 25 ASCII characters.

**Timing Requirements:**
- Commands must be sent at 50ms or greater intervals
- RESPONSE to query commands within 200ms
- EVENT sent within 5 seconds of state change

**Character Set:** ASCII 0x20–0x7F (printable characters and space 0x20, CR 0x0D for terminator only)

**Volume Encoding (0.5dB steps):** When using 0.5dB step, PARAMETER uses 3 ASCII characters. `MV98` = +18.0dB, `MV80` = 0dB, `MV005` = -79.5dB, `MV00` = minimum (---dB).

**No Authentication:** No login, password, or authentication procedure described in source.

<!-- UNRESOLVED: source document header identifies this as "Control Protocol Ver.06" but contains commands (multi-zone Z2/Z3, video processing VS, extensive surround mode MS list) that do not match the NA7004 network audio player feature set. This spec faithfully represents the source document but the documented protocol appears to be for a full AV receiver (e.g. models referenced as X1100, S700) rather than the NA7004. -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:40.220Z
retrieved_at: 2026-04-29T11:13:40.220Z
last_checked_at: 2026-04-24T14:41:26.226Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-24T14:41:26.226Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 declared spec actions cross-checked against source document with 100% match rate. Transport YAML matches source specifications."
```

## Known Gaps

```yaml
[]
```
