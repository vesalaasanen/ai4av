---
spec_id: admin/sharp-lcle750-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCLE750 Series Control Spec"
manufacturer: Sharp
model_family: "LC-LE750 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LC-LE750 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-06-12T04:22:18.681Z
last_checked_at: 2026-06-12T19:41:18.563Z
generated_at: 2026-06-12T19:41:18.563Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "manufacturer branding is inconsistent (source says \"NEC LCD monitor\"); behavior under specific firmware revisions not stated"
  - "source does not document standalone settable parameters beyond the VCP actions above."
  - "source does not document multi-step command sequences beyond the worked"
  - "source does not document safety warnings, interlocks, or power-on sequencing"
  - "source does not list which VCP OSD-menu rows are exposed vs. N/A in a machine-readable form; enumerated from chapter 8 table by hand. Firmware-version dependency on individual commands not stated."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:41:18.563Z
  matched_actions: 90
  action_count: 90
  confidence: medium
  summary: "All 90 spec action-units have verbatim VCP page/op-code or CTL command-code matches in source chapters 7-8; transport values baud 9600, port 7142 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sharp LCLE750 Series Control Spec

## Summary
Control spec for the Sharp LC-LE750 series large-format LCD monitors. Source document references "NEC LCD monitor" throughout (the LC-LE750 series is an OEM/rebranded NEC platform). Two external control interfaces are documented: RS-232C (9-pin D-Sub, 9600 8N1) and LAN (TCP port 7142). Protocol is a framed ASCII command set with header, message body, BCC checksum, and CR delimiter; command families are VCP (set/get numeric parameters) and CTL (discrete control commands like power, save, firmware, IR).

<!-- UNRESOLVED: manufacturer branding is inconsistent (source says "NEC LCD monitor"); behavior under specific firmware revisions not stated -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: get_current_parameter
  label: Get Current Parameter (VCP)
  kind: query
  command: "01h 30h ID 43h 30h 36h 02h 30h {page_hi} {page_lo} 30h {op_hi} {op_lo} 03h BCC 0Dh"
  params:
    - name: page
      type: integer
      description: OP code page (ASCII-encoded hex, 2 chars)
    - name: op
      type: integer
      description: OP code (ASCII-encoded hex, 2 chars)
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: set_parameter
  label: Set Parameter (VCP)
  kind: action
  command: "01h 30h ID 45h {len_hi} {len_lo} 02h 30h {page_hi} {page_lo} 30h {op_hi} {op_lo} {val_msb}..{val_lsb} 03h BCC 0Dh"
  params:
    - name: page
      type: integer
      description: OP code page (ASCII-encoded hex, 2 chars)
    - name: op
      type: integer
      description: OP code (ASCII-encoded hex, 2 chars)
    - name: value
      type: integer
      description: 16-bit set value (ASCII-encoded hex, 4 chars, MSB first)
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: save_current_settings
  label: Save Current Settings (CTL-0C)
  kind: action
  command: "01h 30h ID 41h 30h 34h 02h 30h 43h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: get_timing_report
  label: Get Timing Report (CTL-07)
  kind: query
  command: "01h 30h ID 41h 30h 34h 02h 30h 37h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: null_message
  label: NULL Message (BE)
  kind: action
  command: "01h 30h 30h 41h 42h 30h 34h 02h 42h 45h 03h BCC 0Dh"
  params: []
  notes: Sent by monitor on timeout, unsupported message, BCC error, busy, or no-answer.

- id: power_status_read
  label: Power Status Read (CTL-01D6)
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 30h 31h 44h 36h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: power_control
  label: Power Control (CTL-C203-D6)
  kind: action
  command: "01h 30h ID 41h 30h 43h 02h 43h 32h 30h 33h 44h 36h 30h 30h 30h {mode} 03h BCC 0Dh"
  params:
    - name: mode
      type: string
      description: "Power mode ASCII hex: '0001' = ON, '0004' = OFF (0002/0003 = do not set)"
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: serial_no_read
  label: Serial Number Read (CTL-C216)
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 43h 32h 31h 36h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: model_name_read
  label: Model Name Read (CTL-C217)
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 43h 32h 31h 37h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: mac_address_read
  label: MAC Address Read Request (CTL-C220)
  kind: query
  command: "01h 30h ID 41h 31h 30h 02h 43h 32h 32h 30h 30h 30h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)
  notes: D05~06 device select fixed at '00'.

