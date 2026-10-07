---
spec_id: admin/steinway-p1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Steinway Lyngdorf P1 Control Spec"
manufacturer: "Steinway Lyngdorf"
model_family: P1
aliases: []
compatible_with:
  manufacturers:
    - "Steinway Lyngdorf"
  models:
    - P1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - steinwaylyngdorf.com
  - manualslib.com
source_urls:
  - "https://steinwaylyngdorf.com/downloads/model-p1-serial-control-manual/?wpdmdl=6497&ind=1597920749186&refresh=fb3a3764&filename=Model-P1-Serial-Control-Manual-Version-1.3.pdf"
  - https://steinwaylyngdorf.com/downloads/model-p1-serial-control-manual
  - https://www.manualslib.com/manual/2927264/Steinway-Lyngdorf-P1.html
retrieved_at: 2026-09-02T20:11:43.985Z
last_checked_at: 2026-10-07T12:54:55.059Z
generated_at: 2026-10-07T12:54:55.059Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "trigger output count is described inconsistently — direct commands accept X = 1..4, while `!TRO(X)?` status responses describe X = 1..6. The source is ambiguous."
  - "source does not define composite macros; all multi-step behavior is in the integrator's hands."
  - "hardware handshake default state not stated in source (only that it is optional and configurable from UI)."
  - "trigger output count discrepancy (4 vs 6) — see Safety.notes."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:54:55.059Z
  matched_actions: 114
  action_count: 114
  confidence: medium
  summary: "All 114 spec actions have literal counterparts in the source with matching shapes; transport serial parameters are supported and the source catalogue is fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Steinway Lyngdorf P1 Control Spec

## Summary

The Steinway Lyngdorf P1 is an audio/video surround-sound processor. This spec covers its RS-232 serial control interface using ASCII commands framed by `!` and `<CR>`. Commands cover power, volume, mute, source selection, audio processing modes, RoomPerfect focus and voicing, lipsync, video input routing, trigger outputs, and various status queries.

<!-- UNRESOLVED: trigger output count is described inconsistently — direct commands accept X = 1..4, while `!TRO(X)?` status responses describe X = 1..6. The source is ambiguous. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; source also allows 19200, 38400, 57600, 115200 (selectable from UI)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # hardware handshake is optional and configurable from UI; default not stated
auth:
  type: UNRESOLVED  # source does not specify authentication
```

## Traits
```yaml
- powerable    # inferred from power commands: !POWERONMAIN, !POWEROFFMAIN, !POWERONZONE2, !POWEROFFZONE2
- routable     # inferred from routing commands: !SRC(X), !ZSRC(X), !ZONEMAINCOMPX, !ZONE2COMPX
- queryable    # inferred from status query commands: !POWER?, !VOL?, !SRC?, etc.
- levelable    # inferred from volume commands: !VOL(X), !VOL+(X), !VOL-(X), !ZVOL(X), etc.
```

## Actions
```yaml
- id: power_on_main
  label: Main Zone Power On
  kind: action
  command: "!POWERONMAIN\r"  # source writes !POWERONMAIN<CR>
  params: []

- id: power_off_main
  label: Main Zone Power Off
  kind: action
  command: "!POWEROFFMAIN\r"
  params: []

- id: power_on_zone2
  label: Zone 2 Power On
  kind: action
  command: "!POWERONZONE2\r"
  params: []

- id: power_off_zone2
  label: Zone 2 Power Off
  kind: action
  command: "!POWEROFFZONE2\r"
  params: []

- id: mute_on
  label: User Mute On
  kind: action
  command: "!MUTEON\r"
  params: []

- id: mute_off
  label: User Mute Off
  kind: action
  command: "!MUTEOFF\r"
  params: []

- id: mute_toggle
  label: Toggle User Mute
  kind: action
  command: "!MUTE\r"
  params: []

- id: zone_mute_on
  label: Zone User Mute On
  kind: action
  command: "!ZMUTEON\r"
  params: []

