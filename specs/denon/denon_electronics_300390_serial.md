---
spec_id: admin/denon-electronics-300390
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics 300390 Control Spec"
manufacturer: Denon
model_family: AVR-X4000
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - AVR-X4000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.denon.com
  - snapav.com
source_urls:
  - https://assets.denon.com/documentmaster/us/dcm-390serialprotocol_ver1.40.pdf
  - https://assets.denon.com/documentmaster/us/fy21avr_denon_protocol_v02_04062020.xlsx
  - "http://assets.denon.com/DocumentMaster/us/AVRX4000_PROTOCOL(10 3 0)_V03.pdf"
  - https://assets.denon.com/documentmaster/uk/avr1713_avr1613_protocol_v860.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/AVR-X3500H_X2500H_X1500H_S940H_S740H_S640H_PROTOCOL.xlsx
retrieved_at: 2026-09-03T01:09:30.239Z
last_checked_at: 2026-09-03T22:20:39.096Z
generated_at: 2026-09-03T22:20:39.096Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document explicitly names AVR-X4000 as the application model; SKU 300390 has been mapped elsewhere to AVR-X1700H. The command catalogue is known to be shared across Denon/Marantz AVR generations, but the exact command set supported by 300390 has not been independently verified."
  - "source does not document safety warnings, interlocks, or power-on"
verification:
  verdict: verified
  checked_at: 2026-09-03T22:20:39.096Z
  matched_actions: 554
  action_count: 554
  confidence: medium
  summary: "All 554 spec actions map to source COMMAND tokens and the source's EVENT/RESPONSE variants are captured in the spec's Feedbacks pattern catalogue. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Denon Electronics 300390 Control Spec

## Summary
AVR control protocol document covering both RS-232C (DB-9 female, 9600 8N1) and Ethernet (RJ-45 10/100BASE-TX, TCP port 23 / telnet) transports. ASCII command set with 2-character opcodes terminated by CR (0x0D); command catalogue spans power, master volume, per-channel volume, input selection, surround mode, video processing, picture adjust, zone 2/3, tuner, HD Radio, network/USB/iPod, cursor/menu, triggers, and remote/panel lock. Source doc is the Denon AVR control protocol rev 10.3.0, application model AVR-X4000 — see Notes re: device/SKU mapping gap.

<!-- UNRESOLVED: source document explicitly names AVR-X4000 as the application model; SKU 300390 has been mapped elsewhere to AVR-X1700H. The command catalogue is known to be shared across Denon/Marantz AVR generations, but the exact command set supported by 300390 has not been independently verified. -->

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
  connector: DB-9 female (DCE, slave straight)
  # 1=GND, 2=TxD, 3=RxD, 5=Common(GND), 4/6/7/8/9=NC
  max_message_length: 135
addressing:
  port: 23
  # TCP port 23 (telnet), 10/100 Mbps, RJ-45
  max_message_length: 135
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from source:
- powerable       # PWON / PWSTANDBY
- routable        # SI input select, Z2/Z3 source select, SD/DC mode select
- levelable       # MV master volume, CV per-channel volume, Z2/Z3 volume
- queryable       # PW?/MV?/MU?/SI?/etc.
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWON\r"
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY\r"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PW?\r"
  params: []

- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: "MVUP\r"
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN\r"
  params: []
- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: "MV{level}\r"
  params:
    - name: level
      type: string
      description: Two or three ASCII characters, 00 (MIN) to 98 (MAX); 80=0dB; step 0.5dB uses three chars
- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "MV?\r"
  params: []

- id: channel_volume_fl_up
  label: Channel Volume FL Up
  kind: action
  command: "CVFL UP\r"
  params: []
- id: channel_volume_fl_down
  label: Channel Volume FL Down
  kind: action
  command: "CVFL DOWN\r"
  params: []
- id: channel_volume_fl_set
  label: Channel Volume FL Set
  kind: action
  command: "CVFL {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_fr_up
  label: Channel Volume FR Up
  kind: action
  command: "CVFR UP\r"
  params: []
- id: channel_volume_fr_down
  label: Channel Volume FR Down
  kind: action
  command: "CVFR DOWN\r"
  params: []
- id: channel_volume_fr_set
  label: Channel Volume FR Set
  kind: action
  command: "CVFR {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_c_up
  label: Channel Volume Center Up
  kind: action
  command: "CVC UP\r"
  params: []
- id: channel_volume_c_down
  label: Channel Volume Center Down
  kind: action
  command: "CVC DOWN\r"
  params: []
- id: channel_volume_c_set
  label: Channel Volume Center Set
  kind: action
  command: "CVC {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_sw_up
  label: Channel Volume SW Up
  kind: action
  command: "CVSW UP\r"
  params: []
- id: channel_volume_sw_down
  label: Channel Volume SW Down
  kind: action
  command: "CVSW DOWN\r"
  params: []
- id: channel_volume_sw_set
  label: Channel Volume SW Set
  kind: action
  command: "CVSW {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB, 00=OFF
- id: channel_volume_sw2_up
  label: Channel Volume SW2 Up
  kind: action
  command: "CVSW2 UP\r"
  params: []
- id: channel_volume_sw2_down
  label: Channel Volume SW2 Down
  kind: action
  command: "CVSW2 DOWN\r"
  params: []
- id: channel_volume_sw2_set
  label: Channel Volume SW2 Set
  kind: action
  command: "CVSW2 {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB, 00=OFF
- id: channel_volume_sl_up
  label: Channel Volume SL Up
  kind: action
  command: "CVSL UP\r"
  params: []
- id: channel_volume_sl_down
  label: Channel Volume SL Down
  kind: action
  command: "CVSL DOWN\r"
  params: []
- id: channel_volume_sl_set
  label: Channel Volume SL Set
  kind: action
  command: "CVSL {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_sr_up
  label: Channel Volume SR Up
  kind: action
  command: "CVSR UP\r"
  params: []
- id: channel_volume_sr_down
  label: Channel Volume SR Down
  kind: action
  command: "CVSR DOWN\r"
  params: []
- id: channel_volume_sr_set
  label: Channel Volume SR Set
  kind: action
  command: "CVSR {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_sbl_up
  label: Channel Volume SBL Up
  kind: action
  command: "CVSBL UP\r"
  params: []
- id: channel_volume_sbl_down
  label: Channel Volume SBL Down
  kind: action
  command: "CVSBL DOWN\r"
  params: []
- id: channel_volume_sbl_set
  label: Channel Volume SBL Set
  kind: action
  command: "CVSBL {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_sbr_up
  label: Channel Volume SBR Up
  kind: action
  command: "CVSBR UP\r"
  params: []
- id: channel_volume_sbr_down
  label: Channel Volume SBR Down
  kind: action
  command: "CVSBR DOWN\r"
  params: []
- id: channel_volume_sbr_set
  label: Channel Volume SBR Set
  kind: action
  command: "CVSBR {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_sb_up
  label: Channel Volume SB Up
  kind: action
  command: "CVSB UP\r"
  params: []
- id: channel_volume_sb_down
  label: Channel Volume SB Down
  kind: action
  command: "CVSB DOWN\r"
  params: []
- id: channel_volume_sb_set
  label: Channel Volume SB Set
  kind: action
  command: "CVSB {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_fhl_up
  label: Channel Volume FHL Up
  kind: action
  command: "CVFHL UP\r"
  params: []
- id: channel_volume_fhl_down
  label: Channel Volume FHL Down
  kind: action
  command: "CVFHL DOWN\r"
  params: []
- id: channel_volume_fhl_set
  label: Channel Volume FHL Set
  kind: action
  command: "CVFHL {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_fhr_up
  label: Channel Volume FHR Up
  kind: action
  command: "CVFHR UP\r"
  params: []
- id: channel_volume_fhr_down
  label: Channel Volume FHR Down
  kind: action
  command: "CVFHR DOWN\r"
  params: []
- id: channel_volume_fhr_set
  label: Channel Volume FHR Set
  kind: action
  command: "CVFHR {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_fwl_up
  label: Channel Volume FWL Up
  kind: action
  command: "CVFWL UP\r"
  params: []
- id: channel_volume_fwl_down
  label: Channel Volume FWL Down
  kind: action
  command: "CVFWL DOWN\r"
  params: []
- id: channel_volume_fwl_set
  label: Channel Volume FWL Set
  kind: action
  command: "CVFWL {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_fwr_up
  label: Channel Volume FWR Up
  kind: action
  command: "CVFWR UP\r"
  params: []
- id: channel_volume_fwr_down
  label: Channel Volume FWR Down
  kind: action
  command: "CVFWR DOWN\r"
  params: []
- id: channel_volume_fwr_set
  label: Channel Volume FWR Set
  kind: action
  command: "CVFWR {level}\r"
  params:
    - name: level
      type: string
      description: 38 to 62 by ASCII; 50=0dB
- id: channel_volume_query
  label: Channel Volume Query
  kind: query
  command: "CV?\r"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUON\r"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "MUOFF\r"
  params: []
- id: mute_query
  label: Mute Query
  kind: query
  command: "MU?\r"
  params: []

- id: select_input_phono
  label: Select Input Phono
  kind: action
  command: "SIPHONO\r"
  params: []
- id: select_input_cd
  label: Select Input CD
  kind: action
  command: "SICD\r"
  params: []
- id: select_input_hdradio
  label: Select Input HD Radio
  kind: action
  command: "SIHDRADIO\r"
  params: []
  # North America model only
- id: select_input_tuner
  label: Select Input Tuner
  kind: action
  command: "SITUNER\r"
  params: []
- id: select_input_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD\r"
  params: []
- id: select_input_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD\r"
  params: []
- id: select_input_tv
  label: Select Input TV
  kind: action
  command: "SITV\r"
  params: []
- id: select_input_satcbl
  label: Select Input SAT/CBL
  kind: action
  command: "SISAT/CBL\r"
  params: []
- id: select_input_mplay
  label: Select Input Media Player
  kind: action
  command: "SIMPLAY\r"
  params: []
- id: select_input_game
  label: Select Input Game
  kind: action
  command: "SIGAME\r"
  params: []
