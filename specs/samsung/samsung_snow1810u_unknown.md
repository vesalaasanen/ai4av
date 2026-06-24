---
spec_id: admin/samsung-snow1810u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SNOW1810U Control Spec"
manufacturer: Samsung
model_family: SNOW1810U
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - SNOW1810U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - image-us.samsung.com
  - manuals.plus
  - manua.ls
  - objects.icecat.biz
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/products/tvs/tvci-8-21-17/resource-center/control-codes/TV_RS232_CommandList_1.2_1pager.pdf
  - https://manuals.plus/m/081842c776d616c56e7076b31e6b1b4a5ef06c86767045761f573c7ea8f2466a_optim.pdf
  - https://www.manua.ls/samsung/snow-1810u/manual
  - https://objects.icecat.biz/objects/mmo_71776134_1582793297_5333_23331.pdf
retrieved_at: 2026-06-14T12:55:13.955Z
last_checked_at: 2026-06-23T07:49:50.283Z
generated_at: 2026-06-23T07:49:50.283Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SNOW1810U-specific feature subset not enumerated in source. Source documents MDC protocol generically; SNOW1810U command support may differ."
  - "source defines commands but no persistent variable store abstraction."
  - "source describes query/response model; unsolicited events not documented."
  - "no multi-step macro sequences defined in source beyond compound"
  - "SNOW1810U-specific command support matrix not stated; firmware version not stated; no auth method stated."
verification:
  verdict: verified
  checked_at: 2026-06-23T07:49:50.283Z
  matched_actions: 132
  action_count: 132
  confidence: medium
  summary: "All 132 spec actions confirmed verbatim in Samsung MDC source; transport verified; catalogue fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Samsung SNOW1810U Control Spec

## Summary
Samsung SNOW1810U LFD/TV controlled via Samsung Multiple Display Control (MDC) protocol. Supports RS-232 and TCP/IP (RJ45) transports with the same binary command format. Document covers the full common protocol command catalogue (0x00–0xFF).

<!-- UNRESOLVED: SNOW1810U-specific feature subset not enumerated in source. Source documents MDC protocol generically; SNOW1810U command support may differ. -->

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
addressing:
  port: 1515
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (power on/off commands present - 0x11)
# - queryable       (query commands returning state present throughout)
# - routable        (input source select present - 0x14)
# - levelable       (volume 0x12, brightness/contrast 0x24/0x25 etc.)
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
# Common protocol frame: [Header 0xAA] [Command] [ID] [Data Length] [Data...] [Checksum]
# Checksum = sum of bytes from Command through last Data byte, modulo 256, lower 2 hex digits.
# ID 0xFE broadcasts to all displays (no ACK). ID 0x00 addresses a single display.
# Ack frame: 0xAA 0xFF [ID] [Data Length] 'A' [r-CMD] [Val 1..N] [Checksum]
# Nak frame: 0xAA 0xFF [ID] [Data Length] 'N' [r-CMD] [ERR] [Checksum]

- id: status_control_get
  label: Get Status
  kind: query
  command: "AA 00 {ID} 00 {sum}"
  params:
    - name: ID
      type: integer
      description: Display ID (0x00-0xFE; 0xFE = broadcast)

- id: video_status_get
  label: Get Video Status
  kind: query
  command: "AA 04 {ID} 00 {sum}"

- id: rgb_status_get
  label: Get RGB Status
  kind: query
  command: "AA 06 {ID} 00 {sum}"

- id: pip_status_get
  label: Get PIP Status
  kind: query
  command: "AA 07 {ID} 00 {sum}"

- id: maintenance_status_get
  label: Get Maintenance Status
  kind: query
  command: "AA 08 {ID} 00 {sum}"

- id: sound_status_get
  label: Get Audio Status
  kind: query
  command: "AA 09 {ID} 00 {sum}"

- id: serial_number_get
  label: Get Serial Number
  kind: query
  command: "AA 0B {ID} 00 {sum}"

- id: display_status_get
  label: Get Display Status
  kind: query
  command: "AA 0D {ID} 00 {sum}"

- id: sw_version_get
  label: Get Software Version
  kind: query
  command: "AA 0E {ID} 00 {sum}"

- id: auto_motion_plus_get
  label: Get Auto Motion Plus Status
  kind: query
  command: "AA 0F {ID} 00 {sum}"

- id: auto_motion_plus_set
  label: Set Auto Motion Plus
  kind: action
  command: "AA 0F {ID} 03 {Mode} {BlurReduction} {JudderReduction} {sum}"
  params:
    - name: Mode
      type: integer
      description: 0=Off, 1=Clear, 2=Standard, 3=Smooth, 4=Custom, 5=Demo
    - name: BlurReduction
      type: integer
      description: 0-10 (only when Mode=Custom)
    - name: JudderReduction
      type: integer
      description: 0-10 (only when Mode=Custom)

- id: model_number_get
  label: Get Model Number
  kind: query
  command: "AA 10 {ID} 00 {sum}"

- id: power_get
  label: Get Power Status
  kind: query
  command: "AA 11 {ID} 00 {sum}"

- id: power_set
  label: Set Power
  kind: action
  command: "AA 11 {ID} 01 {Power} {sum}"
  params:
    - name: Power
      type: integer
      description: 0=Off, 1=On, 2=Reboot

- id: volume_get
  label: Get Volume
  kind: query
  command: "AA 12 {ID} 00 {sum}"

- id: volume_set
  label: Set Volume
  kind: action
  command: "AA 12 {ID} 01 {Volume} {sum}"
  params:
    - name: Volume
      type: integer
      description: 0-100

- id: mute_get
  label: Get Mute Status
  kind: query
  command: "AA 13 {ID} 00 {sum}"

- id: mute_set
  label: Set Mute
  kind: action
  command: "AA 13 {ID} 01 {Mute} {sum}"
  params:
    - name: Mute
      type: integer
      description: 0=Off, 1=On

- id: input_source_get
  label: Get Input Source
  kind: query
  command: "AA 14 {ID} 00 {sum}"

