---
spec_id: admin/denon_electronics-dnp_720ae
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics DNP-720AE Control Spec"
manufacturer: "Denon Electronics"
model_family: DNP-720AE
aliases: []
compatible_with:
  manufacturers:
    - "Denon Electronics"
  models:
    - DNP-720AE
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
retrieved_at: 2026-04-29T16:29:23.093Z
last_checked_at: 2026-04-30T09:41:51.893Z
generated_at: 2026-04-30T09:41:51.893Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:41:51.893Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions matched verbatim to source commands; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Denon Electronics DNP-720AE Control Spec

## Summary
Network audio player with RS-232C and Ethernet (TCP/Telnet) control interfaces. Supports power control, input selection across multiple sources (Tuner, USB, iPod, network services), analog tuner control, favorite management, and network audio navigation. Command format: ASCII CODE 2 chars + parameter + CR (0x0D). Max data length: 135 bytes.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (telnet) - stated in source
serial:
  baud_rate: 9600  # 9600bps - stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from PWON/PWSTANDBY commands
- routable       # inferred from SI (input selection) commands
- queryable      # inferred from ? request commands (PW?, SI?, etc.)
- levelable      # inferred from MV (master volume) command present
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

- id: query_power_state
  label: Query Power State
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - TUNER
        - RHAPSODY
        - NAPSTER
        - PANDORA
        - LASTFM
        - IRADIO
        - SERVER
        - USB

- id: query_input
  label: Query Input Source
  kind: action
  params: []

- id: favorite_direct
  label: Favorite Direct Change
  kind: action
  params:
    - name: number
      type: integer
      description: Favorite number (1-99)

- id: query_favorite_list
  label: Query Favorite List
  kind: action
  params: []

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []

- id: tuner_frequency_set
  label: Set Tuner Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: 6-digit frequency (AN******). AM: ******.00 kHz, FM: ****.** MHz

- id: query_tuner_frequency
  label: Query Tuner Frequency
  kind: action
  params: []

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []

- id: tuner_preset_set
  label: Set Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-50)

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number to store (e.g. 05)

- id: query_tuner_preset
  label: Query Tuner Preset
  kind: action
  params: []

- id: tuner_band_select
  label: Set Tuner Band
  kind: action
  params:
    - name: band
      type: enum
      values:
        - AM
        - FM

- id: tuner_tuning_mode
  label: Set Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - MANUAL

- id: query_tuner_band_mode
  label: Query Tuner Band and Mode
  kind: action
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []

- id: cursor_enter
  label: Cursor Enter
  kind: action
  params: []

- id: favorite_on
  label: Favorite On
  kind: action
  params: []

- id: favorite_off
  label: Favorite Off
  kind: action
  params: []

- id: net_cursor_up
  label: Network Cursor Up
  kind: action
  params: []

- id: net_cursor_down
  label: Network Cursor Down
  kind: action
  params: []

- id: net_cursor_left
  label: Network Cursor Left
  kind: action
  params: []

- id: net_cursor_right
  label: Network Cursor Right
  kind: action
  params: []

- id: net_enter
  label: Network Enter (Play/Pause)
  kind: action
  params: []

- id: net_play
  label: Network Play
  kind: action
  params: []

- id: net_pause
  label: Network Pause
  kind: action
  params: []

- id: net_stop
  label: Network Stop
  kind: action
  params: []

- id: net_skip_plus
  label: Network Skip Plus
  kind: action
  params: []

- id: net_skip_minus
  label: Network Skip Minus
  kind: action
  params: []

- id: net_repeat_one
  label: Network Repeat One
  kind: action
  params: []

- id: net_repeat_all
  label: Network Repeat All
  kind: action
  params: []

- id: net_repeat_off
  label: Network Repeat Off
  kind: action
  params: []

- id: net_random_on
  label: Network Random On / Shuffle Songs
  kind: action
  params: []

- id: net_random_off
  label: Network Random Off / Shuffle Off
  kind: action
  params: []

- id: net_browse_mode_toggle
  label: Toggle Browse Mode / Remote Mode
  kind: action
  params: []

- id: net_preset_call
  label: Net Audio Preset Call
  kind: action
  params:
    - name: preset
      type: enum
      values:
        - P1
        - P2
        - P3