- id: select_input_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1\r"
  params: []
- id: select_input_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2\r"
  params: []
- id: select_input_net
  label: Select Input Network
  kind: action
  command: "SINET\r"
  params: []
- id: select_input_pandora
  label: Select Input Pandora
  kind: action
  command: "SIPANDORA\r"
  params: []
- id: select_input_siriusxm
  label: Select Input SiriusXM
  kind: action
  command: "SISIRIUSXM\r"
  params: []
- id: select_input_spotify
  label: Select Input Spotify
  kind: action
  command: "SISPOTIFY\r"
  params: []
- id: select_input_flickr
  label: Select Input Flickr
  kind: action
  command: "SIFLICKR\r"
  params: []
- id: select_input_favorites
  label: Select Input Favorites
  kind: action
  command: "SIFAVORITES\r"
  params: []
- id: select_input_iradio
  label: Select Input Internet Radio
  kind: action
  command: "SIIRADIO\r"
  params: []
- id: select_input_server
  label: Select Input Media Server
  kind: action
  command: "SISERVER\r"
  params: []
- id: select_input_usb_ipod
  label: Select Input USB/iPod
  kind: action
  command: "SIUSB/IPOD\r"
  params: []
- id: select_input_usb
  label: Select Input USB
  kind: action
  command: "SIUSB\r"
  params: []
- id: select_input_ipd
  label: Select Input iPod Direct
  kind: action
  command: "SIIPD\r"
  params: []
- id: select_input_irp
  label: Select Input Internet Radio Play
  kind: action
  command: "SIIRP\r"
  params: []
- id: select_input_fvp
  label: Select Input Favorites Play
  kind: action
  command: "SIFVP\r"
  params: []
- id: select_input_query
  label: Select Input Query
  kind: query
  command: "SI?\r"
  params: []

- id: main_zone_on
  label: Main Zone On
  kind: action
  command: "ZMON\r"
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF\r"
  params: []
- id: main_zone_query
  label: Main Zone Query
  kind: query
  command: "ZM?\r"
  params: []
- id: main_zone_favorite1
  label: Main Zone Favorite 1
  kind: action
  command: "ZMFAVORITE1\r"
  params: []
- id: main_zone_favorite2
  label: Main Zone Favorite 2
  kind: action
  command: "ZMFAVORITE2\r"
  params: []
- id: main_zone_favorite3
  label: Main Zone Favorite 3
  kind: action
  command: "ZMFAVORITE3\r"
  params: []
- id: main_zone_favorite4
  label: Main Zone Favorite 4
  kind: action
  command: "ZMFAVORITE4\r"
  params: []
- id: main_zone_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY\r"
  params: []
- id: main_zone_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY\r"
  params: []
- id: main_zone_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY\r"
  params: []
- id: main_zone_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  command: "ZMFAVORITE4 MEMORY\r"
  params: []

- id: input_mode_auto
  label: Input Mode Auto
  kind: action
  command: "SDAUTO\r"
  params: []
- id: input_mode_hdmi
  label: Input Mode Force HDMI
  kind: action
  command: "SDHDMI\r"
  params: []
- id: input_mode_digital
  label: Input Mode Force Digital
  kind: action
  command: "SDDIGITAL\r"
  params: []
- id: input_mode_analog
  label: Input Mode Force Analog
  kind: action
  command: "SDANALOG\r"
  params: []
- id: input_mode_query
  label: Input Mode Query
  kind: query
  command: "SD?\r"
  params: []

- id: digital_input_auto
  label: Digital Input Auto
  kind: action
  command: "DCAUTO\r"
  params: []
- id: digital_input_pcm
  label: Digital Input Force PCM
  kind: action
  command: "DCPCM\r"
  params: []
- id: digital_input_dts
  label: Digital Input Force DTS
  kind: action
  command: "DCDTS\r"
  params: []
- id: digital_input_query
  label: Digital Input Query
  kind: query
  command: "DC?\r"
  params: []

- id: video_select_on
  label: Video Select On
  kind: action
  command: "SVON\r"
  params: []
- id: video_select_off
  label: Video Select Off
  kind: action
  command: "SVOFF\r"
  params: []
- id: video_select_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD\r"
  params: []
- id: video_select_bd
  label: Video Select Blu-ray
  kind: action
  command: "SVBD\r"
  params: []
- id: video_select_tv
  label: Video Select TV
  kind: action
  command: "SVTV\r"
  params: []
- id: video_select_satcbl
  label: Video Select SAT/CBL
  kind: action
  command: "SVSAT/CBL\r"
  params: []
- id: video_select_mplay
  label: Video Select Media Player
  kind: action
  command: "SVMPLAY\r"
  params: []
- id: video_select_game
  label: Video Select Game
  kind: action
  command: "SVGAME\r"
  params: []
- id: video_select_aux1
  label: Video Select AUX1
  kind: action
  command: "SVSAUX1\r"
  params: []
- id: video_select_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2\r"
  params: []
- id: video_select_cd
  label: Video Select CD
  kind: action
  command: "SVCD\r"
  params: []
- id: video_select_query
  label: Video Select Query
  kind: query
  command: "SV?\r"
  params: []

- id: sleep_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF\r"
  params: []
- id: sleep_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: 001 to 120 by ASCII; 010=10min
- id: sleep_query
  label: Sleep Timer Query
  kind: query
  command: "SLP?\r"
  params: []

- id: surround_mode_movie
  label: Surround Mode Movie
  kind: action
  command: "MSMOVIE\r"
  params: []
- id: surround_mode_music
  label: Surround Mode Music
  kind: action
  command: "MSMUSIC\r"
  params: []
- id: surround_mode_game
  label: Surround Mode Game
  kind: action
  command: "MSGAME\r"
  params: []
- id: surround_mode_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT\r"
  params: []
- id: surround_mode_direct
  label: Surround Mode Direct
  kind: action
  command: "MSDIRECT\r"
  params: []
- id: surround_mode_stereo
  label: Surround Mode Stereo
  kind: action
  command: "MSSTEREO\r"
  params: []
- id: surround_mode_standard
  label: Surround Mode Standard
  kind: action
  command: "MSSTANDARD\r"
  params: []
- id: surround_mode_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  command: "MSDOLBY DIGITAL\r"
  params: []
- id: surround_mode_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND\r"
  params: []
- id: surround_mode_mch_stereo
  label: Surround Mode Multi Ch Stereo
  kind: action
  command: "MSMCH STEREO\r"
  params: []
- id: surround_mode_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  command: "MSROCK ARENA\r"
  params: []
- id: surround_mode_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  command: "MSJAZZ CLUB\r"
  params: []
- id: surround_mode_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  command: "MSMONO MOVIE\r"
  params: []
- id: surround_mode_matrix
  label: Surround Mode Matrix
  kind: action
  command: "MSMATRIX\r"
  params: []
- id: surround_mode_video_game
  label: Surround Mode Video Game
  kind: action
  command: "MSVIDEO GAME\r"
  params: []
- id: surround_mode_virtual
  label: Surround Mode Virtual
  kind: action
  command: "MSVIRTUAL\r"
  params: []
- id: surround_mode_query
  label: Surround Mode Query
  kind: query
  command: "MS?\r"
  params: []
- id: quick_select1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1\r"
  params: []
- id: quick_select2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2\r"
  params: []
- id: quick_select3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3\r"
  params: []
- id: quick_select4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4\r"
  params: []
- id: quick_select5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5\r"
  params: []
- id: quick_select1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY\r"
  params: []
- id: quick_select2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY\r"
  params: []
- id: quick_select3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY\r"
  params: []
- id: quick_select4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY\r"
  params: []
- id: quick_select5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY\r"
  params: []
- id: quick_select_query
  label: Quick Select Query
  kind: query
  command: "MSQUICK ?\r"
  params: []

- id: aspect_normal
  label: Aspect 4:3
  kind: action
  command: "VSASPNRM\r"
  params: []
- id: aspect_full
  label: Aspect 16:9
  kind: action
  command: "VSASPFUL\r"
  params: []
- id: aspect_query
  label: Aspect Query
  kind: query
  command: "VSASP ?\r"
  params: []
- id: resolution_analog_48p
  label: Analog Resolution 480p/576p
  kind: action
  command: "VSSC48P\r"
  params: []
- id: resolution_analog_10i
  label: Analog Resolution 1080i
  kind: action
  command: "VSSC10I\r"
  params: []
- id: resolution_analog_72p
  label: Analog Resolution 720p
  kind: action
  command: "VSSC72P\r"
  params: []
- id: resolution_analog_10p
  label: Analog Resolution 1080p
  kind: action
  command: "VSSC10P\r"
  params: []
- id: resolution_analog_10p24
  label: Analog Resolution 1080p24
  kind: action
  command: "VSSC10P24\r"
  params: []
- id: resolution_analog_4k
  label: Analog Resolution 4K
  kind: action
  command: "VSSC4K\r"
  params: []
- id: resolution_analog_auto
  label: Analog Resolution Auto
  kind: action
  command: "VSSCAUTO\r"
  params: []
- id: resolution_analog_query
  label: Analog Resolution Query
  kind: query
  command: "VSSC ?\r"
  params: []
- id: resolution_hdmi_48p
  label: HDMI Resolution 480p/576p
  kind: action
  command: "VSSCH48P\r"
  params: []
- id: resolution_hdmi_10i
  label: HDMI Resolution 1080i
  kind: action
  command: "VSSCH10I\r"
  params: []
- id: resolution_hdmi_72p
  label: HDMI Resolution 720p
  kind: action
  command: "VSSCH72P\r"
  params: []
- id: resolution_hdmi_10p
  label: HDMI Resolution 1080p
  kind: action
  command: "VSSCH10P\r"
  params: []
- id: resolution_hdmi_10p24
  label: HDMI Resolution 1080p24
  kind: action
  command: "VSSCH10P24\r"
  params: []
- id: resolution_hdmi_4k
  label: HDMI Resolution 4K
  kind: action
  command: "VSSCH4K\r"
  params: []
