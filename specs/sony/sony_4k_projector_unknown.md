---
spec_id: admin/sony-4k-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony 4K Projector Control Spec"
manufacturer: Sony
model_family: VPL-FHZ120
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-FHZ120
    - VPL-FHZ90
    - VPL-F1200
    - VPL-F900
    - VPL-FHZ60
    - VPL-FHZ50
    - VPL-FWZ60
    - VPL-F630HZ
    - VPL-F530HZ
    - VPL-F430HZ
    - VPL-F630WZ
    - VPL-F530WZ
    - VPL-FH60
    - VPL-FW60
    - VPL-F530H
    - VPL-F630H
    - VPL-F630W
    - VPL-F530W
    - VPL-FHZ700
    - VPL-F700HZ
    - VPL-FH30
    - VPL-F400H
    - VPL-F500H
    - VPL-C300
    - VPL-E200
    - VPL-E300
    - VPL-E400
    - VPL-E500
    - VPL-S200
    - VPL-S600
    - VPL-P10
    - VPL-P500
    - VPL-U300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.sony
  - sony.com
source_urls:
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
retrieved_at: 2026-05-24T18:05:39.632Z
last_checked_at: 2026-10-07T12:45:37.776Z
generated_at: 2026-10-07T12:45:37.776Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232C serial parameters (baud rate, data bits, parity, stop bits) not stated in this source — separate REMOTE CONTROL PROTOCOL MANUAL (COMMON) referenced"
  - "serial cable wiring diagram not included"
  - "ADCP authentication credentials/method not detailed — ADCP supported with initial authentication setting ON but credentials not provided"
  - "ADCP authentication described as ON at initial setting but credentials/method not specified in source"
  - "RS-232C parameters not stated in this source (separate REMOTE CONTROL PROTOCOL MANUAL COMMON referenced)"
  - "any discrete menu setting parameters not exposed as top-level variables"
  - "unsolicited notifications not documented in source - separate REMOTE CONTROL PROTOCOL MANUAL referenced"
  - "safety warnings related to power-on sequencing, installation angle limits, high-altitude operation, and lamp replacement procedures not detailed in source"
  - "RS-232C serial configuration (baud rate, data bits, parity, stop bits) — not stated in source"
  - "ADCP authentication credentials — described as supported with initial setting ON but not detailed"
  - "unsolicited event/notification format — not documented in source"
  - "PJLink password — not specified in source"
  - "SNMP community strings — not specified in source"
  - "Crestron CIP specific parameters — not detailed in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:45:37.776Z
  matched_actions: 149
  action_count: 149
  confidence: medium
  summary: "All 149 action units match source ADCP commands with agreeing value sets; transport ports are verbatim in source Section 3; the 9 sys_stat queries are Feedbacks, so coverage is about 0.94. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-24
---

# Sony 4K Projector Control Spec

## Summary
Sony professional data projector series supporting multiple control protocols: ADCP (Sony proprietary, TCP:53595), PJLink (TCP:4352), DDDP (AMX, UDP:9131), CIP (Crestron, TCP:41794), SNMP (UDP:161), SDAP (UDP:53862), and RS-232C serial. Covers 30+ models across FHZ, FH, FW, F, C, E, S, P, and U series. ADCP is a text-based command/response protocol over TCP or serial; this spec covers the ADCP supported-command list plus the network port table from Section 3 of the source.

<!-- UNRESOLVED: RS-232C serial parameters (baud rate, data bits, parity, stop bits) not stated in this source — separate REMOTE CONTROL PROTOCOL MANUAL (COMMON) referenced -->
<!-- UNRESOLVED: serial cable wiring diagram not included -->
<!-- UNRESOLVED: ADCP authentication credentials/method not detailed — ADCP supported with initial authentication setting ON but credentials not provided -->

## Transport
```yaml
protocols:
  - tcp      # ADCP, PJLink, CIP, SMTP, POP3 over Ethernet
  - udp      # SDAP, SNMP, DDDP discovery
  - serial   # RS-232C via hdbt_232c_term command option
addressing:
  port: 53595  # ADCP primary control (TCP), ON at factory per source Section 3
  ports:
    adcp: 53595       # TCP - Sony ADCP control protocol, ON at factory
    pjlink: 4352      # TCP - PJLink Class A
    cip: 41794        # TCP - Crestron Internet Protocol
    smtp: 25          # TCP - mail (OFF at factory, enabled by mail setting)
    pop3: 110         # TCP - mail (OFF at factory, enabled by mail setting)
    snmp: 161         # UDP - SNMP (ON at factory)
    dddp: 9131        # UDP - AMX Dynamic Device Discovery
    sdap: 53862       # UDP - Sony Discovery (SDAP)
auth:
  type: null  # UNRESOLVED: ADCP authentication described as ON at initial setting but credentials/method not specified in source
serial:
  baud_rate: null  # UNRESOLVED: RS-232C parameters not stated in this source (separate REMOTE CONTROL PROTOCOL MANUAL COMMON referenced)
  data_bits: null  # UNRESOLVED
  parity: null     # UNRESOLVED
  stop_bits: null  # UNRESOLVED
  flow_control: null  # UNRESOLVED
```

