---
spec_id: admin/wyrestorm-h2x-h2xc-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wyrestorm H2X/H2XC Matrix Switcher Control Spec"
manufacturer: Wyrestorm
model_family: MX-1010-HDBT-H2X
aliases: []
compatible_with:
  manufacturers:
    - Wyrestorm
  models:
    - MX-1010-HDBT-H2X
    - MX-1616-HDBT-H2X
    - MX-1010-H2XC
    - MX-1616-H2XC
  firmware: "10x10 Main Board FW v1.3 (or below); 16x16 Main Board FW v1.4 (or below)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-04-29T12:48:08.122Z
last_checked_at: 2026-06-02T07:06:59.444Z
generated_at: 2026-06-02T07:06:59.444Z
firmware_coverage: "10x10 Main Board FW v1.3 (or below); 16x16 Main Board FW v1.4 (or below)"
protocol_coverage: []
known_gaps:
  - "No explicit safety / interlock / power-sequencing material in source"
  - "parity byte not present in the source's worked example"
  - "no discrete read/write variable set defined in source."
  - "no event/asynchronous message catalogue in source."
  - "no multi-step sequence commands documented in source."
  - "source contains no explicit safety warnings, interlock"
  - "list of unsupported areas:"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:59.444Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions match verbatim in source; transport (IP:23, serial:57600-8N1) verified; full command catalogue represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Wyrestorm H2X/H2XC Matrix Switcher Control Spec

## Summary

This spec covers the ASCII control API for the Wyrestorm H2X/H2XC matrix switcher family (MX-1010-HDBT-H2X, MX-1616-HDBT-H2X, MX-1010-H2XC, MX-1616-H2XC) over RS-232 and IP. Commands include video/audio routing, audio gain/mute/EQ/delay, EDID/HDCP configuration, CEC display power, presets, and diagnostic queries. A binary HDBaseT passthrough frame is also documented for relaying commands to remote devices.

<!-- UNRESOLVED: No explicit safety / interlock / power-sequencing material in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from CEC display power on/off commands
- routable        # inferred from SW (video) and AUDIOSW (audio) routing commands
- queryable       # inferred from extensive GET-status query commands
- levelable       # inferred from volume/gain/EQ control commands
```

## Actions
```yaml
# ---- Section 4.1 Audio/Video Output Control ----

- id: sw_set
  label: Switch Video Input to Output
  kind: action
  command: "SET SW{in} {out}<CR><LF>"
  params:
    - name: in
      type: string
      description: Video input (in1~in16)
    - name: out
      type: string
      description: Video output (out1~out16, all)

- id: mp_get
  label: Query Video Input Mapping
  kind: query
  command: "GET MP{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: Video output (out1~out16, all)

- id: audiosw_m_set
  label: Configure Audio Switch Mode
  kind: action
  command: "SET AUDIOSW_M {prm}<CR><LF>"
  params:
    - name: prm
      type: enum
      values: [on, off]
      description: "on = audio independent from video; off = audio follows video"

- id: audiosw_m_get
  label: Query Audio Switch Mode
  kind: query
  command: "GET AUDIOSW_M<CR><LF>"
  params: []

- id: audiosw_set
  label: Switch Audio Input to Output
  kind: action
  command: "SET AUDIOSW{in} {out}<CR><LF>"
  params:
    - name: in
      type: string
      description: "Audio input (hdmi1~hdmi16, spdif1~spdif16, arc1~arc16)"
    - name: out
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: audiomp_get
  label: Query Audio Input Mapping
  kind: query
  command: "GET AUDIOMP{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: volgain_data_set
  label: Set Output Gain Level
  kind: action
  command: "SET VOLGAIN_DATA{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: prm
      type: integer
      description: |
        Gain in dB.
        FW below threshold: -10~10 (default 0).
        FW v1.3 (10x10) / v1.4 (16x16) or higher: -80~0 in 2 dB steps.

- id: volgain_data_get
  label: Query Current Output Gain
  kind: query
  command: "GET VOLGAIN_DATA{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: mute_set
  label: Mute Audio
  kind: action
  command: "SET MUTE{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (spdifout1~spdifout16, audioout1~audioout16, all)"
    - name: prm
      type: enum
      values: [on, off]
      description: "on = mute; off = unmute"

