---
spec_id: admin/sony-srxt615
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony SRXT615 Control Spec"
manufacturer: Sony
model_family: SRXT615
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - SRXT615
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.sony
source_urls:
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://pro.sony/s3/2018/07/05140342/Sony_Protocol-Manual_Supported-Command-List_1st-Edition.pdf
  - https://pro.sony/s3/cms-static-content/uploadfile/13/1237493517513.pdf
  - https://pro.sony/ue_US/products/laser-projectors/srx-t615
retrieved_at: 2026-08-10T22:44:53.290Z
last_checked_at: 2026-08-19T09:48:22.367Z
generated_at: 2026-08-19T09:48:22.367Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source doc = Sony VPL-* series ADCP command reference. SRXT615 NOT listed in source compatible-model columns. Model compatibility unverified — commands populated from source verbatim but SRXT615 support not confirmed by source."
  - "RS-232C serial parameters (baud/data_bits/parity/stop_bits) not stated in source."
  - "no auth/login procedure documented; assumed none."
  - "baud rate not stated in source"
  - "not stated in source"
  - "no additional settable variables outside the Actions catalog."
  - "source documents no unsolicited (push) notification mechanism."
  - "source (refined excerpt) contains no explicit safety warnings,"
  - "firmware version compatibility not stated in source"
  - "SRXT615 model compatibility not confirmed by source"
  - "RS-232C serial parameters not stated in source"
  - "protocol version (ADCP version) not stated beyond per-command \"version\":\"1.0\" info responses"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:48:22.367Z
  matched_actions: 244
  action_count: 244
  confidence: medium
  summary: "Every spec action has a wire-literal match in the source's ADCP command tables; transport port 53595 verbatim; coverage is essentially 1:1. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sony SRXT615 Control Spec

## Summary
Sony SRXT615 projector. Spec cover Sony ADCP control protocol. ADCP = ASCII command set over TCP (port 53595) plus RS-232C transport. Command catalog = system, menu (image/screen/function/operation/connection/install), remote-key emulation, expert advanced adjustment (warp, zone black level, panel align, gamma, color gamut, test pattern).

<!-- UNRESOLVED: source doc = Sony VPL-* series ADCP command reference. SRXT615 NOT listed in source compatible-model columns. Model compatibility unverified — commands populated from source verbatim but SRXT615 support not confirmed by source. -->
<!-- UNRESOLVED: RS-232C serial parameters (baud/data_bits/parity/stop_bits) not stated in source. -->
<!-- UNRESOLVED: no auth/login procedure documented; assumed none. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 53595  # ADCP TCP port stated in source (VPL-* network comm table)
serial:
  baud_rate: null    # UNRESOLVED: baud rate not stated in source
  data_bits: null    # UNRESOLVED: not stated in source
  parity: null       # UNRESOLVED: not stated in source
  stop_bits: null    # UNRESOLVED: not stated in source
  flow_control: null # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off commands present
  - queryable   # inferred: power_status/error/warning/timer/signal queries present
  - levelable   # inferred: volume/contrast/brightness/color numeric adjustments present
  - routable     # inferred: input terminal selection commands present
```

## Actions
```yaml
# ADCP syntax (verbatim from source):
#   sys_sel / menu_sel set : command "value"            -> ok"
#   sys_sel / menu_sel query: command ?                 -> "value""
#   range query            : command ? --range
#   info query             : command ? --info
#   menu_num set (direct)  : command <val>              -> ok"
#   menu_num set (relative): command --rel <val>        -> ok"
#   menu_num reset         : command --reset            -> ok"
#   menu_exec              : command                    -> ok"
#   key emulate            : key "<code>"               -> ok"
# Source examples carry a trailing " delimiter; payloads copied verbatim.

# ===== System commands (sys_sel) =====
- id: power
  label: Power On/Off
  kind: action
  command: 'power "{state}"'
  params:
    - name: state
      type: string
      enum: ["on", "off"]
      description: "on" = power on, "off" = power off

- id: ipv4_network_setting
  label: IPv4 Network Setting
  kind: action
  command: 'ipv4_network_setting "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["start", "apply"]
      description: '"start" begins setting, "apply" reflects setting'

- id: ipv4_set_method
  label: IPv4 Address Setting Method
  kind: action
  command: 'ipv4_set_method "{method}"'
  params:
    - name: method
      type: string
      enum: ["auto", "manual"]

# ===== System status queries (sys_stat) =====
- id: power_status_query
  label: Power Status Query
  kind: query
  command: 'power_status ?'
  params: []

- id: error_query
  label: Error Status Query
  kind: query
  command: 'error ?'
  params: []

- id: warning_query
  label: Warning Status Query
  kind: query
  command: 'warning ?'
  params: []

- id: timer_query
  label: Timer Query
  kind: query
  command: 'timer ?'
  params: []

- id: filter_status_query
  label: Filter Status Query
  kind: query
  command: 'filter_status ?'
  params: []

- id: modelname_query
  label: Model Name Query
  kind: query
  command: 'modelname ?'
  params: []

- id: serialnum_query
  label: Serial Number Query
  kind: query
  command: 'serialnum ?'
  params: []

- id: signal_query
  label: Input Signal Status Query
  kind: query
  command: 'signal ?'
  params: []

- id: mac_address_query
  label: MAC Address Query
  kind: query
  command: 'mac_address ?'
  params: []

- id: ipv6_set_method_query
  label: IPv6 Set Method Query
  kind: query
  command: 'ipv6_set_method ?'
  params: []

- id: ipv6_dns_set_method_query
  label: IPv6 DNS Set Method Query
  kind: query
  command: 'ipv6_dns_set_method ?'
  params: []

- id: ipv6_ip_address_query
  label: IPv6 IP Address Query
  kind: query
  command: 'ipv6_ip_address ?'
  params: []

- id: ipv6_default_gateway_query
  label: IPv6 Default Gateway Query
  kind: query
  command: 'ipv6_default_gateway ?'
  params: []

- id: ipv6_dns_server1_query
  label: IPv6 DNS1 Query
  kind: query
  command: 'ipv6_dns_server1 ?'
  params: []

- id: ipv6_dns_server2_query
  label: IPv6 DNS2 Query
  kind: query
  command: 'ipv6_dns_server2 ?'
  params: []

- id: ipv6_prefix_query
  label: IPv6 Prefix Query
  kind: query
  command: 'ipv6_prefix ?'
  params: []

# ===== System variable (sys_var) set/acquire =====
- id: ipv4_ip_address
  label: IPv4 IP Address Set/Get
  kind: action
  command: 'ipv4_ip_address "{address}"'
  params:
    - name: address
      type: string
      description: IPv4 address, e.g. "192.168.0.1"