## Traits
```yaml
- powerable      # power on/off commands present
- queryable      # power_status ?, error ?, warning ?, timer ?, filter_status ?, modelname ?, serialnum ?, signal ?, mac_address ?, ipv4/ipv6 queries present
- routable       # input terminal selection command present
- levelable      # volume, brightness, contrast, hue, sharpness, color depth, gamma adjustments present
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
      description: Power on or off operation

- id: ipv4_network_setting
  label: IPv4 Network Setting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "start"
        - "apply"

- id: ipv4_set_method
  label: IPv4 Address Setting Method
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "manual"

- id: ipv4_ip_address
  label: IPv4 Address Set/Get
  kind: action
  params:
    - name: value
      type: string
      description: IPv4 address string (e.g., "192.168.0.1")

- id: ipv4_sub_net_mask
  label: IPv4 Subnet Mask Set/Get
  kind: action
  params:
    - name: value
      type: string

- id: ipv4_default_gateway
  label: IPv4 Default Gateway Set/Get
  kind: action
  params:
    - name: value
      type: string

- id: ipv4_dns_server1
  label: IPv4 DNS1 Address Set/Get
  kind: action
  params:
    - name: value
      type: string

- id: ipv4_dns_server2
  label: IPv4 DNS2 Address Set/Get
  kind: action
  params:
    - name: value
      type: string

- id: ipv4_dns_set_method
  label: IPv4 DNS Setting Method
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "manual"

- id: ipv6_set_method
  label: IPv6 Address Setting Method Get
  kind: query
  command: 'ipv6_set_method ?'
  params: []
  description: Acquisition-only sys_stat command; returns "auto" or "manual". No set form is documented in the source.

- id: ipv6_dns_set_method
  label: IPv6 DNS Setting Method Get
  kind: query
  command: 'ipv6_dns_set_method ?'
  params: []
  description: Acquisition-only sys_stat command; returns "auto" or "manual". No set form is documented in the source.

- id: ipv6_ip_address
  label: IPv6 IP Address Get
  kind: query
  params: []

- id: ipv6_default_gateway
  label: IPv6 Default Gateway Get
  kind: query
  params: []

- id: ipv6_dns_server1
  label: IPv6 DNS1 Address Get
  kind: query
  params: []

- id: ipv6_dns_server2
  label: IPv6 DNS2 Address Get
  kind: query
  params: []

- id: ipv6_prefix
  label: IPv6 Prefix Get
  kind: query
  params: []

- id: input
  label: Input Terminal Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "video1"
        - "svideo1"
        - "rgb1"
        - "rgb2"
        - "dvi1"
        - "hdmi1"
        - "hdmi2"
        - "network"
        - "usb_a"
        - "usb_b"
        - "hdbaset1"
        - "option1"
        - "web_content"
      description: Input terminal selection; available terminals vary by model

- id: blank
  label: Video Muting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: muting
  label: Audio Muting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: freeze
  label: Freeze Screen
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: multi_screen
  label: Dual-Screen Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: picture_mode
  label: Picture Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "dynamic"
        - "standard"
        - "brt_priority"
        - "multi_screen"
        - "presentation"
        - "blackboard"
        - "whiteboard"
        - "cinema"
        - "vivid"
        - "srgb"
      description: Available modes vary by model series

- id: picture_mode_reset
  label: Reset Picture Mode Adjustment
  kind: action
  params: []

- id: contrast
  label: Contrast Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: brightness
  label: Brightness Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: color
  label: Color Depth Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: hue
  label: Hue Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: sharpness
  label: Sharpness Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: color_temp
  label: Color Temperature Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "9300K"
        - "7500K"
        - "6500K"
        - "high"
        - "mid"
        - "mid2"
        - "low"
        - "brt_priority"
        - "brt_priority2"
        - "custom1"
        - "custom2"
        - "custom3"
        - "custom4"
      description: Kelvin values and named presets vary by model series

- id: coltemp_gain_r
  label: Color Temperature Gain R Fine Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: coltemp_gain_g
  label: Color Temperature Gain G Fine Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: coltemp_gain_b
  label: Color Temperature Gain B Fine Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: coltemp_bias_r
  label: Color Temperature Bias R Fine Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: coltemp_bias_g
  label: Color Temperature Bias G Fine Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: coltemp_bias_b
  label: Color Temperature Bias B Fine Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: light_output_mode
  label: Light Source Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "high"
        - "mid"
        - "low"
        - "auto"
        - "custom"
        - "extended"

- id: light_output_val
  label: Custom Light Output Value Adjustment
  kind: action
  params:
    - name: value
      type: integer
      description: Only applicable when light_output_mode is "custom"

- id: constant_brt
  label: Brightness Constant Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: light_output_dyn
  label: Light Source Dynamic Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: color_space
  label: Color Space Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "custom1"
        - "custom2"
        - "custom3"
        - "custom4"
      description: Available options vary by model series

- id: col_space_x
  label: Chromaticity X Axis Adjustment (Cyan-Red)
  kind: action
  params:
    - name: value
      type: integer
    - name: color
      type: string
      suffix: true
      description: 'Color target: --r, --g, or --b suffix'

- id: col_space_y
  label: Chromaticity Y Axis Adjustment (Magenta-Green)
  kind: action
  params:
    - name: value
      type: integer
    - name: color
      type: string
      suffix: true
      description: 'Color target: --r, --g, or --b suffix'

- id: gamma_correction
  label: Gamma Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "2.2"
        - "2.4"
        - "gamma3"
        - "gamma4"
        - "graphics1"
        - "graphics2"
        - "graphics3"
        - "text"
        - "dicom_sim"

- id: film_mode
  label: Film Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "off"

- id: real_cre
  label: Reality Creation On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: real_cre_reso
  label: Reality Creation Resolution Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: real_cre_noise
  label: Reality Creation Noise Reduction Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: contrast_enh
  label: Contrast Enhancer Effect Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "high"
        - "mid"
        - "low"
        - "off"

- id: col_correction
  label: Color Correction On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: col_corr_hue
  label: Color Correction Hue Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: color
      type: string
      suffix: true
      description: 'Color target: --r, --g, --b, --c, --y, or --m suffix'

- id: col_corr_color
  label: Color Correction Color Depth Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: col_corr_brt
  label: Color Correction Brightness Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: aspect
  label: Video Display Aspect Ratio
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "4_3"
        - "16_9"
        - "full1"
        - "full2"
        - "full3"
        - "normal"
        - "full"
        - "zoom"

- id: v_center
  label: Vertical Center Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: v_size
  label: Vertical Size Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: overscan
  label: Overscan Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: apa_exec
  label: APA (Auto Pixel Alignment) Execution
  kind: action
  params: []

- id: pic_phase
  label: Video Phase Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: pic_pitch
  label: Video Pitch Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: pic_shift_h
  label: Video Shift Horizontal Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: pic_shift_v
  label: Video Shift Vertical Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: volume
  label: Volume Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: mic_volume
  label: Microphone Volume Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: speaker
  label: Speaker On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: speaker_setting
  label: Speaker Setting Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "sync_power"
        - "always_on"

- id: smart_apa
  label: Smart APA On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: cc_display
  label: Closed Caption Display Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "off"
        - "cc1"
        - "cc2"
        - "cc3"
        - "cc4"
        - "text1"
        - "text2"
        - "text3"
        - "text4"

- id: background
  label: Background Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "blue"
        - "black"
        - "image"
        - "web_content"

- id: startup_image
  label: Startup Screen On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: calibration_auto
  label: Auto Color Calibration On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: calibration_start
  label: Color Calibration Start Execution
  kind: action
  params: []

- id: calibration_return
  label: Color Calibration Return to Previous Value
  kind: action
  params: []

- id: calibration_reset
  label: Color Calibration Reset
  kind: action
  params: []

- id: language
  label: Menu Display Language Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "english"
        - "dutch"
        - "french"
        - "italian"
        - "german"
        - "spanish"
        - "portuguese"
        - "greek"
        - "turkish"
        - "polish"
        - "czech"
        - "slovak"
        - "romanian"
        - "hungarian"
        - "russian"
        - "finnish"
        - "swedish"
        - "norwegian"
        - "japanese"
        - "chinese_s"
        - "chinese_t"
        - "korean"
        - "thai"
        - "vietnamese"
        - "indonesian"
        - "arabic"
        - "persian"

- id: menu_pos
  label: Menu Display Position Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "bottom_left"
        - "center"

- id: status_disp
  label: Screen Display Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "all_off"

- id: ir_receiver
  label: IR Receiver Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "front_rear"
        - "front"
        - "rear"

- id: remote_id
  label: Remote Control ID Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "all"
        - "1"
        - "2"
        - "3"
        - "4"

- id: controlkey_lock
  label: Control Key Lock On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: lens_lock
  label: Lens Control Lock On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: hdbt_lan_mode
  label: HDBaseT/LAN Port Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "hdbt"
        - "lan"

- id: hdbt_lan_term
  label: HDBaseT LAN Setting Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "via_hdbt"
        - "lan"

- id: hdbt_232c_term
  label: HDBaseT/RS-232C Setting Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "via_hdbt"
        - "232c"

- id: signal_sel
  label: Signal Type Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "computer"
        - "video_gbr"
        - "component"
    - name: terminal
      type: string
      suffix: true
      description: Terminal suffix (e.g., --rgb1, --hdmi1) required for some signal types

- id: web_content
  label: Web Content Setting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "usb"
        - "network"

- id: color_sys
  label: Color System Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "ntsc358"
        - "pal"
        - "secam"
        - "ntsc443"
        - "pal_m"
        - "pal_n"

- id: powsave_nosig
  label: Auto Power Saving (No Signal) Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "lampoff"
        - "sleep"
        - "standby"

- id: powsave_statsig
  label: Auto Power Saving (Invariable Signal) Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "dimming"
        - "off"

- id: powsave_dim_time
  label: Auto Power Saving Dimming Time Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "5min"
        - "10min"
        - "15min"
        - "20min"
        - "demo"

- id: standby_mode
  label: Standby Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "standard"
        - "low"

- id: instant_on
  label: Instant On Setting Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "off"
        - "10min"
        - "30min"

- id: direct_powon
  label: Direct Power On On/Off
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: dynamic_range
  label: Digital Input Dynamic Range Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "limited"
        - "full"
    - name: terminal
      type: string
      suffix: true
      description: Terminal suffix (--dvi1, --hdmi1, --hdbaset1, --option1) required

- id: digital_cable
  label: Digital Long Cable Setting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "normal"
        - "long"
    - name: terminal
      type: string
      suffix: true
      description: Terminal suffix (--hdmi1) required

- id: v_keystone_mode
  label: V Keystone Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "auto"
        - "manual"

- id: v_keystone
  label: V Keystone Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: h_keystone
  label: H Keystone Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: v_linearity
  label: V Linearity Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: h_linearity
  label: H Linearity Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: corner_keystone_v
  label: Corner Keystone V Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: point
      type: string
      suffix: true
      description: 'Adjustment point: --top_left, --top_center, --top_right, --center_left, --center_right, --bottom_left, --bottom_center, --bottom_right'

- id: corner_keystone_h
  label: Corner Keystone H Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: point
      type: string
      suffix: true
      description: Adjustment point suffix (varies by model - see model compatibility table)

- id: screen_fitting_reset
  label: Screen Fitting Reset
  kind: action
  params: []

- id: image_split
  label: Image Split Mode Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "off"
        - "left"
        - "right"

- id: image_flip
  label: Image Flip Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "hv"
        - "h"
        - "v"
        - "auto"

- id: install_attitude
  label: Installation Attitude Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "link_imgflip"
        - "rightsideup"
        - "upsidedown"
        - "frontup"
        - "frontdown"
        - "portrait1"
        - "portrait2"

- id: screen_aspect
  label: Screen Aspect Selection
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "16_10"
        - "16_9"
        - "4_3"

- id: blanking
  label: Blanking Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: position
      type: string
      suffix: true
      description: 'Adjustment position: --top, --bottom, --left, --right'

- id: color_matching_brt
  label: Color Matching Brightness Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: level
      type: string
      suffix: true
      description: 'Level suffix: --lev1 through --lev6'

- id: color_matching_r
  label: Color Matching R Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: color_matching_b
  label: Color Matching B Adjustment
  kind: action
  params:
    - name: value
      type: integer

- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  params: []

- id: panel_align_shift_adj_r
  label: Panel Alignment Shift R Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: direction
      type: string
      suffix: true
      description: 'Direction: --h (horizontal) or --v (vertical)'

- id: panel_align_shift_adj_b
  label: Panel Alignment Shift B Adjustment
  kind: action
  params:
    - name: value
      type: integer
    - name: direction
      type: string
      suffix: true
      description: 'Direction: --h (horizontal) or --v (vertical)'

# --- Panel alignment commands (source Section 2 Installation setting) ---

- id: panel_align_pattern
  label: Panel Alignment Pattern Color Selection
  kind: action
  command: 'panel_align_pattern "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "rgb"
        - "rg"
        - "bg"
      description: Pattern color during panel alignment adjustment

- id: panel_alignment
  label: Panel Alignment On/Off
  kind: action
  command: 'panel_alignment "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: panel_align_reset
  label: Panel Alignment Reset
  kind: action
  command: 'panel_align_reset'
  params: []
  description: Executes reset of overall panel alignment adjustment

# --- Blending adjustment commands (source Section 2) ---

- id: blend_sw
  label: Blending Adjustment On/Off
  kind: action
  command: 'blend_sw --{position} "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
    - name: position
      type: string
      suffix: true
      description: Adjustment position suffix (top/bottom/left/right)

- id: blend_start
  label: Blending Start Position Adjustment
  kind: action
  command: 'blend_start --{position} {value}'
  params:
    - name: value
      type: integer
    - name: position
      type: string
      suffix: true
      description: Adjustment position suffix (top/bottom/left/right)

- id: blend_width
  label: Blending Adjustment Width
  kind: action
  command: 'blend_width {value}'
  params:
    - name: value
      type: integer

- id: blend_bk_level_r
  label: Blending Black Level R Offset Adjustment
  kind: action
  command: 'blend_bk_level_r --pos{N} {value}'
  params:
    - name: value
      type: integer
    - name: position
      type: string
      suffix: true
      description: Position suffix --pos1 through --pos9

- id: blend_bk_level_g
  label: Blending Black Level G Offset Adjustment
  kind: action
  command: 'blend_bk_level_g --pos{N} {value}'
  params:
    - name: value
      type: integer
    - name: position
      type: string
      suffix: true
      description: Position suffix --pos1 through --pos9

- id: blend_bk_level_b
  label: Blending Black Level B Offset Adjustment
  kind: action
  command: 'blend_bk_level_b --pos{N} {value}'
  params:
    - name: value
      type: integer
    - name: position
      type: string
      suffix: true
      description: Position suffix --pos1 through --pos9

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
  label: Blending Cursor Display Selection
  kind: action
  command: 'blend_cursor "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: blend_cursor_color
  label: Blending Cursor Color Selection
  kind: action
  command: 'blend_cursor_color --{marker} "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "r"
        - "g"
        - "b"
        - "c"
        - "m"
        - "y"
    - name: marker
      type: string
      suffix: true
      description: Marker portion suffix (e.g., --start)

# --- Lens position memory commands (FHZ120/FHZ90/F1200/F900 only) ---

- id: pic_pos_save
  label: Lens Position Memory Save
  kind: action
  command: 'pic_pos_save "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "custom1"
        - "custom2"
        - "custom3"
        - "custom4"
        - "custom5"
        - "custom6"

- id: pic_pos_del
  label: Lens Position Memory Delete
  kind: action
  command: 'pic_pos_del "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "custom1"
        - "custom2"
        - "custom3"
        - "custom4"
        - "custom5"
        - "custom6"

- id: pic_pos_sel
  label: Lens Position Memory Selection
  kind: action
  command: 'pic_pos_sel "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "custom1"
        - "custom2"
        - "custom3"
        - "custom4"
        - "custom5"
        - "custom6"

# --- Maintenance / environment commands (source Section 2) ---

- id: high_alt_mode
  label: High Altitude Mode Selection
  kind: action
  command: 'high_alt_mode "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
        - "auto"

- id: filter_cleaning
  label: Filter Cleaning Execution
  kind: action
  command: 'filter_cleaning'
  params: []
  description: Executes filter cleaning with the power turned off

- id: filter_box
  label: Filter Box Selection
  kind: action
  command: 'filter_box "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "installed"
        - "not_installed"

# --- Remote controller key command (source Section 2-3) ---

- id: key
  label: Remote Controller Key Press
  kind: action
  command: 'key "{keycode}"'
  params:
    - name: keycode
      type: enum
      values:
        - "power_on"
        - "power_off"
        - "power"
        - "video"
        - "s_video"
        - "input_a"
        - "input_b"
        - "input_c"
        - "input_d"
        - "input_e"
        - "input_f"
        - "input_g"
        - "input_h"
        - "input"
        - "blank"
        - "muting"
        - "vol+"
        - "vol_"
        - "menu"
        - "right"
        - "left"
        - "up"
        - "down"
        - "enter"
        - "reset"
        - "return"
        - "picmode1"
        - "picmode2"
        - "picmode3"
        - "picmode4"
        - "picmode5"
        - "picmode6"
        - "picmode"
        - "picture+"
        - "picture_"
        - "color+"
        - "color_"
        - "bright+"
        - "bright_"
        - "hue+"
        - "hue_"
        - "sharpness+"
        - "sharpness_"
        - "picture_adj"
        - "color_temp"
        - "color_mode"
        - "black_level"
        - "aspect"
        - "apa"
        - "phase"
        - "video_size"
        - "video_shift"
        - "status_on"
        - "status_off"
        - "lens_control"
        - "lens_focus"
        - "lens_focus_far"
        - "lens_focus_near"
        - "lens_zoom"
        - "lens_zoom_up"
        - "lens_zoom_down"
        - "lens_shift"
        - "lens_shift_up"
        - "lens_shift_down"
        - "lens_shift_left"
        - "lens_shift_right"
        - "twin"
        - "freeze"
        - "d_zoom+"
        - "d_zoom_"
        - "keystone"
        - "keystone+"
        - "keystone_"
        - "pattern"
        - "eco"
        - "lens_position"
      description: Remote control key code to press (emulates physical remote); per-model support varies per source key code table

# --- Advanced adjustment commands for experts (source Section 2-4) ---

- id: warp
  label: Warp Adjustment
  kind: action
  command: 'warp [x,y] --pos=[x1,y1,x2,y2] --ch=w'
  params:
    - name: value
      type: string
      description: 'Adjustment value as JSON array [x,y], relative --rel=[x,y], table [[x,y],...], or --reset'
    - name: position
      type: string
      description: 'Range of adjustment points --pos=[x1,y1,x2,y2]'
    - name: channel
      type: string
      description: 'Adjustment channel --ch=w (common R/G/B)'
  description: Warp adjustment for experts; supports direct/relative/table/--reset/--apply and query (warp ? --pos=... --ch=...)

- id: area_bk_level
  label: Zone Black Level / Zone Fitting Adjustment
  kind: action
  command: 'area_bk_level [x,y] --pos=[x1,y1,x2,y2] --ch=w'
  params:
    - name: value
      type: string
      description: 'Adjustment value as JSON array, relative, or table'
    - name: position
      type: string
      description: 'Range of adjustment points --pos=[x1,y1,x2,y2]'
    - name: channel
      type: string
      description: 'Adjustment channel --ch=w'
  description: Zone black level/zone fitting adjustment; supports --reset/--apply and query

- id: panel_align_zone
  label: Panel Alignment Zone Adjustment
  kind: action
  command: 'panel_align_zone [x,y] --pos=[x1,y1,x2,y2] --ch=r'
  params:
    - name: value
      type: string
      description: 'Adjustment value as JSON array, relative, or table'
    - name: position
      type: string
      description: 'Range of adjustment points --pos=[x1,y1,x2,y2]'
    - name: channel
      type: string
      description: 'Adjustment channel --ch=r (red) or --ch=b (blue)'
  description: Panel alignment zone adjustment; supports --reset/--apply and query

- id: user_gamma
  label: User Gamma Curve Adjustment
  kind: action
  command: 'user_gamma <val> --sel=gamma3 --pos=[0,63] --ch=r'
  params:
    - name: value
      type: string
      description: 'Adjustment value (direct/relative/table/--reset)'
    - name: curve
      type: string
      description: 'Gamma curve selection --sel=2.2/2.4/gamma3/gamma4/dicom'
    - name: position
      type: string
      description: 'Adjustment point range --pos=[start,end]'
    - name: channel
      type: string
      description: 'Adjustment channel --ch=r, --ch=g, or --ch=b'
  description: Gamma curve adjustment; supports --reset/--apply and query

- id: color_gamut
  label: Color Gamut Query
  kind: query
  command: 'color_gamut ? --sel=custom1'
  params:
    - name: color_space
      type: string
      description: 'Color space selection --sel=original/custom1/custom2/custom3'
  description: Acquires CIE xy chromaticity of R/G/B for the specified color space (read-only)

# --- Test pattern display commands (source Section 2-4-6) ---

- id: pat_blend_cursor
  label: Blending Adjustment Cursor Display
  kind: action
  command: 'pat_blend_cursor --{position} "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
    - name: position
      type: string
      suffix: true
      description: Position suffix (top/bottom/left/right)

- id: pat_color_space
  label: Color Space Adjustment Flat Field Pattern
  kind: action
  command: 'pat_color_space "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "r"
        - "g"
        - "b"
        - "w"
        - "off"

- id: pat_warp_cursor
  label: Warp Adjustment Pointer Display
  kind: action
  command: 'pat_warp_cursor "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
  description: When position not specified, displays cursor at adjustment point [0,0]

- id: pat_panel_align_zone_cursor
  label: Panel Alignment Zone Cursor Display
  kind: action
  command: 'pat_panel_align_zone_cursor "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "rg"
        - "bg"
        - "rgb"
        - "off"
  description: When position not specified, displays cursor at adjustment point [1,1]

- id: pat_area_bk_level_cursor
  label: Zone Black Level Cursor Display
  kind: action
  command: 'pat_area_bk_level_cursor "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
  description: When position not specified, displays cursor at adjustment point [0,0]

- id: pat_warp_cross_hatch
  label: Warp Adjustment Crosshatch Pattern
  kind: action
  command: 'pat_warp_cross_hatch "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "r"
        - "g"
        - "b"
        - "w"
        - "g_inv"
        - "off"

- id: pat_color_matching
  label: Color Matching Flat Field Pattern
  kind: action
  command: 'pat_color_matching "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "lev1"
        - "lev2"
        - "lev3"
        - "lev4"
        - "lev5"
        - "lev6"
        - "off"

- id: pat_area_bk_level
  label: Zone Black Level Flat Field Pattern
  kind: action
  command: 'pat_area_bk_level "{value}"'
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"

- id: pat_warp_cursor_pos
  label: Warp Adjustment Cursor Position Set
  kind: action
  command: 'pat_warp_cursor [<x>,<y>]'
  params:
    - name: x
      type: integer
      description: 'X coordinate; upper-left OSD is (0,0); left/up negative, right/down positive (pre-warp coordinate)'
    - name: y
      type: integer
      description: 'Y coordinate'

- id: pat_panel_align_zone_cursor_pos
  label: Panel Alignment Zone Cursor Position Set
  kind: action
  command: 'pat_panel_align_zone_cursor_pos [<x>,<y>]'
  params:
    - name: x
      type: integer
      description: 'X coordinate; upper-left OSD is (1,1)'
    - name: y
      type: integer
      description: 'Y coordinate'

- id: pat_area_bk_level_cursor_pos
  label: Zone Black Level Cursor Position Set
  kind: action
  command: 'pat_area_bk_level_cursor_pos [<x>,<y>]'
  params:
    - name: x
      type: integer
    - name: y
      type: integer
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "standby"
    - "startup"
    - "on"
    - "cooling1"
    - "cooling2"
    - "saving_cooling1"
    - "saving_cooling2"
    - "saving_standby"
    - "update"

- id: error
  label: Error Status
  type: enum
  values:
    - "no_err"
    - "err_power"
    - "err_power2"
    - "err_system2"
    - "err_cover"
    - "err_light_src"
    - "err_lens_cover"
    - "err_shock"
    - "err_nolens"
    - "err_attitude"
    - "err_temp"
    - "err_fan"
    - "err_wheel"
    - "err_light_over"
    - "err_assy"
    - "err_lens_shift"
    - "err_shutter"
  description: JSON array format; multiple errors can be reported simultaneously

- id: warning
  label: Warning Status
  type: enum
  values:
    - "no_warn"
    - "warn_light_src_life"
    - "warn_highland"
    - "warn_temp"
    - "warn_signal_freq"
    - "warn_signal_sel"
  description: JSON array format; multiple warnings can be reported simultaneously

- id: timer
  label: Timer Values
  type: object
  properties:
    - operation
    - light_src
    - prev_light_src
  description: JSON object array - operation time, light source time, previous light source time (hours)

- id: filter_status
  label: Filter Status
  type: enum
  values:
    - "normal"
    - "clean"
    - "replace"
    - "cleanup_step1"
    - "cleanup_step2"

- id: modelname
  label: Model Name
  type: string
  description: Model name string (e.g., "VPL-FHZ65")

- id: serialnum
  label: Serial Number
  type: string
  description: Serial number string (e.g., "012345678")

- id: signal
  label: Input Signal Status
  type: enum
  values:
    - "Video60"
    - "Video50"
    - "480_60i"
    - "576/50i"
    - "480/60p"
    - "576/50p"
    - "1080/60i"
    - "1080/50i"
    - "1080/24psF"
    - "720/60p"
    - "720/50P"
    - "1080/60p"
    - "1080/50p"
    - "1080/24p"
    - "1080/30p"
    - "640x350"
    - "640x400"
    - "640x480"
    - "800x600"
    - "832x624"
    - "1024x768"
    - "1152x864"
    - "1152x900"
    - "1280x960"
    - "1280x1024"
    - "1400x1050"
    - "1600x1200"
    - "1280x768"
    - "1280x720"
    - "1920x1080"
    - "1920x1200"
    - "1366x768"
    - "1440x900"
    - "1680x1050"
    - "1280x800"
    - "1600x900"
    - "2048x1080/24p"
    - "2048x1080/24psF"
    - "Invalid"
    - "<H resolution> x <V resolution>"
  description: Returns current input signal format; includes standard resolutions and Unknown/Invalid states

- id: mac_address
  label: MAC Address
  type: string
  description: MAC address string (e.g., "08-12-34-ab-cd-ef")

- id: ipv4_set_method
  label: IPv4 Address Setting Method Get
  type: enum
  values:
    - "auto"
    - "manual"

- id: ipv6_set_method
  label: IPv6 Address Setting Method Get
  type: enum
  values:
    - "auto"
    - "manual"

- id: ipv6_dns_set_method
  label: IPv6 DNS Setting Method Get
  type: enum
  values:
    - "auto"
    - "manual"

# Advanced adjustment query responses (source Section 2-4)
- id: warp_value
  label: Warp Adjustment Value
  type: string
  description: JSON array of warp adjustment values per point (returned by warp ? --pos=... --ch=...)

- id: area_bk_level_value
  label: Zone Black Level Adjustment Value
  type: string
  description: JSON array of zone black level/zone fitting values per point

- id: panel_align_zone_value
  label: Panel Alignment Zone Adjustment Value
  type: string
  description: JSON array of panel alignment zone values per point

- id: user_gamma_value
  label: User Gamma Curve Value
  type: string
  description: JSON array of gamma curve adjustment values per point (returned by user_gamma ? --sel=... --pos=... --ch=...)

- id: color_gamut_value
  label: Color Gamut Chromaticity
  type: string
  description: 'CIE xy chromaticity of R/G/B as [[Rx,Ry],[Gx,Gy],[Bx,By]] (returned by color_gamut ? --sel=...)'
```

