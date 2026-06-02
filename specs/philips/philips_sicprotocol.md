---
spec_id: admin/philips-sicprotocol
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips SICP V2.03 Control Spec"
manufacturer: Philips
model_family: "Philips Professional Displays (SICP V2.03)"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "Philips Professional Displays (SICP V2.03)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
retrieved_at: 2026-05-12T09:53:48.647Z
last_checked_at: 2026-06-02T22:13:06.674Z
generated_at: 2026-06-02T22:13:06.674Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no unsolicited event/notification protocol described in source"
  - "no multi-step macro sequences described in source"
  - "power-on sequencing interlocks not fully documented"
  - "firmware version compatibility not stated"
  - "exact platform support matrix per command only partially documented"
  - "scheduling page 8-15 support unclear beyond Dragon/Himalaya 2.0"
  - "AnyTile resolution mode command (0x4E/0x4F) documentation incomplete"
  - "MIC color calibration (0xFE) marked TBD in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:06.674Z
  matched_actions: 117
  action_count: 117
  confidence: medium
  summary: "All 117 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-10
---

# Philips SICP V2.03 Control Spec

## Summary
Philips Serial/Ethernet Interface Communication Protocol (SICP V2.03) for controlling Philips Professional Displays via RS-232C or Ethernet (TCP). Binary packet protocol with XOR checksum. Covers power, input selection, video/audio parameters, tiling, scheduling, and display management across multiple platform families (Eagle, Dragon, Himalaya, Phoenix, QL3, Challenger).

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands
- queryable       # extensive get/report command pairs
- levelable       # volume, brightness, contrast, color, etc.
- routable        # input source selection, PIP source routing
```

## Actions
```yaml
- id: power_set
  label: Power State Set
  kind: action
  command: 0x18
  params:
    - name: state
      type: enum
      values:
        "0x01": power_off
        "0x02": on
      description: "Power state (0x01=Off, 0x02=On)"

- id: power_get
  label: Power State Get
  kind: query
  command: 0x19

- id: input_source_set
  label: Input Source Set
  kind: action
  command: 0xAC
  params:
    - name: source
      type: enum
      values:
        "0x01": VIDEO
        "0x02": S-VIDEO
        "0x03": COMPONENT
        "0x05": VGA
        "0x06": HDMI_2
        "0x07": DisplayPort_2
        "0x08": USB_2
        "0x09": Card_DVI-D
        "0x0A": DisplayPort_1
        "0x0B": Card_OPS
        "0x0C": USB_1
        "0x0D": HDMI
        "0x0E": DVI-D
        "0x0F": HDMI3
        "0x10": BROWSER
        "0x11": SMARTCMS
        "0x12": DMS
        "0x13": INTERNAL_STORAGE
        "0x16": Media_Player
        "0x17": PDF_Player
        "0x18": Custom
        "0x19": HDMI_4
        "0x1A": VGA2
        "0x1B": VGA3
        "0x1C": IWB
      description: "Input source type"

- id: input_source_get
  label: Current Source Get
  kind: query
  command: 0xAD

- id: volume_set
  label: Volume Set
  kind: action
  command: 0x44
  params:
    - name: speaker_out
      type: integer
      min: 0
      max: 100
      description: "Speaker out volume 0-100%"
    - name: audio_out
      type: integer
      min: 0
      max: 100
      description: "Audio out volume 0-100%"

- id: volume_get
  label: Volume Get
  kind: query
  command: 0x45

- id: volume_step
  label: Volume Step Up/Down
  kind: action
  command: 0x41
  params:
    - name: speaker_direction
      type: enum
      values:
        "0": down
        "1": up
        "2": no_change
      description: "Speaker out direction"
    - name: audio_direction
      type: enum
      values:
        "0": down
        "1": up
        "2": no_change
      description: "Audio out direction"

- id: volume_mute_set
  label: Volume Mute Set
  kind: action
  command: 0x47
  params:
    - name: mute
      type: enum
      values:
        "0x00": mute_off
        "0x01": mute_on
      description: "Mute state"

- id: volume_mute_get
  label: Volume Mute Get
  kind: query
  command: 0x46