- id: mute_get
  label: Query Current Audio Mute State
  kind: query
  command: "GET MUTE{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (spdifout1~spdifout16, audioout1~audioout16, all)"

- id: volgain_fix_set
  label: Set Audio Out Level as Fixed or Variable
  kind: action
  command: "SET VOLGAIN_FIX{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: prm
      type: enum
      values: [on, off]
      description: "on = fixed; off = variable"

- id: volgain_fix_get
  label: Query Audio Out Level Setting
  kind: query
  command: "GET VOLGAIN_FIX{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: mute_m_set
  label: Set Attenuation Method for Mute
  kind: action
  command: "SET MUTE_M{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: prm
      type: enum
      values: [cut, ramp]
      description: "cut = direct to mute level; ramp = ramps to mute level"

- id: volgain_inc
  label: Increase Volume Output Level
  kind: action
  command: "SET VOLGAIN_INC{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: volgain_dec
  label: Decrease Volume Output Level
  kind: action
  command: "SET VOLGAIN_DEC{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: volgain_step_set
  label: Configure Step Length of Volume Increase/Decrease
  kind: action
  command: "SET VOLGAIN_STEP{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: prm
      type: enum
      values: ["2", "4", "8"]
      description: Step length in dB

- id: volgain_step_get
  label: Query Step Length of Volume Increase/Decrease
  kind: query
  command: "GET VOLGAIN_STEP{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

- id: mute_m_get
  label: Query Output Mute Method
  kind: query
  command: "GET MUTE_M{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

# ---- Audio Delay Configuration ----

- id: audio_d_set
  label: Set Audio Output Delay Time
  kind: action
  command: "SET AUDIO_D{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: prm
      type: integer
      description: "Delay in ms (0~500). 0 = no delay."

- id: audio_d_get
  label: Query Audio Output Delay Time
  kind: query
  command: "GET AUDIO_D{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"

# ---- Audio Output EQ ----

- id: eq_fn_set
  label: Enable EQ
  kind: action
  command: "SET EQ_FN{aout} {prm}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: prm
      type: enum
      values: [on, off]
      description: "on = enable; off = bypassed"

- id: eq_fn_get
  label: Query EQ Function Status
  kind: query
  command: "GET EQ_FN{aout}<CR><LF>"
  params:
    - name: aout
      type: string
      description: "Audio output (audioout1, audioout2, … audioout16, all)"

- id: audio_eq_set
  label: Set Audio Out EQ Level
  kind: action
  command: "SET AUDIO_EQ{out} {freq} {gain}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Audio output (audioout1~audioout16, all)"
    - name: freq
      type: enum
      values: [31, 62, 125, 250, 500, 2000, 4000, 8000, 16000]
      description: "Frequency band in Hz"
    - name: gain
      type: integer
      description: "Gain in dB (-10~10)"

- id: audio_eq_get
  label: Query Audio Out EQ Level
  kind: query
  command: "GET AUDIO_EQ{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Audio output (audioout1~audioout16, all)"

# ---- Scene Save and Recall ----

- id: preset_v_save
  label: Save Video Scene
  kind: action
  command: "SAVE PRESET_V{prm}<CR><LF>"
  params:
    - name: prm
      type: integer
      description: "Scene number (1~20)"

- id: preset_v_restore
  label: Recall Video Scene
  kind: action
  command: "RESTORE PRESET_V{prm}<CR><LF>"
  params:
    - name: prm
      type: integer
      description: "Scene number (1~20)"

- id: preset_a_save
  label: Save Audio Scene
  kind: action
  command: "SAVE PRESET_A{prm}<CR><LF>"
  params:
    - name: prm
      type: integer
      description: "Scene number (1~20). Requires 10x10 FW v1.3+ or 16x16 FW v1.4+."

- id: preset_a_restore
  label: Recall Audio Scene
  kind: action
  command: "RESTORE PRESET_A{prm}<CR><LF>"
  params:
    - name: prm
      type: integer
      description: "Scene number (1~20). Requires 10x10 FW v1.3+ or 16x16 FW v1.4+."

# ---- Section 4.2 Display Power Control ----

- id: cec_pwr_set
  label: Power Display On/Off
  kind: action
  command: "SET CEC_PWR{out} {prm}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Display output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
    - name: prm
      type: enum
      values: [on, off]
      description: Power state