- id: zone_mute_off
  label: Zone User Mute Off
  kind: action
  command: "!ZMUTEOFF\r"
  params: []

- id: zone_mute_toggle
  label: Toggle Zone User Mute
  kind: action
  command: "!ZMUTE\r"
  params: []

- id: dir_up
  label: Up Arrow Button
  kind: action
  command: "!DIRU\r"
  params: []

- id: dir_down
  label: Down Arrow Button
  kind: action
  command: "!DIRD\r"
  params: []

- id: dir_left
  label: Left Arrow Button
  kind: action
  command: "!DIRL\r"
  params: []

- id: dir_right
  label: Right Arrow Button
  kind: action
  command: "!DIRR\r"
  params: []

- id: enter
  label: Enter Button
  kind: action
  command: "!ENTER\r"
  params: []

- id: back
  label: Back Button
  kind: action
  command: "!BACK\r"
  params: []

- id: menu
  label: Menu Button (Installer menu)
  kind: action
  command: "!MENU\r"
  params: []

- id: info
  label: Info Button
  kind: action
  command: "!INFO\r"
  params: []

- id: zone_main_show
  label: Main Zone Component Output - Non-Bypass (Main Display)
  kind: action
  command: "!ZONEMAINSHOW\r"
  params: []

- id: zone_main_comp1
  label: Main Zone Component Output - Component 1 (Bypass)
  kind: action
  command: "!ZONEMAINCOMP1\r"
  params: []

- id: zone_main_comp2
  label: Main Zone Component Output - Component 2 (Bypass)
  kind: action
  command: "!ZONEMAINCOMP2\r"
  params: []

- id: zone_main_comp3
  label: Main Zone Component Output - Component 3 (Bypass)
  kind: action
  command: "!ZONEMAINCOMP3\r"
  params: []

- id: zone_main_comp4
  label: Main Zone Component Output - Component 4 (Bypass)
  kind: action
  command: "!ZONEMAINCOMP4\r"
  params: []

- id: zone_main_comp5
  label: Main Zone Component Output - Component 5 (Bypass)
  kind: action
  command: "!ZONEMAINCOMP5\r"
  params: []

- id: zone2_show
  label: Zone 2 Component Output - Non-Bypass (Main Display)
  kind: action
  command: "!ZONE2SHOW\r"
  params: []

- id: zone2_comp1
  label: Zone 2 Component Output - Component 1 (Bypass)
  kind: action
  command: "!ZONE2COMP1\r"
  params: []

- id: zone2_comp2
  label: Zone 2 Component Output - Component 2 (Bypass)
  kind: action
  command: "!ZONE2COMP2\r"
  params: []

- id: zone2_comp3
  label: Zone 2 Component Output - Component 3 (Bypass)
  kind: action
  command: "!ZONE2COMP3\r"
  params: []

- id: zone2_comp4
  label: Zone 2 Component Output - Component 4 (Bypass)
  kind: action
  command: "!ZONE2COMP4\r"
  params: []

- id: zone2_comp5
  label: Zone 2 Component Output - Component 5 (Bypass)
  kind: action
  command: "!ZONE2COMP5\r"
  params: []

- id: num
  label: Number Button
  kind: action
  command: "!NUM{X}\r"
  params:
    - name: digit
      type: integer
      description: Digit 0..9

- id: volume_up
  label: Volume Up
  kind: action
  command: "!VOL+\r"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!VOL-\r"
  params: []

- id: volume_increase
  label: Increase Volume By Amount
  kind: action
  command: "!VOL+{amount}\r"
  params:
    - name: amount
      type: integer
      description: 0..999 (1 unit = 0.1dB)

- id: volume_decrease
  label: Decrease Volume By Amount
  kind: action
  command: "!VOL-{amount}\r"
  params:
    - name: amount
      type: integer
      description: 0..999 (1 unit = 0.1dB)

- id: volume_set
  label: Set Volume
  kind: action
  command: "!VOL{level}\r"
  params:
    - name: level
      type: integer
      description: -799..200 (-79.9dB..+20.0dB; source also describes 0.5dB intervals; 1 unit = 0.1dB)