## Variables
```yaml
# Network variables are set via sys_var command type with ipv4_*/ipv6_* commands.
# See Actions section for variable-setting commands (ipv4_ip_address, ipv4_sub_net_mask, etc.)
# IPv6 address and DNS setting methods are acquisition-only sys_stat queries in the source, not variable-setting commands.
# UNRESOLVED: any discrete menu setting parameters not exposed as top-level variables
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source - separate REMOTE CONTROL PROTOCOL MANUAL referenced
```

## Macros
```yaml
# IPv4 manual network configuration sequence from source:
# 1. ipv4_network_setting "start"
# 2. ipv4_set_method "manual"
# 3. ipv4_ip_address "XXX.XXX.XXX.XXX"
# 4. ipv4_sub_net_mask "XXX.XXX.XXX.XXX"
# 5. ipv4_default_gateway "XXX.XXX.XXX.XXX"
# 6. ipv4_dns_server1 "XXX.XXX.XXX.XXX"
# 7. ipv4_dns_server2 "XXX.XXX.XXX.XXX"
# 8. ipv4_network_setting "apply"
#
# IPv4 auto network configuration sequence from source:
# 1. ipv4_network_setting "start"
# 2. ipv4_set_method "auto"
# 3. ipv4_dns_set_method "auto"
# 4. ipv4_network_setting "apply"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: standby_mode_low_network_unavailable
    description: When standby mode is set to "Low", network function cannot be used during standby. To perform power ON/OFF over network, set standby mode to "Standard".
  - id: rs232c_via_hdbaset
    description: RS-232C control is available via HDBaseT when hdbt_232c_term is set to "via_hdbt". Verify HDBaseT connection before relying on serial control over HDBaseT.
# UNRESOLVED: safety warnings related to power-on sequencing, installation angle limits, high-altitude operation, and lamp replacement procedures not detailed in source
```

