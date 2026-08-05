---
spec_id: admin/samsung-qbxxb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung QBxxB Series Control Spec"
manufacturer: Samsung
model_family: "Samsung QBxxB Series"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "Samsung QBxxB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - image-us.samsung.com
  - justaddpower.happyfox.com
  - displaysolutions.samsung.com
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://justaddpower.happyfox.com/kb/article/245-samsung-rs232-control-rs232c
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-IP-Control.pdf
  - https://displaysolutions.samsung.com/support/download-center/mdc
retrieved_at: 2026-07-25T10:29:04.973Z
last_checked_at: 2026-08-05T08:44:32.705Z
generated_at: 2026-08-05T08:44:32.705Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact QBxxB model variants and which subset of MDC commands each supports. Source explicitly notes \"Depends on each model spec, a certain command will be supported or not\"."
  - "firmware version compatibility not stated in source."
  - "source document is a shared MDC reference, not a QBxxB-specific manual. Command support per-model should be verified against device."
  - "explicit enumeration of ERR code values not present in source."
  - "no standalone Variables section defined by source."
  - "no event/notification mechanism described."
  - "source contains no explicit power-on sequencing or hardware interlock"
  - "exact QBxxB SKU list and which MDC commands each SKU supports."
  - "firmware version compatibility range not stated."
  - "ERR code value table not present in source."
  - "precise checksum byte for each example command not pre-computed (computed at runtime per framing rule)."
  - "source is generic MDC; a QBxxB-specific manual would confirm or restrict the command set."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:44:32.705Z
  matched_actions: 300
  action_count: 300
  confidence: medium
  summary: "All 300 spec actions map to MDC opcodes documented in the source; transport framing and codes match; no shape drift or fabricated commands. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Samsung QBxxB Series Control Spec

## Summary
Samsung QBxxB Series commercial signage displays controlled via Samsung MDC (Multiple Display Control) protocol. Supports both RS-232C (9600 8N1, 3-wire) and RJ45 TCP/IP (default port 1515). The source document is "SEC-VD-DSW Multiple Display Control Ver. 13.7c 2016-02-23" — a generic MDC protocol reference covering Samsung LFD / signage lines. QBxxB is not enumerated by name in the source's model table; coverage assumes the QBxxB family ships with this MDC implementation.

<!-- UNRESOLVED: exact QBxxB model variants and which subset of MDC commands each supports. Source explicitly notes "Depends on each model spec, a certain command will be supported or not". -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: source document is a shared MDC reference, not a QBxxB-specific manual. Command support per-model should be verified against device. -->

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
  flow_control: none
  connector: DB-9  # pins 2 (RxD), 3 (TxD), 5 (GND)
  max_cable_length_m: 4  # source: "Limit the distance between devices to less than 4m"
addressing:
  default_ip: 192.168.0.10  # stated for RJ45 MDC
  port: 1515
auth:
  type: none  # inferred: no auth procedure in source
framing:
  header_byte: "0xAA"
  byte_order: hex
  checksum: "sum of all bytes AFTER the header (cmd + id + datalen + data) mod 256; discard carry above two hex digits. Source example: 0x11+0xFE+0x01+0x01 = 0x111 -> 0x11. Header 0xAA is NOT included in the sum."
  broadcast_id: "0xFE"  # all sets obey Set commands; no ACK returned
```

## Traits
```yaml
traits:
  - powerable       # inferred: 0x11 Power Control (on/off/reboot)
  - routable        # inferred: 0x14 Input Source Control
  - queryable       # inferred: numerous Get commands (Status, Power, Volume, etc.)
  - levelable       # inferred: Volume / Contrast / Brightness / EQ / Lamp etc.
```

## Actions
```yaml
# Framing: {cmd} = "AA {opcode} {id} {datalen} {data...} {chk}"
# {id} = target display ID (hex). 0xFE = broadcast (no ACK).
# {chk} = checksum byte = (sum of bytes from header to last data) mod 256.
# Source: "If you want to control every mechanism... set ID part to 0xFE... each SET
# will follow commands but it will not respond with ACK."
# Get commands use Data Length 0x00 (no data bytes); Set commands carry data bytes.
#
# Per coverage policy each enumerated opcode / sub-opcode row in source is a separate
# action. Where source lists distinct Get and Set bullets for one opcode, both are
# emitted. Sub-commands of 0xC6/0xC7/0xC8/0xCA and 0xC0 RTV are emitted as separate
# actions per source row.

# ---- 0x00 Status Control ----
- id: status_get
  label: Get Status
  kind: query
  command: "AA 00 {id} 00 {chk}"
  params: []
  response: "AA FF {id} 09 'A' 00 {Power} {Volume} {Mute} {Input} {Aspect} {NTimeNF} {FTimeNF} {chk}"

# ---- 0x04 Video Control ----
- id: video_status_get
  label: Get Video Status
  kind: query
  command: "AA 04 {id} 00 {chk}"
  params: []

# ---- 0x06 RGB Control ----
- id: rgb_status_get
  label: Get RGB Status
  kind: query
  command: "AA 06 {id} 00 {chk}"
  params: []

# ---- 0x07 PIP Status Control ----
- id: pip_status_get
  label: Get PIP Status
  kind: query
  command: "AA 07 {id} 00 {chk}"
  params: []

# ---- 0x08 Maintenance Control ----
- id: maintenance_status_get
  label: Get Maintenance Status
  kind: query
  command: "AA 08 {id} 00 {chk}"
  params: []
  note: "Response data length is 0x15 or 0x19 depending on model."

# ---- 0x09 Sound Control ----
- id: audio_status_get
  label: Get Audio Status
  kind: query
  command: "AA 09 {id} 00 {chk}"
  params: []

# ---- 0x0B Serial Number Control ----
- id: serial_number_get
  label: Get Serial Number
  kind: query
  command: "AA 0B {id} 00 {chk}"
  params: []

# ---- 0x0D Display Status Control ----
- id: display_status_get
  label: Get Display Status
  kind: query
  command: "AA 0D {id} 00 {chk}"
  params: []

# ---- 0x0E SW Version Control ----
- id: sw_version_get
  label: Get SW Version
  kind: query
  command: "AA 0E {id} 00 {chk}"
  params: []

# ---- 0x0F Auto Motion Plus ----
- id: auto_motion_plus_get
  label: Get Auto Motion Plus
  kind: query
  command: "AA 0F {id} 00 {chk}"
  params: []
- id: auto_motion_plus_set
  label: Set Auto Motion Plus
  kind: action
  command: "AA 0F {id} 03 {Mode} {BlurReduction} {JudderReduction} {chk}"
  params:
    - name: Mode
      type: integer
      description: "0=Off, 1=Clear, 2=Standard, 3=Smooth, 4=Custom, 5=Demo"
    - name: BlurReduction
      type: integer
      description: "0~10 (Custom only)"
    - name: JudderReduction
      type: integer
      description: "0~10 (Custom only)"

# ---- 0x10 Model Number Control ----
- id: model_number_get
  label: Get Model Number
  kind: query
  command: "AA 10 {id} 00 {chk}"
  params: []

# ---- 0x11 Power Control ----
- id: power_get
  label: Get Power ON/OFF Status
  kind: query
  command: "AA 11 {id} 00 {chk}"
  params: []
- id: power_set
  label: Set Power ON/OFF
  kind: action
  command: "AA 11 {id} 01 {Power} {chk}"
  params:
    - name: Power
      type: integer
      description: "0x00=Power OFF, 0x01=Power ON, 0x02=Reboot"
  note: "RJ45 power-on requires socket reconnect after 10 sec. If monitor is power-off on RJ45, transmit WOL (not MDC) to power on. Retry Power On/Off 3 times every 2 sec until ACK."

# ---- 0x12 Volume Control ----
- id: volume_get
  label: Get Volume
  kind: query
  command: "AA 12 {id} 00 {chk}"
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  command: "AA 12 {id} 01 {Volume} {chk}"
  params:
    - name: Volume
      type: integer
      description: "0~100"

# ---- 0x13 Mute Control ----
- id: mute_get
  label: Get Mute Status
  kind: query
  command: "AA 13 {id} 00 {chk}"
  params: []
- id: mute_set
  label: Set Mute ON/OFF
  kind: action
  command: "AA 13 {id} 01 {Mute} {chk}"
  params:
    - name: Mute
      type: integer
      description: "0x00=Mute OFF, 0x01=Mute ON"

# ---- 0x14 Input Source Control ----
- id: input_source_get
  label: Get Input Source
  kind: query
  command: "AA 14 {id} 00 {chk}"
  params: []
- id: input_source_set
  label: Set Input Source
  kind: action
  command: "AA 14 {id} 01 {Input} {chk}"
  params:
    - name: Input
      type: integer
      description: >
        Source code. 0x04=S-Video, 0x08=Component, 0x0C=AV1(AV), 0x0D=AV2,
        0x0E=Ext.(SCART1), 0x18=DVI, 0x14=PC, 0x1E=BNC, 0x1F=DVI_VIDEO,
        0x20=MagicInfo, 0x21=HDMI1, 0x22=HDMI1_PC, 0x23=HDMI2, 0x24=HDMI2_PC,
        0x25=DisplayPort1, 0x26=DisplayPort2, 0x27=DisplayPort3, 0x31=HDMI3,
        0x32=HDMI3_PC, 0x33=HDMI4, 0x34=HDMI4_PC, 0x40=TV(DTV),
        0x50=Plug In Module, 0x55=HDBaseT, 0x60=Media/MagicInfo S,
        0x61=WiDi/Screen Mirroring, 0x62=Internal/USB, 0x63=URL Launcher, 0x64=IWB

# ---- 0x15 Picture Size Control ----
- id: picture_size_get
  label: Get Picture Size
  kind: query
  command: "AA 15 {id} 00 {chk}"
  params: []
- id: picture_size_set
  label: Set Picture Size
  kind: action
  command: "AA 15 {id} 01 {Aspect} {chk}"
  params:
    - name: Aspect
      type: integer
      description: >
        PC Mode: 0x10=16:9, 0x18=4:3, 0x20=Original Ratio, 0x21=21:9.
        Video Mode: 0x00=Auto/Wide, 0x01=16:9, 0x04=Zoom, 0x05=Zoom1, 0x06=Zoom2,
        0x09=Just Scan(Screen Fit), 0x0B=4:3, 0x0C=Wide Fit, 0x0D=Custom,
        0x0E=Smart View 1, 0x0F=Smart View 2, 0x31=Wide Zoom, 0x32=21:9.

# ---- 0x17 Direct Channel Control (DTV) ----
- id: direct_channel_get
  label: Get Channel
  kind: query
  command: "AA 17 {id} 00 {chk}"
  params: []
