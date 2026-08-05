---
spec_id: admin/wled-wled
schema_version: ai4av-public-spec-v1
revision: 1
title: "WLED WLED Control Spec"
manufacturer: WLED
model_family: WLED
aliases: []
compatible_with:
  manufacturers:
    - WLED
  models:
    - WLED
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kno.wled.ge
source_urls:
  - https://kno.wled.ge/interfaces/json-api
  - https://kno.wled.ge/interfaces/http-api
  - https://kno.wled.ge/interfaces/e1.31-dmx
  - https://kno.wled.ge
retrieved_at: 2026-04-30T02:56:58.883Z
last_checked_at: 2026-07-22T08:03:54.347Z
generated_at: 2026-07-22T08:03:54.347Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "E1.31 realtime protocol referenced (info.live, lm, lip) but not documented in source"
  - "HTTP port number not stated in source (defaults to 80 per RFC, not stated)"
  - "packet byte format not documented in this source"
  - "realtime packet protocol details not documented in this source"
  - "no safety warnings in source"
  - "UDP sync packet byte format not documented; E1.31 realtime protocol not documented in this source; firmware version compatibility not stated (features flagged per-version in source); exact LED strip pinout not in this doc"
verification:
  verdict: verified
  checked_at: 2026-07-22T08:03:54.347Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions matched literally in the source; all state keys, segment properties, and GET endpoints are fully documented and represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# WLED WLED Control Spec

## Summary
WLED is an open-source ESP8266/ESP32-based RGB LED control firmware. This spec covers the JSON API over HTTP for light state control, effect selection, segment management, sensor reading, and UDP broadcast sync.

<!-- UNRESOLVED: E1.31 realtime protocol referenced (info.live, lm, lip) but not documented in source -->

