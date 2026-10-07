---
spec_id: admin/planar-ep5804k-ep6504k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar EP5804K/EP6504K Control Spec"
manufacturer: Planar
model_family: EP5804K
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - EP5804K
    - EP5804K-T
    - EP6504K
    - EP6504K-T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/53ebkckh/ep-series-ultra-hd-lcd-displays-rs232-user-guide-wm.zip
  - https://www.planar.com/media/zyrmhech/020-1273-00_ep5804-ep6504_rs232_guide_v13-wm.pdf
  - https://www.planar.com/media/0apdzjwe/020-1227-00a-ep4650-5550-rs232-user-guide-wm.pdf
  - https://www.planar.com/support/discontinued-products/large-format-lcd-displays/
retrieved_at: 2026-10-07T13:02:41.241Z
last_checked_at: 2026-10-07T13:02:41.241Z
generated_at: 2026-10-07T13:02:41.241Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not covered in source — serial only"
  - "flow control not stated in source"
  - "network/IP settings (IP1-IP4, MK1-MK4, GW1-GW4, FD1-FD4) require confirmation"
  - "no unsolicited event descriptions found in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP/IP / Ethernet control not covered — source covers RS-232 only"
  - "power LED, splash screen, IRFM, smart light, DPM, EDID commands partially documented"
  - "DNS email alert and network enable parameters partially documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:02:41.241Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 units match source RS-232 table CMDs; transport 19200 8N1 confirmed; every source CMD is represented, with weekly-timer and network-address groups collapsed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Planar EP5804K/EP6504K Control Spec

## Summary
Professional large-format LCD display controllable via RS-232. Binary packet protocol: STX(07) + IDT + Type + CMD(3 bytes) + [Value] + ETX(08). Read/write command types. Supports power, display, audio, network, timer, OSD, and video wall functions.

<!-- UNRESOLVED: TCP/IP control not covered in source — serial only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # default; also supports 115200, 38400, 9600 via BRA command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # POW read/write command present
- routable   # MIN input source command present
- queryable  # read commands (GVE, SER, MNA, RTV, POW read, BRI read, CON read, etc.) present
- levelable  # VOL, BAS, TRE, BAL, BRI, CON, SHA, HUE, SAT commands present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0=VGA, 1=DigitalDVI, 9=HDMI1, 10=HDMI2, 13=DisplayPort, 14=OPS"
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0–100"
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0–100"
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0–24"
- id: set_hue
  label: Set Hue
  kind: action
  params:
    - name: value
      type: integer
      description: "0–100"
- id: set_saturation
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0–100"
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "0–100"
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"
- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "0–12 (-6~6)"
- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "0–12 (-6~6)"
- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "0–12 (-6~6)"
- id: send_ir_key
  label: Send IR Key Command
  kind: action
  params:
    - name: key
      type: integer
      description: "0=MENU, 1=INFO, 2=UP, 3=DOWN, 4=LEFT, 5=RIGHT, 6=ENTER, 7=EXIT"
- id: reset_all
  label: Reset All
  kind: action
  params: []
- id: load_default_settings
  label: Load Default Settings
  kind: action
  params: []
- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=115200, 1=38400, 2=19200, 3=9600"
- id: set_scaling
  label: Set Scaling
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Native, 1=FullScreen, 2=4:3, 3=Letterbox"
- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "0–15"
- id: set_osd_position_h
  label: Set OSD H Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0–254"
- id: set_osd_position_v
  label: Set OSD V Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0–254"
- id: set_osd_zoom
  label: Set OSD Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"
- id: set_osd_rotation
  label: Set OSD Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Landscape, 1=Portrait"
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: value
      type: integer
      description: "0=English, 1=Chinese"
- id: set_osd_timeout
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "5–120 seconds"
- id: set_video_wall_switch
  label: Set Video Wall Switch
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"
- id: set_video_wall_frameless
  label: Set Video Wall Frameless
  kind: action
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"
- id: set_video_wall_matrix
  label: Set Video Wall Matrix
  kind: action
  params:
    - name: x
      type: integer
      description: "1–5"
    - name: y
      type: integer
      description: "1–5"
- id: set_video_wall_divisions
  label: Set Video Wall Divisions
  kind: action
  params:
    - name: x
      type: integer
      description: "1–5"
    - name: y
      type: integer
      description: "1–5"