- id: audmode_up
  label: Audio Processing Mode Up
  kind: action
  command: "!AUDMODE+\r"
  params: []

- id: audmode_down
  label: Audio Processing Mode Down
  kind: action
  command: "!AUDMODE-\r"
  params: []

- id: audmode_set
  label: Set Audio Processing Mode
  kind: action
  command: "!AUDMODE{mode}\r"
  params:
    - name: mode
      type: integer
      description: "Processing mode value (see Audio Processing Modes table): 1=No processing, 2=Mono, 3=Stereo, 4=PLII Movie, 5=PLII Music, 6=PLIIx Movie, 7=PLIIx Music, 8=PLIIx Games, 9=DolbyDigital EX, 10=DTS Neo6 Cinema, 11=DTS Neo6 Music, 25=party, 26=Downmix to front, 27=PLII Movie+Downmix to front"

- id: modecat_set
  label: Set Mode Category
  kind: action
  command: "!MODECAT{category}\r"
  params:
    - name: category
      type: integer
      description: "Mode category value (see Audio Modes table): 0=Not In Use, 1=Movie, 2=Music, 3=Games, 4=No Proc., 5=Custom 1, 6=Custom 2, 7=Custom 3, 8=Custom 4"

- id: src_up
  label: Source Up
  kind: action
  command: "!SRC+\r"
  params: []

- id: src_down
  label: Source Down
  kind: action
  command: "!SRC-\r"
  params: []

- id: src_set
  label: Select Main Source
  kind: action
  command: "!SRC{index}\r"
  params:
    - name: index
      type: integer
      description: "Source number, 1..max source count (queryable via !SRCS?)"

- id: srcoff_set
  label: Set Current Source Volume Offset
  kind: action
  command: "!SRCOFF{offset}\r"
  params:
    - name: offset
      type: integer
      description: "-100..100 (-10dB..+10dB; 1 unit = 0.1dB)"

- id: verbosity_set
  label: Set Feedback Level (Verbosity)
  kind: action
  command: "!VERB{level}\r"
  params:
    - name: level
      type: integer
      description: "0=query only, 1=auto on change, 2=echo + auto"

- id: rpfoc_set
  label: Set RoomPerfect Focus Position
  kind: action
  command: "!RPFOC{index}\r"
  params:
    - name: index
      type: integer
      description: "0=Bypass, 1..8=Focus 1..8, 9=Global (list queryable via !RPFOCS?)"

- id: rpfoc_up
  label: Focus Position Up
  kind: action
  command: "!RPFOC+\r"
  params: []

- id: rpfoc_down
  label: Focus Position Down
  kind: action
  command: "!RPFOC-\r"
  params: []

- id: zsrc_up
  label: Zone Source Up
  kind: action
  command: "!ZSRC+\r"
  params: []

- id: zsrc_down
  label: Zone Source Down
  kind: action
  command: "!ZSRC-\r"
  params: []

- id: zsrc_set
  label: Select Zone Source
  kind: action
  command: "!ZSRC{index}\r"
  params:
    - name: index
      type: integer
      description: "1..5 (5 zone sources always present)"

- id: zvol_up
  label: Zone Volume Up
  kind: action
  command: "!ZVOL+\r"
  params: []

- id: zvol_down
  label: Zone Volume Down
  kind: action
  command: "!ZVOL-\r"
  params: []

- id: zvol_increase
  label: Increase Zone Volume By Amount
  kind: action
  command: "!ZVOL+{amount}\r"
  params:
    - name: amount
      type: integer
      description: "0..1160 (1 unit = 0.1dB)"

- id: zvol_decrease
  label: Decrease Zone Volume By Amount
  kind: action
  command: "!ZVOL-{amount}\r"
  params:
    - name: amount
      type: integer
      description: "0..1160 (1 unit = 0.1dB)"