## Notes
ADCP (Advanced Device Control Protocol) is Sony's proprietary text-based control protocol. Commands follow format: `command "value"` for set, `command ?` for query, `command ? --range` for value range, `command ? --info` for command info. Responses include `ok` for successful set, quoted value for query response. For menu_num commands, `command <integer>` sets direct value and `command --rel <integer>` sets a relative value; `command --reset` resets. For suffix-parameterized commands, the classification is specified using a suffix (e.g. `col_space_x --r 20`).

The IPv6 address and DNS setting methods are acquisition-only sys_stat commands: `ipv6_set_method ?` and `ipv6_dns_set_method ?` return "auto" or "manual". The source does not document set forms for either command.

Network ports are stated explicitly in source Section 3. ADCP primary control runs over TCP:53595 (ON at factory). Per-protocol factory service state and port-changeability vary by model series (see Transport.ports). SMTP/POP3 mail ports (25/110) are OFF at factory and enabled only via mail setting.

Multiple model series share this protocol spec. Model-specific command support is indicated by `O` (supported) and `_` (not supported) in the source tables. Full model-specific matrix requires cross-referencing each command with the per-model columns. The lens position memory commands (pic_pos_save/del/sel) and several blending commands are FHZ120/FHZ90/F1200/F900 series only.