- id: direct_tv_channel_read
  label: Direct TV Channel Read Request (CTL-C22C)
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 43h 32h 32h 43h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: direct_tv_channel_write
  label: Direct TV Channel Write Request (CTL-C22D)
  kind: action
  command: "01h 30h ID 41h 31h 32h 02h 43h 32h 32h 44h {major_hi} {major_lo} {major_low_hi} {major_low_lo} {minor_hi} {minor_lo} 03h BCC 0Dh"
  params:
    - name: major_hi
      type: string
      description: Major channel high byte (ASCII hex)
    - name: major_lo
      type: string
      description: Major channel low byte (ASCII hex)
    - name: minor
      type: string
      description: Minor channel (ASCII hex)
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: remote_control_data_code
  label: Remote Control Data Code Send (CTL-C210)
  kind: action
  command: "01h 30h ID 41h 30h 43h 02h 43h 32h 31h 30h 30h 30h {rc_lo} {repeat_hi} {repeat_lo} 03h BCC 0Dh"
  params:
    - name: rc_key
      type: string
      description: "Remote control code (low byte, ASCII hex): 1D=PICTURE 29=ASPECT 43=SOUND 08-0F=1-8 10=9 44=DASH 12=0 19=INFO 20=MENU 1F=EXIT 15=UP 14=DOWN 21=LEFT 22=RIGHT 23=OK 17=VOL+ 16=VOL- 33=CH+ 32=CH- 1B=MUTE 27=FREEZE 2C=CC 1A=MTS"
    - name: repeat
      type: string
      description: Repeat times (ASCII hex, 2 chars)
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: firmware_version_read
  label: Firmware Version Read Request (CTL-CA02)
  kind: query
  command: "01h 30h ID 41h 30h 38h 02h 43h 41h 30h 32h 30h 30h 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)
  notes: D05~06 firmware type fixed at '00' (F/W Revision).

- id: input_name_read
  label: Input Name of Designated Terminal Read (CTL-CA04-03)
  kind: query
  command: "01h 30h ID 41h 30h 41h 02h 43h 41h 30h 34h 30h 33h {terminal} 03h BCC 0Dh"
  params:
    - name: terminal
      type: string
      description: "Input terminal (ASCII hex): 00=No mean 01=VGA(RGB) 05=AV 09=Tuner 0C=VGA(YPbPr) 11=HDMI1 12=HDMI2 82=HDMI3 87=MP"
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: input_name_write
  label: Input Name of Designated Terminal Write (CTL-CA04-04)
  kind: action
  command: "01h 30h ID 41h {len_hi} {len_lo} 02h 43h 41h 30h 34h 30h 34h {terminal} {name_bytes} 03h BCC 0Dh"
  params:
    - name: terminal
      type: string
      description: "Input terminal (ASCII hex): 01=VGA(RGB) 05=AV 09=Tuner 0C=VGA(YPbPr) 11=HDMI1 12=HDMI2 82=HDMI3 87=MP"
    - name: name
      type: string
      description: Input name, max 14 ASCII characters (each byte ASCII-encoded as 2 hex chars, max 37 bytes)
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

- id: input_name_reset
  label: Input Name of Designated Terminal Reset (CTL-CA04-05)
  kind: action
  command: "01h 30h ID 41h 30h 41h 02h 43h 41h 30h 34h 30h 35h {terminal} 03h BCC 0Dh"
  params:
    - name: terminal
      type: string
      description: "Input terminal to reset (ASCII hex): 00=ALL 01=VGA(RGB) 05=AV 09=Tuner 0C=VGA(YPbPr) 11=HDMI1 12=HDMI2 82=HDMI3 87=MP"
    - name: monitor_id
      type: integer
      description: Monitor ID 1-100, or 0x2A ('*') for all (ASCII-encoded address byte)