- id: zvol_set
  label: Set Zone Volume
  kind: action
  command: "!ZVOL{level}\r"
  params:
    - name: level
      type: integer
      description: "-960..200 (-96.0dB..+20.0dB, 0.5dB intervals; 1 unit = 0.1dB)"

- id: rpvoi_set
  label: Set Voicing
  kind: action
  command: "!RPVOI{index}\r"
  params:
    - name: index
      type: integer
      description: "0=Neutral, 1=Music, 2=Music II, 3=Relaxed, 4=Tilt, 5=Action, 6=Action+Movie; the command table lists 0..6, while usage text says 0..7 (UNRESOLVED)"

- id: rpvoi_up
  label: Voicing Up
  kind: action
  command: "!RPVOI+\r"
  params: []

- id: rpvoi_down
  label: Voicing Down
  kind: action
  command: "!RPVOI-\r"
  params: []

- id: lipsync_set
  label: Set Lipsync Trim
  kind: action
  command: "!LIPSYNC{ms}\r"
  params:
    - name: ms
      type: integer
      description: Lipsync trim in ms; valid range via !LIPSYNCRANGE?

- id: lipsync_up
  label: Lipsync Up (+10ms)
  kind: action
  command: "!LIPSYNC+\r"
  params: []

- id: lipsync_down
  label: Lipsync Down (-10ms)
  kind: action
  command: "!LIPSYNC-\r"
  params: []

- id: plii_cw_set
  label: Dolby PLII/PLIIx Center Width
  kind: action
  command: "!PLIICW{value}\r"
  params:
    - name: value
      type: integer
      description: "0..7"

- id: plii_pan_set
  label: Dolby PLII/PLIIx Panorama
  kind: action
  command: "!PLIIPAN{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: plii_dim_set
  label: Dolby PLII/PLIIx Dimension
  kind: action
  command: "!PLIIDIM{value}\r"
  params:
    - name: value
      type: integer
      description: "-3..3"

- id: neo6_cgain_set
  label: DTS Neo6 Center Gain
  kind: action
  command: "!NEO6CGAIN{value}\r"
  params:
    - name: value
      type: integer
      description: "0..10"

- id: neo6_wide_set
  label: DTS Neo6 Wide
  kind: action
  command: "!NEO6WIDE{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: dddyn_set
  label: Dolby Digital / Dolby Digital+ Dynamics
  kind: action
  command: "!DDDYN{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Max, 1=Normal, 2=Min"

- id: ddhd_dyn_set
  label: Dolby TrueHD Dynamics
  kind: action
  command: "!DDHDDYN{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=Off, 2=Force On"

- id: trigger_off
  label: Trigger Output 0V
  kind: action
  command: "!TROOFF{output}\r"
  params:
    - name: output
      type: integer
      description: "Trigger output 1..4"

- id: trigger_on_6v
  label: Trigger Output 6V
  kind: action
  command: "!TROON{output}\r"
  params:
    - name: output
      type: integer
      description: "Trigger output 3 or 4 only (dual-voltage outputs)"

- id: trigger_hi_12v
  label: Trigger Output 12V
  kind: action
  command: "!TROHI{output}\r"
  params:
    - name: output
      type: integer
      description: "Trigger output 1..4"

- id: trigger_enabled
  label: Trigger Output To Configured Level
  kind: action
  command: "!TROEN{output}\r"
  params:
    - name: output
      type: integer
      description: "Trigger output 1..4"

- id: trigger_disable
  label: Disable Trigger Output
  kind: action
  command: "!TRODIS{output}\r"
  params:
    - name: output
      type: integer
      description: "Trigger output 1..4 (same effect as !TROOFF)"

- id: trigger_do
  label: Execute Trigger Function
  kind: action
  command: "!TRODO{output}\r"
  params:
    - name: output
      type: integer
      description: "Trigger output 1..4; virtually fires the configured trigger condition"

- id: ping
  label: Ping
  kind: query
  command: "!PING?"
  params: []

- id: power_status_query
  label: Power Status
  kind: query
  command: "!POWER?"
  params: []