- id: video_params_set
  label: Video Parameters Set
  kind: action
  command: 0x32
  params:
    - name: brightness
      type: integer
      min: 0
      max: 100
      description: "Brightness 0-100%"
    - name: color
      type: integer
      min: 0
      max: 100
    - name: contrast
      type: integer
      min: 0
      max: 100
    - name: sharpness
      type: integer
      min: 0
      max: 100
    - name: tint
      type: integer
      min: 0
      max: 100
    - name: black_level
      type: integer
      min: 0
      max: 100
    - name: gamma
      type: enum
      values:
        "0x01": native
        "0x02": s_gamma
        "0x03": "2.2"
        "0x04": "2.4"
        "0x05": d_image_dicom

- id: video_params_get
  label: Video Parameters Get
  kind: query
  command: 0x33

- id: color_temp_set
  label: Color Temperature Set
  kind: action
  command: 0x34
  params:
    - name: temperature
      type: enum
      values:
        "0x00": user1
        "0x01": native
        "0x03": 10000K
        "0x04": 9300K
        "0x05": 7500K
        "0x06": 6500K
        "0x09": 5000K
        "0x0A": 4000K
        "0x0D": 3000K
        "0x12": user2

- id: color_temp_get
  label: Color Temperature Get
  kind: query
  command: 0x35

- id: color_temp_100k_set
  label: Color Temperature 100K Steps Set
  kind: action
  command: 0x11
  params:
    - name: value
      type: integer
      min: 20
      max: 100
      description: "Temperature in 100K steps (20=2000K to 100=10000K)"

- id: color_temp_100k_get
  label: Color Temperature 100K Steps Get
  kind: query
  command: 0x12

- id: audio_params_set
  label: Audio Parameters Set
  kind: action
  command: 0x42
  params:
    - name: treble
      type: integer
      min: 0
      max: 100
    - name: bass
      type: integer
      min: 0
      max: 100

- id: audio_params_get
  label: Audio Parameters Get
  kind: query
  command: 0x43

- id: picture_format_set
  label: Picture Format Set
  kind: action
  command: 0x3A
  params:
    - name: format
      type: enum
      values:
        "0x00": normal_4_3
        "0x01": custom
        "0x02": real_1_1
        "0x03": full
        "0x04": "21:9"
        "0x05": dynamic
        "0x06": "16:9"

- id: picture_format_get
  label: Picture Format Get
  kind: query
  command: 0x3B

- id: pip_set
  label: PIP Set
  kind: action
  command: 0x3C
  params:
    - name: mode
      type: enum
      values:
        "0x00": off
        "0x01": pip_on
        "0x02": pop
        "0x03": quick_swap
        "0x04": pbp_2win
        "0x05": pbp_3win
        "0x06": pbp_4win
        "0x07": pbp_3win_1
        "0x08": pbp_3win_2
        "0x09": pbp_4win_1
        "0x0A": sicp_custom
    - name: position
      type: enum
      values:
        "0x00": position_0
        "0x01": position_1
        "0x02": position_2
        "0x03": position_3
        "0x04": position_4

- id: pip_get
  label: PIP Get
  kind: query
  command: 0x3D

- id: pip_source_set
  label: PIP Source Set
  kind: action
  command: 0x84
  params:
    - name: source_type
      type: enum
      values:
        "0xFD": input_source
    - name: q2_source
      type: integer
      description: "Q2 source number (same mapping as input_source_set)"
    - name: q3_source
      type: integer
      description: "Q3 source number"
    - name: q4_source
      type: integer
      description: "Q4 source number"

- id: pip_source_get
  label: PIP Source Get
  kind: query
  command: 0x85

- id: auto_signal_set
  label: Auto Signal Detecting Set
  kind: action
  command: 0xAE
  params:
    - name: mode
      type: enum
      values:
        "0x00": off
        "0x01": all
        "0x03": pc_sources_only
        "0x04": video_sources_only
        "0x05": failover

- id: auto_signal_get
  label: Auto Signal Detecting Get
  kind: query
  command: 0xAF

- id: failover_set
  label: Failover Priority Set
  kind: action
  command: 0xA5
  params:
    - name: priorities
      type: array
      max_items: 15
      description: "Up to 15 priority slots (0x00=HDMI, 0x01=Component, 0x02=Composite, 0x03=DP, 0x04=DVI-D, 0x05=VGA, 0x06=OPS, 0x07=USB, 0x08=Browser, 0x09=SmartCMS, 0x0A=Internal Storage, 0x0B=DMS, 0x0C=HDMI2, 0x0D=HDMI3, 0x0E=USB Playlist, 0x0F=USB AutoPlay, 0x10=Media Player, 0x11=PDF Player, 0x12=Custom, 0x13=HDMI4, 0x14=VGA2, 0x15=VGA3, 0x16=IWB)"

