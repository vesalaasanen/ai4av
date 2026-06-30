---
spec_id: admin/converging-systems-dmx2010c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Converging Systems DMX2010C Control Spec"
manufacturer: "Converging Systems"
model_family: DMX2010C
aliases: []
compatible_with:
  manufacturers:
    - "Converging Systems"
    - "Converging Systems Inc."
  models:
    - DMX2010C
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/ddk/ddk_v2_3_w1_cs-bus.pdf
  - https://www.convergingsystems.com/inres_csiddk.php
  - https://www.convergingsystems.com/lighting_install_library.php
  - https://www.convergingsystems.com/enodedmx.php
retrieved_at: 2026-06-24T14:35:45.610Z
last_checked_at: 2026-06-30T07:00:15.240Z
generated_at: 2026-06-30T07:00:15.240Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The model name \"DMX2010C\" does not appear explicitly in the source document. Source is the general \"CS-Bus Device Driver Toolkit (DDK) Programming Guide\" (Rev 2.3.w1, Jan 16 2024) covering all CS-Bus devices. LED commands are documented as applying to \"e-Node/DMX\" column devices. Motor commands (IMC controllers) exist in the source but are excluded — they target a different device class not applicable to a DMX lighting gateway."
  - "Hardware specifications, electrical ratings, and physical interface details not in source"
  - "Firmware version compatibility for the DMX2010C specifically not stated (source references firmware versions for ILC/IMC controllers only)"
  - "DMX-specific channel count, universe count, and DMX protocol version (e.g. DMX512/ANSI E1.11) not stated"
  - "no explicit multi-step macros described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "DMX2010C-specific features (DMX channel mapping, universe configuration, DMX personality/footprint) not documented in source"
  - "Motor commands (DOWN, UP, OPEN, CLOSE, LEFT, RIGHT, GOTO, JOG, STOP, RETRACT, STORE, RECALL, POSITION=?, STATUS=?) are documented in the source for IMC-100/IMC-300 motor controllers but excluded from this spec as they are not applicable to a DMX lighting gateway"
  - "Commissioning commands (motor direction defaults, trigger-type events, shared address configuration) are beyond the scope of the source document per Section I"
  - "UID-based addressing (unique ID assigned by e-Node at commissioning, suffix 1–65535) is referenced but fully described in separate \"CS-Bus Messaging Manual\" not included in source"
verification:
  verdict: verified
  checked_at: 2026-06-30T07:00:15.240Z
  matched_actions: 55
  action_count: 55
  confidence: medium
  summary: "All 55 spec actions have verbatim wire-level counterparts in the source LED command table and Discovery appendix; transport values confirmed; source catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-24
---

# Converging Systems DMX2010C Control Spec

## Summary
The DMX2010C is a DMX lighting gateway from Converging Systems Inc. that bridges DMX fixtures into the CS-Bus control ecosystem. Control is via ASCII commands over TCP (Telnet, port 23) or UDP datagrams through an e-Node Ethernet Adapter, or over RS-232-C serial through an IBT-100 Bus Translator. Lighting commands use the `#Z.G.N.LED=COMMAND;` addressing format targeting DMX fixtures assigned Zone/Group/Node addresses. This spec covers the full LED command set (on/off, effects, presets, HSV/RGB/RGBW/CCT/circadian color spaces, dissolve/sequence rates), query/readback commands, and the CSI Discovery process.