- id: mute_status_query
  label: User Mute Status
  kind: query
  command: "!MUTE?"
  params: []

- id: zmute_status_query
  label: Zone User Mute Status
  kind: query
  command: "!ZMUTE?"
  params: []

- id: volume_status_query
  label: Main Volume Status
  kind: query
  command: "!VOL?"
  params: []

- id: zvol_status_query
  label: Zone Volume Status
  kind: query
  command: "!ZVOL?"
  params: []

- id: src_status_query
  label: Current Main Source
  kind: query
  command: "!SRC?"
  params: []

- id: src_query
  label: Query Specific Main Source By Index
  kind: query
  command: "!SRC{index}?"
  params:
    - name: index
      type: integer
      description: "Source number 1..max"

- id: srcs_query
  label: List All Main Sources
  kind: query
  command: "!SRCS?"
  params: []

- id: tro_status_query
  label: Single Trigger Output Status
  kind: query
  command: "!TRO{output}?"
  params:
    - name: output
      type: integer
      description: "Trigger number 1..6"

- id: tros_status_query
  label: All Trigger Outputs Status
  kind: query
  command: "!TROS?"
  params: []

- id: vidin_status_query
  label: Current Main Zone Video Input
  kind: query
  command: "!VIDIN?"
  params: []

- id: lipsync_status_query
  label: Current Lipsync Trim
  kind: query
  command: "!LIPSYNC?"
  params: []

- id: lipsync_range_query
  label: Lipsync Trim Valid Range
  kind: query
  command: "!LIPSYNCRANGE?"
  params: []

- id: vidtype_status_query
  label: Current Video Type
  kind: query
  command: "!VIDTYPE?"
  params: []

- id: audin_status_query
  label: Current Main Zone Audio Input
  kind: query
  command: "!AUDIN?"
  params: []

- id: audtype_status_query
  label: Current Audio Type
  kind: query
  command: "!AUDTYPE?"
  params: []

- id: audmode_status_query
  label: Current Audio Processing Mode
  kind: query
  command: "!AUDMODE?"
  params: []

- id: audmodel_query
  label: List Available Audio Processing Modes
  kind: query
  command: "!AUDMODEL?"
  params: []

- id: modecat_status_query
  label: Current Mode Category
  kind: query
  command: "!MODECAT?"
  params: []

- id: modecats_query
  label: List Configured Mode Categories
  kind: query
  command: "!MODECATS?"
  params: []

- id: plii_dim_query
  label: Dolby PLII Dimension Status
  kind: query
  command: "!PLIIDIM?"
  params: []

- id: plii_cw_query
  label: Dolby PLII Center Width Status
  kind: query
  command: "!PLIICW?"
  params: []

- id: plii_pan_query
  label: Dolby PLII Panorama Status
  kind: query
  command: "!PLIIPAN?"
  params: []

- id: neo6_cgain_query
  label: DTS Neo6 Center Gain Status
  kind: query
  command: "!NEO6CGAIN?"
  params: []

- id: neo6_wide_query
  label: DTS Neo6 Wide Status
  kind: query
  command: "!NEO6WIDE?"
  params: []

- id: dddyn_query
  label: Dolby Digital Dynamics Status
  kind: query
  command: "!DDDYN?"
  params: []

- id: ddhd_dyn_query
  label: Dolby TrueHD Dynamics Status
  kind: query
  command: "!DDHDDYN?"
  params: []

- id: rpfoc_status_query
  label: Current RoomPerfect Focus
  kind: query
  command: "!RPFOC?"
  params: []

- id: rpfocs_query
  label: List All RoomPerfect Focus Positions
  kind: query
  command: "!RPFOCS?"
  params: []

- id: zvidin_status_query
  label: Current Zone 2 Video Input
  kind: query
  command: "!ZVIDIN?"
  params: []

- id: zaudin_status_query
  label: Current Zone 2 Audio Input
  kind: query
  command: "!ZAUDIN?"
  params: []

- id: zsrc_status_query
  label: Current Zone 2 Source
  kind: query
  command: "!ZSRC?"
  params: []