- id: cec_pwr_get
  label: Query CEC Power Status
  kind: query
  command: "GET CEC_PWR{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Display output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"

- id: autocec_d_set
  label: Set CEC Power Delay Time
  kind: action
  command: "SET AUTOCEC_D{out} {prm}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Display output (hdbt1~hdbt16, hdmiout1~hdmiout16)"
    - name: prm
      type: integer
      description: "Delay in minutes (0~30). 0 = power off immediately if no active signal."

- id: autocec_d_get
  label: Query CEC Power Delay Time
  kind: query
  command: "GET AUTOCEC_D{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Display output (hdbt1~hdbt16, hdmiout1~hdmiout16)"

# ---- Section 5.1 HDCP Configuration ----

- id: hdcp_s_set
  label: Set Input HDCP On/Off
  kind: action
  command: "SET HDCP_S{in} {prm}<CR><LF>"
  params:
    - name: in
      type: string
      description: "Input (in1~in16, all)"
    - name: prm
      type: enum
      values: [on, off]

- id: hdcp_s_get
  label: Query Input HDCP Status
  kind: query
  command: "GET HDCP_S{in}<CR><LF>"
  params:
    - name: in
      type: string
      description: "Input (in1~in16, all)"

# ---- Section 5.1 EDID Configuration ----

- id: edid_dip_get
  label: Query EDID Dip Switch Status
  kind: query
  command: "GET EDID_DIP<CR><LF>"
  params: []

- id: edid_set
  label: Set Input EDID
  kind: action
  command: "SET EDID{in} {prm}<CR><LF>"
  params:
    - name: in
      type: string
      description: "Input (in1~in16, all)"
    - name: prm
      type: integer
      description: "EDID code per EDID Parameter Table (0~31)"

- id: edid_get_all
  label: Query All Inputs EDID Status
  kind: query
  command: "GET EDID{all}<CR><LF>"
  params: []

# ---- Section 5.2 IR Call Back ----

- id: irback_fn_set
  label: Set IR Call Back Control
  kind: action
  command: "SET IRBACK_FN{prm}<CR><LF>"
  params:
    - name: prm
      type: enum
      values: [on, off]

- id: irback_fn_get
  label: Query IR Call Back Status
  kind: query
  command: "GET IRBACK_FN<CR><LF>"
  params: []

# ---- Section 5.2 Long Reach Cable Mode ----

- id: lr_fn_set
  label: Set Long Reach Mode On/Off
  kind: action
  command: "SET LR_FN{prm1} {prm2}<CR><LF>"
  params:
    - name: prm1
      type: enum
      values: [hdbtall]
    - name: prm2
      type: enum
      values: [on, off]

- id: lr_fn_get
  label: Query Long Reach Mode Status
  kind: query
  command: "GET LR_FN{prm1}<CR><LF>"
  params:
    - name: prm1
      type: enum
      values: [hdbtall]

# ---- Section 5.2 IR System Codes ----

- id: ir_syscode_set
  label: Set IR System Codes
  kind: action
  command: "SET IR_SYSCODE{prm1}<CR><LF>"
  params:
    - name: prm1
      type: enum
      values: ["00", "4E", all]
      description: "all = matrix responds to both 00 and 4E code sets"

- id: ir_syscode_get
  label: Query IR System Codes
  kind: query
  command: "GET IR_SYSCODE<CR><LF>"
  params: []

# ---- Section 5.2 Matrix Switching Mode ----

- id: sw_m_set
  label: Set Matrix Switching Mode
  kind: action
  command: "SET SW_M{prm}<CR><LF>"
  params:
    - name: prm
      type: enum
      values: [normal, quick]

- id: sw_m_get
  label: Query Matrix Switching Mode
  kind: query
  command: "GET SW_M<CR><LF>"
  params: []

# ---- Section 5.2 AVR Priority Mode (Theater Zone Locking) ----

- id: zone_lock_set
  label: Set AVR Priority Mode for an Output
  kind: action
  command: "SET ZONE_LOCK{out} {prm}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
    - name: prm
      type: enum
      values: [on, off]

- id: zone_lock_get
  label: Query AVR Priority Mode Status for an Output
  kind: query
  command: "GET ZONE_LOCK{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"