# --- VCP enumerated actions: one entry per source-listed OP code ---

- id: vcp_picture_mode
  label: Picture Mode (VCP-02-1A)
  kind: action
  command: "Set VCP page=02 op=1A value={mode}"
  params:
    - name: mode
      type: string
      description: "0003H=HighBright 0004H=Standard 0008H=Custom 0017H=Dynamic 0018H=Energy Savings 001BH=HDR Video 001DH=Conferencing"

- id: vcp_aspect_ratio
  label: Aspect Ratio (VCP-02-70)
  kind: action
  command: "Set VCP page=02 op=70 value={aspect}"
  params:
    - name: aspect
      type: string
      description: "0001H=NORMAL 0002H=FULL 0004H=ZOOM 0007H=1:1"

- id: vcp_overscan
  label: Overscan (VCP-02-E3)
  kind: action
  command: "Set VCP page=02 op=E3 value={overscan}"
  params:
    - name: overscan
      type: string
      description: "0001H=Off 0002H=On 0003H=Auto"

- id: vcp_dimming_setting
  label: Dimming Setting (VCP-11-4E)
  kind: action
  command: "Set VCP page=11 op=4E value={dimming}"
  params:
    - name: dimming
      type: string
      description: "0001H=OFF 0002H=Dynamic Backlight 0003H=Local Dimming (E328 not supported)"

- id: vcp_color_temperature
  label: Color Temperature (VCP-00-0C)
  kind: action
  command: "Set VCP page=00 op=0C value={temp}"
  params:
    - name: temp
      type: string
      description: "0023H=Warm 003FH=Normal 005AH=Cool"

- id: vcp_color_temperature_mode
  label: Color Temperature Mode (VCP-00-14)
  kind: action
  command: "Set VCP page=00 op=14 value={mode}"
  params:
    - name: mode
      type: string
      description: "0002H=Native 000BH=Custom"

- id: vcp_color_red_gain
  label: Color Red Gain (VCP-00-16)
  kind: action
  command: "Set VCP page=00 op=16 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Dark to Bright)

- id: vcp_color_green_gain
  label: Color Green Gain (VCP-00-18)
  kind: action
  command: "Set VCP page=00 op=18 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Dark to Bright)

- id: vcp_color_blue_gain
  label: Color Blue Gain (VCP-00-1A)
  kind: action
  command: "Set VCP page=00 op=1A value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Dark to Bright)

- id: vcp_noise_reduction_mpeg
  label: Noise Reduction MPEG (VCP-02-20)
  kind: action
  command: "Set VCP page=02 op=20 value={level}"
  params:
    - name: level
      type: string
      description: "0000H=OFF 0001H=Low 0002H=Mid 0003H=High"

- id: vcp_noise_reduction_dnr
  label: Noise Reduction DNR (VCP-02-26)
  kind: action
  command: "Set VCP page=02 op=26 value={level}"
  params:
    - name: level
      type: string
      description: "0000H=OFF 0001H=Low 0002H=Mid 0003H=High"

- id: vcp_adaptive_contrast
  label: Adaptive Contrast (VCP-02-8D)
  kind: action
  command: "Set VCP page=02 op=8D value={level}"
  params:
    - name: level
      type: string
      description: "0001H=Off 0002H=Low 0003H=Mid 0004H=High"

- id: vcp_gamma
  label: Gamma (VCP-02-68)
  kind: action
  command: "Set VCP page=02 op=68 value={gamma}"
  params:
    - name: gamma
      type: string
      description: "0001H=Native 0004H=2.2 0008H=2.4 0010H=HDR-Hybrid Log 0011H=HDR-ST2084(PQ)"

- id: vcp_ambient_light_sensing
  label: Ambient Light Sensing (VCP-10-C8)
  kind: action
  command: "Set VCP page=10 op=C8 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Off 0002H=On"