- id: zsrc_query
  label: Query Specific Zone Source By Index
  kind: query
  command: "!ZSRC{index}?"
  params:
    - name: index
      type: integer
      description: "Zone source number 1..5"

- id: zsrcs_query
  label: List All Zone Sources
  kind: query
  command: "!ZSRCS?"
  params: []

- id: rpvoi_status_query
  label: Current Voicing
  kind: query
  command: "!RPVOI?"
  params: []

- id: rpvois_query
  label: List All Voicings
  kind: query
  command: "!RPVOIS?"
  params: []

- id: device_query
  label: Device Identification
  kind: query
  command: "!DEVICE?"
  params: []

- id: swinfo_query
  label: Dump Software Versions
  kind: query
  command: "!SWINFO?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: integer
  description: "0=system powered down, 1=main only on, 2=zone2 only on, 3=both on. Only emitted automatically at feedback level >=1."

- id: mute_state
  type: enum
  values: [on, off]
  description: "Mirrors !MUTEON / !MUTEOFF."

- id: zone_mute_state
  type: enum
  values: [on, off]
  description: "Mirrors !ZMUTEON / !ZMUTEOFF."

- id: volume_level
  type: integer
  description: "Main zone volume; -799..200 (-79.9..+20.0 dB in 0.1dB units). Emitted automatically at feedback level >=1, throttled to >=100ms between messages."

- id: zone_volume_level
  type: integer
  description: "Zone volume; -960..200 (-96.0..+20.0 dB in 0.1dB units)."

- id: src_current
  type: string
  description: "!SRC(X)\"Source name\" - X is index (1-based), name in quotes. Empty/dash if main off + zone on."

- id: zsrc_current
  type: string
  description: "!ZSRC(X)\"Source name\" - zone 2. !ZSRC(0)\"Zone is off\" if zone off."

- id: vidin_current
  type: integer
  description: "100..10x=Composite, 200..20x=S-Video, 300..30x=Component, 400..40x=HDMI."

- id: vidtype_current
  type: string
  description: "!VIDTYPE(XXXYZ). XXX resolution (480/576/720/1080 or e.g. 800x600), Y=i/p, Z=colorspace 1..4."

- id: audin_current
  type: integer
  description: "101..1xx Analog 2ch (105 balanced), 201 Analog 8ch, 301..3xx Coax, 401..4xx Optical, 501 HDMI, 701 AES/EBU."

- id: audtype_current
  type: string
  description: "!AUDTYPE(XX,YYYY) - XX=signal type code (1..27), YYYY=channel config ABCD hex."

- id: audmode_current
  type: integer
  description: "Current processing mode; source lists values 1..11 and 25..27."

- id: modecat_current
  type: string
  description: "!MODECAT(X)\"Name\" or !MODECAT(0)\"-\" if categories unused."

- id: lipsync_ms
  type: integer
  description: "Lipsync trim in ms (within range reported by !LIPSYNCRANGE?). Cleared on every source change."

- id: lipsync_range
  type: string
  description: "!LIPSYNCRANGE(X,Y,Z) - X=range in ms, Y=min trim, Z=max trim."

- id: zvidin_current
  type: integer
  description: "0=no video or zone off, 1..5 = Component 1..5."

- id: zaudin_current
  type: integer
  description: "0=none or zone off, 1..4=Stereo 1..4, 5=Balanced XLR."

- id: rpfoc_current
  type: string
  description: "!RPFOC(X)\"Focus name\" - 0=Bypass, 1..8=Focus 1..8, 9=Global."

- id: rpvoi_current
  type: string
  description: "!RPVOI(X)\"Voicing name\" - 0=Neutral..6=Action+Movie."

- id: trigger_state
  type: string
  description: "!TRO(XY) - X=trigger number (1..6), Y=0 (0V) / 1 (6V) / 2 (12V)."

- id: plii_dim
  type: integer
  description: "-3..3"

- id: plii_cw
  type: integer
  description: "0..7"