# ---- Section 5.2 Source Zone Lockout ----

- id: zone_r_set
  label: Select Sources a Zone Can Access
  kind: action
  command: "SET ZONE_R{out} {prm}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Output (out1~16, all)"
    - name: prm
      type: string
      description: "4-hex-digit source mask per Source Zone Lockout Parameter Table (e.g. AAAA, 03FF, FFFF)"

- id: zone_r_get
  label: Query Sources a Zone Can Access
  kind: query
  command: "GET ZONE_R{out}<CR><LF>"
  params:
    - name: out
      type: string
      description: "Output (out1~16, all)"

# ---- Section 6 Controlling Remote Devices over HDBaseT ----

- id: hdbt_route
  label: Route Command to Remote Device over HDBaseT
  kind: action
  command: "05 55 55 57 {card} {baud} {parity} {length} {device_cmd_hex}"
  params:
    - name: card
      type: string
      description: |
        Card slot byte per Card Slot Values table.
        HDBaseT Output cards: 01~10 (hex).
        HDBaseT Input cards (TX-H2X-HDBT): 11~20 (hex).
    - name: baud
      type: string
      description: "Baud rate byte per Baud Rate Values table (00=110 … 0C=115200)"
    - name: parity
      type: string
      description: "Parity byte per Parity Values table (00=None, 01=ODD, 02=Even, 03=Mark, 04=Space)"
    - name: length
      type: string
      description: "Length in bytes of device command (hex per Command Length HEX table)"
    - name: device_cmd_hex
      type: string
      description: "Device command bytes in hex (ASCII commands must be converted to hex)"
  notes: |
    Header = 05 55 55 57.
    Example: 05 55 55 57 02 06 05 62 67 20 0D 0A
    (card=02, baud=06 [9600], length=05, command=62 67 20 0D 0A).
    UNRESOLVED: parity byte not present in the source's worked example
    (only 11 bytes shown for header(4)+card(1)+baud(1)+length(1)+cmd(5));
    spec field kept to match the documented frame format.

# ---- Section 7 Diagnostic Troubleshooting ----

- id: cablec_in_get
  label: Query Input Cable Connection Status
  kind: query
  command: "GET CABLEC_IN{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Input (in1~in16, all)"

- id: cablec_out_get
  label: Query Output Cable Connection Status
  kind: query
  command: "GET CABLEC_IN{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Output (hdmiout1~hdmiout16, hdbtout1~hdbtout16, all)"
  notes: |
    Source documents the same GET CABLEC_IN mnemonic for both input and
    output cable queries (likely a source typo; preserved verbatim).

- id: hdbtl_in_get
  label: Query HDBaseT Input Link Quality
  kind: query
  command: "GET HDBTL_IN{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "HDBaseT input (hdbtin1~hdbtin16, all)"

- id: hdbtl_out_get
  label: Query HDBaseT Output Link Quality
  kind: query
  command: "GET HDBTL_OUT{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "HDBaseT output (hdbtout1~hdbtout16, all)"

- id: card_c_get
  label: Query Card Connection Status
  kind: query
  command: "GET CARD_C{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Card slot (slot1~slot16, all)"

- id: card_t_get
  label: Query Card Type
  kind: query
  command: "GET CARD_T{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Card slot (slot1~slot16, all)"

- id: card_com_get
  label: Query Card Communication Status With Motherboard
  kind: query
  command: "GET CARD_COM{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Card slot (slot1~slot16, all)"

- id: card_s_get
  label: Query Board/Card Status
  kind: query
  command: "GET CARD_S{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Target (mainboard, card1~card16, all)"

- id: fans_get
  label: Query Fan Status
  kind: query
  command: "GET FANS{prm1}<CR><LF>"
  params:
    - name: prm1
      type: string
      description: "Fan (fan1~fan4, all)"

# ---- Section 7 Rebooting and Restoring Defaults ----

- id: reboot
  label: Reboot the Matrix
  kind: action
  command: "REBOOT {prm}<CR><LF>"
  params:
    - name: prm
      type: string
      description: "Target (all, mainboard, ledboard, card1~card16)"

- id: reset
  label: Restore Factory Defaults
  kind: action
  command: "RESET<CR><LF>"
  params: []