- id: input_source_set
  label: Set Input Source
  kind: action
  command: "AA 14 {ID} 01 {Input} {sum}"
  params:
    - name: Input
      type: integer
      description: 0x04=S-Video, 0x08=Component, 0x0C=AV1, 0x0D=AV2, 0x0E=SCART1, 0x18=DVI, 0x14=PC, 0x1E=BNC, 0x1F=DVI_VIDEO, 0x20=Magicinfo, 0x21=HDMI1, 0x22=HDMI1_PC, 0x23=HDMI2, 0x24=HDMI2_PC, 0x25=DisplayPort1, 0x26=DisplayPort2, 0x27=DisplayPort3, 0x31=HDMI3, 0x32=HDMI3_PC, 0x33=HDMI4, 0x34=HDMI4_PC, 0x40=TV(DTV), 0x50=Plug In Module, 0x55=HDBaseT, 0x60=Media/MagicInfo S, 0x61=WiDi/Screen Mirroring, 0x62=Internal/USB, 0x63=URL Launcher, 0x64=IWB

- id: picture_size_get
  label: Get Picture Size
  kind: query
  command: "AA 15 {ID} 00 {sum}"

- id: picture_size_set
  label: Set Picture Size
  kind: action
  command: "AA 15 {ID} 01 {Aspect} {sum}"
  params:
    - name: Aspect
      type: integer
      description: "PC Mode: 0x10=16:9, 0x18=4:3, 0x20=Original Ratio, 0x21=21:9. Video Mode: 0x00=Auto Wide, 0x01=16:9, 0x04=Zoom, 0x05=Zoom1, 0x06=Zoom2, 0x09=Just Scan, 0x0B=4:3, 0x0C=Wide Fit, 0x0D=Custom, 0x0E=Smart View 1, 0x0F=Smart View 2, 0x31=Wide Zoom, 0x32=21:9"

- id: direct_channel_set
  label: Set DTV Channel
  kind: action
  command: "AA 17 {ID} 08 {Country} {ATV_DTV} {AirCable} {CH_NUM_Hi} {CH_NUM_Lo} {Sel_Minor} {Minor_CH_Hi} {Minor_CH_Lo} {sum}"
  params:
    - name: Country
      type: integer
      description: "0=Korea, 1=USA, ..."
    - name: ATV_DTV
      type: integer
      description: "0=Analog, 1=Digital"
    - name: AirCable
      type: integer
      description: "0=general, 1=cabled"
    - name: CH_NUM
      type: integer
      description: "Analog 1-135, Digital 0-999"

- id: screen_mode_set
  label: Set Screen Mode
  kind: action
  command: "AA 18 {ID} 01 {ScrMode} {sum}"
  params:
    - name: ScrMode
      type: integer
      description: "0x01=16:9, 0x04=Zoom, 0x0B=4:3, 0x31=Wide Zoom"

- id: screen_size_get
  label: Get Screen Size
  kind: query
  command: "AA 19 {ID} 00 {sum}"

- id: mdc_connection_type_get
  label: Get MDC Connection Type
  kind: query
  command: "AA 1D {ID} 00 {sum}"
  notes: "Response: 0x00=RS232C, 0x01=RJ45"

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "AA 24 {ID} 01 {Contrast} {sum}"
  params:
    - name: Contrast
      type: integer
      description: 0-100

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "AA 25 {ID} 01 {Brightness} {sum}"
  params:
    - name: Brightness
      type: integer
      description: 0-100

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "AA 26 {ID} 01 {Sharpness} {sum}"
  params:
    - name: Sharpness
      type: integer
      description: 0-100

- id: color_set
  label: Set Color
  kind: action
  command: "AA 27 {ID} 01 {Color} {sum}"
  params:
    - name: Color
      type: integer
      description: 0-100

- id: tint_set
  label: Set Tint
  kind: action
  command: "AA 28 {ID} 01 {Tint} {sum}"
  params:
    - name: Tint
      type: integer
      description: 0-100 in 50 steps (0,2,4,...100); 50=neutral, R=Tint, G=100-Tint

- id: coarse_set
  label: Set Coarse
  kind: action
  command: "AA 2F {ID} 01 {Coarse} {sum}"
  params:
    - name: Coarse
      type: integer
      description: "0=Decrease, 1=Increase"

- id: fine_set
  label: Set Fine
  kind: action
  command: "AA 30 {ID} 01 {Fine} {sum}"
  params:
    - name: Fine
      type: integer
      description: "0=Decrease (phase), 1=Increase"

- id: h_position_set
  label: Set H-Position
  kind: action
  command: "AA 31 {ID} 01 {H-Pos} {sum}"
  params:
    - name: H-Pos
      type: integer
      description: "0=Left, 1=Right"

- id: v_position_set
  label: Set V-Position
  kind: action
  command: "AA 32 {ID} 01 {V-Pos} {sum}"
  params:
    - name: V-Pos
      type: integer
      description: "0=Up, 1=Down"

- id: auto_power_set
  label: Set Auto Power
  kind: action
  command: "AA 33 {ID} 01 {AutoPower} {sum}"
  params:
    - name: AutoPower
      type: integer
      description: "0=Auto Power Off, 1=Auto Power On"

- id: clear_menu_set
  label: Clear Menu
  kind: action
  command: "AA 34 {ID} 01 00 {sum}"

- id: remote_control_set
  label: Set IR Remocon Enable
  kind: action
  command: "AA 36 {ID} 01 {RMC} {sum}"
  params:
    - name: RMC
      type: integer
      description: "0=Disable, 1=Enable"

- id: rgb_contrast_set
  label: Set RGB Contrast
  kind: action
  command: "AA 37 {ID} 01 {Contrast} {sum}"
  params:
    - name: Contrast
      type: integer
      description: 0-100

- id: rgb_brightness_set
  label: Set RGB Brightness
  kind: action
  command: "AA 38 {ID} 01 {Brightness} {sum}"
  params:
    - name: Brightness
      type: integer
      description: 0-100

- id: pip_on_off_set
  label: Set PIP On/Off
  kind: action
  command: "AA 3C {ID} 01 {PIP} {sum}"
  params:
    - name: PIP
      type: integer
      description: "0=Off, 1=On"

- id: auto_adjustment_set
  label: Auto Adjustment
  kind: action
  command: "AA 3D {ID} 01 00 {sum}"