- id: resolution_hdmi_auto
  label: HDMI Resolution Auto
  kind: action
  command: "VSSCHAUTO\r"
  params: []
- id: resolution_hdmi_query
  label: HDMI Resolution Query
  kind: query
  command: "VSSCH ?\r"
  params: []
- id: hdmi_audio_amp
  label: HDMI Audio Output AMP
  kind: action
  command: "VSAUDIO AMP\r"
  params: []
- id: hdmi_audio_tv
  label: HDMI Audio Output TV
  kind: action
  command: "VSAUDIO TV\r"
  params: []
- id: hdmi_audio_query
  label: HDMI Audio Output Query
  kind: query
  command: "VSAUDIO ?\r"
  params: []
- id: video_processing_auto
  label: Video Processing Mode Auto
  kind: action
  command: "VSVPMAUTO\r"
  params: []
- id: video_processing_game
  label: Video Processing Mode Game
  kind: action
  command: "VSVPMGAME\r"
  params: []
- id: video_processing_movie
  label: Video Processing Mode Movie
  kind: action
  command: "VSVPMMOVI\r"
  params: []
- id: video_processing_query
  label: Video Processing Mode Query
  kind: query
  command: "VSVPM ?\r"
  params: []

- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF\r"
  params: []
- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON\r"
  params: []
- id: ps_tone_ctrl_query
  label: Tone Control Query
  kind: query
  command: "PSTONE CTRL ?\r"
  params: []
- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  command: "PSCINEMA EQ.ON\r"
  params: []
- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF\r"
  params: []
- id: ps_cinema_eq_query
  label: Cinema EQ Query
  kind: query
  command: "PSCINEMA EQ. ?\r"
  params: []
- id: ps_mode_music
  label: Decoder Mode Music
  kind: action
  command: "PSMODE:MUSIC\r"
  params: []
- id: ps_mode_cinema
  label: Decoder Mode Cinema
  kind: action
  command: "PSMODE:CINEMA\r"
  params: []
- id: ps_mode_game
  label: Decoder Mode Game
  kind: action
  command: "PSMODE:GAME\r"
  params: []
- id: ps_mode_query
  label: Decoder Mode Query
  kind: query
  command: "PSMODE: ?\r"
  params: []
- id: ps_lom_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON\r"
  params: []
- id: ps_lom_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF\r"
  params: []
- id: ps_lom_query
  label: Loudness Management Query
  kind: query
  command: "PSLOM ?\r"
  params: []
- id: ps_phg_low
  label: PLIIz Height Gain Low
  kind: action
  command: "PSPHG LOW\r"
  params: []
- id: ps_phg_mid
  label: PLIIz Height Gain Mid
  kind: action
  command: "PSPHG MID\r"
  params: []
- id: ps_phg_hi
  label: PLIIz Height Gain Hi
  kind: action
  command: "PSPHG HI\r"
  params: []
- id: ps_phg_query
  label: PLIIz Height Gain Query
  kind: query
  command: "PSPHG ?\r"
  params: []
- id: ps_sp_fh
  label: Speaker Output Front Height
  kind: action
  command: "PSSP:FH\r"
  params: []
- id: ps_sp_fw
  label: Speaker Output Front Wide
  kind: action
  command: "PSSP:FW\r"
  params: []
- id: ps_sp_sb
  label: Speaker Output Surround Back
  kind: action
  command: "PSSP:SB\r"
  params: []
- id: ps_sp_hw
  label: Speaker Output Height+Wide
  kind: action
  command: "PSSP:HW\r"
  params: []
- id: ps_sp_bh
  label: Speaker Output Back+Height
  kind: action
  command: "PSSP:BH\r"
  params: []
- id: ps_sp_bw
  label: Speaker Output Back+Wide
  kind: action
  command: "PSSP:BW\r"
  params: []
- id: ps_sp_query
  label: Speaker Output Query
  kind: query
  command: "PSSP: ?\r"
  params: []
- id: ps_multeq_audyssey
  label: MultEQ XT32 Audyssey
  kind: action
  command: "PSMULTEQ:AUDYSSEY\r"
  params: []
- id: ps_multeq_byplr
  label: MultEQ XT32 Bypass L/R
  kind: action
  command: "PSMULTEQ:BYP.LR\r"
  params: []
- id: ps_multeq_flat
  label: MultEQ XT32 Flat
  kind: action
  command: "PSMULTEQ:FLAT\r"
  params: []
- id: ps_multeq_manual
  label: MultEQ XT32 Manual
  kind: action
  command: "PSMULTEQ:MANUAL\r"
  params: []
- id: ps_multeq_off
  label: MultEQ XT32 Off
  kind: action
  command: "PSMULTEQ:OFF\r"
  params: []
- id: ps_multeq_query
  label: MultEQ XT32 Query
  kind: query
  command: "PSMULTEQ: ?\r"
  params: []
- id: ps_dyneq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQON\r"
  params: []
- id: ps_dyneq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQOFF\r"
  params: []
- id: ps_dyneq_query
  label: Dynamic EQ Query
  kind: query
  command: "PSDYNEQ?\r"
  params: []
- id: ps_reflev_0
  label: Reference Level Offset 0dB
  kind: action
  command: "PSREFLEV 0\r"
  params: []
- id: ps_reflev_5
  label: Reference Level Offset 5dB
  kind: action
  command: "PSREFLEV 5\r"
  params: []
- id: ps_reflev_10
  label: Reference Level Offset 10dB
  kind: action
  command: "PSREFLEV 10\r"
  params: []
- id: ps_reflev_15
  label: Reference Level Offset 15dB
  kind: action
  command: "PSREFLEV 15\r"
  params: []
- id: ps_reflev_query
  label: Reference Level Offset Query
  kind: query
  command: "PSREFLEV ?\r"
  params: []
- id: ps_dynvol_heavy
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV\r"
  params: []
- id: ps_dynvol_medium
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED\r"
  params: []
- id: ps_dynvol_light
  label: Dynamic Volume Light
  kind: action
  command: "PSDYNVOL LIT\r"
  params: []
- id: ps_dynvol_off
  label: Dynamic Volume Off
  kind: action
  command: "PSDYNVOL OFF\r"
  params: []
- id: ps_dynvol_query
  label: Dynamic Volume Query
  kind: query
  command: "PSDYNVOL ?\r"
  params: []
- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON\r"
  params: []
- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF\r"
  params: []
- id: ps_lfc_query
  label: Audyssey LFC Query
  kind: query
  command: "PSLFC ?\r"
  params: []
- id: ps_cntamt_up
  label: LFC Containment Amount Up
  kind: action
  command: "PSCNTAMT UP\r"
  params: []
- id: ps_cntamt_down
  label: LFC Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN\r"
  params: []
- id: ps_cntamt_set
  label: LFC Containment Amount Set
  kind: action
  command: "PSCNTAMT {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 01-07)
- id: ps_cntamt_query
  label: LFC Containment Amount Query
  kind: query
  command: "PSCNTAMT ?\r"
  params: []
- id: ps_dsx_onhw
  label: Audyssey DSX Heights+Wides
  kind: action
  command: "PSDSX ONHW\r"
  params: []
- id: ps_dsx_onh
  label: Audyssey DSX Heights Only
  kind: action
  command: "PSDSX ONH\r"
  params: []
- id: ps_dsx_onw
  label: Audyssey DSX Wides Only
  kind: action
  command: "PSDSX ONW\r"
  params: []
- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF\r"
  params: []
- id: ps_dsx_query
  label: Audyssey DSX Query
  kind: query
  command: "PSDSX ?\r"
  params: []
- id: ps_stw_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP\r"
  params: []
- id: ps_stw_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN\r"
  params: []
- id: ps_stw_set
  label: Stage Width Set
  kind: action
  command: "PSSTW {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 40-60)
- id: ps_stw_query
  label: Stage Width Query
  kind: query
  command: "PSSTW ?\r"
  params: []
- id: ps_sth_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP\r"
  params: []
- id: ps_sth_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN\r"
  params: []
- id: ps_sth_set
  label: Stage Height Set
  kind: action
  command: "PSSTH {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 40-60)
- id: ps_sth_query
  label: Stage Height Query
  kind: query
  command: "PSSTH ?\r"
  params: []
- id: ps_bas_up
  label: Bass Up
  kind: action
  command: "PSBAS UP\r"
  params: []
- id: ps_bas_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN\r"
  params: []
- id: ps_bas_set
  label: Bass Set
  kind: action
  command: "PSBAS {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 44-56)
- id: ps_bas_query
  label: Bass Query
  kind: query
  command: "PSBAS ?\r"
  params: []
- id: ps_tre_up
  label: Treble Up
  kind: action
  command: "PSTRE UP\r"
  params: []
- id: ps_tre_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN\r"
  params: []
- id: ps_tre_set
  label: Treble Set
  kind: action
  command: "PSTRE {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 44-56)
- id: ps_tre_query
  label: Treble Query
  kind: query
  command: "PSTRE ?\r"
  params: []
- id: ps_drc_auto
  label: Dynamic Compression Auto
  kind: action
  command: "PSDRC AUTO\r"
  params: []
- id: ps_drc_low
  label: Dynamic Compression Low
  kind: action
  command: "PSDRC LOW\r"
  params: []
- id: ps_drc_mid
  label: Dynamic Compression Mid
  kind: action
  command: "PSDRC MID\r"
  params: []
- id: ps_drc_hi
  label: Dynamic Compression Hi
  kind: action
  command: "PSDRC HI\r"
  params: []
- id: ps_drc_off
  label: Dynamic Compression Off
  kind: action
  command: "PSDRC OFF\r"
  params: []
- id: ps_drc_query
  label: Dynamic Compression Query
  kind: query
  command: "PSDRC ?\r"
  params: []
- id: ps_lfe_up
  label: LFE Up
  kind: action
  command: "PSLFE UP\r"
  params: []
- id: ps_lfe_down
  label: LFE Down
  kind: action
  command: "PSLFE DOWN\r"
  params: []
- id: ps_lfe_set
  label: LFE Set
  kind: action
  command: "PSLFE {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 00-10)