```

## Feedbacks
```yaml
- id: video_input_mapping
  type: object
  description: |
    Response to GET MP{out}: `MP{in#} {out#}` showing which input is
    routed to which output. in = in1~in16, out = out1~out16, all.

- id: audio_switch_mode
  type: enum
  values: [on, off]
  description: "Response to GET AUDIOSW_M: on = audio independent from video, off = audio follows video."

- id: audio_input_mapping
  type: object
  description: |
    Response to GET AUDIOMP{out}: `AUDIOMP{in} {out}` (returns AUDIOSW
    form per source example). in = hdmi1~hdmi16, spdif1~spdif16, arc1~arc16;
    out = audioout1~audioout16, all.

- id: volgain_data
  type: object
  description: |
    Per-audioout gain in dB. Range depends on firmware:
    FW below v1.3 (10x10) / v1.4 (16x16): -10~10, default 0.
    FW v1.3 / v1.4 or higher: -80~0 in 2 dB steps.

- id: mute_state
  type: enum
  values: [on, off]
  description: "Response to GET MUTE{aout}: on = muted, off = unmuted."

- id: volgain_fix
  type: enum
  values: [on, off]
  description: "Response to GET VOLGAIN_FIX{aout}: on = fixed level, off = variable level."

- id: mute_method
  type: enum
  values: [cut, ramp]
  description: "Response to GET MUTE_M{aout}: cut = direct to mute, ramp = ramp to mute."

- id: audio_delay
  type: integer
  description: "Response to GET AUDIO_D{aout}: delay in ms (0~500)."

- id: eq_function
  type: enum
  values: [on, off]
  description: "Response to GET EQ_FN{aout}: on = enabled, off = bypassed."

- id: audio_eq_band
  type: object
  description: |
    Response to GET AUDIO_EQ{out}: `AUDIO_EQ{out} {freq} {gain}`.
    freq = 31|62|125|250|500|2000|4000|8000|16000 Hz.
    gain = -10~10 dB.

- id: volgain_step
  type: enum
  values: ["2", "4", "8"]
  description: "Response to GET VOLGAIN_STEP{aout}: step length in dB."

- id: cec_power
  type: enum
  values: [on, off]
  description: "Response to GET CEC_PWR{out}: display power state for given HDMI/HDBT output."

- id: autocec_d
  type: integer
  description: "Response to GET AUTOCEC_D{out}: delay in minutes (0~30)."

- id: hdcp_status
  type: enum
  values: [on, off]
  description: "Response to GET HDCP_S{in}: HDCP on/off per input."

- id: edid_dip
  type: integer
  description: "Response to GET EDID_DIP: dip-switch value 0~15."

- id: edid_per_input
  type: object
  description: "Response to GET EDID{all}: per-input EDID codes (0~31 per EDID Parameter Table)."

- id: irback_fn
  type: enum
  values: [on, off]
  description: "Response to GET IRBACK_FN: IR call back on/off."

- id: lr_fn
  type: enum
  values: [on, off]
  description: "Response to GET LR_FN{hdbtall}: long-reach mode on/off for HDBT outputs."

- id: ir_syscode
  type: enum
  values: ["00", "4E", all]
  description: "Response to GET IR_SYSCODE: active IR system code set."

- id: sw_m
  type: enum
  values: [normal, quick]
  description: "Response to GET SW_M: matrix switching mode."

- id: zone_lock
  type: enum
  values: [on, off]
  description: "Response to GET ZONE_LOCK{out}: AVR priority mode per output."

- id: zone_r_mask
  type: string
  description: |
    Response to GET ZONE_R{out}: 4-hex-digit mask per Source Zone Lockout
    Parameter Table (e.g. 0001=In1, FFFF=all 16x16).

- id: cablec_in
  type: enum
  values: [connected, not connected]
  description: "Response to GET CABLEC_IN{in}: input cable status."

- id: cablec_out
  type: enum
  values: [connected, not connected]
  description: "Response to GET CABLEC_IN{output}: output cable status (uses same mnemonic per source)."

- id: hdbtl_in_quality
  type: string
  description: "Response to GET HDBTL_IN{hdbtin}: link quality 1~10 or `no link`."

