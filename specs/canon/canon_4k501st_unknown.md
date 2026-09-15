---
spec_id: admin/canon-4k501st
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon 4K501ST Control Spec"
manufacturer: Canon
model_family: 4K501ST
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - 4K501ST
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.canon-europe.com
source_urls:
  - https://files.canon-europe.com/files/webcontent/pdf/4K501ST_UC_E_YT1-1467-000.pdf
retrieved_at: 2026-05-14T21:18:58.349Z
last_checked_at: 2026-09-09T22:17:02.764Z
generated_at: 2026-09-09T22:17:02.764Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "network configuration (IP addressing method) not described; several parameter enums (DGAMMA, MEMF/MEMG/MEMS, NR, NRMPG, ASELD*) not enumerated in source; power-mode restriction tables partially unreadable in extraction"
  - "valid values not enumerated in source\""
  - "only WEAK shown in source example; other values not enumerated\""
  - "only ON documented; OFF presumed but not stated\""
  - "only MIDDLE shown in source example; other values not enumerated. Applies to current input signal and image mode\""
  - "only MIDDLE shown in source example\""
  - "only MIDDLE shown in source example; other values not enumerated\""
  - "no event mechanism stated"
  - "source contains no explicit interlock procedures or power-on"
  - "DGAMMA, MEMF/MEMG/MEMS, NR, NRMPG parameter value lists not enumerated in source (examples show WEAK / MIDDLE only)"
  - "ASELD1-4/ASELDX2/ASELDX4 parameter values not enumerated in source (example shows 1)"
  - "input-restriction columns per command unreadable in extraction; only FREEZE/NR/NRMPG/TEMP/MAIN restriction rows partially legible"
  - "chapter 8 \"Error Processing\" is an omitted picture in the source extraction"
verification:
  verdict: verified
  checked_at: 2026-09-09T22:17:02.764Z
  matched_actions: 121
  action_count: 121
  confidence: medium
  summary: "All 121 spec action units decompose the 66 source commands (set/query pairs plus inquiry-only); every mnemonic verified in source command list and details; transport params match. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Canon 4K501ST Control Spec

## Summary
Canon 4K501ST multimedia projector, controllable via RS-232C (19200 8N2, CR-delimited ASCII) or LAN (TCP/IP, port 33336). Commands take the form `<COMMAND>=<value>` for settings and `GET=<COMMAND>` for reference; responses are `i:OK` / `i:BUSY`, `g:<command>=<value>`, or `e:<error>` strings terminated with CR. Spec covers all 66 user commands from the vendor command list.

<!-- UNRESOLVED: network configuration (IP addressing method) not described; several parameter enums (DGAMMA, MEMF/MEMG/MEMS, NR, NRMPG, ASELD*) not enumerated in source; power-mode restriction tables partially unreadable in extraction -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 33336
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command evidence in source
traits:
  - powerable   # POWER command present
  - routable    # INPUT input-signal selection present
  - queryable   # GET= reference commands present
  - levelable   # AVOL, BRI, CONT, HUE, SAT, SHARP, GAMMA numeric settings present
```

## Actions
```yaml
# Setting commands: `CMD=value` + CR. Reference commands: `GET=CMD` + CR.
# Delimiter CR (0Dh) implied on every command - not repeated per entry.

# --- 6-axis color adjustment ---
- id: 6axadj_set
  label: 6-axis Color Adjustment On/Off
  kind: action
  command: "6AXADJ={state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: 6axadj_query
  label: 6-axis Color Adjustment Query
  kind: query
  command: "GET=6AXADJ"
  params: []
- id: 6axr_set
  label: 6-axis Adjustment Red (hue/saturation/brightness)
  kind: action
  command: "6AXR={hue},{saturation},{brightness}"
  params:
    - name: hue
      type: integer
      description: "R hue, -20 to 20"
    - name: saturation
      type: integer
      description: "R saturation, -20 to 20"
    - name: brightness
      type: integer
      description: "R brightness, -20 to 20"
- id: 6axr_query
  label: 6-axis Adjustment Red Query
  kind: query
  command: "GET=6AXR"
  params: []
- id: 6axg_set
  label: 6-axis Adjustment Green (hue/saturation/brightness)
  kind: action
  command: "6AXG={hue},{saturation},{brightness}"
  params:
    - name: hue
      type: integer
      description: "G hue, -20 to 20"
    - name: saturation
      type: integer
      description: "G saturation, -20 to 20"
    - name: brightness
      type: integer
      description: "G brightness, -20 to 20"