- id: direct_channel_set
  label: Set Channel
  kind: action
  command: "AA 17 {id} 08 {Country} {ATV_DTV} {AirCable} {CH_NUM_H} {CH_NUM_L} {Sel_Minor} {Minor_CH_H} {Minor_CH_L} {chk}"
  params:
    - {name: Country, type: integer, description: "0=Korea, 1=USA, ..."}
    - {name: ATV_DTV, type: integer, description: "0=Analog TV, 1=Digital TV"}
    - {name: AirCable, type: integer, description: "0=general(air), 1=cable"}
    - {name: CH_NUM_H, type: integer, description: "Channel number high byte"}
    - {name: CH_NUM_L, type: integer, description: "Channel number low byte"}
    - {name: Sel_Minor, type: integer, description: "0=not selected, 1=selected"}
    - {name: Minor_CH_H, type: integer, description: "Minor channel high byte (0~999)"}
    - {name: Minor_CH_L, type: integer, description: "Minor channel low byte (0~999)"}

# ---- 0x18 Screen Mode Control ----
- id: screen_mode_get
  label: Get Screen Mode
  kind: query
  command: "AA 18 {id} 00 {chk}"
  params: []
- id: screen_mode_set
  label: Set Screen Mode
  kind: action
  command: "AA 18 {id} 01 {ScrMode} {chk}"
  params:
    - name: ScrMode
      type: integer
      description: "0x01=16:9, 0x04=Zoom, 0x0B=4:3, 0x31=Wide Zoom"

# ---- 0x19 Screen Size Control ----
- id: screen_size_get
  label: Get Screen Size
  kind: query
  command: "AA 19 {id} 00 {chk}"
  params: []

# ---- 0x1D MDC Connection Type ----
- id: mdc_connection_type_get
  label: Get MDC Connection Type
  kind: query
  command: "AA 1D {id} 00 {chk}"
  params: []

# ---- 0x24 Contrast Control ----
- id: contrast_get
  label: Get Contrast
  kind: query
  command: "AA 24 {id} 00 {chk}"
  params: []
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "AA 24 {id} 01 {Contrast} {chk}"
  params:
    - {name: Contrast, type: integer, description: "0~100"}

# ---- 0x25 Brightness Control ----
- id: brightness_get
  label: Get Brightness
  kind: query
  command: "AA 25 {id} 00 {chk}"
  params: []
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "AA 25 {id} 01 {Brightness} {chk}"
  params:
    - {name: Brightness, type: integer, description: "0~100"}

# ---- 0x26 Sharpness Control ----
- id: sharpness_get
  label: Get Sharpness
  kind: query
  command: "AA 26 {id} 00 {chk}"
  params: []
- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "AA 26 {id} 01 {Sharpness} {chk}"
  params:
    - {name: Sharpness, type: integer, description: "0~100"}

# ---- 0x27 Color Control ----
- id: color_get
  label: Get Color
  kind: query
  command: "AA 27 {id} 00 {chk}"
  params: []
- id: color_set
  label: Set Color
  kind: action
  command: "AA 27 {id} 01 {Color} {chk}"
  params:
    - {name: Color, type: integer, description: "0~100"}

# ---- 0x28 Tint Control ----
- id: tint_get
  label: Get Tint
  kind: query
  command: "AA 28 {id} 00 {chk}"
  params: []
- id: tint_set
  label: Set Tint
  kind: action
  command: "AA 28 {id} 01 {Tint} {chk}"
  params:
    - {name: Tint, type: integer, description: "0~100 in steps of 2 (50 steps)"}

# ---- 0x2F Coarse Control ----
- id: coarse_set
  label: Set Coarse
  kind: action
  command: "AA 2F {id} 01 {Coarse} {chk}"
  params:
    - {name: Coarse, type: integer, description: "0x00=Decrease, 0x01=Increase"}

# ---- 0x30 Fine Control ----
- id: fine_set
  label: Set Fine
  kind: action
  command: "AA 30 {id} 01 {Fine} {chk}"
  params:
    - {name: Fine, type: integer, description: "0x00=Decrease, 0x01=Increase"}

# ---- 0x31 H-Position Control ----
- id: h_position_set
  label: Set H-Position
  kind: action
  command: "AA 31 {id} 01 {HPos} {chk}"
  params:
    - {name: HPos, type: integer, description: "0x00=Left, 0x01=Right"}

# ---- 0x32 V-Position Control ----
- id: v_position_set
  label: Set V-Position
  kind: action
  command: "AA 32 {id} 01 {VPos} {chk}"
  params:
    - {name: VPos, type: integer, description: "0x00=Up, 0x01=Down"}

# ---- 0x33 Auto Power ----
- id: auto_power_get
  label: Get Auto Power
  kind: query
  command: "AA 33 {id} 00 {chk}"
  params: []
- id: auto_power_set
  label: Set Auto Power
  kind: action
  command: "AA 33 {id} 01 {AutoPower} {chk}"
  params:
    - {name: AutoPower, type: integer, description: "0x00=Auto Power Off, 0x01=Auto Power On"}

# ---- 0x34 Clear Menu Control ----
- id: clear_menu_set
  label: Set Clear Menu
  kind: action
  command: "AA 34 {id} 01 00 {chk}"
  params: []

# ---- 0x36 Remote Control (IR Lock) ----
- id: ir_lock_get
  label: Get IR Lock Status
  kind: query
  command: "AA 36 {id} 00 {chk}"
  params: []
- id: ir_lock_set
  label: Set IR Lock
  kind: action
  command: "AA 36 {id} 01 {RMC} {chk}"
  params:
    - {name: RMC, type: integer, description: "0x00=Remocon Disable, 0x01=Remocon Enable"}

# ---- 0x37 RGB Contrast Control ----
- id: rgb_contrast_get
  label: Get RGB Contrast
  kind: query
  command: "AA 37 {id} 00 {chk}"
  params: []
- id: rgb_contrast_set
  label: Set RGB Contrast
  kind: action
  command: "AA 37 {id} 01 {Contrast} {chk}"
  params:
    - {name: Contrast, type: integer, description: "0~100"}

# ---- 0x38 RGB Brightness Control ----
- id: rgb_brightness_get
  label: Get RGB Brightness
  kind: query
  command: "AA 38 {id} 00 {chk}"
  params: []
- id: rgb_brightness_set
  label: Set RGB Brightness
  kind: action
  command: "AA 38 {id} 01 {Brightness} {chk}"
  params:
    - {name: Brightness, type: integer, description: "0~100"}

# ---- 0x3C PIP On/Off Control ----
- id: pip_onoff_get
  label: Get PIP ON/OFF
  kind: query
  command: "AA 3C {id} 00 {chk}"
  params: []
