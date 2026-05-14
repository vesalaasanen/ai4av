---
spec_id: admin/audio-technica-atuc-50
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATUC-50 Control Spec"
manufacturer: Audio-Technica
model_family: ATUC-50CU
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATUC-50CU
    - ATUC-IRCU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/us/atuc_50_atuc_ir_ip_control_protocol_en_web_190531.pdf
  - https://docs.audio-technica.com/eu/ATUC-50_ATUC-IR_IP_control_protocol_EN_web_220302.pdf
retrieved_at: 2026-04-29T22:52:59.393Z
last_checked_at: 2026-05-03T15:35:30.550Z
generated_at: 2026-05-03T15:35:30.550Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - gcust
  - gconn
  - gcgpi
  - gcvui
  - gvnfc
  - lvmon
  - confm
  - error
verification:
  verdict: verified
  checked_at: 2026-05-03T15:35:30.550Z
  matched_actions: 93
  action_count: 93
  confidence: high
  summary: "All 93 spec actions matched their 5-byte wire tokens in the source command table; transport port 17300 and multicast 225.000.000.100:17000 confirmed; notification-only commands appear in Events section."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Audio-Technica ATUC-50 Control Spec

## Summary
IP control protocol specification for the Audio-Technica ATUC-50CU Control Unit and ATUC-IRCU Hybrid Control Unit digital discussion systems. Control is via TCP (set/get commands) and UDP multicast (status change notifications). The protocol uses 5-byte ASCII command strings with space delimiters and CR terminators. Supports up to 5 simultaneous TCP connections.

<!-- UNRESOLVED: firmware version compatibility not fully stated beyond minimum versions -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17300
  multicast_address: "225.000.000.100"
  multicast_port: 17000
auth:
  type: none  # inferred: no IP control login procedure in source; operator/admin passwords are application-level only
```

## Traits
```yaml
- queryable  # inferred: many Get commands return CU settings and status
- levelable  # inferred: volume, gain, level controls present
- routable    # inferred: audio output source selection present
```

## Actions
```yaml
- id: factory_reset
  label: Factory Default Setting Request
  kind: action
  command: factr
  params: []

- id: set_permission
  label: Permission Setting Change Request
  kind: action
  command: sperm
  params:
    - name: device_name
      type: string
      description: "CU device name in double quotes"
    - name: admin_password_require
      type: integer
      description: "0=not required, 1=required"
    - name: admin_password
      type: string
      description: "New password (alphanumeric)"
    - name: operator1_password_require
      type: integer
      description: "0=not required, 1=required"
    - name: operator1_password
      type: string
      description: "Operator 1 password"
    - name: operator1_install
      type: integer
      description: "Install Setting permission 0=not permit, 1=permit"
    - name: operator1_logging
      type: integer
      description: "Logging permission"
    - name: operator1_preset
      type: integer
      description: "Preset permission"
    - name: operator1_conference
      type: integer
      description: "Conference permission 0=restrict, 1=not restrict"
    - name: operator1_maintenance
      type: integer
      description: "Setting & Maintenance permission"
    - name: operator1_system_info
      type: integer
      description: "System Info permission"
    - name: operator1_name
      type: string
      description: "Operator 1 name (UTF-8, 15 chars)"
    - name: operator2_enable
      type: integer
      description: "0=disable, 1=enable"

- id: get_permission
  label: Permission Setting Acquisition Request
  kind: action
  command: gperm
  params: []

- id: set_network
  label: Network Setting Change Request
  kind: action
  command: snetw
  params:
    - name: ip_config_mode
      type: integer
      description: "0=Auto, 1=Static"
    - name: ip_address
      type: string
      description: "IP address (000.000.000.000~255.255.255.255)"
    - name: subnet_mask
      type: string
      description: "Subnet mask"
    - name: gateway
      type: string
      description: "Default gateway"
    - name: upnp
      type: integer
      description: "0=not detect, 1=detect"
    - name: port_number
      type: integer
      description: "TCP/IP port number (1~65535)"
    - name: notification
      type: integer
      description: "Information transmission 0=not use, 1=use"
    - name: audio_level_notification
      type: integer
      description: "Audio level transmission 0=not use, 1=use"
    - name: multicast_address
      type: string
      description: "Multicast group address"
    - name: multicast_port
      type: integer
      description: "Multicast port number (1~65535)"

