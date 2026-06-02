---
spec_id: admin/rotel-rcx-1500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RCX-1500 Control Spec"
manufacturer: Rotel
model_family: RCX-1500
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RCX-1500
  firmware: "\">=1.1.5\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RCX1500%20Protocol.pdf"
retrieved_at: 2026-05-22T15:27:30.889Z
last_checked_at: 2026-06-02T17:23:55.685Z
generated_at: 2026-06-02T17:23:55.685Z
firmware_coverage: "\">=1.1.5\""
protocol_coverage: []
known_gaps:
  - "max cable length, electrical interface (true RS-232 vs TTL), and rear-panel DB9/DB25 pinout not stated in source."
  - "no continuous/parameter variables documented beyond discrete commands. Section omitted."
  - "exact trigger cadence and ordering of multi-line updates not stated in source."
  - "source does not document any multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:55.685Z
  matched_actions: 83
  action_count: 83
  confidence: medium
  summary: "All 83 spec commands matched literally in source with identical wire tokens, shapes, and parameter ranges. One-to-one coverage with transport fully verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RCX-1500 Control Spec

## Summary
The Rotel RCX-1500 is a CD receiver with FM/DAB/iRadio/network/USB sources, controlled over RS-232C using an ASCII text protocol (no device ID, no checksum). Every command and most responses are terminated with a single `!` byte; variable-length display data responses use a 2- or 3-digit byte count prefix instead. Hardware flow control is not supported.

<!-- UNRESOLVED: max cable length, electrical interface (true RS-232 vs TTL), and rear-panel DB9/DB25 pinout not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source; protocol has no device ID, no checksum, no login
```

## Traits
```yaml
- powerable   # power_on!, power_off!, power_toggle!
- levelable   # volume_up/down/max/min/n, mute_on/off/toggle
- routable    # cd/iradio/network/aux1_coax/aux1_opt/aux2/fm/dab/usb source select
- queryable   # get_* feedback command list (Section 2)
- playable    # play/stop/pause/track_fwd/track_back/fast_fwd/fast_back/random/repeat
```

## Actions
```yaml
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
- id: volume_up
  label: Volume Up
  kind: action
  command: "volume_up!"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "volume_down!"
  params: []
- id: volume_max
  label: Set Volume to Max
  kind: action
  command: "volume_max!"
  params: []
- id: volume_min
  label: Set Volume to Min
  kind: action
  command: "volume_min!"
  params: []
- id: volume_set
  label: Set Volume to level n
  kind: action
  command: "volume_{n}!"
  params:
    - name: n
      type: integer
      description: Volume level (1-86)
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "mute!"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params: []
- id: source_cd
  label: Source CD
  kind: action
  command: "cd!"
  params: []
- id: source_iradio
  label: Source iRadio
  kind: action
  command: "iradio!"
  params: []
- id: source_network
  label: Source Network
  kind: action
  command: "network!"
  params: []
- id: source_aux1_coax
  label: Source Aux 1 Coax
  kind: action
  command: "aux1_coax!"
  params: []
- id: source_aux1_opt
  label: Source Aux 1 Optical
  kind: action
  command: "aux1_opt!"
  params: []
- id: source_aux2
  label: Source Aux 2
  kind: action
  command: "aux2!"
  params: []
- id: source_fm
  label: Source FM
  kind: action
  command: "fm!"
  params: []
- id: source_dab
  label: Source DAB
  kind: action
  command: "dab!"
  params: []
- id: source_usb
  label: Source USB
  kind: action
  command: "usb!"
  params: []
- id: source_aux1_toggle
  label: Source Aux 1 Coax/Opt Toggle
  kind: action
  command: "aux1!"
  params: []
- id: play
  label: Play Source
  kind: action
  command: "play!"
  params: []
- id: stop
  label: Stop Source
  kind: action
  command: "stop!"
  params: []
- id: pause
  label: Pause Source
  kind: action
  command: "pause!"
  params: []
- id: track_fwd
  label: Track Forward / Tune Up
  kind: action
  command: "track_fwd!"
  params: []
- id: track_back
  label: Track Backward / Tune Down
  kind: action
  command: "track_back!"
  params: []
- id: fast_fwd
  label: Fast Forward / Search Forward
  kind: action
  command: "fast_fwd!"
  params: []
- id: fast_back
  label: Fast Backward / Search Backward
  kind: action
  command: "fast_back!"
  params: []
- id: eject
  label: Eject CD
  kind: action
  command: "eject!"
  params: []
- id: random_toggle
  label: Random Play Mode Toggle
  kind: action
  command: "random!"
  params: []
- id: repeat_toggle
  label: Repeat Play Mode Toggle
  kind: action
  command: "repeat!"
  params: []
- id: menu
  label: Display the Menu
  kind: action
  command: "menu!"
  params: []
- id: exit
  label: Exit Key
  kind: action
  command: "exit!"
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  command: "up!"
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  command: "down!"
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  command: "left!"
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  command: "right!"
  params: []