- id: plii_pan
  type: enum
  values: [off, on]
  description: "0=Off, 1=On"

- id: neo6_cgain
  type: integer
  description: "0..10"

- id: neo6_wide
  type: enum
  values: [off, on]
  description: "0=Off, 1=On"

- id: dddyn
  type: integer
  description: "0=Max, 1=Normal, 2=Min"

- id: ddhd_dyn
  type: integer
  description: "0=Auto, 1=Off, 2=Force On"

- id: device_id
  type: string
  description: "!DEVICE(<string>) - e.g. \"P1\""

- id: sw_versions
  type: string
  description: "!SWINFO? returns a dump of system software versions; format not specified in source."
```

## Variables
```yaml
# Source volume offset; set with !SRCOFF(X).
- id: srcoff
  label: Per-source volume offset
  command: "!SRCOFF{offset}"
  range: [-100, 100]
  unit: "0.1 dB"
  description: "Current source volume offset (-10dB..+10dB). Set via !SRCOFF(X)."

- id: verbosity
  label: Feedback level
  command: "!VERB{level}"
  range: [0, 2]
  description: "0=query only, 1=auto on change, 2=echo + auto."
```

## Events
```yaml
- id: power_state_changed
  description: "!POWER(X) - emitted automatically at feedback level >=1 when power state changes. 0=off, 1=main on, 2=zone2 on, 3=both on."

- id: volume_changed
  description: "!VOL(X) - emitted automatically at feedback level >=1 during volume change. Throttled to >=100ms between messages."

- id: zone_volume_changed
  description: "!ZVOL(X) - emitted automatically at feedback level >=1."

- id: mute_changed
  description: "!MUTEON / !MUTEOFF - emitted at feedback level >=1."

- id: zone_mute_changed
  description: "!ZMUTEON / !ZMUTEOFF - emitted at feedback level >=1."

- id: src_changed
  description: "!SRC(X)\"NAME\" - emitted at feedback level >=1. Note: also returns \"-\" if main off + zone on."

- id: zsrc_changed
  description: "!ZSRC(X)\"NAME\" - emitted at feedback level >=1. !ZSRC(0)\"Zone is off\" if zone off."

- id: audin_changed
  description: "!AUDIN(X) - emitted at feedback level >=1 when audio input changes."

- id: audtype_changed
  description: "!AUDTYPE(XX,YYYY) - emitted at feedback level >=1 when audio signal type changes."

- id: audmode_changed
  description: "!AUDMODE(X) - emitted at feedback level >=1 when processing mode changes."

- id: modecat_changed
  description: "!MODECAT(X)\"NAME\" - emitted at feedback level >=1 when Audio Mode changes (only if Audio Modes are used)."

- id: vidin_changed
  description: "!VIDIN(X) - emitted at feedback level >=1 when video input changes."

- id: vidtype_changed
  description: "!VIDTYPE(XXXYZ) - emitted at feedback level >=1 when video type changes."

- id: zvidin_changed
  description: "!ZVIDIN(X) - emitted at feedback level >=1 when zone 2 video input changes."

- id: zaudin_changed
  description: "!ZAUDIN(X) - emitted at feedback level >=1 when zone 2 audio input changes."

- id: rpfoc_changed
  description: "!RPFOC(X)\"NAME\" - emitted at feedback level >=1 when focus position changes."

- id: rpvoi_changed
  description: "!RPVOI(X)\"NAME\" - emitted at feedback level >=1 when voicing changes."

- id: command_echo
  description: "Feedback level 2 only - every command is echoed back with '#' prefix (e.g. #VOL?)."

- id: lipsync_changed
  description: "!LIPSYNC(X) - emitted at feedback level >=1 when lipsync trim changes."