- id: get_network
  label: Network Setting Acquisition Request
  kind: action
  command: gnetw
  params: []

- id: set_dante
  label: Dante Setting Change Request
  kind: action
  command: sdant
  params:
    - name: mode
      type: integer
      description: "0=Switched, 1=Redundant Audio, 2=Split"
    - name: latency
      type: integer
      description: "1=250usec, 2=500usec, 3=1msec, 4=2msec, 5=5msec"

- id: get_dante
  label: Dante Setting Acquisition Request
  kind: action
  command: gdant
  params: []

- id: set_link_port
  label: Link Port Setting Change Request
  kind: action
  command: sport
  params:
    - name: device
      type: string
      description: "cu or du (required)"

- id: get_link_port
  label: Link Port Setting Acquisition Request
  kind: action
  command: gport
  params: []

- id: set_oled
  label: OLED Display Setting Change Request
  kind: action
  command: soled
  params:
    - name: error_notice
      type: integer
      description: "0=not display, 1=display (required)"
    - name: level
      type: integer
      description: "Level menu 0=not use, 1=use"
    - name: recording
      type: integer
      description: "Rec menu"
    - name: preset
      type: integer
      description: "Pst menu"

- id: get_oled
  label: OLED Display Setting Acquisition Request
  kind: action
  command: goled
  params: []

- id: set_ir_band
  label: IR Band Setting Change Request
  kind: action
  command: sband
  params:
    - name: number_of_irdu
      type: integer
      description: "0~200 IRDUs to detect at boot"
    - name: limit_nom
      type: integer
      description: "0=not limit, 1=limit"

- id: get_ir_band
  label: IR Band Setting Acquisition Request
  kind: action
  command: gband
  params: []

- id: set_header_dot_color
  label: Header Dot Color Setting Change Request
  kind: action
  command: shcol
  params:
    - name: color
      type: string
      description: "RRGGBB hex (000000 to FFFFFF, required)"

- id: get_header_dot_color
  label: Header Dot Color Setting Acquisition Request
  kind: action
  command: ghcol
  params: []

- id: get_firmware_version
  label: Firmware Version Acquisition Request
  kind: action
  command: gvers
  params: []

- id: get_cu_status
  label: CU Status Acquisition Request
  kind: action
  command: gstat
  params: []

- id: set_mic_line_input
  label: "Mic/Line Input Setting Change Request"
  kind: action
  command: sminp
  params:
    - name: input_type
      type: integer
      description: "0=Mic, 1=Line+4dBu, 2=Line 0dBV, 3=Dante"

- id: get_mic_line_input
  label: "Mic/Line Input Setting Acquisition Request"
  kind: action
  command: gminp
  params: []

- id: set_aux_input
  label: Aux Input Setting Change Request
  kind: action
  command: sxinp
  params:
    - name: level
      type: integer
      description: "0~511"
    - name: nominal_level
      type: integer
      description: "0=0dBV, 1=-10dBV, 2=-20dBV"

- id: get_aux_input
  label: Aux Input Setting Acquisition Request
  kind: action
  command: gxinp
  params: []

- id: set_interp_input
  label: Interpretation Input Setting Change Request
  kind: action
  command: siinp
  params:
    - name: level
      type: integer
      description: "0~511"

- id: get_interp_input
  label: Interpretation Input Setting Acquisition Request
  kind: action
  command: giinp
  params: []

- id: set_fbs_common
  label: FBS Common Setting Change Request
  kind: action
  command: scfbs
  params:
    - name: detection
      type: integer
      description: "0=Low, 1=Mid, 2=High"
    - name: response
      type: integer
      description: "0=Slow, 1=Fast"

- id: get_fbs_common
  label: FBS Common Setting Acquisition Request
  kind: action
  command: gcfbs
  params: []