- id: ps_lfe_query
  label: LFE Query
  kind: query
  command: "PSLFE ?\r"
  params: []
- id: ps_eff_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP\r"
  params: []
- id: ps_eff_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN\r"
  params: []
- id: ps_eff_set
  label: Effect Level Set
  kind: action
  command: "PSEFF {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 01-15)
- id: ps_eff_query
  label: Effect Level Query
  kind: query
  command: "PSEFF ?\r"
  params: []
- id: ps_del_up
  label: Delay Up
  kind: action
  command: "PSDEL UP\r"
  params: []
- id: ps_del_down
  label: Delay Down
  kind: action
  command: "PSDEL DOWN\r"
  params: []
- id: ps_del_set
  label: Delay Set
  kind: action
  command: "PSDEL {ms}\r"
  params:
    - name: ms
      type: string
      description: 000-999 ms (AVR-X4000 limits 000-300)
- id: ps_del_query
  label: Delay Query
  kind: query
  command: "PSDEL ?\r"
  params: []
- id: ps_pan_on
  label: Panorama On
  kind: action
  command: "PSPAN ON\r"
  params: []
- id: ps_pan_off
  label: Panorama Off
  kind: action
  command: "PSPAN OFF\r"
  params: []
- id: ps_pan_query
  label: Panorama Query
  kind: query
  command: "PSPAN ?\r"
  params: []
- id: ps_dim_up
  label: Dimension Up
  kind: action
  command: "PSDIM UP\r"
  params: []
- id: ps_dim_down
  label: Dimension Down
  kind: action
  command: "PSDIM DOWN\r"
  params: []
- id: ps_dim_set
  label: Dimension Set
  kind: action
  command: "PSDIM {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 00-06)
- id: ps_dim_query
  label: Dimension Query
  kind: query
  command: "PSDIM ?\r"
  params: []
- id: ps_cen_up
  label: Center Width Up
  kind: action
  command: "PSCEN UP\r"
  params: []
- id: ps_cen_down
  label: Center Width Down
  kind: action
  command: "PSCEN DOWN\r"
  params: []
- id: ps_cen_set
  label: Center Width Set
  kind: action
  command: "PSCEN {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 00-07)
- id: ps_cen_query
  label: Center Width Query
  kind: query
  command: "PSCEN ?\r"
  params: []
- id: ps_ceg_up
  label: Center Gain Up
  kind: action
  command: "PSCEG UP\r"
  params: []
- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  command: "PSCEG DOWN\r"
  params: []
- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  command: "PSCEG {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 00-10, representing 0.0-1.0)
- id: ps_ceg_query
  label: Center Gain Query
  kind: query
  command: "PSCEG ?\r"
  params: []
- id: ps_swr_on
  label: Subwoofer On
  kind: action
  command: "PSSWR ON\r"
  params: []
- id: ps_swr_off
  label: Subwoofer Off
  kind: action
  command: "PSSWR OFF\r"
  params: []
- id: ps_swr_query
  label: Subwoofer Query
  kind: query
  command: "PSSWR ?\r"
  params: []
- id: ps_rsz_s
  label: Room Size Small
  kind: action
  command: "PSRSZ S\r"
  params: []
- id: ps_rsz_ms
  label: Room Size Medium-Small
  kind: action
  command: "PSRSZ MS\r"
  params: []
- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  command: "PSRSZ M\r"
  params: []
- id: ps_rsz_ml
  label: Room Size Medium-Large
  kind: action
  command: "PSRSZ ML\r"
  params: []
- id: ps_rsz_l
  label: Room Size Large
  kind: action
  command: "PSRSZ L\r"
  params: []
- id: ps_rsz_query
  label: Room Size Query
  kind: query
  command: "PSRSZ ?\r"
  params: []
- id: ps_delay_up
  label: Audio Delay Up
  kind: action
  command: "PSDELAY UP\r"
  params: []
- id: ps_delay_down
  label: Audio Delay Down
  kind: action
  command: "PSDELAY DOWN\r"
  params: []
- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  command: "PSDELAY {ms}\r"
  params:
    - name: ms
      type: string
      description: 000-999 ms (AVR-X4000 limits 000-200)
- id: ps_delay_query
  label: Audio Delay Query
  kind: query
  command: "PSDELAY ?\r"
  params: []
- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF\r"
  params: []
- id: ps_rstr_low
  label: Audio Restorer Low
  kind: action
  command: "PSRSTR LOW\r"
  params: []
- id: ps_rstr_med
  label: Audio Restorer Med
  kind: action
  command: "PSRSTR MED\r"
  params: []
- id: ps_rstr_hi
  label: Audio Restorer Hi
  kind: action
  command: "PSRSTR HI\r"
  params: []
- id: ps_rstr_query
  label: Audio Restorer Query
  kind: query
  command: "PSRSTR ?\r"
  params: []
- id: ps_front_spa
  label: Front Speaker A
  kind: action
  command: "PSFRONT SPA\r"
  params: []
- id: ps_front_spb
  label: Front Speaker B
  kind: action
  command: "PSFRONT SPB\r"
  params: []
- id: ps_front_spab
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B\r"
  params: []
- id: ps_front_query
  label: Front Speaker Query
  kind: query
  command: "PSFRONT?\r"
  params: []

- id: picture_mode_off
  label: Picture Mode Off
  kind: action
  command: "PVOFF\r"
  params: []
- id: picture_mode_std
  label: Picture Mode Standard
  kind: action
  command: "PVSTD\r"
  params: []
- id: picture_mode_mov
  label: Picture Mode Movie
  kind: action
  command: "PVMOV\r"
  params: []
- id: picture_mode_vvd
  label: Picture Mode Vivid
  kind: action
  command: "PVVVD\r"
  params: []
- id: picture_mode_stm
  label: Picture Mode Stream
  kind: action
  command: "PVSTM\r"
  params: []
- id: picture_mode_ctm
  label: Picture Mode Custom
  kind: action
  command: "PVCTM\r"
  params: []
- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "PV?\r"
  params: []
- id: pv_cn_up
  label: Contrast Up
  kind: action
  command: "PVCN UP\r"
  params: []
- id: pv_cn_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN\r"
  params: []
- id: pv_cn_set
  label: Contrast Set
  kind: action
  command: "PVCN {value}\r"
  params:
    - name: value
      type: string
      description: 44-56 (AVR-X4000 limits 44-56)
- id: pv_cn_query
  label: Contrast Query
  kind: query
  command: "PVCN ?\r"
  params: []
- id: pv_br_up
  label: Brightness Up
  kind: action
  command: "PVBR UP\r"
  params: []
- id: pv_br_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN\r"
  params: []
- id: pv_br_set
  label: Brightness Set
  kind: action
  command: "PVBR {value}\r"
  params:
    - name: value
      type: string
      description: 00-12 (AVR-X4000 limits 00-12)
- id: pv_br_query
  label: Brightness Query
  kind: query
  command: "PVBR ?\r"
  params: []
- id: pv_st_up
  label: Saturation Up
  kind: action
  command: "PVST UP\r"
  params: []
- id: pv_st_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN\r"
  params: []
- id: pv_st_set
  label: Saturation Set
  kind: action
  command: "PVST {value}\r"
  params:
    - name: value
      type: string
      description: 44-56 (AVR-X4000 limits 44-56)
- id: pv_st_query
  label: Saturation Query
  kind: query
  command: "PVST ?\r"
  params: []
- id: pv_hue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP\r"
  params: []
- id: pv_hue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN\r"
  params: []
- id: pv_hue_set
  label: Hue Set
  kind: action
  command: "PVHUE {value}\r"
  params:
    - name: value
      type: string
      description: 44-56 (AVR-X4000 limits 44-56)
- id: pv_hue_query
  label: Hue Query
  kind: query
  command: "PVHUE ?\r"
  params: []
- id: pv_dnr_off
  label: DNR Off
  kind: action
  command: "PVDNR OFF\r"
  params: []
- id: pv_dnr_low
  label: DNR Low
  kind: action
  command: "PVDNR LOW\r"
  params: []
- id: pv_dnr_mid
  label: DNR Mid
  kind: action
  command: "PVDNR MID\r"
  params: []
- id: pv_dnr_hi
  label: DNR Hi
  kind: action
  command: "PVDNR HI\r"
  params: []
- id: pv_dnr_query
  label: DNR Query
  kind: query
  command: "PVDNR ?\r"
  params: []
- id: pv_enh_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP\r"
  params: []
- id: pv_enh_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN\r"
  params: []
- id: pv_enh_set
  label: Enhancer Set
  kind: action
  command: "PVENH {value}\r"
  params:
    - name: value
      type: string
      description: 00-12 (AVR-X4000 limits 00-12)
- id: pv_enh_query
  label: Enhancer Query
  kind: query
  command: "PVENH ?\r"
  params: []

- id: zone2_source_phono
  label: Zone2 Source Phono
  kind: action
  command: "Z2PHONO\r"
  params: []
- id: zone2_source_cd
  label: Zone2 Source CD
  kind: action
  command: "Z2CD\r"
  params: []
- id: zone2_source_tuner
  label: Zone2 Source Tuner
  kind: action
  command: "Z2TUNER\r"
  params: []
- id: zone2_source_dvd
  label: Zone2 Source DVD
  kind: action
  command: "Z2DVD\r"
  params: []
- id: zone2_source_bd
  label: Zone2 Source Blu-ray
  kind: action
  command: "Z2BD\r"
  params: []
- id: zone2_source_tv
  label: Zone2 Source TV
  kind: action
  command: "Z2TV\r"
  params: []
- id: zone2_source_satcbl
  label: Zone2 Source SAT/CBL
  kind: action
  command: "Z2SAT/CBL\r"
  params: []
- id: zone2_source_mplay
  label: Zone2 Source Media Player
  kind: action
  command: "Z2MPLAY\r"
  params: []
- id: zone2_source_game
  label: Zone2 Source Game
  kind: action
  command: "Z2GAME\r"
  params: []
- id: zone2_source_net
  label: Zone2 Source Network
  kind: action
  command: "Z2NET\r"
  params: []