- id: vcp_color_enhance
  label: Color Enhance (VCP-11-EC)
  kind: action
  command: "Set VCP page=11 op=EC value={mode}"
  params:
    - name: mode
      type: string
      description: "0001H=Off 0002H=Vivid 0003H=Wide"

- id: vcp_hdr_mode
  label: HDR Mode (VCP-11-E5)
  kind: action
  command: "Set VCP page=11 op=E5 value={level}"
  params:
    - name: level
      type: string
      description: "0004H=Low 0005H=Mid 0006H=High"

- id: vcp_backlight
  label: Backlight / Brightness (VCP-00-10)
  kind: action
  command: "Set VCP page=00 op=10 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Dark to Bright)

- id: vcp_contrast
  label: Contrast (VCP-00-12)
  kind: action
  command: "Set VCP page=00 op=12 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Low to High)

- id: vcp_video_black_level
  label: Video Black Level (VCP-00-92)
  kind: action
  command: "Set VCP page=00 op=92 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (To Dark to To Bright)

- id: vcp_sharpness_a
  label: Sharpness A (VCP-00-87)
  kind: action
  command: "Set VCP page=00 op=87 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Dull to Sharp)

- id: vcp_sharpness_b
  label: Sharpness B (VCP-00-8C)
  kind: action
  command: "Set VCP page=00 op=8C value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Dull to Sharp)

- id: vcp_color_a
  label: Color A (VCP-00-8A)
  kind: action
  command: "Set VCP page=00 op=8A value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Pale to Deep)

- id: vcp_color_b
  label: Color B (VCP-02-1F)
  kind: action
  command: "Set VCP page=02 op=1F value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Pale to Deep)

- id: vcp_tint
  label: Tint (VCP-00-90)
  kind: action
  command: "Set VCP page=00 op=90 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (To Purplish to To Greenish)

- id: vcp_reset_video_settings
  label: Reset Video Settings (VCP-02-CB)
  kind: action
  command: "Set VCP page=02 op=CB value={scope}"
  params:
    - name: scope
      type: string
      description: "0001H=All(Factory Reset) 0002H=Picture 0003H=Adjust 0004H=Audio 0010H=Network"

- id: vcp_sound_mode
  label: Sound Mode (VCP-10-B2)
  kind: action
  command: "Set VCP page=10 op=B2 value={mode}"
  params:
    - name: mode
      type: string
      description: "0001H=Standard 0002H=Movie 0003H=Music 0005H=Custom"

- id: vcp_balance
  label: Balance (VCP-00-93)
  kind: action
  command: "Set VCP page=00 op=93 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (To Left to To Right)

- id: vcp_surround
  label: Surround (VCP-02-34)
  kind: action
  command: "Set VCP page=02 op=34 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Off 0002H=On"

- id: vcp_internal_speakers
  label: Internal Speakers (VCP-11-BA)
  kind: action
  command: "Set VCP page=11 op=BA value={mode}"
  params:
    - name: mode
      type: string
      description: "0000H=No mean 0001H=Off 0002H=On 0003H=Auto"

- id: vcp_audio_input
  label: Audio Input (VCP-02-2E)
  kind: action
  command: "Set VCP page=02 op=2E value={input}"
  params:
    - name: input
      type: string
      description: "0001H=Audio1 (Audio In) 0002H=Audio2 (AV) 0004H=HDMI1 0006H=TV (tuner models) 000AH=HDMI2 000BH=HDMI3 000DH=MP"

- id: vcp_audio_delay
  label: Audio Delay (VCP-10-CB)
  kind: action
  command: "Set VCP page=10 op=CB value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Small to Large)

- id: vcp_audio_source_mts
  label: Audio Source MTS (VCP-02-2C)
  kind: action
  command: "Set VCP page=02 op=2C value={mts}"
  params:
    - name: mts
      type: string
      description: "0000H=No mean 0001H=main 0002H=sub 0003H=main+sub 0004H=stereo 0005H=mono 0006H=dual 0007H=SAP"

- id: vcp_audio_language
  label: Audio Language (VCP-10-B3)
  kind: action
  command: "Set VCP page=10 op=B3 value={lang}"
  params:
    - name: lang
      type: string
      description: "0002H=English 0003H=Français 000AH=Español"