<!-- UNRESOLVED: The model name "DMX2010C" does not appear explicitly in the source document. Source is the general "CS-Bus Device Driver Toolkit (DDK) Programming Guide" (Rev 2.3.w1, Jan 16 2024) covering all CS-Bus devices. LED commands are documented as applying to "e-Node/DMX" column devices. Motor commands (IMC controllers) exist in the source but are excluded — they target a different device class not applicable to a DMX lighting gateway. -->
<!-- UNRESOLVED: Hardware specifications, electrical ratings, and physical interface details not in source -->
<!-- UNRESOLVED: Firmware version compatibility for the DMX2010C specifically not stated (source references firmware versions for ILC/IMC controllers only) -->
<!-- UNRESOLVED: DMX-specific channel count, universe count, and DMX protocol version (e.g. DMX512/ANSI E1.11) not stated -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 23  # Telnet port, hardcoded on e-Node per source (Section I.B.3)
# UDP transport (Section I.C - alternative to Telnet):
#   send datagrams to e-Node: port 5000
#   listen for e-Node responses: port 4000
#   Note: UDP ports are factory defaults, changeable via e-Node Pilot app
serial:
  baud_rate: 57600  # IBT-100 Intelligent Bus Translator (Section I.A)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# Note: IMC-300MKII motor controller has a separate serial profile (19200 baud)
# which is not applicable to the DMX2010C.
auth:
  type: basic  # plaintext username/password per source (Section I.B.4)
  configurable: true  # auth can be ENABLED or DISABLED via e-Node Pilot app
  # Factory default credentials documented in source Section I.B.4.
  # Legacy defaults: username "E-NODE", password "ADMIN".
  # 2017+ defaults: username "Telnet 1"-"Telnet 4", password "Password 1"-"Password 4".
  # Credentials changeable via e-Node Pilot app or built-in e-Node webpage.
  # When auth is DISABLED, effective type is none.
  # Re-authentication: monitor for "User"/"Password" prompts after connection break.
```

## Traits
```yaml
traits:
  - queryable  # inferred: STATUS=?, COLOR=?, VALUE=?, SEQRATE=?, PRESET.X=?, DISSOLVE.X=? queries present
  - levelable  # inferred: brightness (SET,L), hue, saturation, RGB, CCT ramp/step level commands present
```

## Actions
```yaml
# ==========================================================================
# ALL commands share the CS-Bus message format:
#   #{addr}.{class}={command};↵
# where {addr} = Z.G.N (Zone.Group.Node), each field 0-254.
#   - {class} = "LED" for lighting/DMX fixtures
#   - 0 in any address field = wildcard (broadcast to all matching devices)
#   - ↵ = carriage return (CR, 0x0D)
# Valid commands are echoed back with "(PRI n)" appended.
# Invalid commands return "*" followed by the partial command.
#
# RAMP/STEP PARAMETER SYNTAX (applies to many commands below):
#   :XX           - ramp time in seconds (0=instant to 64800=18hrs)
#   +N            - step up/down by discrete amount relative to current level
#   +N:XX         - hybrid: step by N over XX seconds
#   Requires e-Node MKIII or later for ramp/step/hybrid variants.
# ==========================================================================

# --- Power / On-Off ---

- id: led_on
  label: LED On
  kind: action
  command: "#{addr}.LED=ON;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address (e.g. 2.1.1; 0.0.0 = wildcard broadcast)"
  notes: "Optional ramp: LED=ON:XX where XX=0-64800 sec"

- id: led_off
  label: LED Off
  kind: action
  command: "#{addr}.LED=OFF;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address (e.g. 2.1.1; 0.0.0 = wildcard broadcast)"
  notes: "Optional ramp: LED=OFF:XX where XX=0-64800 sec"

- id: led_flash
  label: Activity LED Flash Mode
  kind: action
  command: "#{addr}.LED=FLASH;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Repeatedly flashes on-board amber activity LED"

- id: led_toggle
  label: Toggle Current Status
  kind: action
  command: "#{addr}.LED=TOGGLE;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Binary toggle between OFF and pre-OFF status. Optional ramp: LED=TOGGLE:XX"

- id: led_stop
  label: Stop Fade/Effect/Ramp
  kind: action
  command: "#{addr}.LED=STOP;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Stops auto-ramping (fade, saturation, hue) at current level. Does not turn off."

# --- Effects (separate rows in source → separate actions) ---

