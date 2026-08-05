---
spec_id: admin/clevertouch-clevertouch-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Clevertouch Clevertouch Pro Series Control Spec"
manufacturer: Clevertouch
model_family: "Clevertouch Pro Series"
aliases: []
compatible_with:
  manufacturers:
    - Clevertouch
  models:
    - "Clevertouch Pro Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - clevertouch.zendesk.com
source_urls:
  - https://clevertouch.zendesk.com/hc/en-gb/articles/23384984694674-Clevertouch-Quick-Tips-RS232-and-IP-commands
retrieved_at: 2026-07-25T00:45:59.016Z
last_checked_at: 2026-08-05T08:15:27.854Z
generated_at: 2026-08-05T08:15:27.854Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/current/power specs not in source. Auth procedure not in source. Flow control not stated. Source does not specify which exact Pro Series SKU/part numbers are covered (\"all range of Clevertouch interactive screens\")."
  - "flow control not stated in source"
  - "source describes no unsolicited notifications. All reply frames are"
  - "source describes no multi-step command sequences."
  - "source contains no voltage/current/power specs, no formal"
  - "voltage/current/power specs not stated. Flow control not stated. Firmware compatibility not stated. Auth/credentials not stated (assumed none). IP hostname discovery (panel IP) left to operator. Whether port 4664 is TCP or UDP not explicitly stated — assumed TCP given \"LAN Settings\" + Android remote context. Whether GET video source reply includes android+ (102) and Type-C variants is implied but not separately enumerated in source reply table. Whether whiteboard launch (E2) has a GET/reply form is not documented."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:15:27.854Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions (20 SET + 18 GET) and 5 transport values match source verbatim; source has no additional commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Clevertouch Clevertouch Pro Series Control Spec

## Summary
Clevertouch Pro Series interactive flat panels accept hex-framed control commands over RS-232 and LAN (TCP). The command set covers power, audio (treble/bass/balance/volume/mute/sound mode), picture (contrast/brightness/sharpness/hue/backlight/color temp/picture mode/aspect ratio), source selection, language, IR remote enable, navigation keys, and a whiteboard launcher. Both transport paths use identical payloads. The device answers each SET with a `401+`/`401-` ack and each GET with a `:01r{feature}{value}` reply.

<!-- UNRESOLVED: voltage/current/power specs not in source. Auth procedure not in source. Flow control not stated. Source does not specify which exact Pro Series SKU/part numbers are covered ("all range of Clevertouch interactive screens"). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 4664  # LAN port stated in source (DEBUG MENU > Remote Control > Android Remote > ON required for IP)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/backlight on/off commands present
  - levelable    # inferred: volume/treble/bass/balance/contrast/brightness/sharpness/hue/backlight set commands
  - routable     # inferred: video source selection present
  - queryable    # inferred: GET commands for every settable feature present
```

## Actions
```yaml
# Framing: commands are ASCII rendered as hex bytes.
#   ":01S{feat}{val}\r" = SET  -> hex 3A 30 31 53 {feat} {3-digit val} 0D
#   ":01G{feat}000\r"  = GET  -> hex 3A 30 31 47 {feat} 30 30 30 0D
#   ":01r{feat}{val}\r" = GET reply
#   Ack success = 34 30 31 2B 0D ("401+\r"), Ack fail = 34 30 31 2D 0D ("401-\r")
# Default ID = 1. All commands below carry the ID=1 prefix verbatim from source.

# --- SET commands (S) ---

- id: set_power
  label: Power Set
  kind: action
  command: "3A 30 31 53 30 {val} 0D"  # ":01S0{val}\r" - val is 3 ASCII digits
  params:
    - name: val
      type: string
      description: "Power state as 3 ASCII digit chars: 000=backlight off, 001=backlight on, 002=power off (serial line only), 003=power on (serial line only)"
  notes:
    - "002/003 (full power off/on) supported through serial port line only"

- id: set_treble
  label: Treble Set
  kind: action
  command: "3A 30 31 53 31 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 050)"

- id: set_bass
  label: Bass Set
  kind: action
  command: "3A 30 31 53 32 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 100)"

- id: set_balance
  label: Balance Set
  kind: action
  command: "3A 30 31 53 33 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 050)"

- id: set_contrast
  label: Contrast Set
  kind: action
  command: "3A 30 31 53 34 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 050)"

- id: set_brightness
  label: Brightness Set
  kind: action
  command: "3A 30 31 53 35 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 050)"

- id: set_sharpness
  label: Sharpness Set
  kind: action
  command: "3A 30 31 53 36 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 010)"

- id: set_sound_mode
  label: Sound Mode Set
  kind: action
  command: "3A 30 31 53 37 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=Movie, 001=Standard, 002=Custom, 003=Classroom, 004=Meeting"

- id: set_volume
  label: Volume Set
  kind: action
  command: "3A 30 31 53 38 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 050)"

- id: set_mute
  label: Mute Set
  kind: action
  command: "3A 30 31 53 39 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=Off, 001=On"

- id: set_video_source
  label: Video Source Set
  kind: action
  command: "3A 30 31 53 3A {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=VGA, 001=HDMI1, 002=HDMI2, 003=AV/CVBS, 007=Display Port, 021=HDMI3, 022=HDMI4, 031=VGA2, 032=VGA3, 051=TV, 101=android, 102=android+, 103=Slot-in PC, 104=Type-C1, 105=Type-C2"

- id: set_aspect_ratio
  label: Aspect Ratio Set
  kind: action
  command: "3A 30 31 53 3B {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=16:9, 001=4:3, 002=PTP"

- id: set_language
  label: Language Set
  kind: action
  command: "3A 30 31 53 3C {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, sets Android channel language: 000=English, 001=Français, 002=Español, 003=繁中, 004=简中, 005=Português, 006=German, 007=Dutch, 008=Polish, 009=Russian, 010=Czech, 011=Danish, 012=Swedish, 013=Italian, 014=Romanian, 015=Norwegian, 016=Finnish, 017=Greek, 018=Turkish, 019=Arabic, 020=Japanese, 021=Ukrainian"

- id: set_picture_mode
  label: Picture Mode Set
  kind: action
  command: "3A 30 31 53 3D {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=standard, 001=bright, 002=soft, 003=customer"

- id: set_hue
  label: Hue (Color) Set
  kind: action
  command: "3A 30 31 53 3E {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 030)"

- id: set_backlight
  label: Backlight Set
  kind: action
  command: "3A 30 31 53 3F {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits, range 000-100 (source test value 050)"

- id: set_color_temp
  label: Color Temperature Set
  kind: action
  command: "3A 30 31 53 40 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=Cool, 001=Standard, 002=Warm"

- id: send_remote_key
  label: Remote Control Command
  kind: action
  command: "3A 30 31 53 41 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits emulating IR remote keys: 000=Vol+, 001=Vol-, 010=Up, 011=Down, 012=Left, 013=Right, 014=OK, 020=Menu, 021=Input Source, 022=Exit, 031=Blank (black screen), 032=Freeze"

- id: set_ir_remote
  label: IR Remote Enable/Disable
  kind: action
  command: "3A 30 31 53 42 {val} 0D"
  params:
    - name: val
      type: string
      description: "3 ASCII digits: 000=Enable IR remote, 001=Disable IR remote"

- id: launch_whiteboard
  label: Launch Legacy Whiteboard
  kind: action
  command: "3A 30 31 53 E2 30 30 30 0D"  # ":01S E2 000\r"
  params: []
  notes:
    - "Runs the legacy Whiteboard application"

# --- GET commands (G) -> each emits a reply frame ---

- id: get_power
  label: Power Query
  kind: query
  command: "3A 30 31 47 30 30 30 30 0D"  # ":01G0000\r"
  params: []
  notes:
    - "002/003 status (full power off) only obtainable over serial port line"

- id: get_treble
  label: Treble Query
  kind: query
  command: "3A 30 31 47 31 30 30 30 0D"
  params: []

- id: get_bass
  label: Bass Query
  kind: query
  command: "3A 30 31 47 32 30 30 30 0D"
  params: []

- id: get_balance
  label: Balance Query
  kind: query
  command: "3A 30 31 47 33 30 30 30 0D"
  params: []

- id: get_contrast
  label: Contrast Query
  kind: query
  command: "3A 30 31 47 34 30 30 30 0D"
  params: []

- id: get_brightness
  label: Brightness Query
  kind: query
  command: "3A 30 31 47 35 30 30 30 0D"
  params: []

- id: get_sharpness
  label: Sharpness Query
  kind: query
  command: "3A 30 31 47 36 30 30 30 0D"
  params: []

- id: get_sound_mode
  label: Sound Mode Query
  kind: query
  command: "3A 30 31 47 37 30 30 30 0D"
  params: []

- id: get_volume
  label: Volume Query
  kind: query
  command: "3A 30 31 47 38 30 30 30 0D"
  params: []

- id: get_mute
  label: Mute Query
  kind: query
  command: "3A 30 31 47 39 30 30 30 0D"
  params: []

- id: get_video_source
  label: Video Source Query
  kind: query
  command: "3A 30 31 47 3A 30 30 30 0D"
  params: []

- id: get_aspect_ratio
  label: Aspect Ratio Query
  kind: query
  command: "3A 30 31 47 3B 30 30 30 0D"
  params: []

- id: get_language
  label: Language Query
  kind: query
  command: "3A 30 31 47 3C 30 30 30 0D"
  params: []
  notes:
    - "Returns Android channel language"

- id: get_picture_mode
  label: Picture Mode Query
  kind: query
  command: "3A 30 31 47 3D 30 30 30 0D"
  params: []

- id: get_hue
  label: Hue Query
  kind: query
  command: "3A 30 31 47 3E 30 30 30 0D"
  params: []

- id: get_backlight
  label: Backlight Query
  kind: query
  command: "3A 30 31 47 3F 30 30 30 0D"
  params: []

- id: get_color_temp
  label: Color Temperature Query
  kind: query
  command: "3A 30 31 47 40 30 30 30 0D"
  params: []

- id: get_ir_remote
  label: IR Remote State Query
  kind: query
  command: "3A 30 31 47 42 30 30 30 0D"
  params: []
```

## Feedbacks
```yaml
# All GET replies share the frame ":01r{feature}{value}\r"
# i.e. hex 3A 30 31 72 {feature} {3-digit val} 0D.
# The single ack frames for SET commands are:
#   success: 34 30 31 2B 0D  ("401+\r")
#   fail:    34 30 31 2D 0D  ("401-\r")

- id: set_ack
  type: enum
  values: [success, fail]
  description: "Universal SET acknowledgement. success=34 30 31 2B 0D, fail=34 30 31 2D 0D"

- id: power_state
  type: enum
  values: [backlight_off, backlight_on, power_off, power_on]
  description: "Reply to GET power (feature 30). 000/001/002/003 as in set_power. power_off/power_on only readable over serial."

- id: treble_value
  type: integer
  range: [0, 100]
  description: "Reply to GET treble (feature 31)"

- id: bass_value
  type: integer
  range: [0, 100]
  description: "Reply to GET bass (feature 32)"

- id: balance_value
  type: integer
  range: [0, 100]
  description: "Reply to GET balance (feature 33)"

- id: contrast_value
  type: integer
  range: [0, 100]
  description: "Reply to GET contrast (feature 34)"

- id: brightness_value
  type: integer
  range: [0, 100]
  description: "Reply to GET brightness (feature 35)"

- id: sharpness_value
  type: integer
  range: [0, 100]
  description: "Reply to GET sharpness (feature 36)"

- id: sound_mode_value
  type: enum
  values: [movie, standard, custom, classroom, meeting]
  description: "Reply to GET sound mode (feature 37)"

- id: volume_value
  type: integer
  range: [0, 100]
  description: "Reply to GET volume (feature 38)"

- id: mute_state
  type: enum
  values: [off, on]
  description: "Reply to GET mute (feature 39)"

- id: video_source_value
  type: enum
  values: [vga, hdmi1, hdmi2, av_cvbs, display_port, hdmi3, hdmi4, vga2, vga3, tv, android, android_plus, slot_in_pc, type_c1, type_c2]
  description: "Reply to GET video source (feature 3A). See set_video_source for code->name map."

- id: aspect_ratio_value
  type: enum
  values: ["16:9", "4:3", ptp]
  description: "Reply to GET aspect ratio (feature 3B)"

- id: language_value
  type: enum
  values: [english, français, español, 繁中, 简中, português, german, dutch, polish, russian, czech, danish, swedish, italian, romanian, norwegian, finnish, greek, turkish, arabic, japanese, ukrainian]
  description: "Reply to GET language (feature 3C)"

- id: picture_mode_value
  type: enum
  values: [standard, bright, soft, customer]
  description: "Reply to GET picture mode (feature 3D)"

- id: hue_value
  type: integer
  range: [0, 100]
  description: "Reply to GET hue (feature 3E)"

- id: backlight_value
  type: integer
  range: [0, 100]
  description: "Reply to GET backlight (feature 3F)"

- id: color_temp_value
  type: enum
  values: [cool, standard, warm]
  description: "Reply to GET color temp (feature 40)"

- id: ir_remote_state
  type: enum
  values: [enabled, disabled]
  description: "Reply to GET IR remote (feature 42)"
```

## Variables
```yaml
# All settable parameters are exposed as discrete actions above (set_* actions).
# No additional continuous variables are described in the source beyond those.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All reply frames are
# direct responses to GET commands; no push/event frames documented.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Full power off (002) and power on (003) only supported over the serial port line - not over LAN"
  - "IP control requires DEBUG MENU > Remote Control > Android Remote > ON"
# UNRESOLVED: source contains no voltage/current/power specs, no formal
# interlock procedures, and no power-on sequencing requirements. Values above
# are taken verbatim from source notes, not inferred.
```

## Notes
- All command and reply frames are ASCII encoded and shown in the source as hex byte sequences. Decoded form: `:01{S|G|r}{feature}{3-digit value}\r`. The leading `01` is a fixed device ID (default = 1) and is included verbatim in every documented payload.
- A separate generic SET ack frame is sent on every successful/failed SET regardless of feature: success `34 30 31 2B 0D` ("401+\r"), fail `34 30 31 2D 0D` ("401-\r").
- Source lists some rows with duplicate NO values and typo'd feature names ("Reomte comtrol", "Japanse", "Type-C1" listed twice for 104 and 105). 105 corrected to Type-C2 in GET table per source. Preserved verbatim value maps where unambiguous.
- Source refers to "all range of Clevertouch interactive screens" — does not enumerate specific Pro Series SKUs.

<!-- UNRESOLVED: voltage/current/power specs not stated. Flow control not stated. Firmware compatibility not stated. Auth/credentials not stated (assumed none). IP hostname discovery (panel IP) left to operator. Whether port 4664 is TCP or UDP not explicitly stated — assumed TCP given "LAN Settings" + Android remote context. Whether GET video source reply includes android+ (102) and Type-C variants is implied but not separately enumerated in source reply table. Whether whiteboard launch (E2) has a GET/reply form is not documented. -->
````

## Provenance

```yaml
source_domains:
  - clevertouch.zendesk.com
source_urls:
  - https://clevertouch.zendesk.com/hc/en-gb/articles/23384984694674-Clevertouch-Quick-Tips-RS232-and-IP-commands
retrieved_at: 2026-07-25T00:45:59.016Z
last_checked_at: 2026-08-05T08:15:27.854Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:15:27.854Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions (20 SET + 18 GET) and 5 transport values match source verbatim; source has no additional commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/current/power specs not in source. Auth procedure not in source. Flow control not stated. Source does not specify which exact Pro Series SKU/part numbers are covered (\"all range of Clevertouch interactive screens\")."
- "flow control not stated in source"
- "source describes no unsolicited notifications. All reply frames are"
- "source describes no multi-step command sequences."
- "source contains no voltage/current/power specs, no formal"
- "voltage/current/power specs not stated. Flow control not stated. Firmware compatibility not stated. Auth/credentials not stated (assumed none). IP hostname discovery (panel IP) left to operator. Whether port 4664 is TCP or UDP not explicitly stated — assumed TCP given \"LAN Settings\" + Android remote context. Whether GET video source reply includes android+ (102) and Type-C variants is implied but not separately enumerated in source reply table. Whether whiteboard launch (E2) has a GET/reply form is not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