- id: ipv4_sub_net_mask
  label: IPv4 Subnet Mask Set/Get
  kind: action
  command: 'ipv4_sub_net_mask "{mask}"'
  params:
    - name: mask
      type: string

- id: ipv4_default_gateway
  label: IPv4 Default Gateway Set/Get
  kind: action
  command: 'ipv4_default_gateway "{gateway}"'
  params:
    - name: gateway
      type: string

- id: ipv4_dns_server1
  label: IPv4 DNS1 Set/Get
  kind: action
  command: 'ipv4_dns_server1 "{address}"'
  params:
    - name: address
      type: string

- id: ipv4_dns_server2
  label: IPv4 DNS2 Set/Get
  kind: action
  command: 'ipv4_dns_server2 "{address}"'
  params:
    - name: address
      type: string

# ===== Input / remote-control function (menu_sel / menu_num) =====
- id: input_select
  label: Input Terminal Selection
  kind: action
  command: 'input "{terminal}"'
  params:
    - name: terminal
      type: string
      enum: ["video1", "svideo1", "rgb1", "rgb2", "dvi1", "hdmi1", "hdmi2", "network", "usb_a", "usb_b", "hdbaset1", "option1", "web_content"]
      description: Terminal names per source.

- id: blank
  label: Video Muting
  kind: action
  command: 'blank "{state}"'
  params:
    - name: state
      type: string
      enum: ["on", "off"]

- id: muting
  label: Audio Muting
  kind: action
  command: 'muting "{state}"'
  params:
    - name: state
      type: string
      enum: ["on", "off"]

- id: freeze
  label: Freeze (Screen Pause)
  kind: action
  command: 'freeze "{state}"'
  params:
    - name: state
      type: string
      enum: ["on", "off"]

- id: multi_screen
  label: Dual-Screen Mode
  kind: action
  command: 'multi_screen "{state}"'
  params:
    - name: state
      type: string
      enum: ["on", "off"]

# ===== Image quality setting =====
- id: picture_mode
  label: Picture Quality Mode
  kind: action
  command: 'picture_mode "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["dynamic", "standard", "brt_priority", "multi_screen", "presentation", "blackboard", "whiteboard", "cinema", "vivid", "srgb"]

- id: picture_mode_reset
  label: Picture Mode Reset
  kind: action
  command: 'picture_mode_reset'
  params: []

- id: contrast
  label: Contrast Adjustment
  kind: action
  command: 'contrast {value}'
  params:
    - name: value
      type: integer

- id: brightness
  label: Brightness Adjustment
  kind: action
  command: 'brightness {value}'
  params:
    - name: value
      type: integer

- id: color
  label: Color Depth Adjustment
  kind: action
  command: 'color {value}'
  params:
    - name: value
      type: integer

- id: hue
  label: Hue Adjustment
  kind: action
  command: 'hue {value}'
  params:
    - name: value
      type: integer

- id: sharpness
  label: Sharpness Adjustment
  kind: action
  command: 'sharpness {value}'
  params:
    - name: value
      type: integer

- id: color_temp
  label: Color Temperature Selection
  kind: action
  command: 'color_temp "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["9300K", "7500K", "6500K", "high", "mid", "mid2", "low", "brt_priority", "brt_priority2", "custom1", "custom2", "custom3", "custom4"]

- id: coltemp_gain_r
  label: Custom Color Temp Gain R
  kind: action
  command: 'coltemp_gain_r {value}'
  params:
    - { name: value, type: integer }

- id: coltemp_gain_g
  label: Custom Color Temp Gain G
  kind: action
  command: 'coltemp_gain_g {value}'
  params:
    - { name: value, type: integer }

- id: coltemp_gain_b
  label: Custom Color Temp Gain B
  kind: action
  command: 'coltemp_gain_b {value}'
  params:
    - { name: value, type: integer }

- id: coltemp_bias_r
  label: Custom Color Temp Bias R
  kind: action
  command: 'coltemp_bias_r {value}'
  params:
    - { name: value, type: integer }

- id: coltemp_bias_g
  label: Custom Color Temp Bias G
  kind: action
  command: 'coltemp_bias_g {value}'
  params:
    - { name: value, type: integer }

- id: coltemp_bias_b
  label: Custom Color Temp Bias B
  kind: action
  command: 'coltemp_bias_b {value}'
  params:
    - { name: value, type: integer }

- id: light_output_mode
  label: Light Source Mode
  kind: action
  command: 'light_output_mode "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["high", "mid", "low", "auto", "custom", "extended"]

- id: light_output_val
  label: Custom Light Output Value
  kind: action
  command: 'light_output_val {value}'
  params:
    - { name: value, type: integer }

- id: constant_brt
  label: Brightness Constant Mode
  kind: action
  command: 'constant_brt "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: light_output_dyn
  label: Light Source Dynamic Mode
  kind: action
  command: 'light_output_dyn "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: color_space
  label: Color Space Selection
  kind: action
  command: 'color_space "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["custom1", "custom2", "custom3", "custom4"]

- id: col_space_x
  label: Color Space Chromaticity X
  kind: action
  command: 'col_space_x --{channel} {value}'
  params:
    - { name: channel, type: string, enum: ["r", "g", "b"] }
    - { name: value, type: integer }

- id: col_space_y
  label: Color Space Chromaticity Y
  kind: action
  command: 'col_space_y --{channel} {value}'
  params:
    - { name: channel, type: string, enum: ["r", "g", "b"] }
    - { name: value, type: integer }

- id: gamma_correction
  label: Gamma Mode Selection
  kind: action
  command: 'gamma_correction "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["2.2", "2.4", "gamma3", "gamma4", "graphics1", "graphics2", "graphics3", "text", "dicom_sim"]

- id: film_mode
  label: Film Mode
  kind: action
  command: 'film_mode "{state}"'
  params:
    - { name: state, type: string, enum: ["auto", "off"] }

- id: real_cre
  label: Reality Creation
  kind: action
  command: 'real_cre "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: real_cre_reso
  label: Reality Creation Resolution
  kind: action
  command: 'real_cre_reso {value}'
  params:
    - { name: value, type: integer }

- id: real_cre_noise
  label: Reality Creation Noise Filtering
  kind: action
  command: 'real_cre_noise {value}'
  params:
    - { name: value, type: integer }

- id: contrast_enh
  label: Contrast Enhancer Effect
  kind: action
  command: 'contrast_enh "{mode}"'
  params:
    - { name: mode, type: string, enum: ["high", "mid", "low", "off"] }

