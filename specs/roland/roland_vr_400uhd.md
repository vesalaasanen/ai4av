---
spec_id: admin/roland-vr-400uhd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Roland VR-400UHD Control Spec"
manufacturer: Roland
model_family: VR-400UHD
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - VR-400UHD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
retrieved_at: 2026-05-04T17:23:56.946Z
last_checked_at: 2026-05-05T05:41:50.750Z
generated_at: 2026-05-05T05:41:50.750Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-05T05:41:50.750Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "All 46 spec actions match source commands with correct parameters; transport and command coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Roland VR-400UHD Control Spec

## Summary
Roland VR-400UHD video switcher with dual-mode (LAN TCP/IP via Telnet on port 8023, and RS-232) remote control. Commands use `set,<category>,<id>,<sub-id>,<value>` ASCII format with LF terminator. ACK response on success, `err` response on failure. Supports program/preset scene selection, transitions, DSK, LOGO, PinP, audio mixing, video scaling.

<!-- UNRESOLVED: power on/off commands not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8023  # TCP port for Telnet
serial:
  baud_rate: 9600  # also supports 38400 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: password  # password required for network connection per source
```

## Traits
```yaml
- routable    # video input routing, DSK/PinP source selection
- queryable   # get command, ver command for model/version
- levelable   # volume, pan, levels, fade times
```

## Actions
```yaml
- id: select_program_scene
  label: Select Program Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene number 0-63 (maps to 1-1-8-8)

- id: select_preset_scene
  label: Select Preset Scene
  kind: action
  params:
    - name: scene
      type: integer
      description: Scene number 0-63 (maps to 1-1-8-8)

- id: press_cut
  label: CUT
  kind: action
  params: []

- id: press_auto
  label: AUTO Transition
  kind: action
  params: []

- id: press_output_fade
  label: OUTPUT FADE
  kind: action
  params:
    - name: target
      type: integer
      description: 0=PGM (PGM1 in DUAL), 1=PGM2 in DUAL mode
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_dsk
  label: Set DSK On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_logo
  label: Set LOGO On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_mix_wipe
  label: Switch MIX/WIPE
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=MIX, 1=WIPE

- id: set_wipe_pattern
  label: Set WIPE Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0-3 (patterns 1-4)

- id: set_transition_time
  label: Set Transition Time
  kind: action
  params:
    - name: time
      type: integer
      description: 0-20 (0.0-2.0 sec)

- id: set_auto_transition
  label: Set AUTO TRANSITION On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_mic_volume
  label: Adjust MIC Channel Volume
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: level
      type: integer
      description: 0-127

- id: set_mic_solo
  label: Set MIC Solo On/Off
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_mic_mute
  label: Set MIC Mute On/Off
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_aux_send_level
  label: Adjust AUX Send Level
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: level
      type: integer
      description: 0-127

- id: set_mic_pan
  label: Adjust MIC Pan
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: pan
      type: integer
      description: -50-0-50 (L-C-R)

- id: set_reverb_send_level
  label: Adjust Reverb Send Level
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: level
      type: integer
      description: 0-127

- id: set_usb_send
  label: Set USB Send On/Off
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_aux_prepost
  label: Set AUX PRE/POST
  kind: action
  params:
    - name: channel
      type: integer
      description: 0-5 (MIC1-MIC6)
    - name: mode
      type: integer
      description: 0=PRE, 1=POST

- id: set_dsk_source
  label: Set DSK Source
  kind: action
  params:
    - name: dsk
      type: integer
      description: 0=DSK1, 1=DSK2
    - name: input
      type: integer
      description: 0-5 (Video input 1-6)

- id: set_dsk_key_source
  label: Set DSK Key Source
  kind: action
  params:
    - name: dsk
      type: integer
      description: 0=DSK1, 1=DSK2
    - name: input
      type: integer
      description: 0-5 (Audio input 1-6)

- id: set_dsk_blend
  label: Set DSK Blend
  kind: action
  params:
    - name: dsk
      type: integer
      description: 0=DSK1, 1=DSK2
    - name: level
      type: integer
      description: 0-127

- id: set_dsk_auto_fade
  label: Set DSK Auto Fade
  kind: action
  params:
    - name: dsk
      type: integer
      description: 0=DSK1, 1=DSK2
    - name: state
      type: integer
      description: 0=OFF, 1=ON
    - name: time
      type: integer
      description: 0-20 (Time)

- id: set_logo_position
  label: Set LOGO Position
  kind: action
  params:
    - name: h_pos
      type: integer
      description: 0-8 (H position)
    - name: v_pos
      type: integer
      description: 0-15 (V position)

- id: set_logo_scale
  label: Set LOGO Scale
  kind: action
  params:
    - name: scale
      type: integer
      description: 0-5 (1-4)

- id: set_logo_fade
  label: Set LOGO Fade
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
    - name: time
      type: integer
      description: 0-20 (Time)

