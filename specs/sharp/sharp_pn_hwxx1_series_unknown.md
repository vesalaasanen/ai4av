---
spec_id: admin/sharp-pn-hwxx1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-HWxx1 Series Control Spec"
manufacturer: Sharp
model_family: "PN-HWxx1 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "PN-HWxx1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
  - assets.sharpnecdisplays.us
  - docs.aws.sharp.eu
  - business.sharpusa.com
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/SetupManual_PN-HWxx1.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-la862-la752-la652_n-format_command_manual_en_rev1.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
retrieved_at: 2026-05-18T11:28:49.298Z
last_checked_at: 2026-06-10T00:56:07.640Z
generated_at: 2026-06-10T00:56:07.640Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific variant differences (PN-HW651 vs PN-HW751 vs PN-HW861 vs PN-HW981) not documented in source"
  - "full VCP table not reproduced here; primary parameters documented in Actions"
  - "no unsolicited event messages documented in source"
  - "no multi-step macros documented in source"
  - "DHCP is the default but IP address configuration details are in the User's manual which is not included in this source"
  - "TV tuner channel read/write (CTL-C22C, CTL-C22D) details are marked as model-dependent but model list not specified in source"
  - "VCP code pages 8 and 11 contain extensive additional parameters not fully enumerated here (audio delay, CEC settings, HDMI EDID, VGA options, etc.) — only key parameters extracted"
  - "\"PN-HWxx1\" model number is a series designation; specific models (PN-HW651, PN-HW751, PN-HW861, PN-HW981) are not individually named in source"
  - "firmware version compatibility ranges not stated"
  - "Sharp documentation header says \"NEC LCD monitor\" — unclear if this is a shared protocol or misattribution; treated as Sharp protocol per entity_id"
  - "The source document header states \"This document defines the communications method for control of the NEC LCD monitor\" but the series is Sharp branded — protocol may be shared OEM design"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:56:07.640Z
  matched_actions: 150
  action_count: 150
  confidence: medium
  summary: "All 150 spec actions confirmed with exact wire-literal matches against source; all 83 distinct CTL/VCP command tokens in the source are represented by the spec; transport parameters verified verbatim. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Sharp PN-HWxx1 Series Control Spec

## Summary
Sharp PN-HWxx1 Series commercial LCD monitor. External control via RS-232C (9600bps, 8-N-1 ASCII) and LAN (TCP port 7142). Protocol uses VCP (Variable Control Panel) and CTL (Control) command sets with a framed packet structure: SOH header, ASCII-encoded message, BCC check code, CR delimiter. Packet interval must exceed 600ms.

<!-- UNRESOLVED: model-specific variant differences (PN-HW651 vs PN-HW751 vs PN-HW861 vs PN-HW981) not documented in source -->

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
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # CTL-01D6 power status read, CTL-C203-D6 power control
- routable         # input selection VCP-00-60, HDMI1/HDMI2/HDMI3/AV/VGA/YPbPr
- queryable        # VCP get/set parameter commands, CTL status reads
- levelable        # backlight, contrast, brightness, color, tint, sharpness VCP codes
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params:
    - name: monitor_id
      type: string
      description: Monitor ID ('A'-'Z' for IDs 1-26, '*' for all)
  command: CTL-C203-D6 with power mode 0001

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: monitor_id
      type: string
  command: CTL-C203-D6 with power mode 0004

- id: power_status_read
  label: Power Status Read
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-01D6

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params:
    - name: monitor_id
      type: string
  command: CTL-0C / "OC"

- id: get_timing_report
  label: Get Timing Report
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-07

- id: get_serial_number
  label: Serial Number Read
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-C216

- id: get_model_name
  label: Model Name Read
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-C217

- id: get_mac_address
  label: MAC Address Read
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-C220

- id: get_firmware_version
  label: Firmware Version Read
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-CA02

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: input
      type: string
      description: |
        Input selector:
        0001H: VGA(RGB), 0005H: Video1(AV), 0009H: Tuner1(TV),
        000CH: DVD/HD1(VGA(YPbPr)), 0011H: HDMI1, 0012H: HDMI2,
        0082H: HDMI3, 0087H: MP(Media Player)
  command: VCP-00-60 Set parameter