- id: col_correction
  label: Color Correction
  kind: action
  command: 'col_correction "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: col_corr_hue
  label: Color Correction Hue
  kind: action
  command: 'col_corr_hue --{color} {value}'
  params:
    - { name: color, type: string, enum: ["r", "g", "b", "c", "y", "m"] }
    - { name: value, type: integer }

- id: col_corr_color
  label: Color Correction Color Depth
  kind: action
  command: 'col_corr_color --{color} {value}'
  params:
    - { name: color, type: string, enum: ["r", "g", "b", "c", "y", "m"] }
    - { name: value, type: integer }

- id: col_corr_brt
  label: Color Correction Brightness
  kind: action
  command: 'col_corr_brt --{color} {value}'
  params:
    - { name: color, type: string, enum: ["r", "g", "b", "c", "y", "m"] }
    - { name: value, type: integer }

# ===== Screen setting =====
- id: aspect
  label: Aspect Ratio
  kind: action
  command: 'aspect "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["4_3", "16_9", "full1", "full2", "full3", "normal", "full", "zoom"]

- id: v_center
  label: V Center Adjustment
  kind: action
  command: 'v_center {value}'
  params:
    - { name: value, type: integer }

- id: v_size
  label: V Size Adjustment
  kind: action
  command: 'v_size {value}'
  params:
    - { name: value, type: integer }

- id: overscan
  label: Overscan
  kind: action
  command: 'overscan "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: apa_exec
  label: APA Execution
  kind: action
  command: 'apa_exec'
  params: []

- id: pic_phase
  label: Video Phase Adjustment
  kind: action
  command: 'pic_phase {value}'
  params:
    - { name: value, type: integer }

- id: pic_pitch
  label: Video Pitch Adjustment
  kind: action
  command: 'pic_pitch {value}'
  params:
    - { name: value, type: integer }

- id: pic_shift_h
  label: Video Shift H Adjustment
  kind: action
  command: 'pic_shift_h {value}'
  params:
    - { name: value, type: integer }

- id: pic_shift_v
  label: Video Shift V Adjustment
  kind: action
  command: 'pic_shift_v {value}'
  params:
    - { name: value, type: integer }

# ===== Function setting =====
- id: volume
  label: Volume Adjustment
  kind: action
  command: 'volume {value}'
  params:
    - { name: value, type: integer }

- id: mic_volume
  label: Microphone Volume Adjustment
  kind: action
  command: 'mic_volume {value}'
  params:
    - { name: value, type: integer }

- id: speaker
  label: Speaker Selection
  kind: action
  command: 'speaker "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: speaker_setting
  label: Speaker Setting
  kind: action
  command: 'speaker_setting "{mode}"'
  params:
    - { name: mode, type: string, enum: ["sync_power", "always_on"] }

- id: smart_apa
  label: Smart APA
  kind: action
  command: 'smart_apa "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: cc_display
  label: CC Display Selection
  kind: action
  command: 'cc_display "{mode}"'
  params:
    - name: mode
      type: string
      enum: ["off", "cc1", "cc2", "cc3", "cc4", "text1", "text2", "text3", "text4"]

- id: background
  label: Background Selection
  kind: action
  command: 'background "{mode}"'
  params:
    - { name: mode, type: string, enum: ["blue", "black", "image", "web_content"] }

- id: startup_image
  label: Startup Screen
  kind: action
  command: 'startup_image "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: calibration_auto
  label: Auto Color Calibration
  kind: action
  command: 'calibration_auto "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: calibration_start
  label: Color Calibration Execute
  kind: action
  command: 'calibration_start'
  params: []

- id: calibration_return
  label: Color Calibration Return
  kind: action
  command: 'calibration_return'
  params: []

- id: calibration_reset
  label: Color Calibration Reset
  kind: action
  command: 'calibration_reset'
  params: []

# ===== Operation setting =====
- id: language
  label: Display Language
  kind: action
  command: 'language "{lang}"'
  params:
    - name: lang
      type: string
      enum: ["english", "dutch", "french", "italian", "german", "spanish", "portuguese", "greek", "turkish", "polish", "czech", "slovak", "romanian", "hungarian", "russian", "finnish", "swedish", "norwegian", "japanese", "chinese_s", "chinese_t", "korean", "thai", "vietnamese", "indonesian", "arabic", "persian"]

- id: menu_pos
  label: Menu Display Position
  kind: action
  command: 'menu_pos "{pos}"'
  params:
    - { name: pos, type: string, enum: ["bottom_left", "center"] }

- id: status_disp
  label: Screen Status Display
  kind: action
  command: 'status_disp "{mode}"'
  params:
    - { name: mode, type: string, enum: ["on", "all_off"] }

- id: ir_receiver
  label: Remote IR Receiver
  kind: action
  command: 'ir_receiver "{mode}"'
  params:
    - { name: mode, type: string, enum: ["front_rear", "front", "rear"] }

- id: remote_id
  label: Remote Control ID
  kind: action
  command: 'remote_id "{id}"'
  params:
    - { name: id, type: string, enum: ["all", "1", "2", "3", "4"] }

- id: controlkey_lock
  label: Control Key Lock
  kind: action
  command: 'controlkey_lock "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: lens_lock
  label: Lens Control Lock
  kind: action
  command: 'lens_lock "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

# ===== Connection / power setting =====
- id: hdbt_lan_mode
  label: HDBaseT/LAN Port Mode
  kind: action
  command: 'hdbt_lan_mode "{mode}"'
  params:
    - { name: mode, type: string, enum: ["hdbt", "lan"] }

- id: hdbt_lan_term
  label: HDBT LAN Terminal Setting
  kind: action
  command: 'hdbt_lan_term "{mode}"'
  params:
    - { name: mode, type: string, enum: ["via_hdbt", "lan"] }

- id: hdbt_232c_term
  label: HDBT/RS-232C Setting
  kind: action
  command: 'hdbt_232c_term "{mode}"'
  params:
    - { name: mode, type: string, enum: ["via_hdbt", "232c"] }

- id: signal_sel
  label: Signal Type Selection
  kind: action
  command: 'signal_sel --{terminal} "{type}"'
  params:
    - { name: terminal, type: string, description: "input terminal suffix, e.g. rgb1" }
    - { name: type, type: string, enum: ["auto", "computer", "video_gbr", "component"] }

- id: web_content
  label: Web Content Setting
  kind: action
  command: 'web_content "{source}"'
  params:
    - { name: source, type: string, enum: ["usb", "network"] }

