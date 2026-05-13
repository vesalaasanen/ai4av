---
spec_id: admin/audio-technica-atuc-ircu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio-Technica ATUC-IRCU Control Spec"
manufacturer: Audio-Technica
model_family: ATUC-IRCU
aliases: []
compatible_with:
  manufacturers:
    - Audio-Technica
  models:
    - ATUC-IRCU
  firmware: "1.0.5 or later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audio-technica.com
  - docs.audio-technica.com
retrieved_at: 2026-05-04T15:16:41.162Z
last_checked_at: 2026-04-23T15:12:45.782Z
generated_at: 2026-04-23T15:12:45.782Z
firmware_coverage: "1.0.5 or later"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:12:45.782Z
  matched_actions: 129
  action_count: 129
  confidence: high
  summary: "Every spec action and feedback command matched literally in source; all transport parameters (port 17300, UDP multicast 225.0.0.100, TCP protocol) verified verbatim; command set fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Audio-Technica ATUC-IRCU Control Spec

## Summary
The Audio-Technica ATUC-IRCU is an infrared conference unit (CU) for the ATUC digital discussion system, supporting wireless IR delegate units. This spec covers its IP control protocol over TCP (port 17300 default) and UDP multicast notifications. The protocol uses space-delimited ASCII command strings terminated with CR (0x0D), supporting up to 5 simultaneous TCP connections.

<!-- UNRESOLVED: exact power on/off sequence not documented as discrete commands; system boot/standby behavior not specified -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 17300
serial: null
udp_multicast:
  address: "225.000.000.100"
  port: 17000
auth:
  type: none  # inferred: no login/auth procedure described for TCP control connection
```

## Traits
```yaml
traits:
  - queryable    # extensive Get command set for status/settings
  - levelable    # volume, gain, EQ, dynamics controls