- id: 6axg_query
  label: 6-axis Adjustment Green Query
  kind: query
  command: "GET=6AXG"
  params: []
- id: 6axb_set
  label: 6-axis Adjustment Blue (hue/saturation/brightness)
  kind: action
  command: "6AXB={hue},{saturation},{brightness}"
  params:
    - name: hue
      type: integer
      description: "B hue, -20 to 20"
    - name: saturation
      type: integer
      description: "B saturation, -20 to 20"
    - name: brightness
      type: integer
      description: "B brightness, -20 to 20"
- id: 6axb_query
  label: 6-axis Adjustment Blue Query
  kind: query
  command: "GET=6AXB"
  params: []
- id: 6axc_set
  label: 6-axis Adjustment Cyan (hue/saturation/brightness)
  kind: action
  command: "6AXC={hue},{saturation},{brightness}"
  params:
    - name: hue
      type: integer
      description: "C hue, -20 to 20"
    - name: saturation
      type: integer
      description: "C saturation, -20 to 20"
    - name: brightness
      type: integer
      description: "C brightness, -20 to 20"
- id: 6axc_query
  label: 6-axis Adjustment Cyan Query
  kind: query
  command: "GET=6AXC"
  params: []
- id: 6axm_set
  label: 6-axis Adjustment Magenta (hue/saturation/brightness)
  kind: action
  command: "6AXM={hue},{saturation},{brightness}"
  params:
    - name: hue
      type: integer
      description: "M hue, -20 to 20"
    - name: saturation
      type: integer
      description: "M saturation, -20 to 20"
    - name: brightness
      type: integer
      description: "M brightness, -20 to 20"
- id: 6axm_query
  label: 6-axis Adjustment Magenta Query
  kind: query
  command: "GET=6AXM"
  params: []
- id: 6axy_set
  label: 6-axis Adjustment Yellow (hue/saturation/brightness)
  kind: action
  command: "6AXY={hue},{saturation},{brightness}"
  params:
    - name: hue
      type: integer
      description: "Y hue, -20 to 20"
    - name: saturation
      type: integer
      description: "Y saturation, -20 to 20"
    - name: brightness
      type: integer
      description: "Y brightness, -20 to 20"
- id: 6axy_query
  label: 6-axis Adjustment Yellow Query
  kind: query
  command: "GET=6AXY"
  params: []

# --- Ambient light ---
- id: ambadj_set
  label: Ambient Light Correction Adjustment
  kind: action
  command: "AMBADJ={state}"
  params:
    - name: state
      type: enum
      values: [ON]
- id: ambadj_query
  label: Ambient Light Correction Query
  kind: query
  command: "GET=AMBADJ"
  params: []
- id: amblevel_set
  label: Ambient Light Level Setting
  kind: action
  command: "AMBLEVEL={level}"
  params:
    - name: level
      type: enum
      values: [WEAK, STRONG]
- id: amblevel_query
  label: Ambient Light Level Query
  kind: query
  command: "GET=AMBLEVEL"
  params: []
- id: ambtype_set
  label: Ambient Light Type Setting
  kind: action
  command: "AMBTYPE={type}"
  params:
    - name: type
      type: enum
      values: [TG, FL]
      description: "TG=Tungsten lamp, FL=Fluorescent lamp"
- id: ambtype_query
  label: Ambient Light Type Query
  kind: query
  command: "GET=AMBTYPE"
  params: []

# --- Audio input terminal selection ---
- id: aseld1_set
  label: DVI-1 Audio Input Terminal Selection
  kind: action
  command: "ASELD1={terminal}"
  params:
    - name: terminal
      type: string
      description: "Digital PC audio terminal selection ID (example value: 1). UNRESOLVED: valid values not enumerated in source"
- id: aseld1_query
  label: DVI-1 Audio Input Terminal Query
  kind: query
  command: "GET=ASELD1"
  params: []
- id: aseld2_set
  label: DVI-2 Audio Input Terminal Selection
  kind: action
  command: "ASELD2={terminal}"
  params:
    - name: terminal
      type: string
      description: "Digital PC audio terminal selection ID (example value: 1). UNRESOLVED: valid values not enumerated in source"