- id: zone2_source_usb_ipod
  label: Zone2 Source USB/iPod
  kind: action
  command: "Z2USB/IPOD\r"
  params: []
- id: zone2_source_usb
  label: Zone2 Source USB
  kind: action
  command: "Z2USB\r"
  params: []
- id: zone2_source_ipd
  label: Zone2 Source iPod Direct
  kind: action
  command: "Z2IPD\r"
  params: []
- id: zone2_source_irp
  label: Zone2 Source Internet Radio
  kind: action
  command: "Z2IRP\r"
  params: []
- id: zone2_source_fvp
  label: Zone2 Source Favorites
  kind: action
  command: "Z2FVP\r"
  params: []
- id: zone2_source_cancel
  label: Zone2 Source Cancel
  kind: action
  command: "Z2SOURCE\r"
  params: []
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "Z2UP\r"
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "Z2DOWN\r"
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  command: "Z2{level}\r"
  params:
    - name: level
      type: string
      description: 00-98; 80=0dB
- id: zone2_on
  label: Zone2 On
  kind: action
  command: "Z2ON\r"
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  command: "Z2OFF\r"
  params: []
- id: zone2_query
  label: Zone2 Query
  kind: query
  command: "Z2?\r"
  params: []
- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  command: "Z2MUON\r"
  params: []
- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  command: "Z2MUOFF\r"
  params: []
- id: zone2_mute_query
  label: Zone2 Mute Query
  kind: query
  command: "Z2MU?\r"
  params: []
- id: zone2_channel_st
  label: Zone2 Channel Stereo
  kind: action
  command: "Z2CSST\r"
  params: []
- id: zone2_channel_mono
  label: Zone2 Channel Mono
  kind: action
  command: "Z2CSMONO\r"
  params: []
- id: zone2_channel_query
  label: Zone2 Channel Query
  kind: query
  command: "Z2CS?\r"
  params: []
- id: zone2_cv_fl_up
  label: Zone2 Channel Volume FL Up
  kind: action
  command: "Z2CVFL UP\r"
  params: []
- id: zone2_cv_fl_down
  label: Zone2 Channel Volume FL Down
  kind: action
  command: "Z2CVFL DOWN\r"
  params: []
- id: zone2_cv_fl_set
  label: Zone2 Channel Volume FL Set
  kind: action
  command: "Z2CVFL {level}\r"
  params:
    - name: level
      type: string
      description: 38-62; 50=0dB
- id: zone2_cv_fr_up
  label: Zone2 Channel Volume FR Up
  kind: action
  command: "Z2CVFR UP\r"
  params: []
- id: zone2_cv_fr_down
  label: Zone2 Channel Volume FR Down
  kind: action
  command: "Z2CVFR DOWN\r"
  params: []
- id: zone2_cv_fr_set
  label: Zone2 Channel Volume FR Set
  kind: action
  command: "Z2CVFR {level}\r"
  params:
    - name: level
      type: string
      description: 38-62; 50=0dB
- id: zone2_cv_query
  label: Zone2 Channel Volume Query
  kind: query
  command: "Z2CV?\r"
  params: []
- id: zone2_hpf_on
  label: Zone2 HPF On
  kind: action
  command: "Z2HPFON\r"
  params: []
- id: zone2_hpf_off
  label: Zone2 HPF Off
  kind: action
  command: "Z2HPFOFF\r"
  params: []
- id: zone2_hpf_query
  label: Zone2 HPF Query
  kind: query
  command: "Z2HPF?\r"
  params: []
- id: zone2_bas_up
  label: Zone2 Bass Up
  kind: action
  command: "Z2PSBAS UP\r"
  params: []
- id: zone2_bas_down
  label: Zone2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN\r"
  params: []
- id: zone2_bas_set
  label: Zone2 Bass Set
  kind: action
  command: "Z2PSBAS {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 40-60)
- id: zone2_bas_query
  label: Zone2 Bass Query
  kind: query
  command: "Z2PSBAS ?\r"
  params: []
- id: zone2_tre_up
  label: Zone2 Treble Up
  kind: action
  command: "Z2PSTRE UP\r"
  params: []
- id: zone2_tre_down
  label: Zone2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN\r"
  params: []
- id: zone2_tre_set
  label: Zone2 Treble Set
  kind: action
  command: "Z2PSTRE {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 40-60)
- id: zone2_tre_query
  label: Zone2 Treble Query
  kind: query
  command: "Z2PSTRE ?\r"
  params: []
- id: zone2_sleep_off
  label: Zone2 Sleep Off
  kind: action
  command: "Z2SLPOFF\r"
  params: []
- id: zone2_sleep_set
  label: Zone2 Sleep Set
  kind: action
  command: "Z2SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: 001-120
- id: zone2_sleep_query
  label: Zone2 Sleep Query
  kind: query
  command: "Z2SLP?\r"
  params: []
- id: zone2_favorite1
  label: Zone2 Favorite 1
  kind: action
  command: "Z2FAVORITE1\r"
  params: []
- id: zone2_favorite2
  label: Zone2 Favorite 2
  kind: action
  command: "Z2FAVORITE2\r"
  params: []
- id: zone2_favorite3
  label: Zone2 Favorite 3
  kind: action
  command: "Z2FAVORITE3\r"
  params: []
- id: zone2_favorite4
  label: Zone2 Favorite 4
  kind: action
  command: "Z2FAVORITE4\r"
  params: []
- id: zone2_favorite1_memory
  label: Zone2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY\r"
  params: []
- id: zone2_favorite2_memory
  label: Zone2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY\r"
  params: []
- id: zone2_favorite3_memory
  label: Zone2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY\r"
  params: []
- id: zone2_favorite4_memory
  label: Zone2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY\r"
  params: []
- id: zone2_quick1
  label: Zone2 Quick Select 1
  kind: action
  command: "Z2QUICK1\r"
  params: []
- id: zone2_quick2
  label: Zone2 Quick Select 2
  kind: action
  command: "Z2QUICK2\r"
  params: []
- id: zone2_quick3
  label: Zone2 Quick Select 3
  kind: action
  command: "Z2QUICK3\r"
  params: []
- id: zone2_quick4
  label: Zone2 Quick Select 4
  kind: action
  command: "Z2QUICK4\r"
  params: []
- id: zone2_quick5
  label: Zone2 Quick Select 5
  kind: action
  command: "Z2QUICK5\r"
  params: []
- id: zone2_quick1_memory
  label: Zone2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY\r"
  params: []
- id: zone2_quick2_memory
  label: Zone2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY\r"
  params: []
- id: zone2_quick3_memory
  label: Zone2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY\r"
  params: []
- id: zone2_quick4_memory
  label: Zone2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY\r"
  params: []
- id: zone2_quick5_memory
  label: Zone2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY\r"
  params: []
- id: zone2_quick_query
  label: Zone2 Quick Select Query
  kind: query
  command: "Z2QUICK ?\r"
  params: []

- id: zone3_source_phono
  label: Zone3 Source Phono
  kind: action
  command: "Z3PHONO\r"
  params: []
- id: zone3_source_cd
  label: Zone3 Source CD
  kind: action
  command: "Z3CD\r"
  params: []
- id: zone3_source_tuner
  label: Zone3 Source Tuner
  kind: action
  command: "Z3TUNER\r"
  params: []
- id: zone3_source_dvd
  label: Zone3 Source DVD
  kind: action
  command: "Z3DVD\r"
  params: []
- id: zone3_source_bd
  label: Zone3 Source Blu-ray
  kind: action
  command: "Z3BD\r"
  params: []
- id: zone3_source_tv
  label: Zone3 Source TV
  kind: action
  command: "Z3TV\r"
  params: []
- id: zone3_source_satcbl
  label: Zone3 Source SAT/CBL
  kind: action
  command: "Z3SAT/CBL\r"
  params: []
- id: zone3_source_mplay
  label: Zone3 Source Media Player
  kind: action
  command: "Z3MPLAY\r"
  params: []
- id: zone3_source_game
  label: Zone3 Source Game
  kind: action
  command: "Z3GAME\r"
  params: []
- id: zone3_source_net
  label: Zone3 Source Network
  kind: action
  command: "Z3NET\r"
  params: []
- id: zone3_source_usb_ipod
  label: Zone3 Source USB/iPod
  kind: action
  command: "Z3USB/IPOD\r"
  params: []
- id: zone3_source_usb
  label: Zone3 Source USB
  kind: action
  command: "Z3USB\r"
  params: []
- id: zone3_source_ipd
  label: Zone3 Source iPod Direct
  kind: action
  command: "Z3IPD\r"
  params: []
- id: zone3_source_irp
  label: Zone3 Source Internet Radio
  kind: action
  command: "Z3IRP\r"
  params: []
- id: zone3_source_fvp
  label: Zone3 Source Favorites
  kind: action
  command: "Z3FVP\r"
  params: []
- id: zone3_source_cancel
  label: Zone3 Source Cancel
  kind: action
  command: "Z3SOURCE\r"
  params: []
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "Z3UP\r"
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "Z3DOWN\r"
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Set
  kind: action
  command: "Z3{level}\r"
  params:
    - name: level
      type: string
      description: 00-98; 80=0dB
- id: zone3_on
  label: Zone3 On
  kind: action
  command: "Z3ON\r"
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  command: "Z3OFF\r"
  params: []
- id: zone3_query
  label: Zone3 Query
  kind: query
  command: "Z3?\r"
  params: []
- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  command: "Z3MUON\r"
  params: []
- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  command: "Z3MUOFF\r"
  params: []
- id: zone3_mute_query
  label: Zone3 Mute Query
  kind: query
  command: "Z3MU?\r"
  params: []
- id: zone3_channel_st
  label: Zone3 Channel Stereo
  kind: action
  command: "Z3CSST\r"
  params: []
- id: zone3_channel_mono
  label: Zone3 Channel Mono
  kind: action
  command: "Z3CSMONO\r"
  params: []
- id: zone3_channel_query
  label: Zone3 Channel Query
  kind: query
  command: "Z3CS?\r"
  params: []
- id: zone3_cv_fl_up
  label: Zone3 Channel Volume FL Up
  kind: action
  command: "Z3CVFL UP\r"
  params: []
