---
spec_id: admin/philips-hfl7011-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips HFL7011 Series Control Spec"
manufacturer: Philips
model_family: "HFL7011 Series"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "HFL7011 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
  - documents.philips.com
  - manua.ls
  - support.westan.com.au
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.documents.philips.com/assets/20230303/88479c9c662e4af3b544afba0138b723.pdf
  - https://www.documents.philips.com/assets/20230302/5c0833d64ccd4b64abedafb90078f690.pdf
  - https://www.manua.ls/philips/65hfl7011t/manual
  - https://support.westan.com.au/portal/en-gb
retrieved_at: 2026-05-19T07:09:11.631Z
last_checked_at: 2026-06-10T00:45:59.471Z
generated_at: 2026-06-10T00:45:59.471Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 0xFE
  - "specific HFL7011 model variants not listed; document covers broad Philips signage platform"
  - "no separate Variables section identified in SICP protocol;"
  - "no unsolicited event/notification messages defined in source"
  - "no explicit macro definitions in source"
  - "no safety warnings or interlock procedures stated in source"
  - "HFL7011 specific firmware version compatibility not stated; platform table does not include HFL7011 models"
  - "Authentication/token format not stated — source describes no login/password procedure"
  - "No unsolicited event/notification definitions in source"
  - "No explicit macro definitions in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:45:59.471Z
  matched_actions: 117
  action_count: 117
  confidence: medium
  summary: "All 117 spec action-units matched verbatim to source SICP V2.03 opcodes and parameter shapes; transport confirmed; only 0xFE (MIC color calibration, reserved for future use) is present in source but absent from spec. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Philips HFL7011 Series Control Spec

## Summary
Philips HFL7011 Series hospitality display — RS-232C and Ethernet (TCP/IP) control via SICP V2.03 binary protocol. Supports power control, input source routing, video/ audio adjustment, tiling, scheduling, failover, and queryable state feedback. Default TCP port: 5000. Default serial baud: 9600 8N1.

<!-- UNRESOLVED: specific HFL7011 model variants not listed; document covers broad Philips signage platform -->

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
  port: 5000  # stated: TCP/IP port 5000 default for all displays
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable      # power on/off commands present (0x18/0x19)
- routable       # input source selection commands present (0xAC/0xAD)
- queryable      # Get commands returning state present throughout
- levelable      # volume, brightness, contrast, color, tint, sharpness controls present
```

## Actions
```yaml
# 0x18 - Power State Set
- id: power_state_set
  label: Power State Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x01 = Power Off, 0x02 = On

# 0x19 - Power State Get
- id: power_state_get
  label: Power State Get
  kind: action
  params: []

# 0xA3 - Power at Cold Start Set
- id: power_at_cold_start_set
  label: Power at Cold Start Set
  params:
    - name: state
      type: integer
      description: 0x00 = Power Off, 0x01 = Forced On, 0x02 = Last Status

# 0xA4 - Power at Cold Start Get
- id: power_at_cold_start_get
  label: Power at Cold Start Get
  params: []

# 0xAC - Input Source Set
- id: input_source_set
  label: Input Source Set
  params:
    - name: source
      type: integer
      description: |
        0x01=VIDEO 0x02=S-VIDEO 0x03=COMPONENT 0x04=CVI2 0x05=VGA
        0x06=HDMI2 0x07=DP2 0x08=USB2 0x09=CardDVI-D 0x0A=DP1
        0x0B=CardOPS 0x0C=USB1 0x0D=HDMI 0x0E=DVI-D 0x0F=HDMI3
        0x10=BROWSER 0x11=SMARTCMS 0x12=DMS 0x13=INTERNAL_STORAGE
        0x16=MediaPlayer 0x17=PDFPlayer 0x18=Custom 0x19=HDMI4
        0x1A=VGA2 0x1B=VGA3 0x1C=IWB

# 0xAD - Input Source Get
- id: input_source_get
  label: Input Source Get
  params: []

# 0xAE - Auto Signal Detecting Set
- id: auto_signal_detecting_set
  label: Auto Signal Detecting Set
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=All 0x03=PCsourcesOnly 0x04=VideoSourcesOnly 0x05=Failover

# 0xAF - Auto Signal Detecting Get
- id: auto_signal_detecting_get
  label: Auto Signal Detecting Get
  params: []

# 0xA5 - Failover Set (up to 16 priority sources)
- id: failover_set
  label: Failover Set
  params:
    - name: priority_1
      type: integer
      description: 0x00=HDMI ... 0x16=IWB (1st priority)
    - name: priority_2
      type: integer
    - name: priority_3
      type: integer
    # ... through priority_16 (DATA[1] to DATA[16])

# 0xA6 - Failover Get
- id: failover_get
  label: Failover Get
  params: []

# 0x57 - Monitor Restart (Android/Scalar)
- id: monitor_restart
  label: Monitor Restart
  params:
    - name: target
      type: integer
      description: 0x00=Android 0x01=Scalar

# 0x72 - Backlight On/Off Set
- id: backlight_set
  label: Backlight Set
  params:
    - name: state
      type: integer
      description: 0x00=backlight on 0x01=backlight off

# 0x71 - Backlight Get
- id: backlight_get
  label: Backlight Get
  params: []

# 0x32 - Video Parameters Set
- id: video_parameters_set
  label: Video Parameters Set
  params:
    - name: brightness
      type: integer
      description: 0-100 (DATA[1])
    - name: color
      type: integer
      description: 0-100 (DATA[2])
    - name: contrast
      type: integer
      description: 0-100 (DATA[3])
    - name: sharpness
      type: integer
      description: 0-100 (DATA[4])
    - name: tint
      type: integer
      description: 0-100 (DATA[5]); Phoenix2.0: -50 to +50
    - name: black_level
      type: integer
      description: 0-100 (DATA[6])
    - name: gamma
      type: integer
      description: 0x01=Native 0x02=Sgamma 0x03=2.2 0x04=2.4 0x05=DICOM (DATA[7])

# 0x33 - Video Parameters Get
- id: video_parameters_get
  label: Video Parameters Get
  params: []

# 0x34 - Color Temperature Set
- id: color_temperature_set
  label: Color Temperature Set
  params:
    - name: temperature
      type: integer
      description: |
        0x00=User1 0x01=Native 0x03=10000K 0x04=9300K 0x05=7500K
        0x06=6500K 0x09=5000K 0x0A=4000K 0x0D=3000K 0x12=User2