- id: pip_onoff_set
  label: Set PIP ON/OFF
  kind: action
  command: "AA 3C {id} 01 {PIP} {chk}"
  params:
    - {name: PIP, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x3D Auto Adjustment Control ----
- id: auto_adjustment_set
  label: Set Auto Adjustment
  kind: action
  command: "AA 3D {id} 01 00 {chk}"
  params: []

# ---- 0x3E Color Tone Control ----
- id: color_tone_get
  label: Get Color Tone
  kind: query
  command: "AA 3E {id} 00 {chk}"
  params: []
- id: color_tone_set
  label: Set Color Tone
  kind: action
  command: "AA 3E {id} 01 {ColorTone} {chk}"
  params:
    - name: ColorTone
      type: integer
      description: "0x00=Cool2, 0x01=Cool1(Cool), 0x02=Normal(Standard), 0x03=Warm1, 0x04=Warm2, 0x50=Off"

# ---- 0x3F Color Temperature Control ----
- id: color_temperature_get
  label: Get Color Temperature
  kind: query
  command: "AA 3F {id} 00 {chk}"
  params: []
- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  command: "AA 3F {id} 01 {C_Temp} {chk}"
  params:
    - name: C_Temp
      type: integer
      description: >
        Extended code: 0x1C=2800K, 0x1E=3000K ... 0xA0=16000K (see source table).
        Legacy: 0x00~0x10=5000K~15000K, 0xFD=2800K, 0xFE=3000K, 0xFF=4000K.

# ---- 0x40 PIP Source Control ----
- id: pip_source_get
  label: Get PIP Source
  kind: query
  command: "AA 40 {id} 00 {chk}"
  params: []
- id: pip_source_set
  label: Set PIP Source
  kind: action
  command: "AA 40 {id} 01 {PSource} {chk}"
  params:
    - {name: PSource, type: integer, description: "Input source code (see 0x14)"}

# ---- 0x42 PIP Size Control ----
- id: pip_size_get
  label: Get PIP Size
  kind: query
  command: "AA 42 {id} 00 {chk}"
  params: []
- id: pip_size_set
  label: Set PIP Size
  kind: action
  command: "AA 42 {id} 01 {PSize} {chk}"
  params:
    - name: PSize
      type: integer
      description: >
        0x00=PIP Off, 0x04=Double1(Double Window), 0x05=Double2(Double Wide),
        0x06=Medium, 0x07=Large, 0x08=Small, 0x09=Double3(POP), 0x10=Custom

# ---- 0x43 PIP Locate Control ----
- id: pip_locate_get
  label: Get PIP Locate
  kind: query
  command: "AA 43 {id} 00 {chk}"
  params: []
- id: pip_locate_set
  label: Set PIP Locate
  kind: action
  command: "AA 43 {id} 01 {PLocate} {chk}"
  params:
    - name: PLocate
      type: integer
      description: "0x00=Off(Get only), 0x01=Upper Left, 0x02=Upper Right, 0x03=Lower Right, 0x04=Lower Left"

# ---- 0x44 Fan Speed Setting ----
- id: fan_speed_get
  label: Get Fan Speed
  kind: query
  command: "AA 44 {id} 00 {chk}"
  params: []
- id: fan_speed_set
  label: Set Fan Speed
  kind: action
  command: "AA 44 {id} 01 {FANSpeed} {chk}"
  params:
    - {name: FANSpeed, type: integer, description: "0~100 (also sets Fan Control to Manual)"}

# ---- 0x45 User Auto Color ----
- id: user_auto_color_set
  label: Set User Auto Color
  kind: action
  command: "AA 45 {id} 01 {AutoColorCmd} {chk}"
  params:
    - {name: AutoColorCmd, type: integer, description: "0x00=Reset, 0x01=Auto Color"}

# ---- 0x47 Sound Select Control ----
- id: sound_select_47_get
  label: Get Sound Select (0x47)
  kind: query
  command: "AA 47 {id} 00 {chk}"
  params: []
- id: sound_select_47_set
  label: Set Sound Select (0x47)
  kind: action
  command: "AA 47 {id} 01 {SSelect} {chk}"
  params:
    - {name: SSelect, type: integer, description: "0x00=Sub, 0x01=Main"}

# ---- 0x48 Auto Volume Control ----
- id: auto_volume_get
  label: Get Auto Volume
  kind: query
  command: "AA 48 {id} 00 {chk}"
  params: []
- id: auto_volume_set
  label: Set Auto Volume
  kind: action
  command: "AA 48 {id} 01 {A_VOL} {chk}"
  params:
    - {name: A_VOL, type: integer, description: "0x00=OFF, 0x01=Normal(On), 0x02=Night"}

# ---- 0x4A Standby Control ----
- id: standby_get
  label: Get Standby Setting
  kind: query
  command: "AA 4A {id} 00 {chk}"
  params: []
- id: standby_set
  label: Set Standby Setting
  kind: action
  command: "AA 4A {id} 01 {StandbySetting} {chk}"
  params:
    - {name: StandbySetting, type: integer, description: "0x00=Off, 0x01=On, 0x02=Auto"}

# ---- 0x4B Video Picture Position & Size ----
- id: video_pic_pos_size_set
  label: Set Video Picture Position & Size
  kind: action
  command: "AA 4B {id} 02 {TypeCMD} {DirectionCMD} {chk}"
  params:
    - {name: TypeCMD, type: integer, description: "0x00=Reset, 0x01=Position, 0x02=Size, 0x03=RESERVED"}
    - name: DirectionCMD
      type: integer
      description: >
        Position: 0x00=Down, 0x01=Up, 0x02=Left, 0x03=Right.
        Size: 0x00=V Scale Down, 0x01=V Scale Up, 0x02=H Scale Down, 0x03=H Scale Up.

# ---- 0x4C Pixel Shift Control ----
- id: pixel_shift_get
  label: Get Pixel Shift
  kind: query
  command: "AA 4C {id} 00 {chk}"
  params: []
- id: pixel_shift_set
  label: Set Pixel Shift
  kind: action
  command: "AA 4C {id} 04 {Shift} {HDot} {VLine} {STime} {chk}"
  params:
    - {name: Shift, type: integer, description: "0x00=OFF, 0x01=ON"}
    - {name: HDot, type: integer, description: "0~4"}
    - {name: VLine, type: integer, description: "0~4"}
    - {name: STime, type: integer, description: "1~4"}

# ---- 0x51 EQ 100Hz Control ----
- id: eq_100hz_get
  label: Get EQ 100Hz
  kind: query
  command: "AA 51 {id} 00 {chk}"
  params: []
- id: eq_100hz_set
  label: Set EQ 100Hz
  kind: action
  command: "AA 51 {id} 01 {EQ100Hz} {chk}"
  params:
    - {name: EQ100Hz, type: integer, description: "0~20"}

# ---- 0x52 EQ 300Hz Control ----
- id: eq_300hz_get
  label: Get EQ 300Hz
  kind: query
  command: "AA 52 {id} 00 {chk}"
  params: []
- id: eq_300hz_set
  label: Set EQ 300Hz
  kind: action
  command: "AA 52 {id} 01 {EQ300Hz} {chk}"
  params:
    - {name: EQ300Hz, type: integer, description: "0~20"}

# ---- 0x53 EQ 1kHz Control ----
- id: eq_1khz_get
  label: Get EQ 1kHz
  kind: query
  command: "AA 53 {id} 00 {chk}"
  params: []
- id: eq_1khz_set
  label: Set EQ 1kHz
  kind: action
  command: "AA 53 {id} 01 {EQ1kHz} {chk}"
  params:
    - {name: EQ1kHz, type: integer, description: "0~20"}

# ---- 0x54 EQ 3kHz Control ----
- id: eq_3khz_get
  label: Get EQ 3kHz
  kind: query
  command: "AA 54 {id} 00 {chk}"
  params: []
- id: eq_3khz_set
  label: Set EQ 3kHz
  kind: action
  command: "AA 54 {id} 01 {EQ3kHz} {chk}"
  params:
    - {name: EQ3kHz, type: integer, description: "0~20"}

# ---- 0x55 EQ 10kHz Control ----
- id: eq_10khz_get
  label: Get EQ 10kHz
  kind: query
  command: "AA 55 {id} 00 {chk}"
  params: []
- id: eq_10khz_set
  label: Set EQ 10kHz
  kind: action
  command: "AA 55 {id} 01 {EQ10kHz} {chk}"
  params:
    - {name: EQ10kHz, type: integer, description: "0~20"}

# ---- 0x57 Auto Lamp Control ----
- id: auto_lamp_get
  label: Get Auto Lamp
  kind: query
  command: "AA 57 {id} 00 {chk}"
  params: []
- id: auto_lamp_set
  label: Set Auto Lamp
  kind: action
  command: "AA 57 {id} 08 {LMax_H} {LMax_M} {LMax_AP} {LMaxValue} {LMin_H} {LMin_M} {LMin_AP} {LMinValue} {chk}"
  params:
    - {name: LMax_H, type: integer, description: "Max time hour 1~12"}
    - {name: LMax_M, type: integer, description: "Max time minute 0~59"}
    - {name: LMax_AP, type: integer, description: "Max AM/PM (1=AM, 0=PM)"}
    - {name: LMaxValue, type: integer, description: "Max value 0~100"}
    - {name: LMin_H, type: integer, description: "Min time hour 1~12"}
    - {name: LMin_M, type: integer, description: "Min time minute 0~59"}
    - {name: LMin_AP, type: integer, description: "Min AM/PM (1=AM, 0=PM)"}
    - {name: LMinValue, type: integer, description: "Min value 0~100; 0xFF=Auto Lamp OFF"}

# ---- 0x58 Manual Lamp Control ----
- id: manual_lamp_get
  label: Get Manual Lamp
  kind: query
  command: "AA 58 {id} 00 {chk}"
  params: []
- id: manual_lamp_set
  label: Set Manual Lamp
  kind: action
  command: "AA 58 {id} 01 {LampValue} {chk}"
  params:
    - {name: LampValue, type: integer, description: "0~100; 0xFF=Manual Lamp OFF"}

# ---- 0x59 Safety Screen Run Control ----
- id: safety_screen_run_get
  label: Get Safety Screen Run Status
  kind: query
  command: "AA 59 {id} 00 {chk}"
  params: []
- id: safety_screen_run_set
  label: Set Safety Screen Run
  kind: action
  command: "AA 59 {id} 01 {SafetyScreenType} {chk}"
  params:
    - name: SafetyScreenType
      type: integer
      description: >
        0x00=Off, 0x01=Signal Pattern, 0x02=All White, 0x03=Scroll, 0x04=Bar,
        0x06=Eraser, 0x07=Pixel, 0x10=Rolling Bar, 0x11=Fading Screen

# ---- 0x5A Inverse Control ----
- id: inverse_get
  label: Get Inverse
  kind: query
  command: "AA 5A {id} 00 {chk}"
  params: []
- id: inverse_set
  label: Set Inverse
  kind: action
  command: "AA 5A {id} 01 {Inverse} {chk}"
  params:
    - {name: Inverse, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x5B Safety Screen Control ----
- id: safety_screen_get
  label: Get Safety Screen
  kind: query
  command: "AA 5B {id} 00 {chk}"
  params: []
- id: safety_screen_set_repeat
  label: Set Safety Screen (Repeat timer)
  kind: action
  command: "AA 5B {id} 03 {Type} {TPeriod} {TTime} {chk}"
  params:
    - name: Type
      type: integer
      description: "Repeat type. 0x03=Scroll, 0x04=Pixel, 0x05=Bar, 0x06=Eraser, 0x09=All White, 0x0A=Pattern, 0x10=Rolling Bar, 0x11=Fading Screen (0x00=OFF)"
    - {name: TPeriod, type: integer, description: "Timer period hour 1~10"}
    - {name: TTime, type: integer, description: "Timer time code (0x01=10s .. 0x05=50s)"}
- id: safety_screen_set_interval
  label: Set Safety Screen (Interval timer)
  kind: action
  command: "AA 5B {id} 07 {Type} {StartHour} {StartMin} {StartAMPM} {EndHour} {EndMin} {EndAMPM} {chk}"
  params:
    - name: Type
      type: integer
      description: "Interval type (MSB=1). 0x83=Scroll, 0x84=Pixel, 0x85=Bar, 0x86=Eraser, 0x89=All White, 0x8A=Pattern, 0x90=Rolling Bar, 0x91=Fading Screen"
    - {name: StartHour, type: integer, description: "1~12"}
    - {name: StartMin, type: integer, description: "0~59"}
    - {name: StartAMPM, type: integer, description: "1=AM, 0=PM"}
    - {name: EndHour, type: integer, description: "1~12"}
    - {name: EndMin, type: integer, description: "0~59"}
    - {name: EndAMPM, type: integer, description: "1=AM, 0=PM"}

# ---- 0x5C Video Wall Mode Control ----
- id: video_wall_mode_get
  label: Get Video Wall Mode
  kind: query
  command: "AA 5C {id} 00 {chk}"
  params: []
- id: video_wall_mode_set
  label: Set Video Wall Mode
  kind: action
  command: "AA 5C {id} 01 {WallMode} {chk}"
  params:
    - {name: WallMode, type: integer, description: "0x00=Full, 0x01=Natural"}

# ---- 0x5D Safety Lock ----
- id: safety_lock_get
  label: Get Safety Lock
  kind: query
  command: "AA 5D {id} 00 {chk}"
  params: []
- id: safety_lock_set
  label: Set Safety Lock
  kind: action
  command: "AA 5D {id} 01 {Lock} {chk}"
  params:
    - {name: Lock, type: integer, description: "0x00=Off, 0x01=On"}

# ---- 0x5F Panel Key Lock Control (MFM) ----
- id: panel_key_lock_get
  label: Get Panel Button Lock
  kind: query
  command: "AA 5F {id} 00 {chk}"
  params: []
- id: panel_key_lock_set
  label: Set Panel Button Lock
  kind: action
  command: "AA 5F {id} 01 {ButtonLock} {chk}"
  params:
    - {name: ButtonLock, type: integer, description: "0x00=Unlock, 0x01=Lock"}

# ---- 0x61 Channel Up/Down ----
- id: channel_updown_set
  label: Set TV Channel Up/Down
  kind: action
  command: "AA 61 {id} 01 {ChannelUpDown} {chk}"
  params:
    - {name: ChannelUpDown, type: integer, description: "0x00=Up, 0x01=Down"}

# ---- 0x62 Volume Up/Down ----
- id: volume_updown_set
  label: Set Volume Up/Down
  kind: action
  command: "AA 62 {id} 01 {VolumeUpDown} {chk}"
  params:
    - {name: VolumeUpDown, type: integer, description: "0x00=Up, 0x01=Down"}

# ---- 0x63 Ticker ----
- id: ticker_get
  label: Get Ticker Status
  kind: query
  command: "AA 63 {id} 00 {chk}"
  params: []
- id: ticker_set
  label: Set Ticker
  kind: action
  command: "AA 63 {id} {Length} {TickerOnOff} {StartHour} {StartMin} {StartAMPM} {EndHour} {EndMin} {EndAMPM} {PosH} {PosV} {MotionOnOff} {MotionDir} {MotionSpeed} {FontSize} {FGColor} {BGColor} {FGOpacity} {BGOpacity} {MsgData...} {chk}"
  params:
    - {name: Length, type: integer, description: "Variable data length 0~128"}
    - {name: TickerOnOff, type: integer, description: "0x00=Off, 0x01=On"}
    - name: MsgData
      type: string
      description: "Ticker message as Unicode hex bytes (up to 111 words)"

# ---- 0x65 Sound Select Control ----
- id: sound_select_65_get
  label: Get Sound Select (0x65)
  kind: query
  command: "AA 65 {id} 00 {chk}"
  params: []
- id: sound_select_65_set
  label: Set Sound Select (0x65)
  kind: action
  command: "AA 65 {id} 01 {SSelect} {chk}"
  params:
    - {name: SSelect, type: integer, description: "0x00=Sub, 0x01=Main"}

# ---- 0x66 PC Module Detect ----
- id: pc_module_detect_get
  label: Get PC Module Detect
  kind: query
  command: "AA 66 {id} 00 {chk}"
  params: []

# ---- 0x67 Device Name ----
- id: device_name_get
  label: Get Device Name
  kind: query
  command: "AA 67 {id} 00 {chk}"
  params: []

# ---- 0x68 Speaker Select ----
- id: speaker_select_get
  label: Get Speaker Select
  kind: query
  command: "AA 68 {id} 00 {chk}"
  params: []
- id: speaker_select_set
  label: Set Speaker Select
  kind: action
  command: "AA 68 {id} 01 {SSelect} {chk}"
  params:
    - {name: SSelect, type: integer, description: "0x00=Internal, 0x01=External"}

# ---- 0x70 OSD On/Off ----
- id: osd_onoff_get
  label: Get OSD Enable Status
  kind: query
  command: "AA 70 {id} 00 {chk}"
  params: []
- id: osd_onoff_set
  label: Set OSD Enable/Disable
  kind: action
  command: "AA 70 {id} 01 {OSD} {chk}"
  params:
    - {name: OSD, type: integer, description: "0x00=OSD Off, 0x01=OSD On"}

# ---- 0x71 P.Mode Control ----
- id: picture_mode_get
  label: Get Picture Mode
  kind: query
  command: "AA 71 {id} 00 {chk}"
  params: []
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: "AA 71 {id} 01 {PMode} {chk}"
  params:
    - name: PMode
      type: integer
      description: >
        Video sources: 0x00=Dynamic, 0x01=Standard, 0x02=Movie, 0x03=Custom,
        0x04=Natural, 0x05=Calibration, 0x50=Off. PC sources: 0x10=Entertain,
        0x11=Internet, 0x12=Text, 0x13=Custom, 0x14=Advertisement, 0x15=Information,
        0x16=Calibration, 0x50=Off. All: 0x20=Shop&Mall-Video, 0x21=Shop&Mall-Text,
        0x22=Office&School-Video, 0x23=Office&School-Text, 0x24=Terminal&Station-Video,
        0x25=Terminal&Station-Text, 0x26=Videowall-Video, 0x27=Videowall-Text.

# ---- 0x72 S.Mode Control ----
- id: sound_mode_get
  label: Get Sound Mode
  kind: query
  command: "AA 72 {id} 00 {chk}"
  params: []
- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  command: "AA 72 {id} 01 {SMode} {chk}"
  params:
    - name: SMode
      type: integer
      description: "0x00=Standard, 0x01=Music, 0x02=Movie, 0x03=Speech, 0x04=Custom, 0x05=Amplify"

# ---- 0x73 Digital NR Control ----
- id: digital_nr_get
  label: Get Digital NR
  kind: query
  command: "AA 73 {id} 00 {chk}"
  params: []
- id: digital_nr_set
  label: Set Digital NR
  kind: action
  command: "AA 73 {id} 01 {NRMode} {chk}"
  params:
    - name: NRMode
      type: integer
      description: "0x00=Off, 0x01=Low(On), 0x02=Medium, 0x03=High, 0x04=Auto, 0x05=Auto Visualization"

# ---- 0x75 PC Color Tone Control ----
- id: pc_color_tone_get
  label: Get PC Color Tone
  kind: query
  command: "AA 75 {id} 00 {chk}"
  params: []
- id: pc_color_tone_set
  label: Set PC Color Tone
  kind: action
  command: "AA 75 {id} 01 {ColorTone} {chk}"
  params:
    - name: ColorTone
      type: integer
      description: "0x00=Custom, 0x01=Cool, 0x02=Normal, 0x03=Warm, 0x50=Off"

# ---- 0x76 Auto Auto Adjustment ----
- id: auto_auto_adjustment_get
  label: Get Auto Adjustment Enable
  kind: query
  command: "AA 76 {id} 00 {chk}"
  params: []
- id: auto_auto_adjustment_set
  label: Set Auto Adjustment Enable
  kind: action
  command: "AA 76 {id} 01 {AAdjustment} {chk}"
  params:
    - {name: AAdjustment, type: integer, description: "0=Disable, 1=Enable"}

# ---- 0x77 All Keys Lock ----
- id: all_keys_lock_get
  label: Get All Keys Lock
  kind: query
  command: "AA 77 {id} 00 {chk}"
  params: []
- id: all_keys_lock_set
  label: Set All Keys Lock
  kind: action
  command: "AA 77 {id} 01 {AKL} {chk}"
  params:
    - {name: AKL, type: integer, description: "0x00=OFF, 0x01=ON (locks Remocon + Panel Keys)"}

# ---- 0x78 SRS TSXT Control ----
- id: srs_tsxt_get
  label: Get SRS TS XT
  kind: query
  command: "AA 78 {id} 00 {chk}"
  params: []
- id: srs_tsxt_set
  label: Set SRS TSXT
  kind: action
  command: "AA 78 {id} 01 {SRS} {chk}"
  params:
    - {name: SRS, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x79 Film Mode Control ----
- id: film_mode_get
  label: Get Film Mode
  kind: query
  command: "AA 79 {id} 00 {chk}"
  params: []
- id: film_mode_set
  label: Set Film Mode
  kind: action
  command: "AA 79 {id} 01 {FMode} {chk}"
  params:
    - name: FMode
      type: integer
      description: "0x00=Off, 0x01=Auto1, 0x02=Auto2, 0x03=Cinema Smooth"

# ---- 0x83 Panel On Time ----
- id: panel_on_time_get
  label: Get Panel On Time
  kind: query
  command: "AA 83 {id} 00 {chk}"
  params: []

# ---- 0x84 Video Wall On ----
- id: video_wall_on_get
  label: Get Video Wall On/Off
  kind: query
  command: "AA 84 {id} 00 {chk}"
  params: []
- id: video_wall_on_set
  label: Set Video Wall On/Off
  kind: action
  command: "AA 84 {id} 01 {VWallOn} {chk}"
  params:
    - {name: VWallOn, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x85 Temperature Control ----
- id: temperature_get
  label: Get Temperature
  kind: query
  command: "AA 85 {id} 00 {chk}"
  params: []
- id: temperature_set
  label: Set Temperature
  kind: action
  command: "AA 85 {id} 01 {Temperature} {chk}"
  params:
    - {name: Temperature, type: integer, description: "75~124 (degrees C)"}

# ---- 0x86 Brightness Sensor ----
- id: brightness_sensor_get
  label: Get Brightness Sensor
  kind: query
  command: "AA 86 {id} 00 {chk}"
  params: []
- id: brightness_sensor_set
  label: Set Brightness Sensor
  kind: action
  command: "AA 86 {id} 01 {BR_Sensor} {chk}"
  params:
    - {name: BR_Sensor, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x87 Dynamic Contrast ----
- id: dynamic_contrast_get
  label: Get Dynamic Contrast
  kind: query
  command: "AA 87 {id} 00 {chk}"
  params: []
- id: dynamic_contrast_set
  label: Set Dynamic Contrast
  kind: action
  command: "AA 87 {id} 01 {DY_Cont} {chk}"
  params:
    - name: DY_Cont
      type: integer
      description: "0x00=OFF, 0x01=Low(On), 0x02=Medium, 0x03=High"

# ---- 0x89 Video Wall User Control ----
- id: video_wall_user_get
  label: Get Video Wall (User Control)
  kind: query
  command: "AA 89 {id} 00 {chk}"
  params: []
- id: video_wall_user_set
  label: Set Video Wall (User Control)
  kind: action
  command: "AA 89 {id} 02 {Wall_Div} {Wall_SNo} {chk}"
  params:
    - {name: Wall_Div, type: integer, description: "Wall divider code (H*16+V); see source 5x5/10x10/15x15 table"}
    - {name: Wall_SNo, type: integer, description: "Set number; 1~25 / 1~100 / 1~225 per model"}

# ---- 0x8A Model Name ----
- id: model_name_get
  label: Get Model Name
  kind: query
  command: "AA 8A {id} 00 {chk}"
  params: []

# ---- 0x8B Video Wall Direct User Control ----
- id: video_wall_direct_get
  label: Get Video Wall (Direct)
  kind: query
  command: "AA 8B {id} 00 {chk}"
  params: []
- id: video_wall_direct_set
  label: Set Video Wall (Direct)
  kind: action
  command: "AA 8B {id} 05 {VWallOn} {WallMode} {Wall_Div} {Wall_SNo} {Input} {chk}"
  params:
    - {name: VWallOn, type: integer, description: "0x00=OFF, 0x01=ON"}
    - {name: WallMode, type: integer, description: "0x00=Natural, 0x01=Full"}
    - {name: Wall_Div, type: integer, description: "Wall divider code (see 0x89)"}
    - {name: Wall_SNo, type: integer, description: "Set number (see 0x89)"}
    - {name: Input, type: integer, description: "Input source code (see 0x14)"}

# ---- 0x8F Fan Control ----
- id: fan_control_get
  label: Get Fan Control
  kind: query
  command: "AA 8F {id} 00 {chk}"
  params: []
- id: fan_control_set
  label: Set Fan Control
  kind: action
  command: "AA 8F {id} 01 {FAN} {chk}"
  params:
    - {name: FAN, type: integer, description: "0x00=Manual, 0x01=Auto"}

# ---- 0x92 Energy Saving ----
- id: energy_saving_get
  label: Get Energy Saving
  kind: query
  command: "AA 92 {id} 00 {chk}"
  params: []
- id: energy_saving_set
  label: Set Energy Saving
  kind: action
  command: "AA 92 {id} 01 {E_SAV} {chk}"
  params:
    - name: E_SAV
      type: integer
      description: "0x00=OFF, 0x01=Low(On), 0x02=Medium, 0x03=High, 0x04=Picture Off"

# ---- 0x94 HDMI Black Level Control ----
- id: hdmi_black_level_get
  label: Get HDMI Black Level
  kind: query
  command: "AA 94 {id} 00 {chk}"
  params: []
- id: hdmi_black_level_set
  label: Set HDMI Black Level
  kind: action
  command: "AA 94 {id} 01 {HDMI_b} {chk}"
  params:
    - {name: HDMI_b, type: integer, description: "0x00=Normal, 0x01=Low, 0x02=Auto"}

# ---- 0x95 Black Adjust Control ----
- id: black_adjust_get
  label: Get Black Adjust
  kind: query
  command: "AA 95 {id} 00 {chk}"
  params: []
- id: black_adjust_set
  label: Set Black Adjust
  kind: action
  command: "AA 95 {id} 01 {B_ADJ} {chk}"
  params:
    - name: B_ADJ
      type: integer
      description: "0x00=OFF/Dark, 0x01=Low(On)/Darker, 0x02=Medium/Darker, 0x03=High/Darkest"

# ---- 0x96 Gamma Control ----
- id: gamma_get
  label: Get Gamma
  kind: query
  command: "AA 96 {id} 00 {chk}"
  params: []
- id: gamma_set
  label: Set Gamma
  kind: action
  command: "AA 96 {id} 01 {GAMMA} {chk}"
  params:
    - name: GAMMA
      type: integer
      description: "0x00=0, 0x01..0x05=Mode1..5, 0x11..0x15=-1..-5, 0x20=Custom"

# ---- 0x9C Edge Enhancement Control ----
- id: edge_enhancement_get
  label: Get Edge Enhancement
  kind: query
  command: "AA 9C {id} 00 {chk}"
  params: []
- id: edge_enhancement_set
  label: Set Edge Enhancement
  kind: action
  command: "AA 9C {id} 01 {EDGE} {chk}"
  params:
    - {name: EDGE, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x9D Color Space Control ----
- id: color_space_get
  label: Get Color Space
  kind: query
  command: "AA 9D {id} 00 {chk}"
  params: []
- id: color_space_set
  label: Set Color Space
  kind: action
  command: "AA 9D {id} 01 {COS} {chk}"
  params:
    - {name: COS, type: integer, description: "0x00=Auto, 0x01=Native, 0x02=Custom"}

# ---- 0x9E xvYCC Control ----
- id: xvycc_get
  label: Get xvYCC
  kind: query
  command: "AA 9E {id} 00 {chk}"
  params: []
- id: xvycc_set
  label: Set xvYCC
  kind: action
  command: "AA 9E {id} 01 {XVYCC} {chk}"
  params:
    - {name: XVYCC, type: integer, description: "0x00=OFF, 0x01=ON"}

# ---- 0x9F Reset Control ----
- id: reset_set
  label: Set Reset
  kind: action
  command: "AA 9F {id} 01 {RST} {chk}"
  params:
    - name: RST
      type: integer
      description: "0x00=Picture, 0x01=Sound, 0x02=Setup(System), 0x03=All, 0x04=Screen Display"

# ---- 0xA1 Ambient Brightness Mode ----
- id: ambient_brightness_mode_get
  label: Get Ambient Brightness Mode
  kind: query
  command: "AA A1 {id} 00 {chk}"
  params: []
- id: ambient_brightness_mode_set
  label: Set Ambient Brightness Mode + Lamp Value
  kind: action
  command: "AA A1 {id} 03 {AB_Mode} {Valid_LampValue} {LampValue} {chk}"
  params:
    - {name: AB_Mode, type: integer, description: "0x00=Off, 0x01=On"}
    - {name: Valid_LampValue, type: integer, description: "0x00=Don't apply, 0x01=Apply"}
    - {name: LampValue, type: integer, description: "0~100"}

# ---- 0xA3 OSD Display Type On/Off ----
- id: osd_display_type_get
  label: Get OSD Display Type
  kind: query
  command: "AA A3 {id} 00 {chk}"
  params: []
- id: osd_display_type_set
  label: Set OSD Display Type On/Off
  kind: action
  command: "AA A3 {id} 02 {OSDType} {OSDOnOff} {chk}"
  params:
    - {name: OSDType, type: integer, description: "0x00=Source, 0x01=Not Optimum Mode, 0x02=No Signal, 0x03=MDC, 0x04=Schedule Channel Info"}
    - {name: OSDOnOff, type: integer, description: "0x00=Off, 0x01=On"}

# ---- 0xA4 Timer1 Control_MFM ----
- id: timer1_get
  label: Get Timer1
  kind: query
  command: "AA A4 {id} 00 {chk}"
  params: []
- id: timer1_set
  label: Set Timer1
  kind: action
  command: "AA A4 {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params:
    - {name: OnAct, type: integer, description: "0=off, 1=on"}
    - {name: OffAct, type: integer, description: "0=off, 1=on"}
    - {name: HolidayApply, type: integer, description: "0~3 (0x02=On Timer only, 0x03=Off Timer only)"}

# ---- 0xA5 Timer2 Control_MFM ----
- id: timer2_get
  label: Get Timer2
  kind: query
  command: "AA A5 {id} 00 {chk}"
  params: []
- id: timer2_set
  label: Set Timer2
  kind: action
  command: "AA A5 {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params: []

# ---- 0xA6 Timer3 Control_MFM ----
- id: timer3_get
  label: Get Timer3
  kind: query
  command: "AA A6 {id} 00 {chk}"
  params: []
- id: timer3_set
  label: Set Timer3
  kind: action
  command: "AA A6 {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params: []

# ---- 0xA7 Clock Control_MFM (pre-2014) ----
- id: clock_mfm_get
  label: Get Time (0xA7)
  kind: query
  command: "AA A7 {id} 00 {chk}"
  params: []
- id: clock_mfm_set
  label: Set Time (0xA7)
  kind: action
  command: "AA A7 {id} 07 {Day} {HTime} {MTime} {Month} {Year1} {Year2} {APTime} {chk}"
  params:
    - {name: Day, type: integer, description: "1~31"}
    - {name: Month, type: integer, description: "1~12"}
    - {name: Year1, type: integer, description: "Year high byte"}
    - {name: Year2, type: integer, description: "Year low byte"}
  note: "Use 0xC5 for models after 2014."

# ---- 0xA8 Holiday Add/Delete Control ----
- id: holiday_add_delete_set
  label: Set Holiday (Add/Delete)
  kind: action
  command: "AA A8 {id} 05 {MgmtCmd} {Month1} {Day1} {Month2} {Day2} {chk}"
  params:
    - {name: MgmtCmd, type: integer, description: "0x00=Add, 0x01=Delete, 0x02=Delete All (Data2~5=0)"}

# ---- 0xA9 Holiday Get Control ----
- id: holiday_count_get
  label: Get Total Number of Holiday
  kind: query
  command: "AA A9 {id} 00 {chk}"
  params: []
- id: holiday_date_get
  label: Get Holiday Date
  kind: query
  command: "AA A9 {id} 01 {Index} {chk}"
  params:
    - {name: Index, type: integer, description: "Index in holiday list"}

# ---- 0xAB Timer4 Control ----
- id: timer4_get
  label: Get Timer4
  kind: query
  command: "AA AB {id} 00 {chk}"
  params: []
- id: timer4_set
  label: Set Timer4
  kind: action
  command: "AA AB {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params: []

# ---- 0xAC Timer5 Control ----
- id: timer5_get
  label: Get Timer5
  kind: query
  command: "AA AC {id} 00 {chk}"
  params: []
- id: timer5_set
  label: Set Timer5
  kind: action
  command: "AA AC {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params: []

# ---- 0xAD Timer6 Control ----
- id: timer6_get
  label: Get Timer6
  kind: query
  command: "AA AD {id} 00 {chk}"
  params: []
- id: timer6_set
  label: Set Timer6
  kind: action
  command: "AA AD {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params: []

# ---- 0xAE Timer7 Control ----
- id: timer7_get
  label: Get Timer7
  kind: query
  command: "AA AE {id} 00 {chk}"
  params: []
- id: timer7_set
  label: Set Timer7
  kind: action
  command: "AA AE {id} 0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} {RepeatOn} {ManualWeekdayOn} {RepeatOff} {ManualWeekdayOff} {Volume} {Source} {HolidayApply} {chk}"
  params: []

# ---- 0xAF Edit Name Control ----
- id: edit_name_get
  label: Get Edit Name
  kind: query
  command: "AA AF {id} 00 {chk}"
  params: []
- id: edit_name_set
  label: Set Edit Name
  kind: action
  command: "AA AF {id} 01 {EName} {chk}"
  params:
    - name: EName
      type: integer
      description: >
        0x00=NONE, 0x01=VCR, 0x02=DVD, 0x03=Cable STB, 0x04=Satellite STB,
        0x05=PVR STB, 0x06=AV Receiver, 0x07=Game, 0x08=Camcorder, 0x09=PC,
        0x0A=DVI PC, 0x0B=DVI Devices, 0x0C=TV, 0x0D=IPTV, 0x0E=Blu-ray,
        0x0F=HD DVD, 0x10=DMA, 0x11=DVD Receiver, 0x12=HD STB, 0x13=DVD Combo, 0x14=DHR

# ---- 0xB0 Virtual Remote Control ----
- id: virtual_remote_set
  label: Set Virtual Remote (Keycode)
  kind: action
  command: "AA B0 {id} 01 {KeyCode} {chk}"
  params:
    - name: KeyCode
      type: integer
      description: >
        0x01=KEY_SOURCE, 0x02=KEY_POWER, 0x04=KEY_1, 0x05=KEY_2, 0x06=KEY_3,
        0x07=KEY_VOLUME_UP, 0x08=KEY_4, 0x09=KEY_5, 0x0A=KEY_6, 0x0B=KEY_VOLUME_DOWN,
        0x0C=KEY_7, 0x0D=KEY_8, 0x0E=KEY_9, 0x0F=KEY_MUTE, 0x10=KEY_CHANNEL_DOWN,
        0x11=KEY_0, 0x12=KEY_CHANNEL_UP, 0x14=KEY_GREEN, 0x15=KEY_YELLOW, 0x16=KEY_CYAN,
        0x1A=KEY_MENU, 0x1F=KEY_DISPLAY, 0x23=KEY_DIGIT, 0x24=KEY_PIP_TV_VIDEO,
        0x2D=KEY_EXIT, 0x45=KEY_REW, 0x46=KEY_STOP, 0x47=KEY_PLAY, 0x48=KEY_FF,
        0x4A=KEY_PAUSE, 0x4B=KEY_TOOLS, 0x58=KEY_RETURN, 0x5B=KEY_MAGICINFO_LITE,
        0x60=KEY_CURSOR_UP, 0x61=KEY_CURSOR_DOWN, 0x62=KEY_CURSOR_RIGHT,
        0x65=KEY_CURSOR_LEFT, 0x68=KEY_ENTER, 0x6C=KEY_RED, 0x77=KEY_LOCK,
        0x79=KEY_CONTENT, 0x98=DISCRET_POWER_OFF, 0x9F=KEY_3D

# ---- 0xB1 Display Port Daisy Chain ----
- id: dp_daisy_chain_get
  label: Get DisplayPort Daisy Chain
  kind: query
  command: "AA B1 {id} 00 {chk}"
  params: []
- id: dp_daisy_chain_set
  label: Set DisplayPort Daisy Chain
  kind: action
  command: "AA B1 {id} 01 {Value} {chk}"
  params:
    - {name: Value, type: integer, description: "0x00=Clone, 0x01=Expand"}

# ---- 0xB3 Video Conference Sound Mode Control ----
- id: vc_sound_mode_get
  label: Get Video Conference Sound Mode
  kind: query
  command: "AA B3 {id} 00 {chk}"
  params: []
- id: vc_sound_mode_set
  label: Set Video Conference Sound Mode
  kind: action
  command: "AA B3 {id} 01 {CSoundOnOff} {chk}"
  params:
    - {name: CSoundOnOff, type: integer, description: "0x00=Off, 0x01=On"}

# ---- 0xB5 Network Standby Control ----
- id: network_standby_get
  label: Get Network Standby
  kind: query
  command: "AA B5 {id} 00 {chk}"
  params: []
- id: network_standby_set
  label: Set Network Standby
  kind: action
  command: "AA B5 {id} 01 {NetworkStandbyOnOff} {chk}"
  params:
    - {name: NetworkStandbyOnOff, type: integer, description: "0x00=Off, 0x01=On"}

# ---- 0xB6 DST (Daylight Saving Time) Control ----
- id: dst_get
  label: Get DST
  kind: query
  command: "AA B6 {id} 00 {chk}"
  params: []
- id: dst_set
  label: Set DST
  kind: action
  command: "AA B6 {id} 0C {DSTOnOff} {StartMonth} {StartDayOrder} {StartDayOfWeek} {StartHour} {StartMin} {EndMonth} {EndDayOrder} {EndDayOfWeek} {EndHour} {EndMin} {TimeOffset} {chk}"
  params:
    - {name: DSTOnOff, type: integer, description: "0x00=Off, 0x01=Auto(tuner), 0x02=Manual/On"}
    - {name: TimeOffset, type: integer, description: "0x00=+1:00, 0x01=+2:00"}

# ---- 0xB7 Custom PIP Control ----
- id: custom_pip_get
  label: Get Custom PIP
  kind: query
  command: "AA B7 {id} 00 {chk}"
  params: []
- id: custom_pip_set
  label: Set Custom PIP
  kind: action
  command: "AA B7 {id} 08 {HPosH} {HPosL} {VPosH} {VPosL} {HSizeH} {HSizeL} {VSizeH} {VSizeL} {chk}"
  params:
    - {name: HPosH, type: integer, description: "PIP H-Start high byte"}
    - {name: HPosL, type: integer, description: "PIP H-Start low byte"}
    - {name: VPosH, type: integer, description: "PIP V-Start high byte"}
    - {name: VPosL, type: integer, description: "PIP V-Start low byte"}
    - {name: HSizeH, type: integer, description: "PIP H-width high byte"}
    - {name: HSizeL, type: integer, description: "PIP H-width low byte"}
    - {name: VSizeH, type: integer, description: "PIP V-width high byte"}
    - {name: VSizeL, type: integer, description: "PIP V-width low byte"}
  note: "H/V Size 512x288 ~ 1632x918 (H interval 160px, V interval 90px). H/V Position interval 10px."

# ---- 0xB8 Auto ID Setting Status Control ----
- id: auto_id_setting_status_get
  label: Get Auto ID Setting Status
  kind: query
  command: "AA B8 {id} 00 {chk}"
  params: []
- id: auto_id_setting_status_set
  label: Set Auto ID Setting Status
  kind: action
  command: "AA B8 {id} 01 {Status} {chk}"
  params:
    - {name: Status, type: integer, description: "0x00=Auto ID Setting START, 0x01=END"}

# ---- 0xB9 Display ID Information ----
- id: display_id_set
  label: Set Monitor ID Display
  kind: action
  command: "AA B9 {id} 01 {IDDisplayOnOff} {chk}"
  params:
    - {name: IDDisplayOnOff, type: integer, description: "0x00=Off, 0x01=On"}

# ---- 0xC5 Clock Control_MFM (post-2014, with seconds) ----
- id: clock_get
  label: Get Time (0xC5)
  kind: query
  command: "AA C5 {id} 00 {chk}"
  params: []
- id: clock_set
  label: Set Time (0xC5)
  kind: action
  command: "AA C5 {id} 08 {Day} {HTime} {MTime} {STime} {Month} {Year1} {Year2} {APTime} {chk}"
  params:
    - {name: STime, type: integer, description: "Second 0~59"}

# ---- 0xC6 EcoSolution control ----
- id: eco_solution_auto_power_off_get
  label: Get Eco Solution - Auto Power Off
  kind: query
  command: "AA C6 {id} 01 81 {chk}"
  params: []
- id: eco_solution_auto_power_off_set
  label: Set Eco Solution - Auto Power Off
  kind: action
  command: "AA C6 {id} 02 81 {AutoPowerOffMode} {chk}"
  params:
    - {name: AutoPowerOffMode, type: integer, description: "0x00=Off, 0x01=4hr, 0x02=6hr, 0x03=8hr"}

# ---- 0xC7 Control Launcher ----
- id: launcher_play_via_get
  label: Get Launcher - Play Via Mode
  kind: query
  command: "AA C7 {id} 01 81 {chk}"
  params: []
- id: launcher_play_via_set
  label: Set Launcher - Play Via Mode
  kind: action
  command: "AA C7 {id} 02 81 {PlayViaMode} {chk}"
  params:
    - {name: PlayViaMode, type: integer, description: "0x00=MagicInfo, 0x01=URL Launcher, 0x02=MagicIWB"}
- id: launcher_url_get
  label: Get Launcher - URL Address
  kind: query
  command: "AA C7 {id} 01 82 {chk}"
  params: []
- id: launcher_url_set
  label: Set Launcher - URL Address
  kind: action
  command: "AA C7 {id} {Variable} 82 {URLAddress...} {chk}"
  params:
    - {name: URLAddress, type: string, description: "ASCII URL, up to 200 chars"}

# ---- 0xC8 OnScreen Display Menu Control ----
- id: osd_menu_orientation_get
  label: Get OSD - Menu Orientation
  kind: query
  command: "AA C8 {id} 01 81 {chk}"
  params: []
- id: osd_menu_orientation_set
  label: Set OSD - Menu Orientation
  kind: action
  command: "AA C8 {id} 02 81 {MenuOrientationMode} {chk}"
  params:
    - {name: MenuOrientationMode, type: integer, description: "0x00=Landscape(0), 0x01=Portrait(270), 0x02=180, 0x03=90"}
- id: osd_source_orientation_get
  label: Get OSD - Source Content Orientation
  kind: query
  command: "AA C8 {id} 01 82 {chk}"
  params: []
- id: osd_source_orientation_set
  label: Set OSD - Source Content Orientation
  kind: action
  command: "AA C8 {id} 02 82 {SourceOrientationMode} {chk}"
  params:
    - {name: SourceOrientationMode, type: integer, description: "0x00=Landscape(0), 0x01=Portrait(270), 0x02=180, 0x03=90"}
- id: osd_aspect_ratio_get
  label: Get OSD - Aspect Ratio
  kind: query
  command: "AA C8 {id} 01 83 {chk}"
  params: []
- id: osd_aspect_ratio_set
  label: Set OSD - Aspect Ratio (Rotated)
  kind: action
  command: "AA C8 {id} 02 83 {AspectRatioMode} {chk}"
  params:
    - {name: AspectRatioMode, type: integer, description: "0x00=Full Screen, 0x01=Original"}
- id: osd_pip_rotation_get
  label: Get OSD - PIP Rotation
  kind: query
  command: "AA C8 {id} 01 84 {chk}"
  params: []
- id: osd_pip_rotation_set
  label: Set OSD - PIP Rotation
  kind: action
  command: "AA C8 {id} 02 84 {PIPRotationMode} {chk}"
  params:
    - {name: PIPRotationMode, type: integer, description: "0x00=Landscape(0), 0x01=Portrait(270), 0x02=180, 0x03=90"}
  note: "Sequence for PIP rotation with PIP on: 1. PIP Off  2. PIP Rotation set  3. PIP On"

# ---- 0xCA System Menu Control ----
- id: system_auto_source_switch_onoff_get
  label: Get System - Auto Source Switch On/Off
  kind: query
  command: "AA CA {id} 01 81 {chk}"
  params: []
- id: system_auto_source_switch_onoff_set
  label: Set System - Auto Source Switch On/Off
  kind: action
  command: "AA CA {id} 02 81 {AutoSourceSwitchOnOff} {chk}"
  params:
    - {name: AutoSourceSwitchOnOff, type: integer, description: "0x00=Off, 0x01=On"}
- id: system_auto_source_control_get
  label: Get System - Auto Source Switch Control
  kind: query
  command: "AA CA {id} 01 82 {chk}"
  params: []
- id: system_auto_source_control_set
  label: Set System - Auto Source Switch Control
  kind: action
  command: "AA CA {id} 04 82 {PrimarySourceRecovery} {PrimarySource} {SecondarySource} {chk}"
  params:
    - {name: PrimarySourceRecovery, type: integer, description: "0x00=Off, 0x01=On"}
    - {name: PrimarySource, type: integer, description: "Source code (see 0x14); 0x00=All"}
    - {name: SecondarySource, type: integer, description: "Source code (see 0x14)"}
- id: system_power_button_get
  label: Get System - Power Button
  kind: query
  command: "AA CA {id} 01 91 {chk}"
  params: []
- id: system_power_button_set
  label: Set System - Power Button
  kind: action
  command: "AA CA {id} 02 91 {PowerButton} {chk}"
  params:
    - {name: PowerButton, type: integer, description: "0x00=Power On Only, 0x01=Power On/Off"}
- id: system_no_signal_power_off_get
  label: Get System - No Signal Power Off
  kind: query
  command: "AA CA {id} 01 A1 {chk}"
  params: []
- id: system_no_signal_power_off_set
  label: Set System - No Signal Power Off
  kind: action
  command: "AA CA {id} 02 A1 {NoSignalPowerOff} {chk}"
  params:
    - {name: NoSignalPowerOff, type: integer, description: "0x00=Off, 0x01=15min, 0x02=30min, 0x03=60min"}

# ---- 0xE0 Net PIP (MagicInfo Only) ----
- id: net_pip_on_set
  label: Set MagicInfo PIP On
  kind: action
  command: "AA E0 {id} 14 01 {HPosH} {HPosL} {VPosH} {VPosL} {HSizeH} {HSizeL} {VSizeH} {VSizeL} {PSource} {TVChannel} {SSelect} {Country} {ATV_DTV} {AirCable} {CH_NUM_H} {CH_NUM_L} {Sel_Minor} {Minor_CH_H} {Minor_CH_L} {chk}"
  params: []
- id: net_pip_off_set
  label: Set MagicInfo PIP Off
  kind: action
  command: "AA E0 {id} 01 00 {chk}"
  params: []

# ---- 0xE4 Apply To Control ----
- id: apply_to_get
  label: Get Apply To Status
  kind: query
  command: "AA E4 {id} 00 {chk}"
  params: []
- id: apply_to_set
  label: Set Apply To Status
  kind: action
  command: "AA E4 {id} 01 {Status} {chk}"
  params:
    - {name: Status, type: integer, description: "0x00=Current Source, 0x01=MagicInfo Player S"}

# ---- 0xF9 Panel On/Off ----
- id: panel_onoff_get
  label: Get Panel ON/OFF
  kind: query
  command: "AA F9 {id} 00 {chk}"
  params: []
- id: panel_onoff_set
  label: Set Panel ON/OFF
  kind: action
  command: "AA F9 {id} 01 {PN_State} {chk}"
  params:
    - {name: PN_State, type: integer, description: "0x00=PANEL ON, 0x01=PANEL OFF"}

# ---- 0xFD Auto ID Setting MDC ----
- id: auto_id_get
  label: Get Auto ID
  kind: query
  command: "AA FD {id} 00 {chk}"
  params: []
- id: auto_id_set
  label: Set Auto ID
  kind: action
  command: "AA FD {id} 02 {RS_Status} {M_ID} {chk}"
  params:
    - name: RS_Status
      type: integer
      description: "Bit field: bit4=1 Initialize Monitor ID to 0; bit0=1 RS232 Loop Out Disable, 0=Enable"
    - {name: M_ID, type: integer, description: "ID 1~99 (bit4=change); ignored if reset bit set"}

# ---- 0xFF ACK/NAK ----
- id: ack_nak
  label: ACK/NAK Packet
  kind: feedback
  command: "AA FF {id} {datalen} {AckNak} {rCMD} {...} {chk}"
  params: []
  note: "Response to other commands. 'A'=ACK, 'N'=NAK (with ERR byte)."

# ============================================================
# Annex A - RTV Commands (0xC0 + sub-command)
# ============================================================

- id: rtv_set_status
  label: RTV Set Status
  kind: action
  command: "AA C0 {id} 02 00 {SubCmdData1} {chk}"
  params: []
- id: rtv_get_status
  label: RTV Get Status
  kind: query
  command: "AA C0 {id} 01 00 {chk}"
  params: []

# ---- A.C0.01 3D Mode Control ----
- id: rtv_3d_mode_get
  label: Get 3D Mode
  kind: query
  command: "AA C0 {id} 01 01 {chk}"
  params: []
- id: rtv_3d_mode_set
  label: Set 3D Mode
  kind: action
  command: "AA C0 {id} 02 01 {3DMode} {chk}"
  params:
    - {name: 3DMode, type: integer, description: "0x00=3D, 0x01=2D->3D, 0x02=SBS, 0x03=TNB, 0x04=LBL, 0x05=VS, 0x06=CheckerBD, 0x07=Frame Seq."}

# ---- A.C0.02 3D Effect Control ----
- id: rtv_3d_effect_get
  label: Get 3D Effect
  kind: query
  command: "AA C0 {id} 01 02 {chk}"
  params: []
- id: rtv_3d_effect_set
  label: Set 3D Effect
  kind: action
  command: "AA C0 {id} 02 02 {3DEffect} {chk}"
  params:
    - {name: 3DEffect, type: integer, description: "0x00=Auto, 0x01=Manual"}

# ---- A.C0.03 3D Perspective Control ----
- id: rtv_3d_perspective_get
  label: Get 3D Perspective
  kind: query
  command: "AA C0 {id} 01 03 {chk}"
  params: []
- id: rtv_3d_perspective_set
  label: Set 3D Perspective
  kind: action
  command: "AA C0 {id} 02 03 {3DPerspective} {chk}"
  params:
    - {name: 3DPerspective, type: integer, description: "0~10"}

# ---- A.C0.04 3D Effect Depth Control ----
- id: rtv_3d_effect_depth_get
  label: Get 3D Effect Depth
  kind: query
  command: "AA C0 {id} 01 04 {chk}"
  params: []
- id: rtv_3d_effect_depth_set
  label: Set 3D Effect Depth
  kind: action
  command: "AA C0 {id} 02 04 {3DEffectDepth} {chk}"
  params:
    - {name: 3DEffectDepth, type: integer, description: "1~10"}

# ---- A.C0.05 3D L/R Change Control ----
- id: rtv_3d_lr_change_get
  label: Get 3D L/R Change
  kind: query
  command: "AA C0 {id} 01 05 {chk}"
  params: []
- id: rtv_3d_lr_change_set
  label: Set 3D L/R Change
  kind: action
  command: "AA C0 {id} 02 05 {3DLRChange} {chk}"
  params:
    - {name: 3DLRChange, type: integer, description: "0x00=L/R Image, 0x01=R/L Image"}

# ---- A.C0.06 3D->2D Control ----
- id: rtv_3d_to_2d_get
  label: Get 3D->2D
  kind: query
  command: "AA C0 {id} 01 06 {chk}"
  params: []
- id: rtv_3d_to_2d_set
  label: Set 3D->2D
  kind: action
  command: "AA C0 {id} 02 06 {3DTo2D} {chk}"
  params:
    - {name: 3DTo2D, type: integer, description: "0x00=Off, 0x01=On"}

# ---- A.C0.07 3D Auto View Control ----
- id: rtv_3d_auto_view_get
  label: Get 3D Auto View
  kind: query
  command: "AA C0 {id} 01 07 {chk}"
  params: []
- id: rtv_3d_auto_view_set
  label: Set 3D Auto View
  kind: action
  command: "AA C0 {id} 02 07 {3DAutoView} {chk}"
  params:
    - {name: 3DAutoView, type: integer, description: "0x00=Off, 0x01=Message Notice, 0x02=On"}

# ---- A.C0.08 3D Optimization Control ----
- id: rtv_3d_optimization_get
  label: Get 3D Optimization
  kind: query
  command: "AA C0 {id} 01 08 {chk}"
  params: []
- id: rtv_3d_optimization_set
  label: Set 3D Optimization
  kind: action
  command: "AA C0 {id} 02 08 {3DOptimization} {chk}"
  params:
    - {name: 3DOptimization, type: integer, description: "0~2"}

# ---- A.C0.09 Expert Pattern Control ----
- id: rtv_expert_pattern_get
  label: Get Expert Pattern
  kind: query
  command: "AA C0 {id} 01 09 {chk}"
  params: []
- id: rtv_expert_pattern_set
  label: Set Expert Pattern
  kind: action
  command: "AA C0 {id} 02 09 {ExpertPattern} {chk}"
  params:
    - name: ExpertPattern
      type: integer
      description: "0x00=Off, 0x01=Pattern1, 0x02=Pattern2, 0x03=Color Bar, 0x04=HRamp, 0x05=VRamp, 0x06=White, 0x07=Red, 0x08=Blue, 0x09=Green"

# ---- A.C0.0A RGB Mode Only Control ----
- id: rtv_rgb_mode_only_get
  label: Get RGB Mode Only
  kind: query
  command: "AA C0 {id} 01 0A {chk}"
  params: []
- id: rtv_rgb_mode_only_set
  label: Set RGB Mode Only
  kind: action
  command: "AA C0 {id} 02 0A {RGBModeOnly} {chk}"
  params:
    - {name: RGBModeOnly, type: integer, description: "0x00=Off, 0x01=Red, 0x02=Green, 0x03=Blue"}

# ---- A.C0.0B Color Space Control (RTV) ----
- id: rtv_color_space_get
  label: Get Color Space (RTV)
  kind: query
  command: "AA C0 {id} 01 0B {chk}"
  params: []
- id: rtv_color_space_set
  label: Set Color Space (RTV)
  kind: action
  command: "AA C0 {id} 02 0B {ColorSpace} {chk}"
  params:
    - {name: ColorSpace, type: integer, description: "0x00=Auto, 0x01=Native, 0x02=Custom"}

# ---- A.C0.0C Color Space Color Control ----
- id: rtv_color_space_color_get
  label: Get Color Space Color
  kind: query
  command: "AA C0 {id} 01 0C {chk}"
  params: []
- id: rtv_color_space_color_set
  label: Set Color Space Color
  kind: action
  command: "AA C0 {id} 02 0C {ColorSpaceColor} {chk}"
  params:
    - {name: ColorSpaceColor, type: integer, description: "0x00=Red, 0x01=Green, 0x02=Blue, 0x03=Yellow, 0x04=Cyan, 0x05=Magenta"}

# ---- A.C0.0D Color Space Red Control ----
- id: rtv_color_space_red_get
  label: Get Color Space Red
  kind: query
  command: "AA C0 {id} 01 0D {chk}"
  params: []
- id: rtv_color_space_red_set
  label: Set Color Space Red
  kind: action
  command: "AA C0 {id} 02 0D {ColorSpaceRed} {chk}"
  params:
    - {name: ColorSpaceRed, type: integer, description: "0~100"}

# ---- A.C0.0E Color Space Green Control ----
- id: rtv_color_space_green_get
  label: Get Color Space Green
  kind: query
  command: "AA C0 {id} 01 0E {chk}"
  params: []
- id: rtv_color_space_green_set
  label: Set Color Space Green
  kind: action
  command: "AA C0 {id} 02 0E {ColorSpaceGreen} {chk}"
  params:
    - {name: ColorSpaceGreen, type: integer, description: "0~100"}

# ---- A.C0.0F Color Space Blue Control ----
- id: rtv_color_space_blue_get
  label: Get Color Space Blue
  kind: query
  command: "AA C0 {id} 01 0F {chk}"
  params: []
- id: rtv_color_space_blue_set
  label: Set Color Space Blue
  kind: action
  command: "AA C0 {id} 02 0F {ColorSpaceBlue} {chk}"
  params:
    - {name: ColorSpaceBlue, type: integer, description: "0~100"}

# ---- A.C0.10 Color Space Reset ----
- id: rtv_color_space_reset_set
  label: Set Color Space Reset
  kind: action
  command: "AA C0 {id} 02 10 {TBD} {chk}"
  params: []
  note: "Data1 marked TBD in source."

# ---- A.C0.11 White Balance RGB Offset ----
- id: rtv_wb_rgb_offset_get
  label: Get White Balance RGB Offset
  kind: query
  command: "AA C0 {id} 01 11 {chk}"
  params: []
- id: rtv_wb_rgb_offset_set
  label: Set White Balance RGB Offset
  kind: action
  command: "AA C0 {id} 04 11 {ROffset} {GOffset} {BOffset} {chk}"
  params:
    - {name: ROffset, type: integer, description: "0~50"}
    - {name: GOffset, type: integer, description: "0~50"}
    - {name: BOffset, type: integer, description: "0~50"}

# ---- A.C0.12 White Balance RGB Gain ----
- id: rtv_wb_rgb_gain_get
  label: Get White Balance RGB Gain
  kind: query
  command: "AA C0 {id} 01 12 {chk}"
  params: []
- id: rtv_wb_rgb_gain_set
  label: Set White Balance RGB Gain
  kind: action
  command: "AA C0 {id} 04 12 {RGain} {GGain} {BGain} {chk}"
  params:
    - {name: RGain, type: integer, description: "0~50"}
    - {name: GGain, type: integer, description: "0~50"}
    - {name: BGain, type: integer, description: "0~50"}

# ---- A.C0.13 White Balance Reset ----
- id: rtv_wb_reset_set
  label: Set White Balance Reset
  kind: action
  command: "AA C0 {id} 02 13 {TBD} {chk}"
  params: []
  note: "Data1 marked TBD in source."

# ---- A.C0.14 Set Flesh Tone ----
- id: rtv_flesh_tone_get
  label: Get Flesh Tone
  kind: query
  command: "AA C0 {id} 01 14 {chk}"
  params: []
- id: rtv_flesh_tone_set
  label: Set Flesh Tone
  kind: action
  command: "AA C0 {id} 02 14 {FleshTone} {chk}"
  params:
    - {name: FleshTone, type: integer, description: "0~30"}

# ---- A.C0.15 Set Motion Lighting ----
- id: rtv_motion_lighting_get
  label: Get Motion Lighting
  kind: query
  command: "AA C0 {id} 01 15 {chk}"
  params: []
- id: rtv_motion_lighting_set
  label: Set Motion Lighting
  kind: action
  command: "AA C0 {id} 02 15 {MotionLighting} {chk}"
  params:
    - {name: MotionLighting, type: integer, description: "0x00=Off, 0x01=On"}

# ---- A.C0.16 Set LED Motion Plus ----
- id: rtv_led_motion_plus_get
  label: Get LED Motion Plus
  kind: query
  command: "AA C0 {id} 01 16 {chk}"
  params: []
- id: rtv_led_motion_plus_set
  label: Set LED Motion Plus
  kind: action
  command: "AA C0 {id} 02 16 {LEDMotionPlus} {chk}"
  params:
    - {name: LEDMotionPlus, type: integer, description: "0x00=Off, 0x01=Normal, 0x02=Cinema, 0x03=Ticker"}

# ---- A.C0.17 Set MPEG Noise Filter ----
- id: rtv_mpeg_noise_filter_get
  label: Get MPEG Noise Filter
  kind: query
  command: "AA C0 {id} 01 17 {chk}"
  params: []
- id: rtv_mpeg_noise_filter_set
  label: Set MPEG Noise Filter
  kind: action
  command: "AA C0 {id} 02 17 {MPEGNoiseFilter} {chk}"
  params:
    - {name: MPEGNoiseFilter, type: integer, description: "0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High, 0x04=Auto"}

# ---- A.C0.18 Set Smart LED ----
- id: rtv_smart_led_get
  label: Get Smart LED
  kind: query
  command: "AA C0 {id} 01 18 {chk}"
  params: []
- id: rtv_smart_led_set
  label: Set Smart LED
  kind: action
  command: "AA C0 {id} 02 18 {SMARTLED} {chk}"
  params:
    - {name: SMARTLED, type: integer, description: "0x00=Off, 0x01=Low, 0x02=Standard, 0x03=High, 0x04=Demo"}

# ---- A.C0.19 Set Cinema Black ----
- id: rtv_cinema_black_get
  label: Get Cinema Black
  kind: query
  command: "AA C0 {id} 01 19 {chk}"
  params: []
- id: rtv_cinema_black_set
  label: Set Cinema Black
  kind: action
  command: "AA C0 {id} 02 19 {CINEMABLACK} {chk}"
  params:
    - {name: CINEMABLACK, type: integer, description: "0x00=Off, 0x01=On"}

# ---- A.C0.1A Marker On/Off ----
- id: rtv_marker_get
  label: Get Marker
  kind: query
  command: "AA C0 {id} 01 1A {chk}"
  params: []
- id: rtv_marker_set
  label: Set Marker On/Off
  kind: action
  command: "AA C0 {id} 02 1A {MarkerOnOff} {chk}"
  params:
    - {name: MarkerOnOff, type: integer, description: "0x00=Off, 0x01=On"}

# ---- A.C0.1B Set Overlay Aspect Ratio ----
- id: rtv_overlay_aspect_ratio_get
  label: Get Overlay Aspect Ratio
  kind: query
  command: "AA C0 {id} 01 1B {chk}"
  params: []
- id: rtv_overlay_aspect_ratio_set
  label: Set Overlay Aspect Ratio
  kind: action
  command: "AA C0 {id} 02 1B {OverlayAspectRatio} {chk}"
  params:
    - name: OverlayAspectRatio
      type: integer
      description: "0x00=OFF, 0x01=16:9, 0x02=4:3, 0x03=15:9, 0x04=14:9, 0x05=13:9, 0x06=1.85:1, 0x07=2.35:1, 0x08=1.85:1 & 4:3"

# ---- A.C0.1C Set Cross Marker ----
- id: rtv_cross_marker_get
  label: Get Cross Marker
  kind: query
  command: "AA C0 {id} 01 1C {chk}"
  params: []
- id: rtv_cross_marker_set
  label: Set Cross Marker
  kind: action
  command: "AA C0 {id} 02 1C {CrossMarker} {chk}"
  params:
    - {name: CrossMarker, type: integer, description: "0x00=Off, 0x01=On"}

# ---- A.C0.1D Set Safety Area ----
- id: rtv_safety_area_get
  label: Get Safety Area
  kind: query
  command: "AA C0 {id} 01 1D {chk}"
  params: []
- id: rtv_safety_area_set
  label: Set Safety Area
  kind: action
  command: "AA C0 {id} 02 1D {SafetyArea} {chk}"
  params:
    - {name: SafetyArea, type: integer, description: "0~5"}

# ---- A.C0.1E Set Black Matte ----
- id: rtv_black_matte_get
  label: Get Black Matte
  kind: query
  command: "AA C0 {id} 01 1E {chk}"
  params: []
- id: rtv_black_matte_set
  label: Set Black Matte
  kind: action
  command: "AA C0 {id} 02 1E {BlackMatte} {chk}"
  params:
    - {name: BlackMatte, type: integer, description: "0~2"}

# ---- A.C0.1F Set Marker Color ----
- id: rtv_marker_color_get
  label: Get Marker Color
  kind: query
  command: "AA C0 {id} 01 1F {chk}"
  params: []
- id: rtv_marker_color_set
  label: Set Marker Color
  kind: action
  command: "AA C0 {id} 02 1F {MarkerColor} {chk}"
  params: []
  note: "Data1 marked TBD in source."

# ---- A.C0.20 Set Marker Thickness ----
- id: rtv_marker_thickness_get
  label: Get Marker Thickness
  kind: query
  command: "AA C0 {id} 01 20 {chk}"
  params: []
- id: rtv_marker_thickness_set
  label: Set Marker Thickness
  kind: action
  command: "AA C0 {id} 02 20 {MarkerThickness} {chk}"
  params:
    - {name: MarkerThickness, type: integer, description: "0~7"}

# ---- A.C0.A0 Send Calibration Command ----
- id: rtv_calibration_get
  label: Get Calibration Command
  kind: query
  command: "AA C0 {id} 01 A0 {chk}"
  params: []
- id: rtv_calibration_set
  label: Set Calibration Command
  kind: action
  command: "AA C0 {id} 02 A0 {StartCommand} {chk}"
  params:
    - {name: StartCommand, type: integer, description: "0x00=Start, 0x01=Stop, 0x02=Finish"}
```

## Feedbacks
```yaml
# All commands return ACK/NAK via 0xFF. 'A'=ACK, 'N'=NAK + ERR byte.
# Get commands return requested state values in ACK payload.
# ERR codes are not enumerated in the source beyond "Error code that shows what occurred error is".
- id: ack
  type: ack
  description: "ACK response, format: AA FF {id} {datalen} 'A' {rCMD} {values...} {chk}"
- id: nak
  type: nak
  description: "NAK response, format: AA FF {id} 03 'N' {rCMD} {ERR} {chk}"
# UNRESOLVED: explicit enumeration of ERR code values not present in source.
```

## Variables
```yaml
# Settable parameters are encoded as Data bytes within each Set command (see Actions).
# No separately-addressed variable namespace is documented in the source.
# UNRESOLVED: no standalone Variables section defined by source.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are ACK/NAK to issued commands.
# UNRESOLVED: no event/notification mechanism described.
```

## Macros
```yaml
# PIP rotation with PIP on (documented sequence):
#   1. PIP Off (0x3C, 0x00)
#   2. PIP Rotation set (0xC8 sub 0x84)
#   3. PIP On (0x3C, 0x01)
# No other multi-step macros enumerated.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: 0x11 Power Control
    note: "RJ45 power-on requires socket reconnect after 10 sec. WOL required when monitor is power-off on RJ45 (Network Standby Off on some models). Retry Power On/Off 3 times every 2 sec until ACK."
  - command: 0x9F Reset Control
    note: "Includes Reset All (0x03) and System Reset (0x02) variants."
  - command: 0x5D Safety Lock
    note: "Operates regardless of power on/off."
  - command: 0x5F / 0x77 Key/Panel Lock
    note: "Operates regardless of power on/off; can lock out local control."
  - command: 0xFD Auto ID
    note: "Initialize Monitor ID (0x10) resets all display IDs in chain."
# UNRESOLVED: source contains no explicit power-on sequencing or hardware interlock
# procedures beyond the RJ45 power-on note. No voltage/current/power specs stated.
```

## Notes
- Source document: "SEC-VD-DSW Multiple Display Control, Ver. 13.7c, 2016-02-23". This is the shared Samsung MDC protocol reference, not a QBxxB-specific manual.
- Framing: every packet = `0xAA {cmd} {id} {datalen} {data...} {checksum}`. Checksum = (sum of bytes from `{cmd}` through last data byte, i.e. excluding the 0xAA header) mod 256; carry beyond two hex digits discarded. Source example: `0x11+0xFE+0x01+0x01 = 0x111` → `0x11`.
- ID `0xFE` = broadcast: all sets obey Set commands, no ACK returned. Get commands require a specific ID.
- RS-232 uses only pins 2 (RxD), 3 (TxD), 5 (GND) on the DB-9; max cable 4 m.
- RJ45 MDC default IP `192.168.0.10`, port `1515`, TCP/IP carrying the same MDC frame inside the data area.
- Many commands are model-dependent: source repeatedly states "Depends on each model spec, a certain command will be supported or not" and "an option of a certain command will be differ". Per-command QBxxB support must be verified against the actual device.
- "MagicNet"/"MagicInfo" mode disables several commands (Video Wall, PIP, etc.).
- Video Wall on / Zoom picture size disables Coarse/Fine/H-Position/V-Position/Auto Adjustment/Pixel Shift/Screen Mode controls.
- Tint only settable in 50 steps (0, 2, 4 ... 100).
- Timer commands (0xA4–0xA7, 0xAB–0xAE) carry 0x0D or 0x0F data length variants per model; H/M = 0xFF means time not set.
- `0xA7` Clock Control is for pre-2014 models; `0xC5` adds a seconds field for post-2014 models.

<!-- UNRESOLVED: exact QBxxB SKU list and which MDC commands each SKU supports. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: ERR code value table not present in source. -->
<!-- UNRESOLVED: precise checksum byte for each example command not pre-computed (computed at runtime per framing rule). -->
<!-- UNRESOLVED: source is generic MDC; a QBxxB-specific manual would confirm or restrict the command set. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - image-us.samsung.com
  - justaddpower.happyfox.com
  - displaysolutions.samsung.com
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://justaddpower.happyfox.com/kb/article/245-samsung-rs232-control-rs232c
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-IP-Control.pdf
  - https://displaysolutions.samsung.com/support/download-center/mdc
retrieved_at: 2026-07-25T10:29:04.973Z
last_checked_at: 2026-08-05T08:44:32.705Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:44:32.705Z
matched_actions: 300
action_count: 300
confidence: medium
summary: "All 300 spec actions map to MDC opcodes documented in the source; transport framing and codes match; no shape drift or fabricated commands. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact QBxxB model variants and which subset of MDC commands each supports. Source explicitly notes \"Depends on each model spec, a certain command will be supported or not\"."
- "firmware version compatibility not stated in source."
- "source document is a shared MDC reference, not a QBxxB-specific manual. Command support per-model should be verified against device."
- "explicit enumeration of ERR code values not present in source."
- "no standalone Variables section defined by source."
- "no event/notification mechanism described."
- "source contains no explicit power-on sequencing or hardware interlock"
- "exact QBxxB SKU list and which MDC commands each SKU supports."
- "firmware version compatibility range not stated."
- "ERR code value table not present in source."
- "precise checksum byte for each example command not pre-computed (computed at runtime per framing rule)."
- "source is generic MDC; a QBxxB-specific manual would confirm or restrict the command set."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