- id: vcp_reset_audio_settings
  label: Reset Audio Settings (VCP-02-31)
  kind: action
  command: "Set VCP page=02 op=31 value=0001H"
  params: []

- id: vcp_osd_language
  label: OSD Language (VCP-00-68)
  kind: action
  command: "Set VCP page=00 op=68 value={lang}"
  params:
    - name: lang
      type: string
      description: "0001H=English 0002H=Deutsch (tuner-US excluded) 0003H=Français 0004H=Español"

- id: vcp_osd_transparency
  label: OSD Transparency (VCP-02-B8)
  kind: action
  command: "Set VCP page=02 op=B8 value={level}"
  params:
    - name: level
      type: string
      description: "0001H=Off 0002H=30% 0003H=50% 0004H=70%"

- id: vcp_information_osd
  label: Information OSD (VCP-02-3D)
  kind: action
  command: "Set VCP page=02 op=3D value={state}"
  params:
    - name: state
      type: string
      description: "0000H=Off 0005H=On"

- id: vcp_caption_display
  label: Closed Caption Display (VCP-10-84)
  kind: action
  command: "Set VCP page=10 op=84 value={caption}"
  params:
    - name: caption
      type: string
      description: "0000H=No mean 0001H=Off 0002H=CC1 0003H=CC2 0004H=CC3 0005H=CC4 0006H=Text1 0007H=Text2 0008H=Text3 0009H=Text4"

- id: vcp_digital_captions
  label: Digital Captions (VCP-10-A1)
  kind: action
  command: "Set VCP page=10 op=A1 value={caption}"
  params:
    - name: caption
      type: string
      description: "0000H=No mean 0001H=Off 0002H=CS1 0003H=CS2 0004H=CS3 0005H=CS4 0006H=CS5 0007H=CS6"

- id: vcp_quick_start
  label: Quick Start (VCP-11-EA)
  kind: action
  command: "Set VCP page=11 op=EA value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Off 0002H=On"

- id: vcp_auto_input_change
  label: Auto Input Change (VCP-02-40)
  kind: action
  command: "Set VCP page=02 op=40 value={mode}"
  params:
    - name: mode
      type: string
      description: "0000H=First 0002H=None 0004H=Custom"

- id: vcp_input_1_priority
  label: Auto Input Change Input 1 (VCP-10-2E)
  kind: action
  command: "Set VCP page=10 op=2E value={input}"
  params:
    - name: input
      type: string
      description: "0001H=VGA 0005H=Video1(AV) 000CH=DVD/HD1(VGA YPbPr) 0011H=HDMI1 0012H=HDMI2 0082H=HDMI3"

- id: vcp_input_2_priority
  label: Auto Input Change Input 2 (VCP-10-2F)
  kind: action
  command: "Set VCP page=10 op=2F value={input}"
  params:
    - name: input
      type: string
      description: "0001H=VGA 0005H=Video1(AV) 000CH=DVD/HD1(VGA YPbPr) 0011H=HDMI1 0012H=HDMI2 0082H=HDMI3"

- id: vcp_input_3_priority
  label: Auto Input Change Input 3 (VCP-10-30)
  kind: action
  command: "Set VCP page=10 op=30 value={input}"
  params:
    - name: input
      type: string
      description: "0001H=VGA 0005H=Video1(AV) 000CH=DVD/HD1(VGA YPbPr) 0011H=HDMI1 0012H=HDMI2 0082H=HDMI3"

- id: vcp_cec
  label: HDMI CEC (VCP-11-76)
  kind: action
  command: "Set VCP page=11 op=76 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Off 0002H=On"

- id: vcp_cec_auto_turn_off
  label: HDMI CEC Auto Turn Off (VCP-11-77)
  kind: action
  command: "Set VCP page=11 op=77 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Disable 0002H=Enable"

- id: vcp_cec_audio_receiver
  label: HDMI CEC Audio Receiver (VCP-11-78)
  kind: action
  command: "Set VCP page=11 op=78 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Disable 0002H=Enable"