- id: aseld2_query
  label: DVI-2 Audio Input Terminal Query
  kind: query
  command: "GET=ASELD2"
  params: []
- id: aseld3_set
  label: DVI-3 Audio Input Terminal Selection
  kind: action
  command: "ASELD3={terminal}"
  params:
    - name: terminal
      type: string
      description: "Digital PC audio terminal selection ID (example value: 1). UNRESOLVED: valid values not enumerated in source"
- id: aseld3_query
  label: DVI-3 Audio Input Terminal Query
  kind: query
  command: "GET=ASELD3"
  params: []
- id: aseld4_set
  label: DVI-4 Audio Input Terminal Selection
  kind: action
  command: "ASELD4={terminal}"
  params:
    - name: terminal
      type: string
      description: "Digital PC audio terminal selection ID (example value: 1). UNRESOLVED: valid values not enumerated in source"
- id: aseld4_query
  label: DVI-4 Audio Input Terminal Query
  kind: query
  command: "GET=ASELD4"
  params: []
- id: aseldx2_set
  label: DVI 1x2 Audio Input Terminal Selection
  kind: action
  command: "ASELDX2={terminal}"
  params:
    - name: terminal
      type: string
      description: "Digital PC audio terminal selection ID (example value: 1). UNRESOLVED: valid values not enumerated in source"
- id: aseldx2_query
  label: DVI 1x2 Audio Input Terminal Query
  kind: query
  command: "GET=ASELDX2"
  params: []
- id: aseldx4_set
  label: DVI 2x2 / 1x4 Audio Input Terminal Selection
  kind: action
  command: "ASELDX4={terminal}"
  params:
    - name: terminal
      type: string
      description: "Digital PC audio terminal selection ID (example value: 1). UNRESOLVED: valid values not enumerated in source"
- id: aseldx4_query
  label: DVI 2x2 / 1x4 Audio Input Terminal Query
  kind: query
  command: "GET=ASELDX4"
  params: []
- id: aselh1_set
  label: HDMI-1 Audio Input Terminal Selection
  kind: action
  command: "ASELH1={terminal}"
  params:
    - name: terminal
      type: enum
      values: [H1]
      description: "H1 = HDMI1 audio"
- id: aselh1_query
  label: HDMI-1 Audio Input Terminal Query
  kind: query
  command: "GET=ASELH1"
  params: []
- id: aselh2_set
  label: HDMI-2 Audio Input Terminal Selection
  kind: action
  command: "ASELH2={terminal}"
  params:
    - name: terminal
      type: enum
      values: [H2, OFF]
      description: "H2 = HDMI2 audio, OFF = turned off"
- id: aselh2_query
  label: HDMI-2 Audio Input Terminal Query
  kind: query
  command: "GET=ASELH2"
  params: []
- id: aselhx2_set
  label: HDMIx2 Audio Input Terminal Selection
  kind: action
  command: "ASELHX2={terminal}"
  params:
    - name: terminal
      type: enum
      values: [H1, H2, "1"]
      description: "H1 = HDMI1 audio, H2 = HDMI2 audio, 1 = Audio in 1"
- id: aselhx2_query
  label: HDMIx2 Audio Input Terminal Query
  kind: query
  command: "GET=ASELHX2"
  params: []

# --- Picture / image settings ---
- id: aspect_set
  label: Aspect Ratio Setting
  kind: action
  command: "ASPECT={mode}"
  params:
    - name: mode
      type: enum
      values: [AUTO, TRUE]
- id: aspect_query
  label: Aspect Ratio Query
  kind: query
  command: "GET=ASPECT"
  params: []
- id: avol_set
  label: Audio Volume Adjustment
  kind: action
  command: "AVOL={volume}"
  params:
    - name: volume
      type: integer
      description: "Audio volume, 0 to 20. Adjusting during mute cancels mute"
- id: avol_query
  label: Audio Volume Query
  kind: query
  command: "GET=AVOL"
  params: []
- id: blank_set
  label: Screen Blank
  kind: action
  command: "BLANK={state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: "Executing in FREEZE status cancels FREEZE and becomes BLANK"
- id: blank_query
  label: Screen Blank Query
  kind: query
  command: "GET=BLANK"
  params: []
- id: bri_set
  label: Brightness Setting
  kind: action
  command: "BRI={level}"
  params:
    - name: level
      type: integer
      description: "-20 to 20"
- id: bri_query
  label: Brightness Query
  kind: query
  command: "GET=BRI"
  params: []