- id: zone3_cv_fl_down
  label: Zone3 Channel Volume FL Down
  kind: action
  command: "Z3CVFL DOWN\r"
  params: []
- id: zone3_cv_fl_set
  label: Zone3 Channel Volume FL Set
  kind: action
  command: "Z3CVFL {level}\r"
  params:
    - name: level
      type: string
      description: 38-62; 50=0dB
- id: zone3_cv_fr_up
  label: Zone3 Channel Volume FR Up
  kind: action
  command: "Z3CVFR UP\r"
  params: []
- id: zone3_cv_fr_down
  label: Zone3 Channel Volume FR Down
  kind: action
  command: "Z3CVFR DOWN\r"
  params: []
- id: zone3_cv_fr_set
  label: Zone3 Channel Volume FR Set
  kind: action
  command: "Z3CVFR {level}\r"
  params:
    - name: level
      type: string
      description: 38-62; 50=0dB
- id: zone3_cv_query
  label: Zone3 Channel Volume Query
  kind: query
  command: "Z3CV?\r"
  params: []
- id: zone3_hpf_on
  label: Zone3 HPF On
  kind: action
  command: "Z3HPFON\r"
  params: []
- id: zone3_hpf_off
  label: Zone3 HPF Off
  kind: action
  command: "Z3HPFOFF\r"
  params: []
- id: zone3_hpf_query
  label: Zone3 HPF Query
  kind: query
  command: "Z3HPF?\r"
  params: []
- id: zone3_bas_up
  label: Zone3 Bass Up
  kind: action
  command: "Z3PSBAS UP\r"
  params: []
- id: zone3_bas_down
  label: Zone3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN\r"
  params: []
- id: zone3_bas_set
  label: Zone3 Bass Set
  kind: action
  command: "Z3PSBAS {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 40-60)
- id: zone3_bas_query
  label: Zone3 Bass Query
  kind: query
  command: "Z3PSBAS ?\r"
  params: []
- id: zone3_tre_up
  label: Zone3 Treble Up
  kind: action
  command: "Z3PSTRE UP\r"
  params: []
- id: zone3_tre_down
  label: Zone3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN\r"
  params: []
- id: zone3_tre_set
  label: Zone3 Treble Set
  kind: action
  command: "Z3PSTRE {value}\r"
  params:
    - name: value
      type: string
      description: 00-99 (AVR-X4000 limits 40-60)
- id: zone3_tre_query
  label: Zone3 Treble Query
  kind: query
  command: "Z3PSTRE ?\r"
  params: []
- id: zone3_sleep_off
  label: Zone3 Sleep Off
  kind: action
  command: "Z3SLPOFF\r"
  params: []
- id: zone3_sleep_set
  label: Zone3 Sleep Set
  kind: action
  command: "Z3SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: 001-120
- id: zone3_sleep_query
  label: Zone3 Sleep Query
  kind: query
  command: "Z3SLP?\r"
  params: []
- id: zone3_favorite1
  label: Zone3 Favorite 1
  kind: action
  command: "Z3FAVORITE1\r"
  params: []
- id: zone3_favorite2
  label: Zone3 Favorite 2
  kind: action
  command: "Z3FAVORITE2\r"
  params: []
- id: zone3_favorite3
  label: Zone3 Favorite 3
  kind: action
  command: "Z3FAVORITE3\r"
  params: []
- id: zone3_favorite4
  label: Zone3 Favorite 4
  kind: action
  command: "Z3FAVORITE4\r"
  params: []
- id: zone3_favorite1_memory
  label: Zone3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY\r"
  params: []
- id: zone3_favorite2_memory
  label: Zone3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY\r"
  params: []
- id: zone3_favorite3_memory
  label: Zone3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY\r"
  params: []
- id: zone3_favorite4_memory
  label: Zone3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY\r"
  params: []
- id: zone3_quick1
  label: Zone3 Quick Select 1
  kind: action
  command: "Z3QUICK1\r"
  params: []
- id: zone3_quick2
  label: Zone3 Quick Select 2
  kind: action
  command: "Z3QUICK2\r"
  params: []
- id: zone3_quick3
  label: Zone3 Quick Select 3
  kind: action
  command: "Z3QUICK3\r"
  params: []
- id: zone3_quick4
  label: Zone3 Quick Select 4
  kind: action
  command: "Z3QUICK4\r"
  params: []
- id: zone3_quick5
  label: Zone3 Quick Select 5
  kind: action
  command: "Z3QUICK5\r"
  params: []
- id: zone3_quick1_memory
  label: Zone3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY\r"
  params: []
- id: zone3_quick2_memory
  label: Zone3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY\r"
  params: []
- id: zone3_quick3_memory
  label: Zone3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY\r"
  params: []
- id: zone3_quick4_memory
  label: Zone3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY\r"
  params: []
- id: zone3_quick5_memory
  label: Zone3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY\r"
  params: []
- id: zone3_quick_query
  label: Zone3 Quick Select Query
  kind: query
  command: "Z3QUICK ?\r"
  params: []

- id: tuner_freq_up
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP\r"
  params: []
- id: tuner_freq_down
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN\r"
  params: []
- id: tuner_freq_set
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{freq6}\r"
  params:
    - name: freq6
      type: string
      description: 6-digit frequency; <050000 is FM (e.g. 008750 = 87.50 MHz)
- id: tuner_freq_query
  label: Tuner Frequency Query
  kind: query
  command: "TFAN?\r"
  params: []
- id: tuner_preset_up
  label: Tuner Preset Channel Up
  kind: action
  command: "TPANUP\r"
  params: []
- id: tuner_preset_down
  label: Tuner Preset Channel Down
  kind: action
  command: "TPANDOWN\r"
  params: []
- id: tuner_preset_set
  label: Tuner Preset Channel Set
  kind: action
  command: "TPAN{preset}\r"
  params:
    - name: preset
      type: string
      description: 01-56
- id: tuner_preset_query
  label: Tuner Preset Channel Query
  kind: query
  command: "TPAN?\r"
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory (Current)
  kind: action
  command: "TPANMEM\r"
  params: []
- id: tuner_preset_memory_set
  label: Tuner Preset Memory at Slot
  kind: action
  command: "TPANMEM{preset}\r"
  params:
    - name: preset
      type: string
      description: 01-56
- id: tuner_mode_query
  label: Tuner Mode Query
  kind: query
  command: "TMAN?\r"
  params: []
- id: tuner_mode_auto
  label: Tuner Mode Auto
  kind: action
  command: "TMANAUTO\r"
  params: []
- id: tuner_mode_manual
  label: Tuner Mode Manual
  kind: action
  command: "TMANMANUAL\r"
  params: []

- id: hdradio_freq_up
  label: HD Radio Channel Up
  kind: action
  command: "TFHDUP\r"
  params: []
- id: hdradio_freq_down
  label: HD Radio Channel Down
  kind: action
  command: "TFHDDOWN\r"
  params: []
- id: hdradio_freq_set
  label: HD Radio Frequency Set
  kind: action
  command: "TFHD{freq6}\r"
  params:
    - name: freq6
      type: string
      description: 6-digit frequency; >050000 is AM (e.g. 105000 = 1050.00 kHz), <050000 is FM
- id: hdradio_mc_set
  label: HD Radio Multicast Channel Set
  kind: action
  command: "TFHDMC{multicast}\r"
  params:
    - name: multicast
      type: string
      description: 1-8
- id: hdradio_freq_mc_set
  label: HD Radio Frequency+Multicast Set
  kind: action
  command: "TFHD{freq6}MC{multicast}\r"
  params:
    - name: freq6
      type: string
      description: 6-digit frequency
    - name: multicast
      type: string
      description: 1-8
- id: hdradio_freq_query
  label: HD Radio Frequency Query
  kind: query
  command: "TFHD?\r"
  params: []
- id: hdradio_preset_up
  label: HD Radio Preset Up
  kind: action
  command: "TPHDUP\r"
  params: []
- id: hdradio_preset_down
  label: HD Radio Preset Down
  kind: action
  command: "TPHDDOWN\r"
  params: []
- id: hdradio_preset_set
  label: HD Radio Preset Set
  kind: action
  command: "TPHD{preset}\r"
  params:
    - name: preset
      type: string
      description: 01-56
- id: hdradio_preset_query
  label: HD Radio Preset Query
  kind: query
  command: "TPHD?\r"
  params: []
- id: hdradio_preset_memory
  label: HD Radio Preset Memory (Current)
  kind: action
  command: "TPHDMEM\r"
  params: []
- id: hdradio_preset_memory_set
  label: HD Radio Preset Memory at Slot
  kind: action
  command: "TPHDMEM{preset}\r"
  params:
    - name: preset
      type: string
      description: 01-56
- id: hdradio_band_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM\r"
  params: []
- id: hdradio_band_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM\r"
  params: []
- id: hdradio_mode_query
  label: HD Radio Mode Query
  kind: query
  command: "TMHD?\r"
  params: []
- id: hdradio_autohd
  label: HD Radio Tuning Auto-HD
  kind: action
  command: "TMHDAUTOHD\r"
  params: []
- id: hdradio_auto
  label: HD Radio Tuning Auto
  kind: action
  command: "TMHDAUTO\r"
  params: []
- id: hdradio_manual
  label: HD Radio Tuning Manual
  kind: action
  command: "TMHDMANUAL\r"
  params: []
- id: hdradio_analog_auto
  label: HD Radio Tuning Analog Auto
  kind: action
  command: "TMHDANAAUTO\r"
  params: []
- id: hdradio_analog_manual
  label: HD Radio Tuning Analog Manual
  kind: action
  command: "TMHDANAMANU\r"
  params: []
- id: hdradio_status_query
  label: HD Radio Status Query
  kind: query
  command: "HD?\r"
  params: []

- id: ns_cursor_up
  label: Network Audio Cursor Up
  kind: action
  command: "NS90\r"
  params: []
- id: ns_cursor_down
  label: Network Audio Cursor Down
  kind: action
  command: "NS91\r"
  params: []