- id: get_backlight
  label: Get Backlight
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-10 (page 00, code 10)

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-10 Set parameter

- id: get_contrast
  label: Get Contrast
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-12

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-12

- id: get_brightness
  label: Get Brightness (R gain)
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-16

- id: set_brightness
  label: Set Brightness (R gain)
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H
  command: VCP-00-16

- id: send_remote_control_code
  label: Send Remote Control Data Code
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: rc_code
      type: string
      description: |
        2-byte hex string for RC code:
        1D=PICTURE, 29=ASPECT, 43=SOUND, 08-0A:1-3, 12:0,
        19=INFO, 20=MENU, 1F=EXIT, 15=UP, 14=DOWN,
        21=LEFT, 22=RIGHT, 23=OK, 17=VOL+, 16=VOL-,
        33=CH+, 32=CH-, 1B=MUTE, 27=FREEZE, 2C=CC, 1A=MTS
    - name: repeat_times
      type: integer
      description: Repeat count (HL byte order)
  command: CTL-C210

- id: reset_video_settings
  label: Reset Video Settings
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: scope
      type: string
      description: 0001H=All, 0002H=Picture, 0003H=Adjust, 0004H=Audio, 0010H=Network
  command: VCP-02-CB

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: scope
      type: string
      description: 0001H=All, 0002H=Picture, 0003H=Adjust, 0004H=Audio, 0010H=Network
  command: VCP-02-CB 0001H

- id: get_temperature
  label: Get Temperature Sensor
  kind: query
  params:
    - name: monitor_id
      type: string
    - name: sensor
      type: integer
      description: Sensor number (01H-03H)
  command: VCP-02-78 (select sensor), VCP-02-79 (read value)

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: terminal
      type: string
      description: |
        01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr),
        11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP
    - name: name
      type: string
      description: Max 14 characters
  command: CTL-CA04-04

- id: reset_input_name
  label: Reset Input Name
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: terminal
      type: string
      description: 00=ALL, 01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP
  command: CTL-CA04-05
- id: get_input
  label: Get Input
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-60

- id: get_input_name
  label: Input Name Read
  kind: query
  params:
    - name: monitor_id
      type: string
    - name: terminal
      type: string
      description: 01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP
  command: CTL-CA04-03

- id: get_direct_tv_channel
  label: Direct TV Channel Read
  kind: query
  params:
    - name: monitor_id
      type: string
  command: CTL-C22C

- id: set_direct_tv_channel
  label: Direct TV Channel Write
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: major_channel_high
      type: string
      description: Major Channel High bytes (ASCII hex encoded)
    - name: major_channel_low
      type: string
      description: Major Channel Low bytes (ASCII hex encoded)
    - name: minor_channel
      type: string
      description: Minor Channel bytes (ASCII hex encoded)
  command: CTL-C22D

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0003H=HighBright, 0004H=Standard, 0008H=Custom, 0017H=Dynamic, 0018H=Energy Savings, 001BH=HDR Video, 001DH=Conferencing
  command: VCP-02-1A

- id: get_picture_mode
  label: Get Picture Mode
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-1A

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=NORMAL, 0002H=FULL, 0004H=ZOOM, 0007H=1to1
  command: VCP-02-70

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-70

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=On, 0003H=Auto
  command: VCP-02-E3

- id: get_overscan
  label: Get Overscan
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-E3

- id: set_dimming
  label: Set Dimming Setting
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=OFF, 0002H=Dynamic Backlight, 0003H=Local Dimming
  command: VCP-11-4E

- id: get_dimming
  label: Get Dimming Setting
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-4E

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0023H=Warm, 003FH=Normal, 005AH=Cool
  command: VCP-00-0C

- id: get_color_temperature
  label: Get Color Temperature
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-0C

- id: set_color_temperature_mode
  label: Set Color Temperature Mode
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0002H=Native, 000BH=Custom
  command: VCP-00-14