- id: color_sys
  label: Color System Selection
  kind: action
  command: 'color_sys "{sys}"'
  params:
    - { name: sys, type: string, enum: ["auto", "ntsc358", "pal", "secam", "ntsc443", "pal_m", "pal_n"] }

- id: powsave_nosig
  label: Auto Power Saving (No Signal)
  kind: action
  command: 'powsave_nosig "{mode}"'
  params:
    - { name: mode, type: string, enum: ["lampoff", "sleep", "standby"] }

- id: powsave_statsig
  label: Auto Power Saving (Invariable Signal)
  kind: action
  command: 'powsave_statsig "{mode}"'
  params:
    - { name: mode, type: string, enum: ["dimming", "off"] }

- id: powsave_dim_time
  label: Power Saving Dimming Time
  kind: action
  command: 'powsave_dim_time "{time}"'
  params:
    - { name: time, type: string, enum: ["5min", "10min", "15min", "20min", "demo"] }

- id: standby_mode
  label: Standby Mode
  kind: action
  command: 'standby_mode "{mode}"'
  params:
    - { name: mode, type: string, enum: ["standard", "low"] }

- id: instant_on
  label: Instant-On Setting
  kind: action
  command: 'instant_on "{mode}"'
  params:
    - { name: mode, type: string, enum: ["off", "10min", "30min"] }

- id: direct_powon
  label: Direct Power On
  kind: action
  command: 'direct_powon "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: dynamic_range
  label: Digital Input Dynamic Range
  kind: action
  command: 'dynamic_range --{terminal} "{range}"'
  params:
    - { name: terminal, type: string, description: "terminal suffix e.g. dvi1/hdmi1/hdbaset1/option1" }
    - { name: range, type: string, enum: ["auto", "limited", "full"] }

- id: digital_cable
  label: Digital Long Cable Setting
  kind: action
  command: 'digital_cable --{terminal} "{mode}"'
  params:
    - { name: terminal, type: string, description: "terminal suffix, e.g. hdmi1" }
    - { name: mode, type: string, enum: ["normal", "long"] }

# ===== Installation setting =====
- id: v_keystone_mode
  label: V Keystone Mode
  kind: action
  command: 'v_keystone_mode "{mode}"'
  params:
    - { name: mode, type: string, enum: ["auto", "manual"] }

- id: v_keystone
  label: V Keystone Adjustment
  kind: action
  command: 'v_keystone {value}'
  params:
    - { name: value, type: integer }

- id: h_keystone
  label: H Keystone Adjustment
  kind: action
  command: 'h_keystone {value}'
  params:
    - { name: value, type: integer }

- id: v_linearity
  label: V Linearity Adjustment
  kind: action
  command: 'v_linearity {value}'
  params:
    - { name: value, type: integer }

- id: h_linearity
  label: H Linearity Adjustment
  kind: action
  command: 'h_linearity {value}'
  params:
    - { name: value, type: integer }

- id: corner_keystone_v
  label: Corner Keystone V Coordinate
  kind: action
  command: 'corner_keystone_v --{point} {value}'
  params:
    - name: point
      type: string
      enum: ["top_left", "top_center", "top_right", "center_left", "center_right", "bottom_left", "bottom_center", "bottom_right"]
    - { name: value, type: integer }

- id: corner_keystone_h
  label: Corner Keystone H Coordinate
  kind: action
  command: 'corner_keystone_h --{point} {value}'
  params:
    - name: point
      type: string
      enum: ["top_left", "top_center", "top_right", "center_left", "center_right", "bottom_left", "bottom_center", "bottom_right"]
    - { name: value, type: integer }

- id: screen_fitting_reset
  label: Screen Fit Adjustment Reset
  kind: action
  command: 'screen_fitting_reset'
  params: []

- id: image_split
  label: Image Split
  kind: action
  command: 'image_split "{mode}"'
  params:
    - { name: mode, type: string, enum: ["off", "left", "right"] }

- id: image_flip
  label: Image Flip
  kind: action
  command: 'image_flip "{mode}"'
  params:
    - { name: mode, type: string, enum: ["hv", "h", "v", "auto"] }

- id: install_attitude
  label: Install Attitude
  kind: action
  command: 'install_attitude "{mode}"'
  params:
    - { name: mode, type: string, enum: ["link_imgflip", "rightsideup", "upsidedown", "frontup", "frontdown", "portrait1", "portrait2"] }

- id: screen_aspect
  label: Screen Aspect
  kind: action
  command: 'screen_aspect "{ratio}"'
  params:
    - { name: ratio, type: string, enum: ["16_10", "16_9", "4_3"] }

- id: blanking
  label: Blanking Adjustment
  kind: action
  command: 'blanking --{position} {value}'
  params:
    - { name: position, type: string, enum: ["top", "bottom", "left", "right"] }
    - { name: value, type: integer }

- id: color_matching_brt
  label: Color Matching Brightness
  kind: action
  command: 'color_matching_brt --{level} {value}'
  params:
    - { name: level, type: string, enum: ["lev1", "lev2", "lev3", "lev4", "lev5", "lev6"] }
    - { name: value, type: integer }

- id: color_matching_r
  label: Color Matching R
  kind: action
  command: 'color_matching_r --{level} {value}'
  params:
    - { name: level, type: string, enum: ["lev1", "lev2", "lev3", "lev4", "lev5", "lev6"] }
    - { name: value, type: integer }

- id: color_matching_b
  label: Color Matching B
  kind: action
  command: 'color_matching_b --{level} {value}'
  params:
    - { name: level, type: string, enum: ["lev1", "lev2", "lev3", "lev4", "lev5", "lev6"] }
    - { name: value, type: integer }

- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: 'color_matching_reset'
  params: []

- id: panel_align_shift_adj_r
  label: Panel Alignment Shift R
  kind: action
  command: 'panel_align_shift_adj_r --{axis} {value}'
  params:
    - { name: axis, type: string, enum: ["h", "v"] }
    - { name: value, type: integer }

- id: panel_align_shift_adj_b
  label: Panel Alignment Shift B
  kind: action
  command: 'panel_align_shift_adj_b --{axis} {value}'
  params:
    - { name: axis, type: string, enum: ["h", "v"] }
    - { name: value, type: integer }

- id: panel_align_pattern
  label: Panel Alignment Pattern Color
  kind: action
  command: 'panel_align_pattern "{color}"'
  params:
    - { name: color, type: string, enum: ["rgb", "rg", "bg"] }

- id: panel_alignment
  label: Panel Alignment On/Off
  kind: action
  command: 'panel_alignment "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: panel_align_reset
  label: Panel Alignment Reset
  kind: action
  command: 'panel_align_reset'
  params: []