# 0x35 - Color Temperature Get
- id: color_temperature_get
  label: Color Temperature Get
  params: []

# 0x36 - Color Parameters (RGB Gain/Offset) Set
- id: color_parameters_set
  label: Color Parameters Set
  params:
    - name: red_gain
      type: integer
      description: 0-255 (DATA[1])
    - name: green_gain
      type: integer
      description: 0-255 (DATA[2])
    - name: blue_gain
      type: integer
      description: 0-255 (DATA[3])
    - name: red_offset
      type: integer
      description: 0-255 (DATA[4])
    - name: green_offset
      type: integer
      description: 0-255 (DATA[5])
    - name: blue_offset
      type: integer
      description: 0-255 (DATA[6])

# 0x37 - Color Parameters Get
- id: color_parameters_get
  label: Color Parameters Get
  params: []

# 0x11 - Color Temperature 100K Steps Set
- id: color_temperature_100k_set
  label: Color Temperature 100K Steps Set
  params:
    - name: value
      type: integer
      description: 0x14(20)=2000K ... 0x64(100)=10000K

# 0x12 - Color Temperature 100K Steps Get
- id: color_temperature_100k_get
  label: Color Temperature 100K Steps Get
  params: []

# 0x3A - Picture Format Set
- id: picture_format_set
  label: Picture Format Set
  params:
    - name: format
      type: integer
      description: |
        0x00=Normal(4:3) 0x01=Custom 0x02=Real(1:1) 0x03=Full
        0x04=21:9 0x05=Dynamic 0x06=16:9
        Note: 0x05 Dynamic not supported on Dragon 1.x

# 0x3B - Picture Format Get
- id: picture_format_get
  label: Picture Format Get
  params: []

# 0x38 - VGA Video Parameters Set
- id: vga_video_parameters_set
  label: VGA Video Parameters Set
  params:
    - name: clock
      type: integer
      description: 0-100 (DATA[1])
    - name: clock_phase
      type: integer
      description: 0-100 (DATA[2])
    - name: h_position
      type: integer
      description: 0-100 (DATA[3])
    - name: v_position
      type: integer
      description: 0-100 (DATA[4])

# 0x39 - VGA Video Parameters Get
- id: vga_video_parameters_get
  label: VGA Video Parameters Get
  params: []

# 0x3C - Picture-in-Picture Set
- id: pip_set
  label: PIP Set
  params:
    - name: mode
      type: integer
      description: |
        0x00=Off 0x01=PIP 0x02=POP 0x03=QuickSwap 0x04=PBP2win
        0x05=PBP3win 0x06=PBP4win 0x07=PBP3win-1 0x08=PBP3win-2
        0x09=PBP4win-1 0x0A=SICP(Custom)
    - name: position
      type: integer
      description: 0x00=bottom-left 0x01=top-left 0x02=top-right 0x03=bottom-right 0x04=center

# 0x3D - PIP Get
- id: pip_get
  label: PIP Get
  params: []

# 0x84 - PIP Source Set
- id: pip_source_set
  label: PIP Source Set
  params:
    - name: source_type
      type: integer
      description: 0xFD=InputSource (DATA[1])
    - name: q2_source
      type: integer
      description: Q2 source number (same mapping as input source)
    - name: q3_source
      type: integer
      description: Q3 source number
    - name: q4_source
      type: integer
      description: Q4 source number

# 0x85 - PIP Source Get
- id: pip_source_get
  label: PIP Source Get
  params: []

# 0x44 - Volume Set
- id: volume_set
  label: Volume Set
  params:
    - name: speaker_out
      type: integer
      description: 0-100 (0x64 max) (DATA[1])
    - name: audio_out
      type: integer
      description: 0-100 (DATA[2]) - may not apply to all platforms

# 0x45 - Volume Get
- id: volume_get
  label: Volume Get
  params: []

# 0x41 - Volume Step Up/Down Set
- id: volume_step_set
  label: Volume Step Up/Down Set
  params:
    - name: speaker_direction
      type: integer
      description: 0=down 1=up 2=no change (DATA[1])
    - name: audio_out_direction
      type: integer
      description: 0=down 1=up 2=no change (DATA[2])

# 0xB8 - Volume Limits Speaker Out Set
- id: volume_limits_speaker_set
  label: Volume Limits Speaker Out Set
  params:
    - name: minimum
      type: integer
      description: 0-100 (DATA[1])
    - name: maximum
      type: integer
      description: 0-100 (DATA[2])
    - name: switch_on
      type: integer
      description: 0-100 (DATA[3])

# 0xB6 - Volume Limits Speaker Out Get
- id: volume_limits_speaker_get
  label: Volume Limits Speaker Out Get
  params: []

# 0xB9 - Volume Limits Audio Out Set
- id: volume_limits_audio_set
  label: Volume Limits Audio Out Set
  params:
    - name: minimum
      type: integer
      description: 0-100 (DATA[1])
    - name: maximum
      type: integer
      description: 0-100 (DATA[2])
    - name: switch_on
      type: integer
      description: 0-100 (DATA[3])

# 0xB7 - Volume Limits Audio Out Get
- id: volume_limits_audio_get
  label: Volume Limits Audio Out Get
  params: []

# 0x42 - Audio Parameters Set
- id: audio_parameters_set
  label: Audio Parameters Set
  params:
    - name: treble
      type: integer
      description: 0-100 (DATA[1]); Phoenix2.0: -8 to +8
    - name: bass
      type: integer
      description: 0-100 (DATA[2]); Phoenix2.0: -8 to +8

# 0x43 - Audio Parameters Get
- id: audio_parameters_get
  label: Audio Parameters Get
  params: []

# 0x47 - Volume Mute Set
- id: volume_mute_set
  label: Volume Mute Set
  params:
    - name: state
      type: integer
      description: 0x01=mute on 0x00=mute off

# 0x46 - Volume Mute Get
- id: volume_mute_get
  label: Volume Mute Get
  params: []

# 0x70 - Video Alignment (VGA Auto Adjust) Set
- id: video_alignment_set
  label: Video Alignment Set
  params:
    - name: item
      type: integer
      description: 0x40=AutoAdjust (DATA[1]) - VGA only

# 0x2F - Temperature Sensors Get
- id: temperature_sensors_get
  label: Temperature Sensors Get
  params: []

# 0x15 - Serial Code Get
- id: serial_code_get
  label: Serial Code Get
  params: []

# 0x0F - Misc Info Get (Operating Hours)
- id: misc_info_get
  label: Misc Info Get
  params:
    - name: item
      type: integer
      description: 0x02=OperatingHours (DATA[1])

