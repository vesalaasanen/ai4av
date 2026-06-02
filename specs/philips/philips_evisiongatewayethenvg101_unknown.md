---
spec_id: admin/philips-evisiongatewayethenvg101
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips EvisionGateway ETHENVG101 Control Spec"
manufacturer: Philips
model_family: "EvisionGateway ETHENVG101"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "EvisionGateway ETHENVG101"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
  - images.philips.com
  - usa.philips.com
  - philips.com.my
  - philips.ca
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - "https://images.philips.com/is/content/PhilipsConsumer/PDFDownloads/Central%20America/techincal-sheets/ODLI20180125_001-UPD-es_CE-EnvisionGateway_Data_Sheet_Sep_2014.pdf"
  - https://www.usa.philips.com/c-w/support-home/support-software-and-drivers.html
  - https://www.philips.com.my/c-w/support-home/support-software-and-drivers.html
  - https://www.philips.ca/c-w/support-home/support-software-and-drivers.html
retrieved_at: 2026-05-13T15:46:52.453Z
last_checked_at: 2026-06-02T22:13:05.120Z
generated_at: 2026-06-02T22:13:05.120Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific firmware version compatibility not stated; applies to multiple platforms (Eagle, Himalaya, Dragon, Phoenix, QL, Challenger)"
  - "variables that are persisted settings but not discrete actions."
  - "no unsolicited event descriptions found in source."
  - "no explicit multi-step macro sequences described in source."
  - "no safety warnings or interlock procedures in source."
  - "specific firmware versions where commands are available are marked TBC in source."
  - "portrait orientation support varies by platform."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:05.120Z
  matched_actions: 117
  action_count: 117
  confidence: medium
  summary: "All 117 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Philips EvisionGateway ETHENVG101 Control Spec

## Summary
Philips professional display supporting SICP v2.03 protocol over RS-232 and TCP/Ethernet. Controls power state, input routing, video/audio parameters, PIP, tiling, scheduling, and diagnostics. Default TCP port is 5000; RS-232 supports 1200–57600 baud (default 9600). No authentication required.

<!-- UNRESOLVED: specific firmware version compatibility not stated; applies to multiple platforms (Eagle, Himalaya, Dragon, Phoenix, QL, Challenger) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5000  # stated: "TCP/IP port 5000 is used by default for control"
serial:
  baud_rate: 9600  # stated: "9600(default)"
  data_bits: 8     # stated: "Data bits: 8"
  parity: none      # stated: "Parity: None"
  stop_bits: 1     # stated: "Stop Bit: 1"
  flow_control: none  # stated: "Flow Control: None"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # power on/off commands present (0x18/0x19)
- routable       # input/source routing commands present (0xAC/0xAD)
- queryable      # get commands returning state present
- levelable      # volume, brightness, contrast control present
```

## Actions
```yaml
- id: power_state_set
  label: Power State Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x01 = Power Off, 0x02 = On
  opcode: 0x18

- id: power_state_get
  label: Power State Get
  kind: action
  params: []
  opcode: 0x19

- id: power_at_cold_start_set
  label: Power at Cold Start Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00 = Power Off, 0x01 = Forced On, 0x02 = Last Status
  opcode: 0xA3

- id: power_at_cold_start_get
  label: Power at Cold Start Get
  kind: action
  params: []
  opcode: 0xA4

- id: input_source_set
  label: Input Source Set
  kind: action
  params:
    - name: source
      type: integer
      description: 0x01=VIDEO 0x05=VGA 0x0D=HDMI 0x0E=DVI-D 0x0A=DP 0x0C=USB 0x10=BROWSER 0x16=MediaPlayer 0x17=PDFPlayer 0x1C=IWB
    - name: playlist_number
      type: integer
      description: Playlist/URL number (0x01-0x07) for media sources
  opcode: 0xAC

- id: input_source_get
  label: Input Source Get
  kind: action
  params: []
  opcode: 0xAD