- id: set_fbs
  label: FBS Setting Change Request
  kind: action
  command: safbs
  params:
    - name: group
      type: integer
      description: "0~3 (required)"
    - name: enable
      type: integer
      description: "0=Off, 1=On"

- id: get_fbs
  label: FBS Setting Acquisition Request
  kind: action
  command: gafbs
  params: []

- id: reset_fbs
  label: FBS Setting Reset Request
  kind: action
  command: srfbs
  params:
    - name: group
      type: integer
      description: "0~3 (required)"

- id: update_fbs_status
  label: FBS Status Update Request
  kind: action
  command: ssfbs
  params:
    - name: group
      type: integer
      description: "0~3"
    - name: band
      type: integer
      description: "1~12"
    - name: static
      type: integer
      description: "0=Off, 1=On"

- id: set_audio_output
  label: Audio Output Setting Change Request
  kind: action
  command: saout
  params:
    - name: kind
      type: integer
      description: "1~4 for Output 1~4 (required)"
    - name: output_level
      type: integer
      description: "0~511"
    - name: source_select
      type: integer
      description: "0=Floor, 1~4=Group 0~3, 5~7=Language 1~3, 8~9=Interp Return 1~2, 10~12=Mic/Line 1/2/Mix"

- id: get_audio_output
  label: Audio Output Setting Acquisition Request
  kind: action
  command: gaout
  params: []

- id: set_du_individual
  label: DU Individual Setting Change Request
  kind: action
  command: sduin
  params:
    - name: serial
      type: string
      description: "Serial number, topology number, device ID, or 'all' (required)"
    - name: delegate_name
      type: string
      description: "Name in double quotes (UTF-8, 10 chars)"
    - name: priority
      type: integer
      description: "0=Off, 1=On"
    - name: mic_on_trigger_mode
      type: integer
      description: "0=Button, 1=Voice, 2=Push to Talk"
    - name: speaker
      type: integer
      description: "0=Off, 1=On"
    - name: unit_type
      type: integer
      description: "0=ATUC-50DU, 1=ATUC-50INT, 2=ATUC-50IU, 3=ATUC-IRDU, 4=ATUC-50DUa"

- id: set_du_mic_eq
  label: DU Mic EQ Setting Change Request
  kind: action
  command: sdueq
  params:
    - name: serial
      type: string
      description: "Serial number or 'all'"

- id: set_gpio
  label: GPIO Setting Change Request
  kind: action
  command: sgpio
  params:
    - name: serial
      type: string
      description: "Serial number of IU (required)"
    - name: gpi_0
      type: integer
      description: "GPI 0 action (0=default, 1=self mute, 2~9=preset 1~8 recall, etc.)"

- id: get_gpio
  label: GPIO Setting Acquisition Request
  kind: action
  command: ggpio
  params:
    - name: serial
      type: string
      description: "Serial number of IU (required)"

- id: control_gpo
  label: GPO Control Request
  kind: action
  command: scgpo
  params:
    - name: serial
      type: string
      description: "Serial number of IU (required)"
    - name: gpo_0
      type: integer
      description: "0=OFF, 1=ON, 2=Flash, 3=Blink"

- id: get_gpio_status
  label: GPIO Status Acquisition Request
  kind: action
  command: ggpst
  params:
    - name: serial
      type: string
      description: "Serial number of IU (required)"

- id: set_vu_nfc
  label: VU NFC Setting Request
  kind: action
  command: svnfc
  params:
    - name: serial
      type: string
      description: "Serial number of DUa"
    - name: nfc_power
      type: integer
      description: "0=Power Off, 1=Power On"

- id: set_vu_setting
  label: VU Setting Change Request
  kind: action
  command: svuio
  params:
    - name: serial
      type: string
      description: "Serial number of DUa"

- id: get_vu_setting
  label: VU Setting Acquisition Request
  kind: action
  command: gvuio
  params:
    - name: serial
      type: string
      description: "Serial number of DUa"

- id: control_vu_led
  label: VU Control Request
  kind: action
  command: scvuo
  params:
    - name: serial
      type: string
      description: "Serial number of DUa"
    - name: led_0
      type: integer
      description: "0=OFF, 1=ON, 2=Flash1, 5=Blink1"

