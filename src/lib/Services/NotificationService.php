<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Services;

use OCA\Passwords\AppInfo\Application;
use OCA\Passwords\Notification\AbstractNotification;
use OCA\Passwords\Notification\BadPasswordNotification;
use OCA\Passwords\Notification\ImpersonationNotification;
use OCA\Passwords\Notification\LegacyApiNotification;
use OCA\Passwords\Notification\LoginAttemptNotification;
use OCA\Passwords\Notification\ShareCreatedNotification;
use OCA\Passwords\Notification\ShareLoopNotification;
use OCA\Passwords\Notification\SurveyNotification;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;

/**
 * Class NotificationService
 *
 * @package OCA\Passwords\Notification
 */
class NotificationService implements INotifier {

    /**
     * @var UserSettingsService
     */
    protected $settings;

    /**
     * @var IFactory
     */
    protected $l10NFactory;

    /**
     * @var SurveyNotification
     */
    protected $surveyNotification;

    /**
     * @var LegacyApiNotification
     */
    protected $legacyApiNotification;

    /**
     * @var ShareLoopNotification
     */
    protected $shareLoopNotification;

    /**
     * @var BadPasswordNotification
     */
    protected $badPasswordNotification;

    /**
     * @var ShareCreatedNotification
     */
    protected $shareCreatedNotification;

    /**
     * @var LoginAttemptNotification
     */
    protected $loginAttemptNotification;

    /**
     * @var ImpersonationNotification
     */
    protected $impersonationNotification;

    /**
     * NotificationService constructor.
     *
     * @param IFactory                  $l10nFactory
     * @param UserSettingsService       $settings
     * @param SurveyNotification        $surveyNotification
     * @param ShareLoopNotification     $shareLoopNotification
     * @param LegacyApiNotification     $legacyApiNotification
     * @param BadPasswordNotification   $badPasswordNotification
     * @param ShareCreatedNotification  $shareCreatedNotification
     * @param LoginAttemptNotification  $loginAttemptNotification
     * @param ImpersonationNotification $impersonationNotification
     */
    public function __construct(
        IFactory $l10nFactory,
        UserSettingsService $settings,
        SurveyNotification $surveyNotification,
        ShareLoopNotification $shareLoopNotification,
        LegacyApiNotification $legacyApiNotification,
        BadPasswordNotification $badPasswordNotification,
        ShareCreatedNotification $shareCreatedNotification,
        LoginAttemptNotification $loginAttemptNotification,
        ImpersonationNotification $impersonationNotification
    ) {
        $this->settings                  = $settings;
        $this->l10NFactory               = $l10nFactory;
        $this->legacyApiNotification     = $legacyApiNotification;
        $this->shareLoopNotification     = $shareLoopNotification;
        $this->surveyNotification        = $surveyNotification;
        $this->badPasswordNotification   = $badPasswordNotification;
        $this->shareCreatedNotification  = $shareCreatedNotification;
        $this->loginAttemptNotification  = $loginAttemptNotification;
        $this->impersonationNotification = $impersonationNotification;
    }

    /**
     * @param string $userId
     * @param int    $passwordCount
     */
    public function sendBadPasswordNotification(string $userId, int $passwordCount): void {
        $this->sendNotification(
            $this->badPasswordNotification,
            $userId,
            ['count' => $passwordCount]
        );
    }

    /**
     * @param string $receiverId
     * @param array  $owners
     */
    public function sendShareCreatedNotification(string $receiverId, array $owners): void {
        $this->sendNotification(
            $this->shareCreatedNotification,
            $receiverId,
            ['owners' => $owners]
        );
    }

    /**
     * @param string $userId
     * @param int    $passwords
     */
    public function sendShareLoopNotification(string $userId, int $passwords): void {
        $this->sendNotification(
            $this->shareLoopNotification,
            $userId,
            ['passwords' => $passwords]
        );
    }

    /**
     * @param string $userId
     * @param string $impersonatorId
     */
    public function sendImpersonationNotification(string $userId, string $impersonatorId): void {
        $this->sendNotification(
            $this->impersonationNotification,
            $userId,
            ['impersonator' => $impersonatorId]
        );
    }

    /**
     * @param string $userId
     * @param string $client
     * @param bool   $revoked
     */
    public function sendLoginAttemptNotification(string $userId, string $client, $revoked = false): void {
        $this->sendNotification(
            $this->loginAttemptNotification,
            $userId,
            ['client' => $client, 'revoked' => $revoked]
        );
    }

    /**
     * @param string $userId
     * @param string $client
     */
    public function sendLegacyApiNotification(string $userId, string $client): void {
        $this->sendNotification(
            $this->legacyApiNotification,
            $userId,
            ['client' => $client]
        );
    }

    /**
     * @param string $userId
     */
    public function sendSurveyNotification(string $userId): void {
        $this->surveyNotification->send($userId);
    }

    /**
     * @param AbstractNotification $notification
     * @param string               $userId
     * @param array                $parameters
     */
    protected function sendNotification(AbstractNotification $notification, string $userId, array $parameters): void {
        if($this->isNotificationEnabled($userId, $notification::TYPE)) {
            $notification->send($userId, $parameters);
        }
    }

    /**
     * @param INotification $notification
     * @param string        $languageCode The code of the language that should be used to prepare the notification
     *
     * @return INotification
     * @throws \InvalidArgumentException When the notification was not prepared by a notifier
     * @since 9.0.0
     */
    public function prepare(INotification $notification, $languageCode) {
        if($notification->getApp() !== Application::APP_NAME) {
            throw new \InvalidArgumentException();
        }

        $localisation = $this->l10NFactory->get(Application::APP_NAME, $languageCode);

        switch($notification->getSubject()) {
            case BadPasswordNotification::NAME:
                return $this->badPasswordNotification->process($notification, $localisation);
            case ShareCreatedNotification::NAME:
                return $this->shareCreatedNotification->process($notification, $localisation);
            case ShareLoopNotification::NAME:
                return $this->shareLoopNotification->process($notification, $localisation);
            case ImpersonationNotification::NAME:
                return $this->impersonationNotification->process($notification, $localisation);
            case LoginAttemptNotification::NAME:
                return $this->loginAttemptNotification->process($notification, $localisation);
            case LegacyApiNotification::NAME:
                return $this->legacyApiNotification->process($notification, $localisation);
            case SurveyNotification::NAME:
                return $this->surveyNotification->process($notification, $localisation);
        }

        return $notification;
    }

    /**
     * @param string $userId
     * @param string $type
     *
     * @return bool
     */
    protected function isNotificationEnabled(string $userId, string $type): bool {
        try {
            return $this->settings->get('user.notification.'.$type, $userId) === true;
        } catch(\Exception $e) {
            return false;
        }
    }
}