- id: blend_sw
  label: Blending Adjustment On/Off
  kind: action
  command: 'blend_sw --{position} "{state}"'
  params:
    - { name: position, type: string, enum: ["top", "bottom", "left", "right"] }
    - { name: state, type: string, enum: ["on", "off"] }

- id: blend_start
  label: Blending Start Position
  kind: action
  command: 'blend_start --{position} {value}'
  params:
    - { name: position, type: string, enum: ["top", "bottom", "left", "right"] }
    - { name: value, type: integer }

- id: blend_width
  label: Blending Width
  kind: action
  command: 'blend_width --{position} {value}'
  params:
    - { name: position, type: string, enum: ["top", "bottom", "left", "right"] }
    - { name: value, type: integer }

- id: blend_bk_level_r
  label: Blending Black Level R Offset
  kind: action
  command: 'blend_bk_level_r --pos{pos} {value}'
  params:
    - { name: pos, type: integer, description: "1..9" }
    - { name: value, type: integer }

- id: blend_bk_level_g
  label: Blending Black Level G Offset
  kind: action
  command: 'blend_bk_level_g --pos{pos} {value}'
  params:
    - { name: pos, type: integer, description: "1..9" }
    - { name: value, type: integer }

- id: blend_bk_level_b
  label: Blending Black Level B Offset
  kind: action
  command: 'blend_bk_level_b --pos{pos} {value}'
  params:
    - { name: pos, type: integer, description: "1..9" }
    - { name: value, type: integer }

- id: blend_bk_level_reset
  label: Blending Black Level Reset
  kind: action
  command: 'blend_bk_level_reset'
  params: []

- id: blend_reset
  label: Blending Adjustment Reset
  kind: action
  command: 'blend_reset'
  params: []

- id: blend_cursor
  label: Blending Cursor Display
  kind: action
  command: 'blend_cursor "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: blend_cursor_color
  label: Blending Cursor Color
  kind: action
  command: 'blend_cursor_color --{portion} "{color}"'
  params:
    - { name: portion, type: string, description: "marker portion e.g. start" }
    - { name: color, type: string, enum: ["r", "g", "b", "c", "m", "y"] }

- id: pic_pos_save
  label: Lens Position Memory Save
  kind: action
  command: 'pic_pos_save "{memory}"'
  params:
    - { name: memory, type: string, enum: ["custom1", "custom2", "custom3", "custom4", "custom5", "custom6"] }

- id: pic_pos_del
  label: Lens Position Memory Delete
  kind: action
  command: 'pic_pos_del "{memory}"'
  params:
    - { name: memory, type: string, enum: ["custom1", "custom2", "custom3", "custom4", "custom5", "custom6"] }

- id: pic_pos_sel
  label: Lens Position Memory Select
  kind: action
  command: 'pic_pos_sel "{memory}"'
  params:
    - { name: memory, type: string, enum: ["custom1", "custom2", "custom3", "custom4", "custom5", "custom6"] }

- id: high_alt_mode
  label: High Altitude Mode
  kind: action
  command: 'high_alt_mode "{mode}"'
  params:
    - { name: mode, type: string, enum: ["on", "off", "auto"] }

- id: filter_cleaning
  label: Filter Cleaning Execute (power off)
  kind: action
  command: 'filter_cleaning'
  params: []

- id: filter_box
  label: Filter Box Selection
  kind: action
  command: 'filter_box "{state}"'
  params:
    - { name: state, type: string, enum: ["installed", "not_installed"] }