- id: net_preset_memory
  label: Net Audio Preset Memory
  kind: action
  params:
    - name: preset
      type: enum
      values:
        - P1 MEM
        - P2 MEM
        - P3 MEM

- id: query_net_preset_status
  label: Query Net Audio Preset Status
  kind: action
  params: []

- id: query_onscreen_display
  label: Query Onscreen Display Information
  kind: action
  params: []

- id: net_direct_character_search
  label: Direct Character Search
  kind: action
  params:
    - name: characters
      type: string
      description: "Characters 0-9, A-Z"

# UNRESOLVED: PS command listed in source but parameter table not provided
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - ON
    - STANDBY

- id: input_source
  label: Input Source
  type: enum
  values:
    - TUNER
    - RHAPSODY
    - NAPSTER
    - PANDORA
    - LASTFM
    - IRADIO
    - SERVER
    - USB

- id: favorite_response
  label: Favorite Response
  type: string
  description: "35-byte fixed format: aaaa_??????? where aaaa=favorite No., _ = null, ? = don't care"

- id: tuner_frequency
  label: Tuner Frequency
  type: string
  description: "6 digits. AM: ****.** kHz, FM: ****.** MHz"

- id: tuner_preset
  label: Tuner Preset
  type: string
  description: "Preset number and memory"

- id: tuner_band_mode
  label: Tuner Band and Mode
  type: string
  description: "ANAM/ANFM/ANAUTO/ANMANUAL"

- id: net_preset_status
  label: Net Audio Preset Status
  type: string
  description: "NSP01-03 with 20-digit preset name, UTF-8 encoded"

- id: onscreen_display
  label: Onscreen Display Information
  type: object
  properties:
    - line0: string (Display Line 1, UTF-8, MAX 95 bytes)
    - line1: string (Display Line 2)
    - line2: string (Display Line 3)
    - line3: string (Display Line 4)
    - line4: string (Display Line 5)
    - line5: string (Display Line 6)
    - line6: string (Display Line 7)
    - line7: string (Display Line 8)
    - line8: string (Display Line 9)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found in source (MV volume command exists
# but volume level parameter range not explicitly stated - treated as action, not variable)
```

## Events
```yaml
# Device sends EVENT messages when state changes. EVENT format identical to COMMAND format.
# UNRESOLVED: full event list not explicitly enumerated in source. Observed events:
#   - PW (power state change)
#   - SI (input source change)
#   - TF (tuner frequency change)
#   - TP (tuner preset change)
#   - TM (tuner band/mode change)
#   - FV (favorite name change)
#   - NS (network audio state changes)
#   - NSE (onscreen display updates)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - label: "Power-on delay required"
    description: "Wait 1 second before sending next command after PWON (power on) command."
```

## Notes
Command structure: `[COMMAND][PARAMETER]<CR>` where CR = 0x0D. ASCII characters 0x20–0x7F only. Max 135 bytes per message.

Timing constraint: wait 1 second after PWON before sending next command.

Half-duplex: device can receive COMMAND during EVENT transmission. RESPONSE format identical to EVENT format.

Query commands: append `?` before `<CR>` to request current state. Example: `SI?<CR>` returns current input source.

Network audio commands (NS) use 2-character hex parameters (e.g., 90=up, 91=down, 94=enter/play, 9A=play, 9B=pause, 9C=stop, 9D=skip+, 9E=skip-, 9H=repeat one, 9I=repeat all, 9J=repeat off, 9K=random on, 9M=random off, 9W=browse/remote toggle).

Tuner commands (TF, TP, TM) require INPUT source to be set to TUNER.

Net audio presets (NSP1/NSP2/NSP3) store and recall 20-character names in UTF-8.

<!-- UNRESOLVED: PS command (parameter 2 ASCII chars) referenced but full parameter table not provided in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Ethernet cable type (straight vs cross) not definitively stated in source -->
<!-- UNRESOLVED: full unsolicited event catalog not enumerated — only observed events documented -->
<!-- UNRESOLVED: NSD direct character search parameter format (0-9, A-Z range) noted but full behavior not detailed -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
retrieved_at: 2026-04-29T16:29:23.093Z
last_checked_at: 2026-04-30T09:41:51.893Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:41:51.893Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions matched verbatim to source commands; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