- id: failover_get
  label: Failover Priority Get
  kind: query
  command: 0xA6

- id: monitor_restart
  label: Monitor Restart
  kind: action
  command: 0x57
  params:
    - name: target
      type: enum
      values:
        "0x00": android
        "0x01": scalar

- id: backlight_set
  label: Backlight Set
  kind: action
  command: 0x72
  params:
    - name: state
      type: enum
      values:
        "0x00": on
        "0x01": off

- id: backlight_get
  label: Backlight Get
  kind: query
  command: 0x71

- id: cold_start_power_set
  label: Power at Cold Start Set
  kind: action
  command: 0xA3
  params:
    - name: state
      type: enum
      values:
        "0x00": power_off
        "0x01": forced_on
        "0x02": last_status

- id: cold_start_power_get
  label: Power at Cold Start Get
  kind: query
  command: 0xA4

- id: ir_lock_set
  label: IR Remote Lock Set
  kind: action
  command: 0x1C
  params:
    - name: state
      type: enum
      values:
        "0x01": unlock_all
        "0x02": lock_all
        "0x03": lock_all_but_power
        "0x04": lock_all_but_volume
        "0x05": primary_master
        "0x06": secondary_daisy_chain
        "0x07": lock_all_except_power_and_volume

- id: ir_lock_get
  label: IR Remote Lock Get
  kind: query
  command: 0x1D

- id: keypad_lock_set
  label: Keypad Lock Set
  kind: action
  command: 0x1A
  params:
    - name: state
      type: enum
      values:
        "0x01": unlock_all
        "0x02": lock_all
        "0x03": lock_all_but_power
        "0x04": lock_all_but_volume
        "0x07": lock_all_except_power_and_volume

- id: keypad_lock_get
  label: Keypad Lock Get
  kind: query
  command: 0x1B

- id: vga_params_set
  label: VGA Video Parameters Set
  kind: action
  command: 0x38
  params:
    - name: clock
      type: integer
      min: 0
      max: 100
    - name: clock_phase
      type: integer
      min: 0
      max: 100
    - name: h_position
      type: integer
      min: 0
      max: 100
    - name: v_position
      type: integer
      min: 0
      max: 100

- id: vga_params_get
  label: VGA Video Parameters Get
  kind: query
  command: 0x39

- id: rgb_params_set
  label: Color Parameters (RGB) Set
  kind: action
  command: 0x36
  params:
    - name: red_gain
      type: integer
      min: 0
      max: 255
    - name: green_gain
      type: integer
      min: 0
      max: 255
    - name: blue_gain
      type: integer
      min: 0
      max: 255
    - name: red_offset
      type: integer
      min: 0
      max: 255
    - name: green_offset
      type: integer
      min: 0
      max: 255
    - name: blue_offset
      type: integer
      min: 0
      max: 255

- id: rgb_params_get
  label: Color Parameters (RGB) Get
  kind: query
  command: 0x37

- id: tiling_set
  label: Tiling Set
  kind: action
  command: 0x22
  params:
    - name: enable
      type: enum
      values:
        "0x00": "no"
        "0x01": "yes"
    - name: frame_comp
      type: enum
      values:
        "0x00": "no"
        "0x01": "yes"
        "0x02": dont_overwrite
    - name: position
      type: integer
      min: 1
      max: 150
      description: "Tile position in wall (max 25 for non-zero-bezel, 150 for zero-bezel)"
    - name: monitors
      type: integer
      description: "Encoded V/H monitor count"

- id: tiling_get
  label: Tiling Get
  kind: query
  command: 0x23

- id: volume_limit_speaker_set
  label: Volume Limits Speaker Out Set
  kind: action
  command: 0xB8
  params:
    - name: minimum
      type: integer
      min: 0
      max: 100
    - name: maximum
      type: integer
      min: 0
      max: 100
    - name: switch_on
      type: integer
      min: 0
      max: 100

- id: volume_limit_speaker_get
  label: Volume Limits Speaker Out Get
  kind: query
  command: 0xB6

- id: volume_limit_audio_set
  label: Volume Limits Audio Out Set
  kind: action
  command: 0xB9
  params:
    - name: minimum
      type: integer
      min: 0
      max: 100
    - name: maximum
      type: integer
      min: 0
      max: 100
    - name: switch_on
      type: integer
      min: 0
      max: 100