## Transport
```yaml
protocols:
  - http
  - udp  # inferred from udpn.send/recv state keys and info.udpport documentation
addressing:
  base_url: http://[WLED-IP]/json  # IP address obtained via mDNS or router
  # UNRESOLVED: HTTP port number not stated in source (defaults to 80 per RFC, not stated)
udp:
  port: 21324  # default observed in sample info.udpport; actual port per-device, returned by GET /json/info
  description: WLED broadcast / realtime sync packets
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# === Existing (preserved) ===
- id: set_state
  label: Set Light State
  kind: action
  command: 'POST /json/state {"state":{...}}'
  params:
    - name: state
      type: object
      description: JSON state object (e.g. {"on":true,"bri":255})
- id: set_brightness
  label: Set Brightness
  kind: action
  command: 'POST /json/state {"bri":<0-255>}'
  params:
    - name: bri
      type: integer
      description: Brightness 0-255 (use on:false to turn off; bri:0 supported but 1-255 recommended)
- id: toggle_power
  label: Toggle Power
  kind: action
  command: 'POST /json/state {"on":"t"}'
  params:
    - name: on
      type: string
      description: '"t" to toggle'
- id: set_effect
  label: Set Effect
  kind: action
  command: 'POST /json/state {"seg":[{"fx":<id|~|~-|"r">}]}'  # also accepts sx, ix, pal in same seg object
  params:
    - name: seg
      type: object
      description: Segment object with fx (effect ID), sx (speed), ix (intensity), pal (palette ID)
- id: set_color
  label: Set Segment Color
  kind: action
  command: 'POST /json/state {"seg":[{"id":<seg>,"col":[[R,G,B,W]]}]}'
  params:
    - name: seg
      type: object
      description: Segment object with col (RGB/W color array) and id (segment index)
- id: set_preset
  label: Set Preset
  kind: action
  command: 'POST /json/state {"ps":<id|"1~6~"|"4~10r">}'
  params:
    - name: ps
      type: string
      description: Preset ID or range syntax (e.g. "1~6~" for cycle, "4~10r" for random)
- id: set_playlist
  label: Set Playlist
  kind: action
  command: 'POST /json/state {"playlist":{"ps":[...],"dur":[...],"transition":<t>,"repeat":<n>,"end":<id>}}'
  params:
    - name: playlist
      type: object
      description: Playlist object with ps (preset array), dur (durations), transition, repeat, end
- id: set_nightlight
  label: Set Nightlight
  kind: action
  command: 'POST /json/state {"nl":{"on":<bool>,"dur":<1-255>,"mode":<0-3>,"tbri":<0-255>}}'
  params:
    - name: nl
      type: object
      description: Nightlight object with on, dur, mode (0=instant,1=fade,2=color fade,3=sunrise), tbri
- id: set_cct
  label: Set Color Temperature
  kind: action
  command: 'POST /json/state {"seg":[{"cct":<0-255|1900-10091>}]}'  # relative 0-255 or Kelvin
  params:
    - name: seg
      type: object
      description: Segment object with cct (0-255 relative or 1900-10091 Kelvin)
- id: set_segment_individual_leds
  label: Set Individual LEDs
  kind: action
  command: 'POST /json/state {"seg":{"i":[<idx>,"RRGGBB",<idx>,<start>,<stop>,"RRGGBB"]}}'
  params:
    - name: seg
      type: object
      description: Segment object with i (array of color values or [index, color] pairs); non-persistent, freezes effect
- id: set_ledmap
  label: Set LED Map
  kind: action
  command: 'POST /json/state {"ledmap":<0-9>}'  # 0 for ledmap.json, 1-9 for ledmapN.json (since 0.14.0)
  params:
    - name: ledmap
      type: integer
      description: LED map index 0-9
- id: reboot
  label: Reboot Device
  kind: action
  command: 'POST /json/state {"rb":true}'
  params:
    - name: rb
      type: boolean
      description: Set to true to reboot

# === Added state-level actions (missing keys from state table) ===
- id: set_transition
  label: Set Transition Duration
  kind: action
  command: 'POST /json/state {"transition":<0-65535>}'  # units of 100ms
  params:
    - name: transition
      type: integer
      description: Crossfade duration 0-65535 (one unit = 100ms)
- id: set_transition_temporary
  label: Set One-Time Transition
  kind: action
  command: 'POST /json/state {"tt":<0-65535>}'  # applies to current call only, not in state response
  params:
    - name: tt
      type: integer
      description: Transition duration for just the current API call (0-65535)
- id: save_preset
  label: Save Current State to Preset
  kind: action
  command: 'POST /json/state {"psave":<1-250>}'
  params:
    - name: psave
      type: integer
      description: Preset slot 1-250 (16 prior to 0.11) to save current state into
- id: delete_preset
  label: Delete Preset
  kind: action
  command: 'POST /json/state {"pdel":<1-250>}'
  params:
    - name: pdel
      type: integer
      description: Preset ID 1-250 to delete
- id: set_save_segment_bounds
  label: Set Save Segment Bounds Flag
  kind: action
  command: 'POST /json/state {"sb":<bool>}'  # used with psave
  params:
    - name: sb
      type: boolean
      description: When true, psave also saves segment start/stop bounds
- id: set_save_brightness
  label: Set Save Brightness Flag
  kind: action
  command: 'POST /json/state {"ib":<bool>}'  # used with psave
  params:
    - name: ib
      type: boolean
      description: When true, psave also saves brightness
- id: set_save_selected_segments
  label: Set Save Selected Segments Flag
  kind: action
  command: 'POST /json/state {"sc":<bool>}'  # used with psave
  params:
    - name: sc
      type: boolean
      description: When true, psave also saves selected segments
- id: set_udp_send
  label: Set UDP Sync Send
  kind: action
  command: 'POST /json/state {"udpn":{"send":<bool>}}'
  params:
    - name: send
      type: boolean
      description: Send WLED broadcast (UDP sync) packet on state change
- id: set_udp_recv
  label: Set UDP Sync Receive
  kind: action
  command: 'POST /json/state {"udpn":{"recv":<bool>}}'
  params:
    - name: recv
      type: boolean
      description: Receive broadcast (UDP sync) packets
- id: set_udp_send_groups
  label: Set UDP Send Groups
  kind: action
  command: 'POST /json/state {"udpn":{"sgrp":<0-255>}}'
  params:
    - name: sgrp
      type: integer
      description: Bitfield for broadcast send groups 1-8
- id: set_udp_recv_groups
  label: Set UDP Receive Groups
  kind: action
  command: 'POST /json/state {"udpn":{"rgrp":<0-255>}}'
  params:
    - name: rgrp
      type: integer
      description: Bitfield for broadcast receive groups 1-8
- id: set_no_broadcast
  label: Suppress Broadcast For Call
  kind: action
  command: 'POST /json/state {"udpn":{"nn":true}}'  # one-shot, not in state response
  params:
    - name: nn
      type: boolean
      description: Don't send broadcast packet for this API call only
- id: set_verbose_response
  label: Request Verbose Response
  kind: action
  command: 'POST /json/state {"v":true,...}'  # response includes full state object
  params:
    - name: v
      type: boolean
      description: If true, response contains full JSON state object
- id: set_realtime_mode
  label: Enter Realtime Mode
  kind: action
  command: 'POST /json/state {"live":<bool>}'  # true blanks LEDs until state changed
  params:
    - name: live
      type: boolean
      description: Enter realtime mode and blank LEDs; send {"live":false} to terminate
- id: set_live_override
  label: Set Live Data Override
  kind: action
  command: 'POST /json/state {"lor":<0|1|2>}'  # 0=off,1=until live ends,2=until reboot (since 0.10.0)
  params:
    - name: lor
      type: integer
      description: Live data override (0=off, 1=until live data ends, 2=until ESP reboot)
- id: set_module_time
  label: Set Module Time
  kind: action
  command: 'POST /json/state {"time":<unix-timestamp>}'
  params:
    - name: time
      type: integer
      description: Unix timestamp to set module time
- id: set_main_segment
  label: Set Main Segment
  kind: action
  command: 'POST /json/state {"mainseg":<0..maxseg-1>}'
  params:
    - name: mainseg
      type: integer
      description: Main segment ID (0 to info.leds.maxseg-1)
- id: set_timebase
  label: Set Effect Timebase
  kind: action
  command: 'POST /json/state {"tb":<uint32>}'
  params:
    - name: tb
      type: integer
      description: Sets timebase for effects
- id: remove_custom_palette
  label: Remove Custom Palette
  kind: action
  command: 'POST /json/state {"rmcpal":true}'  # since 0.14.0
  params:
    - name: rmcpal
      type: boolean
      description: Remove last custom palette if true
- id: advance_playlist
  label: Advance Playlist
  kind: action
  command: 'POST /json/state {"np":true}'  # since 0.15
  params:
    - name: np
      type: boolean
      description: Advance to next preset in a playlist

# === Added segment-level actions (missing seg keys) ===
- id: set_segment_bounds
  label: Set Segment Bounds
  kind: action
  command: 'POST /json/state {"seg":[{"id":<id>,"start":<0..count-1>,"stop":<0..count>}]}'
  params:
    - name: seg
      type: object
      description: Segment start/stop; if stop<=start segment is deleted
- id: set_segment_2d_bounds
  label: Set Segment 2D Bounds
  kind: action
  command: 'POST /json/state {"seg":[{"id":<id>,"startY":<0..width>,"stopY":<1..height>}]}'  # since 0.14.0
  params:
    - name: seg
      type: object
      description: 2D matrix start/stop rows from top-left
- id: set_segment_grouping
  label: Set Segment Grouping
  kind: action
  command: 'POST /json/state {"seg":[{"grp":<0-255>}]}'
  params:
    - name: grp
      type: integer
      description: Number of consecutive LEDs grouped to same color
- id: set_segment_spacing
  label: Set Segment Spacing
  kind: action
  command: 'POST /json/state {"seg":[{"spc":<0-255>}]}'
  params:
    - name: spc
      type: integer
      description: LEDs turned off and skipped between each group
- id: set_segment_offset
  label: Set Segment Offset
  kind: action
  command: 'POST /json/state {"seg":[{"of":<-len+1..len>}]}'  # since 0.13.0
  params:
    - name: of
      type: integer
      description: Rotate virtual start of segments
- id: set_effect_speed
  label: Set Effect Speed
  kind: action
  command: 'POST /json/state {"seg":[{"sx":<0-255|~|~-|~10|~-10>}]}'
  params:
    - name: sx
      type: string
      description: Relative effect speed 0-255, or ~ to increment, ~- to decrement, ~N to step
- id: set_effect_intensity
  label: Set Effect Intensity
  kind: action
  command: 'POST /json/state {"seg":[{"ix":<0-255|~|~-|~10|~-10>}]}'
  params:
    - name: ix
      type: string
      description: Effect intensity 0-255, or ~ to increment, ~- to decrement, ~N to step
- id: set_custom_slider_1
  label: Set Custom Slider 1
  kind: action
  command: 'POST /json/state {"seg":[{"c1":<0-255>}]}'
  params:
    - name: c1
      type: integer
      description: Effect custom slider 1 (label/visibility per fxdata)
- id: set_custom_slider_2
  label: Set Custom Slider 2
  kind: action
  command: 'POST /json/state {"seg":[{"c2":<0-255>}]}'
  params:
    - name: c2
      type: integer
      description: Effect custom slider 2
- id: set_custom_slider_3
  label: Set Custom Slider 3
  kind: action
  command: 'POST /json/state {"seg":[{"c3":<0-31>}]}'
  params:
    - name: c3
      type: integer
      description: Effect custom slider 3 (range 0-31)
- id: set_effect_option_1
  label: Set Effect Option 1
  kind: action
  command: 'POST /json/state {"seg":[{"o1":<bool>}]}'
  params:
    - name: o1
      type: boolean
      description: Effect option 1 (label per fxdata)
- id: set_effect_option_2
  label: Set Effect Option 2
  kind: action
  command: 'POST /json/state {"seg":[{"o2":<bool>}]}'
  params:
    - name: o2
      type: boolean
      description: Effect option 2
- id: set_effect_option_3
  label: Set Effect Option 3
  kind: action
  command: 'POST /json/state {"seg":[{"o3":<bool>}]}'
  params:
    - name: o3
      type: boolean
      description: Effect option 3
- id: set_palette
  label: Set Segment Palette
  kind: action
  command: 'POST /json/state {"seg":[{"pal":<0..palcount-1|~|~-|"r">}]}'
  params:
    - name: pal
      type: string
      description: Palette ID, ~ to increment, ~- to decrement, r for random
- id: set_segment_selected
  label: Set Segment Selected
  kind: action
  command: 'POST /json/state {"seg":[{"sel":<bool>}]}'
  params:
    - name: sel
      type: boolean
      description: True if segment is selected for non-segmented APIs (UDP sync, HTTP API)
- id: set_segment_reverse
  label: Set Segment Reverse
  kind: action
  command: 'POST /json/state {"seg":[{"rev":<bool>}]}'
  params:
    - name: rev
      type: boolean
      description: Flip segment horizontally (changes animation direction)
- id: set_segment_reverse_y
  label: Set Segment Reverse Y
  kind: action
  command: 'POST /json/state {"seg":[{"rY":<bool>}]}'  # since 0.14.0
  params:
    - name: rY
      type: boolean
      description: Flip 2D segment in vertical dimension
- id: set_segment_power
  label: Set Segment Power
  kind: action
  command: 'POST /json/state {"seg":[{"on":<bool>}]}'  # since 0.10.0
  params:
    - name: on
      type: boolean
      description: Turn individual segment on/off
- id: set_segment_brightness
  label: Set Segment Brightness
  kind: action
  command: 'POST /json/state {"seg":[{"bri":<0-255>}]}'  # since 0.10.0
  params:
    - name: bri
      type: integer
      description: Per-segment brightness 0-255
- id: set_segment_mirror
  label: Set Segment Mirror
  kind: action
  command: 'POST /json/state {"seg":[{"mi":<bool>}]}'  # since 0.10.2
  params:
    - name: mi
      type: boolean
      description: Mirror segment horizontally (2D)
- id: set_segment_mirror_y
  label: Set Segment Mirror Y
  kind: action
  command: 'POST /json/state {"seg":[{"mY":<bool>}]}'  # since 0.14.0
  params:
    - name: mY
      type: boolean
      description: Mirror 2D segment in vertical dimension
- id: set_segment_transpose
  label: Set Segment Transpose
  kind: action
  command: 'POST /json/state {"seg":[{"tp":<bool>}]}'  # since 0.14.0
  params:
    - name: tp
      type: boolean
      description: Transpose segment (swap X and Y dimensions)
- id: freeze_effect
  label: Freeze Effect
  kind: action
  command: 'POST /json/state {"seg":[{"frz":<bool>}]}'
  params:
    - name: frz
      type: boolean
      description: Freeze/unfreeze current effect
- id: set_segment_expand_1d
  label: Set Segment Expand 1D FX
  kind: action
  command: 'POST /json/state {"seg":[{"m12":<0-4>}]}'
  params:
    - name: m12
      type: integer
      description: 'Expand 1D FX setting (0:Pixels, 1:Bar, 2:Arc, 3:Corner)'
- id: set_sound_simulation
  label: Set Sound Simulation
  kind: action
  command: 'POST /json/state {"seg":[{"si":<0-3>}]}'
  params:
    - name: si
      type: integer
      description: 'Sound simulation type (0:BeatSin, 1:WeWillRockYou, 2:10_3, 3:14_3)'
- id: load_effect_defaults
  label: Load Effect Defaults
  kind: action
  command: 'POST /json/state {"seg":[{"fxdef":true}]}'  # since 0.14.0
  params:
    - name: fxdef
      type: boolean
      description: Force load of effect defaults (speed/intensity/etc) from fxdata metadata
- id: set_segment_set_id
  label: Set Segment Group/Set ID
  kind: action
  command: 'POST /json/state {"seg":[{"set":<0-3>}]}'  # since 0.14.0
  params:
    - name: set
      type: integer
      description: Visual group/set ID 0-3 (UI aid only)
- id: repeat_segment
  label: Repeat Segment
  kind: action
  command: 'POST /json/state {"seg":[{"rpt":<bool>}]}'  # since 0.13.0
  params:
    - name: rpt
      type: boolean
      description: Create repeated segments until LEDs exhausted or max segments; toggles reverse on even segments
- id: set_segment_name
  label: Set Segment Name
  kind: action
  command: 'POST /json/state {"seg":[{"id":<id>,"n":"<ASCII text>"}]}'
  params:
    - name: n
      type: string
      description: Custom ASCII name for the segment
- id: set_loxone_primary
  label: Set Loxone Primary Color
  kind: action
  command: 'POST /json/state {"seg":[{"lx":<BBBGGGRRR|20bbbtttt>}]}'  # Loxone build only
  params:
    - name: lx
      type: integer
      description: 'Loxone RGB value BBBGGGRRR (each 0-100) OR brightness+CCT 20bbbtttt (since 0.11.0)'
- id: set_loxone_secondary
  label: Set Loxone Secondary Color
  kind: action
  command: 'POST /json/state {"seg":[{"ly":<BBBGGGRRR|20bbbtttt>}]}'  # Loxone build only
  params:
    - name: ly
      type: integer
      description: 'Loxone RGB value for secondary color OR brightness+CCT (since 0.11.0)'

# === Added query actions (GET endpoints) ===
- id: get_state
  label: Get State
  kind: query
  command: 'GET /json/state'
  params: []
- id: get_info
  label: Get Info
  kind: query
  command: 'GET /json/info'
  params: []
- id: get_state_info
  label: Get State and Info
  kind: query
  command: 'GET /json/si'
  params: []
- id: get_nodes
  label: Get Discovered Nodes
  kind: query
  command: 'GET /json/nodes'
  params: []
- id: get_effects
  label: Get Effects List
  kind: query
  command: 'GET /json/eff'
  params: []
- id: get_palettes
  label: Get Palettes List
  kind: query
  command: 'GET /json/pal'
  params: []
- id: get_palettes_compact
  label: Get Palettes (Compact)
  kind: query
  command: 'GET /json/palx'
  params: []
- id: get_fxdata
  label: Get Effect Metadata
  kind: query
  command: 'GET /json/fxdata'  # since 0.14
  params: []
- id: get_network_info
  label: Get Network Info
  kind: query
  command: 'GET /json/net'
  params: []
- id: get_live
  label: Get Live Data
  kind: query
  command: 'GET /json/live'  # only if WLED_ENABLE_JSONLIVE flag set
  params: []
- id: get_config
  label: Get Config
  kind: query
  command: 'GET /json/cfg'
  params: []
```

