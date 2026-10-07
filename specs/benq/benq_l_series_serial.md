---
spec_id: admin/benq-l-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "BenQ L-Series Control Spec"
manufacturer: BenQ
model_family: LK935
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - LK935
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
  - benqimage.blob.core.windows.net
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR/Control%20Protocols/LK935/LK935_RS232%20Control%20Guide_0_Windows.pdf"
  - https://www.manualslib.com/manual/481564/Benq-Rs232-Commands.html
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
retrieved_at: 2026-04-29T15:23:38.850Z
last_checked_at: 2026-10-07T11:04:17.340Z
generated_at: 2026-10-07T11:04:17.340Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact L-Series model range not stated — source title mentions LK935 only"
  - "firmware version compatibility not stated"
  - "default baud rate not stated; must check projector OSD"
  - "min/max range not stated in source"
  - "step size not stated in source"
  - "range not stated in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "source does not document safety interlocks or power-on sequencing requirements"
  - "value ranges for volume, contrast, brightness, sharpness, color, flesh tone, overscan, keystone, corner fit not stated in source"
  - "response format for read/query commands not fully documented (only error responses described)"
  - "timing/delay requirements between commands not stated"
  - "maximum concurrent connection count for TCP control not stated"
  - "exact L-Series model range covered by this command set not stated — source title references LK935 only"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:04:17.340Z
  matched_actions: 172
  action_count: 172
  confidence: medium
  summary: "All 172 action units match source ASCII commands exactly, transport values are supported, and the source catalogue (including all reads) is fully represented. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# BenQ L-Series Control Spec

## Summary
BenQ L-Series projectors (including LK935) controlled via RS-232C serial or TCP/IP (RS232 over LAN). Commands use ASCII format `<CR>*<command>=<value>#<CR>`, with documented command-specific exceptions. Covers power, source selection, audio, picture settings, lamp control, keystone, lens memory, and miscellaneous operations.