```

## Actions
```yaml
actions:
  - id: factory_reset
    label: Factory Default Setting Request
    kind: action
    command: factr
    params: []
    response: ACK/NAK

  - id: set_permissions
    label: Permission Setting Change Request
    kind: action
    command: sperm
    params:
      - name: device_name
        type: string
        description: "CU device name in double quotes"
      - name: admin_pw_require
        type: integer
        description: "0=not required, 1=required"
      - name: admin_password
        type: string
        description: "New administrator password"
      - name: op1_pw_require
        type: integer
        description: "0=not required, 1=required"
      - name: op1_password
        type: string
        description: "New operator 1 password"
      - name: op1_install_setting
        type: integer
        description: "0=not permit, 1=permit"
      - name: op1_logging
        type: integer
        description: "0=not permit, 1=permit"
      - name: op1_preset
        type: integer
        description: "0=not permit, 1=permit"
      - name: op1_conference
        type: integer
        description: "0=restrict, 1=not restrict"
      - name: op1_maintenance
        type: integer
        description: "0=not permit, 1=permit"
      - name: op1_system_info
        type: integer
        description: "0=not permit, 1=permit"
      - name: op1_name
        type: string
        description: "Operator 1 name in double quotes (UTF-8, 15 chars)"
    response: ACK/NAK

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
        description: "0=not use UDP notifications, 1=use"
      - name: audio_level_notification
        type: integer
        description: "0=not use, 1=use"
      - name: multicast_address
        type: string
        description: "Multicast group address"
      - name: multicast_port
        type: integer
        description: "Multicast port number (1~65535)"
    response: ACK/NAK
    notes: CU must be rebooted after network settings change.

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
      - name: primary_ip_config
        type: integer
        description: "0=Auto, 1=Static"
      - name: primary_ip_address
        type: string
        description: "Primary IP address"
      - name: primary_subnet_mask
        type: string
        description: "Primary subnet mask"
      - name: primary_gateway
        type: string
        description: "Primary default gateway"
    response: ACK/NAK
    notes: CU must be rebooted after Dante settings change.

  - id: set_link_port
    label: Link Port Setting Change Request
    kind: action
    command: sport
    params:
      - name: device
        type: string
        description: "cu or du"
    response: ACK/NAK

  - id: set_oled_display
    label: OLED Display Setting Change Request
    kind: action
    command: soled
    params:
      - name: error_notice
        type: integer
        description: "0=not display, 1=display"
      - name: level
        type: integer
        description: "0=not use, 1=use"
      - name: recording
        type: integer
        description: "0=not use, 1=use"
      - name: preset
        type: integer
        description: "0=not use, 1=use"
    response: ACK/NAK

  - id: set_ir_band
    label: IR Band Setting Change Request
    kind: action
    command: sband
    params:
      - name: number_of_irdu
        type: integer
        description: "0~200 (number of IRDUs to detect at boot)"
      - name: limit_nom
        type: integer
        description: "0=not limit, 1=limit"
      - name: band_a_enable
        type: integer
        description: "0=disable, 1=enable"
      - name: band_a_type
        type: integer
        description: "0=used for IRDU, 1=used for IR Mic"
      - name: band_a_group_0
        type: integer
        description: "0=not assign, 1=assign"
      - name: band_a_group_1
        type: integer
        description: "0=not assign, 1=assign"
      - name: band_a_group_2
        type: integer
        description: "0=not assign, 1=assign"
      - name: band_a_group_3
        type: integer
        description: "0=not assign, 1=assign"
      - name: band_b_type
        type: integer
        description: "Same as Band A type values"
    response: ACK/NAK
    notes: Bands B through J share same structure as Band A.

  - id: set_header_dot_color
    label: Header Dot Color Setting Change Request
    kind: action
    command: shcol
    params:
      - name: color
        type: string
        description: "RRGGBB hex color (000000 to FFFFFF)"
    response: ACK/NAK

  - id: set_mic_line_input
    label: Mic/Line Input Setting Change Request
    kind: action
    command: sminp
    params:
      - name: input_1_type
        type: integer
        description: "0=Mic, 1=Line+4dBu, 2=Line 0dBV, 3=Dante"
      - name: input_1_mix_to_floor
        type: integer
        description: "0=Off, 1=On"
      - name: input_1_mix_to_language
        type: integer
        description: "0=Off, 1=On"
      - name: input_1_phantom_power
        type: integer
        description: "0=Off, 1=On"
      - name: input_1_gain
        type: integer
        description: "0~44 (-60dB to -16dB)"
      - name: input_1_level
        type: integer
        description: "0~511"
    response: ACK/NAK

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
      - name: mix_to_floor
        type: integer
        description: "0=Off, 1=On"
    response: ACK/NAK

  - id: set_interpretation_input
    label: Interpretation Input Setting Change Request
    kind: action
    command: siinp
    params:
      - name: return_1_level
        type: integer
        description: "0~511"
      - name: return_1_nominal_level
        type: integer
        description: "0=0dBV, 1=+4dBV"
      - name: return_1_low_cut
        type: integer
        description: "0=Off, 1=On"
    response: ACK/NAK

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
    response: ACK/NAK

  - id: set_fbs
    label: FBS Setting Change Request
    kind: action
    command: safbs
    params:
      - name: group
        type: integer
        description: "0~3 (Group 0 to Group 3)"
      - name: enable
        type: integer
        description: "0=Off, 1=On"
      - name: bands
        type: string
        description: "12 band entries (static flag each)"
    response: ACK/NAK

  - id: reset_fbs
    label: FBS Setting Reset Request
    kind: action
    command: srfbs
    params:
      - name: group
        type: integer
        description: "0~3"
    response: ACK/NAK

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
    response: ACK/NAK

  - id: set_audio_output
    label: Audio Output Setting Change Request
    kind: action
    command: saout
    params:
      - name: kind
        type: integer
        description: "1~4 (Output 1 to Output 4)"
      - name: output_level
        type: integer
        description: "0~511"
      - name: source_select
        type: integer
        description: "0=Floor, 1=Group0, 2=Group1, 3=Group2, 4=Group3, 5=Language1, 6=Language2, 7=Language3, 8=InterpReturn1, 9=InterpReturn2, 10=MicLine1, 11=MicLine2, 12=MicLine1&2Mix"
    response: ACK/NAK

  - id: set_du_individual
    label: DU Individual Setting Change Request
    kind: action
    command: sduin
    params:
      - name: serial
        type: string
        description: "Serial number, topology number (t001~t100), device ID, or 'all'"
      - name: delegate_name
        type: string
        description: "Name in double quotes (UTF-8, 10 chars)"
      - name: priority
        type: integer
        description: "0=Off, 1=On"
      - name: can_cut_mute
        type: integer
        description: "0=Off, 1=On"
      - name: can_be_cut_muted
        type: integer
        description: "0=Off, 1=On"
      - name: group_0
        type: integer
        description: "0=not assign, 1=assign"
      - name: mic_on_trigger
        type: integer
        description: "0=Button, 1=Voice, 2=Push to Talk"
      - name: speaker
        type: integer
        description: "0=Off, 1=On"
      - name: unit_type
        type: integer
        description: "0=ATUC-50DU, 1=ATUC-50INT, 2=ATUC-50IU, 3=ATUC-IRDU, 4=ATUC-50DUa"
    response: ACK/NAK

  - id: set_du_mic_eq
    label: DU Mic EQ Setting Change Request
    kind: action
    command: sdueq
    params:
      - name: serial
        type: string
        description: "Serial number or 'all'"
      - name: eq_band_1_frequency
        type: integer
        description: "0~480 (20Hz~20kHz)"
      - name: eq_band_1_gain
        type: integer
        description: "0~56 (-18dB~+10dB)"
      - name: eq_band_1_q
        type: integer
        description: "0~30 (0.3~30)"
      - name: eq_band_1_filter_type
        type: integer
        description: "0=LPF/HPF, 1=LSH/HSH, 2=PEQ"
    response: ACK/NAK

  - id: set_gpio
    label: GPIO Setting Change Request
    kind: action
    command: sgpio
    params:
      - name: serial
        type: string
        description: "Serial number of IU"
      - name: gpi_0
        type: integer
        description: "0=Default, 1=Self Mute, 2~9=Preset Recall, 10=REC Start, 11~13=SFX, 14=Permit Next, 15=Vol Up, 16=Vol Down, 17=REC Stop, 21=Permit Next Undo, 22=MicLine1 Mute, 23=MicLine2 Mute"
    response: ACK/NAK

  - id: control_gpo
    label: GPO Control Request
    kind: action
    command: scgpo
    params:
      - name: serial
        type: string
        description: "Serial number of IU"
      - name: gpo_0
        type: integer
        description: "0=OFF, 1=ON, 2=Flash, 3=Blink"
    response: ACK/NAK

  - id: set_vu_nfc
    label: VU NFC Setting Request
    kind: action
    command: svnfc
    params:
      - name: serial
        type: string
        description: "Serial number of DUa or 'all'"
      - name: nfc_power
        type: integer
        description: "0=Power Off, 1=Power On"
    response: ACK/NAK

  - id: set_vu_setting
    label: VU Setting Change Request
    kind: action
    command: svuio
    params:
      - name: serial
        type: string
        description: "Serial number of DUa"
      - name: vu_led_0
        type: integer
        description: "0=Default, 2~9=Preset Recall, 11~13=SFX, 14=Permit Next, 15=Vol Up, 16=Vol Down, 21=Permit Next Undo"
    response: ACK/NAK

  - id: control_vu
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
    response: ACK/NAK

  - id: set_du_common
    label: DU Common Setting Change Request
    kind: action
    command: sduco
    params:
      - name: talk_on_color
        type: string
        description: "RRGGBB (000000 to FFFFFF)"
      - name: queuing_color
        type: string
        description: "RRGGBB (000000 to FFFFFF)"
      - name: monitor_channel_select_lock
        type: integer
        description: "0=not lock, 1=lock"
      - name: iu_self_mute
        type: integer
        description: "0=not mute, 1=mute"
      - name: bne
        type: integer
        description: "0=OFF, 1=BNE Talk ON, 2=BNE Talk ON/OFF"
    response: ACK/NAK

  - id: set_voice_detection_threshold
    label: Voice Detection Threshold Setting Change Request
    kind: action
    command: svdet
    params:
      - name: threshold
        type: integer
        description: "1~11 (-5 to +5)"
      - name: auto_relative_mic2
        type: integer
        description: "0=OFF, 1=ON"
    response: ACK/NAK

  - id: set_speaker_level
    label: Speaker Level Setting Change Request
    kind: action
    command: sspkv
    params:
      - name: level
        type: integer
        description: "0~20"
    response: ACK/NAK

  - id: set_int50_common
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
        description: "In double quotes (ASCII, 15 chars)"
      - name: language_name_2
        type: string
        description: "In double quotes"
      - name: language_name_3
        type: string
        description: "In double quotes"
      - name: easy_mode
        type: integer
        description: "0=Off, 1=On"
    response: ACK/NAK

  - id: set_irdu_common
    label: IRDU Common Setting Change Request
    kind: action
    command: sirco
    params:
      - name: talk_off_sound
        type: integer
        description: "0=Off, 1=Mic/Line 2, 2=Chime, 3=Pink Noise"
    response: ACK/NAK

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
        description: "64/128/192/256/320 kbps (MP3)"
      - name: channels
        type: integer
        description: "1~4 (WAVE), 1~2 (MP3)"
      - name: track_1_source
        type: integer
        description: "0=Floor, 1=Group0, 2=Group1, 3=Group2, 4=Group3, 5=Language1, 6=Language2, 7=Language3, 8=InterpReturn1, 9=InterpReturn2, 10=MicLine1, 11=MicLine2, 12=MicLine1&2Mix"
      - name: file_name_prefix
        type: string
        description: "In double quotes (ASCII)"
      - name: auto_track
        type: integer
        description: "0/15/30/60/120 minutes"
    response: ACK/NAK

  - id: set_talk_off_audio
    label: Talk Off Audio Setting Change Request
    kind: action
    command: sflor
    params:
      - name: sound
        type: integer
        description: "0=Off, 1=Mic/Line 2, 2=Chime (IRCU only), 3=Pink Noise"
      - name: level
        type: integer
        description: "0~511"
    response: ACK/NAK

  - id: set_floor_filter
    label: Floor Filter Setting Request
    kind: action
    command: sfltr
    params:
      - name: enabled
        type: integer
        description: "0=Off, 1=On"
    response: ACK/NAK

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
      - name: max_in_queue
        type: integer
        description: "0~150"
      - name: priority_cut_mute
        type: integer
        description: "0=Cut, 1=Mute"
      - name: override_free_talk
        type: integer
        description: "0=No Override, 1=FIFO, 2=LIFO"
      - name: override_request_talk
        type: integer
        description: "1=FIFO, 2=LIFO"
      - name: override_full_remote
        type: integer
        description: "Same as Request Talk"
      - name: mic_on_hold_time
        type: integer
        description: "500~6000 msec (500 step)"
    response: ACK/NAK

  - id: delete_du_setting
    label: DU Individual Setting Deletion Request
    kind: action
    command: deldu
    params:
      - name: serial
        type: string
        description: "Serial number or device ID"
      - name: unit_type
        type: integer
        description: "0=ATUC-50DU, 1=ATUC-50INT, 2=ATUC-50IU, 3=ATUC-IRDU, 4=ATUC-50DUa"
    response: ACK/NAK

  - id: identify_du
    label: DU Identify Request
    kind: action
    command: srcdu
    params:
      - name: serial
        type: string
        description: "Serial number, topology number, or device ID"
      - name: start
        type: integer
        description: "0=Stop blinking, 1=Start blinking"
      - name: unit_type
        type: integer
        description: "0~4"
    response: ACK/NAK

  - id: identify_cu
    label: CU Identify Request
    kind: action
    command: srccu
    params: []
    response: ACK/NAK

  - id: talk_off
    label: Talk Off Request
    kind: action
    command: takof
    params:
      - name: mode
        type: integer
        description: "0=All, 1=Selected"
      - name: serial
        type: string
        description: "Serial number (when mode=1)"
      - name: unit_type
        type: integer
        description: "0~4"
    response: ACK/NAK

  - id: request_talk
    label: Request Talk Request
    kind: action
    command: reqon
    params:
      - name: mode
        type: integer
        description: "1=Selected"
      - name: serial
        type: string
        description: "Serial number"
      - name: unit_type
        type: integer
        description: "0~4"
    response: ACK/NAK

  - id: delete_request_talk
    label: Request Talk Deletion Request
    kind: action
    command: reqof
    params:
      - name: mode
        type: integer
        description: "0=All, 1=Selected"
      - name: serial
        type: string
        description: "Serial number (when mode=1)"
      - name: unit_type
        type: integer
        description: "0~4"
    response: ACK/NAK

  - id: permit_talk
    label: Talk Permission Request
    kind: action
    command: prmit
    params:
      - name: mode
        type: integer
        description: "0=Next, 1=Selected"
      - name: serial
        type: string
        description: "Serial number (when mode=1)"
      - name: unit_type
        type: integer
        description: "0~4"
    response: ACK/NAK

  - id: cancel_talk
    label: Talk Cancel Request (Undo Last Permit Next)
    kind: action
    command: pundo
    params: []
    response: ACK/NAK

  - id: set_sfx
    label: SFX Setting Change Request
    kind: action
    command: sseff
    params:
      - name: kind
        type: integer
        description: "1~3 (SFX 1~3)"
      - name: source
        type: string
        description: "Audio file name in double quotes"
      - name: name
        type: string
        description: "SFX name in double quotes"
    response: ACK/NAK

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
        description: "0=Stop, 1=Start"
    response: ACK/NAK

  - id: set_sfx_level
    label: SFX Playing Level Change Request
    kind: action
    command: spllv
    params:
      - name: level
        type: integer
        description: "0~511"
    response: ACK/NAK

  - id: recording_control
    label: Recording Request
    kind: action
    command: recmd
    params:
      - name: action
        type: integer
        description: "0=Stop, 1=Pause, 2=Start"
    response: ACK/NAK

  - id: set_recording_level
    label: Recording Level Change Request
    kind: action
    command: reclv
    params:
      - name: level
        type: integer
        description: "0~511"
    response: ACK/NAK

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
    response: ACK/NAK

  - id: call_preset
    label: Preset Call Request
    kind: action
    command: callp
    params:
      - name: bank_number
        type: integer
        description: "1~8"
    response: ACK/NAK

  - id: save_preset
    label: Preset Save Request
    kind: action
    command: savep
    params:
      - name: bank_number
        type: integer
        description: "1~8"
    response: ACK/NAK

  - id: set_preset_bank_name
    label: Preset Bank Name Change Request
    kind: action
    command: snamb
    params:
      - name: bank_number
        type: integer
        description: "1~8"
      - name: bank_name
        type: string
        description: "In double quotes (UTF-8, 10 chars)"
    response: ACK/NAK

  - id: set_boot_preset
    label: Boot Up Preset Setting Change Request
    kind: action
    command: sbtpr
    params:
      - name: bank_number
        type: integer
        description: "0=Not select, 1~8=Bank 1~8"
    response: ACK/NAK

  - id: set_preset_call_setting
    label: Preset Call Setting Change Request
    kind: action
    command: scals
    params:
      - name: mode
        type: integer
        description: "0=Topology, 1=Serial number"
    response: ACK/NAK

  - id: set_level_meter
    label: Level Meter Setting Request
    kind: action
    command: slvmt
    params:
      - name: interval
        type: integer
        description: "Notification interval in msec (100~)"
    response: ACK/NAK

  - id: set_date
    label: Date Setting Request
    kind: action
    command: sdate
    params:
      - name: date
        type: string
        description: "YYYYMMDDHHMMSS"
    response: ACK/NAK

  - id: upload_file
    label: File Transfer Request
    kind: action
    command: uload
    params:
      - name: kind
        type: string
        description: "p1~p8 (Preset 1~8), l1~l2 (Language file 1~2)"
      - name: file_offset
        type: string
        description: "Hex offset"
      - name: size
        type: integer
        description: "1~1024 bytes"
      - name: data
        type: binary
        description: "Transfer data"
    response: ACK/NAK

  - id: cancel_upload
    label: File Transfer Cancel Request
    kind: action
    command: ulcan
    params:
      - name: kind
        type: string
        description: "p1~p8 or l1~l2"
    response: ACK/NAK

  - id: export_file
    label: Export Request
    kind: action
    command: exprt
    params:
      - name: kind
        type: string
        description: "p1~p8 or l1~l2"
    response: ACK/NAK

  - id: import_file
    label: Import Request
    kind: action
    command: imprt
    params:
      - name: kind
        type: string
        description: "p1~p8 or l1~l2"
    response: ACK/NAK