- id: get_vu_status
  label: VU Status Acquisition Request
  kind: action
  command: gvust
  params:
    - name: serial
      type: string
      description: "Serial number of DUa"

- id: set_du_common
  label: DU Common Setting Change Request
  kind: action
  command: sduco
  params:
    - name: talk_on_color
      type: string
      description: "RRGGBB hex"
    - name: queuing_color
      type: string
      description: "RRGGBB hex"
    - name: monitor_channel_lock
      type: integer
      description: "0=not lock, 1=lock"

- id: get_du_common
  label: DU Common Setting Acquisition Request
  kind: action
  command: gduco
  params: []

- id: set_voice_detection
  label: Voice Detection Threshold Setting Change Request
  kind: action
  command: svdet
  params:
    - name: threshold
      type: integer
      description: "1=(-5)~11=(5)"
    - name: auto_relative_mic2
      type: integer
      description: "0=Off, 1=On"

- id: set_speaker_level
  label: Speaker Level Setting Change Request
  kind: action
  command: sspkv
  params:
    - name: level
      type: integer
      description: "0~20 (required)"

- id: set_interp_common
  label: INT50 Common Setting Change Request
  kind: action
  command: sintc
  params:
    - name: interpretation_mode
      type: integer
      description: "0=2-language, 1=3-language"
    - name: interlock
      type: integer
      description: "0=No Interlock, 1=Interlock, 2=Combine"
    - name: language_name_1
      type: string
      description: "Language name (ASCII, 15 chars)"
    - name: easy_mode
      type: integer
      description: "0=Off"

- id: get_interp_common
  label: INT50 Common Setting Acquisition Request
  kind: action
  command: gintc
  params: []

- id: set_irdu_common
  label: IRDU Common Setting Change Request
  kind: action
  command: sirco
  params:
    - name: talk_on_color
      type: integer
      description: "1~10 palette index"
    - name: queuing_color
      type: integer
      description: "1~10 palette index"

- id: get_irdu_common
  label: IRDU Common Setting Acquisition Request
  kind: action
  command: girco
  params: []

- id: set_recording
  label: Recording Setting Change Request
  kind: action
  command: sreco
  params:
    - name: file_format
      type: integer
      description: "0=WAVE, 1=MP3"
    - name: quality
      type: integer
      description: "64/128/192/256/320 kbps"

- id: get_recording
  label: Recording Setting Acquisition Request
  kind: action
  command: greco
  params: []

- id: set_talk_off_audio
  label: Talk Off Audio Setting Change Request
  kind: action
  command: sflor
  params:
    - name: sound
      type: integer
      description: "0=Off, 1=Mic/Line 2, 2=Chime, 3=Pink Noise"
    - name: level
      type: integer
      description: "0~511"

- id: get_talk_off_audio
  label: Talk Off Audio Setting Acquisition Request
  kind: action
  command: gflor
  params: []

- id: set_floor_filter
  label: Floor Filter Setting Request
  kind: action
  command: sfltr
  params:
    - name: enabled
      type: integer
      description: "0=Off, 1=On"

- id: set_conference
  label: Conference Setting Change Request
  kind: action
  command: sconf
  params:
    - name: conference_mode
      type: integer
      description: "0=Free Talk, 1=Request Talk, 2=Full Remote"
    - name: auto_mic_off
      type: integer
      description: "0/5/10/15/20/25/30/35/40/45/50/55/60 seconds"
    - name: number_of_open_mics
      type: integer
      description: "1~10"
    - name: maximum_in_queue
      type: integer
      description: "0~150"

- id: get_conference
  label: Conference Setting Acquisition Request
  kind: action
  command: gconf
  params: []

- id: get_du_status
  label: DU Status Acquisition Request
  kind: action
  command: gdust
  params:
    - name: serial
      type: string
      description: "Serial number or omitted for all"
    - name: unit_type
      type: integer
      description: "0=ATUC-50DU, 1=ATUC-50INT, 2=ATUC-50IU, 3=ATUC-IRDU, 4=ATUC-50DUa"