- id: volume_limit_audio_get
  label: Volume Limits Audio Out Get
  kind: query
  command: 0xB7

- id: smart_power_set
  label: Smart Power Set
  kind: action
  command: 0xDD
  params:
    - name: level
      type: enum
      values:
        "0x00": off
        "0x01": low
        "0x02": medium
        "0x03": high

- id: smart_power_get
  label: Smart Power Get
  kind: query
  command: 0xDE

- id: auto_adjust
  label: VGA Auto Adjust
  kind: action
  command: 0x70
  params:
    - name: item
      type: enum
      values:
        "0x40": auto_adjust

- id: light_sensor_set
  label: Light Sensor Set
  kind: action
  command: 0x24
  params:
    - name: state
      type: enum
      values:
        "0x00": off
        "0x01": on

- id: light_sensor_get
  label: Light Sensor Get
  kind: query
  command: 0x25

- id: human_sensor_set
  label: Human Sensor Set
  kind: action
  command: 0xB4
  params:
    - name: timeout
      type: enum
      values:
        "0x00": off
        "0x01": 10_mins
        "0x02": 20_mins
        "0x03": 30_mins
        "0x04": 40_mins
        "0x05": 50_mins
        "0x06": 60_mins

- id: human_sensor_get
  label: Human Sensor Get
  kind: query
  command: 0xB3

- id: osd_rotate_set
  label: OSD Rotating Set
  kind: action
  command: 0x26
  params:
    - name: state
      type: enum
      values:
        "0x00": off
        "0x01": on

- id: osd_rotate_get
  label: OSD Rotating Get
  kind: query
  command: 0x27

- id: display_orientation_set
  label: Display Orientation Set
  kind: action
  command: 0x17
  params:
    - name: auto_rotate
      type: enum
      values:
        "0x00": off
        "0x01": on
    - name: osd_rotation
      type: enum
      values:
        "0x00": landscape
        "0x01": portrait
    - name: image_all
      type: enum
      values:
        "0x00": off
        "0x01": on
        "0x02": on_clockwise
        "0x03": on_counter_clockwise
    - name: main_window
      type: enum
      values:
        "0x00": off
        "0x01": on

- id: display_orientation_get
  label: Display Orientation Get
  kind: query
  command: 0x16

- id: info_osd_set
  label: Information OSD Set
  kind: action
  command: 0x2C
  params:
    - name: value
      type: integer
      min: 0
      max: 60
      description: "0=Off, 1-60=display duration"

- id: info_osd_get
  label: Information OSD Get
  kind: query
  command: 0x2D

- id: memc_set
  label: MEMC Effect Set
  kind: action
  command: 0x28
  params:
    - name: level
      type: enum
      values:
        "0x00": off
        "0x01": low
        "0x02": medium
        "0x03": high

- id: memc_get
  label: MEMC Effect Get
  kind: query
  command: 0x29

- id: touch_set
  label: Touch Feature Set
  kind: action
  command: 0x1E
  params:
    - name: state
      type: enum
      values:
        "0x00": off
        "0x01": on

- id: touch_get
  label: Touch Feature Get
  kind: query
  command: 0x1F

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: 0x2A
  params:
    - name: level
      type: enum
      values:
        "0x00": off
        "0x01": low
        "0x02": middle
        "0x03": high
        "0x04": default

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: query
  command: 0x2B

- id: scan_mode_set
  label: Scan Mode Set
  kind: action
  command: 0x50
  params:
    - name: mode
      type: enum
      values:
        "0x00": over_scan
        "0x01": under_scan
        "0x02": off

- id: scan_mode_get
  label: Scan Mode Get
  kind: query
  command: 0x51

- id: scan_conversion_set
  label: Scan Conversion Set
  kind: action
  command: 0x52
  params:
    - name: mode
      type: enum
      values:
        "0x00": progressive
        "0x01": interlace

- id: scan_conversion_get
  label: Scan Conversion Get
  kind: query
  command: 0x53

- id: switch_on_delay_set
  label: Switch On Delay Set
  kind: action
  command: 0x54
  params:
    - name: delay
      type: integer
      min: 0
      max: 255
      description: "0=Off, 1=Auto, 2-255=seconds"

- id: switch_on_delay_get
  label: Switch On Delay Get
  kind: query
  command: 0x55

- id: factory_reset
  label: Factory Reset
  kind: action
  command: 0x56