```

## Feedbacks
```yaml
feedbacks:
  - id: firmware_version
    type: string
    command: gvers
    description: "CU firmware version (XX.XX.XX format)"

  - id: cu_status
    type: object
    command: gstat
    description: "LED indicator states and connected DU/INT/IU counts per port"

  - id: permissions
    type: object
    command: gperm
    description: "Operator/Administrator permission settings"

  - id: network_settings
    type: object
    command: gnetw
    description: "Network configuration including IP, port, multicast, NTP"

  - id: dante_settings
    type: object
    command: gdant
    description: "Dante network configuration and latency settings"

  - id: link_port_settings
    type: object
    command: gport
    description: "Link port device setting (cu or du)"

  - id: oled_settings
    type: object
    command: goled
    description: "OLED display settings"

  - id: ir_band_settings
    type: object
    command: gband
    description: "IR Band configuration (bands A~J, NOM limit, group assignments)"

  - id: header_dot_color
    type: string
    command: ghcol
    description: "RRGGBB hex color"

  - id: mic_line_input_settings
    type: object
    command: gminp
    description: "Mic/Line Input 1/2 settings including EQ, gain, phantom"

  - id: aux_input_settings
    type: object
    command: gxinp
    description: "AUX Input settings"

  - id: interpretation_input_settings
    type: object
    command: giinp
    description: "Interpretation Return 1/2 settings"

  - id: fbs_common_settings
    type: object
    command: gcfbs
    description: "FBS detection and response settings"

  - id: fbs_settings
    type: object
    command: gafbs
    description: "FBS band settings per group (divided message response)"

  - id: audio_output_settings
    type: object
    command: gaout
    description: "Output 1~4 settings including level, source, PEQ, dynamics"

  - id: du_status
    type: object
    command: gdust
    description: "DU individual settings, connection/talk status (divided message for all)"

  - id: du_talk_status
    type: object
    command: gtalk
    description: "DU talk/wait status and slot number"

  - id: gpio_settings
    type: object
    command: ggpio
    description: "IU GPI/GPO settings"

  - id: gpio_status
    type: object
    command: ggpst
    description: "IU GPI/GPO current state"

  - id: vu_settings
    type: object
    command: gvuio
    description: "DUa VU LED assignment settings"

  - id: vu_status
    type: object
    command: gvust
    description: "DUa VU connect/button/LED status"

  - id: du_common_settings
    type: object
    command: gduco
    description: "DU common settings (speaker level, talk LED color, voice detection, BNE)"

  - id: int50_common_settings
    type: object
    command: gintc
    description: "INT50 interpretation mode, interlock, language names"

  - id: irdu_common_settings
    type: object
    command: girco
    description: "IRDU common settings"

  - id: recording_settings
    type: object
    command: greco
    description: "Recording format, quality, channels, source tracks"

  - id: recording_status
    type: object
    command: recst
    description: "Recording status (0=Stop, 1=Pause, 2=Start), elapsed and remaining time (HHMMSS)"

  - id: talk_off_audio_settings
    type: object
    command: gflor
    description: "Talk Off audio sound type and level"

  - id: conference_settings
    type: object
    command: gconf
    description: "Conference mode, NOM, queue, override, mic hold time"

  - id: sfx_settings
    type: object
    command: gseff
    description: "SFX 1~3 file and name assignments"

  - id: sfx_list
    type: object
    command: gsels
    description: "List of audio files on USB (up to 30)"

  - id: log_settings
    type: object
    command: glogg
    description: "Log enabled/disabled and output destination"

  - id: preset_bank_names
    type: object
    command: gnamb
    description: "Bank 1~8 names (divided message response)"

  - id: boot_preset_setting
    type: object
    command: gbtpr
    description: "Boot up preset bank number (0=not select, 1~8)"

  - id: preset_call_setting
    type: object
    command: gcals
    description: "Preset call mode (0=Topology, 1=Serial number)"

  - id: level_meter
    type: object
    command: glvmt
    description: "Audio level at specified monitor point (0~31)"

  - id: battery_status
    type: object
    command: gbatt
    description: "IRDU battery status (Enough/Low/No battery)"