- id: get_du_talk_status
  label: DU Talk Status Acquisition Request
  kind: action
  command: gtalk
  params:
    - name: serial
      type: string
      description: "Serial number or omitted for all"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: delete_du
  label: DU Individual Setting Deletion Request
  kind: action
  command: deldu
  params:
    - name: serial
      type: string
      description: "Serial number"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: identify_du
  label: DU Identify Request
  kind: action
  command: srcdu
  params:
    - name: serial
      type: string
      description: "Serial number"
    - name: start
      type: integer
      description: "0=stop blinking, 1=start blinking (required)"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: identify_cu
  label: CU Identify Request
  kind: action
  command: srccu
  params: []

- id: talk_off
  label: Talk Off Request
  kind: action
  command: takof
  params:
    - name: mode
      type: integer
      description: "0=All, 1=Selected (required)"
    - name: serial
      type: string
      description: "Serial number (when mode=1)"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: request_talk
  label: Request Talk Request
  kind: action
  command: reqon
  params:
    - name: mode
      type: integer
      description: "1=Selected (required)"
    - name: serial
      type: string
      description: "Serial number"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: cancel_request_talk
  label: Request Talk Deletion Request
  kind: action
  command: reqof
  params:
    - name: mode
      type: integer
      description: "0=All, 1=Selected (required)"
    - name: serial
      type: string
      description: "Serial number (when mode=1)"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: talk_permission
  label: Talk Permission Request
  kind: action
  command: prmit
  params:
    - name: mode
      type: integer
      description: "0=Next, 1=Selected (required)"
    - name: serial
      type: string
      description: "Serial number"
    - name: unit_type
      type: integer
      description: "Unit type"

- id: talk_cancel
  label: Talk Cancel Request
  kind: action
  command: pundo
  params: []

- id: set_sfx
  label: SFX Setting Change Request
  kind: action
  command: sseff
  params:
    - name: kind
      type: integer
      description: "1~3 (SFX 1~3, required)"
    - name: source
      type: string
      description: "Audio file name in double quotes"
    - name: name
      type: string
      description: "SFX name in double quotes (UTF-8)"

- id: get_sfx
  label: SFX Setting Acquisition Request
  kind: action
  command: gseff
  params: []

- id: get_sfx_list
  label: SFX List Acquisition Request
  kind: action
  command: gsels
  params: []

- id: play_stop_sfx
  label: SFX Play/Stop Request
  kind: action
  command: splay
  params:
    - name: kind
      type: integer
      description: "1~3 (SFX number, required when action=1)"
    - name: action
      type: integer
      description: "0=Stop, 1=Start (required)"

- id: set_sfx_level
  label: SFX Playing Level Change Request
  kind: action
  command: spllv
  params:
    - name: level
      type: integer
      description: "0~511 (required)"

- id: recording_control
  label: Recording Request
  kind: action
  command: recmd
  params:
    - name: action
      type: integer
      description: "0=Stop, 1=Pause, 2=Start (required)"

- id: get_recording_status
  label: Recording Status Acquisition Request
  kind: action
  command: recst
  params: []

- id: set_recording_level
  label: Recording Level Change Request
  kind: action
  command: reclv
  params:
    - name: level
      type: integer
      description: "0~511 (required)"

- id: set_log
  label: Log Setting Change Request
  kind: action
  command: slogg
  params:
    - name: enabled
      type: integer
      description: "0=Off, 1=On"
    - name: output_destination
      type: integer
      description: "0=Internal, 1=USB"

- id: get_log
  label: Log Setting Acquisition Request
  kind: action
  command: glogg
  params: []

- id: preset_call
  label: Preset Call Request
  kind: action
  command: callp
  params:
    - name: bank_number
      type: integer
      description: "1~8 (required)"

- id: preset_save
  label: Preset Save Request
  kind: action
  command: savep
  params:
    - name: bank_number
      type: integer
      description: "1~8 (required)"