- id: power_on_logo_set
  label: Power On Logo Set
  kind: action
  command: 0x3E
  params:
    - name: state
      type: enum
      values:
        "0x00": off
        "0x01": on
        "0x02": user

- id: power_on_logo_get
  label: Power On Logo Get
  kind: query
  command: 0x3F

- id: fan_speed_set
  label: Fan Speed Set
  kind: action
  command: 0x61
  params:
    - name: speed
      type: enum
      values:
        "0x00": off
        "0x01": auto
        "0x02": low
        "0x03": middle
        "0x04": high

- id: fan_speed_get
  label: Fan Speed Get
  kind: query
  command: 0x62

- id: apm_set
  label: Advanced Power Management Set
  kind: action
  command: 0xD0
  params:
    - name: mode
      type: enum
      values:
        "0x00": off
        "0x01": on
        "0x02": mode1_tcp_off_wol_on
        "0x03": mode2_tcp_on_wol_off

- id: apm_get
  label: APM Status Get
  kind: query
  command: 0xD1

- id: power_saving_set
  label: Power Saving Mode Set
  kind: action
  command: 0xD2
  params:
    - name: mode
      type: enum
      values:
        "0x00": rgb_off_video_off
        "0x01": rgb_off_video_on
        "0x02": rgb_on_video_off
        "0x03": rgb_on_video_on
        "0x04": mode_1
        "0x05": mode_2
        "0x06": mode_3
        "0x07": mode_4

- id: power_saving_get
  label: Power Saving Mode Get
  kind: query
  command: 0xD3

- id: pixel_shift_set
  label: Pixel Shift Set
  kind: action
  command: 0xB2
  params:
    - name: interval
      type: integer
      description: "0=Off, 1=10s, 2=20s, ..., 90=900s, 91=Auto"

- id: pixel_shift_get
  label: Pixel Shift Get
  kind: query
  command: 0xB1

- id: off_timer_set
  label: Off Timer Set
  kind: action
  command: 0x92
  params:
    - name: hours
      type: integer
      min: 0
      max: 24
      description: "0=Off, 1-24=hours"

- id: off_timer_get
  label: Off Timer Get
  kind: query
  command: 0x91

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  command: 0x64
  params:
    - name: mode
      type: enum
      values:
        "0x00": low_power_standby
        "0x01": normal

- id: eco_mode_get
  label: ECO Mode Get
  kind: query
  command: 0x63

- id: picture_style_set
  label: Picture Style Set
  kind: action
  command: 0x66
  params:
    - name: style
      type: enum
      values:
        "0x00": highbright
        "0x01": srgb
        "0x02": vivid
        "0x03": natural
        "0x04": standard
        "0x05": video
        "0x06": static_signage
        "0x07": text
        "0x08": energy_saving
        "0x09": soft
        "0x0A": user

- id: picture_style_get
  label: Picture Style Get
  kind: query
  command: 0x65

- id: screenshot
  label: Take Screenshot and Email
  kind: action
  command: 0x58

- id: video_present_get
  label: Video Signal Present Get
  kind: query
  command: 0x59

- id: frame_comp_horz_set
  label: Frame Compensation Horizontal Set
  kind: action
  command: 0x5F
  params:
    - name: value
      type: integer
      min: 0
      max: 255

- id: frame_comp_horz_get
  label: Frame Compensation Horizontal Get
  kind: query
  command: 0x5E

- id: frame_comp_vert_set
  label: Frame Compensation Vertical Set
  kind: action
  command: 0x68
  params:
    - name: value
      type: integer
      min: 0
      max: 255

- id: frame_comp_vert_get
  label: Frame Compensation Vertical Get
  kind: query
  command: 0x67

- id: scheduling_set
  label: Scheduling Parameters Set
  kind: action
  command: 0x5A
  params:
    - name: page
      type: integer
      description: "Bits 7-4: page 1-7, Bits 3-0: 0=disable, 1=enable"
    - name: start_hour
      type: integer
      min: 0
      max: 24
    - name: start_minute
      type: integer
      min: 0
      max: 60
    - name: end_hour
      type: integer
      min: 0
      max: 24
    - name: end_minute
      type: integer
      min: 0
      max: 60
    - name: video_source
      type: integer
      description: "Same mapping as input_source_set"
    - name: working_days
      type: integer
      description: "Bit0=every week, Bit1=Mon, Bit2=Tue, Bit3=Wed, Bit4=Thu, Bit5=Fri, Bit6=Sat, Bit7=Sun"