# 0xDE - Smart Power Get
- id: smart_power_get
  label: Smart Power Get
  params: []

# 0xDD - Smart Power Set
- id: smart_power_set
  label: Smart Power Set
  params:
    - name: level
      type: integer
      description: 0x00=Off 0x01=Low 0x02=Medium 0x03=High

# 0x23 - Tiling Get
- id: tiling_get
  label: Tiling Get
  params: []

# 0x22 - Tiling Set
- id: tiling_set
  label: Tiling Set
  params:
    - name: enable
      type: integer
      description: 0x00=No 0x01=Yes (DATA[1])
    - name: frame_comp
      type: integer
      description: 0x00=No 0x01=Yes 0x02=keepPrevious (DATA[2])
    - name: position
      type: integer
      description: 0x01-0x96 (max) (DATA[3])
    - name: monitors
      type: integer
      description: H/V monitor count encoded per formula (DATA[4])

# 0x25 - Light Sensor Get
- id: light_sensor_get
  label: Light Sensor Get
  params: []

# 0x24 - Light Sensor Set
- id: light_sensor_set
  label: Light Sensor Set
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On

# 0xB3 - Human Sensor Get
- id: human_sensor_get
  label: Human Sensor Get
  params: []

# 0xB4 - Human Sensor Set
- id: human_sensor_set
  label: Human Sensor Set
  params:
    - name: timeout
      type: integer
      description: 0x00=Off 0x01=10min 0x02=20min 0x03=30min 0x04=40min 0x05=50min 0x06=60min

# 0x27 - OSD Rotating Get
- id: osd_rotating_get
  label: OSD Rotating Get
  params: []

# 0x26 - OSD Rotating Set
- id: osd_rotating_set
  label: OSD Rotating Set
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On

# 0x16 - Display Orientation Get
- id: display_orientation_get
  label: Display Orientation Get
  params: []

# 0x17 - Display Orientation Set
- id: display_orientation_set
  label: Display Orientation Set
  params:
    - name: auto_rotate
      type: integer
      description: 0x00=Off 0x01=On (DATA[1]) - Dragon 1/1.5 only
    - name: osd_rotation
      type: integer
      description: 0x00=Landscape 0x01=Portrait (DATA[2])
    - name: image_all
      type: integer
      description: 0x00=Off 0x01=On 0x02=OnClockWise 0x03=OnCounterClockWise (DATA[3])
    - name: window1
      type: integer
      description: 0x00=Off 0x01=On (DATA[4])
    - name: window2
      type: integer
      description: 0x00=Off 0x01=On (DATA[5])
    - name: window3
      type: integer
      description: 0x00=Off 0x01=On (DATA[6])
    - name: window4
      type: integer
      description: 0x00=Off 0x01=On (DATA[7])

# 0x2D - Information OSD Feature Get
- id: information_osd_get
  label: Information OSD Feature Get
  params: []

# 0x2C - Information OSD Feature Set
- id: information_osd_set
  label: Information OSD Feature Set
  params:
    - name: timeout
      type: integer
      description: 0x00=Off 0x01-0x3C=1-60 seconds (DATA[1])

# 0x29 - MEMC Effect Get
- id: memc_effect_get
  label: MEMC Effect Get
  params: []

# 0x28 - MEMC Effect Set
- id: memc_effect_set
  label: MEMC Effect Set
  params:
    - name: level
      type: integer
      description: 0x00=Off 0x01=Low 0x02=Medium 0x03=High

# 0x1F - Touch Feature Get
- id: touch_feature_get
  label: Touch Feature Get
  params: []

# 0x1E - Touch Feature Set
- id: touch_feature_set
  label: Touch Feature Set
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On

# 0x2B - Noise Reduction Get
- id: noise_reduction_get
  label: Noise Reduction Get
  params: []

# 0x2A - Noise Reduction Set
- id: noise_reduction_set
  label: Noise Reduction Set
  params:
    - name: level
      type: integer
      description: 0x00=Off 0x01=Low 0x02=Middle 0x03=High 0x04=default (Challenger2.1)

# 0x51 - Scan Mode Feature Get
- id: scan_mode_get
  label: Scan Mode Feature Get
  params: []

# 0x50 - Scan Mode Feature Set
- id: scan_mode_set
  label: Scan Mode Feature Set
  params:
    - name: mode
      type: integer
      description: 0x00=OverScan 0x01=UnderScan 0x02=Off 0x03-0x1C=0-25 (Challenger2.1)

# 0x53 - Scan Conversion Get
- id: scan_conversion_get
  label: Scan Conversion Get
  params: []

# 0x52 - Scan Conversion Set
- id: scan_conversion_set
  label: Scan Conversion Set
  params:
    - name: mode
      type: integer
      description: 0x00=Progressive 0x01=Interlace

# 0x55 - Switch On Delay (Tiling) Get
- id: switch_on_delay_get
  label: Switch On Delay Get
  params: []

# 0x54 - Switch On Delay (Tiling) Set
- id: switch_on_delay_set
  label: Switch On Delay Set
  params:
    - name: delay
      type: integer
      description: 0x00=Off 0x01=Auto 0x02-0xFF=2-255 seconds

# 0x56 - Factory Reset Set
- id: factory_reset_set
  label: Factory Reset Set
  params: []

# 0x3F - Power On Logo Get
- id: power_on_logo_get
  label: Power On Logo Get
  params: []

# 0x3E - Power On Logo Set
- id: power_on_logo_set
  label: Power On Logo Set
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=On 0x02=User

# 0x62 - Fan Speed Get
- id: fan_speed_get
  label: Fan Speed Get
  params: []

# 0x61 - Fan Speed Set
- id: fan_speed_set
  label: Fan Speed Set
  params:
    - name: speed
      type: integer
      description: 0x00=Off 0x01=Auto 0x02=Low 0x03=Middle 0x04=High

# 0xD1 - APM Status Get
- id: apm_status_get
  label: APM Status Get
  params: []

# 0xD0 - APM Status Set
- id: apm_status_set
  label: APM Status Set
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=On 0x02=Mode1(TCPoff/WOLon) 0x03=Mode2(TCPan/WOLoff)

# 0xD3 - Power Saving Mode Status Get
- id: power_saving_mode_get
  label: Power Saving Mode Status Get
  params: []