- id: ns_cursor_left
  label: Network Audio Cursor Left
  kind: action
  command: "NS92\r"
  params: []
- id: ns_cursor_right
  label: Network Audio Cursor Right
  kind: action
  command: "NS93\r"
  params: []
- id: ns_enter
  label: Network Audio Enter/Play-Pause
  kind: action
  command: "NS94\r"
  params: []
- id: ns_play
  label: Network Audio Play
  kind: action
  command: "NS9A\r"
  params: []
- id: ns_play_pause
  label: Network Audio Play/Pause (iPod Direct)
  kind: action
  command: "NS9B\r"
  params: []
- id: ns_pause
  label: Network Audio Pause
  kind: action
  command: "NS9C\r"
  params: []
- id: ns_play_pause2
  label: Network Audio Play/Pause 2
  kind: action
  command: "NS9D\r"
  params: []
- id: ns_stop
  label: Network Audio Stop
  kind: action
  command: "NS9E\r"
  params: []
- id: ns_skip_plus
  label: Network Audio Skip Plus
  kind: action
  command: "NS9F\r"
  params: []
- id: ns_skip_minus
  label: Network Audio Skip Minus
  kind: action
  command: "NS9G\r"
  params: []
- id: ns_search_plus
  label: Network Audio Manual Search Plus
  kind: action
  command: "NS9H\r"
  params: []
- id: ns_search_minus
  label: Network Audio Manual Search Minus
  kind: action
  command: "NS9I\r"
  params: []
- id: ns_repeat_one
  label: Network Audio Repeat One
  kind: action
  command: "NS9J\r"
  params: []
- id: ns_repeat_all
  label: Network Audio Repeat All
  kind: action
  command: "NS9K\r"
  params: []
- id: ns_repeat_off
  label: Network Audio Repeat Off
  kind: action
  command: "NS9M\r"
  params: []
- id: ns_random_on
  label: Network Audio Random On/Repeat All
  kind: action
  command: "NS9W\r"
  params: []
- id: ns_shuffle
  label: Network Audio Shuffle Songs
  kind: action
  command: "NS9X\r"
  params: []
- id: ns_random_off
  label: Network Audio Random Off
  kind: action
  command: "NS9Y\r"
  params: []
- id: ns_shuffle_off
  label: Network Audio Shuffle Off
  kind: action
  command: "NS9Z\r"
  params: []
- id: ns_repeat_toggle
  label: Network Audio Repeat Toggle
  kind: action
  command: "NSRPT\r"
  params: []
- id: ns_random_toggle
  label: Network Audio Random Toggle
  kind: action
  command: "NSRND\r"
  params: []
- id: ns_info_ascii
  label: Network Audio Onscreen Info (ASCII)
  kind: query
  command: "NSA\r"
  params: []
- id: ns_info_utf8
  label: Network Audio Onscreen Info (UTF-8)
  kind: query
  command: "NSE\r"
  params: []
- id: ns_direct_text_search
  label: Network Audio Direct Text Search
  kind: action
  command: "NSD{char}\r"
  params:
    - name: char
      type: string
      description: 0-9, A-Z
- id: ns_preset_call
  label: Network Audio Preset Call
  kind: action
  command: "NSB{preset}\r"
  params:
    - name: preset
      type: string
      description: 00-55 (00=CH01, 55=CH56)
- id: ns_preset_memory
  label: Network Audio Preset Memory
  kind: action
  command: "NSC{preset}\r"
  params:
    - name: preset
      type: string
      description: 00-55 (00=CH01, 55=CH56)
- id: ns_preset_query
  label: Network Audio Preset Channel Status
  kind: query
  command: "NSH\r"
  params: []

- id: mn_cursor_up
  label: Menu Cursor Up
  kind: action
  command: "MNCUP\r"
  params: []
- id: mn_cursor_down
  label: Menu Cursor Down
  kind: action
  command: "MNCDN\r"
  params: []
- id: mn_cursor_left
  label: Menu Cursor Left
  kind: action
  command: "MNCLT\r"
  params: []
- id: mn_cursor_right
  label: Menu Cursor Right
  kind: action
  command: "MNCRT\r"
  params: []
- id: mn_enter
  label: Menu Enter
  kind: action
  command: "MNENT\r"
  params: []
- id: mn_return
  label: Menu Return
  kind: action
  command: "MNRTN\r"
  params: []
- id: mn_option
  label: Menu Option
  kind: action
  command: "MNOPT\r"
  params: []
- id: mn_info
  label: Menu Info
  kind: action
  command: "MNINF\r"
  params: []
- id: mn_menu_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON\r"
  params: []
- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF\r"
  params: []
- id: mn_menu_query
  label: Setup Menu Query
  kind: query
  command: "MNMEN?\r"
  params: []
- id: mn_instaview_on
  label: InstaPrevue On
  kind: action
  command: "MNPRV ON\r"
  params: []
- id: mn_instaview_off
  label: InstaPrevue Off
  kind: action
  command: "MNPRV OFF\r"
  params: []
- id: mn_instaview_query
  label: InstaPrevue Query
  kind: query
  command: "MNPRV?\r"
  params: []
- id: mn_all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON\r"
  params: []
- id: mn_all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF\r"
  params: []

- id: trigger1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON\r"
  params: []
- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF\r"
  params: []
- id: trigger2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON\r"
  params: []
- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF\r"
  params: []
- id: trigger_query
  label: Trigger Query
  kind: query
  command: "TR?\r"
  params: []

- id: sy_remote_lock_on
  label: Remote Control Lock On
  kind: action
  command: "SYREMOTE LOCK ON\r"
  params: []
- id: sy_remote_lock_off
  label: Remote Control Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF\r"
  params: []
- id: sy_panel_lock_on
  label: Panel Button Lock On (excl. Master Vol)
  kind: action
  command: "SYPANEL LOCK ON\r"
  params: []
- id: sy_panel_v_lock_on
  label: Panel+Master Vol Lock On
  kind: action
  command: "SYPANEL+V LOCK ON\r"
  params: []
- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF\r"
  params: []

- id: ug_idn
  label: Upgrade ID Display
  kind: action
  command: "UGIDN\r"
  params: []

- id: rc_ksk
  label: RC Code Kaseikyo Format
  kind: action
  command: "RCKSK{data7}\r"
  params:
    - name: data7
      type: string
      description: 7 ASCII chars; refer to IR remote code list
- id: rc_shp
  label: RC Code Sharp Format
  kind: action
  command: "RCSHP{data7}\r"
  params:
    - name: data7
      type: string
      description: 7 ASCII chars; refer to IR remote code list
```

## Feedbacks
```yaml
# All unsolicited EVENT / RESPONSE messages documented in source.
# - id: pw_state
#   command_pattern: "PW(ON|STANDBY)"
# - id: mv_state
#   command_pattern: "MV\\d{2,3}"
# - id: cv_state
#   command_pattern: "CV(FL|FR|C|SW|SW2|SL|SR|SBL|SBR|SB|FHL|FHR|FWL|FWR) \\d{2}"
# - id: mu_state
#   command_pattern: "MU(ON|OFF)"
# - id: si_state
#   command_pattern: "SI(PHONO|CD|HDRADIO|TUNER|DVD|BD|TV|SAT/CBL|MPLAY|GAME|AUX1|AUX2|NET|PANDORA|SIRIUSXM|SPOTIFY|FLICKR|FAVORITES|IRADIO|SERVER|USB/IPOD|USB DIRECT|IPOD DIRECT|USB|IPD|IRP|FVP)"
# - id: zm_state
#   command_pattern: "ZM(ON|OFF|FAVORITE[1-4]|FAVORITE[1-4] MEMORY)"
# - id: sd_state
#   command_pattern: "SD(AUTO|HDMI|DIGITAL|ANALOG|ARC|NO)"
# - id: dc_state
#   command_pattern: "DC(AUTO|PCM|DTS)"
# - id: sv_state
#   command_pattern: "SV(ON|OFF|DVD|BD|TV|SAT/CBL|MPLAY|GAME|AUX1|AUX2|CD)"
# - id: slp_state
#   command_pattern: "SLP(OFF|\\d{3})"
# - id: ms_state
#   command_pattern: "MS(DIRECT|PURE DIRECT|STEREO|MULTI CH IN|...|ALL ZONE STEREO|QUICK[0-5])"
# - id: vs_state
#   command_pattern: "VS(ASPNRM|ASPFUL|SC48P|...|VPMMOVI)"
# - id: ps_state
#   command_pattern: "PS(TONE CTRL (ON|OFF)|CINEMA EQ\\.(ON|OFF)|MODE:(MUSIC|CINEMA|GAME|HEIGHT)|LOM (ON|OFF)|PHG (LOW|MID|HI)|MULTEQ:(AUDYSSEY|BYP.LR|FLAT|MANUAL|OFF)|DYNEQ(ON|OFF)|REFLEV (0|5|10|15)|DYNVOL (HEV|MED|LIT|OFF)|LFC (ON|OFF)|CNTAMT \\d{2}|DSX (ONHW|ONH|ONW|OFF)|STW \\d{2}|STH \\d{2}|BAS \\d{2}|TRE \\d{2}|DRC (AUTO|LOW|MID|HI|OFF)|LFE \\d{2}|EFF \\d{2}|DEL \\d{3}|PAN (ON|OFF)|DIM \\d{2}|CEN \\d{2}|CEG \\d{2}|SWR (ON|OFF)|RSZ (S|MS|M|ML|L)|DELAY \\d{3}|RSTR (OFF|LOW|MED|HI)|FRONT (SPA|SPB|A\\+B))"
# - id: pv_state
#   command_pattern: "PV(OFF|STD|MOV|VVD|STM|CTM|CN \\d{2}|BR \\d{2}|ST \\d{2}|HUE \\d{2}|DNR (OFF|LOW|MID|HI)|ENH \\d{2})"
# - id: z2_state
#   command_pattern: "Z2(PHONO|CD|...|QUICK[0-5]|FAVORITE[1-4]|FAVORITE[1-4] MEMORY|\\d{2,3}|ON|OFF)"
# - id: z2mu_state
#   command_pattern: "Z2MU(ON|OFF)"
# - id: z2cs_state
#   command_pattern: "Z2CS(ST|MONO)"
# - id: z2cv_state
#   command_pattern: "Z2CV(FL|FR) \\d{2}"
# - id: z2hpf_state
#   command_pattern: "Z2HPF(ON|OFF)"
# - id: z2ps_state
#   command_pattern: "Z2PS(BAS|TRE) \\d{2}"
# - id: z3_state
#   command_pattern: "Z3(PHONO|CD|...|QUICK[0-5]|FAVORITE[1-4]|FAVORITE[1-4] MEMORY|\\d{2,3}|ON|OFF)"
# - id: z3mu_state
#   command_pattern: "Z3MU(ON|OFF)"
# - id: z3cs_state
#   command_pattern: "Z3CS(ST|MONO)"
# - id: z3cv_state
#   command_pattern: "Z3CV(FL|FR) \\d{2}"
# - id: z3hpf_state
#   command_pattern: "Z3HPF(ON|OFF)"
# - id: z3ps_state
#   command_pattern: "Z3PS(BAS|TRE) \\d{2}"
# - id: tuner_state
#   command_pattern: "TF(AN|HD)\\d{6}(MC\\d)?"
# - id: tuner_preset_state
#   command_pattern: "TP(AN|HD)\\d{2}"
# - id: tuner_mode_state
#   command_pattern: "TM(ANAUTO|ANMANUAL|HDAM|HDFM|HDAUTOHD|HDAUTO|HDMANUAL|HDANAAUTO|HDANAMANU)"
# - id: hd_radio_state
#   command_pattern: "HD(ST NAME \\*+|STL NAME \\*+|SIG LEV [0-6]|MLT CURRCH \\d|MLT CAST CH \\d|PTY \\*+|ARTIST \\*+|TITLE \\*+|ALBUM \\*+|GENRE \\*+|MODE (DIGITAL|ANALOG))"
# - id: network_audio_info
#   command_pattern: "NS(A|E)[0-8]\\*+"
# - id: mn_menu_state
#   command_pattern: "MN(MEN ON|MEN OFF|PRV ON|PRV OFF)"
# - id: trigger_state
#   command_pattern: "TR(1|2) (ON|OFF)"
# - id: sy_lock_state
#   command_pattern: "SY(REMOTE LOCK (ON|OFF)|PANEL LOCK ON|PANEL\\+V LOCK ON|PANEL LOCK OFF)"
# - id: ug_idn_state
#   command_pattern: "UG(IDN \\*+|IDN NG)"
```

## Variables
```yaml
# Volume / level parameters with ranges defined in source. Mapped to numeric ranges
# (in their ASCII-encoded native representation). Range scaling into dB is
# documented in Notes for each.
- id: master_volume
  type: integer
  range: "00..98"
  unit: "0.5dB ASCII step (98=18dB MAX, 80=0dB, 005=-79.5dB, 00=MIN)"