- id: get_color_temperature_mode
  label: Get Color Temperature Mode
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-14

- id: get_g_gain
  label: Get G Gain
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-18

- id: set_g_gain
  label: Set G Gain
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-18

- id: get_b_gain
  label: Get B Gain
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-1A

- id: set_b_gain
  label: Set B Gain
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-1A

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=OFF, 0001H=Low, 0002H=Mid, 0003H=High
  command: VCP-02-20

- id: get_noise_reduction
  label: Get Noise Reduction
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-20

- id: set_digital_noise_reduction
  label: Set Digital Noise Reduction
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=OFF, 0001H=Low, 0002H=Mid, 0003H=High
  command: VCP-02-26

- id: get_digital_noise_reduction
  label: Get Digital Noise Reduction
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-26

- id: set_adaptive_contrast
  label: Set Adaptive Contrast
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=Low, 0003H=Mid, 0004H=High
  command: VCP-02-8D

- id: get_adaptive_contrast
  label: Get Adaptive Contrast
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-8D

- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Native, 0004H=2.2, 0008H=2.4, 0010H=HDR-Hybrid Log, 0011H=HDR-ST2084(PQ)
  command: VCP-02-68

- id: get_gamma
  label: Get Gamma
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-68

- id: set_ambient_light_sensing
  label: Set Ambient Light Sensing
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=On
  command: VCP-10-C8

- id: get_ambient_light_sensing
  label: Get Ambient Light Sensing
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-C8

- id: set_color_enhance
  label: Set Color Enhance
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=Vivid, 0003H=Wide
  command: VCP-11-EC

- id: get_color_enhance
  label: Get Color Enhance
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-EC

- id: set_hdr_mode
  label: Set HDR Mode
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0004H=Low, 0005H=Mid, 0006H=High
  command: VCP-11-E5

- id: get_hdr_mode
  label: Get HDR Mode
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-E5

- id: set_video_black_level
  label: Set Video Black Level
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-92

- id: get_video_black_level
  label: Get Video Black Level
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-92

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-87

- id: get_sharpness
  label: Get Sharpness
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-87

- id: set_sharpness_2
  label: Set Sharpness 2
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (0-100)
  command: VCP-00-8C

- id: get_sharpness_2
  label: Get Sharpness 2
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-8C

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (Pale-Deep)
  command: VCP-00-8A

- id: get_color_saturation
  label: Get Color Saturation
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-8A

- id: set_color_2
  label: Set Color 2
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (Pale-Deep)
  command: VCP-02-1F

- id: get_color_2
  label: Get Color 2
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-1F

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (To Purplish-To Greenish)
  command: VCP-00-90

- id: get_tint
  label: Get Tint
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-90

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Standard, 0002H=Movie, 0003H=Music, 0005H=Custom
  command: VCP-10-B2

- id: get_sound_mode
  label: Get Sound Mode
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-B2

- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (To Left-To Right)
  command: VCP-00-93

- id: get_balance
  label: Get Balance
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-93

- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=On
  command: VCP-02-34

- id: get_surround
  label: Get Surround
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-34

- id: set_internal_speakers
  label: Set Internal Speakers
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=No mean, 0001H=Off, 0002H=On, 0003H=Auto
  command: VCP-11-BA

- id: get_internal_speakers
  label: Get Internal Speakers
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-BA

- id: set_audio_input
  label: Set Audio Input
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Audio1, 0002H=Audio2(AV), 0004H=HDMI1, 0006H=TV, 000AH=HDMI2, 000BH=HDMI3, 000DH=MP
  command: VCP-02-2E

- id: get_audio_input
  label: Get Audio Input
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-2E

- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (Small-Large)
  command: VCP-10-CB

- id: get_audio_delay
  label: Get Audio Delay
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-CB

- id: set_audio_source
  label: Set Audio Source (MTS)
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=No mean, 0001H=main, 0002H=sub, 0003H=main+sub, 0004H=stereo, 0005H=mono, 0006H=dual, 0007H=SAP
  command: VCP-02-2C