- id: scheduling_get
  label: Scheduling Parameters Get
  kind: query
  command: 0x5B
  params:
    - name: page
      type: integer
      min: 1
      max: 7

- id: group_id_set
  label: Group ID Set
  kind: action
  command: 0x5C
  params:
    - name: group_id
      type: integer
      min: 1
      max: 254

- id: group_id_get
  label: Group ID Get
  kind: query
  command: 0x5D

- id: monitor_id_set
  label: Monitor ID Set
  kind: action
  command: 0x69
  params:
    - name: monitor_id
      type: integer
      min: 1
      max: 254

- id: custom_multiwin_execute
  label: Custom Multi-Window Execute
  kind: action
  command: 0xFB
  params:
    - name: enable
      type: enum
      values:
        "0x00": off
        "0x01": on
    - name: windows
      type: integer
      min: 0
      max: 3
      description: "0=1 window, 1=2 windows, 2=3 windows, 3=4 windows"

- id: custom_multiwin_get
  label: Custom Multi-Window Get
  kind: query
  command: 0xFD
  params:
    - name: window
      type: integer
      min: 0
      max: 3

- id: custom_multiwin_set
  label: Custom Multi-Window Set
  kind: action
  command: 0xFC
  params:
    - name: window
      type: integer
      min: 0
      max: 3
    - name: rotation
      type: enum
      values:
        "0x00": none
        "0x01": rot_90
        "0x02": rot_270
        "0x03": h_mirror
        "0x04": v_mirror
        "0x05": hv_mirror
    - name: x_position
      type: integer
    - name: y_position
      type: integer
    - name: width
      type: integer
    - name: height
      type: integer
    - name: picture_format
      type: integer

- id: led_strip_set
  label: LED Strip Set (10BDL3051T)
  kind: action
  command: 0xF3
  params:
    - name: on_off
      type: enum
      values:
        "0x00": off
        "0x01": on
    - name: red
      type: integer
      min: 0
      max: 255
    - name: green
      type: integer
      min: 0
      max: 255
    - name: blue
      type: integer
      min: 0
      max: 255

- id: led_strip_get
  label: LED Strip Get (10BDL3051T)
  kind: query
  command: 0xF4

- id: usb_lock_set
  label: MicroSD/USB Lock Set
  kind: action
  command: 0xF1
  params:
    - name: state
      type: enum
      values:
        "0x00": unlocked
        "0x01": locked

- id: usb_lock_get
  label: MicroSD/USB Lock Get
  kind: query
  command: 0xF2

- id: platform_version_get
  label: Platform and Version Labels Get
  kind: query
  command: 0xA2
  params:
    - name: label_type
      type: enum
      values:
        "0x00": sicp_version
        "0x01": platform_label
        "0x02": platform_version

- id: model_fw_get
  label: Model Number and FW Version Get
  kind: query
  command: 0xA1
  params:
    - name: info_type
      type: enum
      values:
        "0x00": model_number
        "0x01": fw_version
        "0x02": build_date
        "0x03": android_fw_version

- id: operating_hours_get
  label: Operating Hours Get
  kind: query
  command: 0x0F
  params:
    - name: item
      type: enum
      values:
        "0x02": operating_hours

- id: serial_code_get
  label: Serial Code Get
  kind: query
  command: 0x15

- id: temperature_get
  label: Temperature Sensors Get
  kind: query
  command: 0x2F

- id: anytile_group_monitor_set
  label: AnyTile Set Group and Monitor ID
  kind: action
  command: 0xC0
  params:
    - name: monitor_id
      type: integer
    - name: group_id
      type: integer

- id: anytile_display_id_set
  label: AnyTile Display Monitor ID
  kind: action
  command: 0x4C

- id: anytile_set
  label: AnyTile Custom Tiling Set
  kind: action
  command: 0x4B

- id: anytile_get
  label: AnyTile Custom Tiling Get
  kind: query
  command: 0x4A

- id: anytile_resolution_set
  label: AnyTile Resolution Mode Set
  kind: action
  command: 0x4F
  params:
    - name: mode
      type: enum
      values:
        "0x00": default
        "0x01": fhd
        "0x02": uhd_4k
- id: anytile_resolution_get
  label: AnyTile Resolution Mode Get
  kind: query
  command: 0x4E
  params:
    - name: mode
      type: enum
      values:
        "0x00": default
        "0x01": fhd
        "0x02": uhd_4k
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  command_report: "0x19"