- id: set_power_on_delay
  label: Set Power On Delay
  kind: action
  params:
    - name: integral
      type: integer
      description: "0–30 seconds (integral part)"
    - name: fractional
      type: number
      description: "0–19 (0, 0.05, 0.10 ... 0.95 fractional part)"
- id: set_digital_brightness_level
  label: Set Digital Brightness Level
  kind: action
  command: BRL
  params:
    - name: value
      type: integer
      description: "0~100"
- id: set_backlight
  label: Set Backlight
  kind: action
  command: BLC
  params:
    - name: value
      type: integer
      description: "00=Off (Backlight), 01=On"
- id: set_flesh_tone
  label: Set Flesh Tone
  kind: action
  command: FST
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  command: NOR
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"
- id: set_local_dimming
  label: Set Local Dimming
  kind: action
  command: LDM
  params:
    - name: value
      type: integer
      description: "0=Local Dimming Off, 1=Local Dimming On"
- id: set_memc
  label: Set MEMC
  kind: action
  command: MEM
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"
- id: set_scheme
  label: Set Scheme
  kind: action
  command: SCM
  params:
    - name: value
      type: integer
      description: "00=User, 01=Sport, 02=Game, 03=Cinema, 04=Vivid"
- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: COT
  params:
    - name: value
      type: integer
      description: "00=User, 01=6500K, 02=9300K, 03=3200K, 06=5000K, 07=7500K"
- id: set_gamma
  label: Set Gamma
  kind: action
  command: GAC
  params:
    - name: value
      type: integer
      description: "00=Off (Gamma), 01=1.85 (Gamma), 02=1.9 (Gamma), 03=1.95 (Gamma), 04=2.0 (Gamma), 05=2.05 (Gamma), 06=2.1 (Gamma), 07=2.15 (Gamma), 08=2.2 (Gamma), 09=2.25 (Gamma), 10=2.3 (Gamma), 11=2.35 (Gamma), 12=2.4 (Gamma), 13=2.45 (Gamma), 14=2.5 (Gamma), 15=2.55 (Gamma), 16=2.6 (Gamma)"
- id: set_color_gain
  label: Set Color Gain
  kind: action
  command: USR, USG, USB
  params:
    - name: channel
      type: string
      description: "USR, USG, USB"
    - name: value
      type: integer
      description: "0~255"
- id: set_color_offset
  label: Set Color Offset
  kind: action
  command: UOR, UOG, UOB
  params:
    - name: channel
      type: string
      description: "UOR, UOG, UOB"
    - name: value
      type: integer
      description: "0~100"
- id: set_vga_phase
  label: Set VGA Phase
  kind: action
  command: PHA
  params:
    - name: value
      type: integer
      description: "0~63"
- id: set_vga_clock
  label: Set VGA Clock
  kind: action
  command: CLO
  params:
    - name: value
      type: integer
      description: "0~100"
- id: set_vga_horizontal_position
  label: Set VGA Horizontal Position
  kind: action
  command: HOR
  params:
    - name: value
      type: integer
      description: "-100~100"
- id: set_vga_vertical_position
  label: Set VGA Vertical Position
  kind: action
  command: VER
  params:
    - name: value
      type: integer
      description: "-100~100"
- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: ADJ
  params: []
- id: set_current_time
  label: Set Current Time
  kind: action
  command: RTY, RTM, RTD, RTH, RTN
  params:
    - name: field
      type: string
      description: "RTY, RTM, RTD, RTH, RTN"
    - name: value
      type: integer
      description: "RTY: 0~99; RTM: 0~12; RTD: 1~31; RTH: 0~23; RTN: 0~59"
- id: set_timer_mode
  label: Set Timer Mode
  kind: action
  command: TMS
  params:
    - name: value
      type: integer
      description: "0=All, 1=Work Days, 2=User"
- id: set_alarm_enable_day
  label: Set Alarm Enable Day
  kind: action
  command: AEN
  params:
    - name: value
      type: integer
      description: "1=Sunday, 2=Monday, 4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Saturday"
- id: set_alarm_disable_day
  label: Set Alarm Disable Day
  kind: action
  command: AEF
  params:
    - name: value
      type: integer
      description: "1=Sunday, 2=Monday, 4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Sunday"