# ===== Remote controller key emulation (key "<code>") =====
- { id: key_power_on,         label: "Key Power ON",            kind: action, command: 'key "power_on"',         params: [] }
- { id: key_power_off,        label: "Key Power OFF",           kind: action, command: 'key "power_off"',        params: [] }
- { id: key_power,            label: "Key Power Toggle",        kind: action, command: 'key "power"',            params: [] }
- { id: key_video,            label: "Key Video",               kind: action, command: 'key "video"',            params: [] }
- { id: key_s_video,          label: "Key S Video",             kind: action, command: 'key "s_video"',          params: [] }
- { id: key_input_a,          label: "Key Input A",             kind: action, command: 'key "input_a"',          params: [] }
- { id: key_input_b,          label: "Key Input B",             kind: action, command: 'key "input_b"',          params: [] }
- { id: key_input_c,          label: "Key Input C",             kind: action, command: 'key "input_c"',          params: [] }
- { id: key_input_d,          label: "Key Input D",             kind: action, command: 'key "input_d"',          params: [] }
- { id: key_input_e,          label: "Key Input E",             kind: action, command: 'key "input_e"',          params: [] }
- { id: key_input_f,          label: "Key Input F",             kind: action, command: 'key "input_f"',          params: [] }
- { id: key_input_g,          label: "Key Input G",             kind: action, command: 'key "input_g"',          params: [] }
- { id: key_input_h,          label: "Key Input H",             kind: action, command: 'key "input_h"',          params: [] }
- { id: key_input,            label: "Key Input Toggle",        kind: action, command: 'key "input"',            params: [] }
- { id: key_blank,            label: "Key Video Muting",        kind: action, command: 'key "blank"',            params: [] }
- { id: key_muting,           label: "Key Audio Muting",        kind: action, command: 'key "muting"',           params: [] }
- { id: key_vol_up,           label: "Key Volume +",            kind: action, command: 'key "vol+"',             params: [] }
- { id: key_vol_down,         label: "Key Volume -",            kind: action, command: 'key "vol_"',             params: [] }
- { id: key_menu,             label: "Key Menu",                kind: action, command: 'key "menu"',             params: [] }
- { id: key_right,            label: "Key Cursor Right",        kind: action, command: 'key "right"',            params: [] }
- { id: key_left,             label: "Key Cursor Left",         kind: action, command: 'key "left"',             params: [] }
- { id: key_up,               label: "Key Cursor Up",           kind: action, command: 'key "up"',               params: [] }
- { id: key_down,             label: "Key Cursor Down",         kind: action, command: 'key "down"',             params: [] }
- { id: key_enter,            label: "Key Enter",               kind: action, command: 'key "enter"',            params: [] }
- { id: key_reset,            label: "Key Reset",               kind: action, command: 'key "reset"',            params: [] }
- { id: key_return,           label: "Key Return",              kind: action, command: 'key "return"',           params: [] }
- { id: key_picmode1,         label: "Key Picture Mode Dynamic",kind: action, command: 'key "picmode1"',         params: [] }
- { id: key_picmode2,         label: "Key Picture Mode Standard",kind: action, command: 'key "picmode2"',        params: [] }
- { id: key_picmode3,         label: "Key Picture Mode Luminance/Presentation", kind: action, command: 'key "picmode3"', params: [] }
- { id: key_picmode4,         label: "Key Picture Mode Multi-screen/Blackboard", kind: action, command: 'key "picmode4"', params: [] }
- { id: key_picmode5,         label: "Key Picture Mode Whiteboard/Game/sRGB", kind: action, command: 'key "picmode5"', params: [] }
- { id: key_picmode6,         label: "Key Picture Mode Cinema", kind: action, command: 'key "picmode6"',         params: [] }
- { id: key_picmode,          label: "Key Picture Mode Toggle", kind: action, command: 'key "picmode"',          params: [] }
- { id: key_picture_up,       label: "Key Contrast +",          kind: action, command: 'key "picture+"',         params: [] }
- { id: key_picture_down,     label: "Key Contrast -",          kind: action, command: 'key "picture_"',         params: [] }
- { id: key_color_up,         label: "Key Color Depth +",       kind: action, command: 'key "color+"',           params: [] }
- { id: key_color_down,       label: "Key Color Depth -",       kind: action, command: 'key "color_"',           params: [] }
- { id: key_bright_up,        label: "Key Brightness +",        kind: action, command: 'key "bright+"',          params: [] }
- { id: key_bright_down,      label: "Key Brightness -",        kind: action, command: 'key "bright_"',          params: [] }
- { id: key_hue_up,           label: "Key Hue +",               kind: action, command: 'key "hue+"',             params: [] }
- { id: key_hue_down,         label: "Key Hue -",               kind: action, command: 'key "hue_"',             params: [] }
- { id: key_sharpness_up,     label: "Key Sharpness +",         kind: action, command: 'key "sharpness+"',       params: [] }
- { id: key_sharpness_down,   label: "Key Sharpness -",         kind: action, command: 'key "sharpness_"',       params: [] }
- { id: key_picture_adj,      label: "Key Picture Adj Toggle",  kind: action, command: 'key "picture_adj"',      params: [] }
- { id: key_color_temp,       label: "Key Color Temp Toggle",   kind: action, command: 'key "color_temp"',       params: [] }
- { id: key_color_mode,       label: "Key Color Space Toggle",  kind: action, command: 'key "color_mode"',       params: [] }
- { id: key_black_level,      label: "Key Contrast Enhancer Toggle", kind: action, command: 'key "black_level"', params: [] }
- { id: key_aspect,           label: "Key Aspect",              kind: action, command: 'key "aspect"',           params: [] }
- { id: key_apa,              label: "Key APA",                 kind: action, command: 'key "apa"',              params: [] }
- { id: key_phase,            label: "Key Phase",               kind: action, command: 'key "phase"',            params: [] }
- { id: key_video_size,       label: "Key Pitch",               kind: action, command: 'key "video_size"',       params: [] }
- { id: key_video_shift,      label: "Key Shift",               kind: action, command: 'key "video_shift"',      params: [] }
- { id: key_status_on,        label: "Key OSD On",              kind: action, command: 'key "status_on"',        params: [] }
- { id: key_status_off,       label: "Key OSD Off",             kind: action, command: 'key "status_off"',       params: [] }
- { id: key_lens_control,     label: "Key Lens Toggle",         kind: action, command: 'key "lens_control"',     params: [] }
- { id: key_lens_focus,       label: "Key Lens Focus",          kind: action, command: 'key "lens_focus"',       params: [] }
- { id: key_lens_focus_far,   label: "Key Lens Focus Far",      kind: action, command: 'key "lens_focus_far"',   params: [] }
- { id: key_lens_focus_near,  label: "Key Lens Focus Near",     kind: action, command: 'key "lens_focus_near"',  params: [] }
- { id: key_lens_zoom,        label: "Key Lens Zoom",           kind: action, command: 'key "lens_zoom"',        params: [] }
- { id: key_lens_zoom_up,     label: "Key Lens Zoom +",         kind: action, command: 'key "lens_zoom_up"',     params: [] }
- { id: key_lens_zoom_down,   label: "Key Lens Zoom -",         kind: action, command: 'key "lens_zoom_down"',   params: [] }
- { id: key_lens_shift,       label: "Key Lens Shift",          kind: action, command: 'key "lens_shift"',       params: [] }
- { id: key_lens_shift_up,    label: "Key Lens Shift Up",       kind: action, command: 'key "lens_shift_up"',    params: [] }
- { id: key_lens_shift_down,  label: "Key Lens Shift Down",     kind: action, command: 'key "lens_shift_down"',  params: [] }
- { id: key_lens_shift_left,  label: "Key Lens Shift Left",     kind: action, command: 'key "lens_shift_left"',  params: [] }
- { id: key_lens_shift_right, label: "Key Lens Shift Right",    kind: action, command: 'key "lens_shift_right"', params: [] }
- { id: key_twin,             label: "Key TWIN",                kind: action, command: 'key "twin"',             params: [] }
- { id: key_freeze,           label: "Key Freeze",              kind: action, command: 'key "freeze"',           params: [] }
- { id: key_d_zoom_up,        label: "Key Digital Zoom +",      kind: action, command: 'key "d_zoom+"',          params: [] }
- { id: key_d_zoom_down,      label: "Key Digital Zoom -",      kind: action, command: 'key "d_zoom_"',          params: [] }
- { id: key_keystone,         label: "Key Keystone",            kind: action, command: 'key "keystone"',         params: [] }
- { id: key_keystone_up,      label: "Key V Keystone +",        kind: action, command: 'key "keystone+"',        params: [] }
- { id: key_keystone_down,    label: "Key V Keystone -",        kind: action, command: 'key "keystone_"',        params: [] }
- { id: key_pattern,          label: "Key Test Pattern",        kind: action, command: 'key "pattern"',          params: [] }
- { id: key_eco,              label: "Key ECO Mode",            kind: action, command: 'key "eco"',              params: [] }
- { id: key_lens_position,    label: "Key Lens Position",       kind: action, command: 'key "lens_position"',    params: [] }

# ===== Advanced adjustment (expert) =====
- id: warp
  label: Warp Adjustment
  kind: action
  command: 'warp [1,2] --pos=[1,2,3,4] --ch=w'
  params:
    - { name: value, type: string, description: "JSON array [x,y] direct, or --rel=[x,y] relative, or table [[x,y],...]" }
    - { name: pos, type: string, description: "adjustment point range [x1,y1,x2,y2]" }
    - { name: ch, type: string, enum: ["w"] }
  notes: "Apply with 'warp --apply'. Reset: 'warp --reset --pos=[..] --ch=w'. Query: 'warp ? --pos=[..] --ch=w'."