- id: color_tone_set
  label: Set Color Tone
  kind: action
  command: "AA 3E {ID} 01 {ColorTone} {sum}"
  params:
    - name: ColorTone
      type: integer
      description: "0=Cool2, 1=Cool1, 2=Normal, 3=Warm1, 4=Warm2, 0x50=Off"

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  command: "AA 3F {ID} 01 {C_Temp} {sum}"
  params:
    - name: C_Temp
      type: integer
      description: "0x00-0x10=5000K-15000K (linear), 0xFD=2800K, 0xFE=3000K, 0xFF=4000K. Extended range: 28-160 in 5K steps"

- id: pip_source_set
  label: Set PIP Source
  kind: action
  command: "AA 40 {ID} 01 {P.Source} {sum}"
  params:
    - name: P.Source
      type: integer
      description: Input source code (see 0x14)

- id: pip_size_set
  label: Set PIP Size
  kind: action
  command: "AA 42 {ID} 01 {P.Size} {sum}"
  params:
    - name: P.Size
      type: integer
      description: "0x00=Off, 0x04=Double1, 0x05=Double2, 0x06=Medium, 0x07=Large, 0x08=Small, 0x09=Double3, 0x10=Custom"

- id: pip_locate_set
  label: Set PIP Locate
  kind: action
  command: "AA 43 {ID} 01 {P.Locate} {sum}"
  params:
    - name: P.Locate
      type: integer
      description: "0=Off, 1=Upper Left, 2=Upper Right, 3=Lower Right, 4=Lower Left"

- id: fan_speed_set
  label: Set Fan Speed
  kind: action
  command: "AA 44 {ID} 01 {FANSpeed} {sum}"
  params:
    - name: FANSpeed
      type: integer
      description: 0-100

- id: user_auto_color_set
  label: Set User Auto Color
  kind: action
  command: "AA 45 {ID} 01 {AutoColorCmd} {sum}"
  params:
    - name: AutoColorCmd
      type: integer
      description: "0=Reset, 1=Auto Color"

- id: sound_select_set_0x47
  label: Set Sound Select (PIP)
  kind: action
  command: "AA 47 {ID} 01 {S.Select} {sum}"
  params:
    - name: S.Select
      type: integer
      description: "0=Sub, 1=Main"

- id: auto_volume_set
  label: Set Auto Volume
  kind: action
  command: "AA 48 {ID} 01 {A_VOL} {sum}"
  params:
    - name: A_VOL
      type: integer
      description: "0=Off, 1=Normal(On), 2=Night"

- id: standby_set
  label: Set Standby
  kind: action
  command: "AA 4A {ID} 01 {StandbySetting} {sum}"
  params:
    - name: StandbySetting
      type: integer
      description: "0=Off, 1=On, 2=Auto"

- id: video_picture_position_size_set
  label: Set Video Picture Position & Size
  kind: action
  command: "AA 4B {ID} 02 {TypeCMD} {DirectionCMD} {sum}"
  params:
    - name: TypeCMD
      type: integer
      description: "0=Reset, 1=Position, 2=Size, 3=Reserved"
    - name: DirectionCMD
      type: integer
      description: "Position: 0=Down, 1=Up, 2=Left, 3=Right. Size: 0=VScaleDown, 1=VScaleUp, 2=HScaleDown, 3=HScaleUp"

- id: pixel_shift_set
  label: Set Pixel Shift
  kind: action
  command: "AA 4C {ID} 04 {Shift} {H.Dot} {V.Line} {S.Time} {sum}"
  params:
    - name: Shift
      type: integer
      description: "0=Off, 1=On"
    - name: H.Dot
      type: integer
      description: 0-4
    - name: V.Line
      type: integer
      description: 0-4
    - name: S.Time
      type: integer
      description: 1-4

- id: eq_100hz_set
  label: Set EQ 100Hz
  kind: action
  command: "AA 51 {ID} 01 {100Hz} {sum}"
  params:
    - name: 100Hz
      type: integer
      description: 0-20

- id: eq_300hz_set
  label: Set EQ 300Hz
  kind: action
  command: "AA 52 {ID} 01 {300Hz} {sum}"
  params:
    - name: 300Hz
      type: integer
      description: 0-20

- id: eq_1khz_set
  label: Set EQ 1kHz
  kind: action
  command: "AA 53 {ID} 01 {1kHz} {sum}"
  params:
    - name: 1kHz
      type: integer
      description: 0-20

- id: eq_3khz_set
  label: Set EQ 3kHz
  kind: action
  command: "AA 54 {ID} 01 {3kHz} {sum}"
  params:
    - name: 3kHz
      type: integer
      description: 0-20

- id: eq_10khz_set
  label: Set EQ 10kHz
  kind: action
  command: "AA 55 {ID} 01 {10kHz} {sum}"
  params:
    - name: 10kHz
      type: integer
      description: 0-20

- id: auto_lamp_set
  label: Set Auto Lamp Control
  kind: action
  command: "AA 57 {ID} 08 {LMax_H} {LMax_M} {LMax_AP} {LMaxValue} {LMin_H} {LMin_M} {LMin_AP} {LMinValue} {sum}"
  params:
    - name: LMax_H
      type: integer
      description: Hour 1-12
    - name: LMax_M
      type: integer
      description: Minute 0-59
    - name: LMax_AP
      type: integer
      description: "0=PM, 1=AM"
    - name: LMaxValue
      type: integer
      description: 0-100
    - name: LMin_H
      type: integer
      description: 1-12
    - name: LMin_M
      type: integer
      description: 0-59
    - name: LMin_AP
      type: integer
      description: "0=PM, 1=AM"
    - name: LMinValue
      type: integer
      description: "0-100 (0xFF=Off)"

- id: manual_lamp_set
  label: Set Manual Lamp Control
  kind: action
  command: "AA 58 {ID} 01 {LampValue} {sum}"
  params:
    - name: LampValue
      type: integer
      description: "0-100 (0xFF=Off)"

- id: safety_screen_run_set
  label: Run Safety Screen Immediately
  kind: action
  command: "AA 59 {ID} 01 {SafetyScreenType} {sum}"
  params:
    - name: SafetyScreenType
      type: integer
      description: "0=Off, 1=Signal Pattern, 2=All White, 3=Scroll, 4=Bar, 6=Eraser, 7=Pixel, 0x10=Rolling Bar, 0x11=Fading Screen"