```

## Macros
```yaml
# UNRESOLVED: source does not define composite macros; all multi-step behavior is in the integrator's hands.
```

## Safety
```yaml
confirmation_required_for:
  - trigger_hi_12v       # 12V on a trigger output; could energize attached equipment
  - trigger_on_6v        # 6V on dual-voltage trigger outputs 3/4
  - zone_main_compX      # bypasses UI and may route a component input while HDMI is active
  - zone2_compX          # bypasses UI; recommended only when Zone Video Output is "Independent"
  - zone_main_show       # overrides UI; component output only meaningful without HDMI display
  - zone2_show           # overrides UI; component output only meaningful without HDMI display
interlocks:
  - "Volume set commands (incl. !VOL(X), !VOL+(X), !VOL-(X)) are clamped by the maximum volume setting configured on the device. There is no maximum for zone 2."
  - "!TROON(X) only valid for X = 3 or 4 (the dual-voltage trigger outputs)."
  - "Source commands ignored while OSD menu is open."
  - "Audio mode selection ignored if mode is not in currently available list (caller must refresh via !AUDMODEL?)."
notes: |
  Source contains explicit warning: "Usage maximum volume setting is highly recommended to prevent
  damage to equipment because of too loud volume setting!... It is never possible to set the volume
  above the maximum volume level setting with serial interface commands, but it is very easy to
  accidentally reach the maximum volume level."
```

## Notes

Commands and responses are ASCII. Commands start with `!` and end with `<CR>`; status responses start with `!`, and feedback-level-2 echoes start with `#`. Commands with malformed framing are ignored.

Feedback levels:
- 0 — replies only on `!FOO?` queries.
- 1 — also emits status responses automatically whenever any tracked state changes (volume throttled to >=100ms).
- 2 — also echoes every command back with `#` prefix.

Direct component-output routing (`!ZONEMAINCOMPx`, `!ZONE2COMPx`, `!ZONEMAINSHOW`, `!ZONE2SHOW`) completely bypasses the UI and can desync UI state.

Trigger-output command set and status set disagree about the number of triggers: `!TROOFF/HI/EN/DIS/DO(X)` all restrict X to 1..4, but `!TRO(X)?` response allows X = 1..6. Source inconsistent — recorded as-is, do not infer.

Lipsync trim is cleared on every source change. Valid range must be re-queried with `!LIPSYNCRANGE?` after boot and after source change. The source describes the response as range, minimum trim, and maximum trim; its example is `!LIPSYNCRANGE(250,-200,50)`.

Zone 2 power may be set to "Follow Main" — in that mode `!POWERONZONE2` also powers on the main zone, and vice versa.

Source count and source names are user-configurable. Audio Mode categories (Movie/Music/Games/Custom 1..4) and focus position names ("Focus 1..8") are installer-configurable. The set of voicings is fixed and non-renameable.

<!-- UNRESOLVED: hardware handshake default state not stated in source (only that it is optional and configurable from UI). -->
<!-- UNRESOLVED: trigger output count discrepancy (4 vs 6) — see Safety.notes. -->

## Provenance

```yaml
source_domains:
  - steinwaylyngdorf.com
  - manualslib.com
source_urls:
  - "https://steinwaylyngdorf.com/downloads/model-p1-serial-control-manual/?wpdmdl=6497&ind=1597920749186&refresh=fb3a3764&filename=Model-P1-Serial-Control-Manual-Version-1.3.pdf"
  - https://steinwaylyngdorf.com/downloads/model-p1-serial-control-manual
  - https://www.manualslib.com/manual/2927264/Steinway-Lyngdorf-P1.html
retrieved_at: 2026-09-02T20:11:43.985Z
last_checked_at: 2026-10-07T12:54:55.059Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:54:55.059Z
matched_actions: 114
action_count: 114
confidence: medium
summary: "All 114 spec actions have literal counterparts in the source with matching shapes; transport serial parameters are supported and the source catalogue is fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "trigger output count is described inconsistently — direct commands accept X = 1..4, while `!TRO(X)?` status responses describe X = 1..6. The source is ambiguous."
- "source does not define composite macros; all multi-step behavior is in the integrator's hands."
- "hardware handshake default state not stated in source (only that it is optional and configurable from UI)."
- "trigger output count discrepancy (4 vs 6) — see Safety.notes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