# 0xD2 - Power Saving Mode Status Set
- id: power_saving_mode_set
  label: Power Saving Mode Status Set
  params:
    - name: mode
      type: integer
      description: |
        0x00=RGBOff&VideoOff 0x01=RGBOff,VideoOn 0x02=RGBOn,VideoOff 0x03=RGBOn&VideoOn
        0x04-0x07=mode1-4 (Dragon 1.x/1.6/Challenger2.1)

# 0xB1 - Pixel Shift Get
- id: pixel_shift_get
  label: Pixel Shift Get
  params: []

# 0xB2 - Pixel Shift Set
- id: pixel_shift_set
  label: Pixel Shift Set
  params:
    - name: interval
      type: integer
      description: 0x00=Off 0x01=10s ... 0x5A=900s 0x5B=AUTO

# 0x91 - Off Timer Get
- id: off_timer_get
  label: Off Timer Get
  params: []

# 0x92 - Off Timer Set
- id: off_timer_set
  label: Off Timer Set
  params:
    - name: hours
      type: integer
      description: 0x00=Off 0x01-0x18=1-24 hours

# 0x63 - ECO Mode Get
- id: eco_mode_get
  label: ECO Mode Get
  params: []

# 0x64 - ECO Mode Set
- id: eco_mode_set
  label: ECO Mode Set
  params:
    - name: mode
      type: integer
      description: 0x00=low power standby 0x01=normal

# 0x65 - Picture Style Get
- id: picture_style_get
  label: Picture Style Get
  params: []

# 0x66 - Picture Style Set
- id: picture_style_set
  label: Picture Style Set
  params:
    - name: style
      type: integer
      description: |
        0x00=Highbright 0x01=sRGB 0x02=Vivid 0x03=Natural 0x04=Standard
        0x05=Video 0x06=StaticSignage 0x07=Text 0x08=EnergySaving 0x09=Soft 0x0A=User

# 0x58 - Take Screenshot and Email Set
- id: screenshot_email_set
  label: Take Screenshot and Email Set
  params: []

# 0x59 - Video Signal Present Get
- id: video_signal_present_get
  label: Video Signal Present Get
  params: []

# 0x5E - Frame Compensation Horizontal Get
- id: frame_comp_horz_get
  label: Frame Compensation Horizontal Get
  params: []

# 0x5F - Frame Compensation Horizontal Set
- id: frame_comp_horz_set
  label: Frame Compensation Horizontal Set
  params:
    - name: value
      type: integer
      description: 0x00-0xFF

# 0x67 - Frame Compensation Vertical Get
- id: frame_comp_vert_get
  label: Frame Compensation Vertical Get
  params: []

# 0x68 - Frame Compensation Vertical Set
- id: frame_comp_vert_set
  label: Frame Compensation Vertical Set
  params:
    - name: value
      type: integer
      description: 0x00-0xFF

# 0x5B - Scheduling Parameters Get
- id: scheduling_get
  label: Scheduling Parameters Get
  params:
    - name: page
      type: integer
      description: 1-7 scheduling page number (DATA[1])

# 0x5A - Scheduling Parameters Set
- id: scheduling_set
  label: Scheduling Parameters Set
  params:
    - name: page
      type: integer
      description: BIT7-4 = page 1-7; BIT0 = enable/disable (DATA[1])
    - name: start_hour
      type: integer
      description: 0-23 (DATA[2]); 24=NULL
    - name: start_minute
      type: integer
      description: 0-59 (DATA[3]); 60=NULL
    - name: end_hour
      type: integer
      description: 0-23 (DATA[4]); 24=NULL
    - name: end_minute
      type: integer
      description: 0-59 (DATA[5]); 60=NULL
    - name: video_source
      type: integer
      description: Same mapping as input source (DATA[6])
    - name: working_days
      type: integer
      description: Bit field - Bit0=EveryWeek Bit1=Mon ... Bit7=Sun (DATA[7])
    - name: tag
      type: integer
      description: 0x01-0x07=Tag1-7 (DATA[8]) - Dragon 1.x/1.6/Himalaya2.0 only

# 0x5D - Group ID Get
- id: group_id_get
  label: Group ID Get
  params: []

# 0x5C - Group ID Set
- id: group_id_set
  label: Group ID Set
  params:
    - name: group_id
      type: integer
      description: 0x01-0xFE=1-254; 0xFF=Off (old command)

# 0x69 - Monitor ID Set
- id: monitor_id_set
  label: Monitor ID Set
  params:
    - name: monitor_id
      type: integer
      description: 0x01-0xFF=1-254

# 0xFB - Execute Custom Multi-Window Set
- id: custom_multiwin_execute_set
  label: Execute Custom Multi-Window Set
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On (DATA[1])
    - name: windows
      type: integer
      description: 0x00=1window 0x01=2windows 0x02=3windows 0x03=4windows (DATA[2])

# 0xFD - Custom Multi-Window Report/Get
- id: custom_multiwin_report_get
  label: Custom Multi-Window Report/Get
  params:
    - name: window
      type: integer
      description: 0x00=Main 0x01=Sub1 0x02=Sub2 0x03=Sub3 (DATA[1])

# 0xFC - Custom Multi-Window Set
- id: custom_multiwin_set
  label: Custom Multi-Window Set
  params:
    - name: window
      type: integer
      description: 0x00=Main 0x01=Sub1 0x02=Sub2 0x03=Sub3 (DATA[1])
    - name: rotation
      type: integer
      description: 0x00=ROT_NONE 0x01=ROT_90 0x02=ROT_270 0x03=ROT_H_MIRROR 0x04=ROT_V_MIRROR 0x05=ROT_HV_MIRROR (DATA[2])
    - name: x_position
      type: integer
      description: Pixel X position, 2 bytes big-endian (DATA[3-4])
    - name: y_position
      type: integer
      description: Pixel Y position, 2 bytes big-endian (DATA[5-6])
    - name: width
      type: integer
      description: Pixel width, 2 bytes big-endian (DATA[7-8])
    - name: height
      type: integer
      description: Pixel height, 2 bytes big-endian (DATA[9-10])
    - name: picture_format
      type: integer
      description: 0x00-0x06; 0xFF=keepCurrent (DATA[11])

# 0x1C - IR Remote Control Lock Set
- id: ir_remote_lock_set
  label: IR Remote Control Lock Set
  params:
    - name: lock_state
      type: integer
      description: |
        0x01=UnlockAll 0x02=LockAll 0x03=LockAllButPower 0x04=LockAllButVolume
        0x05=Primary(Master) 0x06=Secondary(DaisyChainPD) 0x07=LockAllExceptPowerAndVolume