- id: led_effect_1
  label: Execute Effect 1 - Preset Sequence
  kind: action
  command: "#{addr}.LED=EFFECT,1;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Sequences through presets 1→N (cycle) until STOP. End point = RGB 240.240.240 or RGBW 240.240.240.240. Associated: DISSOLVE.3, SEQRATE"

- id: led_effect_2
  label: Execute Effect 2 - Flame
  kind: action
  command: "#{addr}.LED=EFFECT,2;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Flame effect. No associated controls."

- id: led_effect_3
  label: Execute Effect 3 - Color Sequence
  kind: action
  command: "#{addr}.LED=EFFECT,3;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Cycles entire color wheel maintaining current brightness/saturation. Associated: DISSOLVE.4, SEQRATE"

- id: led_effect_4
  label: Execute Effect 4 - Random Color
  kind: action
  command: "#{addr}.LED=EFFECT,4;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Cycles colors with random hue and saturation. Associated: DISSOLVE.4, SEQRATE"

# --- Presets ---

- id: led_store_preset
  label: Store Preset Level
  kind: action
  command: "#{addr}.LED=STORE,{n};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: n
      type: integer
      description: "Preset slot number (1-24)"
  notes: "Stores current lighting state. In RGB/RGBW mode saves RGB(W); in CCT mode saves to special CCT location."

- id: led_recall_preset
  label: Recall Preset Level
  kind: action
  command: "#{addr}.LED=RECALL,{n};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: n
      type: integer
      description: "Preset slot number (1-24)"
  notes: "Optional ramp: LED=RECALL,{n}:XX where XX=0-64800 sec"

# --- Circadian / Solar ---

- id: led_solar_resume
  label: Resume Circadian Show
  kind: action
  command: "#{addr}.LED=SOLAR,{n};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: n
      type: integer
      description: "Maximum midday brightness (0=off to 240=maximum)"
  notes: "Restarts a previously interrupted Circadian adaptive process"

- id: led_sun_set
  label: Set Circadian Level
  kind: action
  command: "#{addr}.LED=SUN,{s};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: s
      type: integer
      description: "Circadian level (0=nighttime to 240=full noon-day sun)"
  notes: "Variants: SUN,{s}:XX (ramp), SUN,+{s} (step), SUN,+{s}:XX (hybrid). Level terminated by next command."

- id: led_sun_up
  label: Circadian Up
  kind: action
  command: "#{addr}.LED=SUN_UP;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Scrolls CLB levels upward to midday sun. Continues until STOP. Optional ramp: SUN_UP:XX"

- id: led_sun_down
  label: Circadian Down
  kind: action
  command: "#{addr}.LED=SUN_DOWN;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Scrolls CLB levels downward to black. Continues until STOP. Optional ramp: SUN_DOWN:XX"

# --- Dissolve Rates (separate rows in source → separate actions) ---

- id: led_dissolve_1_set
  label: Set Dissolve Rate 1 - Direct Value Transitions
  kind: action
  command: "#{addr}.LED.DISSOLVE.1={x};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Dissolve rate in seconds"
  notes: "Transitions between states via direct value commands (SET,L; SAT,S; HUE,H; RED,R; GREEN,G; BLUE,B; COLOR; VALUE)"

- id: led_dissolve_2_set
  label: Set Dissolve Rate 2 - On/Off and Preset Transitions
  kind: action
  command: "#{addr}.LED.DISSOLVE.2={x};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Dissolve rate in seconds"
  notes: "Transitions between ON/OFF and between presets (RECALL,X)"

- id: led_dissolve_3_set
  label: Set Dissolve Rate 3 - Effect Transitions
  kind: action
  command: "#{addr}.LED.DISSOLVE.3={x};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Dissolve rate in seconds"
  notes: "Transition dissolve for EFFECT(1) and EFFECT(4)"

- id: led_dissolve_4_set
  label: Set Dissolve Rate 4 - Effect Cycle Time
  kind: action
  command: "#{addr}.LED.DISSOLVE.4={x};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Full cycle time in seconds (min 14, max 240)"
  notes: "Time to complete a full cycle for EFFECT(3)"