- id: auto_signal_detecting_set
  label: Auto Signal Detecting Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=All 0x03=PCsources 0x04=Videosources 0x05=Failover
  opcode: 0xAE

- id: auto_signal_detecting_get
  label: Auto Signal Detecting Get
  kind: action
  params: []
  opcode: 0xAF

- id: failover_set
  label: Failover Set
  kind: action
  params:
    - name: priority1
      type: integer
      description: 1st priority source 0x00=HDMI 0x01=Component 0x02=Composite 0x03=DP 0x04=DVI-D 0x05=VGA 0x06=OPS 0x07=USB 0x08=Browser 0x09=SmartCMS 0x0A=InternalStorage 0x0B=DMS 0x0C=HDMI2 0x0D=HDMI3 0x13=HDMI4 0x14=VGA2 0x15=VGA3 0x16=IWB
    - name: priority2
      type: integer
      description: 2nd priority source
    - name: priority3
      type: integer
      description: 3rd priority source
    - name: priority4
      type: integer
      description: 4th priority source
    - name: priority5
      type: integer
      description: 5th priority source
    - name: priority6
      type: integer
      description: 6th priority source
    - name: priority7
      type: integer
      description: 7th priority source
    - name: priority8
      type: integer
      description: 8th priority source
    - name: priority9
      type: integer
      description: 9th priority source
    - name: priority10
      type: integer
      description: 10th priority source
    - name: priority11
      type: integer
      description: 11th priority source
    - name: priority12
      type: integer
      description: 12th priority source
    - name: priority13
      type: integer
      description: 13th priority source
    - name: priority14
      type: integer
      description: 14th priority source
    - name: priority15
      type: integer
      description: 15th priority source
    - name: priority16
      type: integer
      description: 16th priority source
  opcode: 0xA5

- id: failover_get
  label: Failover Get
  kind: action
  params: []
  opcode: 0xA6

- id: monitor_restart
  label: Monitor Restart
  kind: action
  params:
    - name: target
      type: integer
      description: 0x00=Android 0x01=Scalar
  opcode: 0x57

- id: backlight_set
  label: Backlight On-Off Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=backlight on 0x01=backlight off
  opcode: 0x72

- id: backlight_get
  label: Backlight On-Off Get
  kind: action
  params: []
  opcode: 0x71

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  params:
    - name: brightness
      type: integer
      description: 0-100 (%)
    - name: color
      type: integer
      description: 0-100 (%)
    - name: contrast
      type: integer
      description: 0-100 (%)
    - name: sharpness
      type: integer
      description: 0-100 (%)
    - name: tint
      type: integer
      description: 0-100 (%) or -50-+50 for Phoenix2.0
    - name: black_level
      type: integer
      description: 0-100 (%)
    - name: gamma
      type: integer
      description: 0x01=Native 0x02=Sgamma 0x03=2.2 0x04=2.4 0x05=DICOM
  opcode: 0x32

- id: video_parameters_get
  label: Video Parameters Get
  kind: action
  params: []
  opcode: 0x33

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  params:
    - name: temperature
      type: integer
      description: 0x00=User1 0x01=Native 0x03=10000K 0x04=9300K 0x05=7500K 0x06=6500K 0x09=5000K 0x0A=4000K 0x0D=3000K 0x12=User2
  opcode: 0x34

- id: color_temperature_get
  label: Color Temperature Get
  kind: action
  params: []
  opcode: 0x35

- id: color_temperature_100k_set
  label: Color Temperature 100K Steps Set
  kind: action
  params:
    - name: steps
      type: integer
      description: 20-100 representing 2000K-10000K (0x14=20=2000K ... 0x64=100=10000K)
  opcode: 0x11

- id: color_temperature_100k_get
  label: Color Temperature 100K Steps Get
  kind: action
  params: []
  opcode: 0x12