## Feedbacks
```yaml
- id: state_response
  type: object
  description: Full state object returned on POST /json/state with v:true, or GET /json/state
- id: info_response
  type: object
  description: Device info object (ver, vid, leds, name, udpport, live, fxcount, palcount, arch, core, freeheap, uptime, brand, product, mac, ip, fs, wifi, ndc, ws)
- id: effects_list
  type: array
  description: Array of effect mode names (80+ effects); reserved IDs named RSVD or -
- id: palettes_list
  type: array
  description: Array of palette names (47 palettes in sample)
- id: fxdata_response
  type: array
  description: Effect metadata array under /json/fxdata (available since 0.14); semicolon-delimited string per effect
- id: nodes_response
  type: array
  description: Other WLED devices discovered on network (under /json/nodes)
- id: network_response
  type: object
  description: Network configuration under /json/net
- id: config_response
  type: object
  description: Device configuration under /json/cfg
- id: sensor_data
  type: array
  description: Sensor readings array under info.sensor (DRAFT specification, subject to change); each entry has type, n, val, unit, error, tc, tm, ts, min, max, u, model
```

## Variables
```yaml
# All settable parameters exposed via Actions (JSON state keys). No discrete settable params outside state object.
```

## Events
```yaml
- id: udp_sync_broadcast
  type: packet
  description: WLED broadcast UDP sync packet sent on state change when udpn.send is true; received by other WLED instances with udpn.recv true on matching group bitfield
  # UNRESOLVED: packet byte format not documented in this source
- id: realtime_data
  type: packet
  description: UDP realtime data packets received on info.udpport (e.g. E1.31, DDP); sets info.live true
  # UNRESOLVED: realtime packet protocol details not documented in this source
```