- id: inverse_set
  label: Set Inverse
  kind: action
  command: "AA 5A {ID} 01 {Inverse} {sum}"
  params:
    - name: Inverse
      type: integer
      description: "0=Off, 1=On"

- id: safety_screen_set
  label: Set Safety Screen Timer
  kind: action
  command: "AA 5B {ID} {Len} {Type} {T.Period} {T.Time} {sum}"
  notes: "Data Length 3 for Repeat (Type/T.Period/T.Time), 7 for Interval (adds Start/End times). Type MSB=0=Repeat, MSB=1=Interval. T.Period 1-10 Hr, T.Time 0x01-0x05 (10-50 sec)."

- id: video_wall_mode_set
  label: Set Video Wall Mode
  kind: action
  command: "AA 5C {ID} 01 {WallMode} {sum}"
  params:
    - name: WallMode
      type: integer
      description: "0=Full, 1=Natural"

- id: safety_lock_set
  label: Set Safety Lock
  kind: action
  command: "AA 5D {ID} 01 {Lock} {sum}"
  params:
    - name: Lock
      type: integer
      description: "0=Off, 1=On"

- id: panel_key_lock_set
  label: Set Panel Key Lock
  kind: action
  command: "AA 5F {ID} 01 {ButtonLock} {sum}"
  params:
    - name: ButtonLock
      type: integer
      description: "0=Unlock, 1=Lock"

- id: channel_up_down_set
  label: Channel Up/Down
  kind: action
  command: "AA 61 {ID} 01 {ChannelUpDown} {sum}"
  params:
    - name: ChannelUpDown
      type: integer
      description: "0=Up, 1=Down"

- id: volume_up_down_set
  label: Volume Up/Down
  kind: action
  command: "AA 62 {ID} 01 {VolumeUpDown} {sum}"
  params:
    - name: VolumeUpDown
      type: integer
      description: "0=Up, 1=Down"

- id: ticker_set
  label: Set Ticker
  kind: action
  command: "AA 63 {ID} {Length} {OnOff} {StartH} {StartM} {StartAMPM} {EndH} {EndM} {EndAMPM} {PosH} {PosV} {Motion} {Direction} {Speed} {FontSize} {FGColor} {BGColor} {FGOpacity} {BGOpacity} {Message} {sum}"
  notes: "Variable length up to 128 bytes. Message encoded as Unicode hex."

- id: sound_select_set_0x65
  label: Set Sound Select (PIP, alt)
  kind: action
  command: "AA 65 {ID} 01 {S.Select} {sum}"
  params:
    - name: S.Select
      type: integer
      description: "0=Sub, 1=Main"

- id: pc_module_detect_get
  label: Get PC Module Detect
  kind: query
  command: "AA 66 {ID} 00 {sum}"
  notes: "Response: 0x00=Not Detected, 0x01=MagicInfo, 0x02=Plug In Module"

- id: device_name_get
  label: Get Device Name
  kind: query
  command: "AA 67 {ID} 00 {sum}"
  notes: "Max 15 chars"

- id: speaker_select_set
  label: Set Speaker Select
  kind: action
  command: "AA 68 {ID} 01 {S.Select} {sum}"
  params:
    - name: S.Select
      type: integer
      description: "0=Internal, 1=External"

- id: osd_set
  label: Set OSD On/Off
  kind: action
  command: "AA 70 {ID} 01 {OSD} {sum}"
  params:
    - name: OSD
      type: integer
      description: "0=OSD Off, 1=OSD On"

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: "AA 71 {ID} 01 {PMode} {sum}"
  params:
    - name: PMode
      type: integer
      description: "AV/S-Video/Component/HDCP: 0x00=Dynamic, 0x01=Standard, 0x02=Movie, 0x03=Custom, 0x04=Natural, 0x05=Calibration, 0x50=Off. PC/BNC/DVI/DP: 0x10=Entertain, 0x11=Internet, 0x12=Text, 0x13=Custom, 0x14=Advertisement, 0x15=Information, 0x16=Calibration, 0x50=Off. All: 0x20-0x27=Shop/Mall/Office/Terminal/Videowall variants"

- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  command: "AA 72 {ID} 01 {SMode} {sum}"
  params:
    - name: SMode
      type: integer
      description: "0=Standard, 1=Music, 2=Movie, 3=Speech, 4=Custom, 5=Amplify"

- id: digital_nr_set
  label: Set Digital NR
  kind: action
  command: "AA 73 {ID} 01 {NRMode} {sum}"
  params:
    - name: NRMode
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High, 4=Auto, 5=Auto Visualization"

- id: pc_color_tone_set
  label: Set PC Color Tone
  kind: action
  command: "AA 75 {ID} 01 {ColorTone} {sum}"
  params:
    - name: ColorTone
      type: integer
      description: "0=Custom, 1=Cool, 2=Normal, 3=Warm, 0x50=Off"

- id: auto_auto_adjustment_set
  label: Set Auto Auto-Adjustment
  kind: action
  command: "AA 76 {ID} 01 {A.Adjustment} {sum}"
  notes: "Get returns NAK"

- id: all_keys_lock_set
  label: Set All Keys Lock
  kind: action
  command: "AA 77 {ID} 01 {AKL} {sum}"
  params:
    - name: AKL
      type: integer
      description: "0=Off, 1=On"

- id: srs_tsxt_set
  label: Set SRS TS XT
  kind: action
  command: "AA 78 {ID} 01 {SRS} {sum}"
  params:
    - name: SRS
      type: integer
      description: "0=Off, 1=On"

- id: film_mode_set
  label: Set Film Mode
  kind: action
  command: "AA 79 {ID} 01 {FMode} {sum}"
  params:
    - name: FMode
      type: integer
      description: "0=Off, 1=Auto1, 2=Auto2, 3=Cinema Smooth"

- id: panel_on_time_get
  label: Get Panel On Time
  kind: query
  command: "AA 83 {ID} 00 {sum}"

- id: video_wall_on_set
  label: Set Video Wall On/Off
  kind: action
  command: "AA 84 {ID} 01 {V.Wall_On} {sum}"
  params:
    - name: V.Wall_On
      type: integer
      description: "0=Off, 1=On"

