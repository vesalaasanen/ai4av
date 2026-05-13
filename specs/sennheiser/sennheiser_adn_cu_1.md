---
spec_id: admin/sennheiser-adn-cu-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser ADN CU 1 Control Spec"
manufacturer: Sennheiser
model_family: "ADN CU 1"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
  models:
    - "ADN CU 1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sennheiser.com
retrieved_at: 2026-04-30T04:31:23.636Z
last_checked_at: 2026-04-26T22:46:41.052Z
generated_at: 2026-04-26T22:46:41.052Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T22:46:41.052Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "Every spec action matched literal command names in source; transport verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Sennheiser ADN CU 1 Control Spec

## Summary
Sennheiser ADN CU 1 is a conference central unit supporting TCP/IP socket control at port 53252. Communication is ASCII-based with semicolon-terminated commands; the device acts as an observer-pattern server, sending unsolicited updates on attribute changes. No authentication required.

<!-- UNRESOLVED: physical RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 53252
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable  # volume, EQ, sensitivity commands present
- queryable  # get requests present throughout command set
```

## Actions
```yaml
- id: all_mics_off
  label: AllMicsOff
  kind: action
  params:
    - name: execute
      type: integer
      description: Must be 1

- id: reinit_system
  label: ReinitSystem
  kind: action
  params:
    - name: execute
      type: integer
      description: Must be 1

- id: mic_button
  label: MicButton
  kind: action
  params:
    - name: bus_pos
      type: integer
      description: Bus position (min 1)

- id: mic_button_sn
  label: MicButtonSN
  kind: action
  params:
    - name: serial_number
      type: string
      description: Unit serial number (e.g. D1100023)

- id: set_cu_date_time
  label: SetCUDateTime
  kind: action
  params:
    - name: year
      type: integer
      description: Year (1900-3000)
    - name: month
      type: integer
      description: Month (1-12)
    - name: day
      type: integer
      description: Day (1-31)
    - name: hour
      type: integer
      description: Hour (0-23)
    - name: minute
      type: integer
      description: Minute (0-59)
    - name: second
      type: integer
      description: Second (0-59)

- id: am_rf_channel
  label: AmRfChannel
  kind: action
  params:
    - name: serial_number
      type: string
      description: Antenna module serial number (e.g. AM100001)
    - name: rf_channel
      type: integer
      description: RF channel (1-31)
  kind: get
  params:
    - name: serial_number
      type: string
      description: Antenna module serial number

- id: am_rf_output_power
  label: AmRfOutputPower
  kind: action
  params:
    - name: serial_number
      type: string
      description: Antenna module serial number
    - name: rf_output_power
      type: integer
      description: RF output power level (1-6)
  kind: get
  params:
    - name: serial_number
      type: string
      description: Antenna module serial number

- id: auto_freq_selection
  label: AutoFreqSelection
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: blink_on_req
  label: BlinkOnReq
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: clear_does_clean_request_list
  label: ClearDoesCleanRequestList
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: conference_mode
  label: ConferenceMode
  kind: action
  params:
    - name: conf_mode
      type: integer
      description: 1=Automatic, 2=Overrun, 3=Request, 4=PushToTalk
  kind: get

- id: enable_su_w_shutdown
  label: EnableSUwShutdown
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: floor_equalizer_high
  label: FloorEqualizerHigh
  kind: action
  params:
    - name: eq_value
      type: integer
      description: EQ value (1-25, maps to -12dB to +12dB)
  kind: get

- id: floor_equalizer_mid
  label: FloorEqualizerMid
  kind: action
  params:
    - name: eq_value
      type: integer
      description: EQ value (1-25, maps to -12dB to +12dB)
  kind: get

- id: floor_equalizer_low
  label: FloorEqualizerLow
  kind: action
  params:
    - name: eq_value
      type: integer
      description: EQ value (1-25, maps to -12dB to +12dB)
  kind: get

- id: floor_mix
  label: FloorMix
  kind: action
  params:
    - name: floor_mix
      type: integer
      description: Audio gain reduction (1-8)
  kind: get

- id: floor_volume
  label: FloorVolume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level (0-32)
  kind: get