- id: rgb_parameters_set
  label: RGB Parameters Set
  kind: action
  params:
    - name: red_gain
      type: integer
      description: 0-255
    - name: green_gain
      type: integer
      description: 0-255
    - name: blue_gain
      type: integer
      description: 0-255
    - name: red_offset
      type: integer
      description: 0-255
    - name: green_offset
      type: integer
      description: 0-255
    - name: blue_offset
      type: integer
      description: 0-255
  opcode: 0x36

- id: rgb_parameters_get
  label: RGB Parameters Get
  kind: action
  params: []
  opcode: 0x37

- id: picture_format_set
  label: Picture Format Set
  kind: action
  params:
    - name: format
      type: integer
      description: 0x00=Normal(4:3) 0x01=Custom 0x02=Real(1:1) 0x03=Full 0x04=21:9 0x05=Dynamic 0x06=16:9
  opcode: 0x3A

- id: picture_format_get
  label: Picture Format Get
  kind: action
  params: []
  opcode: 0x3B

- id: vga_video_parameters_set
  label: VGA Video Parameters Set
  kind: action
  params:
    - name: clock
      type: integer
      description: 0-100 (%)
    - name: clock_phase
      type: integer
      description: 0-100 (%)
    - name: h_position
      type: integer
      description: 0-100 (%)
    - name: v_position
      type: integer
      description: 0-100 (%)
  opcode: 0x38

- id: vga_video_parameters_get
  label: VGA Video Parameters Get
  kind: action
  params: []
  opcode: 0x39

- id: pip_set
  label: Picture-in-Picture Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=On(PIP) 0x02=POP 0x03=QuickSwap 0x04=PBP2win 0x05=PBP3win 0x06=PBP4win 0x07=PBP3win-1 0x08=PBP3win-2 0x09=PBP4win-1 0x0A=SICP
    - name: position
      type: integer
      description: 0x00=bottom-left 0x01=top-left 0x02=top-right 0x03=bottom-right 0x04=center
  opcode: 0x3C

- id: pip_get
  label: Picture-in-Picture Get
  kind: action
  params: []
  opcode: 0x3D

- id: pip_source_set
  label: PIP Source Set
  kind: action
  params:
    - name: source_type
      type: integer
      description: 0xFD=InputSource 0xFE=Smartcard
    - name: q2_source
      type: integer
      description: Q2 source number (same encoding as input sources)
    - name: q3_source
      type: integer
      description: Q3 source number
    - name: q4_source
      type: integer
      description: Q4 source number
  opcode: 0x84

- id: pip_source_get
  label: PIP Source Get
  kind: action
  params: []
  opcode: 0x85

- id: volume_set
  label: Volume Set
  kind: action
  params:
    - name: speaker_volume
      type: integer
      description: 0-100 (%) speaker out
    - name: audio_volume
      type: integer
      description: 0-100 (%) audio out
  opcode: 0x44

- id: volume_get
  label: Volume Get
  kind: action
  params: []
  opcode: 0x45

- id: volume_up_down
  label: Volume Up/Down
  kind: action
  params:
    - name: speaker_direction
      type: integer
      description: 0=down 1=up 2=no change
    - name: audio_direction
      type: integer
      description: 0=down 1=up 2=no change
  opcode: 0x41

- id: volume_limit_speaker_set
  label: Volume Limit Speaker Out Set
  kind: action
  params:
    - name: minimum
      type: integer
      description: 0-100 (%)
    - name: maximum
      type: integer
      description: 0-100 (%)
    - name: switch_on
      type: integer
      description: 0-100 (%)
  opcode: 0xB8

- id: volume_limit_speaker_get
  label: Volume Limit Speaker Out Get
  kind: action
  params: []
  opcode: 0xB6

- id: volume_limit_audio_set
  label: Volume Limit Audio Out Set
  kind: action
  params:
    - name: minimum
      type: integer
      description: 0-100 (%)
    - name: maximum
      type: integer
      description: 0-100 (%)
    - name: switch_on
      type: integer
      description: 0-100 (%)
  opcode: 0xB9