- id: input_source
  type: enum
  values: [VIDEO, S-VIDEO, COMPONENT, VGA, HDMI, HDMI_2, HDMI_3, HDMI_4, DVI-D, DisplayPort_1, DisplayPort_2, USB_1, USB_2, Card_OPS, Card_DVI-D, BROWSER, SMARTCMS, DMS, INTERNAL_STORAGE, Media_Player, PDF_Player, Custom, VGA2, VGA3, IWB]
  command_report: "0xAD"

- id: volume_level
  type: object
  fields:
    speaker_out: integer
    audio_out: integer
  command_report: "0x45"

- id: video_params
  type: object
  fields:
    brightness: integer
    color: integer
    contrast: integer
    sharpness: integer
    tint: integer
    black_level: integer
    gamma: enum
  command_report: "0x33"

- id: communication_control
  type: enum
  values: [ack, nack, nav]
  command_report: "0x00"
  description: "ACK (0x06), NACK (0x15), NAV (0x18)"

- id: temperature
  type: object
  fields:
    sensor_1_celsius: integer
    sensor_2_celsius: integer
  command_report: "0x2F"

- id: video_present
  type: enum
  values: [not_present, present]
  command_report: "0x59"

- id: backlight_state
  type: enum
  values: [on, off]
  command_report: "0x71"

- id: volume_mute_state
  type: enum
  values: [off, on]
  command_report: "0x46"
```

## Variables
```yaml
- id: brightness
  type: integer
  min: 0
  max: 100
  unit: percent
  set_command: 0x32
  get_command: 0x33

- id: contrast
  type: integer
  min: 0
  max: 100
  unit: percent
  set_command: 0x32
  get_command: 0x33

- id: volume_speaker
  type: integer
  min: 0
  max: 100
  unit: percent
  set_command: 0x44
  get_command: 0x45

- id: volume_audio_out
  type: integer
  min: 0
  max: 100
  unit: percent
  set_command: 0x44
  get_command: 0x45

- id: treble
  type: integer
  min: 0
  max: 100
  unit: percent
  set_command: 0x42
  get_command: 0x43

- id: bass
  type: integer
  min: 0
  max: 100
  unit: percent
  set_command: 0x42
  get_command: 0x43
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - monitor_restart
interlocks:
  - factory_reset resets all user-configurable parameters to defaults
  - volume_limit requires min <= switch_on <= max
# UNRESOLVED: power-on sequencing interlocks not fully documented
```

## Notes
- Binary packet format: `MsgSize | Control | Group | Data[0..N] | Checksum` where checksum is XOR of all bytes except itself.
- Control byte carries Monitor ID (1-255); 0 = broadcast (no ACK expected).
- Group byte: 0 = control by Monitor ID, 1-254 = control by Group ID, 255 = group off.
- 500ms response timeout; retry allowed after timeout. Commands must be sequential (wait for ACK before next).
- Protocol spans multiple platform families (Eagle, Dragon, Himalaya, Phoenix, QL3, Challenger) with varying command support. Platform-specific restrictions noted per command in source.
- Default serial settings: 9600/8/N/1, no flow control. Supports 1200-57600 baud.
- Default TCP port 5000 for Ethernet control.
- Null modem (crossover) cable required for RS-232.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact platform support matrix per command only partially documented -->
<!-- UNRESOLVED: scheduling page 8-15 support unclear beyond Dragon/Himalaya 2.0 -->
<!-- UNRESOLVED: AnyTile resolution mode command (0x4E/0x4F) documentation incomplete -->
<!-- UNRESOLVED: MIC color calibration (0xFE) marked TBD in source -->

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
retrieved_at: 2026-05-12T09:53:48.647Z
last_checked_at: 2026-06-02T22:13:06.674Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:06.674Z
matched_actions: 117
action_count: 117
confidence: medium
summary: "All 117 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no unsolicited event/notification protocol described in source"
- "no multi-step macro sequences described in source"
- "power-on sequencing interlocks not fully documented"
- "firmware version compatibility not stated"
- "exact platform support matrix per command only partially documented"
- "scheduling page 8-15 support unclear beyond Dragon/Himalaya 2.0"
- "AnyTile resolution mode command (0x4E/0x4F) documentation incomplete"
- "MIC color calibration (0xFE) marked TBD in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