- id: color_temp_set
  label: Color Temperature Setting
  kind: action
  command: "COLOR_TEMP={level}"
  params:
    - name: level
      type: integer
      description: "-17 to 21"
- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "GET=COLOR_TEMP"
  params: []
- id: cont_set
  label: Contrast Setting
  kind: action
  command: "CONT={level}"
  params:
    - name: level
      type: integer
      description: "-20 to 20"
- id: cont_query
  label: Contrast Query
  kind: query
  command: "GET=CONT"
  params: []
- id: dgamma_set
  label: Dynamic Gamma Setting
  kind: action
  command: "DGAMMA={mode}"
  params:
    - name: mode
      type: enum
      values: [WEAK]
      description: "UNRESOLVED: only WEAK shown in source example; other values not enumerated"
- id: dgamma_query
  label: Dynamic Gamma Query
  kind: query
  command: "GET=DGAMMA"
  params: []
- id: fine_gamma_r_set
  label: Fine Gamma R Setting
  kind: action
  command: "FINE_GAMMA_R={values}"
  params:
    - name: values
      type: string
      description: "Comma-separated adjustment point values (9 points in example), each 0 to 1024. Menu enforces point1-point9 >= 128; user commands do not"
- id: fine_gamma_r_query
  label: Fine Gamma R Query
  kind: query
  command: "GET=FINE_GAMMA_R"
  params: []
- id: fine_gamma_g_set
  label: Fine Gamma G Setting
  kind: action
  command: "FINE_GAMMA_G={values}"
  params:
    - name: values
      type: string
      description: "Comma-separated adjustment point values (9 points in example), each 0 to 1024"
- id: fine_gamma_g_query
  label: Fine Gamma G Query
  kind: query
  command: "GET=FINE_GAMMA_G"
  params: []
- id: fine_gamma_b_set
  label: Fine Gamma B Setting
  kind: action
  command: "FINE_GAMMA_B={values}"
  params:
    - name: values
      type: string
      description: "Comma-separated adjustment point values (9 points in example), each 0 to 1024"
- id: fine_gamma_b_query
  label: Fine Gamma B Query
  kind: query
  command: "GET=FINE_GAMMA_B"
  params: []
- id: fltwrn_set
  label: Air Filter Cleaning Warning Display
  kind: action
  command: "FLTWRN={state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: "ON from parameter table; OFF from usage example in source"
- id: fltwrn_query
  label: Air Filter Cleaning Warning Query
  kind: query
  command: "GET=FLTWRN"
  params: []
- id: freeze_set
  label: Screen Freeze
  kind: action
  command: "FREEZE={state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: freeze_query
  label: Screen Freeze Query
  kind: query
  command: "GET=FREEZE"
  params: []
- id: gamma_set
  label: Gamma Adjustment
  kind: action
  command: "GAMMA={level}"
  params:
    - name: level
      type: integer
      description: "-10 to 10"
- id: gamma_query
  label: Gamma Adjustment Query
  kind: query
  command: "GET=GAMMA"
  params: []
- id: htmpinf_set
  label: High Temperature Caution Display Setting
  kind: action
  command: "HTMPINF={state}"
  params:
    - name: state
      type: enum
      values: [ON]
      description: "UNRESOLVED: only ON documented; OFF presumed but not stated"
- id: htmpinf_query
  label: High Temperature Caution Display Query
  kind: query
  command: "GET=HTMPINF"
  params: []
- id: hue_set
  label: Hue Setting
  kind: action
  command: "HUE={level}"
  params:
    - name: level
      type: integer
      description: "-20 to 20"
- id: hue_query
  label: Hue Query
  kind: query
  command: "GET=HUE"
  params: []
- id: image_set
  label: Image Mode Setting
  kind: action
  command: "IMAGE={mode}"
  params:
    - name: mode
      type: enum
      values: [STANDARD, PRESENTATION, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, USER_1, USER_2, USER_3]
      description: "Changing mode reapplies the mode's unique setting-item set"
- id: image_query
  label: Image Mode Query
  kind: query
  command: "GET=IMAGE"
  params: []
- id: imageflip_set
  label: Flip Display Setting
  kind: action
  command: "IMAGEFLIP={mode}"
  params:
    - name: mode
      type: enum
      values: [NONE, CEILING, REAR, REAR_CEILING]
      description: "Flipping display initializes keystone distortion settings"