- id: set_preset_bank_name
  label: Preset Bank Name Change Request
  kind: action
  command: snamb
  params:
    - name: bank_number
      type: integer
      description: "1~8 (required)"
    - name: bank_name
      type: string
      description: "Bank name in double quotes (UTF-8, 10 chars, required)"

- id: get_preset_bank_name
  label: Preset Bank Name Acquisition Request
  kind: action
  command: gnamb
  params: []

- id: set_boot_preset
  label: Boot Up Preset Setting Change Request
  kind: action
  command: sbtpr
  params:
    - name: bank_number
      type: integer
      description: "0=not select, 1~8=Bank 1~8"

- id: get_boot_preset
  label: Boot Up Preset Setting Acquisition Request
  kind: action
  command: gbtpr
  params: []

- id: set_preset_call_setting
  label: Preset Call Setting Change Request
  kind: action
  command: scals
  params:
    - name: mode
      type: integer
      description: "0=Topology, 1=Serial number (required)"

- id: get_preset_call_setting
  label: Preset Call Setting Acquisition Request
  kind: action
  command: gcals
  params: []

- id: set_level_meter
  label: Level Meter Setting Request
  kind: action
  command: slvmt
  params:
    - name: interval
      type: integer
      description: "100~ msec (required)"

- id: get_level_meter
  label: Level Meter Acquisition Request
  kind: action
  command: glvmt
  params:
    - name: monitor_point
      type: integer
      description: "0~31 (required)"

- id: set_date
  label: Date Setting Request
  kind: action
  command: sdate
  params:
    - name: date
      type: string
      description: "YYYYMMDDHHMMSS (required)"

- id: file_transfer
  label: File Transfer Request
  kind: action
  command: uload
  params:
    - name: kind
      type: string
      description: "p1~p8 (Preset 1~8), l1~l2 (Language file 1~2, required)"
    - name: file_offset
      type: string
      description: "Hex offset (required)"
    - name: size
      type: integer
      description: "1~1024 bytes (required)"
    - name: data
      type: binary
      description: "Transfer data (required)"

- id: file_transfer_cancel
  label: File Transfer Cancel Request
  kind: action
  command: ulcan
  params:
    - name: kind
      type: string
      description: "p1~p8 or l1~l2 (required)"

- id: export_file
  label: Export Request
  kind: action
  command: exprt
  params:
    - name: kind
      type: string
      description: "p1~p8 or l1~l2 (required)"

- id: import_file
  label: Import Request
  kind: action
  command: imprt
  params:
    - name: kind
      type: string
      description: "p1~p8 or l1~l2 (required)"

- id: get_battery_status
  label: Battery Status Acquisition Request
  kind: action
  command: gbatt
  params:
    - name: serial
      type: string
      description: "Device ID 1~200 or omitted for all IRDUs"
```

## Feedbacks
```yaml
- id: cu_status
  type: composite
  description: "LED indicators, connected DU/IU counts per port, topology, connected IRDUs, connected DUas"

- id: firmware_version
  type: string
  description: "CU firmware version (XX.XX.XX format)"

- id: du_status
  type: composite
  description: "DU individual settings, connect/talk status, version, topology, slot"

- id: du_talk_status
  type: composite
  description: "Talk/Wait/Slot status per DU"

- id: recording_status
  type: composite
  description: "Status (stop/pause/start), recording time HHMMSS, remaining time HHMMSS"

- id: level_meter
  type: composite
  description: "32 monitor point levels (0~10)"

- id: battery_status
  type: enum
  values: [enough, low, no_battery]
  description: "IRDU battery level per battery (1 and 2)"

- id: gpio_status
  type: composite
  description: "GPI 0~7 (Release/Push) and GPO 0~7 (OFF/ON/Flash/Blink)"
```

## Variables
```yaml
- id: output_level
  type: integer
  range: "0~511"
  unit: "dB (see Fader Table)"
  description: "Audio output level for outputs 1~4"

- id: input_gain
  type: integer
  range: "1~41"
  unit: "dB (-20dB~20dB)"
  description: "DU input gain"

- id: speaker_level
  type: integer
  range: "0~20"
  description: "DU common speaker level"