- id: vcp_cec_device_list
  label: HDMI CEC Device List (VCP-11-79)
  kind: action
  command: "Set VCP page=11 op=79 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=NO 0002H=YES"

- id: vcp_edid
  label: HDMI EDID (VCP-10-AA)
  kind: action
  command: "Set VCP page=10 op=AA value={mode}"
  params:
    - name: mode
      type: string
      description: "0001H=Mode 0 0002H=Mode 1 0003H=Mode 2"

- id: vcp_video_range
  label: HDMI Video Range (VCP-10-40)
  kind: action
  command: "Set VCP page=10 op=40 value={range}"
  params:
    - name: range
      type: string
      description: "0001H=Expanded Signal 0002H=Raw Signal 0003H=Auto"

- id: vcp_vga_mode
  label: VGA Mode (VCP-10-8E)
  kind: action
  command: "Set VCP page=10 op=8E value={mode}"
  params:
    - name: mode
      type: string
      description: "0001H=RGB 0002H=YPbPr"

- id: vcp_auto_adjust
  label: VGA Auto Adjust (VCP-00-1E)
  kind: action
  command: "Set VCP page=00 op=1E value=0001H"
  params: []
  notes: Execute.

- id: vcp_h_position
  label: VGA H.Position (VCP-00-20)
  kind: action
  command: "Set VCP page=00 op=20 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Left Side to Right Side)

- id: vcp_v_position
  label: VGA V.Position (VCP-00-30)
  kind: action
  command: "Set VCP page=00 op=30 value={val}"
  params:
    - name: val
      type: integer
      description: 0-100 (Bottom Side to Top Side)

- id: vcp_clock
  label: VGA Clock (VCP-00-0E)
  kind: action
  command: "Set VCP page=00 op=0E value={val}"
  params:
    - name: val
      type: integer
      description: 0-100

- id: vcp_phase
  label: VGA Phase (VCP-00-3E)
  kind: action
  command: "Set VCP page=00 op=3E value={val}"
  params:
    - name: val
      type: integer
      description: 0-100

- id: vcp_h_resolution
  label: VGA H.Resolution (VCP-02-50)
  kind: action
  command: "Set VCP page=02 op=50 value={val}"
  params:
    - name: val
      type: integer
      description: 0x0000-0xFFFF (Low to High)

- id: vcp_v_resolution
  label: VGA V.Resolution (VCP-02-51)
  kind: action
  command: "Set VCP page=02 op=51 value={val}"
  params:
    - name: val
      type: integer
      description: 0x0000-0xFFFF (Low to High)

- id: vcp_reset_vga_options
  label: Reset VGA Options (VCP-02-CB)
  kind: action
  command: "Set VCP page=02 op=CB value={scope}"
  params:
    - name: scope
      type: string
      description: "0001H=All(Factory Reset) 0002H=Picture 0003H=Adjust 0004H=Audio 0010H=Network"

- id: vcp_key_lock
  label: Key Lock Settings (VCP-00-FB)
  kind: action
  command: "Set VCP page=00 op=FB value={mode}"
  params:
    - name: mode
      type: string
      description: "0000H=Off 0001H=Mode2 0002H=Mode1"

- id: vcp_ir_lock
  label: IR Lock Settings (VCP-02-3F)
  kind: action
  command: "Set VCP page=02 op=3F value={mode}"
  params:
    - name: mode
      type: string
      description: "0001H=Off 0004H=Mode2 0005H=Mode1"

- id: vcp_power_supply
  label: Power Supply (VCP-11-75)
  kind: action
  command: "Set VCP page=11 op=75 value={state}"
  params:
    - name: state
      type: string
      description: "0001H=ON 0003H=OFF"

- id: vcp_led_indicator
  label: LED Indicator (VCP-02-BE)
  kind: action
  command: "Set VCP page=02 op=BE value={state}"
  params:
    - name: state
      type: string
      description: "0001H=ON 0002H=OFF"