- id: volume_limit_audio_get
  label: Volume Limit Audio Out Get
  kind: action
  params: []
  opcode: 0xB7

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  params:
    - name: treble
      type: integer
      description: 0-100 (%) or -8-+8 for Phoenix2.0
    - name: bass
      type: integer
      description: 0-100 (%) or -8-+8 for Phoenix2.0
  opcode: 0x42

- id: audio_parameters_get
  label: Audio Parameters Get
  kind: action
  params: []
  opcode: 0x43

- id: volume_mute_set
  label: Volume Mute Set
  kind: action
  params:
    - name: mute
      type: integer
      description: 0x01=mute on 0x00=mute off
  opcode: 0x47

- id: volume_mute_get
  label: Volume Mute Get
  kind: action
  params: []
  opcode: 0x46

- id: smart_power_set
  label: Smart Power Set
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00=Off 0x01=Low 0x02=Medium 0x03=High
  opcode: 0xDD

- id: smart_power_get
  label: Smart Power Get
  kind: action
  params: []
  opcode: 0xDE

- id: auto_adjust
  label: Video Alignment Auto Adjust
  kind: action
  params:
    - name: item
      type: integer
      description: 0x40=AutoAdjust
  opcode: 0x70

- id: temperature_sensor_get
  label: Temperature Sensor Get
  kind: action
  params: []
  opcode: 0x2F

- id: serial_code_get
  label: Serial Code Get
  kind: action
  params: []
  opcode: 0x15

- id: operating_hours_get
  label: Operating Hours Get
  kind: action
  params: []
  opcode: 0x0F

- id: tiling_set
  label: Tiling Set
  kind: action
  params:
    - name: enable
      type: integer
      description: 0x00=No 0x01=Yes
    - name: frame_comp
      type: integer
      description: 0x00=No 0x01=Yes 0x02=keep previous
    - name: position
      type: integer
      description: 1-25 (or 1-150 for ZeroBezel)
    - name: monitors
      type: integer
      description: (VMonitors-1)*15+HMonitors formula
  opcode: 0x22

- id: tiling_get
  label: Tiling Get
  kind: action
  params: []
  opcode: 0x23

- id: anytile_set_group_monitor_id
  label: AnyTile Assign Group ID and Monitor ID
  kind: action
  params:
    - name: monitor_id
      type: integer
    - name: group_id
      type: integer
  opcode: 0xC0

- id: display_monitor_id_set
  label: Display Monitor ID Set
  kind: action
  params:
    - name: enable
      type: integer
      description: 0x00=Off 0x01=On
  opcode: 0x4C

- id: anytile_set
  label: AnyTile Set
  kind: action
  params:
    - name: enable
      type: integer
      description: 0x00=No 0x01=Yes
    - name: rotation_lsb
      type: integer
      description: 0x00=0deg 0x5A=90deg 0x0E=270deg
    - name: rotation_msb
      type: integer
    - name: input_h_start_lsb
      type: integer
    - name: input_h_start_msb
      type: integer
    - name: input_v_start_lsb
      type: integer
    - name: input_v_start_msb
      type: integer
    - name: input_h_size_lsb
      type: integer
    - name: input_h_size_msb
      type: integer
    - name: input_v_size_lsb
      type: integer
    - name: input_v_size_msb
      type: integer
  opcode: 0x4B

- id: anytile_get
  label: AnyTile Report
  kind: action
  params: []
  opcode: 0x4A

- id: anytile_resolution_mode_set
  label: AnyTile Resolution Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=default 0x01=FHD 0x02=UHD4K
  opcode: 0x4F

- id: anytile_resolution_mode_get
  label: AnyTile Resolution Mode Get
  kind: action
  params: []
  opcode: 0x4E

- id: light_sensor_set
  label: Light Sensor Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On
  opcode: 0x24

- id: light_sensor_get
  label: Light Sensor Get
  kind: action
  params: []
  opcode: 0x25

- id: human_sensor_set
  label: Human Sensor Set
  kind: action
  params:
    - name: time
      type: integer
      description: 0x00=Off 0x01=10mins 0x02=20mins 0x03=30mins 0x04=40mins 0x05=50mins 0x06=60mins
  opcode: 0xB4