- id: temperature_set
  label: Set Temperature Threshold
  kind: action
  command: "AA 85 {ID} 01 {Temperature} {sum}"
  params:
    - name: Temperature
      type: integer
      description: 75-124 (degrees C)

- id: brightness_sensor_set
  label: Set Brightness Sensor
  kind: action
  command: "AA 86 {ID} 01 {BR_Sensor} {sum}"
  params:
    - name: BR_Sensor
      type: integer
      description: "0=Off, 1=On"

- id: dynamic_contrast_set
  label: Set Dynamic Contrast
  kind: action
  command: "AA 87 {ID} 01 {DY_Cont} {sum}"
  params:
    - name: DY_Cont
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"

- id: video_wall_user_set
  label: Set Video Wall Divider/SNo
  kind: action
  command: "AA 89 {ID} 02 {Wall_Div} {Wall_SNo} {sum}"
  params:
    - name: Wall_Div
      type: integer
      description: Divider code from 15x15 table (e.g. 0xFF=15x15)
    - name: Wall_SNo
      type: integer
      description: SNo 1-225 (model dependent)

- id: model_name_get
  label: Get Model Name
  kind: query
  command: "AA 8A {ID} 00 {sum}"

- id: video_wall_direct_set
  label: Set Video Wall Direct
  kind: action
  command: "AA 8B {ID} 05 {V.Wall_On} {WallMode} {Wall_Div} {Wall_SNo} {Input} {sum}"
  params:
    - name: V.Wall_On
      type: integer
      description: "0=Off, 1=On"
    - name: WallMode
      type: integer
      description: "0=Natural, 1=Full"
    - name: Wall_Div
      type: integer
      description: see 0x89
    - name: Wall_SNo
      type: integer
      description: see 0x89
    - name: Input
      type: integer
      description: see 0x14

- id: fan_control_set
  label: Set Fan Control
  kind: action
  command: "AA 8F {ID} 01 {FAN} {sum}"
  params:
    - name: FAN
      type: integer
      description: "0=Manual, 1=Auto"

- id: energy_saving_set
  label: Set Energy Saving
  kind: action
  command: "AA 92 {ID} 01 {E_SAV} {sum}"
  params:
    - name: E_SAV
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High, 4=Picture Off"

- id: hdmi_black_level_set
  label: Set HDMI Black Level
  kind: action
  command: "AA 94 {ID} 01 {HDMI_b} {sum}"
  params:
    - name: HDMI_b
      type: integer
      description: "0=Normal, 1=Low, 2=Auto"

- id: black_adjust_set
  label: Set Black Adjust
  kind: action
  command: "AA 95 {ID} 01 {B_ADJ} {sum}"
  params:
    - name: B_ADJ
      type: integer
      description: "0=Off, 1=Low(Dark), 2=Medium(Darker), 3=High(Darkest)"

- id: gamma_set
  label: Set Gamma
  kind: action
  command: "AA 96 {ID} 01 {GAMMA} {sum}"
  params:
    - name: GAMMA
      type: integer
      description: "0-5=Mode0-5, 0x11-0x15=-1 to -5, 0x20=Custom"

- id: edge_enhancement_set
  label: Set Edge Enhancement
  kind: action
  command: "AA 9C {ID} 01 {EDGE} {sum}"
  params:
    - name: EDGE
      type: integer
      description: "0=Off, 1=On"

- id: color_space_set
  label: Set Color Space
  kind: action
  command: "AA 9D {ID} 01 {COS} {sum}"
  params:
    - name: COS
      type: integer
      description: "0=Auto, 1=Native, 2=Custom"

- id: xvycc_set
  label: Set xvYCC
  kind: action
  command: "AA 9E {ID} 01 {XVYCC} {sum}"
  params:
    - name: XVYCC
      type: integer
      description: "0=Off, 1=On"

- id: reset_set
  label: Reset
  kind: action
  command: "AA 9F {ID} 01 {RST} {sum}"
  params:
    - name: RST
      type: integer
      description: "0=Picture Reset, 1=Sound Reset, 2=Setup Reset, 3=Reset All, 4=Screen Display Reset"
  notes: "Get returns NAK"

- id: ambient_brightness_set
  label: Set Ambient Brightness Mode
  kind: action
  command: "AA A1 {ID} 03 {AB_Mode} {Valid_LampValue} {LampValue} {sum}"
  params:
    - name: AB_Mode
      type: integer
      description: "0=Off, 1=On"
    - name: Valid_LampValue
      type: integer
      description: "0=Invalid (don't apply), 1=Valid (apply)"
    - name: LampValue
      type: integer
      description: 0-100

- id: osd_display_type_set
  label: Set OSD Display Type On/Off
  kind: action
  command: "AA A3 {ID} 02 {OSDType} {OSDOnOff} {sum}"
  params:
    - name: OSDType
      type: integer
      description: "0=Source, 1=Not Optimum Mode, 2=No Signal, 3=MDC, 4=Schedule Channel Info"
    - name: OSDOnOff
      type: integer
      description: "0=Off, 1=On"

- id: timer1_set
  label: Set Timer1
  kind: action
  command: "AA A4 {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"
  notes: "Data Length 0x0D (On only) or 0x0F (On+Off+Repeat+ManualWeekday). 0xFF=time unset."

- id: timer2_set
  label: Set Timer2
  kind: action
  command: "AA A5 {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"
  notes: "Same structure as 0xA4"

- id: timer3_set
  label: Set Timer3
  kind: action
  command: "AA A6 {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"
  notes: "Same structure as 0xA4"

- id: clock_set
  label: Set Clock (MFM, pre-2014)
  kind: action
  command: "AA A7 {ID} 07 {Day} {HTime} {MTime} {Month} {Year1} {Year2} {APTime} {sum}"
  params:
    - name: Day
      type: integer
      description: 1-31
    - name: HTime
      type: integer
      description: 1-12
    - name: MTime
      type: integer
      description: 0-59
    - name: Month
      type: integer
      description: 1-12
    - name: Year1
      type: integer
      description: Year high byte
    - name: Year2
      type: integer
      description: Year low byte
    - name: APTime
      type: integer
      description: "0=PM, 1=AM"