<!-- UNRESOLVED: exact L-Series model range not stated — source title mentions LK935 only -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate:
    supported: [9600, 14400, 19200, 38400, 57600, 115200]
    default: null  # UNRESOLVED: default baud rate not stated; must check projector OSD
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 8000
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - queryable    # extensive read/status commands present
  - routable     # source selection commands present
  - levelable    # volume, contrast, brightness, sharpness controls present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "<CR>*pow=on#<CR>"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "<CR>*pow=off#<CR>"
    params: []

  - id: select_source
    label: Select Source
    kind: action
    command: "<CR>*sour={source}#<CR>"
    params:
      - name: source
        type: enum
        values:
          - value: RGB
            label: COMPUTER/YPbPr
          - value: RGB2
            label: COMPUTER 2/YPbPr2
          - value: RGB3
            label: COMPUTER 3/YPbPr3
          - value: ypbr
            label: Component
          - value: ypbr2
            label: Component2
          - value: dviA
            label: DVI-A
          - value: dvid
            label: DVI-D
          - value: hdmi
            label: HDMI (MHL)
          - value: hdmi2
            label: HDMI 2 (MHL2)
          - value: hdmi3
            label: HDMI 3
          - value: vid
            label: Composite
          - value: svid
            label: S-Video
          - value: network
            label: Network
          - value: usbdisplay
            label: USB Display
          - value: usbreader
            label: USB Reader
          - value: hdbaset
            label: HDBaseT
          - value: dp
            label: DisplayPort
          - value: sdi
            label: 3G-SDI
          - value: smartsystem
            label: Smart System

  - id: mute_on
    label: Mute On
    kind: action
    command: "<CR>*mute=on#<CR>"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "<CR>*mute=off#<CR>"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "<CR>*vol=+#<CR>"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "<CR>*vol=-#<CR>"
    params: []

  - id: volume_set
    label: Set Volume Level
    kind: action
    command: "<CR>*vol={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Volume level value

  - id: mic_volume_up
    label: Mic Volume Up
    kind: action
    command: "<CR>*micvol=+#<CR>"
    params: []

  - id: mic_volume_down
    label: Mic Volume Down
    kind: action
    command: "<CR>*micvol=-#<CR>"
    params: []

  - id: audio_pass_through_off
    label: Audio Pass Through Off
    kind: action
    command: "<CR>*audiosour=off#<CR>"
    params: []

  - id: select_audio_source
    label: Select Audio Source
    kind: action
    command: "<CR>*audiosour={source}#<CR>"
    params:
      - name: source
        type: enum
        values:
          - value: RGB
            label: Audio-Computer1
          - value: RGB2
            label: Audio-Computer2
          - value: vid
            label: Audio-Video/S-Video
          - value: ypbr
            label: Audio-Component
          - value: hdmi
            label: Audio-HDMI
          - value: hdmi2
            label: Audio-HDMI2
          - value: hdmi3
            label: Audio-HDMI3

  - id: select_picture_mode
    label: Select Picture Mode
    kind: action
    command: "<CR>*appmod={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - value: dynamic
            label: Dynamic
          - value: preset
            label: Presentation
          - value: srgb
            label: sRGB
          - value: bright
            label: Bright
          - value: livingroom
            label: LivingRoom
          - value: game
            label: Game
          - value: cine
            label: Cinema (Rec.709)
          - value: std
            label: Standard
          - value: video
            label: Video
          - value: football
            label: Football
          - value: footballbt
            label: Football Bright
          - value: golf
            label: Golf
          - value: videoconference
            label: Video Conference
          - value: dicom
            label: DICOM
          - value: dicom-sim
            label: DICOM-SIM
          - value: thx
            label: THX
          - value: silence
            label: Silence mode
          - value: dci-p3
            label: DCI-P3 mode (D.Cinema)
          - value: vivid
            label: Vivid
          - value: infographic
            label: Infographic
          - value: user1
            label: User1
          - value: user2
            label: User2
          - value: user3
            label: User3
          - value: isfday
            label: ISF Day
          - value: isfnight
            label: ISF Night
          - value: threed
            label: 3D
          - value: sport
            label: Sport
          - value: hdr
            label: HDR
          - value: hlg
            label: HLG

  - id: contrast_up
    label: Contrast Up
    kind: action
    command: "<CR>*con=+#<CR>"
    params: []

  - id: contrast_down
    label: Contrast Down
    kind: action
    command: "<CR>*con=-#<CR>"
    params: []

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: "<CR>*con={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Contrast value

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "<CR>*bri=+#<CR>"
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "<CR>*bri=-#<CR>"
    params: []

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: "<CR>*bri={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Brightness value

  - id: color_up
    label: Color Up
    kind: action
    command: "<CR>*color=+#<CR>"
    params: []

  - id: color_down
    label: Color Down
    kind: action
    command: "<CR>*color=-#<CR>"
    params: []

  - id: color_set
    label: Set Color
    kind: action
    command: "<CR>*color={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Color value

  - id: sharpness_up
    label: Sharpness Up
    kind: action
    command: "<CR>*sharp=+#<CR>"
    params: []

  - id: sharpness_down
    label: Sharpness Down
    kind: action
    command: "<CR>*sharp=-#<CR>"
    params: []

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command: "<CR>*sharp={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Sharpness value

  - id: flesh_tone_up
    label: Flesh Tone Up
    kind: action
    command: "<CR>*fleshtone=+#<CR>"
    params: []

  - id: flesh_tone_down
    label: Flesh Tone Down
    kind: action
    command: "<CR>*fleshtone=-#<CR>"
    params: []

  - id: flesh_tone_set
    label: Set Flesh Tone
    kind: action
    command: "<CR>*fleshtone={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Flesh Tone value

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "<CR>*ct={temp}#<CR>"
    params:
      - name: temp
        type: enum
        values:
          - value: warmer
            label: Warmer
          - value: warm
            label: Warm
          - value: normal
            label: Normal
          - value: cool
            label: Cool
          - value: cooler
            label: Cooler
          - value: native
            label: Lamp Native

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "<CR>*asp={ratio}#<CR>"
    params:
      - name: ratio
        type: enum
        values:
          - value: "4:3"
            label: 4:3
          - value: "16:6"
            label: 16:6
          - value: "16:9"
            label: 16:9
          - value: "16:10"
            label: 16:10
          - value: "2.4:1"
            label: 2.4:1
          - value: "21:9"
            label: 21:9
          - value: AUTO
            label: Auto
          - value: REAL
            label: Real
          - value: LBOX
            label: Letterbox
          - value: WIDE
            label: Wide
          - value: ANAM
            label: Anamorphic
          - value: ANAM2.35
            label: Anamorphic 2.35
          - value: ANAM16:9
            label: Anamorphic 16:9

  - id: vkeystone_up
    label: Vertical Keystone Increase
    kind: action
    command: "<CR>*vkeystone=+#<CR>"
    params: []

  - id: vkeystone_down
    label: Vertical Keystone Decrease
    kind: action
    command: "<CR>*vkeystone=-#<CR>"
    params: []

  - id: hkeystone_up
    label: Horizontal Keystone Increase
    kind: action
    command: "<CR>*hkeystone=+#<CR>"
    params: []

  - id: hkeystone_down
    label: Horizontal Keystone Decrease
    kind: action
    command: "<CR>*hkeystone=-#<CR>"
    params: []

  - id: overscan_up
    label: Overscan Increase
    kind: action
    command: "<CR>*overscan=+#<CR>"
    params: []

  - id: overscan_down
    label: Overscan Decrease
    kind: action
    command: "<CR>*overscan=-#<CR>"
    params: []

  - id: corner_fit_tlx_decrease
    label: 4 Corner Top-Left X Decrease
    kind: action
    command: "<CR>*cornerfittlx=-#<CR>"
    params: []

  - id: corner_fit_tlx_increase
    label: 4 Corner Top-Left X Increase
    kind: action
    command: "<CR>*cornerfittlx=+#<CR>"
    params: []

  - id: corner_fit_tly_decrease
    label: 4 Corner Top-Left Y Decrease
    kind: action
    command: "<CR>*cornerfittly=-#<CR>"
    params: []

  - id: corner_fit_tly_increase
    label: 4 Corner Top-Left Y Increase
    kind: action
    command: "<CR>*cornerfittly=+#<CR>"
    params: []

  - id: corner_fit_trx_decrease
    label: 4 Corner Top-Right X Decrease
    kind: action
    command: "<CR>*cornerfittrx=-#<CR>"
    params: []

  - id: corner_fit_trx_increase
    label: 4 Corner Top-Right X Increase
    kind: action
    command: "<CR>*cornerfittrx=+#<CR>"
    params: []

  - id: corner_fit_try_decrease
    label: 4 Corner Top-Right Y Decrease
    kind: action
    command: "<CR>*cornerfittry=-#<CR>"
    params: []

  - id: corner_fit_try_increase
    label: 4 Corner Top-Right Y Increase
    kind: action
    command: "<CR>*cornerfittry=+#<CR>"
    params: []

  - id: corner_fit_blx_decrease
    label: 4 Corner Bottom-Left X Decrease
    kind: action
    command: "<CR>*cornerfitblx=-#<CR>"
    params: []

  - id: corner_fit_blx_increase
    label: 4 Corner Bottom-Left X Increase
    kind: action
    command: "<CR>*cornerfitblx=+#<CR>"
    params: []

  - id: corner_fit_bly_decrease
    label: 4 Corner Bottom-Left Y Decrease
    kind: action
    command: "<CR>*cornerfitbly=-#<CR>"
    params: []

  - id: corner_fit_bly_increase
    label: 4 Corner Bottom-Left Y Increase
    kind: action
    command: "<CR>*cornerfitbly=+#<CR>"
    params: []

  - id: corner_fit_brx_decrease
    label: 4 Corner Bottom-Right X Decrease
    kind: action
    command: "<CR>*cornerfitbrx=-#<CR>"
    params: []

  - id: corner_fit_brx_increase
    label: 4 Corner Bottom-Right X Increase
    kind: action
    command: "<CR>*cornerfitbrx=+#<CR>"
    params: []

  - id: corner_fit_bry_decrease
    label: 4 Corner Bottom-Right Y Decrease
    kind: action
    command: "<CR>*cornerfitbry=-#<CR>"
    params: []

  - id: corner_fit_bry_increase
    label: 4 Corner Bottom-Right Y Increase
    kind: action
    command: "<CR>*cornerfitbry=+#<CR>"
    params: []

  - id: digital_zoom_in
    label: Digital Zoom In
    kind: action
    command: "<CR>*zoomI#<CR>"
    params: []

  - id: digital_zoom_out
    label: Digital Zoom Out
    kind: action
    command: "<CR>*zoomO#<CR>"
    params: []

  - id: auto_adjust
    label: Auto Adjust
    kind: action
    command: "<CR>*auto#<CR>"
    params: []

  - id: brilliant_color_on
    label: Brilliant Color On
    kind: action
    command: "<CR>*BC=on#<CR>"
    params: []

  - id: brilliant_color_off
    label: Brilliant Color Off
    kind: action
    command: "<CR>*BC=off#<CR>"
    params: []

  - id: set_hdr_mode
    label: Set HDR Mode
    kind: action
    command: "<CR>*hdr={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - value: auto
            label: Auto (HDR)
          - value: sdr
            label: SDR
          - value: hdr
            label: HDR10
          - value: hlg
            label: HLG

  - id: reset_current_picture
    label: Reset Current Picture Settings
    kind: action
    command: "<CR>*rstcurpicsetting#<CR>"
    params: []

  - id: reset_all_picture
    label: Reset All Picture Settings
    kind: action
    command: "<CR>*rstallpicsetting#<CR>"
    params: []

  - id: set_projector_position
    label: Set Projector Position
    kind: action
    command: "<CR>*pp={position}#<CR>"
    params:
      - name: position
        type: enum
        values:
          - value: FT
            label: Front Table
          - value: RE
            label: Rear Table
          - value: RC
            label: Rear Ceiling
          - value: FC
            label: Front Ceiling

  - id: quick_cooling_on
    label: Quick Cooling On
    kind: action
    command: "<CR>*qcool=on<CR>"
    params: []

  - id: quick_cooling_off
    label: Quick Cooling Off
    kind: action
    command: "<CR>*qcool=off<CR>"
    params: []

  - id: quick_auto_search_on
    label: Quick Auto Search On
    kind: action
    command: "<CR>*QAS=on#<CR>"
    params: []

  - id: quick_auto_search_off
    label: Quick Auto Search Off
    kind: action
    command: "<CR>*QAS=off#<CR>"
    params: []

  - id: set_menu_position
    label: Set Menu Position
    kind: action
    command: "<CR>*menuposition={position}#<CR>"
    params:
      - name: position
        type: enum
        values:
          - value: center
            label: Center
          - value: tl
            label: Top-Left
          - value: tr
            label: Top-Right
          - value: br
            label: Bottom-Right
          - value: bl
            label: Bottom-Left

  - id: direct_power_on
    label: Direct Power On
    kind: action
    command: "<CR>*directpower=on#<CR>"
    params: []

  - id: direct_power_off
    label: Direct Power Off
    kind: action
    command: "<CR>*directpower=off#<CR>"
    params: []

  - id: signal_power_on
    label: Signal Power On
    kind: action
    command: "<CR>*autopower=on#<CR>"
    params: []

  - id: signal_power_off
    label: Signal Power Off
    kind: action
    command: "<CR>*autopower=off#<CR>"
    params: []

  - id: standby_network_on
    label: Standby Network On
    kind: action
    command: "<CR>*standbynet=on#<CR>"
    params: []

  - id: standby_network_off
    label: Standby Network Off
    kind: action
    command: "<CR>*standbynet=off#<CR>"
    params: []

  - id: standby_microphone_on
    label: Standby Microphone On
    kind: action
    command: "<CR>*standbymic=on#<CR>"
    params: []

  - id: standby_microphone_off
    label: Standby Microphone Off
    kind: action
    command: "<CR>*standbymic=off#<CR>"
    params: []

  - id: standby_monitor_out_on
    label: Standby Monitor Out On
    kind: action
    command: "<CR>*standbymnt=on#<CR>"
    params: []

  - id: standby_monitor_out_off
    label: Standby Monitor Out Off
    kind: action
    command: "<CR>*standbymnt=off#<CR>"
    params: []

  - id: set_baud_rate
    label: Set Baud Rate
    kind: action
    command: "<CR>*baud={rate}#<CR>"
    params:
      - name: rate
        type: enum
        values:
          - value: "2400"
            label: 2400
          - value: "4800"
            label: 4800
          - value: "9600"
            label: 9600
          - value: "14400"
            label: 14400
          - value: "19200"
            label: 19200
          - value: "38400"
            label: 38400
          - value: "57600"
            label: 57600
          - value: "115200"
            label: 115200

  - id: set_lamp_mode
    label: Set Lamp Mode
    kind: action
    command: "<CR>*lampm={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - value: lnor
            label: Normal
          - value: eco
            label: Eco
          - value: seco
            label: SmartEco
          - value: seco2
            label: SmartEco 2
          - value: seco3
            label: SmartEco 3
          - value: dimming
            label: Dimping
          - value: custom
            label: Custom

  - id: set_lamp_custom_level
    label: Set Lamp Custom Level
    kind: action
    command: "<CR>*lampcustom={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Light level for custom lamp mode

  - id: blank_on
    label: Blank On
    kind: action
    command: "<CR>*blank=on#<CR>"
    params: []

  - id: blank_off
    label: Blank Off
    kind: action
    command: "<CR>*blank=off#<CR>"
    params: []

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "<CR>*freeze=on#<CR>"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "<CR>*freeze=off#<CR>"
    params: []

  - id: menu_on
    label: Menu On
    kind: action
    command: "<CR>*menu=on#<CR>"
    params: []

  - id: menu_off
    label: Menu Off
    kind: action
    command: "<CR>*menu=off#<CR>"
    params: []

  - id: nav_up
    label: Navigate Up
    kind: action
    command: "<CR>*up#<CR>"
    params: []

  - id: nav_down
    label: Navigate Down
    kind: action
    command: "<CR>*down#<CR>"
    params: []

  - id: nav_right
    label: Navigate Right
    kind: action
    command: "<CR>*right#<CR>"
    params: []

  - id: nav_left
    label: Navigate Left
    kind: action
    command: "<CR>*left#<CR>"
    params: []

  - id: nav_enter
    label: Navigate Enter
    kind: action
    command: "<CR>*enter#<CR>"
    params: []

  - id: nav_back
    label: Navigate Back
    kind: action
    command: "<CR>*back#<CR>"
    params: []

  - id: source_menu_on
    label: Source Menu On
    kind: action
    command: "<CR>*sourmenu=on#<CR>"
    params: []

  - id: source_menu_off
    label: Source Menu Off
    kind: action
    command: "<CR>*sourmenu=off#<CR>"
    params: []

  - id: set_3d_mode
    label: Set 3D Mode
    kind: action
    command: "<CR>*3d={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - value: "off"
            label: 3D Sync Off
          - value: auto
            label: 3D Auto
          - value: tb
            label: 3D Sync TopBottom
          - value: fs
            label: 3D Sync Frame Sequential
          - value: fp
            label: 3D Framepacking
          - value: sbs
            label: 3D Side by Side
          - value: da
            label: 3D Inverter Disable
          - value: iv
            label: 3D Inverter
          - value: 2d3d
            label: 2D to 3D
          - value: nvidia
            label: 3D nVIDIA

  - id: set_remote_receiver
    label: Set Remote Receiver
    kind: action
    command: "<CR>*rr={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - value: "on"
            label: On
          - value: "off"
            label: Off
          - value: fr
            label: Front+Rear
          - value: f
            label: Front
          - value: r
            label: Rear
          - value: t
            label: Top
          - value: tf
            label: Top+Front
          - value: tr
            label: Top+Rear

  - id: instant_on_on
    label: Instant On
    kind: action
    command: "<CR>*ins=on#<CR>"
    params: []

  - id: instant_on_off
    label: Instant Off
    kind: action
    command: "<CR>*ins=off#<CR>"
    params: []

  - id: lamp_saver_on
    label: LampSaver On
    kind: action
    command: "<CR>*lpsaver=on#<CR>"
    params: []

  - id: lamp_saver_off
    label: LampSaver Off
    kind: action
    command: "<CR>*lpsaver=off#<CR>"
    params: []

  - id: projection_login_code_on
    label: Projection Login Code On
    kind: action
    command: "<CR>*prjlogincode=on#<CR>"
    params: []

  - id: projection_login_code_off
    label: Projection Login Code Off
    kind: action
    command: "<CR>*prjlogincode=off#<CR>"
    params: []

  - id: broadcasting_on
    label: Broadcasting On
    kind: action
    command: "<CR>*broadcasting=on#<CR>"
    params: []

  - id: broadcasting_off
    label: Broadcasting Off
    kind: action
    command: "<CR>*broadcasting=off#<CR>"
    params: []

  - id: amx_discovery_on
    label: AMX Device Discovery On
    kind: action
    command: "<CR>*amxdd=on#<CR>"
    params: []

  - id: amx_discovery_off
    label: AMX Device Discovery Off
    kind: action
    command: "<CR>*amxdd=off#<CR>"
    params: []

  - id: high_altitude_on
    label: High Altitude Mode On
    kind: action
    command: "<CR>*Highaltitude=on#<CR>"
    params: []

  - id: high_altitude_off
    label: High Altitude Mode Off
    kind: action
    command: "<CR>*Highaltitude=off#<CR>"
    params: []

  - id: load_lens_memory
    label: Load Lens Memory
    kind: action
    command: "<CR>*lensload=m{slot}#<CR>"
    params:
      - name: slot
        type: integer
        description: Memory slot (1-10)

  - id: save_lens_memory
    label: Save Lens Memory
    kind: action
    command: "<CR>*lenssave=m{slot}#<CR>"
    params:
      - name: slot
        type: integer
        description: Memory slot (1-10)

  - id: reset_lens_center
    label: Reset Lens to Center
    kind: action
    command: "<CR>*lensreset=center#<CR>"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power Status
    query: "<CR>*pow=?#<CR>"
    query_command: "<CR>*pow=?#<CR>"
    type: enum
    values: [on, off]

  - id: current_source
    label: Current Source
    query: "<CR>*sour=?#<CR>"
    query_command: "<CR>*sour=?#<CR>"
    type: string

  - id: mute_status
    label: Mute Status
    query: "<CR>*mute=?#<CR>"
    query_command: "<CR>*mute=?#<CR>"
    type: enum
    values: [on, off]

  - id: volume_status
    label: Volume Status
    query: "<CR>*vol=?#<CR>"
    query_command: "<CR>*vol=?#<CR>"
    type: integer

  - id: mic_volume_status
    label: Mic Volume Status
    query: "<CR>*micvol=?#<CR>"
    query_command: "<CR>*micvol=?#<CR>"
    type: integer

  - id: audio_source_status
    label: Audio Source Status
    query: "<CR>*audiosour=?#<CR>"
    query_command: "<CR>*audiosour=?#<CR>"
    type: string

  - id: picture_mode
    label: Picture Mode
    query: "<CR>*appmod=?#<CR>"
    query_command: "<CR>*appmod=?#<CR>"
    type: string

  - id: contrast_value
    label: Contrast Value
    query: "<CR>*con=?#<CR>"
    query_command: "<CR>*con=?#<CR>"
    type: integer

  - id: brightness_value
    label: Brightness Value
    query: "<CR>*bri=?#<CR>"
    query_command: "<CR>*bri=?#<CR>"
    type: integer

  - id: color_value
    label: Color Value
    query: "<CR>*color=?#<CR>"
    query_command: "<CR>*color=?#<CR>"
    type: integer

  - id: sharpness_value
    label: Sharpness Value
    query: "<CR>*sharp=?#<CR>"
    query_command: "<CR>*sharp=?#<CR>"
    type: integer

  - id: flesh_tone_value
    label: Flesh Tone Value
    query: "<CR>*fleshtone=?#<CR>"
    query_command: "<CR>*fleshtone=?#<CR>"
    type: integer

  - id: color_temperature
    label: Color Temperature Status
    query: "<CR>*ct=?#<CR>"
    query_command: "<CR>*ct=?#<CR>"
    type: string

  - id: aspect_ratio
    label: Aspect Ratio Status
    query: "<CR>*asp=?#<CR>"
    query_command: "<CR>*asp=?#<CR>"
    type: string

  - id: vkeystone_value
    label: Vertical Keystone Value
    query: "<CR>*vkeystone=?#<CR>"
    query_command: "<CR>*vkeystone=?#<CR>"
    type: integer

  - id: hkeystone_value
    label: Horizontal Keystone Value
    query: "<CR>*hkeystone=?#<CR>"
    query_command: "<CR>*hkeystone=?#<CR>"
    type: integer

  - id: overscan_value
    label: Overscan Value
    query: "<CR>*overscan=?#<CR>"
    query_command: "<CR>*overscan=?#<CR>"
    type: integer

  - id: corner_fit_tlx_status
    label: 4 Corner Top-Left X Status
    query: "<CR>*cornerfittlx=?#<CR>"
    query_command: "<CR>*cornerfittlx=?#<CR>"
    type: integer

  - id: corner_fit_tly_status
    label: 4 Corner Top-Left Y Status
    query: "<CR>*cornerfittly=?#<CR>"
    query_command: "<CR>*cornerfittly=?#<CR>"
    type: integer

  - id: corner_fit_trx_status
    label: 4 Corner Top-Right X Status
    query: "<CR>*cornerfittrx=?#<CR>"
    query_command: "<CR>*cornerfittrx=?#<CR>"
    type: integer

  - id: corner_fit_try_status
    label: 4 Corner Top-Right Y Status
    query: "<CR>*cornerfittry=?#<CR>"
    query_command: "<CR>*cornerfittry=?#<CR>"
    type: integer

  - id: corner_fit_blx_status
    label: 4 Corner Bottom-Left X Status
    query: "<CR>*cornerfitblx=?#<CR>"
    query_command: "<CR>*cornerfitblx=?#<CR>"
    type: integer

  - id: corner_fit_bly_status
    label: 4 Corner Bottom-Left Y Status
    query: "<CR>*cornerfitbly=?#<CR>"
    query_command: "<CR>*cornerfitbly=?#<CR>"
    type: integer

  - id: corner_fit_brx_status
    label: 4 Corner Bottom-Right X Status
    query: "<CR>*cornerfitbrx=?#<CR>"
    query_command: "<CR>*cornerfitbrx=?#<CR>"
    type: integer

  - id: corner_fit_bry_status
    label: 4 Corner Bottom-Right Y Status
    query: "<CR>*cornerfitbry=?#<CR>"
    query_command: "<CR>*cornerfitbry=?#<CR>"
    type: integer

  - id: brilliant_color_status
    label: Brilliant Color Status
    query: "<CR>*BC=?#<CR>"
    query_command: "<CR>*BC=?#<CR>"
    type: enum
    values: [on, off]

  - id: hdr_status
    label: HDR Status
    query: "<CR>*hdr=?#<CR>"
    query_command: "<CR>*hdr=?#<CR>"
    type: string

  - id: projector_position
    label: Projector Position Status
    query: "<CR>*pp=?#<CR>"
    query_command: "<CR>*pp=?#<CR>"
    type: enum
    values: [FT, RE, RC, FC]

  - id: quick_cooling_status
    label: Quick Cooling Status
    query: "<CR>*qcool=?<CR>"
    query_command: "<CR>*qcool=?<CR>"
    type: enum
    values: [on, off]

  - id: quick_auto_search_status
    label: Quick Auto Search Status
    query: "<CR>*QAS=?#<CR>"
    query_command: "<CR>*QAS=?#<CR>"
    type: enum
    values: [on, off]

  - id: menu_position_status
    label: Menu Position Status
    query: "<CR>*menuposition=?#<CR>"
    query_command: "<CR>*menuposition=?#<CR>"
    type: string

  - id: direct_power_status
    label: Direct Power On Status
    query: "<CR>*directpower=?#<CR>"
    query_command: "<CR>*directpower=?#<CR>"
    type: enum
    values: [on, off]

  - id: signal_power_status
    label: Signal Power On Status
    query: "<CR>*autopower=?#<CR>"
    query_command: "<CR>*autopower=?#<CR>"
    type: enum
    values: [on, off]

  - id: standby_network_status
    label: Standby Network Status
    query: "<CR>*standbynet=?#<CR>"
    query_command: "<CR>*standbynet=?#<CR>"
    type: enum
    values: [on, off]

  - id: standby_microphone_status
    label: Standby Microphone Status
    query: "<CR>*standbymic=?#<CR>"
    query_command: "<CR>*standbymic=?#<CR>"
    type: enum
    values: [on, off]

  - id: standby_monitor_out_status
    label: Standby Monitor Out Status
    query: "<CR>*standbymnt=?#<CR>"
    query_command: "<CR>*standbymnt=?#<CR>"
    type: enum
    values: [on, off]

  - id: baud_rate
    label: Current Baud Rate
    query: "<CR>*baud=?#<CR>"
    query_command: "<CR>*baud=?#<CR>"
    type: integer

  - id: lamp_hours
    label: Lamp Hours
    query: "<CR>*ltim=?#<CR>"
    query_command: "<CR>*ltim=?#<CR>"
    type: integer

  - id: lamp2_hours
    label: Lamp 2 Hours
    query: "<CR>*ltim2=?#<CR>"
    query_command: "<CR>*ltim2=?#<CR>"
    type: integer

  - id: lamp_mode
    label: Lamp Mode Status
    query: "<CR>*lampm=?#<CR>"
    query_command: "<CR>*lampm=?#<CR>"
    type: string

  - id: lamp_custom_level
    label: Lamp Custom Level Status
    query: "<CR>*lampcustom=?#<CR>"
    query_command: "<CR>*lampcustom=?#<CR>"
    type: integer

  - id: model_name
    label: Model Name
    query: "<CR>*modelname=?#<CR>"
    query_command: "<CR>*modelname=?#<CR>"
    type: string

  - id: system_fw_version
    label: System Firmware Version
    query: "<CR>*sysfwversion=?#<CR>"
    query_command: "<CR>*sysfwversion=?#<CR>"
    type: string

  - id: scaler_fw_version
    label: Scaler Firmware Version
    query: "<CR>*scalerfwversion=?#<CR>"
    query_command: "<CR>*scalerfwversion=?#<CR>"
    type: string

  - id: format_fw_version
    label: Format Firmware Version
    query: "<CR>*formatfwversion=?#<CR>"
    query_command: "<CR>*formatfwversion=?#<CR>"
    type: string

  - id: lan_fw_version
    label: LAN Firmware Version
    query: "<CR>*lanfwversion=?#<CR>"
    query_command: "<CR>*lanfwversion=?#<CR>"
    type: string

  - id: mcu_fw_version
    label: MCU Firmware Version
    query: "<CR>*mcufwversion=?#<CR>"
    query_command: "<CR>*mcufwversion=?#<CR>"
    type: string

  - id: ballast_fw_version
    label: Ballast Firmware Version
    query: "<CR>*ballastfwversion=?#<CR>"
    query_command: "<CR>*ballastfwversion=?#<CR>"
    type: string

  - id: blank_status
    label: Blank Status
    query: "<CR>*blank=?#<CR>"
    query_command: "<CR>*blank=?#<CR>"
    type: enum
    values: [on, off]

  - id: freeze_status
    label: Freeze Status
    query: "<CR>*freeze=?#<CR>"
    query_command: "<CR>*freeze=?#<CR>"
    type: enum
    values: [on, off]

  - id: menu_status
    label: Menu Status
    query: "<CR>*menu=?#<CR>"
    query_command: "<CR>*menu=?#<CR>"
    type: enum
    values: [on, off]

  - id: source_menu_status
    label: Source Menu Status
    query: "<CR>*sourmenu=?#<CR>"
    query_command: "<CR>*sourmenu=?#<CR>"
    type: enum
    values: [on, off]

  - id: 3d_status
    label: 3D Sync Status
    query: "<CR>*3d=?#<CR>"
    query_command: "<CR>*3d=?#<CR>"
    type: string

  - id: remote_receiver_status
    label: Remote Receiver Status
    query: "<CR>*rr=?#<CR>"
    query_command: "<CR>*rr=?#<CR>"
    type: string

  - id: instant_on_status
    label: Instant On Status
    query: "<CR>*ins=?#<CR>"
    query_command: "<CR>*ins=?#<CR>"
    type: enum
    values: [on, off]

  - id: lamp_saver_status
    label: LampSaver Status
    query: "<CR>*lpsaver=?#<CR>"
    query_command: "<CR>*lpsaver=?#<CR>"
    type: enum
    values: [on, off]

  - id: projection_login_code_status
    label: Projection Login Code Status
    query: "<CR>*prjlogincode=?#<CR>"
    query_command: "<CR>*prjlogincode=?#<CR>"
    type: enum
    values: [on, off]

  - id: broadcasting_status
    label: Broadcasting Status
    query: "<CR>*broadcasting=?#<CR>"
    query_command: "<CR>*broadcasting=?<CR>"
    type: enum
    values: [on, off]

  - id: amx_discovery_status
    label: AMX Device Discovery Status
    query: "<CR>*amxdd=?#<CR>"
    query_command: "<CR>*amxdd=?#<CR>"
    type: enum
    values: [on, off]

  - id: mac_address
    label: MAC Address
    query: "<CR>*macaddr=?#<CR>"
    query_command: "<CR>*macaddr=?#<CR>"
    type: string

  - id: high_altitude_status
    label: High Altitude Mode Status
    query: "<CR>*Highaltitude=?#<CR>"
    query_command: "<CR>*Highaltitude=?#<CR>"
    type: enum
    values: [on, off]

  - id: lens_memory_status
    label: Lens Memory Status
    query: "<CR>*lensload=?#<CR>"
    query_command: "<CR>*lensload=?#<CR>"
    type: string
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume Level
    min: null  # UNRESOLVED: min/max range not stated in source
    max: null  # UNRESOLVED: min/max range not stated in source
    step: null  # UNRESOLVED: step size not stated in source

  - id: contrast
    label: Contrast
    min: null  # UNRESOLVED: range not stated in source
    max: null  # UNRESOLVED: range not stated in source

  - id: brightness
    label: Brightness
    min: null  # UNRESOLVED: range not stated in source
    max: null  # UNRESOLVED: range not stated in source

  - id: lamp_custom_level
    label: Lamp Custom Light Level
    min: null  # UNRESOLVED: range not stated in source
    max: null  # UNRESOLVED: range not stated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety interlocks or power-on sequencing requirements