- id: human_sensor_get
  label: Human Sensor Get
  kind: action
  params: []
  opcode: 0xB3

- id: osd_rotating_set
  label: OSD Rotating Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On
  opcode: 0x26

- id: osd_rotating_get
  label: OSD Rotating Get
  kind: action
  params: []
  opcode: 0x27

- id: display_orientation_set
  label: Display Orientation Set
  kind: action
  params:
    - name: auto_rotate
      type: integer
      description: 0x00=Off 0x01=On
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
  opcode: 0x17

- id: display_orientation_get
  label: Display Orientation Get
  kind: action
  params: []
  opcode: 0x16

- id: information_osd_set
  label: Information OSD Feature Set
  kind: action
  params:
    - name: timeout
      type: integer
      description: 0x00=Off 0x01-0x3C=1-60 seconds
  opcode: 0x2C

- id: information_osd_get
  label: Information OSD Feature Get
  kind: action
  params: []
  opcode: 0x2D

- id: memc_effect_set
  label: MEMC Effect Set
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00=Off 0x01=Low 0x02=Medium 0x03=High
  opcode: 0x28

- id: memc_effect_get
  label: MEMC Effect Get
  kind: action
  params: []
  opcode: 0x29

- id: touch_feature_set
  label: Touch Feature Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=Off 0x01=On
  opcode: 0x1E

- id: touch_feature_get
  label: Touch Feature Get
  kind: action
  params: []
  opcode: 0x1F

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00=Off 0x01=Low 0x02=Middle 0x03=High 0x04=default
  opcode: 0x2A

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: action
  params: []
  opcode: 0x2B

- id: scan_mode_set
  label: Scan Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=Overscan 0x01=Underscan 0x02=Off 0x03-0x1C=0-25 for Challenger2.1
  opcode: 0x50

- id: scan_mode_get
  label: Scan Mode Get
  kind: action
  params: []
  opcode: 0x51

- id: scan_conversion_set
  label: Scan Conversion Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=Progressive 0x01=Interlace
  opcode: 0x52

- id: scan_conversion_get
  label: Scan Conversion Get
  kind: action
  params: []
  opcode: 0x53

- id: switch_on_delay_set
  label: Switch On Delay Set
  kind: action
  params:
    - name: delay
      type: integer
      description: 0x00=Off 0x01=Auto 0x02-0xFF=2-255 seconds
  opcode: 0x54

- id: switch_on_delay_get
  label: Switch On Delay Get
  kind: action
  params: []
  opcode: 0x55

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  opcode: 0x56

- id: power_on_logo_set
  label: Power On Logo Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=On 0x02=User
  opcode: 0x3E

- id: power_on_logo_get
  label: Power On Logo Get
  kind: action
  params: []
  opcode: 0x3F

- id: fan_speed_set
  label: Fan Speed Set
  kind: action
  params:
    - name: speed
      type: integer
      description: 0x00=Off 0x01=Auto 0x02=Low 0x03=Middle 0x04=High
  opcode: 0x61

- id: fan_speed_get
  label: Fan Speed Get
  kind: action
  params: []
  opcode: 0x62

- id: apm_status_set
  label: APM Status Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=Off 0x01=On 0x02=Mode1(TCPOff/WOLOn) 0x03=Mode2(TCPOn/WOLOff)
  opcode: 0xD0

- id: apm_status_get
  label: APM Status Get
  kind: action
  params: []
  opcode: 0xD1

- id: power_saving_mode_set
  label: Power Saving Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=RGBOff/VideoOff 0x01=RGBOff/VideoOn 0x02=RGBOn/VideoOff 0x03=RGBOn/VideoOn 0x04-0x07=mode1-4
  opcode: 0xD2

- id: power_saving_mode_get
  label: Power Saving Mode Get
  kind: action
  params: []
  opcode: 0xD3