- id: hd_record_is_active
  label: HdRecordIsActive
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: limit_of_talk_time
  label: LimitOfTalkTime
  kind: action
  params:
    - name: limit_tt
      type: integer
      description: Talk time limit in minutes (0 = unlimited, max 60)
  kind: get

- id: max_open_mic
  label: MaxOpenMic
  kind: action
  params:
    - name: max_num
      type: integer
      description: Maximum open microphones (1-10)
  kind: get

- id: max_speak_req_list_length
  label: MaxSpeakReqListLength
  kind: action
  params:
    - name: max_num
      type: integer
      description: Maximum request list length (1-10)
  kind: get

- id: open_access_mode
  label: OpenAccessMode
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: premonition_time
  label: PremonitionTime
  kind: action
  params:
    - name: prem_sec
      type: integer
      description: Premonition time in seconds (1-13, mapped to 0-120sec)
  kind: get

- id: speaker_feedback_suppression
  label: SpeakerFeedbackSuppression
  kind: action
  params:
    - name: enable
      type: integer
      description: 1=Off, 2=LowIntensity, 3=HighIntensity
  kind: get

- id: switchable_mic_volume_is_active
  label: SwitchableMicVolumeIsActive
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: talk_time_expiration_hard_cut_off
  label: TalkTimeExpirationHardCutOff
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: talk_time_limit_is_active
  label: TalkTimeLimitIsActive
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: xlr_mix_minus_is_active
  label: XLRMixMinusIsActive
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: xlr_in_status
  label: XLRinStatus
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: xlr_in_sensitivity
  label: XLRinSensitivity
  kind: action
  params:
    - name: in_sens
      type: integer
      description: XLR input sensitivity (1-25, maps to -18dBU to +18dBU)
  kind: get

- id: xlr_in_eq_high
  label: XLRinEqHigh
  kind: action
  params:
    - name: eq_high
      type: integer
      description: EQ high range (1-25)
  kind: get

- id: xlr_in_eq_mid
  label: XLRinEqMid
  kind: action
  params:
    - name: eq_mid
      type: integer
      description: EQ mid range (1-25)
  kind: get

- id: xlr_in_eq_low
  label: XLRinEqLow
  kind: action
  params:
    - name: eq_low
      type: integer
      description: EQ low range (1-25)
  kind: get

- id: xlr_out_status
  label: XLRoutStatus
  kind: action
  params:
    - name: enable
      type: integer
      description: 0 = disabled, 1 = enabled
  kind: get

- id: xlr_out_volume
  label: XLRoutVolume
  kind: action
  params:
    - name: out_vol
      type: integer
      description: XLR output volume (1-32, maps to -20dB to +11dB)
  kind: get

- id: xlr_out_eq_high
  label: XLRoutEqHigh
  kind: action
  params:
    - name: eq_high
      type: integer
      description: EQ high range (1-25)
  kind: get

- id: xlr_out_eq_mid
  label: XLRoutEqMid
  kind: action
  params:
    - name: eq_mid
      type: integer
      description: EQ mid range (1-25)
  kind: get

- id: xlr_out_eq_low
  label: XLRoutEqLow
  kind: action
  params:
    - name: eq_low
      type: integer
      description: EQ low range (1-25)
  kind: get

- id: xlr_out_feedback_suppression
  label: XLROutFeedbackSuppression
  kind: action
  params:
    - name: enable
      type: integer
      description: 1=Off, 2=LowIntensity, 3=HighIntensity
  kind: get
- id: hd_record_error_query
  label: HD Record Error Query
  kind: query
  params: []
  description: "Gets error status of HD recording (0=no error or recording inactive, 1=active but disk error). Also received as unsolicited update."

- id: lapsed_talk_time_query
  label: Lapsed Talk Time Query
  kind: query
  params:
    - name: bus_pos
      type: integer
      description: "Bus position of the microphone (min=0)"
  description: "Gets lapsed talk time in seconds of microphone at bus position. Also received as unsolicited update."

- id: lapsed_talk_time_sn_query
  label: Lapsed Talk Time by Serial Number Query
  kind: query
  params:
    - name: serial_number
      type: string
      description: "Serial number of the wireless microphone (e.g. D1100023)"
  description: "Gets lapsed talk time in seconds of microphone with the given serial number. Example: LapsedTalkTimeSN D1100023;"