# 0x1D - IR Remote Control Lock Get
- id: ir_remote_lock_get
  label: IR Remote Control Lock Get
  params: []

# 0x1A - Keypad Lock Set
- id: keypad_lock_set
  label: Keypad Lock Set
  params:
    - name: lock_state
      type: integer
      description: 0x01=UnlockAll 0x02=LockAll 0x03=LockAllButPower 0x04=LockAllButVolume 0x07=LockAllExceptPowerAndVolume

# 0x1B - Keypad Lock Get
- id: keypad_lock_get
  label: Keypad Lock Get
  params: []

# 0xF1 - External Storage Lock Set
- id: external_storage_lock_set
  label: External Storage Lock Set
  params:
    - name: state
      type: integer
      description: 0x00=unlocked 0x01=Locked

# 0xF2 - External Storage Lock Get
- id: external_storage_lock_get
  label: External Storage Lock Get
  params: []

# 0xF3 - LED Strip Set
- id: led_strip_set
  label: LED Strip Set
  params:
    - name: state
      type: integer
      description: 0x00=off 0x01=on (DATA[1])
    - name: red
      type: integer
      description: 0x00-0xFF (DATA[2]) - only if DATA[1]=0x01
    - name: green
      type: integer
      description: 0x00-0xFF (DATA[3])
    - name: blue
      type: integer
      description: 0x00-0xFF (DATA[4])

# 0xF4 - LED Strip Get
- id: led_strip_get
  label: LED Strip Get
  params: []
# 0xA2 - Platform and Version Labels Get
- id: platform_version_get
  label: Platform and Version Labels Get
  params:
    - name: label
      type: integer
      description: 0x00=Get SICP version 0x01=Get platform label 0x02=Get platform version

# 0xA1 - Model Number / FW Version Get
- id: model_info_get
  label: Model Number / FW Version Get
  params:
    - name: code
      type: integer
      description: 0x00=Model Number 0x01=FW version 0x02=Build Date 0x03=Android FW version

# 0xC0 - AnyTile Assign Group ID and Monitor ID (IP only)
- id: anytile_group_monitor_id_set
  label: AnyTile Assign Group ID and Monitor ID Set
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (DATA[1]); IP connection only, not via RS-232
    - name: group_id
      type: integer
      description: Group ID (DATA[2]); IP connection only, not via RS-232

# 0x4C - Display Monitor ID on OSD Set
- id: display_monitor_id_osd_set
  label: Display Monitor ID on OSD Set
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID to display on screen (DATA[1])

# 0x4A - AnyTile Custom Tiling Get
- id: anytile_get
  label: AnyTile Custom Tiling Get
  params: []

# 0x4B - AnyTile Custom Tiling Set
- id: anytile_set
  label: AnyTile Custom Tiling Set
  params:
    - name: enable
      type: integer
      description: 0x00=No 0x01=Yes (DATA[1])
    - name: rotation_lsb
      type: integer
      description: Rotation lsb; 0deg=0x00, 90deg=0x5A, 270deg=0x0E (DATA[2])
    - name: rotation_msb
      type: integer
      description: Rotation msb; 0deg=0x00, 90deg=0x00, 270deg=0x10 (DATA[3])
    - name: input_h_start_lsb
      type: integer
      description: H Start of captured input picture lsb (DATA[4])
    - name: input_h_start_msb
      type: integer
      description: H Start of captured input picture msb (DATA[5])
    - name: input_v_start_lsb
      type: integer
      description: V Start of captured input picture lsb (DATA[6])
    - name: input_v_start_msb
      type: integer
      description: V Start of captured input picture msb (DATA[7])
    - name: input_h_size_lsb
      type: integer
      description: H Size of captured input picture lsb (DATA[8])
    - name: input_h_size_msb
      type: integer
      description: H Size of captured input picture msb (DATA[9])
    - name: input_v_size_lsb
      type: integer
      description: V Size of captured input picture lsb (DATA[10])
    - name: input_v_size_msb
      type: integer
      description: V Size of captured input picture msb (DATA[11])

# 0x4E - AnyTile Resolution Mode Get
- id: anytile_resolution_get
  label: AnyTile Resolution Mode Get
  params: []

# 0x4F - AnyTile Resolution Mode Set
- id: anytile_resolution_set
  label: AnyTile Resolution Mode Set
  params:
    - name: mode
      type: integer
      description: 0x00=default 0x01=FHD 0x02=UHD4K (DATA[1])
```

## Feedbacks
```yaml
# ACK reply - Command accepted
- id: ack_reply
  label: ACK Reply
  type: enum
  values:
    - code: 0x06
      description: Acknowledge - command well executed

# NACK reply - Command rejected
- id: nack_reply
  label: NACK Reply
  type: enum
  values:
    - code: 0x15
      description: Not Acknowledge - wrong command code or data

# NAV reply - Command not available
- id: nav_reply
  label: NAV Reply
  type: enum
  values:
    - code: 0x18
      description: Not Available - command not relevant/cannot execute

# Generic report - DATA[0]=0x00
- id: generic_report
  label: Generic Report
  type: object
  properties:
    - name: data0
      type: integer
      description: Always 0x00 = Communication Control Report
    - name: data1
      type: integer
      description: 0x06=ACK 0x15=NACK 0x18=NAV

# Power State Report
- id: power_state_report
  label: Power State Report
  type: object
  properties:
    - name: state
      type: enum
      values:
        - 0x01: Power Off
        - 0x02: On

# Input Source Report
- id: input_source_report
  label: Input Source Report
  type: object
  properties:
    - name: source
      type: integer
      description: Same mapping as input source set (0x01-0x1C)
    - name: playlist_url
      type: integer
      description: 0x00=no playlist/URL; 0x01-0x07=file/URL number
    - name: osd_style
      type: integer
      description: Bit field - Bit6=do not switch, Bit2-0=source label display style
    - name: mute_style
      type: integer
      description: Reserved (bits all 0)

# Volume Report
- id: volume_report
  label: Volume Report
  type: object
  properties:
    - name: speaker_out
      type: integer
      description: 0-100 (0x00-0x64)
    - name: audio_out
      type: integer
      description: 0-100 - some platforms (Himalaya 1.0/1.2, Eagle) omit this byte