- id: hdbtl_out_quality
  type: string
  description: "Response to GET HDBTL_OUT{hdbtout}: link quality 1~10 or `no link`."

- id: card_c
  type: enum
  values: [connected, not connected]
  description: "Response to GET CARD_C{slot}: card connection status."

- id: card_t
  type: enum
  values: [hdmi, hdbt]
  description: "Response to GET CARD_T{slot}: card type."

- id: card_com
  type: enum
  values: [good, none]
  description: "Response to GET CARD_COM{slot}: card-to-motherboard comm status."

- id: card_s
  type: enum
  values: [good, none]
  description: "Response to GET CARD_S{target}: board/card functional status."

- id: fans
  type: enum
  values: [working, unworking]
  description: "Response to GET FANS{fan}: fan status."
```

## Variables
```yaml
# Source documents ranges/parameters inline within each action; no
# separate persistent variable surface described.
# UNRESOLVED: no discrete read/write variable set defined in source.
```

## Events
```yaml
# Source does not document any unsolicited notifications the device
# sends back to the controller.
# UNRESOLVED: no event/asynchronous message catalogue in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequence commands documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock
# procedures, or power-on sequencing requirements. AUTOCEC_D mentions
# that "0 = power off the display immediately if there is no active
# signal" but this is a behavior note, not a stated safety interlock.
```

## Notes

- Command syntax: ASCII, case-sensitive keywords, terminated with `<CR><LF>`. Every command and response in this spec preserves that terminator.
- Default IP: 192.168.11.143, default port: 23 (Telnet-style TCP). Default serial: 57600 baud, 8N1, no flow control.
- Firmware variants: 10x10 main-board FW v1.3 and 16x16 main-board FW v1.4 split the command surface. The `volgain_data` range, `preset_a_*` commands, and several FW-gated variants only apply to v1.3/v1.4 or higher. Source explicitly states: "Supported Firmware: 10x10 Main Board FW v1.3, 16x16 Main Board FW v1.4."
- Routing command (Section 6) is a binary frame `[Header 05 55 55 57] [Card] [Baud] [Parity] [Length] [Device Command]`, not an ASCII line. ASCII commands to a remote device must be converted to hex before being placed in `device_cmd_hex`.
- Two apparent source typos preserved verbatim: (a) `GET CABLEC_IN` is the documented mnemonic for the *output* cable status query; (b) the worked routing example in §6.1 contains 11 bytes (header(4)+card(1)+baud(1)+length(1)+cmd(5)) and omits the parity byte the frame description otherwise requires.
- EDID codes 0~15 = "Copy from output #", codes 16~31 = fixed EDID modes (1080p/4K variants, HDR variants, Smart EDID, EDID Write).
- Source Zone Lockout parameter table: each input maps to a hex bit position (In1=0001 … In16=8000). Predefined groupings: odd (10x10=0155, 16x16=AAAA), even (10x10=02AA, 16x16=5555), all (10x10=03FF, 16x16=FFFF).
- "ZONE_R" mnemonic uses lowercase "out10" in the source's example string but uppercase "out" / "all" in the parameter definition; preserved as written.

<!-- UNRESOLVED: list of unsupported areas:
  - No login/auth/credential model described.
  - No firmware version compatibility ranges beyond the v1.3 / v1.4 thresholds.
  - No HDCP version (1.4 vs 2.2) details beyond on/off.
  - No voltage, current, or power-draw specs.
  - No error-code table or fault-recovery sequence.
  - No event/asynchronous push messages.
-->

## Provenance

```yaml
source_domains:
  - digis.ru
source_urls:
  - https://digis.ru/upload/iblock/b37/40421_WyreStorm_MX_xxxx_HDBT_H2X_H2XC_API.pdf
retrieved_at: 2026-04-29T12:48:08.122Z
last_checked_at: 2026-06-02T07:06:59.444Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:59.444Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions match verbatim in source; transport (IP:23, serial:57600-8N1) verified; full command catalogue represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No explicit safety / interlock / power-sequencing material in source"
- "parity byte not present in the source's worked example"
- "no discrete read/write variable set defined in source."
- "no event/asynchronous message catalogue in source."
- "no multi-step sequence commands documented in source."
- "source contains no explicit safety warnings, interlock"
- "list of unsupported areas:"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