- id: led_dissolve_0_set
  label: Set Dissolve Rate 0 - Wildcard (Deprecated)
  kind: action
  command: "#{addr}.LED.DISSOLVE.0={x};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Dissolve rate in seconds (applies to all dissolve functions)"
  notes: "Legacy wildcard command. Deprecated - use individual DISSOLVE.X instead. Pre-v2.03 firmware only supported this global form."

# --- Sequence Rate ---

- id: led_seqrate_set
  label: Set Sequence Rate
  kind: action
  command: "#{addr}.LED.SEQRATE={x};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "On-time in seconds (after dissolve) before next preset transition"
  notes: "Used with EFFECT(1) and EFFECT(4) for preset-to-preset timing"

# --- HSV Color Space - Adjustments ---

- id: led_hue_up
  label: Hue Up
  kind: action
  command: "#{addr}.LED=HUE_UP;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Scrolls colors red→green→blue. Continues until STOP."

- id: led_hue_down
  label: Hue Down
  kind: action
  command: "#{addr}.LED=HUE_DOWN;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Scrolls colors red→blue→green. Continues until STOP."

- id: led_hue_set
  label: Set Hue Level
  kind: action
  command: "#{addr}.LED=HUE,{h};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: h
      type: integer
      description: "Hue level (0-240; 0=Red, 80=Green, 160=Blue, 240=Red)"
  notes: "Variants: HUE,{h}:XX (ramp), HUE,+{h} (step), HUE,+{h}:XX (hybrid)"

- id: led_sat_up
  label: Saturation Up
  kind: action
  command: "#{addr}.LED=SAT_UP;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Fades up saturation. Continues until STOP or limit reached."

- id: led_sat_down
  label: Saturation Down
  kind: action
  command: "#{addr}.LED=SAT_DOWN;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Fades down saturation. Continues until STOP or limit reached."

- id: led_sat_set
  label: Set Saturation Level
  kind: action
  command: "#{addr}.LED=SAT,{s};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: s
      type: integer
      description: "Saturation level (0-240)"
  notes: "Variants: SAT,{s}:XX (ramp), SAT,+{s} (step), SAT,+{s}:XX (hybrid)"

- id: led_fade_up
  label: Fade Up (Brightness)
  kind: action
  command: "#{addr}.LED=FADE_UP;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Fades up brightness. Continues until STOP or full brightness reached."

- id: led_fade_down
  label: Fade Down (Brightness)
  kind: action
  command: "#{addr}.LED=FADE_DOWN;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Fades down brightness. Continues until STOP or off reached."

- id: led_brightness_set
  label: Set Brightness Level
  kind: action
  command: "#{addr}.LED=SET,{l};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: l
      type: integer
      description: "Brightness level (0-240)"
  notes: "Variants: SET,{l}:XX (ramp), SET,+{l} (step), SET,+{l}:XX (hybrid)"

- id: led_hsv_set
  label: Set HSV Color
  kind: action
  command: "#{addr}.LED=HSV,{h}.{s}.{v};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: h
      type: integer
      description: "Hue (0-240)"
    - name: s
      type: integer
      description: "Saturation (0-240)"
    - name: v
      type: integer
      description: "Brightness/value (0-240)"
  notes: "Dissolves to target color. Optional ramp: HSV,{h}.{s}.{v}:XX"

- id: led_color_set_hsv
  label: Set HSV Color (Legacy)
  kind: action
  command: "#{addr}.LED.COLOR={h}.{s}.{v};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: h
      type: integer
      description: "Hue (0-240)"
    - name: s
      type: integer
      description: "Saturation (0-240)"
    - name: v
      type: integer
      description: "Brightness/value (0-240)"
  notes: "Legacy outbound HSV command. For readback use .COLOR=?"