- id: pixel_shift_set
  label: Pixel Shift Set
  kind: action
  params:
    - name: interval
      type: integer
      description: 0x00=Off 0x01=10secs 0x02=20secs ... 0x5A=900secs 0x5B=AUTO
  opcode: 0xB2

- id: pixel_shift_get
  label: Pixel Shift Get
  kind: action
  params: []
  opcode: 0xB1

- id: off_timer_set
  label: Off Timer Set
  kind: action
  params:
    - name: hours
      type: integer
      description: 0x00=Off 0x01-0x18=1-24 hours
  opcode: 0x92

- id: off_timer_get
  label: Off Timer Get
  kind: action
  params: []
  opcode: 0x91

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=low power standby 0x01=normal
  opcode: 0x64

- id: eco_mode_get
  label: ECO Mode Get
  kind: action
  params: []
  opcode: 0x63

- id: picture_style_set
  label: Picture Style Set
  kind: action
  params:
    - name: style
      type: integer
      description: 0x00=Highbright 0x01=sRGB 0x02=Vivid 0x03=Natural 0x04=Standard 0x05=Video 0x06=StaticSignage 0x07=Text 0x08=EnergySaving 0x09=Soft 0x0A=User
  opcode: 0x66

- id: picture_style_get
  label: Picture Style Get
  kind: action
  params: []
  opcode: 0x65

- id: screenshot_email
  label: Take Screenshot and Email
  kind: action
  params: []
  opcode: 0x58

- id: video_signal_present_get
  label: Video Signal Present Get
  kind: action
  params: []
  opcode: 0x59

- id: frame_comp_horz_set
  label: Frame Compensation Horz Set
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0xFF
  opcode: 0x5F

- id: frame_comp_horz_get
  label: Frame Compensation Horz Get
  kind: action
  params: []
  opcode: 0x5E

- id: frame_comp_vert_set
  label: Frame Compensation Vert Set
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0xFF
  opcode: 0x68

- id: frame_comp_vert_get
  label: Frame Compensation Vert Get
  kind: action
  params: []
  opcode: 0x67

- id: scheduling_set
  label: Scheduling Parameters Set
  kind: action
  params:
    - name: page
      type: integer
      description: BIT7-4=page1-7 BIT3-0=0disable 1=enable
    - name: start_hour
      type: integer
      description: 0-23 or 24=NULL
    - name: start_minute
      type: integer
      description: 0-59 or 60=NULL
    - name: end_hour
      type: integer
      description: 0-23 or 24=NULL
    - name: end_minute
      type: integer
      description: 0-59 or 60=NULL
    - name: video_source
      type: integer
      description: Source encoding same as input sources
    - name: working_days
      type: integer
      description: Bitmask: Bit0=everyweek Bit1=Mon Bit2=Tue Bit3=Wed Bit4=Thu Bit5=Fri Bit6=Sat Bit7=Sun
    - name: bookmark
      type: integer
      description: 0x01-0x07=Tag1-7
  opcode: 0x5A

- id: scheduling_get
  label: Scheduling Parameters Get
  kind: action
  params:
    - name: page
      type: integer
      description: 1-7
  opcode: 0x5B

- id: group_id_set
  label: Group ID Set
  kind: action
  params:
    - name: group_id
      type: integer
      description: 0x01-0xFE=1-254 0xFF=Off
  opcode: 0x5C

- id: group_id_get
  label: Group ID Get
  kind: action
  params: []
  opcode: 0x5D

- id: custom_multiwin_execute
  label: Execute Custom Multi-Win
  kind: action
  params:
    - name: switch
      type: integer
      description: 0x00=Off 0x01=On
    - name: windows
      type: integer
      description: 0x00=1window 0x01=2windows 0x02=3windows 0x03=4windows
  opcode: 0xFB