- id: holiday_add_delete_set
  label: Add/Delete Holiday
  kind: action
  command: "AA A8 {ID} 05 {Management} {Month1} {Day1} {Month2} {Day2} {sum}"
  params:
    - name: Management
      type: integer
      description: "0=Add, 1=Delete, 2=Delete All"

- id: holiday_get_total
  label: Get Total Holidays Count
  kind: query
  command: "AA A9 {ID} 00 {sum}"

- id: holiday_get_by_index
  label: Get Holiday by Index
  kind: query
  command: "AA A9 {ID} 01 {Index} {sum}"

- id: timer4_set
  label: Set Timer4
  kind: action
  command: "AA AB {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"
  notes: "Same structure as 0xA4"

- id: timer5_set
  label: Set Timer5
  kind: action
  command: "AA AC {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"

- id: timer6_set
  label: Set Timer6
  kind: action
  command: "AA AD {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"

- id: timer7_set
  label: Set Timer7
  kind: action
  command: "AA AE {ID} 0D|0F {OnH} {OnM} {OnAMPM} {OnAct} {OffH} {OffM} {OffAMPM} {OffAct} ... {sum}"

- id: edit_name_set
  label: Set Edit Name (input)
  kind: action
  command: "AA AF {ID} 01 {EName} {sum}"
  params:
    - name: EName
      type: integer
      description: "0=None, 1=VCR, 2=DVD, 3=Cable STB, 4=Sat STB, 5=PVR STB, 6=AV Receiver, 7=Game, 8=Camcorder, 9=PC, 0xA=DVI PC, 0xB=DVI, 0xC=TV, 0xD=IPTV, 0xE=Blu-ray, 0xF=HD DVD, 0x10=DMA, 0x11=DVD Receiver, 0x12=HD STB, 0x13=DVD Combo, 0x14=DHR"

- id: virtual_remote_set
  label: Virtual Remote Key
  kind: action
  command: "AA B0 {ID} 01 {KeyCode} {sum}"
  params:
    - name: KeyCode
      type: integer
      description: "0x01=SOURCE, 0x02=POWER, 0x04=1, 0x05=2, 0x06=3, 0x07=VOL_UP, 0x08=4, 0x09=5, 0x0A=6, 0x0B=VOL_DOWN, 0x0C=7, 0x0D=8, 0x0E=9, 0x0F=MUTE, 0x10=CH_DOWN, 0x11=0, 0x12=CH_UP, 0x14=GREEN, 0x15=YELLOW, 0x16=CYAN, 0x1A=MENU, 0x1F=DISPLAY, 0x23=DIGIT, 0x24=PIP_TV_VIDEO, 0x2D=EXIT, 0x45=REW, 0x46=STOP, 0x47=PLAY, 0x48=FF, 0x4A=PAUSE, 0x4B=TOOLS, 0x58=RETURN, 0x5B=MAGICINFO_LITE, 0x60=CURSOR_UP, 0x61=CURSOR_DOWN, 0x62=CURSOR_RIGHT, 0x65=CURSOR_LEFT, 0x68=ENTER, 0x6C=RED, 0x77=LOCK, 0x79=CONTENT, 0x98=DISCRET_POWER_OFF, 0x9F=3D"
- id: display_port_daisy_chain_get
  label: Get Display Port Daisy Chain
  kind: query
  command: "AA B1 {ID} 00 {sum}"

- id: display_port_daisy_chain_set
  label: Set Display Port Daisy Chain
  kind: action
  command: "AA B1 {ID} 01 {Value} {sum}"
  params:
    - name: Value
      type: integer
      description: "0=Clone, 1=Expand"

- id: video_conference_sound_set
  label: Set Video Conference Sound Mode
  kind: action
  command: "AA B3 {ID} 01 {CSound} {sum}"
  params:
    - name: CSound
      type: integer
      description: "0=Video Conference Sound Off, 1=Video Conference Sound On"

- id: network_standby_set
  label: Set Network Standby
  kind: action
  command: "AA B5 {ID} 01 {Standby} {sum}"
  params:
    - name: Standby
      type: integer
      description: "0=Network Standby Off, 1=Network Standby On"

- id: dst_set
  label: Set DST (Daylight Saving Time)
  kind: action
  command: "AA B6 {ID} 0C {DSTOnOff} {StartMonth} {StartDay1} {StartDay2} {StartH} {StartM} {EndMonth} {EndDay1} {EndDay2} {EndH} {EndM} {TimeOffset} {sum}"
  params:
    - name: DSTOnOff
      type: integer
      description: "Tunerless: 0=Off, 2=On. Tuner: 0=DST Off, 1=Auto, 2=Manual"
    - name: StartMonth
      type: integer
      description: "0x00=Jan ~ 0x0B=Dec (valid when DST On or Manual)"
    - name: TimeOffset
      type: integer
      description: "0x00=+1:00, 0x01=+2:00"
  notes: "Data2~12 valid when DST On or Manual."

- id: custom_pip_set
  label: Set Custom PIP
  kind: action
  command: "AA B7 {ID} 08 {HPosH} {HPosL} {VPosH} {VPosL} {HSizeH} {HSizeL} {VSizeH} {VSizeL} {sum}"
  params:
    - name: HPosH
      type: integer
      description: "PIP H-Start High-Byte (interval 10 pixel)"
    - name: HPosL
      type: integer
      description: "PIP H-Start Low-Byte"
    - name: VPosH
      type: integer
      description: "PIP V-Start High-Byte"
    - name: VPosL
      type: integer
      description: "PIP V-Start Low-Byte"
    - name: HSizeH
      type: integer
      description: "PIP H-width High-Byte"
    - name: HSizeL
      type: integer
      description: "PIP H-width Low-Byte"
    - name: VSizeH
      type: integer
      description: "PIP V-width High-Byte"
    - name: VSizeL
      type: integer
      description: "PIP V-width Low-Byte"
  notes: "Only when PIP Size is set to Custom."

- id: auto_id_setting_status_set
  label: Set Auto ID Setting Status
  kind: action
  command: "AA B8 {ID} 01 {Status} {sum}"
  params:
    - name: Status
      type: integer
      description: "0x00=Auto ID Setting START, 0x01=Auto ID Setting END"