- id: enter
  label: Enter Key
  kind: action
  command: "enter!"
  params: []
- id: enter_long
  label: Long Press for Enter Key
  kind: action
  command: "enter_long!"
  params: []
- id: num_1
  label: Number Key 1
  kind: action
  command: "1!"
  params: []
- id: num_2
  label: Number Key 2
  kind: action
  command: "2!"
  params: []
- id: num_3
  label: Number Key 3
  kind: action
  command: "3!"
  params: []
- id: num_4
  label: Number Key 4
  kind: action
  command: "4!"
  params: []
- id: num_5
  label: Number Key 5
  kind: action
  command: "5!"
  params: []
- id: num_6
  label: Number Key 6
  kind: action
  command: "6!"
  params: []
- id: num_7
  label: Number Key 7
  kind: action
  command: "7!"
  params: []
- id: num_8
  label: Number Key 8
  kind: action
  command: "8!"
  params: []
- id: num_9
  label: Number Key 9
  kind: action
  command: "9!"
  params: []
- id: num_0
  label: Number Key 0
  kind: action
  command: "0!"
  params: []
- id: num_10_plus
  label: Number Key 10+
  kind: action
  command: "10_plus!"
  params: []
- id: preset_memory
  label: Select Memory for Saving Presets
  kind: action
  command: "memory!"
  params: []
- id: call_iradio_preset
  label: Recall iRadio Preset n
  kind: action
  command: "call_iradio_preset_{n}!"
  params:
    - name: n
      type: integer
      description: Preset number (01-30), zero-padded two digits
- id: call_fm_preset
  label: Recall FM Preset n
  kind: action
  command: "call_fm_preset_{n}!"
  params:
    - name: n
      type: integer
      description: Preset number (01-30), zero-padded two digits
- id: call_dab_preset
  label: Recall DAB Preset n
  kind: action
  command: "call_dab_preset_{n}!"
  params:
    - name: n
      type: integer
      description: Preset number (01-30), zero-padded two digits
- id: cd_scan
  label: CD Title Scan
  kind: action
  command: "scan!"
  params: []
- id: cd_time_toggle
  label: Toggle CD Time Display
  kind: action
  command: "time!"
  params: []
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  command: "dimmer!"
  params: []
- id: display_update_auto
  label: Set Display Update to Auto
  kind: action
  command: "display_update_auto!"
  params: []
- id: display_update_manual
  label: Set Display Update to Manual
  kind: action
  command: "display_update_manual!"
  params: []
- id: get_display
  label: Request entire display
  kind: query
  command: "get_display!"
  params: []
- id: get_display1
  label: Request display line 1
  kind: query
  command: "get_display1!"
  params: []
- id: get_display2
  label: Request display line 2
  kind: query
  command: "get_display2!"
  params: []
- id: get_display3
  label: Request display line 3
  kind: query
  command: "get_display3!"
  params: []
- id: get_display4
  label: Request display line 4
  kind: query
  command: "get_display4!"
  params: []
- id: get_product_type
  label: Request product type
  kind: query
  command: "get_product_type!"
  params: []
- id: get_product_version
  label: Request main CPU software version
  kind: query
  command: "get_product_version!"
  params: []
- id: get_display_size
  label: Request display size
  kind: query
  command: "get_display_size!"
  params: []
- id: get_display_update
  label: Request display update mode
  kind: query
  command: "get_display_update!"
  params: []
- id: get_current_power
  label: Request current power status
  kind: query
  command: "get_current_power!"
  params: []
- id: get_current_source
  label: Request current source
  kind: query
  command: "get_current_source!"
  params: []
- id: get_current_preset
  label: Request current preset
  kind: query
  command: "get_current_preset!"
  params: []
- id: get_iradio_preset
  label: Request saved iRadio station info for preset n
  kind: query
  command: "get_iradio_preset_{n}!"
  params:
    - name: n
      type: integer
      description: Preset number (1-30)
- id: get_allpreset_iradio
  label: Request all saved iRadio station info [1..30]
  kind: query
  command: "get_allpreset_iradio!"
  params: []
- id: get_fm_preset
  label: Request saved FM station info for preset n
  kind: query
  command: "get_fm_preset_{n}!"
  params:
    - name: n
      type: integer
      description: Preset number (1-30)
- id: get_allpreset_fm
  label: Request all saved FM station info [1..30]
  kind: query
  command: "get_allpreset_fm!"
  params: []
- id: get_dab_preset
  label: Request saved DAB station info for preset n
  kind: query
  command: "get_dab_preset_{n}!"
  params:
    - name: n
      type: integer
      description: Preset number (1-30)
- id: get_allpreset_dab
  label: Request all saved DAB station info [1..30]
  kind: query
  command: "get_allpreset_dab!"
  params: []
- id: get_cd_tray_status
  label: Request CD tray status
  kind: query
  command: "get_cd_tray_status!"
  params: []