- id: set_freeze
  label: Set Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: set_still_format
  label: Set Still Format
  kind: action
  params:
    - name: format
      type: integer
      description: 0=FULL, 1=LG, 2=RG, 3=CG

- id: set_still_source
  label: Set Still Source
  kind: action
  params:
    - name: still
      type: integer
      description: 0-1 (STILL1, STILL2)
    - name: input
      type: integer
      description: 0-5 (Video input 1-6)

- id: set_pinp_source
  label: Set PinP Source
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: input
      type: integer
      description: 0-5 (Video input 1-6)

- id: set_pinp_position
  label: Set PinP Position
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: h_pos
      type: integer
      description: -50-50 (H position)
    - name: v_pos
      type: integer
      description: -50-50 (V position)

- id: set_pinp_size
  label: Set PinP Size
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: size
      type: integer
      description: 0-100

- id: set_pinp_aspect
  label: Set PinP Aspect
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: aspect
      type: integer
      description: 0=16:9, 1=4:3

- id: set_pinp_border
  label: Set PinP Border
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: h_pos
      type: integer
      description: 0-50 (H position)
    - name: v_pos
      type: integer
      description: 0-50 (V position)

- id: set_pinp_auto_fade
  label: Set PinP Auto Fade
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: state
      type: integer
      description: 0=OFF, 1=ON
    - name: time
      type: integer
      description: 0-20 (Time)

- id: set_pinp_blend
  label: Set PinP Blend
  kind: action
  params:
    - name: pinp
      type: integer
      description: 0-1 (PinP1, PinP2)
    - name: level
      type: integer
      description: 0-127

- id: set_hd_sd
  label: Set HD/SD
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AUTO, 1=HD, 2=SD

- id: set_video_input_format
  label: Set Video Input Format
  kind: action
  params:
    - name: format
      type: integer
      description: 0-4 (Auto, 1080/59.94p, 1080/50p, 1080/29.97Hz, 1080/25Hz, 1080/24Hz, 1080/23.98Hz, 720/59.94p, 720/50p)

- id: set_scaler_input
  label: Set Scaler Input
  kind: action
  params:
    - name: input
      type: integer
      description: 0-5 (Video input 1-6)
    - name: format
      type: integer
      description: 0=AUTO, 1=480p/59.94, 2=576p/50, 3=1080p/59.94, 4=1080p/50, 5=1080p/29.97, 6=1080p/25, 7=1080p/24, 8=1080p/23.98

- id: set_scaler_output
  label: Set Scaler Output
  kind: action
  params:
    - name: format
      type: integer
      description: 0=Auto, 1=480p/59.94, 2=576p/50, 3=720/59.94p, 4=720/50p, 5=1080/59.94p, 6=1080/50p, 7=1080/29.97p, 8=1080/25p, 9=1080/24p, 10=1080/23.98p, 11=2160/59.94p, 12=2160/50p

- id: set_output_fade
  label: Set Output Fade
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100 (0-100%)

- id: set_pgm_output
  label: Set PGM Output
  kind: action
  params:
    - name: output
      type: integer
      description: 0=Program out, 1=Multi view out

- id: set_pvw_output
  label: Set PVW Output
  kind: action
  params:
    - name: output
      type: integer
      description: 0=Program out, 1=Multi view out

- id: set_multiview_layout
  label: Set Multi-View Layout
  kind: action
  params:
    - name: layout
      type: integer
      description: 0=2 div, 1=3 div, 2=4 div, 3=5 div, 4=6 div

- id: switcher_initialize
  label: Switcher Initialize
  kind: action
  params: []

- id: switcher_reset
  label: Switcher Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: string
  description: Acknowledgement response on successful command reception

- id: err
  type: string
  description: Error response when command could not be processed

- id: ver_response
  type: object
  description: Model name and software version response
  properties:
    - name: model_name
      type: string
    - name: software_version
      type: string
```

## Variables
```yaml
# All controllable parameters are settable via set commands.
# UNRESOLVED: read-back state query mechanism not fully documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Commands use ASCII format: `set,<category>,<ID>,<Sub-ID>,<Value>[lf]`. LF = ASCII 0x0A. Commands common to both LAN and RS-232 interfaces. Wait for ACK before sending next command. Network password must be configured before connecting via LAN.
<!-- UNRESOLVED: password format and configuration method not documented -->
<!-- UNRESOLVED: flow control for RS-232 not specified -->
<!-- UNRESOLVED: firmware version not stated -->

## Provenance

```yaml
source_domains:
  - static.roland.com
retrieved_at: 2026-05-04T17:23:56.946Z
last_checked_at: 2026-05-05T05:41:50.750Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T05:41:50.750Z
matched_actions: 46
action_count: 46
confidence: high
summary: "All 46 spec actions match source commands with correct parameters; transport and command coverage verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