- id: custom_multiwin_set
  label: Custom Multi-Win Set
  kind: action
  params:
    - name: window
      type: integer
      description: 0x00=Main 0x01=Sub1 0x02=Sub2 0x03=Sub3
    - name: rotation
      type: integer
      description: 0x00=ROT_NONE 0x01=ROT_90 0x02=ROT_270 0x03=ROT_H_MIRROR 0x04=ROT_V_MIRROR 0x05=ROT_HV_MIRROR
    - name: x_position
      type: integer
      description: X position high/low bytes
    - name: y_position
      type: integer
      description: Y position high/low bytes
    - name: width
      type: integer
      description: Width high/low bytes
    - name: height
      type: integer
      description: Height high/low bytes
    - name: picture_format
      type: integer
      description: Same encoding as picture_format
  opcode: 0xFC

- id: custom_multiwin_get
  label: Custom Multi-Win Get
  kind: action
  params:
    - name: window
      type: integer
      description: 0x00=Main 0x01=Sub1 0x02=Sub2 0x03=Sub3
  opcode: 0xFD

- id: led_control_set
  label: LED Strip Set (10BDL3051T)
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=off 0x01=on
    - name: red
      type: integer
      description: 0x00-0xFF
    - name: green
      type: integer
      description: 0x00-0xFF
    - name: blue
      type: integer
      description: 0x00-0xFF
  opcode: 0xF3

- id: led_control_get
  label: LED Strip Get (10BDL3051T)
  kind: action
  params: []
  opcode: 0xF4

- id: external_storage_lock_set
  label: MicroSD and USB Ports Lock Set (10BDL3051T)
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00=unlocked 0x01=locked
  opcode: 0xF1

- id: external_storage_lock_get
  label: MicroSD and USB Ports Lock Get (10BDL3051T)
  kind: action
  params: []
  opcode: 0xF2

- id: monitor_id_set
  label: Monitor ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: 0x01-0xFF=1-254
  opcode: 0x69

- id: keypad_lock_set
  label: Keypad Lock Set
  kind: action
  params:
    - name: lock
      type: integer
      description: 0x01=UnlockAll 0x02=LockAll 0x03=LockAllButPower 0x04=LockAllButVolume 0x07=LockAllExceptPowerAndVolume
  opcode: 0x1A

- id: keypad_lock_get
  label: Keypad Lock Get
  kind: action
  params: []
  opcode: 0x1B

- id: ir_remote_lock_set
  label: IR Remote Lock Set
  kind: action
  params:
    - name: lock
      type: integer
      description: 0x01=UnlockAll 0x02=LockAll 0x03=LockAllButPower 0x04=LockAllButVolume 0x05=Primary 0x06=Secondary 0x07=LockAllExceptPowerAndVolume
  opcode: 0x1C

- id: ir_remote_lock_get
  label: IR Remote Lock Get
  kind: action
  params: []
  opcode: 0x1D

- id: platform_version_get
  label: Platform and Version Labels Get
  kind: action
  params:
    - name: which
      type: integer
      description: 0x00=SICPversion 0x01=platformlabel 0x02=platformversion
  opcode: 0xA2

- id: model_info_get
  label: Model Number FW Version Build Date Get
  kind: action
  params:
    - name: info
      type: integer
      description: 0x00=ModelNumber 0x01=FWversion 0x02=BuildDate 0x03=AndroidFWversion
  opcode: 0xA1
```

## Feedbacks
```yaml
- id: ack_nack_nav
  label: Communication Control Report
  type: enum
  values:
    - 0x06  # ACK - command executed
    - 0x15  # NACK - command invalid
    - 0x18  # NAV - not available
  description: Generic report after every command. No reply if wrong ID address used.

- id: power_state_report
  label: Power State Report
  type: enum
  values:
    - 0x01  # Power Off
    - 0x02  # On

- id: input_source_report
  label: Input Source Report
  type: object
  properties:
    source: integer
    playlist_number: integer
    osd_style: integer
    mute_style: integer

- id: video_parameters_report
  label: Video Parameters Report
  type: object
  properties:
    brightness: integer  # 0-100
    color: integer       # 0-100
    contrast: integer   # 0-100
    sharpness: integer  # 0-100
    tint: integer       # 0-100 or -50-+50
    black_level: integer # 0-100
    gamma: integer       # 0x01-0x05