# Video Parameters Report
- id: video_parameters_report
  label: Video Parameters Report
  type: object
  properties:
    - name: brightness
      type: integer
      description: 0-100 (DATA[1])
    - name: color
      type: integer
      description: 0-100 (DATA[2])
    - name: contrast
      type: integer
      description: 0-100 (DATA[3])
    - name: sharpness
      type: integer
      description: 0-100; Phoenix2.0: 0-10 (DATA[4])
    - name: tint
      type: integer
      description: 0-100; Phoenix2.0: -50 to +50 (DATA[5])
    - name: black_level
      type: integer
      description: 0-100 (DATA[6])
    - name: gamma
      type: integer
      description: 0x01-0x05 (DATA[7])

# Color Temperature Report
- id: color_temperature_report
  label: Color Temperature Report
  type: enum
  values:
    - 0x00: User1
    - 0x01: Native
    - 0x02: 11000K (N/A)
    - 0x03: 10000K
    - 0x04: 9300K
    - 0x05: 7500K
    - 0x06: 6500K
    - 0x07: 5770K (N/A)
    - 0x08: 5500K (N/A)
    - 0x09: 5000K
    - 0x0A: 4000K
    - 0x0B: 3400K (N/A)
    - 0x0C: 3350K (N/A)
    - 0x0D: 3000K
    - 0x0E: 2800K (N/A)
    - 0x0F: 2600K (N/A)
    - 0x10: 1850K (N/A)
    - 0x12: User2

# Serial Code Report - 14 ASCII characters
- id: serial_code_report
  label: Serial Code Report
  type: string
  description: 14-character ASCII serial number (DATA[1]-DATA[14])

# Temperature Sensors Report
- id: temperature_sensors_report
  label: Temperature Sensors Report
  type: object
  properties:
    - name: sensor1
      type: integer
      description: 0-100 Celsius (DATA[1])
    - name: sensor2
      type: integer
      description: 0-100 Celsius (DATA[2]) - Dragon 1.0/2.0 only supports DATA[1]

# Tiling Report
- id: tiling_report
  label: Tiling Report
  type: object
  properties:
    - name: enable
      type: integer
      description: 0x00=No 0x01=Yes (DATA[1])
    - name: frame_comp
      type: integer
      description: 0x00=No 0x01=Yes (DATA[2])
    - name: position
      type: integer
      description: 1-150 (Zero Bezel) or 1-25 (other models) (DATA[3])
    - name: monitors
      type: integer
      description: Encoded H/V monitor count (DATA[4])

# Scheduling Report
- id: scheduling_report
  label: Scheduling Report
  type: object
  properties:
    - name: page_enable
      type: integer
      description: 0=disabled 1=enabled (DATA[1])
    - name: start_hour
      type: integer
      description: 0-23; 24=NULL (DATA[2])
    - name: start_minute
      type: integer
      description: 0-59; 60=NULL (DATA[3])
    - name: end_hour
      type: integer
      description: 0-23; 24=NULL (DATA[4])
    - name: end_minute
      type: integer
      description: 0-59; 60=NULL (DATA[5])
    - name: video_source
      type: integer
      description: Same mapping as input source (DATA[6])
    - name: working_days
      type: integer
      description: Bit field (DATA[7])
    - name: tag
      type: integer
      description: 0x01-0x07 (DATA[8]) - Dragon 1.x/1.6/Himalaya2.0 only

# SICP/Platform Version Report
- id: sicp_version_report
  label: SICP/Platform Version Report
  type: object
  properties:
    - name: version_string
      type: string
      description: Up to 36 ASCII characters (DATA[1]-DATA[N])

# Model Number / FW Version Report
- id: model_info_report
  label: Model Number / FW Version Report
  type: object
  properties:
    - name: info_string
      type: string
      description: Up to 36 ASCII characters (DATA[1]-DATA[N])

# Auto Signal Detecting Report
- id: auto_signal_detecting_report
  label: Auto Signal Detecting Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: All
    - 0x03: PC sources only
    - 0x04: Video sources only
    - 0x05: Failover

# Failover Report
- id: failover_report
  label: Failover Report
  type: object
  description: 16 priority slots DATA[1]-DATA[16], same encoding as input source

# PIP Report
- id: pip_report
  label: PIP Report
  type: object
  properties:
    - name: mode
      type: integer
      description: 0x00-0x0A (see PIP Set)
    - name: position
      type: integer
      description: 0x00-0x04

# PIP Source Report
- id: pip_source_report
  label: PIP Source Report
  type: object
  properties:
    - name: source_type
      type: integer
      description: 0xFD=InputSource 0xFE=Smartcard (DATA[1])
    - name: q2_source
      type: integer
      description: Q2 source number (DATA[2])
    - name: q3_source
      type: integer
      description: Q3 source number (DATA[3]) - Dragon 1.x/1.6 omit
    - name: q4_source
      type: integer
      description: Q4 source number (DATA[4]) - Dragon 1.x/1.6 omit

# Custom Multi-Window Report
- id: custom_multiwin_report
  label: Custom Multi-Window Report
  type: object
  properties:
    - name: window
      type: integer
      description: 0x00=Main 0x01=Sub1 0x02=Sub2 0x03=Sub3 (DATA[1])
    - name: rotation
      type: integer
      description: 0x00-0x05 (DATA[2])
    - name: x_position
      type: integer
      description: 2-byte big-endian (DATA[3-4])
    - name: y_position
      type: integer
      description: 2-byte big-endian (DATA[5-6])
    - name: width
      type: integer
      description: 2-byte big-endian (DATA[7-8])
    - name: height
      type: integer
      description: 2-byte big-endian (DATA[9-10])
    - name: picture_format
      type: integer
      description: 0x00-0x06 (DATA[11]) - Dragon 1.x doesn't support 0x05

# Color Parameters Report
- id: color_parameters_report
  label: Color Parameters Report
  type: object
  properties:
    - name: red_gain
      type: integer
      description: 0-255 (DATA[1])
    - name: green_gain
      type: integer
      description: 0-255 (DATA[2])
    - name: blue_gain
      type: integer
      description: 0-255 (DATA[3])
    - name: red_offset
      type: integer
      description: 0-255 (DATA[4])
    - name: green_offset
      type: integer
      description: 0-255 (DATA[5])
    - name: blue_offset
      type: integer
      description: 0-255 (DATA[6])

# Audio Parameters Report
- id: audio_parameters_report
  label: Audio Parameters Report
  type: object
  properties:
    - name: treble
      type: integer
      description: 0-100; Phoenix2.0: -8 to +8 (DATA[1])
    - name: bass
      type: integer
      description: 0-100; Phoenix2.0: -8 to +8 (DATA[2])