- id: get_audio_source
  label: Get Audio Source (MTS)
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-2C

- id: set_audio_language
  label: Set Audio Language
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0002H=English, 0003H=Francais, 000AH=Espanol
  command: VCP-10-B3

- id: get_audio_language
  label: Get Audio Language
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-B3

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params:
    - name: monitor_id
      type: string
  command: VCP-02-31

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=English, 0002H=Deutsch, 0003H=Francais, 0004H=Espanol
  command: VCP-00-68

- id: get_osd_language
  label: Get OSD Language
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-68

- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=30%, 0003H=50%, 0004H=70%
  command: VCP-02-B8

- id: get_osd_transparency
  label: Get OSD Transparency
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-B8

- id: set_information_osd
  label: Set Information OSD
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=Off, 0005H=On
  command: VCP-02-3D

- id: get_information_osd
  label: Get Information OSD
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-3D

- id: set_closed_caption
  label: Set Closed Caption
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=No mean, 0001H=Off, 0002H=CC1, 0003H=CC2, 0004H=CC3, 0005H=CC4, 0006H=Text1, 0007H=Text2, 0008H=Text3, 0009H=Text4
  command: VCP-10-84

- id: get_closed_caption
  label: Get Closed Caption
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-84

- id: set_digital_captions
  label: Set Digital Captions
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=No mean, 0001H=Off, 0002H=CS1, 0003H=CS2, 0004H=CS3, 0005H=CS4, 0006H=CS5, 0007H=CS6
  command: VCP-10-A1

- id: get_digital_captions
  label: Get Digital Captions
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-A1

- id: set_quick_start
  label: Set Quick Start
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=On
  command: VCP-11-EA

- id: get_quick_start
  label: Get Quick Start
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-EA

- id: set_auto_input_change
  label: Set Auto Input Change
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=First, 0002H=None, 0004H=Custom
  command: VCP-02-40

- id: get_auto_input_change
  label: Get Auto Input Change
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-40

- id: set_auto_input_1
  label: Set Auto Input Change Input 1
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1, 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3
  command: VCP-10-2E

- id: get_auto_input_1
  label: Get Auto Input Change Input 1
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-2E

- id: set_auto_input_2
  label: Set Auto Input Change Input 2
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1, 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3
  command: VCP-10-2F

- id: get_auto_input_2
  label: Get Auto Input Change Input 2
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-2F

- id: set_auto_input_3
  label: Set Auto Input Change Input 3
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1, 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3
  command: VCP-10-30

- id: get_auto_input_3
  label: Get Auto Input Change Input 3
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-30

- id: set_cec
  label: Set CEC
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=On
  command: VCP-11-76

- id: get_cec
  label: Get CEC
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-76

- id: set_cec_auto_turn_off
  label: Set CEC Auto Turn Off
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Disable, 0002H=Enable
  command: VCP-11-77

- id: get_cec_auto_turn_off
  label: Get CEC Auto Turn Off
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-77

- id: set_cec_audio_receiver
  label: Set CEC Audio Receiver
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Disable, 0002H=Enable
  command: VCP-11-78

- id: get_cec_audio_receiver
  label: Get CEC Audio Receiver
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-78

- id: set_cec_device_list
  label: Set CEC Device List
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=NO, 0002H=YES
  command: VCP-11-79

- id: get_cec_device_list
  label: Get CEC Device List
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-79

- id: set_edid
  label: Set EDID Mode
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Mode 0, 0002H=Mode 1, 0003H=Mode 2
  command: VCP-10-AA

- id: get_edid
  label: Get EDID Mode
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-AA

- id: set_video_range
  label: Set Video Range
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Expanded Signal, 0002H=Raw Signal, 0003H=Auto
  command: VCP-10-40

- id: get_video_range
  label: Get Video Range
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-40

- id: set_vga_mode
  label: Set VGA Mode
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=RGB, 0002H=YPbPr
  command: VCP-10-8E

- id: get_vga_mode
  label: Get VGA Mode
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-8E