- id: set_weekly_timer
  label: Set Weekly Timer
  kind: action
  command: SNH, SNM, SFH, SFM, NNH, NNM, NFH, NFM, ENH, ENM, EFH, EFM, DNH, DNM, DFH, DFM, UNH, UNM, UFH, UFM, INH, INM, IFH, IFM, TNH, TNM, TFH, TFM
  params:
    - name: command
      type: string
      description: "SNH, SNM, SFH, SFM, NNH, NNM, NFH, NFM, ENH, ENM, EFH, EFM, DNH, DNM, DFH, DFM, UNH, UNM, UFH, UFM, INH, INM, IFH, IFM, TNH, TNM, TFH, TFM"
    - name: value
      type: integer
      description: "Hour commands: 0~23; minute commands: 0~59"
- id: set_hdmi_audio
  label: Set HDMI Audio
  kind: action
  command: HAS
  params:
    - name: value
      type: integer
      description: "00=HDMI, 01=PC"
- id: set_displayport_audio
  label: Set DisplayPort Audio
  kind: action
  command: DAS
  params:
    - name: value
      type: integer
      description: "00=DisplayPort, 01=PC"
- id: set_internal_speaker
  label: Set Internal Speaker
  kind: action
  command: INS
  params:
    - name: value
      type: integer
      description: "00=Internal Speaker Off, 01=Internal Speaker On"
- id: set_dvi_edid
  label: Set DVI EDID
  kind: action
  command: EDD
  params:
    - name: value
      type: integer
      description: "00=DVI Only, 01=Same as HDMI"
- id: set_hdmi_edid
  label: Set HDMI EDID
  kind: action
  command: EDH
  params:
    - name: value
      type: integer
      description: "00=4Kx2K, 01=1080p"
- id: set_displayport_edid
  label: Set DisplayPort EDID
  kind: action
  command: EDP
  params:
    - name: value
      type: integer
      description: "00=4Kx2K, 01=1080p"
- id: set_network_enable
  label: Set Network Enable
  kind: action
  command: NWE
  params:
    - name: value
      type: integer
      description: "0=No, 1=Yes"
- id: set_dynamic_ip
  label: Set Dynamic IP
  kind: action
  command: DIP
  params:
    - name: value
      type: integer
      description: "0=Disable, 1=Enable"
- id: set_power_status_alert
  label: Set Power Status Alert
  kind: action
  command: PSA
  params:
    - name: value
      type: integer
      description: "0=Off (Power Status Alert), 1=On (Power Status Alert)"
- id: set_source_status_alert
  label: Set Source Status Alert
  kind: action
  command: SSA
  params:
    - name: value
      type: integer
      description: "0=Off (Source Status Alert), 1=On (Source Status Alert)"
- id: set_signal_lost_alert
  label: Set Signal Lost Alert
  kind: action
  command: SLA
  params:
    - name: value
      type: integer
      description: "0=Off (Signal Lost Alert), 1=On ( Signal Lost Alert)"
- id: set_static_network_address_octet
  label: Set Static Network Address Octet
  kind: action
  command: IP1, IP2, IP3, IP4, MK1, MK2, MK3, MK4, GW1, GW2, GW3, GW4, FD1, FD2, FD3, FD4
  params:
    - name: command
      type: string
      description: "IP1, IP2, IP3, IP4, MK1, MK2, MK3, MK4, GW1, GW2, GW3, GW4, FD1, FD2, FD3, FD4"
    - name: value
      type: integer
      description: "0~255"
- id: save_static_ip_settings
  label: Save Static IP Settings
  kind: action
  command: SNS
  params: []
- id: set_wake_up_from_sleep
  label: Set Wake Up From Sleep
  kind: action
  command: WFS
  params:
    - name: value
      type: integer
      description: "0=VGA_ONLY, 1=VGA_DIGITAL_RS232, 2=Never Sleep"
- id: set_auto_scan
  label: Set Auto Scan
  kind: action
  command: ATS
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: set_irfm
  label: Set IRFM
  kind: action
  command: IRF
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: set_smart_light_control
  label: Set Smart Light Control
  kind: action
  command: SLC
  params:
    - name: value
      type: integer
      description: "00=Off, 01=DCR, 02=Light Sensor"
- id: set_power_led
  label: Set Power LED
  kind: action
  command: LED
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: set_splash_screen
  label: Set Splash Screen
  kind: action
  command: SPS
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: set_displayport_mode
  label: Set DisplayPort Mode
  kind: action
  command: DPM
  params:
    - name: value
      type: integer
      description: "0=DP 1.1, 1=DP 1.2"