- id: volume_report
  label: Volume Report
  type: object
  properties:
    speaker: integer  # 0-100
    audio: integer   # 0-100 (some platforms omit)

- id: color_temperature_report
  label: Color Temperature Report
  type: integer
  # 0x00=User1 0x01=Native 0x03-0x10=K values 0x12=User2

- id: serial_code_report
  label: Serial Code Report
  type: string
  description: 14-character ASCII serial number

- id: temperature_report
  label: Temperature Sensor Report
  type: object
  properties:
    sensor1: integer  # 0-100 Celsius
    sensor2: integer # 0-100 Celsius

- id: tiling_report
  label: Tiling Report
  type: object
  properties:
    enable: integer
    frame_comp: integer
    position: integer
    monitors: integer

- id: scheduling_report
  label: Scheduling Parameters Report
  type: object
  properties:
    page_enable: integer
    start_hour: integer
    start_minute: integer
    end_hour: integer
    end_minute: integer
    video_source: integer
    working_days: integer
    bookmark: integer
```

## Variables
```yaml
# UNRESOLVED: variables that are persisted settings but not discrete actions.
# Many settable parameters exist (volume limits, color temperature 100K steps,
# failover priorities, scheduling pages) but are modeled as actions with parameters.
# This section left for operator to populate if needed.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source.
# The protocol is strictly synchronous: host sends command, display responds.
# No push-style notifications are documented.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
# Standard RS-232 crosstalk/null-modem note present (use null modem cable for host connection).
```

## Notes
- Protocol is SICP v2.03 (Serial/Ethernet Interface Communication Protocol).
- Command packet format: `MsgSize | Control | Group | Data[0] | Data[1] ... Data[N] | Checksum` where checksum = XOR of all bytes except checksum itself.
- Message size range: 3-40 bytes (0x03-0x28). Data payload: 0-36 bytes (0x00-0x24).
- Control byte: Bit 7..0 = Monitor ID (1-255 for addressed, 0 for broadcast).
- Group byte: 0=control by monitor ID, 1-254=control by group ID, 255=off.
- Response timing: ACK/NACK/NAV within 500ms; if no response, retry allowed.
- Some commands have platform restrictions (noted in individual action descriptions).
- AnyTile commands (0x4A-0x4F, 0xC0) only work via IP connection, not RS-232.
- LED strip control (0xF3/0xF4) specific to 10BDL3051T model.
- External storage lock (0xF1/0xF2) specific to 10BDL3051T and certain firmware versions.
<!-- UNRESOLVED: specific firmware versions where commands are available are marked TBC in source. -->
<!-- UNRESOLVED: portrait orientation support varies by platform. -->

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
  - images.philips.com
  - usa.philips.com
  - philips.com.my
  - philips.ca
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - "https://images.philips.com/is/content/PhilipsConsumer/PDFDownloads/Central%20America/techincal-sheets/ODLI20180125_001-UPD-es_CE-EnvisionGateway_Data_Sheet_Sep_2014.pdf"
  - https://www.usa.philips.com/c-w/support-home/support-software-and-drivers.html
  - https://www.philips.com.my/c-w/support-home/support-software-and-drivers.html
  - https://www.philips.ca/c-w/support-home/support-software-and-drivers.html
retrieved_at: 2026-05-13T15:46:52.453Z
last_checked_at: 2026-06-02T22:13:05.120Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:05.120Z
matched_actions: 117
action_count: 117
confidence: medium
summary: "All 117 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific firmware version compatibility not stated; applies to multiple platforms (Eagle, Himalaya, Dragon, Phoenix, QL, Challenger)"
- "variables that are persisted settings but not discrete actions."
- "no unsolicited event descriptions found in source."
- "no explicit multi-step macro sequences described in source."
- "no safety warnings or interlock procedures in source."
- "specific firmware versions where commands are available are marked TBC in source."
- "portrait orientation support varies by platform."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