- id: mic_battery_status_query
  label: Microphone Battery Status Query
  kind: query
  params:
    - name: serial_number
      type: string
      description: "Serial number of the wireless speaking unit"
  description: "Gets remaining battery power of the microphone with the given serial number (0-100%). Also received as unsolicited update."

- id: mic_ext_power_supply_query
  label: Microphone External Power Supply Query
  kind: query
  params:
    - name: serial_number
      type: string
      description: "Serial number of the wireless speaking unit"
  description: "Gets whether the wireless speaking unit has an external power supply (1=yes, 0=no). Also received as unsolicited update."

- id: mic_rf_status_query
  label: Microphone RF Status Query
  kind: query
  params:
    - name: serial_number
      type: string
      description: "Serial number of the wireless speaking unit"
  description: "Gets RF status of the wireless speaking unit as a percentage (0-100%). Also received as unsolicited update."

- id: mic_status_query
  label: Microphone Status Query
  kind: query
  params:
    - name: bus_pos
      type: integer
      description: "Bus position of the microphone (min=1)"
  description: "Gets status of microphone at the given bus position. Response values: 1=SU_MicOn, 2=SU_MicOnMuted, 3=SU_MicOnPremonition, 4=SU_MicOnPremonitionMuted, 5=SU_MicOnOverrun, 6=SU_MicOnOverrunMuted, 7=SU_MicOff, 8=SU_MicOffRequest, 9=SU_MappingMode, 10=SU_ServiceCalibrateMic, 11=SU_MappingModeRequest. Also received as unsolicited update."

- id: mic_status_sn_query
  label: Microphone Status by Serial Number Query
  kind: query
  params:
    - name: serial_number
      type: string
      description: "Serial number of the wireless speaking unit (e.g. D1100023)"
  description: "Gets status of microphone with the given serial number. Example: MicStatusSN D1100023; Response values same as MicStatus (1-11). Also received as unsolicited update."
```

## Feedbacks
```yaml
# Observer pattern - CU sends updates on attribute changes
# Responses to get requests echo same format as update messages
# Example: _FloorVolume 8;_ sent as get request returns _FloorVolume 8;_
# Error format: _error [code]: [text];_
- id: error_response
  type: enum
  values:
    - "1000: invalid command"
    - "1010: invalid parameter"
    - "1020: value out of range"
    - "1030: relative parameter not supported"
    - "1040: invalid number of parameters"
    - "1050: get request not allowed"
    - "1060: set request not allowed"
    - "1070: processing currently not possible"
```

## Variables
```yaml
# All observable/queriable attributes from the protocol:
- id: floor_volume
  type: integer
  range: [0, 32]
  description: Floor speaker volume

- id: floor_mix
  type: integer
  range: [1, 8]
  description: Audio gain reduction

- id: floor_equalizer_high
  type: integer
  range: [1, 25]
  description: EQ high range (-12dB to +12dB)

- id: floor_equalizer_mid
  type: integer
  range: [1, 25]
  description: EQ mid range (-12dB to +12dB)

- id: floor_equalizer_low
  type: integer
  range: [1, 25]
  description: EQ low range (-12dB to +12dB)

- id: conference_mode
  type: enum
  values: [1, 2, 3, 4]
  description: 1=Automatic, 2=Overrun, 3=Request, 4=PushToTalk

- id: limit_of_talk_time
  type: integer
  range: [0, 60]
  description: Talk time limit in minutes (0=unlimited)

- id: max_open_mic
  type: integer
  range: [1, 10]
  description: Maximum simultaneous open microphones

- id: max_speak_req_list_length
  type: integer
  range: [1, 10]
  description: Maximum microphone request list length

- id: premonition_time
  type: integer
  range: [1, 13]
  description: Premonition seconds before talk time ends

- id: talk_time_limit_is_active
  type: boolean
  description: Whether talk time limit is enforced

- id: talk_time_expiration_hard_cut_off
  type: boolean
  description: Whether mic cuts off immediately at limit

- id: auto_freq_selection
  type: boolean
  description: Auto frequency selection for antenna modules

- id: blink_on_req
  type: boolean
  description: Light ring blinks when mic in request mode

- id: clear_does_clean_request_list
  type: boolean
  description: Clear speaker request list on cancel

- id: enable_su_w_shutdown
  type: boolean
  description: Allow wireless unit shutdown by users