## Macros
```yaml
# Playlist multi-step sequences defined via playlist object (see set_playlist action)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
WLED supports both HTTP REST API and UDP broadcast sync. The `/json` endpoint accepts GET (read state) and POST (write state). Segment-based control enables independent control of LED strip sections. Effect IDs map to effect names returned by `/json/eff`. Palette IDs map to names returned by `/json/pal`. Individual LED control via the `i` property is non-persistent and freezes the effect. Sensor API is a draft specification and subject to change. No authentication or login required.

Effect metadata (`/json/fxdata`) uses semicolon-delimited sections: `<Effect parameters>;<Colors>;<Palette>;<Flags>;<Defaults>`. Flags are single chars: 1=1D, 2=2D, v=volume reactive, f=frequency reactive.

Light capabilities (RGB/White/CCT) are exposed per-segment via `info.leds.seglc` (bit 0=RGB, bit 1=white, bit 2=CCT) and globally via `info.leds.lc`.

Individual LED control batches should be sent sequentially (not in parallel); split into 256-color chunks for large updates. Command buffer limit ~10K ESP8266, ~24K ESP32.

<!-- UNRESOLVED: UDP sync packet byte format not documented; E1.31 realtime protocol not documented in this source; firmware version compatibility not stated (features flagged per-version in source); exact LED strip pinout not in this doc -->

## Provenance

```yaml
source_domains:
  - kno.wled.ge
source_urls:
  - https://kno.wled.ge/interfaces/json-api
  - https://kno.wled.ge/interfaces/http-api
  - https://kno.wled.ge/interfaces/e1.31-dmx
  - https://kno.wled.ge
retrieved_at: 2026-04-30T02:56:58.883Z
last_checked_at: 2026-07-22T08:03:54.347Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:03:54.347Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions matched literally in the source; all state keys, segment properties, and GET endpoints are fully documented and represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "E1.31 realtime protocol referenced (info.live, lm, lip) but not documented in source"
- "HTTP port number not stated in source (defaults to 80 per RFC, not stated)"
- "packet byte format not documented in this source"
- "realtime packet protocol details not documented in this source"
- "no safety warnings in source"
- "UDP sync packet byte format not documented; E1.31 realtime protocol not documented in this source; firmware version compatibility not stated (features flagged per-version in source); exact LED strip pinout not in this doc"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