- id: imageflip_query
  label: Flip Display Query
  kind: query
  command: "GET=IMAGEFLIP"
  params: []
- id: input_set
  label: Input Signal Selection
  kind: action
  command: "INPUT={input}"
  params:
    - name: input
      type: enum
      values: [HDMI1, HDMI2, HDMI1X2, D-RGB1, D-RGB2, D-RGB3, D-RGB4, D-RGB1X2, D-RGB2X2, D-RGB1X4]
- id: input_query
  label: Input Signal Query
  kind: query
  command: "GET=INPUT"
  params: []
- id: iris_set
  label: Iris Setting
  kind: action
  command: "IRIS={mode}"
  params:
    - name: mode
      type: enum
      values: [OPEN, CLOSE1, CLOSE2, CLOSE3]
- id: iris_query
  label: Iris Setting Query
  kind: query
  command: "GET=IRIS"
  params: []

# --- Keys / panel / remote ---
- id: krep_set
  label: Key Repeat Setting
  kind: action
  command: "KREP={state}"
  params:
    - name: state
      type: enum
      values: [OFF, ON]
- id: krep_query
  label: Key Repeat Query
  kind: query
  command: "GET=KREP"
  params: []
- id: lamp_set
  label: Lamp Mode Setting
  kind: action
  command: "LAMP={mode}"
  params:
    - name: mode
      type: enum
      values: [FULL, ECO]
- id: lamp_query
  label: Lamp Mode Query
  kind: query
  command: "GET=LAMP"
  params: []
- id: lmpwrn_set
  label: Lamp Replacement Warning Display Setting
  kind: action
  command: "LMPWRN={state}"
  params:
    - name: state
      type: enum
      values: [OFF, ON]
- id: lmpwrn_query
  label: Lamp Replacement Warning Query
  kind: query
  command: "GET=LMPWRN"
  params: []
- id: lposld_set
  label: Lens Position Load
  kind: action
  command: "LPOSLD={position}"
  params:
    - name: position
      type: enum
      values: ["1", "2", "3"]
      description: "Cannot be set when position save has not been executed; position save itself is menu-only"
- id: main_emulation
  label: Unit Control Panel Emulation
  kind: action
  command: "MAIN={button}"
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, INPUT, AUTOPC, KEYSTONE, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK, "*-REP"]
      description: "+REP = button press start; always end with *-REP (button press end). i:OK means request accepted, not executed. All params except POWER invalid in standby"

# --- Memory color ---
- id: memf_set
  label: Memory Color Adjustment Flesh
  kind: action
  command: "MEMF={level}"
  params:
    - name: level
      type: enum
      values: [MIDDLE]
      description: "UNRESOLVED: only MIDDLE shown in source example; other values not enumerated. Applies to current input signal and image mode"
- id: memf_query
  label: Memory Color Adjustment Flesh Query
  kind: query
  command: "GET=MEMF"
  params: []
- id: memg_set
  label: Memory Color Adjustment Green
  kind: action
  command: "MEMG={level}"
  params:
    - name: level
      type: enum
      values: [MIDDLE]
      description: "UNRESOLVED: only MIDDLE shown in source example"
- id: memg_query
  label: Memory Color Adjustment Green Query
  kind: query
  command: "GET=MEMG"
  params: []
- id: mems_set
  label: Memory Color Adjustment Sky
  kind: action
  command: "MEMS={level}"
  params:
    - name: level
      type: enum
      values: [MIDDLE]
      description: "UNRESOLVED: only MIDDLE shown in source example"
- id: mems_query
  label: Memory Color Adjustment Sky Query
  kind: query
  command: "GET=MEMS"
  params: []
- id: mute_set
  label: Audio Mute
  kind: action
  command: "MUTE={state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: "Mute always OFF after power-on; volume adjustment cancels mute"
- id: mute_query
  label: Audio Mute Query
  kind: query
  command: "GET=MUTE"
  params: []
- id: nr_set
  label: Random Noise Reduction Setting
  kind: action
  command: "NR={level}"
  params:
    - name: level
      type: enum
      values: [MIDDLE]
      description: "UNRESOLVED: only MIDDLE shown in source example; other values not enumerated"
- id: nr_query
  label: Random Noise Reduction Query
  kind: query
  command: "GET=NR"
  params: []