- id: set_key_lock
  label: Set Key Lock
  kind: action
  command: KLC
  params:
    - name: value
      type: integer
      description: "00=Un-lock keys, 01=Lock keys"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "00"
    - "01"
  description: "00=off, 01=on"
  query_command: POW
- id: input_state
  type: enum
  values:
    - "00"
    - "01"
    - "09"
    - "10"
    - "13"
    - "14"
  description: "00=VGA, 01=DigitalDVI, 09=HDMI1, 10=HDMI2, 13=DisplayPort, 14=OPS"
  query_command: MIN
- id: brightness_value
  type: integer
  description: "0–100"
  query_command: BRI
- id: contrast_value
  type: integer
  description: "0–100"
  query_command: CON
- id: sharpness_value
  type: integer
  description: "0–24"
  query_command: SHA
- id: hue_value
  type: integer
  description: "0–100"
  query_command: HUE
- id: saturation_value
  type: integer
  description: "0–100"
  query_command: SAT
- id: volume_value
  type: integer
  description: "0–100"
  query_command: VOL
- id: mute_state
  type: enum
  values:
    - "00"
    - "01"
  description: "00=off, 01=on"
  query_command: MUT
- id: bass_value
  type: integer
  description: "0–12"
  query_command: BAS
- id: treble_value
  type: integer
  description: "0–12"
  query_command: TRE
- id: balance_value
  type: integer
  description: "0–12"
  query_command: BAL
- id: serial_number
  type: string
  description: "13 bytes ASCII"
  query_command: SER
- id: model_name
  type: string
  description: "13 bytes ASCII"
  query_command: MNA
- id: firmware_version
  type: string
  description: "6 bytes ASCII"
  query_command: GVE
- id: rs232_table_version
  type: string
  description: "Current value"
  query_command: RTV
```

## Variables
```yaml
# UNRESOLVED: network/IP settings (IP1-IP4, MK1-MK4, GW1-GW4, FD1-FD4) require confirmation
# of readback format before listing as variables
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command packet structure:**
```
Byte 0: STX = 0x07
Byte 1: IDT = 0x00 (Monitor ID; can be 0x00–0x0F)
Byte 2: Type = 0x01 (read), 0x02 (write), 0x00 (response from monitor)
Byte 3-5: CMD (3 ASCII bytes)
Byte 6: [Value] (write commands only)
Byte 7: ETX = 0x08
```

**Response format:** Monitor echoes CMD in response bytes 3–5. Type byte always 0x00 in monitor→PC direction.

**Wake-on-Sleep note:** ▲ symbol indicates command valid in power-saving/off mode only when Wake Up From Sleep is set to "VGA, Digital, RS232" (WFS=1).

**Serial port default:** 19200 8N1. Baud rate adjustable via BRA command to 115200/38400/19200/9600.

**Video wall matrix encoding:** X value in high nibble (bits 7–4), Y value in low nibble (bits 3–0).

<!-- UNRESOLVED: TCP/IP / Ethernet control not covered — source covers RS-232 only -->
<!-- UNRESOLVED: power LED, splash screen, IRFM, smart light, DPM, EDID commands partially documented -->
<!-- UNRESOLVED: DNS email alert and network enable parameters partially documented -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/53ebkckh/ep-series-ultra-hd-lcd-displays-rs232-user-guide-wm.zip
  - https://www.planar.com/media/zyrmhech/020-1273-00_ep5804-ep6504_rs232_guide_v13-wm.pdf
  - https://www.planar.com/media/0apdzjwe/020-1227-00a-ep4650-5550-rs232-user-guide-wm.pdf
  - https://www.planar.com/support/discontinued-products/large-format-lcd-displays/
retrieved_at: 2026-10-07T13:02:41.241Z
last_checked_at: 2026-10-07T13:02:41.241Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:02:41.241Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 units match source RS-232 table CMDs; transport 19200 8N1 confirmed; every source CMD is represented, with weekly-timer and network-address groups collapsed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not covered in source — serial only"
- "flow control not stated in source"
- "network/IP settings (IP1-IP4, MK1-MK4, GW1-GW4, FD1-FD4) require confirmation"
- "no unsolicited event descriptions found in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "TCP/IP / Ethernet control not covered — source covers RS-232 only"
- "power LED, splash screen, IRFM, smart light, DPM, EDID commands partially documented"
- "DNS email alert and network enable parameters partially documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