# Volume Limits Speaker Report
- id: volume_limits_speaker_report
  label: Volume Limits Speaker Report
  type: object
  properties:
    - name: minimum
      type: integer
      description: 0-100 (DATA[1])
    - name: maximum
      type: integer
      description: 0-100 (DATA[2])
    - name: switch_on
      type: integer
      description: 0-100 (DATA[3])

# Volume Limits Audio Report
- id: volume_limits_audio_report
  label: Volume Limits Audio Report
  type: object
  properties:
    - name: minimum
      type: integer
      description: 0-100 (DATA[1])
    - name: maximum
      type: integer
      description: 0-100 (DATA[2])
    - name: switch_on
      type: integer
      description: 0-100 (DATA[3])

# Volume Mute Report
- id: volume_mute_report
  label: Volume Mute Report
  type: enum
  values:
    - 0x00: Mute off
    - 0x01: Mute on

# Picture Format Report
- id: picture_format_report
  label: Picture Format Report
  type: enum
  values:
    - 0x00: Normal (4:3)
    - 0x01: Custom
    - 0x02: Real (1:1)
    - 0x03: Full
    - 0x04: 21:9
    - 0x05: Dynamic (not supported Dragon 1.x)
    - 0x06: 16:9

# VGA Video Parameters Report
- id: vga_video_parameters_report
  label: VGA Video Parameters Report
  type: object
  properties:
    - name: clock
      type: integer
      description: 0-100 (DATA[1])
    - name: clock_phase
      type: integer
      description: 0-100 (DATA[2])
    - name: h_position
      type: integer
      description: 0-100 (DATA[3])
    - name: v_position
      type: integer
      description: 0-100 (DATA[4])

# Backlight Report
- id: backlight_report
  label: Backlight Report
  type: enum
  values:
    - 0x00: Backlight on
    - 0x01: Backlight off

# Smart Power Report
- id: smart_power_report
  label: Smart Power Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: Low
    - 0x02: Medium
    - 0x03: High

# Light Sensor Report
- id: light_sensor_report
  label: Light Sensor Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: On
    - 0xFF: HW unavailable

# Human Sensor Report
- id: human_sensor_report
  label: Human Sensor Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: 10 mins
    - 0x02: 20 mins
    - 0x03: 30 mins
    - 0x04: 40 mins
    - 0x05: 50 mins
    - 0x06: 60 mins
    - 0xFF: HW unavailable

# OSD Rotating Report
- id: osd_rotating_report
  label: OSD Rotating Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: On

# Display Orientation Report
- id: display_orientation_report
  label: Display Orientation Report
  type: object
  properties:
    - name: auto_rotate
      type: integer
      description: 0x00=Off 0x01=On (Dragon 1/1.5 only)
    - name: osd_rotation
      type: integer
      description: 0x00=Landscape 0x01=Portrait
    - name: image_all
      type: integer
      description: 0x00=Off 0x01=On 0x02=OnClockWise 0x03=OnCounterClockWise
    - name: window1
      type: integer
      description: 0x00=Off 0x01=On
    - name: window2
      type: integer
      description: 0x00=Off 0x01=On
    - name: window3
      type: integer
      description: 0x00=Off 0x01=On
    - name: window4
      type: integer
      description: 0x00=Off 0x01=On

# Information OSD Report
- id: information_osd_report
  label: Information OSD Report
  type: enum
  values:
    - 0x00: Off
    - 0x01-0x3C: 1-60 seconds

# MEMC Effect Report
- id: memc_effect_report
  label: MEMC Effect Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: Low
    - 0x02: Medium
    - 0x03: High

# Touch Feature Report
- id: touch_feature_report
  label: Touch Feature Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: On

# Noise Reduction Report
- id: noise_reduction_report
  label: Noise Reduction Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: Low
    - 0x02: Middle
    - 0x03: High
    - 0x04: default (Challenger 2.1)

# Scan Mode Report
- id: scan_mode_report
  label: Scan Mode Report
  type: enum
  values:
    - 0x00: Over scan
    - 0x01: Under scan
    - 0x02: Off
    - 0x03-0x1C: 0-25 (Challenger 2.1)

# Scan Conversion Report
- id: scan_conversion_report
  label: Scan Conversion Report
  type: enum
  values:
    - 0x00: Progressive
    - 0x01: Interlace

# Switch On Delay Report
- id: switch_on_delay_report
  label: Switch On Delay Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: Auto
    - 0x02-0xFF: 2-255 seconds

# Power On Logo Report
- id: power_on_logo_report
  label: Power On Logo Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: On
    - 0x02: User

# Fan Speed Report
- id: fan_speed_report
  label: Fan Speed Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: Auto
    - 0x02: Low
    - 0x03: Middle
    - 0x04: High

# APM Status Report
- id: apm_status_report
  label: APM Status Report
  type: enum
  values:
    - 0x00: Off
    - 0x01: On
    - 0x02: Mode 1 (TCP off / WOL on)
    - 0x03: Mode 2 (TCP on / WOL off)

# Power Saving Mode Status Report
- id: power_saving_mode_report
  label: Power Saving Mode Status Report
  type: enum
  values:
    - 0x00: RGB Off & Video Off
    - 0x01: RGB Off, Video On
    - 0x02: RGB On, Video Off
    - 0x03: RGB On & Video On
    - 0x04-0x07: mode 1-4 (Dragon 1.x/1.6/Challenger 2.1)

# Pixel Shift Report
- id: pixel_shift_report
  label: Pixel Shift Report
  type: enum
  values:
    - 0x00: Off
    - 0x01-0x5A: 10-900 seconds
    - 0x5B: AUTO

# Off Timer Report
- id: off_timer_report
  label: Off Timer Report
  type: enum
  values:
    - 0x00: Off
    - 0x01-0x18: 1-24 hours

# ECO Mode Report
- id: eco_mode_report
  label: ECO Mode Report
  type: enum
  values:
    - 0x00: low power standby
    - 0x01: normal

# Picture Style Report
- id: picture_style_report
  label: Picture Style Report
  type: enum
  values:
    - 0x00: Highbright
    - 0x01: sRGB
    - 0x02: Vivid
    - 0x03: Natural
    - 0x04: Standard
    - 0x05: Video
    - 0x06: Static Signage
    - 0x07: Text
    - 0x08: Energy saving
    - 0x09: Soft
    - 0x0A: User

# Video Signal Present Report
- id: video_signal_present_report
  label: Video Signal Present Report
  type: enum
  values:
    - 0x00: Video not present
    - 0x01: Video present