- id: warp_apply
  label: Warp Reflect
  kind: action
  command: 'warp --apply'
  params: []

- id: warp_reset
  label: Warp Reset
  kind: action
  command: 'warp --reset --pos=[1,1,64,40] --ch=w'
  params: []

- id: warp_query
  label: Warp Value Query
  kind: query
  command: 'warp ? --pos=[1,1,3,3] --ch=w'
  params: []

- id: area_bk_level
  label: Zone Black Level / Zone Fitting Adjustment
  kind: action
  command: 'area_bk_level [100,-50] --pos=[0,1,2,3] --ch=w'
  params:
    - { name: value, type: string, description: "direct [x,y], --rel=[x,y], or table" }
    - { name: pos, type: string }
    - { name: ch, type: string, enum: ["w"] }
  notes: "Apply: 'area_bk_level --apply'. Reset: 'area_bk_level --reset --pos=[..] --ch=w'."

- id: area_bk_level_apply
  label: Zone Black Level Reflect
  kind: action
  command: 'area_bk_level --apply'
  params: []

- id: area_bk_level_reset
  label: Zone Black Level Reset
  kind: action
  command: 'area_bk_level --reset --pos=[0,0,3,3] --ch=w'
  params: []

- id: area_bk_level_query
  label: Zone Black Level Query
  kind: query
  command: 'area_bk_level ? --pos=[1,1,3,3] --ch=w'
  params: []

- id: panel_align_zone
  label: Panel Alignment Zone Adjustment
  kind: action
  command: 'panel_align_zone [1,2] --pos=[1,2,3,4] --ch=r'
  params:
    - { name: value, type: string }
    - { name: pos, type: string }
    - { name: ch, type: string, enum: ["r", "b"] }
  notes: "Apply: 'panel_align_zone --apply'. Reset: 'panel_align_zone --reset --pos=[1,1,16,10] --ch=r'."

- id: panel_align_zone_apply
  label: Panel Alignment Zone Reflect
  kind: action
  command: 'panel_align_zone --apply'
  params: []

- id: panel_align_zone_reset
  label: Panel Alignment Zone Reset
  kind: action
  command: 'panel_align_zone --reset --pos=[1,1,16,10] --ch=r'
  params: []

- id: panel_align_zone_query
  label: Panel Alignment Zone Query
  kind: query
  command: 'panel_align_zone ? --pos=[1,1,3,3] --ch=r'
  params: []

- id: user_gamma
  label: User Gamma Curve Adjustment
  kind: action
  command: 'user_gamma 0 --sel=gamma3 --pos=[0,63] --ch=r'
  params:
    - { name: value, type: string, description: "scalar, --rel=N, or table [..]" }
    - { name: sel, type: string, enum: ["2.2", "2.4", "gamma3", "gamma4", "dicom"] }
    - { name: pos, type: string, description: "[min,max] 0..63" }
    - { name: ch, type: string, enum: ["r", "g", "b"] }
  notes: "Apply: 'user_gamma --apply'. Reset: 'user_gamma --reset --sel=.. --pos=[..] --ch=..'."

- id: user_gamma_apply
  label: User Gamma Reflect
  kind: action
  command: 'user_gamma --apply'
  params: []

- id: user_gamma_reset
  label: User Gamma Reset
  kind: action
  command: 'user_gamma --reset --sel=gamma3 --pos=[0,63] --ch=r'
  params: []

- id: user_gamma_query
  label: User Gamma Query
  kind: query
  command: 'user_gamma ? --sel=gamma3 --pos=[0,4] --ch=r'
  params: []

- id: color_gamut_query
  label: Color Gamut Query
  kind: query
  command: 'color_gamut ? --sel=custom1'
  params:
    - { name: sel, type: string, enum: ["original", "custom1", "custom2", "custom3"] }

# ===== Test pattern (pattern_sel / pattern_pos) =====
- id: pat_blend_cursor
  label: Blending Adjustment Cursor Pattern
  kind: action
  command: 'pat_blend_cursor --{position} "{state}"'
  params:
    - { name: position, type: string, enum: ["top", "bottom", "left", "right"] }
    - { name: state, type: string, enum: ["on", "off"] }

- id: pat_color_space
  label: Color Space Flat Field Pattern
  kind: action
  command: 'pat_color_space "{color}"'
  params:
    - { name: color, type: string, enum: ["r", "g", "b", "w", "off"] }

- id: pat_warp_cursor
  label: Warp Adjustment Cursor Pattern
  kind: action
  command: 'pat_warp_cursor "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: pat_panel_align_zone_cursor
  label: Panel Alignment Zone Cursor Pattern
  kind: action
  command: 'pat_panel_align_zone_cursor "{color}"'
  params:
    - { name: color, type: string, enum: ["rg", "bg", "rgb", "off"] }

- id: pat_area_bk_level_cursor
  label: Zone Black Level Cursor Pattern
  kind: action
  command: 'pat_area_bk_level_cursor "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: pat_warp_cross_hatch
  label: Warp Crosshatch Pattern
  kind: action
  command: 'pat_warp_cross_hatch "{color}"'
  params:
    - { name: color, type: string, enum: ["r", "g", "b", "w", "g_inv", "off"] }

- id: pat_color_matching
  label: Color Matching Flat Field Pattern
  kind: action
  command: 'pat_color_matching "{level}"'
  params:
    - { name: level, type: string, enum: ["lev1", "lev2", "lev3", "lev4", "lev5", "lev6", "off"] }

- id: pat_area_bk_level
  label: Zone Black Level Flat Field Pattern
  kind: action
  command: 'pat_area_bk_level "{state}"'
  params:
    - { name: state, type: string, enum: ["on", "off"] }

- id: pat_warp_cursor_pos
  label: Warp Cursor Position
  kind: action
  command: 'pat_warp_cursor [{x},{y}]'
  params:
    - { name: x, type: integer }
    - { name: y, type: integer }

- id: pat_panel_align_zone_cursor_pos
  label: Panel Alignment Zone Cursor Position
  kind: action
  command: 'pat_panel_align_zone_cursor_pos [{x},{y}]'
  params:
    - { name: x, type: integer }
    - { name: y, type: integer }

- id: pat_area_bk_level_cursor_pos
  label: Zone Black Level Cursor Position
  kind: action
  command: 'pat_area_bk_level_cursor_pos [{x},{y}]'
  params:
    - { name: x, type: integer }
    - { name: y, type: integer }