- id: nrmpg_set
  label: MPEG Noise Reduction Setting
  kind: action
  command: "NRMPG={level}"
  params:
    - name: level
      type: enum
      values: [MIDDLE]
      description: "UNRESOLVED: only MIDDLE shown in source example; other values not enumerated"
- id: nrmpg_query
  label: MPEG Noise Reduction Query
  kind: query
  command: "GET=NRMPG"
  params: []

# --- Power ---
- id: power_set
  label: Power Supply Control
  kind: action
  command: "POWER={state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: power_query
  label: Power Status Query
  kind: query
  command: "GET=POWER"
  params: []
  # response: g:POWER=<OFF|OFF2ON|ON|ON2PMM|PMM|PMM2ON|ON2OFF> - see Feedbacks

# --- RGB gain/offset ---
- id: rgbgain_set
  label: RGB Gain Adjustment
  kind: action
  command: "RGBGAIN={r},{g},{b}"
  params:
    - name: r
      type: integer
      description: "R gain, -60 to 60"
    - name: g
      type: integer
      description: "G gain, -60 to 60"
    - name: b
      type: integer
      description: "B gain, -60 to 60"
- id: rgbgain_query
  label: RGB Gain Query
  kind: query
  command: "GET=RGBGAIN"
  params: []
- id: rgboffset_set
  label: RGB Offset Adjustment
  kind: action
  command: "RGBOFFSET={r},{g},{b}"
  params:
    - name: r
      type: integer
      description: "R offset, -60 to 60"
    - name: g
      type: integer
      description: "G offset, -60 to 60"
    - name: b
      type: integer
      description: "B offset, -60 to 60"
- id: rgboffset_query
  label: RGB Offset Query
  kind: query
  command: "GET=RGBOFFSET"
  params: []
- id: sat_set
  label: Color Saturation Setting
  kind: action
  command: "SAT={level}"
  params:
    - name: level
      type: integer
      description: "-20 to 20"
- id: sat_query
  label: Color Saturation Query
  kind: query
  command: "GET=SAT"
  params: []
- id: saveimgprof_set
  label: User Memory Creation/Storage/Deletion
  kind: action
  command: "SAVEIMGPROF={operation}"
  params:
    - name: operation
      type: enum
      values: [USER_1, USER_2, USER_3, DEL_ALL]
      description: "DEL_ALL restores factory-default state"
- id: saveimgprof_query
  label: User Memory Presence Query
  kind: query
  command: "GET=SAVEIMGPROF"
  params: []
  # response: g:SAVEIMGPROF=<count>:<user1>,<user2>,<user3>
- id: sharp_set
  label: Sharpness Setting
  kind: action
  command: "SHARP={level}"
  params:
    - name: level
      type: integer
      description: "-10 to 10"
- id: sharp_query
  label: Sharpness Query
  kind: query
  command: "GET=SHARP"
  params: []
- id: sigmsg_set
  label: Input Status Display Setting
  kind: action
  command: "SIGMSG={state}"
  params:
    - name: state
      type: enum
      values: [ON]
      description: "UNRESOLVED: only ON documented; OFF presumed but not stated"
- id: sigmsg_query
  label: Input Status Display Query
  kind: query
  command: "GET=SIGMSG"
  params: []
- id: tptn_set
  label: Test Pattern Setting
  kind: action
  command: "TPTN={pattern}"
  params:
    - name: pattern
      type: enum
      values: [OFF, CB1, SSH1, SSH2, SSH3, SSV1, SSV2, SSV3, RTF1, RTF2, RTF3, RTF4, RTH1, RTH2, RTH3, RTH4, SSC1, SSC2, CKR1, CKR2, MUL1, MUL2, CHR1, FCS1, BDR1, CRS1, CRS2, CRS3, DCM1]
      description: "OFF plus 28 test patterns (color bar, stair steps, rasters, checker, DICOM chart, etc.)"
- id: tptn_query
  label: Test Pattern Query
  kind: query
  command: "GET=TPTN"
  params: []