- id: led_preset_h_set
  label: Set Preset HSV (Legacy)
  kind: action
  command: "#{addr}.LED.PRESETH.{x}={h}.{s}.{v};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Preset slot number (0 = wildcard for all devices)"
    - name: h
      type: integer
      description: "Hue (0-240)"
    - name: s
      type: integer
      description: "Saturation (0-240)"
    - name: v
      type: integer
      description: "Brightness/value (0-240)"
  notes: "Legacy HSV preset command. Setting presets does not affect current LED state."

# --- RGB Color Space - Channel Adjustments ---

- id: led_red_set
  label: Set Red Level
  kind: action
  command: "#{addr}.LED=RED,{r};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: r
      type: integer
      description: "Red level (0-240)"
  notes: "Variants: RED,{r}:XX (ramp), RED,+{r} (step), RED,+{r}:XX (hybrid)"

- id: led_green_set
  label: Set Green Level
  kind: action
  command: "#{addr}.LED=GREEN,{g};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: g
      type: integer
      description: "Green level (0-240)"
  notes: "Variants: GREEN,{g}:XX (ramp), GREEN,+{g} (step), GREEN,+{g}:XX (hybrid)"

- id: led_blue_set
  label: Set Blue Level
  kind: action
  command: "#{addr}.LED=BLUE,{b};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: b
      type: integer
      description: "Blue level (0-240)"
  notes: "Variants: BLUE,{b}:XX (ramp), BLUE,+{b} (step), BLUE,+{b}:XX (hybrid)"

- id: led_white_set
  label: Set White Level
  kind: action
  command: "#{addr}.LED=WHITE,{w};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: w
      type: integer
      description: "White level (0-240)"
  notes: "Variants: WHITE,{w}:XX (ramp), WHITE,+{w} (step), WHITE,+{w}:XX (hybrid)"

- id: led_rgbw_set
  label: Set RGBW Color
  kind: action
  command: "#{addr}.LED=RGBW,{r}.{g}.{b}.{w};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: r
      type: integer
      description: "Red (0-240)"
    - name: g
      type: integer
      description: "Green (0-240)"
    - name: b
      type: integer
      description: "Blue (0-240)"
    - name: w
      type: integer
      description: "White (0-240)"
  notes: "Dissolves to target color. Optional ramp: RGBW,{r}.{g}.{b}.{w}:XX"

- id: led_rgb_set
  label: Set RGB Color
  kind: action
  command: "#{addr}.LED=RGB,{r}.{g}.{b};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: r
      type: integer
      description: "Red (0-240)"
    - name: g
      type: integer
      description: "Green (0-240)"
    - name: b
      type: integer
      description: "Blue (0-240)"
  notes: "Dissolves to target color. Optional ramp: RGB,{r}.{g}.{b}:XX"

- id: led_value_set_rgb
  label: Set RGB/RGBW Color (Legacy)
  kind: action
  command: "#{addr}.LED.VALUE={r}.{g}.{b};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: r
      type: integer
      description: "Red (0-240)"
    - name: g
      type: integer
      description: "Green (0-240)"
    - name: b
      type: integer
      description: "Blue (0-240)"
  notes: "Legacy outbound command. For RGBW append .{w}. For readback use .VALUE=?"

# --- CCT (Color Temperature) Adjustments ---

- id: led_cct_set
  label: Set Color Temperature
  kind: action
  command: "#{addr}.LED=CCT,{temp};↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: temp
      type: integer
      description: "Color temperature in Kelvin (1700K-7000K for RGBW; 1800K-7000K for RGB)"
  notes: "Variants: CCT,{temp}:XX (ramp), CCT,+{n} (step), CCT,+{n}:XX (hybrid)"

- id: led_cct_up
  label: CCT Up
  kind: action
  command: "#{addr}.LED=CCT_UP;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Fades up CCT (cooler). Continues until STOP or upper limit reached."

- id: led_cct_down
  label: CCT Down
  kind: action
  command: "#{addr}.LED=CCT_DOWN;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Fades down CCT (warmer). Continues until STOP or lower limit reached."