Supported protocols per source: SDAP, ADCP (authenticated, initial ON), PJLink (Class A), DDDP (AMX — always ON during serial), CIP (Crestron), SNMP. SDDP (Control4) is not supported per source.

The separate REMOTE CONTROL PROTOCOL MANUAL (COMMON) is referenced for protocol details not covered in this command list document. RS-232C transport parameters (baud rate, data bits, parity, stop bits) and authentication credentials are not specified in this document.
<!-- UNRESOLVED: RS-232C serial configuration (baud rate, data bits, parity, stop bits) — not stated in source -->
<!-- UNRESOLVED: ADCP authentication credentials — described as supported with initial setting ON but not detailed -->
<!-- UNRESOLVED: unsolicited event/notification format — not documented in source -->
<!-- UNRESOLVED: PJLink password — not specified in source -->
<!-- UNRESOLVED: SNMP community strings — not specified in source -->
<!-- UNRESOLVED: Crestron CIP specific parameters — not detailed in source -->

## Provenance

```yaml
source_domains:
  - pro.sony
  - sony.com
source_urls:
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
retrieved_at: 2026-05-24T18:05:39.632Z
last_checked_at: 2026-10-07T12:45:37.776Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:45:37.776Z
matched_actions: 149
action_count: 149
confidence: medium
summary: "All 149 action units match source ADCP commands with agreeing value sets; transport ports are verbatim in source Section 3; the 9 sys_stat queries are Feedbacks, so coverage is about 0.94. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232C serial parameters (baud rate, data bits, parity, stop bits) not stated in this source — separate REMOTE CONTROL PROTOCOL MANUAL (COMMON) referenced"
- "serial cable wiring diagram not included"
- "ADCP authentication credentials/method not detailed — ADCP supported with initial authentication setting ON but credentials not provided"
- "ADCP authentication described as ON at initial setting but credentials/method not specified in source"
- "RS-232C parameters not stated in this source (separate REMOTE CONTROL PROTOCOL MANUAL COMMON referenced)"
- "any discrete menu setting parameters not exposed as top-level variables"
- "unsolicited notifications not documented in source - separate REMOTE CONTROL PROTOCOL MANUAL referenced"
- "safety warnings related to power-on sequencing, installation angle limits, high-altitude operation, and lamp replacement procedures not detailed in source"
- "RS-232C serial configuration (baud rate, data bits, parity, stop bits) — not stated in source"
- "ADCP authentication credentials — described as supported with initial setting ON but not detailed"
- "unsolicited event/notification format — not documented in source"
- "PJLink password — not specified in source"
- "SNMP community strings — not specified in source"
- "Crestron CIP specific parameters — not detailed in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