# Frame Compensation Horizontal Report
- id: frame_comp_horz_report
  label: Frame Compensation Horizontal Report
  type: integer
  description: 0x00-0xFF (DATA[1])

# Frame Compensation Vertical Report
- id: frame_comp_vert_report
  label: Frame Compensation Vertical Report
  type: integer
  description: 0x00-0xFF (DATA[1])

# Group ID Report
- id: group_id_report
  label: Group ID Report
  type: enum
  values:
    - 0x01-0xFE: 1-254
    - 0xFF: Off

# IR Remote Lock Report
- id: ir_remote_lock_report
  label: IR Remote Lock Report
  type: enum
  values:
    - 0x01: Unlock all
    - 0x02: Lock all
    - 0x03: Lock all but Power
    - 0x04: Lock all but Volume
    - 0x05: Primary (Master)
    - 0x06: Secondary (Daisy chain PD)
    - 0x07: Lock all except Power & Volume

# Keypad Lock Report
- id: keypad_lock_report
  label: Keypad Lock Report
  type: enum
  values:
    - 0x01: Unlock all
    - 0x02: Lock all
    - 0x03: Lock all but Power
    - 0x04: Lock all but Volume
    - 0x07: Lock all except Power & Volume

# External Storage Lock Report
- id: external_storage_lock_report
  label: External Storage Lock Report
  type: enum
  values:
    - 0x00: Unlocked
    - 0x01: Locked

# LED Strip Report
- id: led_strip_report
  label: LED Strip Report
  type: object
  properties:
    - name: state
      type: enum
      values:
        - 0x00: off
        - 0x01: on
    - name: red
      type: integer
      description: 0x00-0xFF (DATA[2])
    - name: green
      type: integer
      description: 0x00-0xFF (DATA[3])
    - name: blue
      type: integer
      description: 0x00-0xFF (DATA[4])

# Color Temperature 100K Steps Report
- id: color_temperature_100k_report
  label: Color Temperature 100K Steps Report
  type: integer
  description: 0x14(20)=2000K through 0x64(100)=10000K

# Power at Cold Start Report
- id: power_at_cold_start_report
  label: Power at Cold Start Report
  type: enum
  values:
    - 0x00: Power Off
    - 0x01: Forced On
    - 0x02: Last Status

# Operating Hours Report
- id: operating_hours_report
  label: Operating Hours Report
  type: integer
  description: 16-bit unsigned value - DATA[1]<<8 | DATA[2]

# Misc Info Report (generic)
- id: misc_info_report
  label: Misc Info Report
  type: object
  properties:
    - name: item
      type: integer
      description: Requested item code (DATA[0])
    - name: value
      type: string
      description: ASCII string up to 36 chars for the requested info type
```

## Variables
```yaml
# All settable parameters that are not discrete on/off action commands are
# represented as Actions above (Video Parameters, Color Temperature, Volume, etc.)
# This section is intentionally minimal - primary control is via action commands.
# UNRESOLVED: no separate Variables section identified in SICP protocol;
# all settable state is accessed via Get/Set action pairs
```

## Events
```yaml
# SICP does not define unsolicited event notifications.
# The device only responds to Get commands or acknowledges Set commands.
# No push-style events are defined in the source specification.
# UNRESOLVED: no unsolicited event/notification messages defined in source
```

## Macros
```yaml
# No explicit multi-step macro sequences are defined in the source.
# Sequences such as "Factory Reset" involve resetting multiple independent
# parameters - the source lists what gets reset but does not define a
# single composite command.
# UNRESOLVED: no explicit macro definitions in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

**Protocol**: SICP V2.03 binary protocol over RS-232C or TCP/IP. Packet format: `[MsgSize][Control][Group][Data0][...DataN][Checksum]`. Checksum = XOR of all bytes except checksum. MsgSize range: 3-40 (0x03-0x28). Control byte: bits 7-0 = Monitor ID (1-255), broadcast ID=0 (no ACK expected). Group byte optional — if group=0 no ACK sent; if group!=0 ACK sent only to individual monitor.

**TCP/IP**: Port 5000 stated as default for all Philips displays. Ethernet and RS-232 share the same command set.

**Retry timing**: If no response within 500ms, retry may be triggered.

**ID addressing**: Wrong ID address produces no reply. Broadcast ID (0) produces no ACK/report due to daisy-chain collision risk.

**Platform dependency**: Many commands have platform-specific support caveats (Himalaya 1.0 vs Dragon 1.x vs Phoenix 2.0 etc.). The command summary table in section 16 lists per-command platform notes. Specific model compatibility for HFL7011 Series not enumerated in this document — the spec covers the general Philips signage platform.

**PINOUT**: RS-232C uses RXD (pin 3), TXD (pin 2), GND (pin 5). Null modem crossover required.

<!-- UNRESOLVED: HFL7011 specific firmware version compatibility not stated; platform table does not include HFL7011 models -->
<!-- UNRESOLVED: Authentication/token format not stated — source describes no login/password procedure -->
<!-- UNRESOLVED: No unsolicited event/notification definitions in source -->
<!-- UNRESOLVED: No explicit macro definitions in source -->

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
  - documents.philips.com
  - manua.ls
  - support.westan.com.au
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.documents.philips.com/assets/20230303/88479c9c662e4af3b544afba0138b723.pdf
  - https://www.documents.philips.com/assets/20230302/5c0833d64ccd4b64abedafb90078f690.pdf
  - https://www.manua.ls/philips/65hfl7011t/manual
  - https://support.westan.com.au/portal/en-gb
retrieved_at: 2026-05-19T07:09:11.631Z
last_checked_at: 2026-06-10T00:45:59.471Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:45:59.471Z
matched_actions: 117
action_count: 117
confidence: medium
summary: "All 117 spec action-units matched verbatim to source SICP V2.03 opcodes and parameter shapes; transport confirmed; only 0xFE (MIC color calibration, reserved for future use) is present in source but absent from spec. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- 0xFE
- "specific HFL7011 model variants not listed; document covers broad Philips signage platform"
- "no separate Variables section identified in SICP protocol;"
- "no unsolicited event/notification messages defined in source"
- "no explicit macro definitions in source"
- "no safety warnings or interlock procedures stated in source"
- "HFL7011 specific firmware version compatibility not stated; platform table does not include HFL7011 models"
- "Authentication/token format not stated — source describes no login/password procedure"
- "No unsolicited event/notification definitions in source"
- "No explicit macro definitions in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