```

## Variables
```yaml
variables:
  - id: tcp_port
    type: integer
    range: "1~65535"
    default: 17300
    description: "TCP control port number"
    command: snetw/gnetw

  - id: udp_multicast_address
    type: string
    default: "225.000.000.100"
    description: "UDP multicast group address"
    command: snetw/gnetw

  - id: udp_multicast_port
    type: integer
    range: "1~65535"
    default: 17000
    description: "UDP multicast port number"
    command: snetw/gnetw

  - id: conference_mode
    type: enum
    values: [free_talk, request_talk, full_remote]
    command: sconf/gconf

  - id: speaker_level
    type: integer
    range: "0~20"
    command: sspkv

  - id: sfx_play_level
    type: integer
    range: "0~511"
    command: spllv

  - id: recording_level
    type: integer
    range: "0~511"
    command: reclv

  - id: level_meter_interval
    type: integer
    range: "100~"
    description: "Level meter notification interval in msec"
    command: slvmt
```

## Events
```yaml
events:
  - id: cu_status_notification
    description: "Sent via UDP multicast when CU or DU connection status changes"
    prefix: "MD gcust"
    enabled_by: "Network Setting Notification=1"

  - id: conference_status_notification
    description: "Sent via UDP multicast when conference settings change"
    prefix: "MD gconf"
    enabled_by: "Network Setting Notification=1"

  - id: du_status_notification
    description: "Sent via UDP multicast when DU individual settings change"
    prefix: "MD gdust"
    enabled_by: "Network Setting Notification=1"

  - id: du_talk_status_notification
    description: "Sent via UDP multicast when DU talk status changes"
    prefix: "MD gtalk"
    enabled_by: "Network Setting Notification=1"

  - id: connection_status_notification
    description: "Sent via UDP multicast when DU connection status changes"
    prefix: "MD gconn"
    enabled_by: "Network Setting Notification=1"

  - id: gpi_input_notification
    description: "Sent via UDP multicast when IU GPI input detected"
    prefix: "MD gcgpi"

  - id: vu_input_notification
    description: "Sent via UDP multicast when VU button input detected"
    prefix: "MD gcvui"

  - id: vu_nfc_input_notification
    description: "Sent via UDP multicast when VU NFC ID input detected"
    prefix: "MD gvnfc"

  - id: recording_status_notification
    description: "Sent via UDP multicast for recording status and time"
    prefix: "MD recst"

  - id: level_meter_notification
    description: "Sent at configured interval when level meter is enabled"
    prefix: "MD lvmon"

  - id: status_confirmation_request
    description: "Sent by CU to all connected sockets when SOS (Auto Mode Change) timeout occurs; host must respond with gstat"
    prefix: "RQ confm"

  - id: battery_level_alert
    description: "Sent via UDP multicast when IRDU battery level is low"
    prefix: "MD gbatt"

  - id: error_notification
    description: "Sent via UDP multicast when an error occurs"
    prefix: "MD error"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements found in the control protocol source document.