```

## Notes
- Command format: `<CR>*<command>=<value>#<CR>` where `<CR>` is carriage return (0x0D). Some commands (zoom, navigation, auto, reset, and quick cooling) omit the `=value` portion or the `#` terminator as documented.
- Case insensitive — uppercase, lowercase, and mixed case accepted for all commands.
- Error responses: `Illegal format` (malformed command), `Unsupported item` (valid command not supported by model), `Block item` (command cannot execute under current conditions).
- Commands require standby power of 0.5W or a supported baud rate to be set.
- "Support" column in source indicates model-specific availability (YES/NO); all commands are documented regardless of per-model support.
- When controlling via LAN (TCP), commands must include `<CR>` delimiters; behavior is identical to serial control.
- HDBaseT control routes RS-232 through the HDBaseT connection with identical serial settings.

<!-- UNRESOLVED: value ranges for volume, contrast, brightness, sharpness, color, flesh tone, overscan, keystone, corner fit not stated in source -->
<!-- UNRESOLVED: response format for read/query commands not fully documented (only error responses described) -->
<!-- UNRESOLVED: timing/delay requirements between commands not stated -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP control not stated -->
<!-- UNRESOLVED: exact L-Series model range covered by this command set not stated — source title references LK935 only -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
  - benqimage.blob.core.windows.net
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR/Control%20Protocols/LK935/LK935_RS232%20Control%20Guide_0_Windows.pdf"
  - https://www.manualslib.com/manual/481564/Benq-Rs232-Commands.html
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
retrieved_at: 2026-04-29T15:23:38.850Z
last_checked_at: 2026-10-07T11:04:17.340Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:04:17.340Z
matched_actions: 172
action_count: 172
confidence: medium
summary: "All 172 action units match source ASCII commands exactly, transport values are supported, and the source catalogue (including all reads) is fully represented. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact L-Series model range not stated — source title mentions LK935 only"
- "firmware version compatibility not stated"
- "default baud rate not stated; must check projector OSD"
- "min/max range not stated in source"
- "step size not stated in source"
- "range not stated in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "source does not document safety interlocks or power-on sequencing requirements"
- "value ranges for volume, contrast, brightness, sharpness, color, flesh tone, overscan, keystone, corner fit not stated in source"
- "response format for read/query commands not fully documented (only error responses described)"
- "timing/delay requirements between commands not stated"
- "maximum concurrent connection count for TCP control not stated"
- "exact L-Series model range covered by this command set not stated — source title references LK935 only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