- id: open_access_mode
  type: boolean
  description: Open access mode enabled

- id: speaker_feedback_suppression
  type: enum
  values: [1, 2, 3]
  description: 1=Off, 2=LowIntensity, 3=HighIntensity

- id: switchable_mic_volume_is_active
  type: boolean
  description: Mic loudspeaker mute active

- id: xlr_mix_minus_is_active
  type: boolean
  description: XLR Mix Minus mode active

- id: xlr_in_status
  type: boolean
  description: XLR input enabled

- id: xlr_in_sensitivity
  type: integer
  range: [1, 25]
  description: XLR input sensitivity (-18dBU to +18dBU)

- id: xlr_in_eq_high
  type: integer
  range: [1, 25]
  description: XLR input EQ high range

- id: xlr_in_eq_mid
  type: integer
  range: [1, 25]
  description: XLR input EQ mid range

- id: xlr_in_eq_low
  type: integer
  range: [1, 25]
  description: XLR input EQ low range

- id: xlr_out_status
  type: boolean
  description: XLR output enabled

- id: xlr_out_volume
  type: integer
  range: [1, 32]
  description: XLR output volume (-20dB to +11dB)

- id: xlr_out_eq_high
  type: integer
  range: [1, 25]
  description: XLR output EQ high range

- id: xlr_out_eq_mid
  type: integer
  range: [1, 25]
  description: XLR output EQ mid range

- id: xlr_out_eq_low
  type: integer
  range: [1, 25]
  description: XLR output EQ low range

- id: xlr_out_feedback_suppression
  type: enum
  values: [1, 2, 3]
  description: XLR output feedback suppression (1=Off, 2=Low, 3=High)

- id: hd_record_is_active
  type: boolean
  description: Hard disc recording active

- id: hd_record_error
  type: boolean
  description: Hard disk error present while recording active

- id: mic_status
  type: enum
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  description: Mic status by bus position (1=On, 2=OnMuted, 3=OnPremonition, 4=OnPremMuted, 5=OnOverrun, 6=OnOverrunMuted, 7=Off, 8=OffRequest, 9=MappingMode, 10=ServiceCalibrate, 11=MappingModeRequest)

- id: mic_status_sn
  type: enum
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  description: Mic status by serial number

- id: mic_rf_status
  type: integer
  range: [0, 100]
  description: Wireless mic RF signal strength percentage

- id: mic_battery_status
  type: integer
  range: [0, 100]
  description: Wireless mic battery percentage

- id: mic_ext_power_supply
  type: boolean
  description: Wireless unit has external power supply

- id: lapsed_talk_time
  type: integer
  range: [0, null]
  description: Elapsed talk time in seconds for bus position

- id: lapsed_talk_time_sn
  type: integer
  range: [0, null]
  description: Elapsed talk time in seconds for serial number
```

## Events
```yaml
# Unsolicited updates - CU sends attribute changes to connected MediaCtrl
# Format: _[AttributeName] [value];_
# Example: _FloorVolume 8;_ sent by CU when user changes volume at display
# All Get/Update commands can produce unsolicited events
- id: attribute_change
  description: Any attribute change sent as unsolicited update to MediaCtrl
- id: hd_record_error
  description: Hard disk error occurred during active recording
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Device requires ~45 second warm-up after startup before TCP connection is accepted. Command rate should not exceed ~100ms average between commands; system buffers several hundred commands. Commands are ASCII semicolon-terminated; unterminated commands remain in buffer until termination is received. Relative parameter changes supported via `#` prefix (e.g., `_FloorVolume #1;_`). Serial number format uses identification codes: AM=Antenna Module, C1=Wired Chairman, D1=Wired Delegate, C1W=Wireless Chairman, D1W=Wireless Delegate, followed by 6-digit serial number.
<!-- UNRESOLVED: physical RS-232 support not documented, firmware version not stated, authentication token format not applicable (no auth in source) -->

## Provenance

```yaml
source_domains:
  - assets.sennheiser.com
retrieved_at: 2026-04-30T04:31:23.636Z
last_checked_at: 2026-04-26T22:46:41.052Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:46:41.052Z
matched_actions: 47
action_count: 47
confidence: high
summary: "Every spec action matched literal command names in source; transport verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