```

## Feedbacks
```yaml
# Observable query-response states documented in source.
- id: power_state
  type: enum
  values: ["standby", "startup", "on", "cooling1", "cooling2", "saving_cooling1", "saving_cooling2", "saving_standby", "update"]
  query: 'power_status ?'

- id: error_state
  type: enum_array
  values: ["no_err", "err_power", "err_power2", "err_system2", "err_cover", "err_light_src", "err_lens_cover", "err_shock", "err_nolens", "err_attitude", "err_temp", "err_fan", "err_wheel", "err_light_over", "err_assy", "err_lens_shift", "err_shutter"]
  query: 'error ?'

- id: warning_state
  type: enum_array
  values: ["no_warn", "warn_light_src_life", "warn_highland", "warn_temp", "warn_signal_freq", "warn_signal_sel"]
  query: 'warning ?'

- id: timer_values
  type: object_array
  description: "JSON object array of operation/light_src/prev_light_src timer values"
  query: 'timer ?'

- id: filter_status
  type: enum
  values: ["normal", "clean", "replace", "cleanup_step1", "cleanup_step2"]
  query: 'filter_status ?'

- id: input_signal
  type: enum
  values: ["Video60", "Video50", "480_60i", "576/50i", "480/60p", "576/50p", "1080/60i", "1080/50i", "1080/24psF", "720/60p", "720/50P", "1080/60p", "1080/50p", "1080/24p", "1080/30p", "640x350", "640x400", "640x480", "800x600", "832x624", "1024x768", "1152x864", "1152x900", "1280x960", "1280x1024", "1400x1050", "1600x1200", "1280x768", "1280x720", "1920x1080", "1920x1200", "1366x768", "1440x900", "1680x1050", "1280x800", "1600x900", "Invalid"]
  query: 'signal ?'

- id: model_name
  type: string
  query: 'modelname ?'

- id: serial_number
  type: string
  query: 'serialnum ?'

- id: mac_address
  type: string
  query: 'mac_address ?'
```

## Variables
```yaml
# Settable continuous parameters are represented as Actions (menu_num / sys_var) above.
# UNRESOLVED: no additional settable variables outside the Actions catalog.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited (push) notification mechanism.
# All status acquisition is poll-based via sys_stat queries.
```

## Macros
```yaml
# IPv4 manual network config - explicit multi-step sequence documented in source.
- id: ipv4_manual_config
  label: IPv4 Manual Network Configuration
  steps:
    - 'ipv4_network_setting "start"'
    - 'ipv4_set_method "manual"'
    - 'ipv4_ip_address "{ip}"'
    - 'ipv4_sub_net_mask "{mask}"'
    - 'ipv4_default_gateway "{gateway}"'
    - 'ipv4_dns_server1 "{dns1}"'
    - 'ipv4_dns_server2 "{dns2}"'
    - 'ipv4_network_setting "apply"'

# Advanced adjustment workflow (warp / area_bk_level / panel_align_zone / user_gamma):
# transmit value(s) -> apply -> (optional query). Documented uniformly in source.
- id: advanced_adjust_workflow
  label: Advanced Adjustment Reflect Workflow
  steps:
    - '<cmd> <value> --pos=[..] --ch=..'   # transmit
    - '<cmd> --apply'                        # reflect on screen
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source (refined excerpt) contains no explicit safety warnings,
# interlock procedures, or power-on sequencing requirements. Never inferred.
```

## Notes
Source = Sony VPL-* series ADCP command reference (DATA PROJECTOR). ADCP = Sony ASCII control protocol. Command families: sys_sel/sys_stat/sys_var (system), menu_sel/menu_num/menu_exec (menu), key (remote emulation), warp/area_bk_level/panel_align_zone/user_gamma/color_gamut/pattern_sel/pattern_pos (expert).

Model caveat: SRXT615 NOT in source compatible-model columns (source lists VPL-FHZ120/FHZ90/F1200/F900, FHZ60/FHZ50/FWZ60/F630HZ/F530HZ/F430HZ/F630WZ/F530WZ, FH60/FW60/F530H/F630H/F630W/F530W, FHZ700/F700HZ, FH30/F400H/F500H, C300, E200, E300, E400/E500, S200, S600, P10/P500, U300). Commands likely apply if SRXT615 speaks ADCP, but compat unverified.

Transport caveat: ADCP TCP port 53595 taken from VPL-* network tables (consistent across all listed series groups). RS-232C control routing documented (hdbt_232c_term) but serial line params absent.

Syntax: source examples carry a trailing `"` delimiter (e.g. `ok"`, `"standby""`); command templates above use clean ADCP form. Suffix-form commands (signal_sel, dynamic_range, digital_cable, corner_keystone_*, blend_*, color_matching_*, col_space_*, col_corr_*) take a `--<suffix>` selector per source.

Some commands marked per-model with asterisks in source ("some models not provided with the function") — per-command availability on SRXT615 unverified.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: SRXT615 model compatibility not confirmed by source -->
<!-- UNRESOLVED: RS-232C serial parameters not stated in source -->
<!-- UNRESOLVED: protocol version (ADCP version) not stated beyond per-command "version":"1.0" info responses -->

## Provenance

```yaml
source_domains:
  - pro.sony
source_urls:
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://pro.sony/s3/2018/07/05140342/Sony_Protocol-Manual_Supported-Command-List_1st-Edition.pdf
  - https://pro.sony/s3/cms-static-content/uploadfile/13/1237493517513.pdf
  - https://pro.sony/ue_US/products/laser-projectors/srx-t615
retrieved_at: 2026-08-10T22:44:53.290Z
last_checked_at: 2026-08-19T09:48:22.367Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:48:22.367Z
matched_actions: 244
action_count: 244
confidence: medium
summary: "Every spec action has a wire-literal match in the source's ADCP command tables; transport port 53595 verbatim; coverage is essentially 1:1. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source doc = Sony VPL-* series ADCP command reference. SRXT615 NOT listed in source compatible-model columns. Model compatibility unverified — commands populated from source verbatim but SRXT615 support not confirmed by source."
- "RS-232C serial parameters (baud/data_bits/parity/stop_bits) not stated in source."
- "no auth/login procedure documented; assumed none."
- "baud rate not stated in source"
- "not stated in source"
- "no additional settable variables outside the Actions catalog."
- "source documents no unsolicited (push) notification mechanism."
- "source (refined excerpt) contains no explicit safety warnings,"
- "firmware version compatibility not stated in source"
- "SRXT615 model compatibility not confirmed by source"
- "RS-232C serial parameters not stated in source"
- "protocol version (ADCP version) not stated beyond per-command \"version\":\"1.0\" info responses"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