- id: vcp_mute_settings
  label: Mute Settings (VCP-11-E9)
  kind: action
  command: "Set VCP page=11 op=E9 value={mode}"
  params:
    - name: mode
      type: string
      description: "0001H=Audio 0002H=Video 0003H=Audio & Video"

- id: vcp_thermal_warning
  label: Thermal Warning Message (VCP-11-ED)
  kind: action
  command: "Set VCP page=11 op=ED value={state}"
  params:
    - name: state
      type: string
      description: "0000H=No mean 0001H=Off 0002H=On"

- id: vcp_thermal_shutdown
  label: Thermal Shutdown (VCP-10-8A)
  kind: action
  command: "Set VCP page=10 op=8A value={state}"
  params:
    - name: state
      type: string
      description: "0001H=Off 0002H=On"

- id: vcp_factory_reset
  label: Factory Reset (VCP-02-CB)
  kind: action
  command: "Set VCP page=02 op=CB value={scope}"
  params:
    - name: scope
      type: string
      description: "0001H=All 0002H=Picture 0003H=Adjust 0004H=Audio 0010H=Network"

- id: vcp_control_interface
  label: Control Interface (VCP-10-3E)
  kind: action
  command: "Set VCP page=10 op=3E value={iface}"
  params:
    - name: iface
      type: string
      description: "0001H=RS-232C 0002H=LAN"

- id: vcp_monitor_id
  label: Monitor ID (VCP-02-3E)
  kind: action
  command: "Set VCP page=02 op=3E value={id}"
  params:
    - name: id
      type: integer
      description: 1-100

- id: vcp_reset_network_settings
  label: Reset Network Settings (VCP-02-CB)
  kind: action
  command: "Set VCP page=02 op=CB value=0010H"
  params: []

- id: vcp_input_select
  label: Input Select (VCP-00-60)
  kind: action
  command: "Set VCP page=00 op=60 value={input}"
  params:
    - name: input
      type: string
      description: "0001H=VGA(RGB) 0005H=Video1(AV) 0009H=Tuner1(TV, tuner models) 000CH=DVD/HD1 (VGA YPbPr) 0011H=HDMI1 0012H=HDMI2 0082H=HDMI3 0087H=MP"

- id: vcp_temperature_sensor_select
  label: Temperature Sensor Select (VCP-02-78)
  kind: action
  command: "Set VCP page=02 op=78 value={sensor}"
  params:
    - name: sensor
      type: integer
      description: Sensor number 1..N (reply reports total count)

- id: vcp_temperature_read
  label: Temperature Sensor Read (VCP-02-79)
  kind: query
  command: "Get VCP page=02 op=79"
  params: []
  notes: Returns 16-bit 2's-complement value; +25C=0x0032, -25C=0xFFCE, range -55C..+125C.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby, reserved, off]
  description: |
    Power state from CTL-01D6 reply D13~16. 0001H=ON, 0002H=Stand-by (power save),
    0003H=Reserved, 0004H=OFF (same as IR power off).

- id: temperature_sensor_count
  type: integer
  description: Number of temperature sensors (from VCP-02-78 reply D09~12).