# --- Remote control emulation ---
- id: rc_emulation
  label: Remote Control Operation Emulation
  kind: action
  command: "RC={button}"
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, EXIT, INPUT, DPC, APC1, APC2, HDMI, COMP, ASPECT, AUTOPC, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK, FOCUS, ZOOM, SHIFT, TPTN, KEYSTONE, NUM_0, NUM_1, NUM_2, NUM_3, NUM_4, NUM_5, NUM_6, NUM_7, NUM_8, NUM_9, DZOOM_P, "DZOOM_P+REP", DZOOM_M, "DZOOM_M+REP", VOL_P, "VOL_P+REP", VOL_M, "VOL_M+REP", MUTE, FN, IMAGE, FREEZE, BLANK, GAMMA, SPLIT, ECO, "*-REP"]
      description: "+REP = button press start; always send *-REP at end to finish press. i:OK means request accepted, not executed"

# --- Inquiry-only commands ---
- id: comver_query
  label: User Command Version Inquiry
  kind: query
  command: "GET=COMVER"
  params: []
- id: err_query
  label: Error Information Inquiry
  kind: query
  command: "GET=ERR"
  params: []
- id: lampcounter_query
  label: Lamp Counter Inquiry
  kind: query
  command: "GET=LAMPCOUNTER"
  params: []
- id: prodcode_query
  label: Product Name Inquiry
  kind: query
  command: "GET=PRODCODE"
  params: []
- id: romver_query
  label: Firmware Version Inquiry
  kind: query
  command: "GET=ROMVER"
  params: []
- id: signal_info_query
  label: Displayed Signal Information Inquiry
  kind: query
  command: "GET=SIGNAL_INFO"
  params: []
- id: signalstatus_query
  label: Signal Detection Inquiry
  kind: query
  command: "GET=SIGNALSTATUS"
  params: []
- id: temp_query
  label: Temperature Sensor Value Inquiry
  kind: query
  command: "GET=TEMP"
  params: []
```

## Feedbacks
```yaml
- id: power_mode
  type: enum
  values: [OFF, OFF2ON, ON, ON2PMM, PMM, PMM2ON, ON2OFF]
  description: "From GET=POWER response. Transition values: OFF2ON (OFF->ON), ON2PMM (ON->lamp off), PMM2ON (lamp off->ON), ON2OFF (ON->OFF)"
- id: error_state
  type: enum
  values: [NO_ERROR, ABNORMAL_TEMPERATURE, FAULTY_LAMP, FAULTY_LAMP_COVER, FAULTY_COOLING_FAN, FAULTY_POWER_SUPPLY, FAULTY_AIR_FILTER]
  description: "From GET=ERR. Warning LED state; NO_ERROR when LED not lit"
- id: signal_status
  type: enum
  values: [NO_SIGNAL, DISPLAYING, SETTING, UNSUPPORTED, INSUFFICIENT]
  description: "From GET=SIGNALSTATUS for selected input. e:1011 returned during BLANK"
- id: lamp_counter
  type: string
  description: "From GET=LAMPCOUNTER. Bracketed code encoding cumulative lamp-on hours, e.g. \"[GGG_____]\" = 1080-1619 H"
- id: temperature_sensors
  type: string
  description: "From GET=TEMP. Format <sensor count>,<value 1>,...,<value n>; count can be 0. Example: 5,28.5,53.3,53.3,53.3,33.0"
- id: command_version
  type: string
  description: "From GET=COMVER. 2-digit + 4-digit format, e.g. \"01.1234\""
- id: product_code
  type: string
  description: "From GET=PRODCODE. Returns \"4K501ST\""
- id: rom_version
  type: string
  description: "From GET=ROMVER. Example \"01.234567_12345\""
- id: signal_info
  type: string
  description: "From GET=SIGNAL_INFO. Example \"1920 x 1200 60\". Empty for USB/LAN display; e:1011 during test pattern"
- id: user_memory_status
  type: string
  description: "From GET=SAVEIMGPROF. Format <count>:<user1 present>,<user2 present>,<user3 present>, e.g. 3:0,1,1"
- id: command_ack
  type: enum
  values: [OK, BUSY]
  description: "Normal response prefix i:. BUSY during internal processing - wait and resend"
- id: error_response
  type: string
  description: "Error responses e:<error ID> <info>: e:0002 INVALID_COMMAND, e:000A INVALID_PARAMETER, e:F001 SYSTEM, e:0005 NOT_POWER_SUPPLIED, e:1011 FUNCTION_NOT_AVAILABLE, e:201F INVALID_SIGNAL"