- id: sfx_level
  type: integer
  range: "0~511"
  unit: "dB (see Fader Table)"
  description: "SFX playing level"

- id: recording_level
  type: integer
  range: "0~511"
  unit: "dB (see Fader Table)"
  description: "Recording level"
```

## Events
```yaml
- id: cu_status_notification
  description: "UDP multicast when CU or DU connection status changes (gcust)"
  trigger: "CU/DU connection change"

- id: conference_status_notification
  description: "UDP multicast when conference settings change (MD gconf)"
  trigger: "Conference setting change"

- id: du_status_notification
  description: "UDP multicast when DU individual settings change (MD gdust)"
  trigger: "DU status change"

- id: du_talk_status_notification
  description: "UDP multicast when DU talk status changes (MD gtalk)"
  trigger: "Talk status change"

- id: connection_status_notification
  description: "UDP multicast when DU connection status changes (MD gconn)"
  trigger: "DU connect/disconnect"

- id: recording_status_notification
  description: "UDP multicast when recording status changes (MD recst)"
  trigger: "Recording status change"

- id: level_meter_notification
  description: "UDP multicast periodic level meter (MD lvmon)"
  trigger: "Periodic (configurable interval, default 100ms)"

- id: gpi_input_notification
  description: "UDP multicast GPI 0~7 input on IU (MD gcgpi)"
  trigger: "GPI input change"

- id: vu_input_notification
  description: "UDP multicast VU Button 0~4 input (MD gcvui)"
  trigger: "VU button input"

- id: vu_nfc_notification
  description: "UDP multicast NFC ID input from VU (MD gvnfc)"
  trigger: "NFC ID scan"

- id: battery_alert_notification
  description: "UDP multicast IRDU battery level alert (MD gbatt)"
  trigger: "Battery level change"

- id: error_notification
  description: "UDP multicast error report (MD error)"
  trigger: "Error occurrence"

- id: status_confirmation_request
  description: "TCP Request from CU when SOS (Auto Mode Change) function triggers (RQ confm)"
  trigger: "SOS timeout"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Commands use 5-byte ASCII strings, space (0x20) delimiters, CR (0x0D) terminator.
- Messages can be split across multiple packets using Continue Select codes: NC (no split), CS (head), CM (middle), CE (end).
- Max 5 simultaneous TCP connections; extra connections fail.
- Max message length 287 bytes (32-byte header + 255-byte command).
- UDP notifications require IP Control Setting - Notification to be enabled (non-zero) in network settings.
- Multicast address/port configurable via `snetw` command.
- Some commands support targeting by serial number, topology number, device ID, or "all".
- Unit types: 0=ATUC-50DU, 1=ATUC-50INT, 2=ATUC-50IU, 3=ATUC-IRDU, 4=ATUC-50DUa.
- Parameters can be omitted by leaving empty commas (e.g., `,,,,`).
- Handshake Select: S=ACK/NAK expected, O=One-Way (no ACK/NAK).
- Source document version: ATUC-50CU Version 3.0.0, ATUC-IRCU Version 2.0.0.
<!-- UNRESOLVED: firmware version compatibility ranges beyond stated minimums not specified -->
<!-- UNRESOLVED: no power-on/off IP control command found (power is physical) -->

## Provenance

```yaml
source_domains:
  - docs.audio-technica.com
source_urls:
  - https://docs.audio-technica.com/us/atuc_50_atuc_ir_ip_control_protocol_en_web_190531.pdf
  - https://docs.audio-technica.com/eu/ATUC-50_ATUC-IR_IP_control_protocol_EN_web_220302.pdf
retrieved_at: 2026-04-29T22:52:59.393Z
last_checked_at: 2026-05-03T15:35:30.550Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-03T15:35:30.550Z
matched_actions: 93
action_count: 93
confidence: high
summary: "All 93 spec actions matched their 5-byte wire tokens in the source command table; transport port 17300 and multicast 225.000.000.100:17000 confirmed; notification-only commands appear in Events section."
```

## Known Gaps

```yaml
- gcust
- gconn
- gcgpi
- gcvui
- gvnfc
- lvmon
- confm
- error
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