- id: channel_volume
  type: integer
  range: "00,38..62"
  unit: "ASCII (62=+12dB MAX, 50=0dB, 38=-12dB MIN, 00=OFF for SW only)"
- id: zone_volume
  type: integer
  range: "00..98"
  unit: "0.5dB ASCII step"
- id: sleep_timer_minutes
  type: integer
  range: "0..120"
  unit: "minutes (000=off, 120=2hr)"
- id: lfe_level
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 00..10)"
- id: effect_level
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 01..15)"
- id: surround_delay
  type: integer
  range: "000..999"
  unit: "ms (X4000 limits 000..300)"
- id: audio_delay
  type: integer
  range: "000..999"
  unit: "ms (X4000 limits 000..200)"
- id: bass_level
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 44..56, ±6dB)"
- id: treble_level
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 44..56, ±6dB)"
- id: zone_bass_level
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 40..60, ±10dB)"
- id: zone_treble_level
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 40..60, ±10dB)"
- id: stage_width
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 40..60)"
- id: stage_height
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 40..60)"
- id: lfc_containment_amount
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 01..07)"
- id: panorama_dimension
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 00..06)"
- id: center_width
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 00..07)"
- id: center_gain
  type: integer
  range: "00..99"
  unit: "ASCII (X4000 limits 00..10, step 0.1)"
- id: reference_level_offset
  type: integer
  range: "0..15"
  unit: "dB (one of 0/5/10/15)"
- id: picture_contrast
  type: integer
  range: "44..56"
  unit: "ASCII (X4000 limits 44..56)"
- id: picture_brightness
  type: integer
  range: "00..12"
  unit: "ASCII"
- id: picture_saturation
  type: integer
  range: "44..56"
  unit: "ASCII (X4000 limits 44..56)"
- id: picture_hue
  type: integer
  range: "44..56"
  unit: "ASCII (X4000 limits 44..56)"
- id: picture_enhancer
  type: integer
  range: "00..12"
  unit: "ASCII"
- id: tuner_frequency_6digit
  type: string
  range: "<050000=FM (e.g. 008750=87.50MHz), >=050000=AM (e.g. 105000=1050.00kHz)"
- id: hd_radio_multicast_ch
  type: integer
  range: "0..8"
  description: "0=Analog, 1-8=Multicast"
- id: preset_channel
  type: integer
  range: "01..56"
  description: "Tuner / HD Radio preset slot"
- id: network_preset_slot
  type: integer
  range: "00..55"
  description: "Network audio preset slot (00=CH01)"
```

## Events
```yaml
# Unsolicited notifications. Documented EVENT messages mirror RESPONSE for any
# state-changing COMMAND. See Feedbacks section for the full pattern catalogue.
# Distinction:
#   - RESPONSE: reply to a "?" request command, within 200ms
#   - EVENT:    sent when device state changes (e.g. user presses front-panel button)
# Both reuse the same ASCII format and 2-char opcode prefix.
```

## Macros
```yaml
# - id: power_on_safe
#   steps:
#     - send "PWON\r"
#     - wait 1000  # source: "1 seconds later, please transmit the next COMMAND after PWON"
#     - send next command...
#   description: |
#     Source explicitly mandates a 1-second pause after PWON before any further
#     command is sent, to allow the device to complete its boot sequence.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on
# sequencing requirements beyond the 1-second pause after PWON. Populated only
# from explicit source text, and there is none beyond the timing note captured
# in Macros.power_on_safe.
```

## Notes
- Source document explicitly names the application model as AVR-X4000 (rev 10.3.0). SKU 300390 has been mapped elsewhere to AVR-X1700H, which does not include an RS-232C port per Denon's own product spec (only IP control). The command catalogue here is known to be largely shared across Denon/Marantz AVR generations, but the exact subset supported by 300390 has not been independently verified.
- Protocol frame: `COMMAND + PARAMETER + CR` where CR = 0x0D. ASCII range 0x20-0x7F. Max 135 bytes per message on both serial and Ethernet transports. Event/Response form reuses the COMMAND structure.
- After PWON, the source mandates a 1-second pause before sending the next command (item K in "Others").
- Master volume uses 0.5dB steps encoded as 3 ASCII chars; integer 1dB steps use 2 ASCII chars (item J).
- Channel volume returns for all channels when the surround mode changes; intact channels are reported as "50" (items B, C).
- Min master volume is encoded as "99" (item I) — counterintuitive; do not confuse with absolute mute.
- Surround mode change simultaneously changes the input source event sequence (items D, E, F, G).
- RS-232 connector is DB-9 female, DCE; cross-over / null-modem not required (pin 2=TxD out, 3=RxD in).
- Ethernet: TCP port 23 (telnet), 10/100 Mbps, RJ-45. No authentication described.
- "VIDEO SELECT" (SV) and other input-routing commands must be issued against valid current inputs; not all responses return a status (item H).
- Several command examples in source are marked as added in firmware revisions 10.3.0 vs. earlier; cited as evidence of document versioning, not per-device support.
- HD Radio commands (TFHD*, TPHD*, TMHD*, HD?) are valid only on North America models per source.
- Some inputs are conditional: HDRADIO/HD RADIO is North America only; FM TUNER is for non-North America models; NETWORK is North America + Europe only.
- Source's `response` style for "?" queries is `<CMD>?<CR>` returning `<CMD><value><CR>` within 200ms.
- The extension RC code (RCKSK/RCSHP) is documented but the IR code data is not included in this source; refer to vendor's IR code list (not supplied).

<!-- UNRESOLVED: -->
<!-- - exact command coverage for SKU 300390 (AVR-X1700H): this doc is AVR-X4000-specific; family-level coverage assumed but not verified -->
<!-- - firmware version: not stated in source -->
<!-- - authentication scheme: none documented, inferred absence -->
<!-- - any safety warnings / interlocks / fault behaviors: none documented in source -->

## Provenance

```yaml
source_domains:
  - assets.denon.com
  - snapav.com
source_urls:
  - https://assets.denon.com/documentmaster/us/dcm-390serialprotocol_ver1.40.pdf
  - https://assets.denon.com/documentmaster/us/fy21avr_denon_protocol_v02_04062020.xlsx
  - "http://assets.denon.com/DocumentMaster/us/AVRX4000_PROTOCOL(10 3 0)_V03.pdf"
  - https://assets.denon.com/documentmaster/uk/avr1713_avr1613_protocol_v860.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/Amplifiers/ProtocolsAndDrivers/AVR-X3500H_X2500H_X1500H_S940H_S740H_S640H_PROTOCOL.xlsx
retrieved_at: 2026-09-03T01:09:30.239Z
last_checked_at: 2026-09-03T22:20:39.096Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:20:39.096Z
matched_actions: 554
action_count: 554
confidence: medium
summary: "All 554 spec actions map to source COMMAND tokens and the source's EVENT/RESPONSE variants are captured in the spec's Feedbacks pattern catalogue. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document explicitly names AVR-X4000 as the application model; SKU 300390 has been mapped elsewhere to AVR-X1700H. The command catalogue is known to be shared across Denon/Marantz AVR generations, but the exact command set supported by 300390 has not been independently verified."
- "source does not document safety warnings, interlocks, or power-on"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