- id: temperature_celsius
  type: integer
  description: Temperature of selected sensor in 0.5C steps (16-bit 2's complement from VCP-02-79).

- id: input_terminal_current
  type: string
  description: Currently selected input terminal code (from VCP-00-60 reply).

- id: vcp_max_value
  type: integer
  description: Maximum value the monitor accepts for the queried VCP parameter (16-bit, from Get reply D10~13).

- id: vcp_current_value
  type: integer
  description: Current value of the queried VCP parameter (16-bit, from Get reply D14~17).

- id: timing_status
  type: integer
  description: |
    SS byte from CTL-07 reply. Bit 7: out-of-range/no-signal. Bit 6: unstable count.
    Bit 1: positive H-sync polarity. Bit 0: positive V-sync polarity.

- id: horizontal_frequency
  type: number
  description: Horizontal frequency in 0.01kHz units (from CTL-07 reply D05~08).

- id: vertical_frequency
  type: number
  description: Vertical frequency in 0.01Hz units (from CTL-07 reply D09~12).

- id: serial_number
  type: string
  description: Serial number, max 30 ASCII characters (from CTL-C216 reply).

- id: model_name
  type: string
  description: Model name, max 36 ASCII characters (from CTL-C217 reply).

- id: mac_address
  type: string
  description: MAC address, 12 hex characters (from CTL-C220 reply).

- id: firmware_version
  type: string
  description: Firmware version string "R<major>.<nnn><branch1><branch2>" (from CTL-CA02 reply D09~16).

- id: input_name
  type: string
  description: Input name, max 14 ASCII characters (from CTL-CA04-03 reply).

- id: reply_result
  type: enum
  values: [no_error, unsupported]
  description: Result code in CTL and VCP replies (00H=No Error, 01H=Unsupported).

- id: reply_message_type
  type: string
  description: Echo of the request message type (B=Command reply, D=Get reply, F=Set reply).
```

## Variables
```yaml
# UNRESOLVED: source does not document standalone settable parameters beyond the VCP actions above.
```

## Events
```yaml
- id: null_message
  description: |
    Monitor emits NULL Message (BE) on: timeout (default 10s), unsupported message type, BCC
    error, not-ready, or while busy executing long operations (Power ON, Power OFF, Auto
    Setup, Input, PIP Input, Factory Reset).
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences beyond the worked
# "Backlight" and "Temperature" examples in chapter 6.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing
# requirements. Thermal shutdown (VCP-10-8A) is a settings parameter, not a documented
# safety interlock procedure.
```

## Notes
Source document is a Sharp-branded external-control manual that internally references "NEC LCD monitor" — the LC-LE750 is an NEC-OEM platform. Two transport options share one protocol: RS-232C 9600 8N1 9-pin D-Sub, and TCP port 7142 on Ethernet. TCP idle timeout 15 min — controller must reconnect. Inter-packet interval must be > 600 ms.

Every packet is ASCII-framed: `SOH '0' DEST SRC TYPE LEN STX ... ETX BCC CR`. DEST encodes Monitor ID (1-100) or group A-J, or '0x2A' for all. SRC must be '0'. TYPE: A=Command, B=Command reply, C=Get parameter, D=Get reply, E=Set parameter, F=Set reply. BCC = XOR of all bytes from D1 through Dn-1 (D17 in worked example). Delimiter is CR (0x0D).

All numeric fields are ASCII-encoded hex. Every byte is sent as two ASCII hex chars. Monitor ID '1' -> DEST 'A' (41h). 'Get/Set' for VCP carries OP code page (2 ASCII hex) + OP code (2 ASCII hex); the reply carries result, page, op, type (00=Set / 01=Momentary), max value, current/request value, ETX.

CTL-0C saves current adjusted values to NVRAM; without this command, changes may not persist across power cycles. Direct TV Channel (CTL-C22C/C22D) and Tuner input are listed in source as TV-tuner model features (US only — source footnote). Several audio/closed-caption/parental-control features marked with N/A in the OSD table are not exposed over RS-232/TCP — those rows omitted from Actions.

<!-- UNRESOLVED: source does not list which VCP OSD-menu rows are exposed vs. N/A in a machine-readable form; enumerated from chapter 8 table by hand. Firmware-version dependency on individual commands not stated. -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-06-12T04:22:18.681Z
last_checked_at: 2026-06-12T19:41:18.563Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:41:18.563Z
matched_actions: 90
action_count: 90
confidence: medium
summary: "All 90 spec action-units have verbatim VCP page/op-code or CTL command-code matches in source chapters 7-8; transport values baud 9600, port 7142 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "manufacturer branding is inconsistent (source says \"NEC LCD monitor\"); behavior under specific firmware revisions not stated"
- "source does not document standalone settable parameters beyond the VCP actions above."
- "source does not document multi-step command sequences beyond the worked"
- "source does not document safety warnings, interlocks, or power-on sequencing"
- "source does not list which VCP OSD-menu rows are exposed vs. N/A in a machine-readable form; enumerated from chapter 8 table by hand. Firmware-version dependency on individual commands not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