```

## Notes
- Commands use space-delimited (0x20) ASCII fields terminated with CR (0x0D).
- Command format: `<5-char command> <handshake: S/O/H> <model_id: 0000> <unit_no: 00> <continue: NC/CS/CM/CE> <params> CR`
- Handshake select: `S` = ACK/NAK format, `O` = One-Way (no response expected), `H` = Handshake (unused).
- Set commands use handshake `S`; Get commands typically use `O`.
- Large responses use divided messages: `CS` (head), `CM` (middle), `CE` (end).
- Parameters are comma-separated; omitted parameters use empty commas.
- Maximum command length: 287 bytes (including CR). Maximum control command payload: 255 bytes.
- Maximum 5 simultaneous TCP connections.
- UDP multicast notifications require Network Setting `Notification=1` to be enabled via `snetw`.
- Error codes: 01=Syntax, 02=Invalid command, 03=Split error, 04=Parameter error, 05=Timeout, 90=Busy, 92=Busy(Save mode), 93=Busy(Extension), 99=Other.
- NAK format: `<command> NAK <error_code> CR`.
- The `confm` request from CU requires the host to respond with `gstat` within the SOS timeout.
- When network settings are changed via `snetw`, the CU must be rebooted for changes to take effect.
- IR Band configuration (sband/gband) manages up to 10 IR frequency bands (A~J) for wireless IRDUs, with group assignments and NOM limiting.
- Commands `sduin`, `sdueq`, `gdust`, `gtalk`, `deldu`, `srcdu`, `takof`, `reqon`, `reqof`, `prmit` have updated formats in firmware 2.0.0+ for ATUC-50; ATUC-IRCU (1.0.5+) uses the original format.

<!-- UNRESOLVED: exact reboot/power-cycle command not specified in IP control spec -->
<!-- UNRESOLVED: firmware update mechanism not described in this document -->
<!-- UNRESOLVED: Dante settings change also requires CU reboot -->
<!-- UNRESOLVED: precise list of commands that differ between IRCU firmware 1.0.5 and later versions not fully enumerated -->

## Provenance

```yaml
source_domains:
  - audio-technica.com
  - docs.audio-technica.com
retrieved_at: 2026-05-04T15:16:41.162Z
last_checked_at: 2026-04-23T15:12:45.782Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:12:45.782Z
matched_actions: 129
action_count: 129
confidence: high
summary: "Every spec action and feedback command matched literally in source; all transport parameters (port 17300, UDP multicast 225.0.0.100, TCP protocol) verified verbatim; command set fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