- id: display_id_information_set
  label: Set Display ID Information
  kind: action
  command: "AA B9 {ID} 01 {IDDisplay} {sum}"
  params:
    - name: IDDisplay
      type: integer
      description: "0x00=Monitor ID Display Off, 0x01=Monitor ID Display On"

- id: clock_mfm_seconds_set
  label: Set Clock (MFM with Seconds)
  kind: action
  command: "AA C5 {ID} 08 {Day} {HTime} {MTime} {STime} {Month} {Year1} {Year2} {APTime} {sum}"
  params:
    - name: Day
      type: integer
      description: 1-31
    - name: HTime
      type: integer
      description: "1-12"
    - name: MTime
      type: integer
      description: 0-59
    - name: STime
      type: integer
      description: 0-59
    - name: Month
      type: integer
      description: 1-12
    - name: Year1
      type: integer
      description: Year high byte
    - name: Year2
      type: integer
      description: Year low byte
    - name: APTime
      type: integer
      description: "0=PM, 1=AM"
  notes: "For signage devices produced after 2013. Use 0xA7 for pre-2014 models."

- id: eco_solution_set
  label: Set Eco Solution
  kind: action
  command: "AA C6 {ID} 02 {SubCMD} {Data1} {sum}"
  params:
    - name: SubCMD
      type: integer
      description: "0x81=Auto Power Off"
    - name: Data1
      type: integer
      description: "Auto Power Off: 0x00=Off, 0x01=4 Hour(On), 0x02=6 Hour, 0x03=8 Hour"

- id: execute_launcher_set
  label: Set Execute Launcher
  kind: action
  command: "AA C7 {ID} {Len} {SubCMD} {Data} {sum}"
  params:
    - name: SubCMD
      type: integer
      description: "0x81=Launcher Mode (Play Via), 0x82=URL Address"
    - name: Data
      type: integer
      description: "Launcher Mode: 0x00=MagicInfo, 0x01=URL Launcher, 0x02=MagicIWB. URL: ASCII string up to 200 chars"
  notes: "Set Play Via: Data Length 0x02. Set URL: Data Length variable."

- id: osd_menu_control_set
  label: Set OSD Menu Control
  kind: action
  command: "AA C8 {ID} 02 {SubCMD} {Mode} {sum}"
  params:
    - name: SubCMD
      type: integer
      description: "0x81=Menu Orientation, 0x82=Source Content Orientation, 0x83=Aspect Ratio, 0x84=PIP Rotation"
    - name: Mode
      type: integer
      description: "Orientation: 0x00=Landscape(0), 0x01=Portrait(270), 0x02=180, 0x03=90. Aspect Ratio: 0x00=Full Screen, 0x01=Original."

- id: system_menu_control_set
  label: Set System Menu Control
  kind: action
  command: "AA CA {ID} {Len} {SubCMD} {Data1} {sum}"
  params:
    - name: SubCMD
      type: integer
      description: "0x81=Auto Source Switch OnOff, 0x82=Auto Source Switch Control (4 bytes), 0x91=Power Button, 0xA1=No Signal Power Off"
    - name: Data1
      type: integer
      description: "AutoSourceSwitch: 0=Off,1=On. PowerButton: 0=Power On Only,1=Power On/Off. NoSignalPowerOff: 0=Off,1=15min,2=30min,3=60min"

- id: net_pip_set
  label: Set Net PIP (MagicInfo)
  kind: action
  command: "AA E0 {ID} {Len} {PIP_OnOff} {HPosH} {HPosL} {VPosH} {VPosL} {HSizeH} {HSizeL} {VSizeH} {VSizeL} {PSource} {TVCh} {SSelect} {Country} {ATV_DTV} {AirCable} {CH_NUM_H} {CH_NUM_L} {Sel_Minor} {Minor_H} {Minor_L} {sum}"
  params:
    - name: PIP_OnOff
      type: integer
      description: "0x00=PIP Off (Data Length 0x01), 0x01=PIP On (Data Length 0x14)"
    - name: PSource
      type: integer
      description: Input source code (see 0x14)
    - name: SSelect
      type: integer
      description: "0x00=MagicInfo Sound, 0x01=PIP Sound"
  notes: "MagicInfo only."

- id: apply_to_status_set
  label: Set Apply To Status
  kind: action
  command: "AA E4 {ID} 01 {Status} {sum}"
  params:
    - name: Status
      type: integer
      description: "0x00=Current Source, 0x01=MagicInfo Player S"

- id: panel_on_off_set
  label: Set Panel On/Off
  kind: action
  command: "AA F9 {ID} 01 {PN_State} {sum}"
  params:
    - name: PN_State
      type: integer
      description: "0x00=Panel On, 0x01=Panel Off"

- id: auto_id_set
  label: Set Auto ID
  kind: action
  command: "AA FD {ID} 02 {RS_Status} {M_ID} {sum}"
  params:
    - name: RS_Status
      type: integer
      description: "Bit0=RS232 Loop Out Disable(1)/Enable(0), Bit4=Initialize Monitor ID(1)."
    - name: M_ID
      type: integer
      description: "Target ID 1-99. Ignored when ID reset bit set. 0=no change."
  notes: "Broadcast to 0xFE to apply to all."

- id: rtv_annex_a_set
  label: Set RTV Annex A Sub-Command
  kind: action
  command: "AA C0 {ID} {Len} {SubCMD} {Data} {sum}"
  params:
    - name: SubCMD
      type: integer
      description: "0x01=3D Mode, 0x02=3D Effect, 0x03=3D Perspective, 0x04=3D Effect Depth, 0x05=3D L/R Change, 0x06=3D->2D, 0x07=3D Auto View, 0x08=3D Optimization, 0x09=Expert Pattern, 0x0A=RGB Mode Only, 0x0B=Color Space, 0x0C=Color Space Color, 0x0D=Color Space Red, 0x0E=Color Space Green, 0x0F=Color Space Blue, 0x10=Color Space Reset, 0x11=WB RGB Offset, 0x12=WB RGB Gain, 0x13=WB Reset, 0x14=Flesh Tone, 0x15=Motion Lighting, 0x16=LED Motion Plus, 0x17=MPEG Noise Filter, 0x18=Smart LED, 0x19=Cinema Black, 0x1A=Marker On/Off, 0x1B=Overlay Aspect Ratio, 0x1C=Cross Marker, 0x1D=Safety Area, 0x1E=Black Matte, 0x1F=Marker Color, 0x20=Marker Thickness, 0xA0=Calibration Command"
    - name: Data
      type: integer
      description: "Value for the selected sub-command; see SubCMD description for range"
  notes: "Annex A RTV (Reference TV) commands. Get uses Data Length 0x01 with SubCMD only."