- id: get_cd_play_status
  label: Request CD play status
  kind: query
  command: "get_cd_play_status!"
  params: []
- id: get_play_status
  label: Request play status (non-CD source playback)
  kind: query
  command: "get_play_status!"
  params: []
- id: get_volume
  label: Request current volume value
  kind: query
  command: "get_volume!"
  params: []
- id: get_volume_max
  label: Request max volume value
  kind: query
  command: "get_volume_max!"
  params: []
- id: get_volume_min
  label: Request min volume value
  kind: query
  command: "get_volume_min!"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: mute_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
  description: Current volume (2 digits)
- id: volume_max_value
  type: integer
  description: Max volume (2 digits)
- id: volume_min_value
  type: integer
  description: Min volume (always 0 per source)
- id: source
  type: enum
  values: [cd, iradio, network, aux1, aux2, usb, fm, dab]
- id: cd_tray_status
  type: enum
  values: [open, close, loading]
- id: play_status
  type: enum
  values: [play, stop, pause]
- id: display_update_mode
  type: enum
  values: [auto, manual]
- id: display_size
  type: string
  description: "Columns and rows on current display, e.g. '20,04'"
- id: display_text
  type: string
  description: Full display text (3-digit length prefix, comma, text)
- id: display_line1
  type: string
  description: Display line 1 (2-digit length prefix, comma, text)
- id: display_line2
  type: string
  description: Display line 2 (2-digit length prefix, comma, text)
- id: display_line3
  type: string
  description: Display line 3 (2-digit length prefix, comma, text)
- id: display_line4
  type: string
  description: Display line 4 (2-digit length prefix, comma, text)
- id: product_type
  type: string
  description: Rotel product type name (2-digit length prefix, comma, text)
- id: product_version
  type: string
  description: Main CPU software version (2-digit length prefix, comma, text)
- id: current_preset
  type: string
  description: Current preset station, prefixed by type (preset_iradio / preset_fm / preset_dab), 2 digits
- id: iradio_preset
  type: string
  description: Saved iRadio preset (2-digit length prefix, comma, text)
- id: fm_preset
  type: string
  description: Saved FM preset (2-digit length prefix, comma, text)
- id: dab_preset
  type: string
  description: Saved DAB preset (2-digit length prefix, comma, text)
- id: track_info
  type: string
  description: Current track and total, e.g. "track=05, T12"
- id: playback_time
  type: string
  description: Current playback time, format "##:##:##"
- id: dimmer_level
  type: string
  description: Dimmer level, format "dimmer_#"
```

## Variables
```yaml
# UNRESOLVED: no continuous/parameter variables documented beyond discrete commands. Section omitted.
```

## Events
```yaml
# In automatic display update mode, the device sends unsolicited display line(s) on every display change.
# Format: "display=###,text" (full) or "display1=##,text" through "display4=##,text" (per line)
# No terminating "!" character for variable-length text data.
- id: display_update_auto
  description: "Unsolicited display line(s) sent on display change when display_update_auto! is set."
# UNRESOLVED: exact trigger cadence and ordering of multi-line updates not stated in source.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- All commands and most responses are terminated with a single `!` byte (0x21). Do NOT append CR or LF after the `!`.
- Variable-length display/preset data uses a byte-count prefix (2 or 3 digits) followed by `,` and the text; no terminating `!` for those responses. The byte count covers only the text payload, not the count digits themselves or the comma.
- Protocol is ASCII text only; no device ID, no checksum. RS-232 hardware does not support flow control — application must pace send/receive to avoid packet loss.
- The discrete `aux1_coax!`, `aux1_opt!`, and `power=...` (via `get_current_power!`) commands were added in protocol version 1.02 / main software V1.1.7.
- The "recall preset" commands originally omitted a `!` terminator; this was corrected in protocol version 1.21.
- Special character mapping: some display glyphs are encoded as 2-3 byte sequences starting with `EE 82 ...` (see source Section 3). Decoders must handle these multi-byte glyphs when parsing display text.
- `volume_n!` accepts 1-86; `volume_max!` and `volume_min!` snap to the device-defined extremes (queried via `get_volume_max!` / `get_volume_min!`).
- Preset indices in the `call_*_preset_n!` recall commands are zero-padded two digits (01-30), while the `get_*_preset_n!` query uses unpadded (1-30) per the source's prose.

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RCX1500%20Protocol.pdf"
retrieved_at: 2026-05-22T15:27:30.889Z
last_checked_at: 2026-06-02T17:23:55.685Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:55.685Z
matched_actions: 83
action_count: 83
confidence: medium
summary: "All 83 spec commands matched literally in source with identical wire tokens, shapes, and parameter ranges. One-to-one coverage with transport fully verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "max cable length, electrical interface (true RS-232 vs TTL), and rear-panel DB9/DB25 pinout not stated in source."
- "no continuous/parameter variables documented beyond discrete commands. Section omitted."
- "exact trigger cadence and ordering of multi-line updates not stated in source."
- "source does not document any multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