# --- Queries (kind: query) ---

- id: led_color_query
  label: Query HSV Color
  kind: query
  command: "#{addr}.LED.COLOR=?;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Returns current color in HSV format: !{addr}.LED.COLOR={h}.{s}.{b};"

- id: led_value_query
  label: Query RGB/RGBW Color
  kind: query
  command: "#{addr}.LED.VALUE=?;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Returns current color. 1-color: VALUE={w}; 3-color: VALUE={r}.{g}.{b}; 4-color: VALUE={r}.{g}.{b}.{w}"

- id: led_seqrate_query
  label: Query Sequence Rate
  kind: query
  command: "#{addr}.LED.SEQRATE=?;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "Returns !{addr}.LED.SEQRATE={x};"

- id: led_preset_query
  label: Query Preset RGB Value
  kind: query
  command: "#{addr}.LED.PRESET.{x}=?;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Preset slot number (0 = wildcard for all)"
  notes: "Returns !{addr}.LED.PRESET.{x}={r}.{g}.{b};"

- id: led_dissolve_query
  label: Query Dissolve Rate
  kind: query
  command: "#{addr}.LED.DISSOLVE.{x}=?;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
    - name: x
      type: integer
      description: "Dissolve function number (1-4)"
  notes: "Returns !{addr}.LED.DISSOLVE.{x}={rate};"

- id: led_status_query
  label: Query Status (CCT / Circadian)
  kind: query
  command: "#{addr}.LED.STATUS=?;↵"
  params:
    - name: addr
      type: string
      description: "Z.G.N address"
  notes: "For 4-color (RGBW): returns !{addr}.LED.STATUS={sun},{cct}; where sun=0-100, cct=1700-7000. For 3-color (RGB ILC-100c): returns !{addr}.LED.STATUS={r}.{g}.{b};"

# --- CSI Discovery ---

- id: discover
  label: Discover Devices
  kind: action
  command: ">DISCOVER↵"
  params: []
  notes: "Activates discovery on e-Node. Returns +UID{nnn}; per device found, then after ~5s pause, device detail messages."

- id: discover_type_query
  label: Query Device Type
  kind: query
  command: "#{uid}.TYPE=?;↵"
  params:
    - name: uid
      type: string
      description: "Device UID identifier (e.g. UID102)"
  notes: "Returns !{uid}.TYPE={model}; (e.g. ILC400CE) and !{uid}.FORM={channels},{bus},{type},{colorspace},{cct};"

- id: discover_alias_query
  label: Query Device Alias
  kind: query
  command: "#{uid}.ALIAS=?;↵"
  params:
    - name: uid
      type: string
      description: "Device UID identifier"
  notes: "Returns !{uid}.ALIAS={name}; (e.g. THEATER LIGHTS)"

- id: discover_address_query
  label: Query Device Bus Address
  kind: query
  command: "#{uid}.BUS.ADDRESS=?;↵"
  params:
    - name: uid
      type: string
      description: "Device UID identifier"
  notes: "Returns !{uid}.BUS.ADDRESS={z}.{g}.{n}; (the ZGN address)"

- id: discover_warm_cct_query
  label: Query Warm CCT Limit
  kind: query
  command: "#{uid}.LED.CMS.WARM=?;↵"
  params:
    - name: uid
      type: string
      description: "Device UID identifier (only for CCT-supporting fixtures)"
  notes: "Returns !{uid}.LED.CMS.WARM={kelvin}; (e.g. 1700)"

- id: discover_cool_cct_query
  label: Query Cool CCT Limit
  kind: query
  command: "#{uid}.LED.CMS.COOL=?;↵"
  params:
    - name: uid
      type: string
      description: "Device UID identifier (only for CCT-supporting fixtures)"
  notes: "Returns !{uid}.LED.CMS.COOL={kelvin}; (e.g. 6500)"