```

## Variables
```yaml
# All settable parameters are represented as discrete Actions (set + query pairs).
# No additional variables beyond those actions. Section N/A.
```

## Events
```yaml
# No unsolicited notifications documented in source. Projector only responds to commands.
# UNRESOLVED: no event mechanism stated
```

## Macros
```yaml
# No multi-step sequences described in source. Section N/A.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit interlock procedures or power-on
# sequencing requirements. Note: error-processing section (chapter 8) is a
# picture omitted during extraction.
```

## Notes
- Command format: `<command text>=<value>` + CR (0Dh), or bare `<command text>` + CR. Queries use `GET=<command>`. Max 256 characters including delimiter.
- Response format: first char is type (`i` normal, `g` reference, `e` error) followed by `:`. All responses CR-terminated.
- Serial: RS-232C start-stop sync half-duplex, 19200 bps, 8 data bits, 2 stop bits, no parity, no flow/error control, no break signal. 9-pin crossover cable, 3-line SD/RD/SG.
- LAN: TCP port 33336; socket closes after 30 s without a command; network function must be enabled on projector first.
- Timeouts: Tc (inter-character) 1 s — exceeding it or missing delimiter within 256 chars discards the partial command; Tr (command→response) 15 s — resend on timeout.
- Strict request/response lock-step: next command only after response; 2nd+ simultaneous commands discarded; LAN packets with embedded multiple commands process only the first.
- Commands are case-insensitive; use uppercase by convention.
- Power-mode restrictions: commands executable only in modes marked Yes (LAN: SL0/SL1/SL3/PM/ON; RS-232C: ST/PM/ON). In standby only a portion of commands work (e.g. POWER, GET=ERR, MAIN, RC, TEMP, COMVER, PRODCODE, ROMVER, LAMPCOUNTER).
- Naming discrepancy in source: command list spells FINEGAMMAR/FINEGAMMAG/FINEGAMMAB; command details and examples use FINE_GAMMA_R/FINE_GAMMA_G/FINE_GAMMA_B. This spec uses the detail spelling.
- MAIN/RC emulation: `i:OK` acknowledges request acceptance only (including POWER_OFF) — no confirmation of actual execution.
- Lamp/filt warnings display 10 s at startup regardless of trigger source (button or command).
<!-- UNRESOLVED: DGAMMA, MEMF/MEMG/MEMS, NR, NRMPG parameter value lists not enumerated in source (examples show WEAK / MIDDLE only) -->
<!-- UNRESOLVED: ASELD1-4/ASELDX2/ASELDX4 parameter values not enumerated in source (example shows 1) -->
<!-- UNRESOLVED: input-restriction columns per command unreadable in extraction; only FREEZE/NR/NRMPG/TEMP/MAIN restriction rows partially legible -->
<!-- UNRESOLVED: chapter 8 "Error Processing" is an omitted picture in the source extraction -->

## Provenance

```yaml
source_domains:
  - files.canon-europe.com
source_urls:
  - https://files.canon-europe.com/files/webcontent/pdf/4K501ST_UC_E_YT1-1467-000.pdf
retrieved_at: 2026-05-14T21:18:58.349Z
last_checked_at: 2026-09-09T22:17:02.764Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-09T22:17:02.764Z
matched_actions: 121
action_count: 121
confidence: medium
summary: "All 121 spec action units decompose the 66 source commands (set/query pairs plus inquiry-only); every mnemonic verified in source command list and details; transport params match. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "network configuration (IP addressing method) not described; several parameter enums (DGAMMA, MEMF/MEMG/MEMS, NR, NRMPG, ASELD*) not enumerated in source; power-mode restriction tables partially unreadable in extraction"
- "valid values not enumerated in source\""
- "only WEAK shown in source example; other values not enumerated\""
- "only ON documented; OFF presumed but not stated\""
- "only MIDDLE shown in source example; other values not enumerated. Applies to current input signal and image mode\""
- "only MIDDLE shown in source example\""
- "only MIDDLE shown in source example; other values not enumerated\""
- "no event mechanism stated"
- "source contains no explicit interlock procedures or power-on"
- "DGAMMA, MEMF/MEMG/MEMS, NR, NRMPG parameter value lists not enumerated in source (examples show WEAK / MIDDLE only)"
- "ASELD1-4/ASELDX2/ASELDX4 parameter values not enumerated in source (example shows 1)"
- "input-restriction columns per command unreadable in extraction; only FREEZE/NR/NRMPG/TEMP/MAIN restriction rows partially legible"
- "chapter 8 \"Error Processing\" is an omitted picture in the source extraction"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