- id: execute_auto_adjust
  label: Execute Auto Adjust
  kind: action
  params:
    - name: monitor_id
      type: string
  command: VCP-00-1E

- id: set_h_position
  label: Set H Position
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (Left-Right)
  command: VCP-00-20

- id: get_h_position
  label: Get H Position
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-20

- id: set_v_position
  label: Set V Position
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H (Bottom-Top)
  command: VCP-00-30

- id: get_v_position
  label: Get V Position
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-30

- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H
  command: VCP-00-0E

- id: get_clock
  label: Get Clock
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-0E

- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-0064H
  command: VCP-00-3E

- id: get_phase
  label: Get Phase
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-3E

- id: set_h_resolution
  label: Set H Resolution
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-FFFFH
  command: VCP-02-50

- id: get_h_resolution
  label: Get H Resolution
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-50

- id: set_v_resolution
  label: Set V Resolution
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0000H-FFFFH
  command: VCP-02-51

- id: get_v_resolution
  label: Get V Resolution
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-51

- id: set_key_lock
  label: Set Key Lock Settings
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=Off, 0001H=Mode2, 0002H=Mode1
  command: VCP-00-FB

- id: get_key_lock
  label: Get Key Lock Settings
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-00-FB

- id: set_ir_lock
  label: Set IR Lock Settings
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0004H=Mode2, 0005H=Mode1
  command: VCP-02-3F

- id: get_ir_lock
  label: Get IR Lock Settings
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-3F

- id: set_power_supply
  label: Set Power Supply
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=ON, 0003H=OFF
  command: VCP-11-75

- id: get_power_supply
  label: Get Power Supply
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-75

- id: set_led_indicator
  label: Set LED Indicator
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=ON, 0002H=OFF
  command: VCP-02-BE

- id: get_led_indicator
  label: Get LED Indicator
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-BE

- id: set_mute_settings
  label: Set Mute Settings
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Audio, 0002H=Video, 0003H=Audio & Video
  command: VCP-11-E9

- id: get_mute_settings
  label: Get Mute Settings
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-E9

- id: set_thermal_warning
  label: Set Thermal Management Warning
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0000H=No mean, 0001H=Off, 0002H=On
  command: VCP-11-ED

- id: get_thermal_warning
  label: Get Thermal Management Warning
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-11-ED

- id: set_thermal_shutdown
  label: Set Thermal Management Shutdown
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=Off, 0002H=On
  command: VCP-10-8A

- id: get_thermal_shutdown
  label: Get Thermal Management Shutdown
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-8A

- id: set_control_interface
  label: Set Control Interface
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: string
      description: 0001H=RS-232C, 0002H=LAN
  command: VCP-10-3E

- id: get_control_interface
  label: Get Control Interface
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-10-3E

- id: set_monitor_id
  label: Set Monitor ID
  kind: action
  params:
    - name: monitor_id
      type: string
    - name: value
      type: integer
      description: 0001H-0064H (1-100)
  command: VCP-02-3E

- id: get_monitor_id
  label: Get Monitor ID
  kind: query
  params:
    - name: monitor_id
      type: string
  command: VCP-02-3E
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "0001": ON
    - "0002": Stand-by (power save)
    - "0003": Reserved
    - "0004": OFF

- id: timing_report
  label: Timing Report
  type: object
  fields:
    - name: status
      type: bits
      description: |
        Bit7=1: Sync Freq out of range, Bit6=1: Unstable,
        Bit1: H-sync polarity (1=positive, 0=negative),
        Bit0: V-sync polarity (1=positive, 0=negative)
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

- id: serial_number
  label: Serial Number
  type: string
  max_length: 30

- id: model_name
  label: Model Name
  type: string
  max_length: 36

- id: mac_address
  label: MAC Address
  type: string
  max_length: 12

- id: firmware_version
  label: Firmware Version
  type: string
  description: Format "R.Major.Minor1.Minor2.Minor3.Branch1.Branch2"

- id: backlight
  label: Backlight
  type: range
  min: 0
  max: 100

- id: contrast
  label: Contrast
  type: range
  min: 0
  max: 100