```

## Feedbacks
```yaml
# Command echo: valid commands echoed back with "(PRI n)" appended.
# Example: #2.1.1.LED=ON; → #2.1.1.LED=ON(PRI n);
# Error: invalid commands return "*{partial_command}"

- id: led_value_rgb_feedback
  type: string
  description: "Unsolicited RGB value on change-of-value (COV) when NOTIFY VALUE is set"
  format: "#{addr}.LED.VALUE={r}.{g}.{b};"

- id: led_color_hsv_feedback
  type: string
  description: "Unsolicited HSV value on COV when NOTIFY COLOR is set"
  format: "#{addr}.LED.COLOR={h}.{s}.{b};"

- id: led_status_feedback
  type: string
  description: "Unsolicited circadian/CCT status after SUN or CCT command (4-color mode)"
  format: "#{addr}.LED.STATUS={sun},{cct};"  # sun=0-100, cct=1700-7000

- id: discovery_uid_response
  type: string
  description: "Device UID found during DISCOVER"
  format: "+UID{nnn};"

- id: discovery_form_response
  type: string
  description: "Device capabilities (5 comma-delimited fields: channels, bus type, device type, color space, CCT support)"
  format: "!{uid}.FORM={channels},{bus},{type},{colorspace},{cct};"
  # bus: I=CSBUS, X=DMX
  # type: LIGHT or MOTOR
  # colorspace: HSV or MONO
  # cct: TRUE or FALSE

- id: discovery_type_response
  type: string
  description: "Device model type"
  format: "!{uid}.TYPE={model};"

- id: discovery_alias_response
  type: string
  description: "Device alias/label"
  format: "!{uid}.ALIAS={name};"

- id: discovery_address_response
  type: string
  description: "Device ZGN bus address"
  format: "!{uid}.BUS.ADDRESS={z}.{g}.{n};"
```

## Variables
```yaml
# No distinct settable parameters beyond those represented as Actions above.
# Dissolve rates, sequence rate, and preset values are all settable via
# dedicated action commands (see Actions).
```

## Events
```yaml
# Unsolicited COV (Change of Value) notifications are sent automatically when
# NOTIFY is enabled (VALUE or COLOR mode) on supported controllers:
#   #{addr}.LED.VALUE={r}.{g}.{b};  (when NOTIFY VALUE is set)
#   #{addr}.LED.COLOR={h}.{s}.{b};  (when NOTIFY COLOR is set)
#   #{addr}.LED.STATUS={sun},{cct}; (after SUN/CCT command in 4-color mode)
#
# Group command (node=0 wildcard) returns unsolicited status from node 1
# as a "global representative" remapped to node 0.
#
# Valid command echoes include "(PRI n)" priority indicator suffix.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in the source for the DMX2010C.
```

## Notes
- **Address format:** All commands use `#{zone}.{group}.{node}.LED={command};↵`. Zone/Group/Node each range 0–254. A value of 0 in any field is a wildcard that broadcasts to all devices with matching non-zero values in the other fields (e.g. `2.1.0` sends to all nodes in Zone 2, Group 1).
- **Terminator:** Commands end with `;` followed by carriage return (CR, 0x0D). The source denotes CR as `↵`.
- **Command echo:** Valid commands are echoed back with `(PRI n)` appended (priority indicator). Invalid commands return `*` followed by the partial command — check and retry.
- **Ramp/Step/Hybrid syntax:** Many level-setting commands support optional modifiers appended to the value: `:XX` for ramp time (0–64800 sec), `+N` for relative step, `+N:XX` for hybrid step-over-time. These require e-Node MKIII or later.
- **Identical commands across transports:** Source explicitly states "Software commands are identical for Serial communication, Ethernet communication using Telnet, or Ethernet communication using UDP."
- **Telnet Server:** Disabled by default on e-Node. Must be enabled via e-Node Pilot application (View e-Node → Telnet → Enable → Restart).
- **Global Representative Scheme:** When a group command (node=0) is issued, controllers provide unsolicited backchannel status from Node 1, remapped to a global Node 0 representative. If no Node 1 exists, no response is provided. (Post-September 2017 firmware.)
- **FORM message:** Discovery returns 5 comma-delimited capability fields: (1) channels (0=full color, 1–4=mono channels), (2) bus type (I=CSBUS, X=DMX), (3) device type (LIGHT/MOTOR), (4) color space (HSV/MONO), (5) CCT support (TRUE/FALSE). Parser should allow additional fields in future.
- **Two-way messaging:** "Listen Mode" (bus monitoring) is the recommended approach — the UI monitors bus traffic and updates state. "Poll Mode" (explicit status inquiries) is secondary. Poll mode requires a non-zero Node address (factory default is 0/wildcard which cannot be polled).
- **CCT ranges:** 1700K–7000K for RGBW fixtures; 1800K–7000K for RGB fixtures. Bi-white LED ranges vary but are always narrower.