```

## Feedbacks
```yaml
# All queries return the standard ack frame: AA FF [ID] [DataLength] 'A' [r-CMD] [Val 1..N] [Checksum]
# NAK frame: AA FF [ID] 03 'N' [r-CMD] [ERR] [Checksum]

- id: status_control
  type: object
  description: Combined status - Power, Volume, Mute, Input, Aspect, plus N/F Time NF flags

- id: power_state
  type: enum
  values: [off, on, reboot]

- id: volume
  type: integer
  description: 0-100

- id: mute
  type: enum
  values: [off, on]

- id: input_source
  type: enum
  description: see input_source_set params for full list

- id: aspect
  type: integer
  description: Aspect code (see picture_size_set)

- id: video_status
  type: object
  description: Contrast, Brightness, Sharpness, Color, Tint, ColorTone, ColorTemp

- id: rgb_status
  type: object
  description: Contrast, Brightness, ColorTone, ColorTemp, RedGain, GreenGain, BlueGain (0xFF if not supported)

- id: pip_status
  type: object
  description: P.Size, P.Source

- id: sound_status
  type: object
  description: Vol, Balance, 100Hz, 300Hz, 1kHz, 3kHz, 10kHz, SRS

- id: serial_number
  type: string
  description: Up to 15 chars

- id: display_status
  type: object
  description: "Lamp err (0=Normal,1=Error), Temp err, Bright_Sensor (0=None,1=Error,2=Normal), No_Sync, Cur_Temp 0-125 C, FAN err"

- id: sw_version
  type: string
  description: Variable length, Version1-50 (1-12=Project Info, 13-50=SW version)

- id: model_number
  type: object
  description: Species (1=PDP,2=LCD,3=DLP,4=LED,5=CRT,6=OLED) + Model code

- id: model_name
  type: string
  description: Variable length, ASCII model name

- id: screen_size
  type: integer
  description: Inches 0-255

- id: mdc_connection_type
  type: enum
  values: [rs232c, rj45]

- id: panel_on_time
  type: integer
  description: High/Low byte pair

- id: pc_module_detect
  type: enum
  values: [not_detected, magicinfo, plug_in_module]

- id: device_name
  type: string
  description: Up to 15 chars

- id: holiday_entry
  type: object
  description: "Index, Month1, Day1, Month2, Day2 (0xFF=unset)"

- id: ack_nak
  type: enum
  values: [ack, nak]
  description: All commands return Ack ('A') or Nak ('N') in the Ack/Nak field
```

## Variables
```yaml
# UNRESOLVED: source defines commands but no persistent variable store abstraction.
# Settable numeric parameters are encoded inline in the action payload.
```

## Events
```yaml
# UNRESOLVED: source describes query/response model; unsolicited events not documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined in source beyond compound
# commands (e.g. Video Wall Direct 0x8B which sets multiple fields in one frame).
```

## Safety
```yaml
confirmation_required_for:
  - reset_all  # 0x9F RST=3
interlocks: []
# Per source: Power commands may need retry (3x every 2 sec) for Ack when used via RJ45.
# Power On via RJ45 requires socket reconnection after 10 sec.
# Network Standby:Off models require WOL protocol (not MDC) for Power On.
# Auto Lamp and Manual Lamp Control are mutually exclusive.
# Dynamic Contrast On disables Auto/Manual Lamp Control.
# Safety Screen types 1 (Signal Pattern), 2 (All White), 9, 10 only work on PDP models.
```

## Notes
SNOW1810U not directly listed in the source's Model Number Control (0x10) table; the model must be identified via 0x8A Model Name. Source documents Samsung Multiple Display Control protocol generically across many models. SNOW1810U-specific command support subset unverified.

RS-232: 9600 bps, 8N1, no flow control. Pin 2 RxD, 3 TxD, 5 GND. Max cable 4m. ID 0xFE = broadcast (no Ack).

RJ45/TCP: Default IP 192.168.0.10, port 1515. Same binary frame format as RS-232. Power On via RJ45 needs WOL protocol when Network Standby=Off (DMD/DBD/DHD/UED/DMD-S models). Power On/Off commands must be retried 3x every 2 sec until Ack.

Checksum = sum of bytes from Command byte through last Data byte, lower 2 hex digits (discard higher if sum exceeds 0xFF, e.g. 0x11+0xFE+0x01+0x01=0x111 → 0x11).

<!-- UNRESOLVED: SNOW1810U-specific command support matrix not stated; firmware version not stated; no auth method stated. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - image-us.samsung.com
  - manuals.plus
  - manua.ls
  - objects.icecat.biz
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/products/tvs/tvci-8-21-17/resource-center/control-codes/TV_RS232_CommandList_1.2_1pager.pdf
  - https://manuals.plus/m/081842c776d616c56e7076b31e6b1b4a5ef06c86767045761f573c7ea8f2466a_optim.pdf
  - https://www.manua.ls/samsung/snow-1810u/manual
  - https://objects.icecat.biz/objects/mmo_71776134_1582793297_5333_23331.pdf
retrieved_at: 2026-06-14T12:55:13.955Z
last_checked_at: 2026-06-23T07:49:50.283Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:49:50.283Z
matched_actions: 132
action_count: 132
confidence: medium
summary: "All 132 spec actions confirmed verbatim in Samsung MDC source; transport verified; catalogue fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SNOW1810U-specific feature subset not enumerated in source. Source documents MDC protocol generically; SNOW1810U command support may differ."
- "source defines commands but no persistent variable store abstraction."
- "source describes query/response model; unsolicited events not documented."
- "no multi-step macro sequences defined in source beyond compound"
- "SNOW1810U-specific command support matrix not stated; firmware version not stated; no auth method stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