- id: temperature
  label: Temperature
  type: integer
  description: 2's complement, degrees Celsius

- id: command_result
  label: Command Result Code
  type: enum
  values:
    - "00": No Error
    - "01": Unsupported operation
```

## Variables
```yaml
# VCP parameters - settable via Set Parameter message type
# UNRESOLVED: full VCP table not reproduced here; primary parameters documented in Actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - |
    Power cycle sequencing: The monitor will disconnect LAN after 15 minutes
    of no packet data. Controller must reconnect after timeout.
  - |
    Packet interval: controller must wait >600ms between consecutive commands.
```

## Notes

**Protocol framing**: Every packet: SOH(01h)-Header(6 bytes)-STX-Message-ETX-BCC-CR. Message length is ASCII-encoded. BCC is XOR checksum from byte D1 through D16. Destination/Source addresses are ASCII-encoded hex (e.g., Monitor ID 1 = 'A' = 41h).

**Monitor ID addressing**: Single monitor: 'A'(41h) through 'Z'(5Ah) for IDs 1-26. Broadcast to all: '*'(2Ah). Group IDs use '1'-'9' (31h-39h).

**Temperature readout**: 2's complement encoding. 0032h = +25°C, FFCEh = -25°C, FF92h = -55°C.

**Backlight/contrast range**: 0000H-0064H (0-100 decimal).

<!-- UNRESOLVED: DHCP is the default but IP address configuration details are in the User's manual which is not included in this source -->
<!-- UNRESOLVED: TV tuner channel read/write (CTL-C22C, CTL-C22D) details are marked as model-dependent but model list not specified in source -->
<!-- UNRESOLVED: VCP code pages 8 and 11 contain extensive additional parameters not fully enumerated here (audio delay, CEC settings, HDMI EDID, VGA options, etc.) — only key parameters extracted -->
<!-- UNRESOLVED: "PN-HWxx1" model number is a series designation; specific models (PN-HW651, PN-HW751, PN-HW861, PN-HW981) are not individually named in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: Sharp documentation header says "NEC LCD monitor" — unclear if this is a shared protocol or misattribution; treated as Sharp protocol per entity_id -->
<!-- UNRESOLVED: The source document header states "This document defines the communications method for control of the NEC LCD monitor" but the series is Sharp branded — protocol may be shared OEM design -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
  - assets.sharpnecdisplays.us
  - docs.aws.sharp.eu
  - business.sharpusa.com
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/SetupManual_PN-HWxx1.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-la862-la752-la652_n-format_command_manual_en_rev1.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
retrieved_at: 2026-05-18T11:28:49.298Z
last_checked_at: 2026-06-10T00:56:07.640Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:56:07.640Z
matched_actions: 150
action_count: 150
confidence: medium
summary: "All 150 spec actions confirmed with exact wire-literal matches against source; all 83 distinct CTL/VCP command tokens in the source are represented by the spec; transport parameters verified verbatim. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific variant differences (PN-HW651 vs PN-HW751 vs PN-HW861 vs PN-HW981) not documented in source"
- "full VCP table not reproduced here; primary parameters documented in Actions"
- "no unsolicited event messages documented in source"
- "no multi-step macros documented in source"
- "DHCP is the default but IP address configuration details are in the User's manual which is not included in this source"
- "TV tuner channel read/write (CTL-C22C, CTL-C22D) details are marked as model-dependent but model list not specified in source"
- "VCP code pages 8 and 11 contain extensive additional parameters not fully enumerated here (audio delay, CEC settings, HDMI EDID, VGA options, etc.) — only key parameters extracted"
- "\"PN-HWxx1\" model number is a series designation; specific models (PN-HW651, PN-HW751, PN-HW861, PN-HW981) are not individually named in source"
- "firmware version compatibility ranges not stated"
- "Sharp documentation header says \"NEC LCD monitor\" — unclear if this is a shared protocol or misattribution; treated as Sharp protocol per entity_id"
- "The source document header states \"This document defines the communications method for control of the NEC LCD monitor\" but the series is Sharp branded — protocol may be shared OEM design"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