<!-- UNRESOLVED: DMX2010C-specific features (DMX channel mapping, universe configuration, DMX personality/footprint) not documented in source -->
<!-- UNRESOLVED: Motor commands (DOWN, UP, OPEN, CLOSE, LEFT, RIGHT, GOTO, JOG, STOP, RETRACT, STORE, RECALL, POSITION=?, STATUS=?) are documented in the source for IMC-100/IMC-300 motor controllers but excluded from this spec as they are not applicable to a DMX lighting gateway -->
<!-- UNRESOLVED: Commissioning commands (motor direction defaults, trigger-type events, shared address configuration) are beyond the scope of the source document per Section I -->
<!-- UNRESOLVED: UID-based addressing (unique ID assigned by e-Node at commissioning, suffix 1–65535) is referenced but fully described in separate "CS-Bus Messaging Manual" not included in source -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/ddk/ddk_v2_3_w1_cs-bus.pdf
  - https://www.convergingsystems.com/inres_csiddk.php
  - https://www.convergingsystems.com/lighting_install_library.php
  - https://www.convergingsystems.com/enodedmx.php
retrieved_at: 2026-06-24T14:35:45.610Z
last_checked_at: 2026-06-30T07:00:15.240Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:00:15.240Z
matched_actions: 55
action_count: 55
confidence: medium
summary: "All 55 spec actions have verbatim wire-level counterparts in the source LED command table and Discovery appendix; transport values confirmed; source catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The model name \"DMX2010C\" does not appear explicitly in the source document. Source is the general \"CS-Bus Device Driver Toolkit (DDK) Programming Guide\" (Rev 2.3.w1, Jan 16 2024) covering all CS-Bus devices. LED commands are documented as applying to \"e-Node/DMX\" column devices. Motor commands (IMC controllers) exist in the source but are excluded — they target a different device class not applicable to a DMX lighting gateway."
- "Hardware specifications, electrical ratings, and physical interface details not in source"
- "Firmware version compatibility for the DMX2010C specifically not stated (source references firmware versions for ILC/IMC controllers only)"
- "DMX-specific channel count, universe count, and DMX protocol version (e.g. DMX512/ANSI E1.11) not stated"
- "no explicit multi-step macros described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "DMX2010C-specific features (DMX channel mapping, universe configuration, DMX personality/footprint) not documented in source"
- "Motor commands (DOWN, UP, OPEN, CLOSE, LEFT, RIGHT, GOTO, JOG, STOP, RETRACT, STORE, RECALL, POSITION=?, STATUS=?) are documented in the source for IMC-100/IMC-300 motor controllers but excluded from this spec as they are not applicable to a DMX lighting gateway"
- "Commissioning commands (motor direction defaults, trigger-type events, shared address configuration) are beyond the scope of the source document per Section I"
- "UID-based addressing (unique ID assigned by e-Node at commissioning, suffix 1–65535) is referenced but fully described in separate \"CS-Bus Messaging Manual\" not included in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
